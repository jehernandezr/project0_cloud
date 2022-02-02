from flask import request
from flask_restful import Resource
from flask_jwt_extended import jwt_required
from flask_jwt_extended import get_jwt_identity
from models.events_model import EventsModel
from schemas.event_schema import event_schema, events_schema
from datetime import datetime
from utils.db import db
 

class EventResourceList(Resource):

    @jwt_required()
    def get(self):
        user = get_jwt_identity()
        print(user)
        event_list = EventsModel.query.filter_by(keeper_id=user['id']).all()
        
        return events_schema.dump(event_list)

    @jwt_required()
    def post(self):
        user = get_jwt_identity()
        data = request.get_json()
        new_event = EventsModel(name=data['name'],
        place= data['place'],
        keeper_id = user['id'],
        starts_at= datetime.fromisoformat(data["starts_at"]),
        ends_at= datetime.fromisoformat(data["ends_at"]) ,
        address = data['address'],
        category = data['category'],
        is_face_to_face = data['is_face_to_face'])

        db.session.add(new_event)
        db.session.commit()

        return event_schema.dump(new_event)

class EventResourceDetail(Resource):
    
    @jwt_required()
    def get(self, event_id):
        user = get_jwt_identity()
        event = EventsModel.query.filter_by(id= event_id, keeper_id=user.id).first()
        return event_schema.dump(event)

    @jwt_required()
    def put(self, event_id):
        user = get_jwt_identity()
        old_event = EventsModel.query.filter_by(id= event_id, keeper_id=user.id).first()
        data = request.get_json()

        for i in data:
            old_event[i] = data[i]

        db.session.add(old_event)
        db.session.commit()
    
    @jwt_required()
    def delete(self, event_id):
            user = get_jwt_identity()
            event_to_delete = EventsModel.query.filter_by(id= event_id, keeper_id=user.id).first()
            db.session.delete(event_to_delete)
            db.session.commit()
            return '', 204