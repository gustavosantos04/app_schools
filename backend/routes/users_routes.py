from fastapi import APIRouter, HTTPException, Depends
from schemas.user_schema import UserCreate, UserResponse
from services.user_service import create_user_service, list_users_service
from services.auth_service import authenticate_user
from auth.dependencies import get_current_user

router = APIRouter(prefix="/users", tags=["users"])

# 🔐 Permitir somente SUPERADMIN e PROFESSOR
def only_admins_or_teachers(current_user = Depends(get_current_user)):
    if current_user["tipo"] not in ["superadmin", "professor"]:
        raise HTTPException(
            status_code=403,
            detail="Acesso permitido apenas para superadmin e professor."
        )
    return current_user

@router.post("/", response_model=UserResponse, dependencies=[Depends(only_admins_or_teachers)])
def create_user(user: UserCreate):
    try:
        created = create_user_service(user)
        return created
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/", response_model=list[UserResponse])
def list_users(
    tipo: str | None = None,
    current_user = Depends(only_admins_or_teachers)
):
    return list_users_service(tipo)
