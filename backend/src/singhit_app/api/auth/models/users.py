from pydantic import BaseModel, EmailStr
from singhit_app.base.base_model import IDModel, DateTimeModel
from typing import Optional
from enum import Enum

class AppUserBase(BaseModel):
    email: EmailStr
    firstname: str
    lastname: Optional[str]

class AppUserCreate(AppUserBase):
    password: str

class AppUserResponse(IDModel, DateTimeModel, AppUserBase):
    is_active: bool
    is_verified: bool

class AppUserInDB(AppUserResponse):
    hashed_password: bytes

class AppUserWithRole(AppUserResponse):
    role: str

class ForgotPasswordRequest(BaseModel):
    email: EmailStr

class ResetPasswordRequest(BaseModel):
    token: str
    new_password: str

class VerificationToken(BaseModel):
    token: str

class AppUsersList(BaseModel):
    total_count: int
    total_pages: int
    data: list

class AppUsersRoles(str, Enum):
    admin       = "admin"
    member      = "member"
    hr          = "hr"
    team_lead   = "team_lead"

class UserRoleUpdate(BaseModel):
    user_id: str
    new_role: AppUsersRoles