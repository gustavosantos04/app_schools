import React from 'react'
import styled from 'styled-components'
import FloatingButton from '../components/FloatingButton'

const Wrap = styled.div`
  margin: 24px;
  color: #fff;
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const ComunicadoItem = styled.div`
  background: #071027;
  padding: 16px;
  border-radius: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: 0.2s;
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(255,165,0,0.2);
  }
`

export default function TeacherComunicados({ comunicados, onAction }) {
  return (
    <Wrap>
      <h2>Últimos Comunicados</h2>
      {comunicados.map((c, i) => (
        <ComunicadoItem key={i}>
          <div>
            <strong>{c.date}</strong> - {c.title}
          </div>
          <button 
            style={{
              background:'#0088FE', color:'#fff', border:'none', borderRadius:6, 
              padding:'4px 8px', cursor:'pointer'
            }}
            onClick={()=>onAction(`Editar comunicado: ${c.title}`)}
          >Editar</button>
        </ComunicadoItem>
      ))}
      <FloatingButton onClick={()=>onAction('Adicionar novo comunicado')} />
    </Wrap>
  )
}
