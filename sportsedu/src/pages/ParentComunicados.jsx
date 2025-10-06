import React, { useState } from 'react'
import styled from 'styled-components'
import { FiMessageSquare, FiSend, FiCalendar, FiUser } from 'react-icons/fi'

const Wrap = styled.div`
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  height: ${props => props.$resumo ? 'auto' : 'calc(100vh - 200px)'};
  
  @media (max-width: 768px) {
    padding: 20px;
  }
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
`

const Title = styled.h2`
  margin: 0;
  font-size: 28px;
  font-weight: 700;
  color: ${props => props.theme.text};
  display: flex;
  align-items: center;
  gap: 12px;
`

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  border-radius: 16px;
  background: ${props => props.theme.cardBg};
  box-shadow: ${props => props.theme.shadowMd};
  border: 1px solid ${props => props.theme.border};
  overflow: hidden;
  min-height: ${props => props.$resumo ? '300px' : '500px'};
`

const Messages = styled.div`
  flex: 1;
  padding: 24px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
  background: ${props => props.theme.bg};
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${props => props.theme.border};
    border-radius: 3px;
  }
`

const MessageGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${props => props.$isOwn ? 'flex-end' : 'flex-start'};
  gap: 4px;
`

const MessageInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: ${props => props.theme.textSecondary};
  padding: 0 12px;
`

const Bubble = styled.div`
  max-width: 70%;
  padding: 14px 18px;
  border-radius: 16px;
  background: ${props => props.$isOwn 
    ? props.theme.gradientPrimary 
    : props.theme.cardBg};
  color: ${props => props.$isOwn ? 'white' : props.theme.text};
  font-size: 15px;
  line-height: 1.5;
  box-shadow: ${props => props.theme.shadowSm};
  border: ${props => props.$isOwn ? 'none' : `1px solid ${props.theme.border}`};
  word-wrap: break-word;
  
  ${props => props.$isOwn ? `
    border-bottom-right-radius: 4px;
  ` : `
    border-bottom-left-radius: 4px;
  `}
`

const InputArea = styled.div`
  display: flex;
  padding: 20px;
  gap: 12px;
  border-top: 1px solid ${props => props.theme.border};
  background: ${props => props.theme.cardBg};
`

const Input = styled.input`
  flex: 1;
  border: 2px solid ${props => props.theme.border};
  outline: none;
  padding: 14px 18px;
  border-radius: 12px;
  background: ${props => props.theme.bgSecondary};
  color: ${props => props.theme.text};
  font-size: 15px;
  transition: all 0.2s ease;
  
  &:focus {
    border-color: ${props => props.theme.primary};
    box-shadow: 0 0 0 4px ${props => props.theme.primaryLight};
  }
  
  &::placeholder {
    color: ${props => props.theme.textTertiary};
  }
`

const SendButton = styled.button`
  padding: 14px 24px;
  background: ${props => props.theme.gradientPrimary};
  border: none;
  border-radius: 12px;
  color: white;
  cursor: pointer;
  font-weight: 700;
  font-size: 15px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 4px 12px ${props => props.theme.primary}40;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px ${props => props.theme.primary}60;
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`

const ResumoList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`

const ResumoItem = styled.div`
  padding: 12px 16px;
  background: ${props => props.theme.bgSecondary};
  border-radius: 10px;
  border-left: 3px solid ${props => props.theme.primary};
  display: flex;
  flex-direction: column;
  gap: 6px;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${props => props.theme.bgTertiary};
    transform: translateX(4px);
  }
`

const ResumoSender = styled.div`
  font-size: 13px;
  font-weight: 600;
  color: ${props => props.theme.primary};
  display: flex;
  align-items: center;
  gap: 6px;
`

const ResumoText = styled.div`
  font-size: 14px;
  color: ${props => props.theme.text};
  line-height: 1.4;
`

const ResumoDate = styled.div`
  font-size: 12px;
  color: ${props => props.theme.textSecondary};
  display: flex;
  align-items: center;
  gap: 4px;
`

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  color: ${props => props.theme.textSecondary};
  text-align: center;
  gap: 12px;
`

const EmptyIcon = styled.div`
  font-size: 48px;
  color: ${props => props.theme.textTertiary};
`

export default function ParentComunicados({ user, resumo = false }) {
  const [messages, setMessages] = useState([
    { 
      sender: "Treinador João", 
      text: "Treino extra na quarta-feira às 19h. Por favor, chegar 15 minutos antes.", 
      teacher: true,
      date: "2025-10-05 14:30"
    },
    { 
      sender: "Coordenação", 
      text: "Lembrando que a mensalidade vence na próxima sexta-feira, dia 15/10.", 
      teacher: true,
      date: "2025-10-04 10:15"
    },
    { 
      sender: user?.name || "Você", 
      text: "Ok, obrigado pelo aviso! Estaremos presentes.", 
      teacher: false,
      date: "2025-10-05 15:00"
    }
  ])
  const [newMsg, setNewMsg] = useState("")

  const handleSend = () => {
    if (newMsg.trim() === "") return
    
    const now = new Date()
    const dateStr = now.toISOString().slice(0, 16).replace('T', ' ')
    
    setMessages([
      ...messages, 
      { 
        sender: user?.name || "Você", 
        text: newMsg, 
        teacher: false,
        date: dateStr
      }
    ])
    setNewMsg("")
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const formatDate = (dateStr) => {
    const date = new Date(dateStr)
    const today = new Date()
    const isToday = date.toDateString() === today.toDateString()
    
    if (isToday) {
      return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    }
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })
  }

  // Modo resumo para dashboard
  if (resumo) {
    const lastMessages = messages.filter(m => m.teacher).slice(-3)
    
    if (lastMessages.length === 0) {
      return (
        <EmptyState>
          <EmptyIcon><FiMessageSquare /></EmptyIcon>
          <div>Nenhum comunicado recente</div>
        </EmptyState>
      )
    }
    
    return (
      <ResumoList>
        {lastMessages.map((msg, i) => (
          <ResumoItem key={i}>
            <ResumoSender>
              <FiUser size={14} />
              {msg.sender}
            </ResumoSender>
            <ResumoText>{msg.text}</ResumoText>
            <ResumoDate>
              <FiCalendar size={12} />
              {formatDate(msg.date)}
            </ResumoDate>
          </ResumoItem>
        ))}
      </ResumoList>
    )
  }

  // Modo completo
  return (
    <Wrap>
      <Header>
        <Title>
          <FiMessageSquare size={32} />
          Comunicados
        </Title>
      </Header>

      <ChatContainer>
        <Messages>
          {messages.length === 0 ? (
            <EmptyState>
              <EmptyIcon><FiMessageSquare /></EmptyIcon>
              <div>Nenhuma mensagem ainda</div>
            </EmptyState>
          ) : (
            messages.map((msg, i) => (
              <MessageGroup key={i} $isOwn={!msg.teacher}>
                <MessageInfo>
                  <FiUser size={12} />
                  {msg.sender}
                  <span>•</span>
                  {formatDate(msg.date)}
                </MessageInfo>
                <Bubble $isOwn={!msg.teacher}>
                  {msg.text}
                </Bubble>
              </MessageGroup>
            ))
          )}
        </Messages>

        <InputArea>
          <Input 
            value={newMsg} 
            onChange={e => setNewMsg(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Digite sua mensagem..." 
          />
          <SendButton onClick={handleSend} disabled={!newMsg.trim()}>
            <FiSend size={18} />
            Enviar
          </SendButton>
        </InputArea>
      </ChatContainer>
    </Wrap>
  )
}
