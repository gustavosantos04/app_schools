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
from repositories.mural_repository import (
    criar_post_mural,
    listar_posts,
    listar_posts_por_turma,
    deletar_post
)


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

@app.post("/mural")
def criar_post(
    turma_id: str,
    titulo: str,
    conteudo: str,
    midias: list[str] | None = None,
    user = Depends(require_role(["professor", "superadmin"]))
):
    return criar_post_mural(turma_id, user["id"], titulo, conteudo, midias)

@app.get("/mural")
def listar_mural(user = Depends(get_current_user)):
    posts = listar_posts()
    if user["tipo"] == "superadmin":
        return posts
    elif user["tipo"] == "professor":
        # mostra apenas posts criados por ele
        return [p for p in posts if p["professor_id"] == user["id"]]
    elif user["tipo"] == "aluno":
        # mostra apenas posts das turmas em que o aluno está matriculado
        from repositories.turma_repository import listar_turmas
        turmas = listar_turmas()
        turmas_aluno = [t["id"] for t in turmas if user["id"] in t["alunos"]]
        return [p for p in posts if p["turma_id"] in turmas_aluno]
    else:
        return []

@app.get("/mural/turma/{turma_id}")
def listar_mural_turma(turma_id: str, user = Depends(get_current_user)):
    posts = listar_posts_por_turma(turma_id)
    if user["tipo"] == "superadmin":
        return posts
    elif user["tipo"] == "professor":
        # mostra apenas se for dono da turma
        from repositories.turma_repository import listar_turmas_por_professor
        turmas = listar_turmas_por_professor(user["id"])
        if any(t["id"] == turma_id for t in turmas):
            return posts
        raise HTTPException(status_code=403, detail="Você não tem acesso a essa turma.")
    elif user["tipo"] == "aluno":
        from repositories.turma_repository import listar_turmas
        turmas = listar_turmas()
        turmas_aluno = [t["id"] for t in turmas if user["id"] in t["alunos"]]
        if turma_id in turmas_aluno:
            return posts
        raise HTTPException(status_code=403, detail="Você não pertence a essa turma.")
    else:
        raise HTTPException(status_code=403, detail="Acesso negado.")

@app.delete("/mural/{post_id}")
def remover_post(post_id: str, user = Depends(require_role(["professor", "superadmin"]))):
    posts = listar_posts()
    post = next((p for p in posts if p["id"] == post_id), None)
    if not post:
        raise HTTPException(status_code=404, detail="Post não encontrado.")
    
    if user["tipo"] == "professor" and post["professor_id"] != user["id"]:
        raise HTTPException(status_code=403, detail="Você só pode deletar seus próprios posts.")
    
    deletar_post(post_id)
    return {"message": "Post deletado com sucesso!"}