from singhit_app.base.base_repo import BaseRepository
from datetime import timedelta
from math import ceil
from singhit_app.core.config import settings
from singhit_app.api.auth.utils.security import AuthPassword, AppJWTBearer
from singhit_app.api.auth.utils.mail_templates import verify_email

from singhit_app.api.auth.models.users import (
    AppUserCreate, 
    AppUserResponse, 
    AppUserInDB, 
    AppUsersList,
    AppUsersRoles,
    AppUserWithRole
)

CREATE_PENDING_USER_QUERY = """
    INSERT INTO pending_users (email, hashed_password, firstname, lastname, token)
    VALUES (:email, :hashed_password, :firstname, :lastname, :token)
    RETURNING email, firstname, lastname;
"""

CREATE_USER_QUERY = """
    INSERT INTO users (email, hashed_password, firstname, lastname, is_verified) 
    VALUES (:email, :hashed_password, :firstname, :lastname, :is_verified)
    RETURNING id, email, firstname, lastname, is_active, is_verified, created_at, updated_at;
"""

GET_USER_BY_EMAIL_QUERY = """
    SELECT *
    FROM users 
    WHERE email = :email;
"""

GET_USER_BY_ID_QUERY = """
    SELECT id, email, firstname, lastname, is_active, is_verified, created_at, updated_at
    FROM users 
    WHERE id = :id;
"""

UPDATE_USER_PASSWORD_QUERY = """
    UPDATE users
    SET hashed_password = :hashed_password
    WHERE id = :id
    RETURNING *
"""

DELETE_USER_QUERY = """
    DELETE FROM users
    WHERE id = :id
    RETURNING *
"""

GET_ALL_USERS_QUERY = """
    SELECT id, email, firstname, lastname, is_active, is_verified, created_at, updated_at FROM users
    ORDER BY created_at
    LIMIT :limit 
    OFFSET :offset
"""

GET_ROLE_QUERY = """
    SELECT id
    FROM roles
    WHERE role = :role
"""

CREATE_USER_ROLE_QUERY = """
    INSERT INTO user_roles (user_id, role_id)
    VALUES (:user_id, :role_id)
    RETURNING *
"""

GET_ROLE_BY_USER_ID_QUERY = """
    SELECT r.role 
    FROM user_roles ur
    JOIN roles r ON ur.role_id = r.id 
    WHERE ur.user_id = :user_id
"""

GET_ROLE_BY_NAME = """
    SELECT * FROM roles 
    WHERE role = :role_name
"""

UPDATE_ROLE_QUERY = """
    UPDATE user_roles
    SET role_id = :role_id 
    WHERE user_id = :user_id
    RETURNING *
"""

