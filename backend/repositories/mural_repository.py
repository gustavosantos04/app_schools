import json
import uuid
from datetime import datetime
from pathlib import Path

MURAL_FILE = Path("data/mural.json")

def load_posts():
    if MURAL_FILE.exists():
        with open(MURAL_FILE, "r", encoding="utf-8") as f:
            return json.load(f)
    return []

def save_posts(posts):
    with open(MURAL_FILE, "w", encoding="utf-8") as f:
        json.dump(posts, f, indent=2, ensure_ascii=False)

def criar_post_mural(turma_id, professor_id, titulo, conteudo, midias=None):
    posts = load_posts()
    novo_post = {
        "id": str(uuid.uuid4()),
        "turma_id": turma_id,
        "professor_id": professor_id,
        "titulo": titulo,
        "conteudo": conteudo,
        "midias": midias or [],
        "criado_em": datetime.now().isoformat()
    }
    posts.append(novo_post)
    save_posts(posts)
    return novo_post

def listar_posts():
    return load_posts()

def listar_posts_por_turma(turma_id):
    return [p for p in load_posts() if p["turma_id"] == turma_id]

def deletar_post(post_id):
    posts = load_posts()
    novos = [p for p in posts if p["id"] != post_id]
    if len(novos) == len(posts):
        return None
    save_posts(novos)
    return True
