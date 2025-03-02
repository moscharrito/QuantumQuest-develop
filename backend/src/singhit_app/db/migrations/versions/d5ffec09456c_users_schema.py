"""users schema

Revision ID: d5ffec09456c
Revises: 
Create Date: 2025-01-18 10:16:14.001184

"""
from typing import Sequence, Union, Tuple
from alembic import op
import sqlalchemy as sa
from singhit_app.core.logger import logger


revision: str = 'd5ffec09456c'
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def create_updated_at_trigger() -> None:
    logger.info('Create Trigger -> `update_updated_at_column`')
    op.execute(
        """
        CREATE OR REPLACE FUNCTION update_updated_at_column()
            RETURNS TRIGGER AS
        $$
        BEGIN
            NEW.updated_at = now();
            RETURN NEW;
        END;
        $$ language 'plpgsql';
        """
    )


def timestamps(indexed: bool = False) -> Tuple[sa.Column, sa.Column]:
    return (
        sa.Column(
            "created_at", 
            sa.TIMESTAMP(timezone=True), 
            server_default=sa.func.now(), 
            nullable=False, index=indexed
        ),
        sa.Column(
            "updated_at", 
            sa.TIMESTAMP(timezone=True), 
            server_default=sa.func.now(), 
            nullable=False, 
            index=indexed
        )
    )


def create_pending_users_table() -> None:
    op.create_table(
        "pending_users",
        sa.Column(
            "id", 
            sa.String(36),
            primary_key=True,
            server_default=sa.text("gen_random_uuid()::text")
        ),
        sa.Column("email", sa.String, unique=True, nullable=False),
        sa.Column("firstname", sa.Text, nullable=False),
        sa.Column("lastname", sa.Text, nullable=True),
        sa.Column("hashed_password", sa.LargeBinary, nullable=False),
        sa.Column("token", sa.String, nullable=False)
    )


def create_users_table() -> None:
    op.create_table(
        "users",
        sa.Column(
            "id", 
            sa.String(36),
            primary_key=True,
            server_default=sa.text("gen_random_uuid()::text")
        ),
        sa.Column("email", sa.String, unique=True, nullable=False),
        sa.Column("firstname", sa.Text, nullable=False),
        sa.Column("lastname", sa.Text, nullable=True),
        sa.Column("hashed_password", sa.LargeBinary, nullable=False),
        sa.Column("is_active", sa.Boolean, nullable=False, server_default='true'),
        sa.Column("is_verified", sa.Boolean, nullable=False, server_default='false'),
        *timestamps()
    )
    op.execute(
        """
        CREATE TRIGGER update_user_modtime
            BEFORE UPDATE
            ON users
            FOR EACH ROW
        EXECUTE PROCEDURE update_updated_at_column();
        """
    )

def create_roles_table() -> None:
    op.create_table(
        "roles",
        sa.Column(
            "id", 
            sa.String(36),
            primary_key=True,
            server_default=sa.text("gen_random_uuid()::text")
        ),
        sa.Column("role", sa.String, unique=True, nullable=False),
        sa.Column("description", sa.Text, nullable=True),
        *timestamps()
    )
    op.execute(
        """
        CREATE TRIGGER update_roles_modtime
            BEFORE UPDATE
            ON roles
            FOR EACH ROW
        EXECUTE PROCEDURE update_updated_at_column();
        """
    )

def create_user_roles_table() -> None:
    op.create_table(
        "user_roles",
        sa.Column(
            "id", 
            sa.String(36),
            primary_key=True,
            server_default=sa.text("gen_random_uuid()::text")
        ),
        sa.Column("user_id", sa.String, sa.ForeignKey("users.id"), nullable=False),
        sa.Column("role_id", sa.String, sa.ForeignKey("roles.id"), nullable=False),
        *timestamps()
    )
    op.execute(
        """
        CREATE TRIGGER update_user_roles_modtime
            BEFORE UPDATE
            ON user_roles
            FOR EACH ROW
        EXECUTE PROCEDURE update_updated_at_column();
        """
    )

def create_permissions_table() -> None:
    op.create_table(
        "permissions",
        sa.Column(
            "id", 
            sa.String(36),
            primary_key=True,
            server_default=sa.text("gen_random_uuid()::text")
        ),
        sa.Column("name", sa.String, unique=True, nullable=False),
        sa.Column("description", sa.String, nullable=True),
        *timestamps(),
    )
    op.execute(
        """
        CREATE TRIGGER update_permissions_modtime
            BEFORE UPDATE
            ON permissions
            FOR EACH ROW
        EXECUTE PROCEDURE update_updated_at_column();
        """
    )

def create_role_permissions_table() -> None:
    op.create_table(
        "role_permissions",
        sa.Column(
            "id", 
            sa.String(36),
            primary_key=True,
            server_default=sa.text("gen_random_uuid()::text")
        ),
        sa.Column("role_id", sa.String, sa.ForeignKey("roles.id"), nullable=False),
        sa.Column("permission_id", sa.String, sa.ForeignKey("permissions.id"), nullable=False),
        *timestamps()
    )
    op.execute(
        """
        CREATE TRIGGER update_role_permissions_modtime
            BEFORE UPDATE
            ON role_permissions
            FOR EACH ROW
        EXECUTE PROCEDURE update_updated_at_column();
        """
    )

def create_user_activity_log_table() -> None:
    op.create_table(
        "user_activity_logs",
        sa.Column(
            "id", 
            sa.String(36),
            primary_key=True,
            server_default=sa.text("gen_random_uuid()::text")
        ),
        sa.Column("user_id", sa.String, sa.ForeignKey("users.id"), nullable=False),
        sa.Column("action", sa.String, nullable=False),
        sa.Column("timestamp", sa.DateTime, nullable=False, server_default=sa.func.now()),
        sa.Column("metadata", sa.JSON, nullable=True)
    )


def upgrade() -> None:
    logger.info("Migrating Application Database schema")
    create_updated_at_trigger()
    create_pending_users_table()
    create_users_table()
    create_roles_table()
    create_user_roles_table()
    create_permissions_table()
    create_role_permissions_table()
    create_user_activity_log_table()
    logger.info("Database schema migration completed")


def downgrade() -> None:
    logger.info("Downgrading Application Database schema")
    op.drop_table("role_permissions")
    op.drop_table("user_activity_logs")
    op.drop_table("user_roles")
    op.drop_table("roles")
    op.drop_table("permissions")
    op.drop_table("users")
    op.drop_table("pending_users")
    op.execute("DROP FUNCTION update_updated_at_column CASCADE")
    logger.info("Database schema downgrading completed")