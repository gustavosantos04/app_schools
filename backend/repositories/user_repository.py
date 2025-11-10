import json
import os
from uuid import uuid4
from typing import List, Optional
from datetime import datetime

DATA_FILE = "data/users.json"

# Garante que o arquivo exista
os.makedirs("data", exist_ok=True)
if not os.path.exists(DATA_FILE):
    with open(DATA_FILE, "w") as f:
        json.dump([], f)

def load_users() -> List[dict]:
    with open(DATA_FILE, "r") as f:
        return json.load(f)

def save_users(users: List[dict]):
    with open(DATA_FILE, "w") as f:
        json.dump(users, f, indent=4)

def create_user_repo(data: dict) -> dict:
    users = load_users()

    # Verifica se já existe email
    if any(u["email"] == data["email"] for u in users):
        raise ValueError("E-mail já cadastrado.")

    new_user = {
        "id": str(uuid4()),
        "nome": data["nome"],
        "email": data["email"],
        "senha": data["senha"],  # NO futuro: password hashing
        "tipo": data["tipo"],
        "criado_em": datetime.utcnow().isoformat()
    }

    users.append(new_user)
    save_users(users)
    return new_user

def list_users_repo(tipo: Optional[str] = None) -> List[dict]:
    users = load_users()
    if tipo:
        return [u for u in users if u["tipo"] == tipo]
    return users
