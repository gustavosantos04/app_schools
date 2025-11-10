from fastapi import FastAPI, HTTPException, Depends
from fastapi.security import OAuth2PasswordRequestForm
from schemas.user_schema import UserCreate, UserResponse
from services.user_service import create_user_service, list_users_service
from schemas.user_schema import LoginSchema, LoginResponse
from services.auth_service import authenticate_user
from auth.dependencies import get_current_user, require_role
from repositories.turma_repository import (
    criar_turma,
    listar_turmas,
    listar_turmas_por_professor,
    adicionar_aluno_na_turma
)
from auth.dependencies import require_role, get_current_user
from fastapi import FastAPI, Depends

app = FastAPI(
    title="API Escolinhas Esportivas",
    version="1.0.0"
)

@app.post("/users", response_model=UserResponse)
def create_user(user: UserCreate):
    try:
        created = create_user_service(user)
        return created
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.get("/users", response_model=list[UserResponse])
def list_users(tipo: str | None = None):
    return list_users_service(tipo)

@app.post("/login", response_model=LoginResponse)
def login(form_data: OAuth2PasswordRequestForm = Depends()):
    # OAuth2 envia username = email
    email = form_data.username
    senha = form_data.password

    auth = authenticate_user(LoginSchema(email=email, senha=senha))
    if not auth:
        raise HTTPException(status_code=401, detail="Email ou senha incorretos.")

    return {
        "access_token": auth["token"],
        "user": auth["user"]
    }

@app.get("/me")
def get_me(user = Depends(get_current_user)):
    return user

@app.get("/admin-only")
def admin_only(user = Depends(require_role(["superadmin"]))):
    return {"message": "Bem-vindo, superadmin!"}

@app.get("/professor-area")
def professor_area(user = Depends(require_role(["professor", "superadmin"]))):
    return {"message": "Área exclusiva de professores!"}

@app.post("/turmas")
def criar_nova_turma(
    nome: str,
    descricao: str,
    user = Depends(require_role(["professor", "superadmin"]))
):
    return criar_turma(nome, descricao, user["id"])

@app.get("/turmas")
def listar_todas_turmas(user = Depends(get_current_user)):
    if user["tipo"] == "superadmin":
        return listar_turmas()
    elif user["tipo"] == "professor":
        return listar_turmas_por_professor(user["id"])
    elif user["tipo"] == "aluno":
        # alunos só veem as turmas em que estão matriculados
        turmas = listar_turmas()
        return [t for t in turmas if user["id"] in t["alunos"]]
    else:
        return []

@app.post("/turmas/{turma_id}/adicionar-aluno/{aluno_id}")
def adicionar_aluno(turma_id: str, aluno_id: str, user = Depends(require_role(["professor", "superadmin"]))):
    turma = adicionar_aluno_na_turma(turma_id, aluno_id)
    if not turma:
        return {"error": "Turma não encontrada."}
    return turma