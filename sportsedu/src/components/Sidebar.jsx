import React from 'react'
import styled, { keyframes } from 'styled-components'
import { FaHome, FaClipboardList, FaDollarSign } from 'react-icons/fa'

// animações
const slideIn = keyframes`
  from { transform: translateX(-100%); }
  to { transform: translateX(0); }
`
const slideOut = keyframes`
  from { transform: translateX(0); }
  to { transform: translateX(-100%); }
`
const fadeIn = keyframes`
  from { opacity:0; }
  to { opacity:1; }
`
const fadeOut = keyframes`
  from { opacity:1; }
  to { opacity:0; }
`

// estilos
const Wrap = styled.div`
  width:220px; 
  background:#071027; 
  height:100vh; 
  padding:24px;
  display:flex; 
  flex-direction:column; 
  color:#fff;
  position:fixed; 
  top:0; 
  left:0;
  z-index:1000;
  box-shadow: 2px 0 8px rgba(0,0,0,0.4);
  transform: translateX(${props => props.open ? '0' : '-100%'});
  animation: ${props => props.open ? slideIn : slideOut} 0.3s forwards;
  transition: transform 0.3s ease;
`

const Overlay = styled.div`
  display: ${props => props.open ? 'block' : 'none'};
  position:fixed; top:0; left:0; width:100%; height:100%;
  background: rgba(0,0,0,0.3); 
  z-index:999;
  animation: ${props => props.open ? fadeIn : fadeOut} 0.3s forwards;
`

const Logo = styled.div`
  font-size:22px; 
  font-weight:bold; 
  margin-bottom:32px; 
  text-align:center;
  letter-spacing:1px;
  color: #ffa500;
`

const Menu = styled.div`
  flex:1; 
  display:flex; 
  flex-direction:column;
`

const MenuItem = styled.div`
  display:flex; 
  align-items:center; 
  gap:12px; 
  padding:12px 8px; 
  margin-bottom:8px;
  cursor:pointer; 
  border-radius:8px; 
  transition: all 0.3s ease;
  background: ${props => props.active ? '#1f2745' : 'transparent'};
  &:hover {
    background:#1a1f33;
    transform: translateX(4px);
    box-shadow: 2px 2px 8px rgba(255,165,0,0.3);
  }
  color: #fff;
  font-weight: ${props => props.active ? 'bold' : 'normal'};
`

export default function Sidebar({ open, setOpen, currentTab, setCurrentTab, user }) {
  // menu para aluno/pai
  const alunoMenu = [
    { id: 'dashboard', label:'Dashboard', icon:<FaHome /> },
    { id: 'comunicados', label:'Comunicados', icon:<FaClipboardList /> },
    { id: 'vagas', label:'Vagas', icon:<FaClipboardList /> },
    { id: 'financeiro', label:'Financeiro', icon:<FaDollarSign /> },
  ]

  // menu para professor (se precisar manter separado)
  const professorMenu = [
    { id: 'dashboard', label:'Dashboard', icon:<FaHome /> },
    { id: 'turmas', label:'Turmas', icon:<FaClipboardList /> },
    { id: 'comunicados', label:'Comunicados', icon:<FaClipboardList /> },
    { id: 'pagamentos', label:'Pagamentos', icon:<FaDollarSign /> },
  ]

  // decide qual menu usar com base no role do usuário
  const menuItems = user?.role === 'professor' ? professorMenu : alunoMenu

  return (
    <>
      <Overlay open={open} onClick={()=>setOpen(false)} />
      <Wrap open={open}>
        <Logo>Futsal App</Logo>
        <Menu>
          {menuItems.map(m => (
            <MenuItem
              key={m.id}
              active={currentTab===m.id}
              onClick={() => { setCurrentTab(m.id); setOpen(false) }}
            >
              {m.icon} {m.label}
            </MenuItem>
          ))}
        </Menu>
      </Wrap>
    </>
  )
}
