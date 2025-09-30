import React, { useState, useEffect } from 'react'
import styled, { keyframes } from 'styled-components'
import Sidebar from '../components/Sidebar'
import CardAction from '../components/CardAction'
import TeacherTurmas from './TeacherTurmas'
import TeacherComunicados from './TeacherComunicados'
import TeacherPagamentos from './TeacherPagamentos'
import Toast from '../components/Toast'
import FloatingButton from '../components/FloatingButton'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import { FiPlus, FiEdit, FiFileText, FiDollarSign, FiMenu } from 'react-icons/fi'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'
import { useTheme } from '../contexts/ThemeContext'

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

const fadeIn = keyframes`
  from { opacity:0; transform: translateY(20px);}
  to { opacity:1; transform: translateY(0);}
`
const AnimatedDiv = styled.div`animation: ${fadeIn} 0.5s ease forwards;`

export default function TeacherDashboard() {
  const { user, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const nav = useNavigate()
  const [currentTab, setCurrentTab] = useState('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [loadingChart, setLoadingChart] = useState(true)
  const [toastMsg, setToastMsg] = useState(null)

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

  const pieData = turmas.map(t => ({ name: t.Nome, value: t.Alunos }))
  const COLORS = ['#0088FE','#00C49F','#FFBB28','#FF8042']

  useEffect(()=>{
    const timer = setTimeout(()=>setLoadingChart(false), 600)
    return ()=> clearTimeout(timer)
  },[])

  const handleLogout = () => { logout(); nav('/login') }
  const handleAction = (msg) => setToastMsg(msg)

  return (
    <Wrap>
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} currentTab={currentTab} setCurrentTab={setCurrentTab} />
      <Content style={{marginLeft: sidebarOpen ? '220px' : '0'}}>
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
            >Sair</button>
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

        {currentTab==='dashboard' && (
          <AnimatedDiv>
            <Cards>
              <CardAction icon={<FiPlus />} label="Criar Turma" onClick={()=>handleAction('Criar nova turma')} />
              <CardAction icon={<FiEdit />} label="Abrir Vagas" onClick={()=>handleAction('Abrir vagas')} />
              <CardAction icon={<FiFileText />} label="Comunicado" onClick={()=>handleAction('Postar comunicado')} />
              <CardAction icon={<FiDollarSign />} label="Pagamentos" onClick={()=>handleAction('Visualizar pagamentos')} />
            </Cards>

            <div style={{
              margin:24, height:250, 
              background:props=>props.theme.cardBg, 
              borderRadius:12, padding:16,
              color:props=>props.theme.text
            }}>
              <h3>Alunos por Turma</h3>
              {loadingChart
                ? <div style={{height:'100%', display:'flex', justifyContent:'center', alignItems:'center'}}>Carregando gráfico...</div>
                : <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                        {pieData.map((entry,index)=><Cell key={index} fill={COLORS[index % COLORS.length]} />)}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
              }
            </div>
          </AnimatedDiv>
        )}

        {currentTab==='turmas' && (
          <TeacherTurmas turmas={turmas} onAction={handleAction} />
        )}

        {currentTab==='comunicados' && (
          <TeacherComunicados 
            comunicados={comunicados} 
            onAction={handleAction} 
          />
        )}

        {currentTab==='pagamentos' && (
          <TeacherPagamentos 
            pagamentos={[]} // por enquanto array vazio, depois conecta ao backend
            onAction={handleAction} 
          />
        )}

        {toastMsg && <Toast message={toastMsg} onClose={()=>setToastMsg(null)} />}
        <FloatingButton onClick={()=>handleAction('Adicionar nova turma')} />
      </Content>
    </Wrap>
  )
}
