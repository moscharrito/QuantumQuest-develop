from fastapi import APIRouter
from singhit_app.api.auth.routes.auth_route.auth import router as auth_router
from singhit_app.api.auth.routes.user_route.users import router as user_router

router = APIRouter()
router.include_router(auth_router, tags=["Auth"])
router.include_router(user_router, tags=["Auth"])