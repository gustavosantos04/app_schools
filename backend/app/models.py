from sqlalchemy import Column, Integer, String, ForeignKey, Enum
from sqlalchemy.orm import relationship
from .database import Base
import enum

class UserType(enum.Enum):
    admin = "admin"
    professor = "professor"
    aluno = "aluno"

class Turma(Base):
    __tablename__ = "turmas"

    id = Column(Integer, primary_key=True, index=True)
    nome = Column(String, nullable=False)
    descricao = Column(String, nullable=True)
    professor_id = Column(Integer, ForeignKey("users.id"))

    # alunos da turma (especificando qual FK usar)
    alunos = relationship("User", back_populates="turma", foreign_keys="User.turma_id")

    # professor responsável
    professor = relationship("User", foreign_keys=[professor_id])

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    nome = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    senha = Column(String, nullable=False)
    tipo = Column(Enum(UserType), default=UserType.aluno)

    turma_id = Column(Integer, ForeignKey("turmas.id"), nullable=True)

    # relação com turma (explicita qual FK usar)
    turma = relationship("Turma", back_populates="alunos", foreign_keys=[turma_id])
