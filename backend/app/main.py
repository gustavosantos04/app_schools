from fastapi import FastAPI, HTTPException
from app import models
from app.database import engine
from app.routers import users
from fastapi import Depends
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from . import auth, database

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Escolinha API")

app.include_router(users.router)

@app.get("/")
def read_root():
    return {"msg": "API Escolinha rodando!"}

@app.post("/auth/login")
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(database.get_db)):
    user = auth.authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(status_code=400, detail="Email ou senha incorretos")
    
    access_token = auth.create_access_token(data={"sub": user.email, "tipo": user.tipo.value})
    return {"access_token": access_token, "token_type": "bearer"}

@app.get("/me")
def read_users_me(current_user = Depends(auth.get_current_user)):
    return {"id": current_user.id, "nome": current_user.nome, "tipo": current_user.tipo.value}

