import React from 'react'
import styled from 'styled-components'

const StyledTable = styled.table`
  width:100%; border-collapse:collapse; margin-top:16px;
  th, td { padding:8px; text-align:left; border-bottom:1px solid #1a1f33; }
  th { color:#aaa; }
  button { margin-right:8px; padding:4px 8px; border-radius:6px; cursor:pointer; border:none; }
`

export default function Table({ columns, data, renderActions }) {
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
            {columns.map(c => <td key={c}>{row[c]}</td>)}
            {renderActions && <td>{renderActions(row)}</td>}
          </tr>
        ))}
      </tbody>
    </StyledTable>
  )
}
