import hashlib, hmac, os, time
import jwt
from fastapi import Depends, HTTPException
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from sqlalchemy.orm import Session
from .db import get_db
from .models import User

SECRET = os.getenv("JWT_SECRET", "dev-secret")
bearer = HTTPBearer(auto_error=False)


def hash_pw(pw: str) -> str:
    salt = os.urandom(16)
    h = hashlib.pbkdf2_hmac("sha256", pw.encode(), salt, 200_000)
    return salt.hex() + "$" + h.hex()


def check_pw(pw: str, stored: str) -> bool:
    salt, h = stored.split("$")
    c = hashlib.pbkdf2_hmac("sha256", pw.encode(), bytes.fromhex(salt), 200_000)
    return hmac.compare_digest(c.hex(), h)


def make_token(uid: int) -> str:
    return jwt.encode({"sub": str(uid), "exp": int(time.time()) + 60 * 60 * 24 * 30}, SECRET, algorithm="HS256")


def current_user(cred: HTTPAuthorizationCredentials | None = Depends(bearer), db: Session = Depends(get_db)) -> User:
    if not cred:
        raise HTTPException(401, "Please login first")
    try:
        uid = int(jwt.decode(cred.credentials, SECRET, algorithms=["HS256"])["sub"])
    except Exception:
        raise HTTPException(401, "Session expired. Please login again")
    u = db.get(User, uid)
    if not u:
        raise HTTPException(401, "Please login again")
    return u
