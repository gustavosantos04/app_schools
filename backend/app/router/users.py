# app/routers/users.py
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import Any

from .. import schemas, crud, models
from ..database import get_db
from sqlalchemy.exc import IntegrityError

router = APIRouter(prefix="/users", tags=["users"])

@router.post("/", response_model=schemas.UserOut, status_code=status.HTTP_201_CREATED)
def create_user(user_in: schemas.UserCreate, db: Session = Depends(get_db)) -> Any:
    # Verifica se já existe usuário com esse email
    existing = crud.get_user_by_email(db, user_in.email)
    if existing:
        raise HTTPException(status_code=400, detail="Email já cadastrado")

    # Trunca a senha para 72 caracteres para bcrypt
    user_in.password = user_in.password[:72]

    try:
        user = crud.create_user(db, user_in)
    except IntegrityError:
        # fallback para condição de corrida na constraint unique
        raise HTTPException(status_code=400, detail="Email já cadastrado")
    return user
