import React, { useState, useMemo } from 'react'
import styled from 'styled-components'
import { FiEdit, FiPlus, FiUsers, FiSearch, FiUserPlus, FiTrash2, FiEye, FiAlertCircle, FiCheckCircle } from 'react-icons/fi'
import Toast from '../components/Toast'
import FloatingButton from '../components/FloatingButton'
import Modal, { ModalButton } from '../components/Modal'

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

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 24px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
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
  
  @media (max-width: 768px) {
    padding: 20px;
    
    &:hover {
      transform: none;
    }
  }
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
  margin-bottom: 16px;
  
  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
    font-size: 20px;
    margin-bottom: 12px;
  }
`

const StatLabel = styled.div`
  font-size: 14px;
  color: ${props => props.$light ? 'rgba(255, 255, 255, 0.8)' : props.theme.textSecondary};
  font-weight: 500;
  margin-bottom: 8px;
  
  @media (max-width: 768px) {
    font-size: 13px;
  }
`

const StatValue = styled.div`
  font-size: 32px;
  font-weight: 800;
  color: ${props => props.$light ? 'white' : props.theme.text};
  line-height: 1;
  
  @media (max-width: 768px) {
    font-size: 28px;
  }
`

const SearchContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 500px;
  
  @media (max-width: 768px) {
    max-width: 100%;
  }
`

const SearchIcon = styled.div`
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: ${props => props.theme.textSecondary};
  display: flex;
  align-items: center;
  pointer-events: none;
`

const SearchInput = styled.input`
  width: 100%;
  padding: 14px 18px 14px 48px;
  border-radius: 12px;
  border: 2px solid ${props => props.theme.border};
  background: ${props => props.theme.bgSecondary};
  color: ${props => props.theme.text};
  font-size: 15px;
  transition: all 0.2s ease;
  
  &:focus {
    border-color: ${props => props.theme.primary};
    outline: none;
    box-shadow: 0 0 0 4px ${props => props.theme.primaryLight};
  }
  
  &::placeholder {
    color: ${props => props.theme.textTertiary};
  }
  
  @media (max-width: 768px) {
    padding: 12px 16px 12px 44px;
    font-size: 14px;
  }
`

const TurmasGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`

const TurmaCard = styled.div`
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
  
  @media (max-width: 768px) {
    padding: 20px;
    
    &:hover {
      transform: none;
    }
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
  
  @media (max-width: 768px) {
    font-size: 18px;
  }
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
  white-space: nowrap;
  
  @media (max-width: 768px) {
    padding: 6px 12px;
    font-size: 12px;
  }
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
  
  @media (max-width: 768px) {
    font-size: 13px;
  }
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
  
  @media (max-width: 768px) {
    width: 28px;
    height: 28px;
  }
`

const InfoText = styled.div`
  flex: 1;
  color: ${props => props.theme.text};
  font-weight: 500;
`

const CardFooter = styled.div`
  display: flex;
  gap: 8px;
  padding-top: 16px;
  border-top: 1px solid ${props => props.theme.border};
  flex-wrap: wrap;
  
  @media (max-width: 768px) {
    padding-top: 12px;
    gap: 6px;
  }
`

const ActionButton = styled.button`
  flex: 1;
  min-width: 100px;
  padding: 10px 16px;
  border-radius: 10px;
  border: none;
  font-weight: 600;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  white-space: nowrap;
  
  ${props => props.$variant === 'primary' ? `
    background: ${props.theme.gradientPrimary};
    color: white;
    box-shadow: 0 4px 12px ${props.theme.primary}40;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 16px ${props.theme.primary}60;
    }
  ` : props.$variant === 'secondary' ? `
    background: ${props.theme.secondary};
    color: white;
    
    &:hover {
      background: ${props.theme.secondaryHover};
      transform: translateY(-2px);
    }
  ` : props.$variant === 'danger' ? `
    background: ${props.theme.error};
    color: white;
    
    &:hover {
      background: ${props.theme.error}dd;
      transform: translateY(-2px);
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
    padding: 8px 12px;
    font-size: 12px;
    min-width: 80px;
    
    svg {
      width: 14px;
      height: 14px;
    }
    
    &:hover {
      transform: none;
    }
  }
`

const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  background: ${props => props.theme.cardBg};
  border-radius: 16px;
  border: 2px dashed ${props => props.theme.border};
  
  @media (max-width: 768px) {
    padding: 40px 20px;
  }
`

const EmptyIcon = styled.div`
  font-size: 64px;
  color: ${props => props.theme.textTertiary};
  margin-bottom: 16px;
  
  @media (max-width: 768px) {
    font-size: 48px;
  }
`

const EmptyTitle = styled.h3`
  margin: 0 0 8px 0;
  font-size: 20px;
  font-weight: 600;
  color: ${props => props.theme.text};
  
  @media (max-width: 768px) {
    font-size: 18px;
  }
`

const EmptyText = styled.p`
  margin: 0;
  font-size: 14px;
  color: ${props => props.theme.textSecondary};
`

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  
  @media (max-width: 768px) {
    gap: 16px;
  }
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
  
  @media (max-width: 768px) {
    font-size: 15px;
  }
`

export default function TeacherTurmas({ turmas = [], onAction }) {
  const [search, setSearch] = useState('')
  const [toastMsg, setToastMsg] = useState(null)
  const [toastType, setToastType] = useState('info')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedTurma, setSelectedTurma] = useState(null)
  const [modalAction, setModalAction] = useState('')

  // Filtro de turmas
  const filteredTurmas = useMemo(() => {
    if (!turmas || turmas.length === 0) return []
    return turmas.filter(t => t.Nome.toLowerCase().includes(search.toLowerCase()))
  }, [search, turmas])

  // Resumo
  const totalTurmas = turmas?.length || 0
  const totalVagas = turmas?.reduce((acc, t) => acc + t.Vagas, 0) || 0
  const totalAlunos = turmas?.reduce((acc, t) => acc + t.Alunos, 0) || 0

  const handleOpenModal = (turma, action) => {
    setSelectedTurma(turma)
    setModalAction(action)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedTurma(null)
    setModalAction('')
  }

  const handleConfirmAction = () => {
    if (modalAction === 'edit') {
      setToastMsg(`Turma "${selectedTurma.Nome}" editada com sucesso!`)
      setToastType('success')
    } else if (modalAction === 'delete') {
      setToastMsg(`Turma "${selectedTurma.Nome}" excluída com sucesso!`)
      setToastType('success')
    } else if (modalAction === 'vagas') {
      setToastMsg(`Vagas abertas na turma "${selectedTurma.Nome}"!`)
      setToastType('success')
    }
    handleCloseModal()
  }

  const getModalTitle = () => {
    if (modalAction === 'edit') return `Editar ${selectedTurma?.Nome}`
    if (modalAction === 'delete') return `Excluir ${selectedTurma?.Nome}`
    if (modalAction === 'vagas') return `Abrir Vagas - ${selectedTurma?.Nome}`
    if (modalAction === 'view') return selectedTurma?.Nome
    return ''
  }

  return (
    <Wrap>
      <Header>
        <Title>
          <FiUsers size={32} />
          Gerenciar Turmas
        </Title>
      </Header>

      <StatsGrid>
        <StatCard $gradient="linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%)">
          <StatIcon>
            <FiUsers />
          </StatIcon>
          <StatLabel $light>Total de Turmas</StatLabel>
          <StatValue $light>{totalTurmas}</StatValue>
        </StatCard>

        <StatCard $gradient="linear-gradient(135deg, #10b981 0%, #34d399 100%)">
          <StatIcon>
            <FiUserPlus />
          </StatIcon>
          <StatLabel $light>Vagas Abertas</StatLabel>
          <StatValue $light>{totalVagas}</StatValue>
        </StatCard>

        <StatCard $gradient="linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)">
          <StatIcon>
            <FiUsers />
          </StatIcon>
          <StatLabel $light>Total de Alunos</StatLabel>
          <StatValue $light>{totalAlunos}</StatValue>
        </StatCard>
      </StatsGrid>

      <SearchContainer>
        <SearchIcon>
          <FiSearch size={20} />
        </SearchIcon>
        <SearchInput
          placeholder="Buscar turma por nome..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </SearchContainer>

      {filteredTurmas.length === 0 ? (
        <EmptyState>
          <EmptyIcon>
            <FiUsers />
          </EmptyIcon>
          <EmptyTitle>
            {search ? 'Nenhuma turma encontrada' : 'Nenhuma turma cadastrada'}
          </EmptyTitle>
          <EmptyText>
            {search 
              ? 'Tente buscar com outros termos' 
              : 'Clique no botão + para criar sua primeira turma'}
          </EmptyText>
        </EmptyState>
      ) : (
        <TurmasGrid>
          {filteredTurmas.map((turma, index) => (
            <TurmaCard key={`${turma.Nome}-${index}`}>
              <CardHeader>
                <TurmaInfo>
                  <TurmaNome>{turma.Nome}</TurmaNome>
                </TurmaInfo>
                <VagasBadge $disponivel={turma.Vagas > 0}>
                  {turma.Vagas > 0 ? (
                    <>
                      <FiCheckCircle size={16} />
                      {turma.Vagas} {turma.Vagas === 1 ? 'vaga' : 'vagas'}
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
                  <InfoIcon>
                    <FiUsers size={16} />
                  </InfoIcon>
                  <InfoText>
                    <strong>{turma.Alunos}</strong> alunos matriculados
                  </InfoText>
                </InfoRow>

                <InfoRow>
                  <InfoIcon>
                    <FiUserPlus size={16} />
                  </InfoIcon>
                  <InfoText>
                    Capacidade: <strong>{turma.Alunos + turma.Vagas}</strong> alunos
                  </InfoText>
                </InfoRow>
              </CardBody>

              <CardFooter>
                <ActionButton onClick={() => handleOpenModal(turma, 'view')}>
                  <FiEye size={16} />
                  Ver
                </ActionButton>
                <ActionButton 
                  $variant="secondary" 
                  onClick={() => handleOpenModal(turma, 'edit')}
                >
                  <FiEdit size={16} />
                  Editar
                </ActionButton>
                {turma.Vagas === 0 && (
                  <ActionButton 
                    $variant="primary" 
                    onClick={() => handleOpenModal(turma, 'vagas')}
                  >
                    <FiUserPlus size={16} />
                    Abrir Vagas
                  </ActionButton>
                )}
              </CardFooter>
            </TurmaCard>
          ))}
        </TurmasGrid>
      )}

      {selectedTurma && (
        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          title={getModalTitle()}
          footer={
            <>
              <ModalButton onClick={handleCloseModal}>
                Fechar
              </ModalButton>
              {modalAction !== 'view' && (
                <ModalButton $variant="primary" onClick={handleConfirmAction}>
                  {modalAction === 'delete' ? 'Confirmar Exclusão' : 'Confirmar'}
                </ModalButton>
              )}
            </>
          }
        >
          <ModalContent>
            {modalAction === 'view' && (
              <ModalSection>
                <ModalSectionTitle>Informações da Turma</ModalSectionTitle>
                <InfoRow>
                  <InfoIcon><FiUsers /></InfoIcon>
                  <InfoText><strong>Alunos:</strong> {selectedTurma.Alunos}</InfoText>
                </InfoRow>
                <InfoRow>
                  <InfoIcon><FiUserPlus /></InfoIcon>
                  <InfoText><strong>Vagas:</strong> {selectedTurma.Vagas}</InfoText>
                </InfoRow>
                <InfoRow>
                  <InfoIcon><FiUsers /></InfoIcon>
                  <InfoText><strong>Capacidade Total:</strong> {selectedTurma.Alunos + selectedTurma.Vagas}</InfoText>
                </InfoRow>
              </ModalSection>
            )}

            {modalAction === 'edit' && (
              <ModalSection>
                <ModalSectionTitle>Editar Turma</ModalSectionTitle>
                <p>Funcionalidade de edição será implementada com o backend.</p>
              </ModalSection>
            )}

            {modalAction === 'delete' && (
              <ModalSection>
                <p style={{ color: '#ef4444', fontWeight: 600 }}>
                  ⚠️ Tem certeza que deseja excluir a turma "{selectedTurma.Nome}"?
                </p>
                <p>Esta ação não pode ser desfeita.</p>
              </ModalSection>
            )}

            {modalAction === 'vagas' && (
              <ModalSection>
                <ModalSectionTitle>Abrir Novas Vagas</ModalSectionTitle>
                <p>Quantas vagas deseja abrir para a turma "{selectedTurma.Nome}"?</p>
                <p style={{ fontSize: '14px', color: '#888' }}>
                  Funcionalidade completa será implementada com o backend.
                </p>
              </ModalSection>
            )}
          </ModalContent>
        </Modal>
      )}

      {toastMsg && (
        <Toast 
          message={toastMsg} 
          type={toastType}
          onClose={() => setToastMsg(null)} 
        />
      )}

      <FloatingButton 
        onClick={() => {
          setToastMsg('Adicionar nova turma')
          setToastType('info')
        }}
        icon={<FiPlus />}
      />
    </Wrap>
  )
}
