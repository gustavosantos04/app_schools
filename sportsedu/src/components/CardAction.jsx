import React from 'react'
import styled from 'styled-components'

const CardWrap = styled.div`
  background: linear-gradient(135deg, #1f2a48, #0b1220);
  padding:20px; border-radius:16px; flex:1; min-width:180px;
  display:flex; flex-direction:column; align-items:center; cursor:pointer;
  transition: all 0.3s;
  &:hover { transform: translateY(-6px); box-shadow: 0 12px 24px rgba(255,165,0,0.3); }
`
const Icon = styled.div`font-size:36px; margin-bottom:12px; color:#ffa500;`
const Label = styled.div`font-weight:bold; text-align:center; font-size:16px; color:#fff;`

export default function CardAction({ icon, label, onClick }) {
  return (
    <CardWrap onClick={onClick}>
      <Icon>{icon}</Icon>
      <Label>{label}</Label>
    </CardWrap>
  )
}
