from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from passlib.context import CryptContext
from . import models, schemas

# ============================================================
# Configuração do hash de senha com fallback automático
# ============================================================

try:
    # Tenta usar bcrypt (requer suporte nativo)
    pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
    # Testa rapidamente se o backend funciona
    pwd_context.hash("teste")
except Exception:
    # Se falhar, usa pbkdf2_sha256 (100% compatível e seguro)
    pwd_context = CryptContext(schemes=["pbkdf2_sha256"], deprecated="auto")
    print("⚠️ Bcrypt não funcional — usando pbkdf2_sha256 como fallback seguro.")

# ============================================================
# Funções CRUD
# ============================================================

def get_user_by_email(db: Session, email: str):
    """Retorna um usuário a partir do e-mail."""
    return db.query(models.User).filter(models.User.email == email).first()


def get_user(db: Session, user_id: int):
    """Retorna um usuário pelo ID."""
    return db.query(models.User).filter(models.User.id == user_id).first()


def create_user(db: Session, user_in: schemas.UserCreate):
    """
    Cria um novo usuário com hash seguro de senha.
    Inclui truncagem preventiva para evitar o limite do bcrypt.
    """
    # Garante que a senha não ultrapasse 72 caracteres
    password = user_in.password[:72]

    # Gera o hash de forma segura
    hashed = pwd_context.hash(password)

    db_user = models.User(
        email=user_in.email,
        name=user_in.name,
        hashed_password=hashed
    )

    db.add(db_user)
    try:
        db.commit()
        db.refresh(db_user)
        return db_user
    except IntegrityError:
        db.rollback()
        raise IntegrityError("E-mail já cadastrado no sistema.", None, None)
