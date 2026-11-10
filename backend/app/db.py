import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, DeclarativeBase

DATABASE_URL = os.getenv("DATABASE_URL", "postgresql+psycopg2://careerpath:careerpath@localhost:5432/careerpath")
# Render gives postgres:// or postgresql:// ; SQLAlchemy needs the driver name
for _p in ("postgres://", "postgresql://"):
    if DATABASE_URL.startswith(_p):
        DATABASE_URL = "postgresql+psycopg2://" + DATABASE_URL[len(_p):]
engine = create_engine(DATABASE_URL, pool_pre_ping=True)
SessionLocal = sessionmaker(bind=engine, autoflush=False)


class Base(DeclarativeBase):
    pass


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
