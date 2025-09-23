from pydantic import BaseModel, EmailStr
from enum import Enum

class UserType(str, Enum):
    admin = "admin"
    professor = "professor"
    aluno = "aluno"

class UserBase(BaseModel):
    nome: str
    email: EmailStr
    tipo: UserType

class UserCreate(UserBase):
    senha: str

class UserResponse(UserBase):
    id: int

    class Config:
        orm_mode = True
