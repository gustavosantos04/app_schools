// components/Toast.jsx
import React, { useEffect } from 'react'
import styled, { keyframes } from 'styled-components'

const fadeInOut = keyframes`
  0% { opacity:0; transform: translateY(20px);}
  10% { opacity:1; transform: translateY(0);}
  90% { opacity:1; transform: translateY(0);}
  100% { opacity:0; transform: translateY(20px);}
`

const ToastWrap = styled.div`
  position:fixed;
  bottom:24px;
  right:24px;
  background:#ffa500;
  color:#000;
  padding:12px 20px;
  border-radius:8px;
  font-weight:bold;
  animation: ${fadeInOut} 3s forwards;
  box-shadow: 0 6px 16px rgba(0,0,0,0.3);
`

export default function Toast({ message, onClose }) {
  useEffect(()=>{
    const timer = setTimeout(()=>onClose(),3000)
    return ()=>clearTimeout(timer)
  },[onClose])

  return <ToastWrap>{message}</ToastWrap>
}
