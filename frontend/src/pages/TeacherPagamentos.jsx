import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Legend, LineChart, Line, CartesianGrid } from 'recharts'
import FloatingButton from '../components/FloatingButton'
import { Skeleton } from '../components/Loading'
import { FiDollarSign, FiTrendingUp, FiTrendingDown, FiClock, FiCheckCircle, FiAlertCircle, FiPlus } from 'react-icons/fi'

const Wrap = styled.div`
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 32px;
  
  @media (max-width: 768px) {
    padding: 20px;
    gap: 24px;
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

const Period = styled.div`
  padding: 8px 16px;
  background: ${props => props.theme.bgTertiary};
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  color: ${props => props.theme.text};
`

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 20px;
`

const StatCard = styled.div`
  background: ${props => props.$gradient || props.theme.cardBg};
  border-radius: 16px;
  padding: 24px;
  border: 1px solid ${props => props.theme.border};
  box-shadow: ${props => props.theme.shadowMd};
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  ${props => props.$gradient && `
    color: white;
    border: none;
  `}
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: ${props => props.theme.shadowLg};
  }
`

const StatHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
`

const StatIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: ${props => props.$bg || 'rgba(255, 255, 255, 0.2)'};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.$color || 'white'};
  font-size: 24px;
`

const StatLabel = styled.div`
  font-size: 14px;
  color: ${props => props.$light ? 'rgba(255, 255, 255, 0.8)' : props.theme.textSecondary};
  font-weight: 500;
  margin-bottom: 8px;
`

const StatValue = styled.div`
  font-size: 32px;
  font-weight: 800;
  color: ${props => props.$light ? 'white' : props.theme.text};
  line-height: 1;
  margin-bottom: 8px;
`

const StatTrend = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: ${props => props.$light ? 'rgba(255, 255, 255, 0.9)' : props.$positive ? props.theme.success : props.theme.error};
  font-weight: 600;
`

const ChartsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 24px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const ChartCard = styled.div`
  background: ${props => props.theme.cardBg};
  border-radius: 16px;
  padding: 24px;
  border: 1px solid ${props => props.theme.border};
  box-shadow: ${props => props.theme.shadowMd};
`

const ChartTitle = styled.h3`
  margin: 0 0 20px 0;
  font-size: 18px;
  font-weight: 700;
  color: ${props => props.theme.text};
`

const ChartContent = styled.div`
  height: ${props => props.$height || '300px'};
  display: flex;
  align-items: center;
  justify-content: center;
`

const TableContainer = styled.div`
  background: ${props => props.theme.cardBg};
  border-radius: 16px;
  border: 1px solid ${props => props.theme.border};
  box-shadow: ${props => props.theme.shadowMd};
  overflow: hidden;
`

const TableHeader = styled.div`
  padding: 20px 24px;
  border-bottom: 1px solid ${props => props.theme.border};
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const TableTitle = styled.h3`
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  color: ${props => props.theme.text};
`

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  @media (max-width: 768px) {
    display: none;
  }
`

const Thead = styled.thead`
  background: ${props => props.theme.bgSecondary};
`

const Th = styled.th`
  padding: 16px 24px;
  text-align: left;
  font-size: 13px;
  font-weight: 600;
  color: ${props => props.theme.textSecondary};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`

const Tbody = styled.tbody``

const Tr = styled.tr`
  border-bottom: 1px solid ${props => props.theme.border};
  transition: background 0.2s ease;
  
  &:hover {
    background: ${props => props.theme.bgTertiary};
  }
  
  &:last-child {
    border-bottom: none;
  }
`

const Td = styled.td`
  padding: 16px 24px;
  font-size: 14px;
  color: ${props => props.theme.text};
`

const Badge = styled.span`
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  
  ${props => props.$status === 'ok' ? `
    background: ${props.theme.successLight};
    color: ${props.theme.success};
  ` : props.$status === 'pendente' ? `
    background: ${props.theme.warningLight};
    color: ${props.theme.warning};
  ` : `
    background: ${props.theme.errorLight};
    color: ${props.theme.error};
  `}
`

const MobileCards = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    gap: 14px;
    margin-top: 16px;
  }
`

const MobileCard = styled.div`
  background: ${props => props.theme.cardBg};
  border-radius: 12px;
  padding: 16px;
  border: 1px solid ${props => props.theme.border};
  box-shadow: ${props => props.theme.shadowSm};
  color: ${props => props.theme.text};
`

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  font-size: 15px;
  font-weight: 600;
`

const CardInfo = styled.p`
  font-size: 14px;
  margin: 4px 0;
  span {
    font-weight: 600;
    color: ${props => props.theme.textSecondary};
  }
`


const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: ${props => props.theme.textSecondary};
`

export default function TeacherPagamentos({ pagamentos = [], onAction }) {
  const [loading, setLoading] = useState(true)
  const [chartData, setChartData] = useState([])
  const [lineData, setLineData] = useState([])
  
  // Dados fake para demonstração
  const fakePagamentos = pagamentos.length > 0 ? pagamentos : [
    { id: 1, aluno: 'João Silva', valor: 150, status: 'ok', date: '2025-10-01', turma: 'Turma A' },
    { id: 2, aluno: 'Maria Santos', valor: 150, status: 'ok', date: '2025-10-02', turma: 'Turma B' },
    { id: 3, aluno: 'Pedro Costa', valor: 150, status: 'pendente', date: '2025-10-03', turma: 'Turma A' },
    { id: 4, aluno: 'Ana Oliveira', valor: 150, status: 'ok', date: '2025-10-04', turma: 'Turma C' },
    { id: 5, aluno: 'Carlos Ferreira', valor: 150, status: 'pendente', date: '2025-10-05', turma: 'Turma B' },
  ]

  const COLORS = {
    ok: '#10b981',
    pendente: '#f59e0b',
    atrasado: '#ef4444'
  }

  useEffect(() => {
    setTimeout(() => {
      // Dados para gráfico de pizza
      const ok = fakePagamentos.filter(p => p.status === 'ok').length
      const pend = fakePagamentos.filter(p => p.status === 'pendente').length
      setChartData([
        { name: 'Pagos', value: ok, color: COLORS.ok },
        { name: 'Pendentes', value: pend, color: COLORS.pendente }
      ])

      // Dados para gráfico de linha (últimos 6 meses)
      const meses = ['Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out']
      setLineData(meses.map((mes, i) => ({
        mes,
        recebido: 4500 + (i * 300) + Math.random() * 500,
        previsto: 5000 + (i * 200)
      })))

      setLoading(false)
    }, 800)
  }, [fakePagamentos])

  // Cálculos
  const totalRecebido = fakePagamentos
    .filter(p => p.status === 'ok')
    .reduce((acc, p) => acc + p.valor, 0)
  
  const totalPendente = fakePagamentos
    .filter(p => p.status === 'pendente')
    .reduce((acc, p) => acc + p.valor, 0)
  
  const despesasEstimadas = 2500
  const lucro = totalRecebido - despesasEstimadas
  const taxaPagamento = fakePagamentos.length > 0 
    ? ((fakePagamentos.filter(p => p.status === 'ok').length / fakePagamentos.length) * 100).toFixed(0)
    : 0

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value)
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString + 'T00:00:00')
    return date.toLocaleDateString('pt-BR', { 
      day: '2-digit', 
      month: 'short'
    })
  }

  return (
    <Wrap>
      <Header>
        <Title>
          <FiDollarSign size={32} />
          Gestão Financeira
        </Title>
        <Period>Outubro 2025</Period>
      </Header>

      <StatsGrid>
        <StatCard $gradient="linear-gradient(135deg, #10b981 0%, #34d399 100%)">
          <StatHeader>
            <div>
              <StatLabel $light>Total Recebido</StatLabel>
              <StatValue $light>{formatCurrency(totalRecebido)}</StatValue>
              <StatTrend $light $positive>
                <FiTrendingUp size={16} />
                +12% vs mês anterior
              </StatTrend>
            </div>
            <StatIcon>
              <FiCheckCircle />
            </StatIcon>
          </StatHeader>
        </StatCard>

        <StatCard $gradient="linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)">
          <StatHeader>
            <div>
              <StatLabel $light>Pagamentos Pendentes</StatLabel>
              <StatValue $light>{formatCurrency(totalPendente)}</StatValue>
              <StatTrend $light>
                <FiClock size={16} />
                {fakePagamentos.filter(p => p.status === 'pendente').length} alunos
              </StatTrend>
            </div>
            <StatIcon>
              <FiAlertCircle />
            </StatIcon>
          </StatHeader>
        </StatCard>

        <StatCard>
          <StatHeader>
            <div>
              <StatLabel>Despesas do Mês</StatLabel>
              <StatValue>{formatCurrency(despesasEstimadas)}</StatValue>
              <StatTrend>
                <FiTrendingDown size={16} />
                Aluguel, materiais, etc.
              </StatTrend>
            </div>
            <StatIcon $bg={props => props.theme.errorLight} $color={props => props.theme.error}>
              <FiDollarSign />
            </StatIcon>
          </StatHeader>
        </StatCard>

        <StatCard>
          <StatHeader>
            <div>
              <StatLabel>Lucro Líquido</StatLabel>
              <StatValue style={{ color: lucro >= 0 ? '#10b981' : '#ef4444' }}>
                {formatCurrency(lucro)}
              </StatValue>
              <StatTrend $positive={lucro >= 0}>
                {lucro >= 0 ? <FiTrendingUp size={16} /> : <FiTrendingDown size={16} />}
                {lucro >= 0 ? 'Positivo' : 'Negativo'}
              </StatTrend>
            </div>
            <StatIcon 
              $bg={lucro >= 0 ? props => props.theme.successLight : props => props.theme.errorLight}
              $color={lucro >= 0 ? props => props.theme.success : props => props.theme.error}
            >
              <FiDollarSign />
            </StatIcon>
          </StatHeader>
        </StatCard>
      </StatsGrid>

      <ChartsGrid>
        <ChartCard>
          <ChartTitle>Status dos Pagamentos</ChartTitle>
          <ChartContent>
            {loading ? (
              <Skeleton height="250px" />
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie 
                    data={chartData} 
                    dataKey="value" 
                    nameKey="name" 
                    cx="50%" 
                    cy="50%" 
                    outerRadius={100}
                    label={(entry) => `${entry.name}: ${entry.value}`}
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            )}
          </ChartContent>
        </ChartCard>

        <ChartCard>
          <ChartTitle>Evolução de Recebimentos</ChartTitle>
          <ChartContent>
            {loading ? (
              <Skeleton height="250px" />
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={lineData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="mes" stroke="#999" />
                  <YAxis stroke="#999" />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="recebido" 
                    stroke="#10b981" 
                    strokeWidth={3}
                    name="Recebido"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="previsto" 
                    stroke="#3b82f6" 
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    name="Previsto"
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </ChartContent>
        </ChartCard>
      </ChartsGrid>

      <TableContainer>
        <TableHeader>
          <TableTitle>Pagamentos Recentes</TableTitle>
        </TableHeader>
        <Table>
          <Thead>
            <Tr>
              <Th>Aluno</Th>
              <Th>Turma</Th>
              <Th>Data</Th>
              <Th>Valor</Th>
              <Th>Status</Th>
            </Tr>
          </Thead>
          <Tbody>
            {fakePagamentos.length === 0 ? (
              <Tr>
                <Td colSpan="5">
                  <EmptyState>Nenhum pagamento registrado</EmptyState>
                </Td>
              </Tr>
            ) : (
              fakePagamentos.map((pagamento) => (
                <Tr key={pagamento.id}>
                  <Td>{pagamento.aluno}</Td>
                  <Td>{pagamento.turma}</Td>
                  <Td>{formatDate(pagamento.date)}</Td>
                  <Td style={{ fontWeight: 600 }}>{formatCurrency(pagamento.valor)}</Td>
                  <Td>
                    <Badge $status={pagamento.status}>
                      {pagamento.status === 'ok' ? (
                        <>
                          <FiCheckCircle size={12} />
                          Pago
                        </>
                      ) : (
                        <>
                          <FiClock size={12} />
                          Pendente
                        </>
                      )}
                    </Badge>
                  </Td>
                </Tr>
              ))
            )}
          </Tbody>
        </Table>

        {/* 📱 Versão mobile (cards) */}
<MobileCards>
  {fakePagamentos.length === 0 ? (
    <EmptyState>Nenhum pagamento registrado</EmptyState>
  ) : (
    fakePagamentos.map((pagamento) => (
      <MobileCard key={pagamento.id}>
        <CardHeader>
          <strong>{pagamento.aluno}</strong>
          <Badge $status={pagamento.status}>
            {pagamento.status === 'ok' ? (
              <>
                <FiCheckCircle size={12} /> Pago
              </>
            ) : (
              <>
                <FiClock size={12} /> Pendente
              </>
            )}
          </Badge>
        </CardHeader>
        <CardInfo><span>Turma:</span> {pagamento.turma}</CardInfo>
        <CardInfo><span>Data:</span> {formatDate(pagamento.date)}</CardInfo>
        <CardInfo><span>Valor:</span> {formatCurrency(pagamento.valor)}</CardInfo>
      </MobileCard>
    ))
  )}
</MobileCards>
      </TableContainer>

      <FloatingButton 
        onClick={() => onAction('Adicionar novo pagamento', 'info')}
        icon={<FiPlus />}
      />
    </Wrap>
  )
}
