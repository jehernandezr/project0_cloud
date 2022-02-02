from utils.db import db
from sqlalchemy.dialects.postgresql import UUID
import sqlalchemy_utils 
from sqlalchemy import String, Column
from sqlalchemy.orm import relationship
from utils.crypto import bcrypt   
from .events_model import EventsModel
import uuid

class UserModel(db.Model):
    __tablename__ = "users"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String())
    email = Column(sqlalchemy_utils.types.email.EmailType,index=True, unique=True)
    __password = Column("password", String)
    events = relationship("EventsModel", cascade="all, delete-orphan")

    def verify_password_pre_save(self, password , confirm_password):
        if password == confirm_password:
            pass
        else: raise Exception("Password didn't match")
    
    def verify_hash_password(self, password):
        if bcrypt.check_password_hash(self.password, password):
            pass 
        else: raise Exception("Password didn't match")

    def __init__(self, name, email, password, confirm_password):
        self.name = name
        self.email = email
        self.verify_password_pre_save(password,confirm_password)
        self.password = password


    @property
    def password(self):
        return self.__password

    @password.setter    
    def password(self, value):   
        self.__password = bcrypt.generate_password_hash(value).decode('utf-8') 
    
    @password.deleter    
    def password(self):  
        del self.__password