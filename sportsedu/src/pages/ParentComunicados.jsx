import React, { useState } from 'react'
import styled from 'styled-components'

const ChatContainer = styled.div`
  display:flex;
  flex-direction:column;
  height:70vh;
  border-radius:12px;
  background:${props => props.theme.cardBg};
  box-shadow:0 4px 10px rgba(0,0,0,0.2);
  overflow:hidden;
`

const Messages = styled.div`
  flex:1;
  padding:16px;
  overflow-y:auto;
  display:flex;
  flex-direction:column;
  gap:12px;
`

const Bubble = styled.div`
  max-width:70%;
  padding:12px 16px;
  border-radius:16px;
  background:${props => props.isTeacher ? '#4a90e2' : '#2ecc71'};
  color:#fff;
  align-self:${props => props.isTeacher ? 'flex-start' : 'flex-end'};
  font-size:14px;
  line-height:1.4;
  position:relative;

  &:after {
    content:'';
    position:absolute;
    bottom:0;
    ${props => props.isTeacher ? 'left:-8px;' : 'right:-8px;'}
    width:0;
    height:0;
    border:8px solid transparent;
    border-top-color:${props => props.isTeacher ? '#4a90e2' : '#2ecc71'};
    border-bottom:0;
    margin-bottom:-1px;
  }
`

const Sender = styled.div`
  font-size:12px;
  opacity:0.8;
  margin-bottom:4px;
`

const InputArea = styled.div`
  display:flex;
  padding:12px;
  border-top:1px solid rgba(255,255,255,0.1);
  background:${props => props.theme.bg};
`

const Input = styled.input`
  flex:1;
  border:none;
  outline:none;
  padding:10px;
  border-radius:8px;
  background:${props => props.theme.cardBg};
  color:${props => props.theme.text};
`

const SendButton = styled.button`
  margin-left:8px;
  padding:10px 16px;
  background:#4a90e2;
  border:none;
  border-radius:8px;
  color:#fff;
  cursor:pointer;
  font-weight:bold;
  transition:0.2s;
  &:hover { background:#357ab8; }
`

export default function ParentComunicados({ user }) {
  const [messages, setMessages] = useState([
    { sender:"Treinador", text:"Treino extra na quarta-feira às 19h.", teacher:true },
    { sender:"Coordenação", text:"Lembrando que a mensalidade vence sexta-feira.", teacher:true },
    { sender:user?.name || "Você", text:"Ok, obrigado pelo aviso!", teacher:false }
  ])
  const [newMsg, setNewMsg] = useState("")

  function handleSend(){
    if(newMsg.trim()==="") return
    setMessages([...messages, { sender:user?.name || "Você", text:newMsg, teacher:false }])
    setNewMsg("")
  }

  return (
    <ChatContainer>
      <Messages>
        {messages.map((msg, i)=>(
          <div key={i} style={{display:'flex', flexDirection:'column'}}>
            <Sender>{msg.sender}</Sender>
            <Bubble isTeacher={msg.teacher}>{msg.text}</Bubble>
          </div>
        ))}
      </Messages>

      <InputArea>
        <Input 
          value={newMsg} 
          onChange={e=>setNewMsg(e.target.value)} 
          placeholder="Digite sua mensagem..." 
        />
        <SendButton onClick={handleSend}>Enviar</SendButton>
      </InputArea>
    </ChatContainer>
  )
}
