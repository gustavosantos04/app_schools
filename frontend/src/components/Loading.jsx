import React from 'react'
import styled, { keyframes } from 'styled-components'

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
`

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${props => props.theme.bg}ee;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  backdrop-filter: blur(4px);
`

const Spinner = styled.div`
  width: 50px;
  height: 50px;
  border: 4px solid ${props => props.theme.border};
  border-top: 4px solid ${props => props.theme.primary};
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`

const Text = styled.p`
  color: ${props => props.theme.text};
  font-size: 14px;
  font-weight: 500;
  animation: ${pulse} 1.5s ease-in-out infinite;
`

export default function Loading({ text = 'Carregando...' }) {
  return (
    <Overlay>
      <Container>
        <Spinner />
        <Text>{text}</Text>
      </Container>
    </Overlay>
  )
}

// Skeleton Loading para cards
const SkeletonBox = styled.div`
  background: ${props => props.theme.cardBg};
  border-radius: ${props => props.$radius || '8px'};
  width: ${props => props.$width || '100%'};
  height: ${props => props.$height || '20px'};
  position: relative;
  overflow: hidden;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      ${props => props.theme.bgTertiary}40,
      transparent
    );
    animation: ${keyframes`
      0% { left: -100%; }
      100% { left: 100%; }
    `} 1.5s ease-in-out infinite;
  }
`

export function Skeleton({ width, height, radius }) {
  return <SkeletonBox $width={width} $height={height} $radius={radius} />
}

// Card Skeleton
export function CardSkeleton() {
  return (
    <div style={{ padding: '20px', background: 'var(--card-bg)', borderRadius: '12px' }}>
      <Skeleton height="24px" width="60%" />
      <div style={{ marginTop: '12px' }}>
        <Skeleton height="16px" width="100%" />
      </div>
      <div style={{ marginTop: '8px' }}>
        <Skeleton height="16px" width="80%" />
      </div>
      <div style={{ marginTop: '16px', display: 'flex', gap: '8px' }}>
        <Skeleton height="36px" width="100px" radius="8px" />
        <Skeleton height="36px" width="100px" radius="8px" />
      </div>
    </div>
  )
}
