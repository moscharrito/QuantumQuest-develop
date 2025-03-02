from fastapi import HTTPException, status, Depends
from fastapi.security import OAuth2PasswordBearer
from singhit_app.api.auth.models.users import AppUserWithRole
from singhit_app.api.auth.utils.security import AppJWTBearer
from singhit_app.api.auth.repositories.users import AppUsersRepo
from singhit_app.services.mail_service import MailService
from singhit_app.core.config import settings

oauth2_scheme = OAuth2PasswordBearer(tokenUrl=f"/auth/users/login")

async def get_current_user(
        token: str = Depends(oauth2_scheme),
        user_repo: AppUsersRepo = Depends(AppUsersRepo)) -> AppUserWithRole:
    
    token_data = AppJWTBearer.decode_token(token)
    
    if not token_data or not token_data.email:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token. Try to login again",
        )
    
    user = await user_repo.get_user_by_email(email=token_data.email)
    
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found",
        )
    
    user = user.model_dump()

    user.pop("hashed_password")
    
    role_data = await user_repo.get_role_by_userid(user_id=user["id"])

    user["role"] = role_data["role"]
    
    return AppUserWithRole(**user)


def get_mail_service():
    return MailService(
        smtp_server=settings.smtp_server,
        smtp_port=settings.smtp_port,
        smtp_user=settings.smtp_user,
        smtp_password=settings.smtp_password,
        from_email=settings.smtp_from_email,
        from_name=settings.smtp_from_name
    )