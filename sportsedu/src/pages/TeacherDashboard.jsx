import React, { useState, useEffect } from 'react'
import styled, { keyframes } from 'styled-components'
import Sidebar from '../components/Sidebar'
import CardAction from '../components/CardAction'
import TeacherTurmas from './TeacherTurmas'
import TeacherComunicados from './TeacherComunicados'
import TeacherPagamentos from './TeacherPagamentos'
import Toast from '../components/Toast'
import FloatingButton from '../components/FloatingButton'
import { Skeleton } from '../components/Loading'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import { FiPlus, FiUsers, FiMessageSquare, FiDollarSign, FiMenu, FiSun, FiMoon, FiLogOut, FiTrendingUp, FiCalendar } from 'react-icons/fi'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { useTheme } from '../contexts/ThemeContext'

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`

const Wrap = styled.div`
  display: flex;
  min-height: 100vh;
  background: ${props => props.theme.bg};
  color: ${props => props.theme.text};
`

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  transition: margin-left 0.3s ease;
  
  @media (min-width: 769px) {
    margin-left: ${props => props.$sidebarOpen ? '280px' : '0'};
  }
`

const Header = styled.div`
  padding: 24px 32px;
  background: ${props => props.theme.cardBg};
  border-bottom: 1px solid ${props => props.theme.border};
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
  box-shadow: ${props => props.theme.shadowSm};
  
  @media (max-width: 768px) {
    padding: 16px 20px;
  }
`

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`

const MenuButton = styled.button`
  background: transparent;
  border: none;
  color: ${props => props.theme.text};
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${props => props.theme.bgTertiary};
  }
`

const HeaderTitle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`

const Title = styled.h1`
  margin: 0;
  font-size: 24px;
  font-weight: 700;
  color: ${props => props.theme.text};
  
  @media (max-width: 768px) {
    font-size: 20px;
  }
`

const Subtitle = styled.p`
  margin: 0;
  font-size: 14px;
  color: ${props => props.theme.textSecondary};
`

const HeaderRight = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`

const Button = styled.button`
  padding: 10px 20px;
  border-radius: 10px;
  border: none;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  
  ${props => props.$variant === 'primary' ? `
    background: ${props.theme.gradientPrimary};
    color: white;
    box-shadow: 0 4px 12px ${props.theme.primary}40;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 16px ${props.theme.primary}60;
    }
  ` : props.$variant === 'danger' ? `
    background: ${props.theme.error};
    color: white;
    
    &:hover {
      background: ${props.theme.error}dd;
      transform: translateY(-2px);
    }
  ` : `
    background: ${props.theme.bgTertiary};
    color: ${props.theme.text};
    
    &:hover {
      background: ${props.theme.border};
    }
  `}
  
  @media (max-width: 768px) {
    padding: 8px 16px;
    font-size: 13px;
  }
`

const Main = styled.div`
  flex: 1;
  padding: 32px;
  animation: ${fadeIn} 0.5s ease;
  
  @media (max-width: 768px) {
    padding: 20px;
  }
`

const Section = styled.div`
  margin-bottom: 32px;
`

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`

const SectionTitle = styled.h2`
  margin: 0;
  font-size: 20px;
  font-weight: 700;
  color: ${props => props.theme.text};
`

const Cards = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
`

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
`

const StatCard = styled.div`
  background: ${props => props.theme.cardBg};
  border-radius: 16px;
  padding: 24px;
  border: 1px solid ${props => props.theme.border};
  box-shadow: ${props => props.theme.shadowMd};
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: ${props => props.theme.shadowLg};
    border-color: ${props => props.theme.primary};
  }
`

const StatHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
`

const StatIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: ${props => props.$gradient || props.theme.gradientPrimary};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 24px;
  box-shadow: 0 4px 12px ${props => props.theme.primary}40;
`

const StatLabel = styled.div`
  font-size: 14px;
  color: ${props => props.theme.textSecondary};
  font-weight: 500;
  margin-bottom: 8px;
`

const StatValue = styled.div`
  font-size: 32px;
  font-weight: 800;
  color: ${props => props.theme.text};
  line-height: 1;
`

