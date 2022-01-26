import os
from dotenv import  load_dotenv

load_dotenv()

class ConfigEventsServer ():
    postgres_user = os.getenv("USER_DB")
    postgres_db_name = os.getenv("DATABASE_NAME")
    postgres_password = os.getenv("PASSWORD")
    postgres_host = os.getenv("HOST_DB")


dbconf = ConfigEventsServer()
