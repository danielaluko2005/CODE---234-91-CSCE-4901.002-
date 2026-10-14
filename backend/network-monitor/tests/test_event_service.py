from datetime import datetime, timedelta

import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from app.db.database import Base
from app.models import event as _event  # noqa: F401  (registers the table)
from app.services.event_service import EventService


@pytest.fixture()
def service(tmp_path):
    engine = create_engine(f"sqlite:///{tmp_path / 'test.db'}", connect_args={"check_same_thread": False})
    Base.metadata.create_all(engine)
    return EventService(sessionmaker(bind=engine, expire_on_commit=False))


def _data(**kw):
    base = dict(source_ip="10.0.0.1", destination_ip="10.0.0.2", source_port=40000,
                destination_port=22, protocol="tcp", activity="SSH traffic")
    base.update(kw)
    return base


def test_record_event_adds_timestamp(service):
    e = service.record_event(_data())          # no timestamp given
    assert isinstance(e.timestamp, datetime)   # R2: one was added automatically
    assert e.protocol == "TCP"


def test_filter_by_protocol_and_time(service):
    now = datetime.utcnow()
    service.record_event(_data(timestamp=now - timedelta(hours=2)))
    service.record_event(_data(protocol="udp", destination_port=53, activity="DNS traffic", timestamp=now))

    assert len(service.get_events(protocol="udp")) == 1
    assert len(service.get_events(start=now - timedelta(hours=1))) == 1
    assert len(service.get_events()) == 2