class AppUsersRepo(BaseRepository):
    def __init__(self):
        super().__init__()

    async def create_pending_user(self, user: AppUserCreate):
        from singhit_app.api.auth.dependencies.auth_user import get_mail_service
        
        hashed_password = AuthPassword().hash_password(user.password)

        query = CREATE_PENDING_USER_QUERY

        expire_delta = timedelta(minutes=settings.password_token_expire_mins)
    
        token = AppJWTBearer.create_access_token(
                    data={"sub": user.email}, 
                    expires_delta=expire_delta
                )

        values = {
            "email": user.email,
            "hashed_password": hashed_password,
            "token": token,
            "firstname": user.firstname,
            "lastname":  user.lastname
        }

        await self.db.fetch_one(query=query, values=values)

        verify_link = f"{settings.web_url_base}/auth/VerifyAccount?token={token}"

        mail_body = verify_email(firstname=user.firstname, verify_link=verify_link)

        mail_service = get_mail_service()
        mail_service.send_email([user.email], "SinghIT: Account Verification", mail_body)

        return {"message": "Account Verification email sent"}
    
    async def create_user(self, email: str, hashed_password: bytes, firstname: str, lastname: str, is_verified: bool):
        
        query = CREATE_USER_QUERY
        
        values = {
                    "email": email, 
                    "hashed_password": hashed_password, 
                    "firstname": firstname, 
                    "lastname": lastname,
                    "is_verified": is_verified
                }
        
        result = await self.db.fetch_one(query=query, values=values)

        return result
    
    async def get_user_by_email(self, email: str) -> AppUserInDB:
        query = GET_USER_BY_EMAIL_QUERY
        values = {"email": email}
        result = await self.db.fetch_one(query=query, values=values)
        
        if result:
            return AppUserInDB(**result)
        
        return None
    
    async def get_user_by_id(self, id: str) -> AppUserResponse:
        query = GET_USER_BY_ID_QUERY
        values = {"id": id}
        result = await self.db.fetch_one(query=query, values=values)
        
        if result:
            return AppUserResponse(**result)
        
        return None
    
    async def update_user_password(self, id: str, new_password: str) -> AppUserInDB:

        hashed_password = AuthPassword().hash_password(new_password)

        query = UPDATE_USER_PASSWORD_QUERY
        values = {"id": id, "hashed_password": hashed_password}
        result = await self.db.fetch_one(query=query, values=values)

        if result:
            return AppUserInDB(**result)
        
        return None
    
    async def verify_user(self, token: str):
        delete_query = "DELETE FROM pending_users WHERE token = :token"
        token_data = AppJWTBearer.decode_token(token)
    
        if not token_data:
            await self.db.fetch_one(delete_query, {"token": token})
            return None
        
        select_query = "SELECT * FROM pending_users WHERE token = :token"
        
        user_data = await self.db.fetch_one(select_query, {"token": token})

        if not user_data:
            return None
        
        new_user = await self.create_user(
                        email=user_data["email"],
                        hashed_password=user_data["hashed_password"],
                        firstname=user_data["firstname"],
                        lastname=user_data["lastname"],
                        is_verified=True
                    )
        
        await self.create_user_role(user_id=new_user["id"], role=AppUsersRoles.member.value)
        
        await self.db.fetch_one(delete_query, {"token": token})
        return new_user
    
    async def delete_user_record(self, id: str) -> AppUserInDB:
        query = DELETE_USER_QUERY
        values = {"id": id}

        user_record = await self.db.fetch_one(query=query, values=values)

        return user_record
    
    async def get_all_users_record(self, page_number: int, page_size: int) -> AppUsersList:

        total_count_query = "SELECT COUNT(*) FROM users"
        total_count_record = await self.db.fetch_one(total_count_query)

        if total_count_record is None:
            total_count = 0
        else:
            total_count = total_count_record[0]

        total_pages = ceil(total_count / page_size) if total_count > 0 else 1
        offset = (page_number - 1) * page_size

        query = GET_ALL_USERS_QUERY
        values = {
            "offset": offset,
            "limit": page_size
        }

        users_record = await self.db.fetch_all(query=query, values=values)

        users_data = [dict(user) for user in users_record]

        if not users_record:
            return AppUsersList(data=[], total_count=total_count, total_pages=total_pages)

        return AppUsersList(
            data=users_data,
            total_count=total_count,
            total_pages=total_pages
        )
    
    async def get_role(self, role: str):
        query = GET_ROLE_QUERY
        values = {"role": role}

        role_data = await self.db.fetch_one(query=query, values=values)

        return role_data
    
    async def create_user_role(self, user_id: str, role: AppUsersRoles):
        role_data = await self.get_role(role)
        
        role_id = role_data["id"]
        
        query = CREATE_USER_ROLE_QUERY
        values = {"user_id": user_id, "role_id": role_id}

        user_role = await self.db.fetch_one(query=query, values=values)

        return user_role
    
    async def get_role_by_userid(self, user_id: str):
        query = GET_ROLE_BY_USER_ID_QUERY
        values = {"user_id": user_id}

        role_data = await self.db.fetch_one(query=query, values=values)

        return role_data
    
    async def get_role_by_name(self, role_name: str):
        query = GET_ROLE_BY_NAME
        values = {"role_name": role_name}
        
        return await self.db.fetch_one(query=query, values=values)
    
    async def update_role_record(self, user_id: str, role_id: str):
        query = UPDATE_ROLE_QUERY
        values = {"role_id": role_id, "user_id": user_id}

        return await self.db.fetch_one(query=query, values=values)