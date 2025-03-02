from fastapi import APIRouter
from singhit_app.servers.analytics.routes.health.health import router as health_router

router = APIRouter()
router.include_router(health_router, tags=["Health"])