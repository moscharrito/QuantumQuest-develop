from fastapi import APIRouter
from singhit_app.api.health.routes.health import router as health_router

router = APIRouter()
router.include_router(health_router, tags=["Health"])