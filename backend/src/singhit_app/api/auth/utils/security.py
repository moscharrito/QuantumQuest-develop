import bcrypt
from datetime import datetime, timedelta, timezone
from jose import jwt, JWTError
from singhit_app.core.config import settings
from fastapi import Request, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from singhit_app.api.auth.models.token import TokenData


class AuthPassword:
    def hash_password(self, password: str) -> bytes:
        salt = bcrypt.gensalt()
        return bcrypt.hashpw(password.encode('utf-8'), salt)

    def verify_password(self, plain_password: str, hashed_password: bytes) -> bool:
        return bcrypt.checkpw(plain_password.encode('utf-8'), hashed_password)


class AppJWTBearer(HTTPBearer):
    def __init__(self, auto_error: bool = True):
        super().__init__(auto_error=auto_error)

    async def __call__(self, request: Request) -> str:
        credentials: HTTPAuthorizationCredentials = await super().__call__(request)
        if credentials:
            if credentials.scheme.lower() != "bearer":
                raise HTTPException(
                    status_code=status.HTTP_401_UNAUTHORIZED,
                    detail="Invalid authentication scheme",
                )
            return credentials.credentials
        else:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid authorization credentials",
            )
        
    @staticmethod
    def create_access_token(data: dict, expires_delta: timedelta = None):
        to_encode = data.copy()
        if expires_delta:
            expire = datetime.now(timezone.utc) + expires_delta
        else:
            expire = datetime.now(timezone.utc) + timedelta(minutes=settings.access_token_expire_minutes)
        to_encode.update({"exp": expire})
        
        encoded_jwt = jwt.encode(to_encode, settings.secret_key, algorithm=settings.algorithm)
        return encoded_jwt

    @staticmethod
    def decode_token(token: str) -> TokenData | None:
        try:
            payload = jwt.decode(
                        token=token, 
                        key=settings.secret_key, 
                        algorithms=[settings.algorithm])
            
            email = payload.get("sub")
            
            if email is None:
                return None
            return TokenData(email=email)
        except JWTError:
            return None