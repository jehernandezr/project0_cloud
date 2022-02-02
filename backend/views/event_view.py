from flask import request
from flask_restful import Resource
from flask_jwt_extended import jwt_required
from flask_jwt_extended import get_jwt_identity
from models.events_model import EventsModel
from schemas.event_schema import event_schema, events_schema
from utils.db import db
from error_handler import CustomError
 

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

        if len(data.items()) == 0:
            raise CustomError("Needs to provide info for create", status_code=400)
        
        new_event = EventsModel(keeper_id = user['id'])

        
        for i in data:
            setattr(new_event, i, data[i])

        db.session.add(new_event)
        db.session.commit()

        return event_schema.dump(new_event)

class EventResourceDetail(Resource):
    
    @jwt_required()
    def get(self, event_id):
        user = get_jwt_identity()
        event = EventsModel.query.filter_by(id= event_id, keeper_id=user['id']).first()
        return event_schema.dump(event)

    @jwt_required()
    def put(self, event_id):
        user = get_jwt_identity()
        old_event = EventsModel.query.filter_by(id= event_id, keeper_id=user['id']).first()

        if not old_event: 
            raise CustomError("No such event!", status_code=404)

        data = request.get_json()

        if len(data.items()) == 0:
            raise CustomError("Needs to provide update info", status_code=400)

        for i in data:
            setattr(old_event, i, data[i])

        db.session.add(old_event)
        db.session.commit()
        db.session.refresh(old_event)
        return event_schema.dump(old_event)

    @jwt_required()
    def delete(self, event_id):
            user = get_jwt_identity()
            event_to_delete = EventsModel.query.filter_by(id= event_id, keeper_id=user['id']).first()
            if not event_to_delete: 
                raise CustomError("No such event!", status_code=404)
            
            db.session.delete(event_to_delete)
            db.session.commit()
            return '', 204