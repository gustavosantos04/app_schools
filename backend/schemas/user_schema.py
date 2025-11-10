from pydantic import BaseModel, EmailStr
from typing import Literal

UserRole = Literal["superadmin", "professor", "aluno"]

class UserCreate(BaseModel):
    nome: str
    email: EmailStr
    senha: str
    tipo: UserRole

class UserResponse(BaseModel):
    id: str
    nome: str
    email: EmailStr
    tipo: UserRole
    criado_em: str

class LoginSchema(BaseModel):
    email: EmailStr
    senha: str

class LoginResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserResponse