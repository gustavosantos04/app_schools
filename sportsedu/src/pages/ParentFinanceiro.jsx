import React, { useState } from 'react'
import styled from 'styled-components'
import Modal, { ModalButton } from '../components/Modal'
import { FiDollarSign, FiCheckCircle, FiClock, FiAlertCircle, FiCalendar, FiCreditCard, FiDownload, FiEye } from 'react-icons/fi'

const Wrap = styled.div`
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  
  @media (max-width: 768px) {
    padding: 16px;
    gap: 20px;
  }
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
  
  @media (max-width: 768px) {
    gap: 12px;
  }
`

const Title = styled.h2`
  margin: 0;
  font-size: 28px;
  font-weight: 700;
  color: ${props => props.theme.text};
  display: flex;
  align-items: center;
  gap: 12px;
  
  @media (max-width: 768px) {
    font-size: 22px;
    gap: 8px;
    
    svg {
      width: 24px;
      height: 24px;
    }
  }
`

const StatusGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 16px;
    margin-bottom: 24px;
  }
`

const StatusCard = styled.div`
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
  
  @media (max-width: 768px) {
    padding: 20px;
    
    &:hover {
      transform: none;
    }
  }
`

const StatusIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: ${props => props.$bg || 'rgba(255, 255, 255, 0.2)'};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.$color || 'white'};
  font-size: 24px;
  margin-bottom: 16px;
  
  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
    font-size: 20px;
    margin-bottom: 12px;
  }
`

const StatusLabel = styled.div`
  font-size: 14px;
  color: ${props => props.$light ? 'rgba(255, 255, 255, 0.8)' : props.theme.textSecondary};
  font-weight: 500;
  margin-bottom: 8px;
  
  @media (max-width: 768px) {
    font-size: 13px;
  }
`

const StatusValue = styled.div`
  font-size: 28px;
  font-weight: 800;
  color: ${props => props.$light ? 'white' : props.theme.text};
  line-height: 1;
  
  @media (max-width: 768px) {
    font-size: 24px;
  }
`

const Section = styled.div`
  background: ${props => props.theme.cardBg};
  border-radius: 16px;
  border: 1px solid ${props => props.theme.border};
  box-shadow: ${props => props.theme.shadowMd};
  overflow: hidden;
  
  @media (max-width: 768px) {
    border-radius: 12px;
    overflow-x: auto;
  }
`

const SectionHeader = styled.div`
  padding: 20px 24px;
  border-bottom: 1px solid ${props => props.theme.border};
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  @media (max-width: 768px) {
    padding: 16px;
  }
`

const SectionTitle = styled.h3`
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  color: ${props => props.theme.text};
  
  @media (max-width: 768px) {
    font-size: 16px;
  }
`

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  color: ${({ theme }) => theme.text};

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
  
  @media (max-width: 768px) {
    padding: 12px 16px;
    font-size: 11px;
    white-space: nowrap;
  }
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
  
  @media (max-width: 768px) {
    padding: 12px 16px;
    font-size: 13px;
  }
