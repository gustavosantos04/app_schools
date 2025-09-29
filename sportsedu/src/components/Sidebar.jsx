import React from 'react'
import styled from 'styled-components'
import { FaHome, FaUsers, FaClipboardList, FaDollarSign } from 'react-icons/fa'

const Wrap = styled.div`
  width:220px; background:#071027; height:100vh; padding:24px;
  display:flex; flex-direction:column; color:#fff;
  position:fixed; top:0; left:0;
  transform: ${props => props.open ? 'translateX(0)' : 'translateX(-100%)'};
  transition: transform 0.3s ease;
  z-index:1000;
  box-shadow: 2px 0 8px rgba(0,0,0,0.4);
`
const Overlay = styled.div`
  display: ${props => props.open ? 'block' : 'none'};
  position:fixed; top:0; left:0; width:100%; height:100%;
  background: rgba(0,0,0,0.3); z-index:999;
`
const Logo = styled.div`
  font-size:20px; font-weight:bold; margin-bottom:32px; text-align:center;
`
const Menu = styled.div`flex:1;`
const MenuItem = styled.div`
  display:flex; align-items:center; gap:12px; padding:12px 8px; margin-bottom:8px;
  cursor:pointer; border-radius:8px; transition:0.2s;
  &:hover { background:#1a1f33; }
  background: ${props => props.active ? '#1f2745' : 'none'};
`

export default function Sidebar({ open, setOpen, currentTab, setCurrentTab }) {
  const menuItems = [
    { id: 'dashboard', label:'Dashboard', icon:<FaHome /> },
    { id: 'turmas', label:'Turmas', icon:<FaUsers /> },
    { id: 'vagas', label:'Vagas', icon:<FaClipboardList /> },
    { id: 'comunicados', label:'Comunicados', icon:<FaClipboardList /> },
    { id: 'pagamentos', label:'Pagamentos', icon:<FaDollarSign /> },
  ]

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
