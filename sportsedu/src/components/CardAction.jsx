import React from 'react'
import styled from 'styled-components'

const CardWrap = styled.div`
  background:#071027; padding:16px; border-radius:12px; flex:1; min-width:180px;
  display:flex; flex-direction:column; align-items:center; cursor:pointer;
  transition: all 0.2s;
  &:hover { transform: translateY(-4px); box-shadow: 0 6px 20px rgba(0,0,0,0.4); }
`
const Icon = styled.div`font-size:32px; margin-bottom:8px;`
const Label = styled.div`font-weight:bold; text-align:center;`

export default function CardAction({ icon, label, onClick }) {
  return (
    <CardWrap onClick={onClick}>
      <Icon>{icon}</Icon>
      <Label>{label}</Label>
    </CardWrap>
  )
}
