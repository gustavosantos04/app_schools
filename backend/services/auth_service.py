from repositories.user_repository import load_users
from auth.jwt_handler import create_access_token
from schemas.user_schema import LoginSchema
from auth.password_handler import verify_password

def authenticate_user(login_data: LoginSchema):
    users = load_users()

    # Busca pelo email
    user = next((u for u in users if u["email"] == login_data.email), None)
    if not user:
        return None

    # Por enquanto compara senha diretamente
    # (depois vamos aplicar bcrypt)
    if not verify_password(login_data.senha, user["senha"]):
        return None

    # Gera token JWT contendo ID e tipo
    token = create_access_token({
        "user_id": user["id"],
        "tipo": user["tipo"]
    })

    return {
        "token": token,
        "user": user
    }
