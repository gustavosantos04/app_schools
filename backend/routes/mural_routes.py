from fastapi import APIRouter, HTTPException, Depends
from auth.dependencies import get_current_user, require_role
from repositories.mural_repository import (
    criar_post_mural, listar_posts, listar_posts_por_turma, deletar_post
)

router = APIRouter(prefix="/mural", tags=["mural"])

@router.post("/")
def criar_post(
    turma_id: str,
    titulo: str,
    conteudo: str,
    midias: list[str] | None = None,
    user = Depends(require_role(["professor", "superadmin"]))
):
    return criar_post_mural(turma_id, user["id"], titulo, conteudo, midias)

@router.get("/")
def listar_mural(user = Depends(get_current_user)):
    posts = listar_posts()
    if user["tipo"] == "superadmin":
        return posts
    elif user["tipo"] == "professor":
        return [p for p in posts if p["professor_id"] == user["id"]]
    elif user["tipo"] == "aluno":
        from repositories.turma_repository import listar_turmas
        turmas = listar_turmas()
        turmas_aluno = [t["id"] for t in turmas if user["id"] in t["alunos"]]
        return [p for p in posts if p["turma_id"] in turmas_aluno]
    else:
        return []

@router.get("/turma/{turma_id}")
def listar_mural_turma(turma_id: str, user = Depends(get_current_user)):
    posts = listar_posts_por_turma(turma_id)
    if user["tipo"] == "superadmin":
        return posts
    elif user["tipo"] == "professor":
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

@router.delete("/{post_id}")
def remover_post(post_id: str, user = Depends(require_role(["professor", "superadmin"]))):
    posts = listar_posts()
    post = next((p for p in posts if p["id"] == post_id), None)
    if not post:
        raise HTTPException(status_code=404, detail="Post não encontrado.")
    if user["tipo"] == "professor" and post["professor_id"] != user["id"]:
        raise HTTPException(status_code=403, detail="Você só pode deletar seus próprios posts.")
    deletar_post(post_id)
    return {"message": "Post deletado com sucesso!"}
