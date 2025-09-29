// components/FloatingButton.jsx
import React from 'react'
import styled from 'styled-components'
import { FiPlus } from 'react-icons/fi'

const Btn = styled.button`
  position:fixed;
  bottom:24px;
  right:24px;
  background:#ffa500;
  color:#071027;
  border:none;
  border-radius:50%;
  width:60px;
  height:60px;
  font-size:28px;
  cursor:pointer;
  box-shadow:0 6px 16px rgba(0,0,0,0.3);
  transition: all 0.3s ease;
  &:hover {
    transform: scale(1.1);
    box-shadow:0 8px 20px rgba(0,0,0,0.4);
  }
`

export default function FloatingButton({ onClick }) {
  return <Btn onClick={onClick}><FiPlus /></Btn>
}
