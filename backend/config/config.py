import os
from dotenv import  load_dotenv
from datetime import timedelta
load_dotenv()

class ConfigEventsServer ():
    postgres_user = os.getenv("USER_DB")
    postgres_db_name = os.getenv("DATABASE_NAME")
    postgres_password = os.getenv("PASSWORD")
    postgres_host = os.getenv("HOST_DB")
    jwt_secret_key = os.getenv("JWT_SECRET_KEY")
    jwt_expires_in = timedelta(seconds= int(os.getenv("JWT_ACCESS_TOKEN_EXPIRES"))*3600)


app_conf = ConfigEventsServer()
