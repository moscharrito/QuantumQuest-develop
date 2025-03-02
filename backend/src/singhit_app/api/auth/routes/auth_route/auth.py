from fastapi import APIRouter, Depends, HTTPException, status
from datetime import timedelta
from singhit_app.api.auth.utils.security import AuthPassword, AppJWTBearer
from singhit_app.api.auth.repositories.users import AppUsersRepo
from singhit_app.api.auth.models.token import AppToken
from singhit_app.core.config import settings
from fastapi.security import OAuth2PasswordRequestForm

router = APIRouter()

@router.post("/users/login", response_model=AppToken)
async def login(data: OAuth2PasswordRequestForm = Depends(), 
                user_repo: AppUsersRepo = Depends(AppUsersRepo)):
    
    user = await user_repo.get_user_by_email(email=data.username)

    auth_pass = AuthPassword()
    
    if not user or not auth_pass.verify_password(data.password, user.hashed_password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
    
    access_token_expires = timedelta(minutes=settings.access_token_expire_minutes)
    
    access_token = AppJWTBearer.create_access_token(
                    data={"sub": user.email}, 
                    expires_delta=access_token_expires)
    
    token_info = {"access_token": access_token, "token_type": "bearer"}
    
    return AppToken(**token_info)