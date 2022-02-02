from utils.db import db
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy import ForeignKey, Column, String, DateTime, Boolean
import uuid
from enum import Enum


class EventTypes(str,Enum):
    Conference= "Conference"
    Seminar =  "Seminar"
    Congress = "Congress"
    Course = "Course"

class EventsModel(db.Model):
    __tablename__ = "events"
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = db.Column(String(130))
    category = db.Column(db.Enum(EventTypes),nullable=False)
    keeper_id = db.Column(UUID(as_uuid=True), ForeignKey('users.id'))
    place = db.Column(String(140))
    address = db.Column(String(150))
    ends_at = db.Column(DateTime)
    starts_at = db.Column(DateTime)
    is_face_to_face = db.Column(Boolean)


