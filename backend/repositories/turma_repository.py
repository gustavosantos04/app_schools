import json
import uuid
from datetime import datetime
from pathlib import Path

TURMAS_FILE = Path("data/turmas.json")

def load_turmas():
    if TURMAS_FILE.exists():
        with open(TURMAS_FILE, "r", encoding="utf-8") as f:
            return json.load(f)
    return []

def save_turmas(turmas):
    with open(TURMAS_FILE, "w", encoding="utf-8") as f:
        json.dump(turmas, f, indent=2, ensure_ascii=False)

def criar_turma(nome, descricao, professor_id):
    turmas = load_turmas()
    nova_turma = {
        "id": str(uuid.uuid4()),
        "nome": nome,
        "descricao": descricao,
        "professor_id": professor_id,
        "alunos": [],
        "criado_em": datetime.now().isoformat()
    }
    turmas.append(nova_turma)
    save_turmas(turmas)
    return nova_turma

def listar_turmas():
    return load_turmas()

def listar_turmas_por_professor(professor_id):
    return [t for t in load_turmas() if t["professor_id"] == professor_id]

def adicionar_aluno_na_turma(turma_id, aluno_id):
    turmas = load_turmas()
    for turma in turmas:
        if turma["id"] == turma_id:
            if aluno_id not in turma["alunos"]:
                turma["alunos"].append(aluno_id)
            save_turmas(turmas)
            return turma
    return None
