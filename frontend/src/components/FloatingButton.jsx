import React from 'react'
import styled from 'styled-components'
import { FiPlus } from 'react-icons/fi'

const Button = styled.button`
  position: fixed;
  bottom: 32px;
  right: 32px;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: ${props => props.theme.gradientPrimary};
  border: none;
  color: white;
  font-size: 28px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 24px ${props => props.theme.primary}60;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 997;
  
  &:hover {
    transform: scale(1.1) rotate(90deg);
    box-shadow: 0 12px 32px ${props => props.theme.primary}80;
  }
  
  &:active {
    transform: scale(1.05) rotate(90deg);
  }
  
  @media (max-width: 768px) {
    bottom: 24px;
    right: 24px;
    width: 56px;
    height: 56px;
    font-size: 24px;
  }
`

export default function FloatingButton({ onClick, icon }) {
  return (
    <Button onClick={onClick}>
      {icon || <FiPlus />}
    </Button>
  )
}
