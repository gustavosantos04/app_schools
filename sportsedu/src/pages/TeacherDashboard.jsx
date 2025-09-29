import React, { useState } from 'react'
import styled from 'styled-components'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import CardAction from '../components/CardAction'
import Table from '../components/Table'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import { FiPlus, FiEdit, FiFileText, FiDollarSign, FiMenu } from 'react-icons/fi'

const Wrap = styled.div`display:flex; min-height:100vh; background:#0b1220;`
const Content = styled.div`flex:1; display:flex; flex-direction:column; margin-left:0; transition: margin-left 0.3s;`

const HeaderWrap = styled.div`display:flex; justify-content:space-between; align-items:center; padding:16px 24px;`

const Cards = styled.div`display:flex; gap:16px; margin:16px 24px; flex-wrap:wrap;`

export default function TeacherDashboard() {
  const { user, logout } = useAuth()
  const nav = useNavigate()
  const [currentTab, setCurrentTab] = useState('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // fake data
  const turmas = [
    { Nome:"Turma A", Vagas:5, Alunos:12 },
    { Nome:"Turma B", Vagas:3, Alunos:15 },
    { Nome:"Turma C", Vagas:0, Alunos:20 },
  ]
  const comunicados = [
    { title:"Treino extra na quarta-feira", date:"2025-09-29" },
    { title:"Pagamento de mensalidade até sexta", date:"2025-09-27" },
  ]

  const handleLogout = () => { logout(); nav('/login') }
  const handleAction = (msg) => alert(`Em breve: ${msg}`)

  return (
    <Wrap>
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} currentTab={currentTab} setCurrentTab={setCurrentTab} />
      <Content style={{marginLeft: sidebarOpen ? '220px' : '0'}}>
        <HeaderWrap>
          <div style={{display:'flex', alignItems:'center', gap:16}}>
            <FiMenu size={24} style={{cursor:'pointer'}} onClick={()=>setSidebarOpen(!sidebarOpen)} />
            <h1 style={{margin:0, color:'#fff'}}>Bem-vindo, {user?.name}</h1>
          </div>
          <button style={{background:'#ff4d4f', color:'#fff', border:'none', borderRadius:8, padding:'8px 16px', cursor:'pointer'}} onClick={handleLogout}>Sair</button>
        </HeaderWrap>

        {currentTab==='dashboard' && (
          <Cards>
            <CardAction icon={<FiPlus />} label="Criar Turma" onClick={()=>handleAction('Criar nova turma')} />
            <CardAction icon={<FiEdit />} label="Abrir Vagas" onClick={()=>handleAction('Abrir vagas')} />
            <CardAction icon={<FiFileText />} label="Comunicado" onClick={()=>handleAction('Postar comunicado')} />
            <CardAction icon={<FiDollarSign />} label="Pagamentos" onClick={()=>handleAction('Visualizar pagamentos')} />
          </Cards>
        )}

        {currentTab==='turmas' && (
          <Table columns={['Nome','Vagas','Alunos']} data={turmas} renderActions={(row)=>(
            <>
              <button onClick={()=>handleAction(`Editar ${row.Nome}`)}>Editar</button>
              <button onClick={()=>handleAction(`Abrir vagas ${row.Nome}`)}>Abrir Vagas</button>
            </>
          )}/>
        )}

        {currentTab==='comunicados' && (
          <div style={{margin:16}}>
            <h2>Últimos Comunicados</h2>
            <ul>
              {comunicados.map((c,i)=><li key={i}><strong>{c.date}:</strong> {c.title}</li>)}
            </ul>
          </div>
        )}

        {currentTab==='pagamentos' && (
          <div style={{margin:16}}>
            <h2>Pagamentos Recebidos</h2>
            <p>Funcionalidade em breve</p>
          </div>
        )}
      </Content>
    </Wrap>
  )
}
