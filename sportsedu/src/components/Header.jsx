import React from 'react'
import styled from 'styled-components'

const Wrap = styled.div`
  display:flex; justify-content:space-between; align-items:center;
  padding:16px 24px; background:#0b1220; border-bottom:1px solid #1a1f33;
  color:#fff;
`
const Title = styled.h1`margin:0; font-size:20px;`
const LogoutBtn = styled.button`
  background:#ff4d4f; color:#fff; border:none; padding:8px 16px; border-radius:8px;
  cursor:pointer;
  &:hover { opacity:0.85; }
`

export default function Header({ title, onLogout }) {
  return (
    <Wrap>
      <Title>{title}</Title>
      <LogoutBtn onClick={onLogout}>Sair</LogoutBtn>
    </Wrap>
  )
}