`

const Badge = styled.span`
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  
  ${props => props.$status === 'pago' ? `
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

const ActionButton = styled.button`
  padding: 6px 14px;
  border-radius: 8px;
  border: none;
  font-weight: 600;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  white-space: nowrap;
  
  ${props => props.$variant === 'primary' ? `
    background: ${props.theme.primary};
    color: white;
    
    &:hover {
      background: ${props.theme.primaryHover};
      transform: translateY(-1px);
    }
  ` : `
    background: ${props.theme.bgTertiary};
    color: ${props.theme.text};
    border: 1px solid ${props.theme.border};
    
    &:hover {
      background: ${props.theme.border};
    }
  `}
  
  @media (max-width: 768px) {
    padding: 6px 10px;
    font-size: 12px;
    gap: 4px;
    
    svg {
      width: 12px;
      height: 12px;
    }
    
    &:hover {
      transform: none;
    }
  }
`

const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: ${props => props.theme.textSecondary};
`

const ResumoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const ResumoCard = styled.div`
  padding: 16px;
  background: ${props => props.$status === 'pago' 
    ? props.theme.successLight 
    : props.$status === 'pendente' 
    ? props.theme.warningLight 
    : props.theme.errorLight};
  border-radius: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  
  @media (max-width: 768px) {
    padding: 14px;
    gap: 10px;
    flex-wrap: wrap;
  }
`

const ResumoInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
  
  @media (max-width: 768px) {
    min-width: 100%;
  }
`

const ResumoLabel = styled.div`
  font-size: 12px;
  font-weight: 600;
  color: ${props => props.$status === 'pago' 
    ? props.theme.success 
    : props.$status === 'pendente' 
    ? props.theme.warning 
    : props.theme.error};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  
  @media (max-width: 768px) {
    font-size: 11px;
  }
`

const ResumoValor = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: ${props => props.$status === 'pago' 
    ? props.theme.success 
    : props.$status === 'pendente' 
    ? props.theme.warning 
    : props.theme.error};
  
  @media (max-width: 768px) {
    font-size: 18px;
  }
`

const ResumoDetalhe = styled.div`
  font-size: 13px;
  color: ${props => props.theme.textSecondary};
  
  @media (max-width: 768px) {
    font-size: 12px;
  }
`

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  
  @media (max-width: 768px) {
    gap: 16px;
  }
`

const ModalInfo = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 16px;
  background: ${props => props.theme.bgSecondary};
  border-radius: 8px;
  gap: 12px;
  
  @media (max-width: 768px) {
    padding: 10px 14px;
    flex-direction: column;
    gap: 4px;
  }
`

const ModalLabel = styled.div`
  font-size: 14px;
  color: ${props => props.theme.textSecondary};
  
  @media (max-width: 768px) {
    font-size: 12px;
  }
`

const ModalValue = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: ${props => props.theme.text};
  
  @media (max-width: 768px) {
    font-size: 13px;
  }
`

const MobileCards = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    gap: 14px;
    padding: 16px;
  }
`

const MobileCard = styled.div`
  background: ${props => props.theme.cardBg};
  border: 1px solid ${props => props.theme.border};
  border-radius: 12px;
  box-shadow: ${props => props.theme.shadowSm};
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const MobileInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`

const MobileTitle = styled.div`
  font-weight: 700;
  color: ${props => props.theme.text};
`

const MobileDesc = styled.div`
  font-size: 13px;
  color: ${props => props.theme.textSecondary};
`

const MobileDetail = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  font-size: 13px;
  color: ${props => props.theme.text};
`

const MobileStatus = styled.div`
  margin-top: 4px;
`

const MobileActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 8px;
`

export default function ParentFinanceiro({ user, resumo = false }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedPagamento, setSelectedPagamento] = useState(null)

  // Dados fake para demonstração
  const pagamentos = [
    { 
      id: 1, 
      mes: 'Outubro', 
      ano: 2025, 
      valor: 150, 
      vencimento: '2025-10-15', 
      status: 'pendente',
      descricao: 'Mensalidade Turma B - Intermediário'
    },
    { 
      id: 2, 
      mes: 'Setembro', 
      ano: 2025, 
      valor: 150, 
      vencimento: '2025-09-15', 
      status: 'pago',
      dataPagamento: '2025-09-14',
      descricao: 'Mensalidade Turma B - Intermediário'
    },
    { 
      id: 3, 
      mes: 'Agosto', 
      ano: 2025, 
      valor: 150, 
      vencimento: '2025-08-15', 
      status: 'pago',
      dataPagamento: '2025-08-13',
      descricao: 'Mensalidade Turma B - Intermediário'
    },
  ]

  const totalPago = pagamentos.filter(p => p.status === 'pago').reduce((acc, p) => acc + p.valor, 0)
  const totalPendente = pagamentos.filter(p => p.status === 'pendente').reduce((acc, p) => acc + p.valor, 0)
  const proximoVencimento = pagamentos.find(p => p.status === 'pendente')

  const handleOpenModal = (pagamento) => {
    setSelectedPagamento(pagamento)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedPagamento(null)
  }

  const handlePagar = () => {
    alert(`Redirecionando para pagamento de R$ ${selectedPagamento.valor}...`)
    handleCloseModal()
  }

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
      month: 'long',
      year: 'numeric'
    })
  }

  // Modo resumo para dashboard
  if (resumo) {
    return (
      <ResumoContainer>
        {proximoVencimento && (
          <ResumoCard $status="pendente">
            <ResumoInfo>
              <ResumoLabel $status="pendente">Próximo Vencimento</ResumoLabel>
              <ResumoValor $status="pendente">{formatCurrency(proximoVencimento.valor)}</ResumoValor>
              <ResumoDetalhe>Vence em {formatDate(proximoVencimento.vencimento)}</ResumoDetalhe>
            </ResumoInfo>
            <ActionButton $variant="primary" onClick={() => handleOpenModal(proximoVencimento)}>
              Pagar
            </ActionButton>
          </ResumoCard>
        )}
        
        <ResumoCard $status="pago">
          <ResumoInfo>
            <ResumoLabel $status="pago">Total Pago</ResumoLabel>
            <ResumoValor $status="pago">{formatCurrency(totalPago)}</ResumoValor>
            <ResumoDetalhe>{pagamentos.filter(p => p.status === 'pago').length} pagamentos realizados</ResumoDetalhe>
          </ResumoInfo>
        </ResumoCard>
      </ResumoContainer>
    )
  }

  // Modo completo
  return (
    <Wrap>
      <Header>
        <Title>
          <FiDollarSign size={32} />
          Financeiro
        </Title>
      </Header>

      <StatusGrid>
        <StatusCard $gradient="linear-gradient(135deg, #10b981 0%, #34d399 100%)">
          <StatusIcon>
            <FiCheckCircle />
          </StatusIcon>
          <StatusLabel $light>Total Pago</StatusLabel>
          <StatusValue $light>{formatCurrency(totalPago)}</StatusValue>
        </StatusCard>

        <StatusCard $gradient="linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)">
          <StatusIcon>
            <FiClock />
          </StatusIcon>
          <StatusLabel $light>Pendente</StatusLabel>
          <StatusValue $light>{formatCurrency(totalPendente)}</StatusValue>
        </StatusCard>

        <StatusCard>
          <StatusIcon $bg={props => props.theme.primaryLight} $color={props => props.theme.primary}>
            <FiCalendar />
          </StatusIcon>
          <StatusLabel>Próximo Vencimento</StatusLabel>
          <StatusValue style={{ fontSize: '16px' }}>
            {proximoVencimento ? formatDate(proximoVencimento.vencimento) : 'Nenhum'}
          </StatusValue>
        </StatusCard>
      </StatusGrid>

            <Section>
        <SectionHeader>
          <SectionTitle>Histórico de Pagamentos</SectionTitle>
        </SectionHeader>

        {/* 💻 Tabela para Desktop */}
        <Table>
          <Thead>
            <Tr>
              <Th>Mês/Ano</Th>
              <Th>Descrição</Th>
              <Th>Vencimento</Th>
              <Th>Valor</Th>
              <Th>Status</Th>
              <Th>Ações</Th>
            </Tr>
          </Thead>
          <Tbody>
            {pagamentos.length === 0 ? (
              <Tr>
                <Td colSpan="6">
                  <EmptyState>Nenhum pagamento registrado</EmptyState>
                </Td>
              </Tr>
            ) : (
              pagamentos.map((pagamento) => (
                <Tr key={pagamento.id}>
                  <Td style={{ fontWeight: 600 }}>
                    {pagamento.mes}/{pagamento.ano}
                  </Td>
                  <Td>{pagamento.descricao}</Td>
                  <Td>{formatDate(pagamento.vencimento)}</Td>
                  <Td style={{ fontWeight: 600 }}>{formatCurrency(pagamento.valor)}</Td>
                  <Td>
                    <Badge $status={pagamento.status}>
                      {pagamento.status === 'pago' ? (
                        <>
                          <FiCheckCircle size={12} />
                          Pago
                        </>
                      ) : pagamento.status === 'pendente' ? (
                        <>
                          <FiClock size={12} />
                          Pendente
                        </>
                      ) : (
                        <>
                          <FiAlertCircle size={12} />
                          Atrasado
                        </>
                      )}
                    </Badge>
                  </Td>
                  <Td>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <ActionButton onClick={() => handleOpenModal(pagamento)}>
                        <FiEye size={14} />
                        Ver
                      </ActionButton>
                      {pagamento.status === 'pendente' && (
                        <ActionButton $variant="primary" onClick={() => handleOpenModal(pagamento)}>
                          <FiCreditCard size={14} />
                          Pagar
                        </ActionButton>
                      )}
                      {pagamento.status === 'pago' && (
                        <ActionButton>
                          <FiDownload size={14} />
                          Recibo
                        </ActionButton>
                      )}
                    </div>
                  </Td>
                </Tr>
              ))
            )}
          </Tbody>
        </Table>

        {/* 📱 Cards para Mobile */}
        <MobileCards>
          {pagamentos.map((pagamento) => (
            <MobileCard key={pagamento.id}>
              <MobileInfo>
                <MobileTitle>{pagamento.mes}/{pagamento.ano}</MobileTitle>
                <MobileDesc>{pagamento.descricao}</MobileDesc>
              </MobileInfo>

              <MobileDetail>
                <span><strong>Vencimento:</strong> {formatDate(pagamento.vencimento)}</span>
                <span><strong>Valor:</strong> {formatCurrency(pagamento.valor)}</span>
              </MobileDetail>

              <MobileStatus>
                <Badge $status={pagamento.status}>
                  {pagamento.status === 'pago' ? (
                    <>
                      <FiCheckCircle size={12} /> Pago
                    </>
                  ) : pagamento.status === 'pendente' ? (
                    <>
                      <FiClock size={12} /> Pendente
                    </>
                  ) : (
                    <>
                      <FiAlertCircle size={12} /> Atrasado
                    </>
                  )}
                </Badge>
              </MobileStatus>

              <MobileActions>
                <ActionButton onClick={() => handleOpenModal(pagamento)}>
                  <FiEye size={14} /> Ver
                </ActionButton>
                {pagamento.status === 'pendente' && (
                  <ActionButton $variant="primary" onClick={() => handleOpenModal(pagamento)}>
                    <FiCreditCard size={14} /> Pagar
                  </ActionButton>
                )}
                {pagamento.status === 'pago' && (
                  <ActionButton>
                    <FiDownload size={14} /> Recibo
                  </ActionButton>
                )}
              </MobileActions>
            </MobileCard>
          ))}
        </MobileCards>
      </Section>

      {selectedPagamento && (
        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          title={`Pagamento - ${selectedPagamento.mes}/${selectedPagamento.ano}`}
          footer={
            <>
              <ModalButton onClick={handleCloseModal}>
                Fechar
              </ModalButton>
              {selectedPagamento.status === 'pendente' && (
                <ModalButton $variant="primary" onClick={handlePagar}>
                  <FiCreditCard size={16} />
                  Pagar Agora
                </ModalButton>
              )}
              {selectedPagamento.status === 'pago' && (
                <ModalButton $variant="primary">
                  <FiDownload size={16} />
                  Baixar Recibo
                </ModalButton>
              )}
            </>
          }
        >
          <ModalContent>
            <ModalInfo>
              <ModalLabel>Descrição</ModalLabel>
              <ModalValue>{selectedPagamento.descricao}</ModalValue>
            </ModalInfo>
            
            <ModalInfo>
              <ModalLabel>Valor</ModalLabel>
              <ModalValue>{formatCurrency(selectedPagamento.valor)}</ModalValue>
            </ModalInfo>
            
            <ModalInfo>
              <ModalLabel>Vencimento</ModalLabel>
              <ModalValue>{formatDate(selectedPagamento.vencimento)}</ModalValue>
            </ModalInfo>
            
            {selectedPagamento.dataPagamento && (
              <ModalInfo>
                <ModalLabel>Data do Pagamento</ModalLabel>
                <ModalValue>{formatDate(selectedPagamento.dataPagamento)}</ModalValue>
              </ModalInfo>
            )}
            
            <ModalInfo>
              <ModalLabel>Status</ModalLabel>
              <ModalValue>
                <Badge $status={selectedPagamento.status}>
                  {selectedPagamento.status === 'pago' ? (
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
              </ModalValue>
            </ModalInfo>
          </ModalContent>
        </Modal>
      )}
    </Wrap>
  )
}
