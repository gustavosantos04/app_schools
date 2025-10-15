# app/schemas.py
from pydantic import BaseModel, EmailStr, constr, Field, validator
from typing import Annotated, Optional

class UserBase(BaseModel):
    email: EmailStr
    name: Optional[str] = None

class UserCreate(BaseModel):
    email: str
    name: str
    password: str

    @validator('password')
    def password_max_length(cls, v):
        if len(v) > 72:
            raise ValueError("Senha não pode ter mais que 72 caracteres")
        return v

class UserOut(UserBase):
    id: int
    is_active: bool

    class Config:
        orm_mode = True
