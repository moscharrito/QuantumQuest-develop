from datetime import timedelta
from fastapi import APIRouter, Depends, HTTPException, status
from singhit_app.api.auth.dependencies.auth_user import get_current_user, get_mail_service
from singhit_app.api.auth.utils.security import AppJWTBearer
from singhit_app.api.auth.utils.mail_templates import password_reset_email
from singhit_app.api.auth.repositories.users import AppUsersRepo
from singhit_app.services.mail_service import MailService
from singhit_app.core.config import settings
from singhit_app.api.auth.models.users import (
    AppUserInDB, 
    AppUserResponse, 
    AppUserCreate,
    ResetPasswordRequest,
    ForgotPasswordRequest,
    VerificationToken,
    AppUsersList,
    AppUserWithRole,
    UserRoleUpdate,
    AppUsersRoles
)

router = APIRouter()

@router.post("/users/signup")
async def create_user(
    user: AppUserCreate, 
    user_repo: AppUsersRepo = Depends(AppUsersRepo)):
    
    existing_user = await user_repo.get_user_by_email(user.email)
    
    if existing_user:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email already registered")
    
    response = await user_repo.create_pending_user(user=user)
    
    return response

@router.get("/users/me", response_model=AppUserWithRole)
def current_user(current_user=Depends(get_current_user)):
    return current_user

@router.get("/users/{id}", response_model=AppUserResponse)
async def get_user_by_id(
    id: str,
    current_user=Depends(get_current_user),
    user_repo: AppUsersRepo = Depends(AppUsersRepo)) -> AppUserResponse:
    
    if not current_user:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Unathenticated user!")
    
    user_data = await user_repo.get_user_by_id(id=id)

    if not user_data:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, 
            detail=f"No user found for id: {id}"
        )

    return user_data

@router.post("/users/forgot-password")
async def forgot_password(
    request: ForgotPasswordRequest,
    user_repo: AppUsersRepo = Depends(AppUsersRepo),
    mail_service: MailService = Depends(get_mail_service),
):
    user = await user_repo.get_user_by_email(request.email)
    
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    expire_delta = timedelta(minutes=settings.password_token_expire_mins)
    
    reset_token = AppJWTBearer.create_access_token(
                    data={"sub": user.email}, 
                    expires_delta=expire_delta)

    reset_link = f"{settings.web_url_base}/auth/create-new-password?token={reset_token}"

    mail_body = password_reset_email(firstname=user.firstname, reset_link=reset_link)
    
    mail_service.send_email([user.email], "SinghIT: Password Reset Request", mail_body)

    return {"message": "Password reset email sent"}

@router.post("/users/reset-password", response_model=AppUserInDB, response_model_exclude={"hashed_password"})
async def reset_password(
    request: ResetPasswordRequest,
    user_repo: AppUsersRepo = Depends(AppUsersRepo)
):
    token_data = AppJWTBearer.decode_token(request.token)
    
    if not token_data:
        raise HTTPException(status_code=400, detail="Invalid or expired token")

    user = await user_repo.get_user_by_email(token_data.email)
    
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    updated_user = await user_repo.update_user_password(user.id, request.new_password)

    return updated_user

@router.post("/users/verify", response_model=AppUserResponse)
async def verify_user(
    request: VerificationToken,
    user_repo: AppUsersRepo = Depends(AppUsersRepo)
):
    result = await user_repo.verify_user(request.token)

    if not result:
        raise HTTPException(status_code=400, detail="Invalid or expired token")

    return(AppUserResponse(**result))

@router.delete("/users/delete/{id}", response_model=AppUserInDB, response_model_exclude={"hashed_password"})
async def delete_user(
    id: str,
    current_user=Depends(get_current_user),
    user_repo: AppUsersRepo = Depends(AppUsersRepo)
):
    if not current_user:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Unathenticated user!")
    
    result = await user_repo.delete_user_record(id=id)

    if not result:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"No user record found for {id}")
    
    return result

@router.get("/users", response_model=AppUsersList)
async def get_all_users(
    page_number:int = 1,
    page_size: int = 10,
    current_user = Depends(get_current_user),
    user_repo: AppUsersRepo = Depends(AppUsersRepo)
):
    if not current_user:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Unathenticated user!")
    
    users_data = await user_repo.get_all_users_record(page_number=page_number, page_size=page_size)

    return users_data

@router.put("/users/role")
async def update_user_role(
    update_data: UserRoleUpdate,
    current_user = Depends(get_current_user),
    user_repo: AppUsersRepo = Depends(AppUsersRepo)
):
    if not current_user:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Unathenticated user!")
    
    if current_user.role != AppUsersRoles.admin.value:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only admin users can modify roles"
        )

    if update_data.user_id == current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Admins cannot modify their own role"
        )

    target_user = await user_repo.get_user_by_id(id=update_data.user_id)
    if not target_user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )

    existing_role = await user_repo.get_role_by_name(role_name=update_data.new_role.value)
    if not existing_role:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Invalid role: {update_data.new_role.value}"
        )

    updated = await user_repo.update_role_record(
        user_id=update_data.user_id, 
        role_id=existing_role.id
    )

    if not updated:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to update user role"
        )

    return {"status": "success", "message": f"User role updated to {update_data.new_role.value}"}