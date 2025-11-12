import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function ProtectedRoute({ children, role }) {
  const { user } = useAuth()

  // 🔐 Se ainda não carregou o usuário (ex: delay do localStorage)
  if (user === undefined) {
    return null // ou um pequeno loading se quiser
  }

  // 🚫 Se não estiver logado, redireciona para o login
  if (!user) {
    return <Navigate to="/login" replace />
  }

  // 🧩 Corrige a chave do tipo de usuário — seu backend envia como "role"
  const userRole = user.role || user.tipo // cobre ambos os casos

  // 🔒 Se a rota exige um tipo e o usuário não tem permissão
  if (role && userRole !== role && userRole !== 'superadmin') {
    return <Navigate to="/login" replace />
  }

  // ✅ Tudo certo, renderiza o conteúdo protegido
  return children
}
