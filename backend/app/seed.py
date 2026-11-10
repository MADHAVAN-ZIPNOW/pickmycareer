import json, pathlib
from sqlalchemy.orm import Session
from . import models as m

DATA = json.loads((pathlib.Path(__file__).parent / "seed.json").read_text(encoding="utf-8"))


def seed(db: Session):
    if db.query(m.Career).count():
        return
    db.add_all(m.Career(**c) for c in DATA["careers"])
    db.add_all(m.College(**c) for c in DATA["colleges"])
    db.add_all(m.Video(**v) for v in DATA["videos"])
    db.add_all(m.Story(**s) for s in DATA["stories"])
    db.add_all(m.Scholarship(**s) for s in DATA["scholarships"])
    db.add_all(m.Question(**q) for q in DATA["questions"])
    db.commit()
