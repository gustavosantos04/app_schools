import React, { useState } from 'react'
import styled from 'styled-components'
import Modal, { ModalButton } from '../components/Modal'
import { FiBookOpen, FiUsers, FiClock, FiMapPin, FiDollarSign, FiCalendar, FiCheckCircle, FiAlertCircle } from 'react-icons/fi'

const Wrap = styled.div`
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  
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

const Stats = styled.div`
  display: flex;
  gap: 24px;
  align-items: center;
`

const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
`

const StatValue = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: ${props => props.theme.primary};
`

const StatLabel = styled.div`
  font-size: 12px;
  color: ${props => props.theme.textSecondary};
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`

const VagasGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;
`

const VagaCard = styled.div`
  background: ${props => props.theme.cardBg};
  border-radius: 16px;
  padding: 24px;
  border: 1px solid ${props => props.theme.border};
  box-shadow: ${props => props.theme.shadowMd};
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  gap: 16px;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: ${props => props.theme.gradientPrimary};
  }
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: ${props => props.theme.shadowLg};
    border-color: ${props => props.theme.primary};
  }
`

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
`

const TurmaInfo = styled.div`
  flex: 1;
`

const TurmaNome = styled.h3`
  margin: 0 0 8px 0;
  font-size: 20px;
  font-weight: 700;
  color: ${props => props.theme.text};
`

const TurmaNivel = styled.div`
  display: inline-block;
  padding: 4px 12px;
  background: ${props => props.theme.primaryLight};
  color: ${props => props.theme.primary};
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
`

const VagasBadge = styled.div`
  padding: 8px 16px;
  background: ${props => props.$disponivel 
    ? props.theme.gradientSuccess 
    : props.theme.gradientDark};
  color: white;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 6px;
  box-shadow: ${props => props.theme.shadowMd};
`

const CardBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`

const InfoRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  color: ${props => props.theme.textSecondary};
`

const InfoIcon = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: ${props => props.theme.bgTertiary};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.primary};
  flex-shrink: 0;
`

const InfoText = styled.div`
  flex: 1;
  color: ${props => props.theme.text};
`

const CardFooter = styled.div`
  display: flex;
  gap: 12px;
  padding-top: 16px;
  border-top: 1px solid ${props => props.theme.border};
`

const Button = styled.button`
  flex: 1;
  padding: 12px 20px;
  border-radius: 10px;
  border: none;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  
  ${props => props.$variant === 'primary' ? `
    background: ${props.theme.gradientPrimary};
    color: white;
    box-shadow: 0 4px 12px ${props.theme.primary}40;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 16px ${props.theme.primary}60;
    }
  ` : `
    background: ${props.theme.bgTertiary};
    color: ${props.theme.text};
    border: 1px solid ${props.theme.border};
    
    &:hover {
      background: ${props.theme.border};
    }
  `}
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`

const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  background: ${props => props.theme.cardBg};
  border-radius: 16px;
  border: 2px dashed ${props => props.theme.border};
`

const EmptyIcon = styled.div`
  font-size: 64px;
  color: ${props => props.theme.textTertiary};
  margin-bottom: 16px;
`

const EmptyTitle = styled.h3`
  margin: 0 0 8px 0;
  font-size: 20px;
  font-weight: 600;
  color: ${props => props.theme.text};
`

const EmptyText = styled.p`
  margin: 0;
  font-size: 14px;
  color: ${props => props.theme.textSecondary};
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${props => props.theme.bgTertiary};
    transform: translateX(4px);
  }
`

const ResumoInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`

const ResumoNome = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: ${props => props.theme.text};
`

const ResumoDetalhe = styled.div`
  font-size: 12px;
  color: ${props => props.theme.textSecondary};
`

const ResumoVagas = styled.div`
  padding: 4px 12px;
  background: ${props => props.$disponivel ? props.theme.successLight : props.theme.errorLight};
  color: ${props => props.$disponivel ? props.theme.success : props.theme.error};
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
`

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const ModalSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`

