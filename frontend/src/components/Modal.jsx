import React, { useEffect } from 'react'
import styled, { keyframes } from 'styled-components'
import { FiX } from 'react-icons/fi'

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`

const slideUp = keyframes`
  from { 
    opacity: 0;
    transform: translateY(20px) scale(0.95);
  }
  to { 
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9998;
  padding: 20px;
  animation: ${fadeIn} 0.2s ease-out;
  backdrop-filter: blur(4px);
`

const ModalContainer = styled.div`
  background: ${props => props.theme.cardBg};
  border-radius: 16px;
  box-shadow: ${props => props.theme.shadowXl};
  max-width: ${props => props.$maxWidth || '500px'};
  width: 100%;
  max-height: 90vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  animation: ${slideUp} 0.3s ease-out;
  border: 1px solid ${props => props.theme.border};
`

const Header = styled.div`
  padding: 20px 24px;
  border-bottom: 1px solid ${props => props.theme.border};
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${props => props.theme.bgSecondary};
`

const Title = styled.h3`
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  color: ${props => props.theme.text};
`

const CloseButton = styled.button`
  background: transparent;
  border: none;
  color: ${props => props.theme.textSecondary};
  cursor: pointer;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${props => props.theme.bgTertiary};
    color: ${props => props.theme.text};
  }
`

const Body = styled.div`
  padding: 24px;
  overflow-y: auto;
  flex: 1;
  color: ${props => props.theme.text};
`

const Footer = styled.div`
  padding: 16px 24px;
  border-top: 1px solid ${props => props.theme.border};
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  background: ${props => props.theme.bgSecondary};
`

const Button = styled.button`
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 14px;
  transition: all 0.2s ease;
  
  ${props => props.$variant === 'primary' ? `
    background: ${props.theme.primary};
    color: white;
    &:hover {
      background: ${props.theme.primaryHover};
      transform: translateY(-1px);
      box-shadow: ${props.theme.shadowMd};
    }
  ` : `
    background: ${props.theme.bgTertiary};
    color: ${props.theme.text};
    &:hover {
      background: ${props.theme.border};
    }
  `}
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`

export default function Modal({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  footer,
  maxWidth,
  showCloseButton = true 
}) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])
  
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])
  
  if (!isOpen) return null
  
  return (
    <Overlay onClick={onClose}>
      <ModalContainer $maxWidth={maxWidth} onClick={(e) => e.stopPropagation()}>
        {title && (
          <Header>
            <Title>{title}</Title>
            {showCloseButton && (
              <CloseButton onClick={onClose}>
                <FiX size={20} />
              </CloseButton>
            )}
          </Header>
        )}
        <Body>{children}</Body>
        {footer && <Footer>{footer}</Footer>}
      </ModalContainer>
    </Overlay>
  )
}

// Export Button para uso nos footers
export { Button as ModalButton }
