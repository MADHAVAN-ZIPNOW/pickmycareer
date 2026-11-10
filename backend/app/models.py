from sqlalchemy import Integer, String, Boolean, Float, Text, ForeignKey, DateTime, func
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.orm import Mapped, mapped_column
from .db import Base


class Career(Base):
    __tablename__ = "careers"
    id: Mapped[str] = mapped_column(String(10), primary_key=True)
    ic: Mapped[str] = mapped_column(String(8))
    ta: Mapped[str] = mapped_column(String(100))
    en: Mapped[str] = mapped_column(String(100))
    tag: Mapped[str] = mapped_column(String(50))
    stage: Mapped[list] = mapped_column(JSONB)
    courses: Mapped[list] = mapped_column(JSONB)
    exam: Mapped[str] = mapped_column(String(200))
    fee: Mapped[str] = mapped_column(String(100))
    desc: Mapped[str] = mapped_column(Text)
    v: Mapped[str] = mapped_column(String(100))


class College(Base):
    __tablename__ = "colleges"
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(200))
    district: Mapped[str] = mapped_column(String(80), index=True)
    state: Mapped[str] = mapped_column(String(50), default="Tamil Nadu")
    course: Mapped[str] = mapped_column(String(100), index=True)
    fee: Mapped[int] = mapped_column(Integer)
    type: Mapped[str] = mapped_column(String(20))
    hostel: Mapped[bool] = mapped_column(Boolean)
    scholarship: Mapped[bool] = mapped_column(Boolean)
    rating: Mapped[float] = mapped_column(Float)
    highlight: Mapped[str] = mapped_column(String(120))


class Video(Base):
    __tablename__ = "videos"
    id: Mapped[int] = mapped_column(primary_key=True)
    title: Mapped[str] = mapped_column(String(200))
    duration: Mapped[str] = mapped_column(String(10))
    category: Mapped[str] = mapped_column(String(50))
    colors: Mapped[str] = mapped_column(String(40))
    icon: Mapped[str] = mapped_column(String(8))
    youtube_url: Mapped[str] = mapped_column(String(300), default="")


class Story(Base):
    __tablename__ = "stories"
    id: Mapped[int] = mapped_column(primary_key=True)
    icon: Mapped[str] = mapped_column(String(8))
    name: Mapped[str] = mapped_column(String(80))
    village: Mapped[str] = mapped_column(String(120))
    course: Mapped[str] = mapped_column(String(120))
    achievement: Mapped[str] = mapped_column(Text)


class Scholarship(Base):
    __tablename__ = "scholarships"
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(200))
    by: Mapped[str] = mapped_column(String(100))
    eligibility: Mapped[str] = mapped_column(Text)
    amount: Mapped[str] = mapped_column(String(100))
    deadline: Mapped[str] = mapped_column(String(50))


class Question(Base):
    __tablename__ = "questions"
    id: Mapped[int] = mapped_column(primary_key=True)
    area: Mapped[str] = mapped_column(String(10))
    text: Mapped[str] = mapped_column(Text)


class User(Base):
    __tablename__ = "users"
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(80))
    mobile: Mapped[str] = mapped_column(String(15), unique=True, nullable=True)
    email: Mapped[str] = mapped_column(String(150), unique=True, nullable=True)
    village: Mapped[str] = mapped_column(String(120), default="")
    qualification: Mapped[str] = mapped_column(String(40), default="")
    password_hash: Mapped[str] = mapped_column(String(200))


class QuizResult(Base):
    __tablename__ = "quiz_results"
    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"))
    scores: Mapped[dict] = mapped_column(JSONB)
    created: Mapped[object] = mapped_column(DateTime, server_default=func.now())


class MentorRequest(Base):
    __tablename__ = "mentor_requests"
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(80))
    mobile: Mapped[str] = mapped_column(String(15))
    question: Mapped[str] = mapped_column(Text, default="")
    created: Mapped[object] = mapped_column(DateTime, server_default=func.now())
