from utils.db import db
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy import ForeignKey, Column, String, DateTime, Boolean, Enum
import uuid
import enum
from datetime import datetime

class EventTypes(str,enum.Enum):
    Conference= "Conference"
    Seminar =  "Seminar"
    Congress = "Congress"
    Course = "Course"

class EventsModel(db.Model):
    __tablename__ = "events"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String(130))
    category = Column(Enum(EventTypes),nullable=False, default=EventTypes.Conference)
    keeper_id = Column(UUID(as_uuid=True), ForeignKey('users.id'))
    place = Column(String(140))
    address = Column(String(150))
    __ends_at = Column("ends_at",DateTime)
    __starts_at = Column("starts_at",DateTime)
    is_face_to_face = Column(Boolean)

    def __init__(self, keeper_id) -> None:
        super().__init__()
        self.keeper_id = keeper_id

    @property
    def ends_at(self):
        return self.__ends_at

    @ends_at.setter    
    def ends_at(self, value):   
        self.__ends_at = datetime.fromisoformat(value) if value else datetime.utcnow(),
    
    @ends_at.deleter    
    def ends_at(self):  
        del self.__ends_at

    @property
    def starts_at(self):
        return self.__starts_at

    @starts_at.setter    
    def ends_at(self, value):   
        self.__starts_at = datetime.fromisoformat(value) if value else datetime.utcnow(),
    
    @starts_at.deleter    
    def starts_at(self):  
        del self.__starts_at

