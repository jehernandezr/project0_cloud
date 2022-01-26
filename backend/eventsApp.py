from flask import Flask, request
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_restful import Api, Resource
from config.config import dbconf

app = Flask(__name__)


app.config['SQLALCHEMY_DATABASE_URI'] = f"postgresql://{dbconf.postgres_user}:{dbconf.postgres_password}@{dbconf.postgres_host}:5432/{dbconf.postgres_db_name}"

app.config['SECRET_KEY'] = 'super-secret'

app.config['PROPAGATE_EXCEPTIONS'] = True


db = SQLAlchemy(app)
ma = Marshmallow(app)
api = Api(app)