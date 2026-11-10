import os, re, time
from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from sqlalchemy import select, text
from sqlalchemy.exc import IntegrityError, OperationalError
from sqlalchemy.orm import Session
from .db import Base, engine, get_db, SessionLocal
from . import models as m
from .security import hash_pw, check_pw, make_token, current_user
from .seed import seed

app = FastAPI(title="Career Path API")
app.add_middleware(CORSMiddleware, allow_origins=["http://localhost:5173"], allow_methods=["*"], allow_headers=["*"])


@app.on_event("startup")
def startup():
    for _ in range(20):
        try:
            Base.metadata.create_all(engine)
            break
        except OperationalError:
            time.sleep(1.5)
    with SessionLocal() as db:
        seed(db)


def as_dict(r):
    return {c.name: getattr(r, c.name) for c in r.__table__.columns}


def all_rows(db: Session, model):
    return [as_dict(r) for r in db.scalars(select(model).order_by(model.id))]


@app.get("/api/health")
def health(db: Session = Depends(get_db)):
    db.execute(text("select 1"))
    return {"ok": True}


@app.get("/api/careers")
def careers(stage: str | None = None, q: str | None = None, db: Session = Depends(get_db)):
    out = all_rows(db, m.Career)
    if stage:
        out = [c for c in out if stage in c["stage"]]
    if q:
        out = [c for c in out if q.lower() in (c["en"] + c["ta"] + " ".join(c["courses"])).lower()]
    return out


@app.get("/api/colleges")
def colleges(district: str | None = None, course: str | None = None, type: str | None = None,
             fee_max: int | None = None, fee_min: int | None = None,
             hostel: bool = False, scholarship: bool = False, db: Session = Depends(get_db)):
    q = select(m.College).order_by(m.College.id)
    if district: q = q.where(m.College.district == district)
    if course: q = q.where(m.College.course == course)
    if type: q = q.where(m.College.type == type)
    if fee_max is not None: q = q.where(m.College.fee <= fee_max)
    if fee_min is not None: q = q.where(m.College.fee >= fee_min)
    if hostel: q = q.where(m.College.hostel.is_(True))
    if scholarship: q = q.where(m.College.scholarship.is_(True))
    return [as_dict(r) for r in db.scalars(q)]


@app.get("/api/colleges/filters")
def college_filters(db: Session = Depends(get_db)):
    return {"districts": sorted(db.scalars(select(m.College.district).distinct())),
            "courses": sorted(db.scalars(select(m.College.course).distinct()))}


@app.get("/api/videos")
def videos(db: Session = Depends(get_db)): return all_rows(db, m.Video)


@app.get("/api/stories")
def stories(db: Session = Depends(get_db)): return all_rows(db, m.Story)


@app.get("/api/scholarships")
def scholarships(db: Session = Depends(get_db)): return all_rows(db, m.Scholarship)


@app.get("/api/quiz/questions")
def questions(db: Session = Depends(get_db)): return all_rows(db, m.Question)


# ---------- auth ----------
class Signup(BaseModel):
    name: str
    mobile: str
    village: str = ""
    qualification: str
    password: str


class Login(BaseModel):
    id: str
    password: str


def user_out(u: m.User):
    return {"id": u.id, "name": u.name, "mobile": u.mobile, "email": u.email}


@app.post("/api/auth/signup")
def signup(b: Signup, db: Session = Depends(get_db)):
    if not b.name.strip(): raise HTTPException(422, "Please enter your name.")
    if not re.fullmatch(r"[6-9]\d{9}", b.mobile): raise HTTPException(422, "Please enter a valid 10-digit mobile number.")
    if len(b.password) < 6: raise HTTPException(422, "Password needs at least 6 characters.")
    u = m.User(name=b.name.strip(), mobile=b.mobile, village=b.village, qualification=b.qualification,
               password_hash=hash_pw(b.password))
    db.add(u)
    try:
        db.commit()
    except IntegrityError:
        db.rollback()
        raise HTTPException(409, "This mobile number is already registered. Please login.")
    return {"token": make_token(u.id), "user": user_out(u)}


@app.post("/api/auth/login")
def login(b: Login, db: Session = Depends(get_db)):
    u = db.scalar(select(m.User).where((m.User.mobile == b.id.strip()) | (m.User.email == b.id.strip().lower())))
    if not u or not check_pw(b.password, u.password_hash):
        raise HTTPException(401, "Mobile/email or password is wrong. Please try again.")
    return {"token": make_token(u.id), "user": user_out(u)}


@app.get("/api/me")
def me(u: m.User = Depends(current_user)): return user_out(u)


# ---------- quiz + mentor ----------
class QuizSubmit(BaseModel):
    scores: dict[str, int]


@app.post("/api/quiz/submit")
def quiz_submit(b: QuizSubmit, u: m.User = Depends(current_user), db: Session = Depends(get_db)):
    db.add(m.QuizResult(user_id=u.id, scores=b.scores))
    db.commit()
    top = sorted(b.scores.items(), key=lambda x: -x[1])[:3]
    return {"top": [{"career_id": k, "score": s, "percent": round(s / 20 * 100)} for k, s in top]}


class Mentor(BaseModel):
    name: str
    mobile: str
    question: str = ""


@app.post("/api/mentor")
def mentor(b: Mentor, db: Session = Depends(get_db)):
    if not re.fullmatch(r"\d{10}", b.mobile): raise HTTPException(422, "Please enter a 10-digit mobile number.")
    db.add(m.MentorRequest(**b.model_dump()))
    db.commit()
    return {"ok": True}


# Serve the built React app (production image copies it to /code/static)
_static = os.path.join(os.path.dirname(__file__), "..", "static")
if os.path.isdir(_static):
    app.mount("/", StaticFiles(directory=_static, html=True), name="web")
