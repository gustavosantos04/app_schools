import React, { useState } from 'react'
import styled, { keyframes } from 'styled-components'
import Sidebar from '../components/Sidebar'
import ParentComunicados from './ParentComunicados'
import ParentVagas from './ParentVagas'
import ParentFinanceiro from './ParentFinanceiro'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import { FiMenu, FiLogOut, FiSun, FiMoon, FiMessageSquare, FiDollarSign, FiBookOpen, FiCalendar, FiTrendingUp, FiCheckCircle } from 'react-icons/fi'
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

const QuickStatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
`

const StatCard = styled.div`
  background: ${props => props.$gradient || props.theme.cardBg};
  border-radius: 16px;
  padding: 24px;
  border: 1px solid ${props => props.theme.border};
  box-shadow: ${props => props.theme.shadowMd};
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  ${props => props.$gradient && `
    color: white;
    border: none;
  `}
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: ${props => props.theme.shadowLg};
  }
`

const StatIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: ${props => props.$bg || 'rgba(255, 255, 255, 0.2)'};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.$color || 'white'};
  font-size: 24px;
  margin-bottom: 16px;
`

const StatLabel = styled.div`
  font-size: 14px;
  color: ${props => props.$light ? 'rgba(255, 255, 255, 0.8)' : props.theme.textSecondary};
  font-weight: 500;
  margin-bottom: 8px;
`

const StatValue = styled.div`
  font-size: 28px;
  font-weight: 800;
  color: ${props => props.$light ? 'white' : props.theme.text};
  line-height: 1;
`

const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 24px;
`

const InfoCard = styled.div`
  background: ${props => props.theme.cardBg};
  border-radius: 16px;
  padding: 24px;
  border: 1px solid ${props => props.theme.border};
  box-shadow: ${props => props.theme.shadowMd};
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding-bottom: 16px;
  border-bottom: 1px solid ${props => props.theme.border};
`

const CardIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: ${props => props.$gradient || props.theme.gradientPrimary};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 20px;
`

const CardTitle = styled.h3`
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  color: ${props => props.theme.text};
`

const CardContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
`

export default function ParentDashboard() {
  const { user, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const nav = useNavigate()
  const [currentTab, setCurrentTab] = useState('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleLogout = () => {
    logout()
    nav('/login')
  }

  // Dados fake para demonstração
  const proximaAula = 'Quarta-feira, 10/10 às 19h'
  const mensalidadeStatus = 'Em dia'
  const proximoVencimento = '15/10/2025'
  const turmaAtual = 'Turma B - Intermediário'

  const renderContent = () => {
    switch (currentTab) {
      case 'dashboard':
        return (
          <Main>
            <Section>
              <SectionHeader>
                <SectionTitle>Visão Geral</SectionTitle>
              </SectionHeader>
              
              <QuickStatsGrid>
                <StatCard $gradient="linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%)">
                  <StatIcon>
                    <FiCalendar />
                  </StatIcon>
                  <StatLabel $light>Próxima Aula</StatLabel>
                  <StatValue $light style={{ fontSize: '16px' }}>{proximaAula}</StatValue>
                </StatCard>

                <StatCard $gradient="linear-gradient(135deg, #10b981 0%, #34d399 100%)">
                  <StatIcon>
                    <FiCheckCircle />
                  </StatIcon>
                  <StatLabel $light>Mensalidade</StatLabel>
                  <StatValue $light style={{ fontSize: '18px' }}>{mensalidadeStatus}</StatValue>
                </StatCard>

                <StatCard>
                  <StatIcon $bg={props => props.theme.primaryLight} $color={props => props.theme.primary}>
                    <FiBookOpen />
                  </StatIcon>
                  <StatLabel>Turma Atual</StatLabel>
                  <StatValue style={{ fontSize: '16px' }}>{turmaAtual}</StatValue>
                </StatCard>
              </QuickStatsGrid>
            </Section>

            <Section>
              <SectionHeader>
                <SectionTitle>Informações Importantes</SectionTitle>
              </SectionHeader>
              
              <CardsGrid>
                <InfoCard>
                  <CardHeader>
                    <CardIcon>
                      <FiMessageSquare />
                    </CardIcon>
                    <CardTitle>Últimos Comunicados</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ParentComunicados user={user} resumo={true} />
                  </CardContent>
                </InfoCard>

                <InfoCard>
                  <CardHeader>
                    <CardIcon $gradient="linear-gradient(135deg, #10b981 0%, #34d399 100%)">
                      <FiDollarSign />
                    </CardIcon>
                    <CardTitle>Situação Financeira</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ParentFinanceiro user={user} resumo={true} />
                  </CardContent>
                </InfoCard>

                <InfoCard>
                  <CardHeader>
                    <CardIcon $gradient="linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)">
                      <FiBookOpen />
                    </CardIcon>
                    <CardTitle>Vagas em Destaque</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ParentVagas user={user} resumo={true} />
                  </CardContent>
                </InfoCard>
              </CardsGrid>
            </Section>
          </Main>
        )
      case 'comunicados':
        return <ParentComunicados user={user} />
      case 'vagas':
        return <ParentVagas user={user} />
      case 'financeiro':
        return <ParentFinanceiro user={user} />
      default:
        return <Main><p>Selecione uma aba</p></Main>
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
      
      <Content $sidebarOpen={sidebarOpen}>
        <Header>
          <HeaderLeft>
            <MenuButton onClick={() => setSidebarOpen(!sidebarOpen)}>
              <FiMenu size={24} />
            </MenuButton>
            <HeaderTitle>
              <Title>Olá, {user?.name}!</Title>
              <Subtitle>Acompanhe as atividades do seu filho</Subtitle>
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

        {renderContent()}
      </Content>
    </Wrap>
  )
}
