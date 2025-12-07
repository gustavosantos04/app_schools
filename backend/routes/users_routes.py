from fastapi import APIRouter, HTTPException, Depends
from schemas.user_schema import UserCreate, UserUpdate, UserResponse
from services.user_service import (
    create_user_service,
    list_users_service,
    update_user_service,
    delete_user_service,
)
from auth.dependencies import get_current_user

router = APIRouter(prefix="/users", tags=["users"])

# 🔐 Permissão: superadmin e professor
def only_admins_or_teachers(current_user = Depends(get_current_user)):
    if current_user["tipo"] not in ["superadmin", "professor"]:
        raise HTTPException(
            status_code=403,
            detail="Acesso permitido apenas para superadmin e professor."
        )
    return current_user


# ============================================================
# CREATE USER
# ============================================================
@router.post("/", response_model=UserResponse, dependencies=[Depends(only_admins_or_teachers)])
def create_user(user: UserCreate):
    try:
        return create_user_service(user)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


# ============================================================
# LIST USERS
# ============================================================
@router.get("/", response_model=list[UserResponse], dependencies=[Depends(only_admins_or_teachers)])
def list_users(tipo: str | None = None):
    return list_users_service(tipo)


# ============================================================
# UPDATE USER
# ============================================================
@router.put("/{user_id}", response_model=UserResponse, dependencies=[Depends(only_admins_or_teachers)])
def update_user(user_id: str, data: UserUpdate):
    updated = update_user_service(user_id, data)

    if not updated:
        raise HTTPException(status_code=404, detail="Usuário não encontrado.")

    return updated


# ============================================================
# DELETE USER
# ============================================================
@router.delete("/{user_id}", dependencies=[Depends(only_admins_or_teachers)])
def delete_user(user_id: str):
    deleted = delete_user_service(user_id)

    if not deleted:
        raise HTTPException(status_code=404, detail="Usuário não encontrado.")

    return {"message": "Usuário removido com sucesso"}
