import React from 'react'
import styled, { keyframes } from 'styled-components'
import { FiHome, FiUsers, FiMessageSquare, FiDollarSign, FiBookOpen } from 'react-icons/fi'
import { IoFootball } from 'react-icons/io5'

const slideIn = keyframes`
  from { transform: translateX(-100%); }
  to { transform: translateX(0); }
`

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`

const Overlay = styled.div`
  display: ${props => props.$open ? 'block' : 'none'};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 998;
  animation: ${fadeIn} 0.3s ease-out;
  backdrop-filter: blur(4px);
  
  @media (min-width: 769px) {
    display: none;
  }
`

const Wrap = styled.div`
  width: 280px;
  background: ${props => props.theme.cardBg};
  height: 100vh;
  padding: 24px;
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  box-shadow: ${props => props.theme.shadowXl};
  border-right: 1px solid ${props => props.theme.border};
  transform: translateX(${props => props.$open ? '0' : '-100%'});
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  @media (max-width: 768px) {
    animation: ${props => props.$open ? slideIn : 'none'} 0.3s ease-out;
  }
`

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 32px;
  padding-bottom: 24px;
  border-bottom: 1px solid ${props => props.theme.border};
`

const LogoIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: ${props => props.theme.gradientPrimary};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 24px;
  box-shadow: 0 4px 12px ${props => props.theme.primary}40;
`

const LogoText = styled.div`
  display: flex;
  flex-direction: column;
`

const LogoTitle = styled.div`
  font-size: 20px;
  font-weight: 800;
  color: ${props => props.theme.text};
  letter-spacing: -0.5px;
`

const LogoSubtitle = styled.div`
  font-size: 11px;
  color: ${props => props.theme.textTertiary};
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`

const UserProfile = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: ${props => props.theme.bgSecondary};
  border-radius: 12px;
  margin-bottom: 24px;
  border: 1px solid ${props => props.theme.border};
`

const Avatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: ${props => props.theme.gradientSecondary};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 700;
  font-size: 16px;
  flex-shrink: 0;
`

const UserInfo = styled.div`
  flex: 1;
  min-width: 0;
`

const UserName = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: ${props => props.theme.text};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const UserRole = styled.div`
  font-size: 12px;
  color: ${props => props.theme.textSecondary};
  text-transform: capitalize;
`

const Menu = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
  overflow-y: auto;
  
  &::-webkit-scrollbar {
    width: 4px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${props => props.theme.border};
    border-radius: 2px;
  }
`

const MenuItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  cursor: pointer;
  border-radius: 10px;
  transition: all 0.2s ease;
  background: ${props => props.$active ? props.theme.primaryLight : 'transparent'};
  color: ${props => props.$active ? props.theme.primary : props.theme.text};
  font-weight: ${props => props.$active ? '600' : '500'};
  font-size: 15px;
  position: relative;
  
  &:hover {
    background: ${props => props.$active ? props.theme.primaryLight : props.theme.bgTertiary};
    transform: translateX(4px);
  }
  
  ${props => props.$active && `
    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 3px;
      height: 20px;
      background: ${props.theme.primary};
      border-radius: 0 2px 2px 0;
    }
  `}
`

const MenuIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
`

const MenuLabel = styled.div`
  flex: 1;
`

const Footer = styled.div`
  padding-top: 16px;
  border-top: 1px solid ${props => props.theme.border};
  text-align: center;
  font-size: 11px;
  color: ${props => props.theme.textTertiary};
`

const Version = styled.div`
  font-weight: 600;
`

export default function Sidebar({ open, setOpen, currentTab, setCurrentTab, user }) {
  const getInitials = (name) => {
    if (!name) return '?'
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
  }
  
  const getRoleLabel = (role) => {
    if (role === 'teacher') return 'Professor'
    if (role === 'parent') return 'Responsável'
    return role
  }
  
  // Menu para aluno/pai
  const parentMenu = [
    { id: 'dashboard', label: 'Dashboard', icon: <FiHome /> },
    { id: 'comunicados', label: 'Comunicados', icon: <FiMessageSquare /> },
    { id: 'vagas', label: 'Vagas', icon: <FiBookOpen /> },
    { id: 'financeiro', label: 'Financeiro', icon: <FiDollarSign /> },
  ]

  // Menu para professor
  const teacherMenu = [
    { id: 'dashboard', label: 'Dashboard', icon: <FiHome /> },
    { id: 'turmas', label: 'Turmas', icon: <FiUsers /> },
    { id: 'comunicados', label: 'Comunicados', icon: <FiMessageSquare /> },
    { id: 'pagamentos', label: 'Pagamentos', icon: <FiDollarSign /> },
  ]

  const menuItems = user?.role === 'teacher' ? teacherMenu : parentMenu

  return (
    <>
      <Overlay $open={open} onClick={() => setOpen(false)} />
      <Wrap $open={open}>
        <Header>
          <LogoIcon><IoFootball /></LogoIcon>
          <LogoText>
            <LogoTitle>SportsEdu</LogoTitle>
            <LogoSubtitle>Gestão Esportiva</LogoSubtitle>
          </LogoText>
        </Header>
        
        <UserProfile>
          <Avatar>{getInitials(user?.name)}</Avatar>
          <UserInfo>
            <UserName>{user?.name || 'Usuário'}</UserName>
            <UserRole>{getRoleLabel(user?.role)}</UserRole>
          </UserInfo>
        </UserProfile>
        
        <Menu>
          {menuItems.map(item => (
            <MenuItem
              key={item.id}
              $active={currentTab === item.id}
              onClick={() => {
                setCurrentTab(item.id)
                setOpen(false)
              }}
            >
              <MenuIcon>{item.icon}</MenuIcon>
              <MenuLabel>{item.label}</MenuLabel>
            </MenuItem>
          ))}
        </Menu>
        
        <Footer>
          <Version>v1.0.0</Version>
          <div>© 2025 SportsEdu</div>
        </Footer>
      </Wrap>
    </>
  )
}
