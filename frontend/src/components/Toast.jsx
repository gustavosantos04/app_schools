import React, { useEffect } from 'react'
import styled, { keyframes } from 'styled-components'
import { FiCheckCircle, FiAlertCircle, FiInfo, FiX, FiAlertTriangle } from 'react-icons/fi'

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`

const slideOut = keyframes`
  from {
    opacity: 1;
    transform: translateX(0);
  }
  to {
    opacity: 0;
    transform: translateX(100%);
  }
`

const ToastContainer = styled.div`
  position: fixed;
  top: 24px;
  right: 24px;
  z-index: 10000;
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 400px;
  
  @media (max-width: 768px) {
    left: 20px;
    right: 20px;
    max-width: none;
  }
`

const ToastItem = styled.div`
  background: ${props => props.theme.cardBg};
  border-radius: 12px;
  padding: 16px;
  box-shadow: ${props => props.theme.shadowLg};
  display: flex;
  align-items: flex-start;
  gap: 12px;
  animation: ${slideIn} 0.3s ease-out;
  border-left: 4px solid ${props => {
    switch(props.$type) {
      case 'success': return props.theme.success
      case 'error': return props.theme.error
      case 'warning': return props.theme.warning
      default: return props.theme.primary
    }
  }};
  
  &.closing {
    animation: ${slideOut} 0.3s ease-out forwards;
  }
`

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  color: ${props => {
    switch(props.$type) {
      case 'success': return props.theme.success
      case 'error': return props.theme.error
      case 'warning': return props.theme.warning
      default: return props.theme.primary
    }
  }};
`

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
`

const Title = styled.div`
  font-weight: 600;
  font-size: 14px;
  color: ${props => props.theme.text};
`

const Message = styled.div`
  font-size: 13px;
  color: ${props => props.theme.textSecondary};
  line-height: 1.4;
`

const CloseButton = styled.button`
  background: transparent;
  border: none;
  color: ${props => props.theme.textTertiary};
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: all 0.2s ease;
  flex-shrink: 0;
  
  &:hover {
    background: ${props => props.theme.bgTertiary};
    color: ${props => props.theme.text};
  }
`

const getIcon = (type) => {
  switch(type) {
    case 'success': return <FiCheckCircle size={20} />
    case 'error': return <FiAlertCircle size={20} />
    case 'warning': return <FiAlertTriangle size={20} />
    default: return <FiInfo size={20} />
  }
}

const getTitle = (type) => {
  switch(type) {
    case 'success': return 'Sucesso!'
    case 'error': return 'Erro!'
    case 'warning': return 'Atenção!'
    default: return 'Informação'
  }
}

export default function Toast({ 
  message, 
  type = 'info', 
  title,
  duration = 3000, 
  onClose 
}) {
  const [isClosing, setIsClosing] = React.useState(false)
  
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        handleClose()
      }, duration)
      
      return () => clearTimeout(timer)
    }
  }, [duration])
  
  const handleClose = () => {
    setIsClosing(true)
    setTimeout(() => {
      onClose?.()
    }, 300)
  }
  
  return (
    <ToastContainer>
      <ToastItem $type={type} className={isClosing ? 'closing' : ''}>
        <IconWrapper $type={type}>
          {getIcon(type)}
        </IconWrapper>
        <Content>
          <Title>{title || getTitle(type)}</Title>
          <Message>{message}</Message>
        </Content>
        <CloseButton onClick={handleClose}>
          <FiX size={16} />
        </CloseButton>
      </ToastItem>
    </ToastContainer>
  )
}
