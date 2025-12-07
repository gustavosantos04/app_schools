from repositories.user_repository import create_user_repo, list_users_repo
from schemas.user_schema import UserCreate
from auth.password_handler import hash_password
from repositories.user_repository import load_users, save_users
from auth.password_handler import hash_password

def create_user_service(user_data: UserCreate):
    user_dict = user_data.dict()
    user_dict["senha"] = hash_password(user_dict["senha"])  # ← HASH AQUI
    return create_user_repo(user_dict)

def list_users_service(tipo: str = None):
    return list_users_repo(tipo)

def update_user_service(user_id: str, data):
    users = load_users()

    user = next((u for u in users if u["id"] == user_id), None)
    if not user:
        return None

    # Atualizar campos
    if data.nome is not None:
        user["nome"] = data.nome

    if data.email is not None:
        user["email"] = data.email

    if data.tipo is not None:
        user["tipo"] = data.tipo

    if data.senha:  # senha enviada e não vazia
        user["senha"] = hash_password(data.senha)

    save_users(users)
    return user


def delete_user_service(user_id: str):
    users = load_users()

    user = next((u for u in users if u["id"] == user_id), None)
    if not user:
        return None

    users = [u for u in users if u["id"] != user_id]
    save_users(users)
    return True