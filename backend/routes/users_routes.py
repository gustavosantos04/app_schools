from fastapi import APIRouter, HTTPException
from schemas.user_schema import UserCreate, UserResponse
from services.user_service import create_user_service, list_users_service

router = APIRouter(prefix="/users", tags=["users"])

@router.post("/", response_model=UserResponse)
def create_user(user: UserCreate):
    try:
        created = create_user_service(user)
        return created
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/", response_model=list[UserResponse])
def list_users(tipo: str | None = None):
    return list_users_service(tipo)
