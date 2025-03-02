from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.sessions import SessionMiddleware
from fastapi.responses import JSONResponse
from singhit_app.api.health.routes import router as health_router
from singhit_app.api.auth.routes import router as auth_router
from singhit_app.db import app_events
from singhit_app.core.config import settings
from singhit_app.core.logger import logger
import uvicorn

tags_metadata = [
    {"name": "Health", "description": "Health status of the API Endpoints"},
    {"name": "Auth", "description": "Authenticate and Manage App Users"}
]

def create_app() -> FastAPI:
    app = FastAPI(
        title=settings.project_title,
        description=f"SinghIT Web App Analytics API Service",
        version=settings.app_version,
        openapi_tags=tags_metadata
    )

    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.allowed_origin,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"]
    )

    app.add_middleware(
        SessionMiddleware, secret_key=settings.secret_key
    )

    app.include_router(health_router, prefix="/health")
    app.include_router(auth_router, prefix="/auth")

    app.add_event_handler('startup', app_events.startup_event)
    app.add_event_handler('shutdown', app_events.shutdown_event)

    return app

app = create_app()

@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    return JSONResponse(
        status_code=500,
        content={"detail": "An internal error occurred."},
    )

def main():
    logger.info(f"Starting SinghIT API Endpoints Service")
    uvicorn.run(f"singhit_app.api.server:app", 
                host="0.0.0.0", 
                port=9000,
                workers=1,
                reload=False if 'prod' in settings.env else True)

if __name__ == "__main__":
    main()