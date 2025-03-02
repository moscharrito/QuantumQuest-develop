from pydantic_settings import BaseSettings
from databases import DatabaseURL
from starlette.config import Config
from starlette.datastructures import Secret

config = Config(".env")

PROJECT_TITLE = config("PROJECT_TITLE", cast=str)
APP_VERSION = config("APP_VERSION", cast=str)
ENV = config("ENV", cast=str)
ALLOWED_ORIGINS = config("ALLOWED_ORIGINS", cast=list)

WEB_BASE_URL = config("WEB_BASE_URL", cast=str)

POSTGRES_USER = config("POSTGRES_USER", cast=str)
POSTGRES_PASSWORD = config("POSTGRES_PASSWORD", cast=Secret)
POSTGRES_SERVER = config("POSTGRES_SERVER", cast=str)
POSTGRES_PORT = config("POSTGRES_PORT", cast=str, default="5432")
POSTGRES_DB = config("POSTGRES_DB", cast=str)

DATABASE_URL = config(
    "DATABASE_URL",
    cast=DatabaseURL,
    default=f"postgresql://{POSTGRES_USER}:{POSTGRES_PASSWORD}@{POSTGRES_SERVER}:{POSTGRES_PORT}/{POSTGRES_DB}"
)

SECRET_KEY = config("SECRET_KEY", cast=Secret)
JWT_ALGORITHM = config("JWT_ALGORITHM", cast=str, default="HS256")
ACCESS_TOKEN_EXPIRE_MINS = config("ACCESS_TOKEN_EXPIRE_MINS", cast=int, default=15)
PASSWORD_TOKEN_EXPIRE_MINS = config("PASSWORD_TOKEN_EXPIRE_MINS", cast=int, default=5)

SMTP_SERVER         = config("SMTP_SERVER", cast=str, default="localhost")
SMTP_PORT           = config("SMTP_PORT", cast=str, default="1025")
SMTP_USER           = config("SMTP_USER", cast=str, default="")
SMTP_PASSWORD       = config("SMTP_PASSWORD", cast=str, default="")
SMTP_FROM_EMAIL     = config("SMTP_FROM_EMAIL", cast=str, default="no-reply@singit.ca")
SMTP_FROM_NAME      = config("SMTP_FROM_NAME", cast=str, default="singhit-app")
ADMIN_USER_EMAIL    = config("ADMIN_USER_EMAIL", cast=str)
ADMIN_USER_PASSWORD = config("ADMIN_USER_PASSWORD", cast=str)

class Settings(BaseSettings):
    project_title: str = PROJECT_TITLE
    app_version: str = APP_VERSION
    env: str = ENV
    allowed_origin: list = ALLOWED_ORIGINS
    web_url_base: str = WEB_BASE_URL
    database_url: str = str(DATABASE_URL)
    secret_key: str = str(SECRET_KEY)
    algorithm: str = JWT_ALGORITHM
    access_token_expire_minutes: int = ACCESS_TOKEN_EXPIRE_MINS
    password_token_expire_mins: int = PASSWORD_TOKEN_EXPIRE_MINS
    smtp_server: str = SMTP_SERVER
    smtp_port: str = SMTP_PORT
    smtp_user: str = SMTP_USER
    smtp_password: str = SMTP_PASSWORD
    smtp_from_email: str = SMTP_FROM_EMAIL
    smtp_from_name: str = SMTP_FROM_NAME
    admin_user_email: str = ADMIN_USER_EMAIL
    admin_user_password: str = ADMIN_USER_PASSWORD

settings = Settings()