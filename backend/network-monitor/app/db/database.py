"""app/db/database.py - SQLite connection and table creation."""

from sqlalchemy import create_engine
from sqlalchemy.orm import DeclarativeBase, sessionmaker

from app.config import DB_PATH


class Base(DeclarativeBase):
    pass


# check_same_thread=False because the sniffer thread and API threads both use the DB
engine = create_engine(f"sqlite:///{DB_PATH}", connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(bind=engine, expire_on_commit=False)


def init_db() -> None:
    from app.models import event  # noqa: F401  (importing registers the table)

    Base.metadata.create_all(bind=engine)
