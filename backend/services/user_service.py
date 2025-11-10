from repositories.user_repository import create_user_repo, list_users_repo
from schemas.user_schema import UserCreate
from auth.password_handler import hash_password

def create_user_service(user_data: UserCreate):
    user_dict = user_data.dict()
    user_dict["senha"] = hash_password(user_dict["senha"])  # ← HASH AQUI
    return create_user_repo(user_dict)

def list_users_service(tipo: str = None):
    return list_users_repo(tipo)
