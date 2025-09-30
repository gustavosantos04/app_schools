import React, { useState } from 'react'
import styled, { keyframes } from 'styled-components'
import Table from '../components/Table'
import { FiPlus, FiEdit, FiUsers, FiClipboard } from 'react-icons/fi'
import Toast from '../components/Toast'
import FloatingButton from '../components/FloatingButton'

const Wrap = styled.div`
  padding:24px;
  flex:1;
  display:flex;
  flex-direction:column;
  background: linear-gradient(180deg, #0b1220 0%, #071027 100%);
`
const fadeIn = keyframes`
  from { opacity:0; transform: translateY(20px);}
  to { opacity:1; transform: translateY(0);}
`
const AnimatedDiv = styled.div`
  animation: ${fadeIn} 0.5s ease forwards;
`
const Header = styled.div`
  display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;
`
const Title = styled.h2`
  color:#fff;
  font-size:1.4rem;
  font-weight:600;
`
const ActionButton = styled.button`
  display:flex; align-items:center; gap:8px;
  background:#ffa500; color:#fff; border:none; border-radius:8px;
  padding:8px 16px; cursor:pointer; font-weight:bold; transition:0.2s;
  &:hover { background:#ffb733; transform: translateY(-2px); }
`

const Card = styled.div`
  background:#071027;
  padding:16px;
  border-radius:16px;
  box-shadow:0 6px 20px rgba(0,0,0,0.4);
  flex:1;
`

export default function TeacherTurmas() {
  const [toastMsg, setToastMsg] = useState(null)

  const turmas = [
    { Nome:"Turma A", Vagas:5, Alunos:12 },
    { Nome:"Turma B", Vagas:3, Alunos:15 },
    { Nome:"Turma C", Vagas:0, Alunos:20 },
  ]

  const handleAction = (msg) => setToastMsg(msg)

  return (
    <Wrap>
      <AnimatedDiv>
        <Header>
          <Title>Minhas Turmas</Title>
          <ActionButton onClick={()=>handleAction('Adicionar nova turma')}>
            <FiPlus /> Nova Turma
          </ActionButton>
        </Header>

        <Card>
          <Table 
            columns={['Nome','Vagas','Alunos']} 
            data={turmas} 
            renderActions={(row)=>(<>
              <button 
                style={{
                  transition:'0.2s', padding:'6px 12px', borderRadius:6, cursor:'pointer', 
                  marginRight:4, background:'#0088FE', color:'#fff', display:'flex', alignItems:'center', gap:4
                }}
                onClick={()=>handleAction(`Editar ${row.Nome}`)}
              ><FiEdit /> Editar</button>
              <button 
                style={{
                  transition:'0.2s', padding:'6px 12px', borderRadius:6, cursor:'pointer', 
                  marginRight:4, background:'#FF8042', color:'#fff', display:'flex', alignItems:'center', gap:4
                }}
                onClick={()=>handleAction(`Abrir vagas ${row.Nome}`)}
              ><FiClipboard /> Abrir Vagas</button>
              <button 
                style={{
                  transition:'0.2s', padding:'6px 12px', borderRadius:6, cursor:'pointer', 
                  background:'#00C49F', color:'#fff', display:'flex', alignItems:'center', gap:4
                }}
                onClick={()=>handleAction(`Alunos ${row.Nome}`)}
              ><FiUsers /> Alunos</button>
            </>)} 
          />
        </Card>
      </AnimatedDiv>

      {/* Floating button */}
      <FloatingButton onClick={()=>handleAction('Adicionar nova turma')} />

      {/* Toast */}
      {toastMsg && <Toast message={toastMsg} onClose={()=>setToastMsg(null)} />}
    </Wrap>
  )
}
