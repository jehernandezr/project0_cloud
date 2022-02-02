from flask import jsonify, request
from flask_restful import Resource
from models.user_model import UserModel
from schemas.user_schema import user_schema
from flask_jwt_extended import jwt_required
from flask_jwt_extended import get_jwt_identity
from utils.db import db
from flask_jwt_extended import create_access_token


class LoginResource(Resource):
    def post(self):
        data = request.get_json()
        user = UserModel.query.filter_by(email= data['email']).first()
        user.verify_hash_password(data['password'])
        access_token = create_access_token(identity={'id': user.id, 'email': user.email})
        return jsonify(access_token=access_token)

class SignUpResource(Resource):
    def post(self):
        data = request.get_json()
        new_user = UserModel(name= data['name'],email= data['email'], password=data['password'], confirm_password= data['confirm_password'])

        db.session.add(new_user)
        db.session.commit()
        db.session.refresh(new_user)

        access_token = create_access_token(identity={'id': new_user.id, 'email': new_user.email})
        return jsonify(access_token=access_token, user=user_schema.dump(new_user))

class UserInfoResource(Resource):
    @jwt_required
    def get(self):
        user = get_jwt_identity()
        info = UserModel.query.filter_by(id= user.id).first()
        return user_schema.dump(info)
    
    def post(self):
        data = request.get_json()
        user = get_jwt_identity()
        info = UserModel.query.filter_by(id= user.id).first()

        if 'name' in data:
            info.name = data['name']

        db.session.add(info)
        db.session.commit()
        db.session.refresh(info)
        
        return user_schema.dump(info)
        