import React from 'react'
import styled from 'styled-components'

const StyledTable = styled.table`
  width:100%; border-collapse:collapse; margin:16px 24px;
  th, td { padding:10px; text-align:left; border-bottom:1px solid #1a1f33; color:#fff; }
  th { color:#aaa; }
  button { margin-right:8px; padding:4px 10px; border-radius:6px; cursor:pointer; border:none; background:#ffa500; color:#000; }
`

export default function Table({ columns, data, renderActions }) {
  const getColor = (row, col) => {
    if(col==='Vagas') {
      if(row[col] === 0) return 'red';
      if(row[col] <= 3) return 'orange';
      return 'green';
    }
    return '#fff';
  }

  return (
    <StyledTable>
      <thead>
        <tr>
          {columns.map(c => <th key={c}>{c}</th>)}
          {renderActions && <th>Ações</th>}
        </tr>
      </thead>
      <tbody>
        {data.map((row,i)=>(
          <tr key={i}>
            {columns.map(c => <td key={c} style={{color:getColor(row,c)}}>{row[c]}</td>)}
            {renderActions && <td>{renderActions(row)}</td>}
          </tr>
        ))}
      </tbody>
    </StyledTable>
  )
}