const StatTrend = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 13px;
  color: ${props => props.$positive ? props.theme.success : props.theme.error};
  font-weight: 600;
  margin-top: 8px;
`

const ChartContainer = styled.div`
  background: ${props => props.theme.cardBg};
  border-radius: 16px;
  padding: 24px;
  border: 1px solid ${props => props.theme.border};
  box-shadow: ${props => props.theme.shadowMd};
`

const ChartTitle = styled.h3`
  margin: 0 0 20px 0;
  font-size: 18px;
  font-weight: 700;
  color: ${props => props.theme.text};
`

const ChartContent = styled.div`
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const EmptyState = styled.div`
  text-align: center;
  padding: 40px;
  color: ${props => props.theme.textSecondary};
`

export default function TeacherDashboard() {
  const { user, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const nav = useNavigate()
  const [currentTab, setCurrentTab] = useState('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [loadingChart, setLoadingChart] = useState(true)
  const [toastMsg, setToastMsg] = useState(null)
  const [toastType, setToastType] = useState('info')

  // fake data
  const turmas = [
    { Nome: "Turma A - Iniciante", Vagas: 5, Alunos: 12 },
    { Nome: "Turma B - Intermediário", Vagas: 3, Alunos: 15 },
    { Nome: "Turma C - Avançado", Vagas: 0, Alunos: 20 },
  ]
  
  const comunicados = [
    { title: "Treino extra na quarta-feira", date: "2025-10-05" },
    { title: "Pagamento de mensalidade até sexta", date: "2025-10-03" },
  ]

  const totalAlunos = turmas.reduce((acc, t) => acc + t.Alunos, 0)
  const totalVagas = turmas.reduce((acc, t) => acc + t.Vagas, 0)
  const totalTurmas = turmas.length
  const receitaMensal = totalAlunos * 150 // R$ 150 por aluno

  const pieData = turmas.map(t => ({ name: t.Nome, value: t.Alunos }))
  const COLORS = ['#ff6b35', '#3b82f6', '#10b981', '#f59e0b']

  useEffect(() => {
    const timer = setTimeout(() => setLoadingChart(false), 800)
    return () => clearTimeout(timer)
  }, [])

  const handleLogout = () => {
    logout()
    nav('/login')
  }

  const handleAction = (msg, type = 'info') => {
    setToastMsg(msg)
    setToastType(type)
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
      
      <Content $sidebarOpen={sidebarOpen}>
        <Header>
          <HeaderLeft>
            <MenuButton onClick={() => setSidebarOpen(!sidebarOpen)}>
              <FiMenu size={24} />
            </MenuButton>
            <HeaderTitle>
              <Title>Bem-vindo, {user?.name}!</Title>
              <Subtitle>Aqui está um resumo das suas atividades</Subtitle>
            </HeaderTitle>
          </HeaderLeft>
          
          <HeaderRight>
            <Button onClick={toggleTheme}>
              {theme === 'dark' ? <FiSun size={18} /> : <FiMoon size={18} />}
              {theme === 'dark' ? 'Claro' : 'Escuro'}
            </Button>
            <Button $variant="danger" onClick={handleLogout}>
              <FiLogOut size={18} />
              Sair
            </Button>
          </HeaderRight>
        </Header>

        {currentTab === 'dashboard' && (
          <Main>
            <Section>
              <SectionHeader>
                <SectionTitle>Ações Rápidas</SectionTitle>
              </SectionHeader>
              <Cards>
                <CardAction 
                  icon={<FiPlus />} 
                  label="Criar Turma" 
                  description="Adicione uma nova turma"
                  onClick={() => handleAction('Criar nova turma', 'info')} 
                />
                <CardAction 
                  icon={<FiUsers />} 
                  label="Abrir Vagas" 
                  description="Libere vagas nas turmas"
                  onClick={() => handleAction('Abrir vagas', 'info')} 
                />
                <CardAction 
                  icon={<FiMessageSquare />} 
                  label="Comunicado" 
                  description="Envie avisos aos alunos"
                  onClick={() => handleAction('Postar comunicado', 'info')} 
                />
                <CardAction 
                  icon={<FiDollarSign />} 
                  label="Pagamentos" 
                  description="Gerencie as finanças"
                  onClick={() => handleAction('Visualizar pagamentos', 'info')} 
                />
              </Cards>
            </Section>

            <Section>
              <SectionHeader>
                <SectionTitle>Estatísticas Gerais</SectionTitle>
              </SectionHeader>
              <StatsGrid>
                <StatCard>
                  <StatHeader>
                    <div>
                      <StatLabel>Total de Alunos</StatLabel>
                      <StatValue>{totalAlunos}</StatValue>
                      <StatTrend $positive>
                        <FiTrendingUp size={16} />
                        +12% este mês
                      </StatTrend>
                    </div>
                    <StatIcon>
                      <FiUsers />
                    </StatIcon>
                  </StatHeader>
                </StatCard>

                <StatCard>
                  <StatHeader>
                    <div>
                      <StatLabel>Turmas Ativas</StatLabel>
                      <StatValue>{totalTurmas}</StatValue>
                      <StatTrend $positive>
                        <FiCalendar size={16} />
                        Todas ativas
                      </StatTrend>
                    </div>
                    <StatIcon $gradient="linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%)">
                      <FiCalendar />
                    </StatIcon>
                  </StatHeader>
                </StatCard>

                <StatCard>
                  <StatHeader>
                    <div>
                      <StatLabel>Vagas Disponíveis</StatLabel>
                      <StatValue>{totalVagas}</StatValue>
                      <StatTrend>
                        <FiUsers size={16} />
                        {totalVagas > 0 ? 'Vagas abertas' : 'Turmas cheias'}
                      </StatTrend>
                    </div>
                    <StatIcon $gradient="linear-gradient(135deg, #10b981 0%, #34d399 100%)">
                      <FiUsers />
                    </StatIcon>
                  </StatHeader>
                </StatCard>

                <StatCard>
                  <StatHeader>
                    <div>
                      <StatLabel>Receita Mensal</StatLabel>
                      <StatValue>R$ {receitaMensal.toLocaleString()}</StatValue>
                      <StatTrend $positive>
                        <FiTrendingUp size={16} />
                        +8% este mês
                      </StatTrend>
                    </div>
                    <StatIcon $gradient="linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)">
                      <FiDollarSign />
                    </StatIcon>
                  </StatHeader>
                </StatCard>
              </StatsGrid>
            </Section>

            <Section>
              <SectionHeader>
                <SectionTitle>Distribuição de Alunos por Turma</SectionTitle>
              </SectionHeader>
              <ChartContainer>
                <ChartTitle>Alunos por Turma</ChartTitle>
                <ChartContent>
                  {loadingChart ? (
                    <div style={{ width: '100%', padding: '20px' }}>
                      <Skeleton height="200px" />
                    </div>
                  ) : pieData.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie 
                          data={pieData} 
                          dataKey="value" 
                          nameKey="name" 
                          cx="50%" 
                          cy="50%" 
                          outerRadius={100}
                          label={(entry) => `${entry.name}: ${entry.value}`}
                        >
                          {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  ) : (
                    <EmptyState>
                      <p>Nenhum dado disponível</p>
                    </EmptyState>
                  )}
                </ChartContent>
              </ChartContainer>
            </Section>
          </Main>
        )}

        {currentTab === 'turmas' && (
          <TeacherTurmas turmas={turmas} onAction={handleAction} />
        )}

        {currentTab === 'comunicados' && (
          <TeacherComunicados comunicados={comunicados} onAction={handleAction} />
        )}

        {currentTab === 'pagamentos' && (
          <TeacherPagamentos pagamentos={[]} onAction={handleAction} />
        )}

        {toastMsg && (
          <Toast 
            message={toastMsg} 
            type={toastType}
            onClose={() => setToastMsg(null)} 
          />
        )}
        
        <FloatingButton onClick={() => handleAction('Adicionar nova turma', 'info')} />
      </Content>
    </Wrap>
  )
}
