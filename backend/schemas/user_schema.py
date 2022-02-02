from utils.marshmallow import ma

class UserEschema(ma.Schema):
    class Meta:
        fields = ("id", "name", "email")


user_schema = UserEschema()
users_schema = UserEschema(many=True)