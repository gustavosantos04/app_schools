from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import auth_routes, users_routes, turmas_routes, mural_routes

app = FastAPI(
    title="API Escolinhas Esportivas",
    version="1.0.0"
)

# 🔓 Configuração de CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 🔗 Registro dos routers
app.include_router(auth_routes.router)
app.include_router(users_routes.router)
app.include_router(turmas_routes.router)
app.include_router(mural_routes.router)
