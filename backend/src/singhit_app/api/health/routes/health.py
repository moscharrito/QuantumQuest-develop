from fastapi import APIRouter

router = APIRouter()

@router.get("/status")
async def health_api() -> dict:
    status = {"status": "ok"}
    return status