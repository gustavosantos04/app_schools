import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function ParentDashboard(){
  const { user, logout } = useAuth()
  const nav = useNavigate()

  function handleLogout(){
    logout()
    nav('/login')
  }

  return (
    <div style={{padding:20}}>
      <h1>Painel dos Pais/Alunos</h1>
      <p>Olá, {user?.name || 'Usuário'}!</p>

      <div style={{marginTop:20}}>
        <button onClick={()=>alert('Em breve: Ver turmas')}>Turmas disponíveis</button>
        <button onClick={()=>alert('Em breve: Pagamentos')}>Meus Pagamentos</button>
        <button onClick={()=>alert('Em breve: Comunicados')}>Comunicados</button>
      </div>

      <div style={{marginTop:20}}>
        <button onClick={handleLogout}>Sair</button>
      </div>
    </div>
  )
}
