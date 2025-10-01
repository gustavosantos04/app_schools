import React, { useState } from 'react'
import styled, { keyframes } from 'styled-components'
import Sidebar from '../components/Sidebar'
import ParentComunicados from './ParentComunicados'
import ParentVagas from './ParentVagas'
import ParentFinanceiro from './ParentFinanceiro'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import { FiMenu, FiLogOut } from 'react-icons/fi'
import { useTheme } from '../contexts/ThemeContext'

// --- estilos padronizados ---
const Wrap = styled.div`
  display:flex; 
  min-height:100vh; 
  background:${props => props.theme.bg};
  color:${props => props.theme.text};
`
const Content = styled.div`
  flex:1; 
  display:flex; 
  flex-direction:column; 
  transition: margin-left 0.3s;
`
const HeaderWrap = styled.div`
  display:flex; 
  justify-content:space-between; 
  align-items:center; 
  padding:16px 24px;
  color:${props => props.theme.text};
`
const Cards = styled.div`
  display:flex; 
  gap:16px; 
  margin:16px 24px; 
  flex-wrap:wrap;
`

const Card = styled.div`
  flex:1;
  min-width:280px;
  background:${props => props.theme.cardBg};
  border-radius:12px;
  padding:20px;
  box-shadow:0 4px 10px rgba(0,0,0,0.1);
  animation: fadeIn 0.4s ease;
`

const fadeIn = keyframes`
  from { opacity:0; transform: translateY(20px);}
  to { opacity:1; transform: translateY(0);}
`
const AnimatedDiv = styled.div`animation: ${fadeIn} 0.5s ease forwards;`

// --- componente principal ---
export default function ParentDashboard(){
  const { user, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const nav = useNavigate()
  const [currentTab, setCurrentTab] = useState('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  function handleLogout(){
    logout()
    nav('/login')
  }

  function renderConteudo(){
    switch(currentTab){
      case 'dashboard': 
        return (
          <AnimatedDiv>
            <Cards>
              <Card>
                <h2>📢 Últimos Comunicados</h2>
                <ParentComunicados user={user} resumo={true} />
              </Card>
              <Card>
                <h2>💰 Situação Financeira</h2>
                <ParentFinanceiro user={user} resumo={true} />
              </Card>
              <Card>
                <h2>⚽ Vagas em Destaque</h2>
                <ParentVagas user={user} resumo={true} />
              </Card>
            </Cards>
          </AnimatedDiv>
        )
      case 'comunicados': return <ParentComunicados user={user} />
      case 'vagas': return <ParentVagas user={user} />
      case 'financeiro': return <ParentFinanceiro user={user} />
      default: return <p>Selecione uma aba</p>
    }
  }

  return (
    <Wrap>
      <Sidebar 
        open={sidebarOpen} 
        setOpen={setSidebarOpen} 
        currentTab={currentTab} 
        setCurrentTab={setCurrentTab} 
        user={user}
      />
      <Content style={{marginLeft: sidebarOpen ? '220px' : '0'}}>
        {/* header */}
        <HeaderWrap>
          <div style={{display:'flex', alignItems:'center', gap:16}}>
            <FiMenu size={28} style={{cursor:'pointer'}} onClick={()=>setSidebarOpen(!sidebarOpen)} />
            <h1 style={{margin:0, fontSize:20}}>Bem-vindo, {user?.name}</h1>
          </div>
          <div style={{display:'flex', gap:16}}>
            <button 
              style={{
                background:'#ff4d4f', color:'#fff', border:'none', borderRadius:8, 
                padding:'8px 16px', cursor:'pointer', fontWeight:'bold'
              }} 
              onClick={handleLogout}
            >
              <FiLogOut style={{marginRight:6}} /> Sair
            </button>
            <button
              style={{
                background: theme==='dark' ? '#fff' : '#333',
                color: theme==='dark' ? '#333' : '#fff',
                border:'none', borderRadius:8,
                padding:'8px 16px', cursor:'pointer', fontWeight:'bold'
              }}
              onClick={toggleTheme}
            >
              {theme==='dark' ? 'Light Mode' : 'Dark Mode'}
            </button>
          </div>
        </HeaderWrap>

        {/* conteudo dinâmico */}
        {renderConteudo()}
      </Content>
    </Wrap>
  )
}
