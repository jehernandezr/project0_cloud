from flask import Flask, jsonify, request
from flask_marshmallow import Marshmallow
from flask_restful import Api, Resource
from flask_migrate import Migrate
from config.config import app_conf
from utils.db import db
from utils.crypto import bcrypt   
from utils.marshmallow import ma
from views import event_view, user_view
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from error_handler import CustomError


app = Flask(__name__, static_folder="../frontend/build", static_url_path="/")


app.config['SQLALCHEMY_DATABASE_URI'] = f"postgresql://{app_conf.postgres_user}:{app_conf.postgres_password}@{app_conf.postgres_host}:5432/{app_conf.postgres_db_name}"
app.config["JWT_SECRET_KEY"] = app_conf.jwt_secret_key
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = app_conf.jwt_expires_in
app.config['PROPAGATE_EXCEPTIONS'] = True

db.init_app(app)
bcrypt.init_app(app)

migrate = Migrate(app,db)
ma.init_app(app)

jwt = JWTManager(app)
cors = CORS(app)

api = Api(app)

@app.errorhandler(CustomError)
def handle_invalid_usage(error):
    response = jsonify(error.to_dict())
    response.status_code = error.status_code
    return response

@app.route("/")
def serve():
    return app.send_static_file("index.html")

api.add_resource(event_view.EventResourceList, '/api/v1/events')
api.add_resource(event_view.EventResourceDetail, '/api/v1/events/<string:event_id>')

api.add_resource(user_view.SignUpResource, '/api/v1/auth/sign-up')
api.add_resource(user_view.LoginResource, '/api/v1/auth/login')
api.add_resource(user_view.UserInfoResource, '/api/v1user/info')



