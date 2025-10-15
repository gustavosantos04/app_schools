from fastapi import FastAPI
from . import models
from .database import engine
from .router import users

# Cria as tabelas automaticamente no banco de dados (se ainda não existirem)
models.Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="App Schools API",
    description="API para gerenciamento de usuários e outros módulos do sistema escolar.",
    version="1.0.0",
)

# Inclui as rotas do módulo de usuários
app.include_router(users.router)

@app.get("/")
def root():
    return {"message": "🚀 API do sistema escolar está online!"}
