import React from 'react'
import styled, { keyframes } from 'styled-components'

// Keyframes para efeito hover animado
const hoverEffect = keyframes`
  0% { transform: translateY(0); box-shadow: 0 6px 20px rgba(255,165,0,0.3);}
  50% { transform: translateY(-8px); box-shadow: 0 12px 24px rgba(255,165,0,0.5);}
  100% { transform: translateY(0); box-shadow: 0 6px 20px rgba(255,165,0,0.3);}
`

const CardWrap = styled.div`
  background: linear-gradient(135deg, #1f2a48, #0b1220);
  padding: 20px; 
  border-radius: 16px; 
  flex: 1; 
  min-width: 180px;
  display: flex; 
  flex-direction: column; 
  align-items: center; 
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  &:hover {
    animation: ${hoverEffect} 0.6s ease-in-out;
  }
`

const Icon = styled.div`
  font-size: 36px; 
  margin-bottom: 12px; 
  color: #ffa500;
  transition: transform 0.3s ease;
  ${CardWrap}:hover & {
    transform: scale(1.1);
  }
`

const Label = styled.div`
  font-weight: bold; 
  text-align: center; 
  font-size: 16px; 
  color: #fff;
  transition: color 0.3s ease;
  ${CardWrap}:hover & {
    color: #ffd700;
  }
`

export default function CardAction({ icon, label, onClick }) {
  return (
    <CardWrap onClick={onClick}>
      <Icon>{icon}</Icon>
      <Label>{label}</Label>
    </CardWrap>
  )
}
