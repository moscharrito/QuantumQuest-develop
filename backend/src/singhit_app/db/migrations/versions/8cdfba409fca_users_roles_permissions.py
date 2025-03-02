"""users roles permissions

Revision ID: 8cdfba409fca
Revises: d5ffec09456c
Create Date: 2025-01-18 10:18:22.535541

"""
from typing import Sequence, Union
from alembic import op
import sqlalchemy as sa
from datetime import datetime, timezone
from singhit_app.core.logger import logger
from singhit_app.core.config import settings
from singhit_app.api.auth.utils.security import AuthPassword

revision: str = '8cdfba409fca'
down_revision: Union[str, None] = 'd5ffec09456c'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None

admin_password = AuthPassword().hash_password(settings.admin_user_password)

def create_admin_user() -> None:
    users_table = sa.table(
        "users",
        sa.column("email"),
        sa.column("firstname"),
        sa.column("lastname"),
        sa.column("hashed_password"),
        sa.column("is_active"),
        sa.column("is_verified")
    )
    op.bulk_insert(
        users_table,
        [
            {
                "email": settings.admin_user_email,
                "firstname": "admin",
                "lastname": "admin",
                "hashed_password": admin_password,
                "is_active": True,
                "is_verified": True
            }
        ]
    )

def populate_roles_table() -> None:
    roles_table = sa.table(
        "roles",
        sa.column("role", sa.String),
        sa.column("description", sa.String)
    )
    op.bulk_insert(
        roles_table,
        [
            {
             "role": "admin", 
             "description": "Administrator with full access"
            },
            {
             "role": "hr", 
             "description": "HR Manager with elevated privileges"
            },
            {
             "role": "team_lead", 
             "description": "Team Lead with elevated privileges"
            },
            {
             "role": "member", 
             "description": "Default user role with limited privileges", 
            }
        ]
    )

def assign_admin_role() -> None:
    users_table = sa.table("users", sa.column("id"), sa.column("email"))
    admin_user_query = sa.select(users_table.c.id).where(users_table.c.email == settings.admin_user_email)
    admin_user_id = op.get_bind().execute(admin_user_query).scalar()

    roles_table = sa.table("roles", sa.column("id"), sa.column("role"))
    admin_role_query = sa.select(roles_table.c.id).where(roles_table.c.role == "admin")
    admin_role_id = op.get_bind().execute(admin_role_query).scalar()

    user_roles_table = sa.table("user_roles", sa.column("user_id"), sa.column("role_id"))
    op.execute(
        user_roles_table.insert().values(user_id=admin_user_id, role_id=admin_role_id)
    )


def upgrade() -> None:
    logger.info("Migrating Users Roles and Permissions")
    create_admin_user()
    populate_roles_table()
    assign_admin_role()

def downgrade() -> None:
    pass