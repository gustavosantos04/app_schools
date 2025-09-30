import React, { useState, useMemo } from 'react'
import styled from 'styled-components'
import { FiEdit, FiPlus, FiUsers } from 'react-icons/fi'
import Toast from '../components/Toast'
import FloatingButton from '../components/FloatingButton'

// Container
const Wrap = styled.div`padding:16px 24px; color:#fff;`

// Resumo
const Summary = styled.div`display:flex; gap:16px; margin-bottom:16px; flex-wrap:wrap;`
const SummaryCard = styled.div`
  background: #071027; padding:16px; border-radius:12px; flex:1; min-width:150px;
  display:flex; flex-direction:column; align-items:center; justify-content:center;
  transition: all 0.3s;
  &:hover { transform: translateY(-4px); box-shadow:0 8px 16px rgba(255,165,0,0.3); }
`
const SummaryLabel = styled.div`font-size:14px; color:#aaa;`
const SummaryValue = styled.div`font-size:22px; font-weight:bold; margin-top:4px;`

// Tabela
const TableWrap = styled.div`background:#071027; border-radius:12px; overflow:hidden; margin-bottom:16px;`
const TableHeader = styled.div`display:flex; padding:12px 16px; background:#1f2745; font-weight:bold;`
const TableRow = styled.div`
  display:flex; padding:12px 16px; align-items:center;
  background:${props=>props.index%2===0?'#0b1220':'#0c152a'};
  &:hover { background:#1a1f33; }
`
// TableCell
const TableCell = styled.div`
  flex:1;
  text-align:${props=>props.$center?'center':'left'};
  display:flex; align-items:center; gap:8px;
`
const StatusBadge = styled.span`
  padding:2px 6px; border-radius:6px;
  background:${props=>props.$full?'#ff4d4f':'#00c49f'};
  color:#fff; font-size:12px; font-weight:bold;
`
const ActionButton = styled.button`
  padding:4px 8px; margin-left:4px; border:none; border-radius:6px; cursor:pointer;
  color:#fff; font-weight:bold; transition:0.2s;
  background:${props=>props.color || '#0088FE'};
  &:hover { opacity:0.8; }
`

// Busca
const SearchInput = styled.input`
  width:100%; padding:8px 12px; border-radius:8px; border:none; margin-bottom:16px;
  background:#1f2745; color:#fff;
`

export default function TeacherTurmas({ turmas, onAction }) {
  const [search, setSearch] = useState('')
  const [toastMsg, setToastMsg] = useState(null)

  // Filtro de turmas
  const filteredTurmas = useMemo(() => {
    if (!turmas) return []
    return turmas.filter(t => t.Nome.toLowerCase().includes(search.toLowerCase()))
  }, [search, turmas])

  // Resumo
  const totalTurmas = turmas?.length || 0
  const totalVagas = turmas?.reduce((acc,t)=>acc+t.Vagas,0) || 0
  const totalAlunos = turmas?.reduce((acc,t)=>acc+t.Alunos,0) || 0

  return (
    <Wrap>
      {/* Resumo */}
      <Summary>
        <SummaryCard>
          <FiUsers size={28} />
          <SummaryLabel>Total de Turmas</SummaryLabel>
          <SummaryValue>{totalTurmas}</SummaryValue>
        </SummaryCard>
        <SummaryCard>
          <FiUsers size={28} />
          <SummaryLabel>Vagas Abertas</SummaryLabel>
          <SummaryValue>{totalVagas}</SummaryValue>
        </SummaryCard>
        <SummaryCard>
          <FiUsers size={28} />
          <SummaryLabel>Total de Alunos</SummaryLabel>
          <SummaryValue>{totalAlunos}</SummaryValue>
        </SummaryCard>
      </Summary>

      {/* Busca */}
      <SearchInput 
        placeholder="Buscar turma..." 
        value={search} 
        onChange={e=>setSearch(e.target.value)} 
      />

      {/* Tabela */}
      <TableWrap>
        <TableHeader>
          <TableCell>Nome</TableCell>
          <TableCell $center>Vagas</TableCell>
          <TableCell $center>Alunos</TableCell>
          <TableCell $center>Ações</TableCell>
        </TableHeader>
        {filteredTurmas.map((t,index)=>(
          <TableRow key={`${t.Nome}-${index}`} index={index}>
            <TableCell>{t.Nome}</TableCell>
            <TableCell center>
              {t.Vagas} {t.Vagas===0 && <StatusBadge full>Cheia</StatusBadge>}
            </TableCell>
            <TableCell center>{t.Alunos}</TableCell>
            <TableCell center>
              <ActionButton onClick={()=>setToastMsg(`Editar ${t.Nome}`)}>Editar</ActionButton>
              <ActionButton color="#ffa500" onClick={()=>setToastMsg(`Abrir vagas ${t.Nome}`)}>Abrir Vagas</ActionButton>
            </TableCell>
          </TableRow>
        ))}
      </TableWrap>

      {/* Toast e botão flutuante */}
      {toastMsg && <Toast message={toastMsg} onClose={()=>setToastMsg(null)} />}
      <FloatingButton onClick={()=>setToastMsg('Adicionar nova turma')} />
    </Wrap>
  )
}
