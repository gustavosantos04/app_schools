import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Legend } from 'recharts'
import FloatingButton from '../components/FloatingButton'
import CardAction from '../components/CardAction'
import { FiPlus } from 'react-icons/fi'

const Wrap = styled.div`
  margin: 24px;
  color: #fff;
  display: flex;
  flex-direction: column;
  gap: 24px;
`

const Cards = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
`

const Card = styled.div`
  flex: 1;
  min-width: 180px;
  background: linear-gradient(135deg, #1f2a48, #0b1220);
  padding: 20px;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: all 0.3s;
  cursor: pointer;
  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 12px 24px rgba(255,165,0,0.3);
  }
`

const ChartWrap = styled.div`
  background: #071027;
  padding: 16px;
  border-radius: 12px;
  height: 300px;
`

export default function TeacherPagamentos({ pagamentos, onAction }) {
  const [chartData, setChartData] = useState([])
  const [barData, setBarData] = useState([])
  const COLORS = ['#00C49F', '#FF8042']

  useEffect(()=>{
    // fake resumo de pagamentos
    const ok = pagamentos.filter(p=>p.status==='ok').length
    const pend = pagamentos.filter(p=>p.status==='pendente').length
    setChartData([
      { name: 'Pagamentos OK', value: ok },
      { name: 'Pendentes', value: pend }
    ])

    // fake dados do mês para gráfico de barras
    const diasMes = Array.from({length:30}, (_,i)=>i+1)
    setBarData(diasMes.map(d=>{
      const recebidos = pagamentos.filter(p=>p.date.endsWith(`-${d.toString().padStart(2,'0')}`) && p.status==='ok').length
      return { dia: d, recebidos }
    }))
  }, [pagamentos])

  // cálculo de lucro e despesas
  const totalRecebido = pagamentos.filter(p=>p.status==='ok').reduce((acc,p)=>acc+p.valor,0)
  const totalPendente = pagamentos.filter(p=>p.status==='pendente').reduce((acc,p)=>acc+p.valor,0)
  const despesasEstimadas = 5000 // exemplo, pode vir do backend
  const lucro = totalRecebido - despesasEstimadas

  return (
    <Wrap>
      <h2>Dashboard de Pagamentos</h2>

      <Cards>
        <Card>
          <h3>Total Recebido</h3>
          <p style={{fontSize:20, fontWeight:'bold'}}>R$ {totalRecebido.toFixed(2)}</p>
        </Card>
        <Card>
          <h3>Pagamentos Pendentes</h3>
          <p style={{fontSize:20, fontWeight:'bold'}}>R$ {totalPendente.toFixed(2)}</p>
        </Card>
        <Card>
          <h3>Despesas Estimadas</h3>
          <p style={{fontSize:20, fontWeight:'bold'}}>R$ {despesasEstimadas.toFixed(2)}</p>
        </Card>
        <Card>
          <h3>Lucro</h3>
          <p style={{fontSize:20, fontWeight:'bold', color: lucro>=0?'#00C49F':'#FF4D4F'}}>
            R$ {lucro.toFixed(2)}
          </p>
        </Card>
      </Cards>

      <div style={{display:'flex', gap:16, flexWrap:'wrap'}}>
        <ChartWrap style={{flex:1, minWidth:300}}>
          <h3>Pagamentos OK x Pendentes</h3>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={chartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                {chartData.map((entry,index)=><Cell key={index} fill={COLORS[index % COLORS.length]} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </ChartWrap>

        <ChartWrap style={{flex:1, minWidth:300}}>
          <h3>Recebimentos do Mês</h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData}>
              <XAxis dataKey="dia" stroke="#fff" />
              <YAxis stroke="#fff" />
              <Tooltip />
              <Legend />
              <Bar dataKey="recebidos" fill="#00C49F" />
            </BarChart>
          </ResponsiveContainer>
        </ChartWrap>
      </div>

      <FloatingButton onClick={()=>onAction('Adicionar novo pagamento')} />
    </Wrap>
  )
}