const ModalSectionTitle = styled.h4`
  margin: 0;
  font-size: 16px;
  font-weight: 700;
  color: ${props => props.theme.text};
`

export default function ParentVagas({ user, resumo = false }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedVaga, setSelectedVaga] = useState(null)

  // Dados fake para demonstração
  const vagas = [
    {
      id: 1,
      nome: 'Turma A - Iniciante',
      nivel: 'Iniciante',
      vagas: 5,
      alunos: 12,
      horario: 'Segunda e Quarta, 18h - 19h',
      local: 'Quadra Principal',
      valor: 150,
      professor: 'Prof. João Silva',
      descricao: 'Turma para iniciantes com foco em fundamentos básicos do futsal.'
    },
    {
      id: 2,
      nome: 'Turma B - Intermediário',
      nivel: 'Intermediário',
      vagas: 3,
      alunos: 15,
      horario: 'Terça e Quinta, 19h - 20h',
      local: 'Quadra Principal',
      valor: 180,
      professor: 'Prof. Maria Santos',
      descricao: 'Turma intermediária com treinos técnicos e táticos.'
    },
    {
      id: 3,
      nome: 'Turma C - Avançado',
      nivel: 'Avançado',
      vagas: 0,
      alunos: 20,
      horario: 'Quarta e Sexta, 20h - 21h30',
      local: 'Quadra Coberta',
      valor: 200,
      professor: 'Prof. Carlos Oliveira',
      descricao: 'Turma avançada com preparação para competições.'
    },
  ]

  const totalVagas = vagas.reduce((acc, v) => acc + v.vagas, 0)
  const turmasComVagas = vagas.filter(v => v.vagas > 0).length

  const handleOpenModal = (vaga) => {
    setSelectedVaga(vaga)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedVaga(null)
  }

  const handleInscrever = () => {
    alert(`Inscrição realizada com sucesso na ${selectedVaga.nome}!`)
    handleCloseModal()
  }

  // Modo resumo para dashboard
  if (resumo) {
    const vagasDisponiveis = vagas.filter(v => v.vagas > 0).slice(0, 3)
    
    if (vagasDisponiveis.length === 0) {
      return (
        <EmptyState style={{ padding: '40px 20px' }}>
          <EmptyIcon style={{ fontSize: '48px' }}><FiBookOpen /></EmptyIcon>
          <div>Nenhuma vaga disponível no momento</div>
        </EmptyState>
      )
    }
    
    return (
      <ResumoList>
        {vagasDisponiveis.map((vaga) => (
          <ResumoItem key={vaga.id}>
            <ResumoInfo>
              <ResumoNome>{vaga.nome}</ResumoNome>
              <ResumoDetalhe>{vaga.horario}</ResumoDetalhe>
            </ResumoInfo>
            <ResumoVagas $disponivel={vaga.vagas > 0}>
              {vaga.vagas} {vaga.vagas === 1 ? 'vaga' : 'vagas'}
            </ResumoVagas>
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
          <FiBookOpen size={32} />
          Vagas Disponíveis
        </Title>
        <Stats>
          <StatItem>
            <StatValue>{totalVagas}</StatValue>
            <StatLabel>Vagas Abertas</StatLabel>
          </StatItem>
          <StatItem>
            <StatValue>{turmasComVagas}</StatValue>
            <StatLabel>Turmas</StatLabel>
          </StatItem>
        </Stats>
      </Header>

      {vagas.length === 0 ? (
        <EmptyState>
          <EmptyIcon><FiBookOpen /></EmptyIcon>
          <EmptyTitle>Nenhuma turma disponível</EmptyTitle>
          <EmptyText>Novas turmas serão abertas em breve</EmptyText>
        </EmptyState>
      ) : (
        <VagasGrid>
          {vagas.map((vaga) => (
            <VagaCard key={vaga.id}>
              <CardHeader>
                <TurmaInfo>
                  <TurmaNome>{vaga.nome}</TurmaNome>
                  <TurmaNivel>{vaga.nivel}</TurmaNivel>
                </TurmaInfo>
                <VagasBadge $disponivel={vaga.vagas > 0}>
                  {vaga.vagas > 0 ? (
                    <>
                      <FiCheckCircle size={16} />
                      {vaga.vagas} {vaga.vagas === 1 ? 'vaga' : 'vagas'}
                    </>
                  ) : (
                    <>
                      <FiAlertCircle size={16} />
                      Cheia
                    </>
                  )}
                </VagasBadge>
              </CardHeader>

              <CardBody>
                <InfoRow>
                  <InfoIcon><FiUsers /></InfoIcon>
                  <InfoText>{vaga.alunos} alunos matriculados</InfoText>
                </InfoRow>
                
                <InfoRow>
                  <InfoIcon><FiClock /></InfoIcon>
                  <InfoText>{vaga.horario}</InfoText>
                </InfoRow>
                
                <InfoRow>
                  <InfoIcon><FiMapPin /></InfoIcon>
                  <InfoText>{vaga.local}</InfoText>
                </InfoRow>
                
                <InfoRow>
                  <InfoIcon><FiDollarSign /></InfoIcon>
                  <InfoText>R$ {vaga.valor}/mês</InfoText>
                </InfoRow>
              </CardBody>

              <CardFooter>
                <Button onClick={() => handleOpenModal(vaga)}>
                  Ver Detalhes
                </Button>
                <Button 
                  $variant="primary" 
                  disabled={vaga.vagas === 0}
                  onClick={() => handleOpenModal(vaga)}
                >
                  {vaga.vagas > 0 ? 'Inscrever' : 'Sem Vagas'}
                </Button>
              </CardFooter>
            </VagaCard>
          ))}
        </VagasGrid>
      )}

      {selectedVaga && (
        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          title={selectedVaga.nome}
          footer={
            <>
              <ModalButton onClick={handleCloseModal}>
                Fechar
              </ModalButton>
              {selectedVaga.vagas > 0 && (
                <ModalButton $variant="primary" onClick={handleInscrever}>
                  <FiCheckCircle size={16} />
                  Confirmar Inscrição
                </ModalButton>
              )}
            </>
          }
        >
          <ModalContent>
            <ModalSection>
              <ModalSectionTitle>Sobre a Turma</ModalSectionTitle>
              <p style={{ margin: 0, lineHeight: 1.6 }}>{selectedVaga.descricao}</p>
            </ModalSection>

            <ModalSection>
              <ModalSectionTitle>Informações</ModalSectionTitle>
              <InfoRow>
                <InfoIcon><FiUsers /></InfoIcon>
                <InfoText>
                  <strong>Alunos:</strong> {selectedVaga.alunos} matriculados
                </InfoText>
              </InfoRow>
              <InfoRow>
                <InfoIcon><FiClock /></InfoIcon>
                <InfoText>
                  <strong>Horário:</strong> {selectedVaga.horario}
                </InfoText>
              </InfoRow>
              <InfoRow>
                <InfoIcon><FiMapPin /></InfoIcon>
                <InfoText>
                  <strong>Local:</strong> {selectedVaga.local}
                </InfoText>
              </InfoRow>
              <InfoRow>
                <InfoIcon><FiCalendar /></InfoIcon>
                <InfoText>
                  <strong>Professor:</strong> {selectedVaga.professor}
                </InfoText>
              </InfoRow>
              <InfoRow>
                <InfoIcon><FiDollarSign /></InfoIcon>
                <InfoText>
                  <strong>Mensalidade:</strong> R$ {selectedVaga.valor}
                </InfoText>
              </InfoRow>
            </ModalSection>

            {selectedVaga.vagas === 0 && (
              <div style={{ 
                padding: '12px 16px', 
                background: '#fee2e2', 
                color: '#ef4444', 
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: 600
              }}>
                ⚠️ Esta turma está cheia no momento. Entre em contato para entrar na lista de espera.
              </div>
            )}
          </ModalContent>
        </Modal>
      )}
    </Wrap>
  )
}
