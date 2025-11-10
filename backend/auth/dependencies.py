from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from jose import jwt, JWTError

from auth.jwt_handler import SECRET_KEY, ALGORITHM
from repositories.user_repository import load_users

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

def get_current_user(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: str = payload.get("user_id")

        if user_id is None:
            raise HTTPException(status_code=401, detail="Token inválido.")

        users = load_users()
        user = next((u for u in users if u["id"] == user_id), None)

        if user is None:
            raise HTTPException(status_code=401, detail="Usuário não encontrado.")

        return user

    except JWTError:
        raise HTTPException(status_code=401, detail="Token inválido ou expirado.")

def require_role(allowed_roles: list[str]):
    def role_checker(user = Depends(get_current_user)):
        if user["tipo"] not in allowed_roles:
            raise HTTPException(status_code=403, detail="Acesso negado.")
        return user
    return role_checker