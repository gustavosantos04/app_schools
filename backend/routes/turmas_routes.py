from fastapi import APIRouter, HTTPException, Depends
from auth.dependencies import get_current_user, require_role
from repositories.turma_repository import (
    criar_turma, listar_turmas, listar_turmas_por_professor, adicionar_aluno_na_turma
)

router = APIRouter(prefix="/turmas", tags=["turmas"])

@router.post("/")
def criar_nova_turma(
    nome: str,
    descricao: str,
    user = Depends(require_role(["professor", "superadmin"]))
):
    return criar_turma(nome, descricao, user["id"])

@router.get("/")
def listar_todas_turmas(user = Depends(get_current_user)):
    if user["tipo"] == "superadmin":
        return listar_turmas()
    elif user["tipo"] == "professor":
        return listar_turmas_por_professor(user["id"])
    elif user["tipo"] == "aluno":
        turmas = listar_turmas()
        return [t for t in turmas if user["id"] in t["alunos"]]
    else:
        return []

@router.post("/{turma_id}/adicionar-aluno/{aluno_id}")
def adicionar_aluno(
    turma_id: str,
    aluno_id: str,
    user = Depends(require_role(["professor", "superadmin"]))
):
    turma = adicionar_aluno_na_turma(turma_id, aluno_id)
    if not turma:
        raise HTTPException(status_code=404, detail="Turma não encontrada.")
    return turma
