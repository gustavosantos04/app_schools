import React from 'react'
import styled from 'styled-components'

const Card = styled.div`
  flex: 1;
  min-width: 200px;
  background: ${props => props.theme.cardBg};
  border-radius: 16px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: ${props => props.theme.shadowMd};
  border: 1px solid ${props => props.theme.border};
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: ${props => props.theme.gradientPrimary};
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.3s ease;
  }
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: ${props => props.theme.shadowXl};
    border-color: ${props => props.theme.primary};
    
    &::before {
      transform: scaleX(1);
    }
  }
  
  &:active {
    transform: translateY(-4px);
  }
  
  @media (max-width: 768px) {
    min-width: 150px;
    padding: 20px;
  }
`

const IconWrapper = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 16px;
  background: ${props => props.theme.gradientPrimary};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 24px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px ${props => props.theme.primary}40;
  
  ${Card}:hover & {
    transform: scale(1.1) rotate(5deg);
    box-shadow: 0 8px 20px ${props => props.theme.primary}60;
  }
`

const Label = styled.div`
  font-weight: 600;
  font-size: 15px;
  color: ${props => props.theme.text};
  text-align: center;
  transition: color 0.3s ease;
  
  ${Card}:hover & {
    color: ${props => props.theme.primary};
  }
`

const Description = styled.div`
  font-size: 12px;
  color: ${props => props.theme.textSecondary};
  text-align: center;
  line-height: 1.4;
`

export default function CardAction({ icon, label, description, onClick }) {
  return (
    <Card onClick={onClick}>
      <IconWrapper>{icon}</IconWrapper>
      <Label>{label}</Label>
      {description && <Description>{description}</Description>}
    </Card>
  )
}
