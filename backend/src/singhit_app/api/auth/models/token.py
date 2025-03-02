from pydantic import BaseModel

class AppToken(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: str | None = None

class LoginData(BaseModel):
    email: str
    password: str