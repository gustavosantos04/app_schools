from fastapi import APIRouter, HTTPException, Depends
from fastapi.security import OAuth2PasswordRequestForm
from schemas.user_schema import LoginSchema, LoginResponse
from services.auth_service import authenticate_user
from auth.dependencies import require_role, get_current_user

router = APIRouter(prefix="/auth", tags=["Auth"])  # 🔧 Adiciona prefixo claro

@router.post("/login", response_model=LoginResponse)
def login(form_data: OAuth2PasswordRequestForm = Depends()):
    """
    Faz login do usuário e retorna token + informações do usuário.
    Espera receber:
      username: email
      password: senha
    """
    email = form_data.username
    senha = form_data.password

    auth = authenticate_user(LoginSchema(email=email, senha=senha))
    if not auth:
        raise HTTPException(status_code=401, detail="Email ou senha incorretos.")

    return {"access_token": auth["token"], "user": auth["user"]}


@router.get("/me", response_model=dict)
def get_me(user=Depends(get_current_user)):
    """
    Retorna os dados do usuário autenticado.
    """
    return {"user": user}


@router.get("/admin-only", dependencies=[Depends(require_role(["superadmin"]))])
def admin_only():
    """
    Apenas superadmins podem acessar.
    """
    return {"message": "Bem-vindo, superadmin!"}


@router.get("/professor-area", dependencies=[Depends(require_role(["professor", "superadmin"]))])
def professor_area():
    """
    Acesso exclusivo de professores e superadmins.
    """
    return {"message": "Área exclusiva de professores!"}
