from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app import schemas, models, auth
from app.database import get_db

router = APIRouter(prefix="/users", tags=["users"])

@router.post("/", response_model=schemas.UserResponse)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email já cadastrado")
    hashed_password = auth.get_password_hash(user.senha)
    new_user = models.User(
        nome=user.nome,
        email=user.email,
        senha=hashed_password,
        tipo=user.tipo
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user
