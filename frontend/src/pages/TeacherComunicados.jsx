import React, { useState } from 'react'
import styled from 'styled-components'
import FloatingButton from '../components/FloatingButton'
import Modal, { ModalButton } from '../components/Modal'
import { FiMessageSquare, FiEdit2, FiTrash2, FiCalendar, FiPlus, FiSend } from 'react-icons/fi'

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

const ComunicadosList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const ComunicadoCard = styled.div`
  background: ${props => props.theme.cardBg};
  border-radius: 16px;
  padding: 24px;
  border: 1px solid ${props => props.theme.border};
  box-shadow: ${props => props.theme.shadowMd};
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 4px;
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
  margin-bottom: 16px;
  gap: 16px;
`

const CardContent = styled.div`
  flex: 1;
`

const CardTitle = styled.h3`
  margin: 0 0 8px 0;
  font-size: 18px;
  font-weight: 600;
  color: ${props => props.theme.text};
`

const CardDate = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  color: ${props => props.theme.textSecondary};
  margin-bottom: 12px;
`

const CardDescription = styled.p`
  margin: 0;
  font-size: 14px;
  color: ${props => props.theme.textSecondary};
  line-height: 1.6;
`

const CardActions = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 16px;
`

const ActionButton = styled.button`
  padding: 8px 16px;
  border-radius: 8px;
  border: none;
  font-weight: 600;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 6px;
  
  ${props => props.$variant === 'edit' ? `
    background: ${props.theme.secondary};
    color: white;
    
    &:hover {
      background: ${props.theme.secondaryHover};
      transform: translateY(-2px);
    }
  ` : props.$variant === 'delete' ? `
    background: ${props.theme.error};
    color: white;
    
    &:hover {
      background: ${props.theme.error}dd;
      transform: translateY(-2px);
    }
  ` : `
    background: ${props.theme.bgTertiary};
    color: ${props.theme.text};
    
    &:hover {
      background: ${props.theme.border};
    }
  `}
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

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 20px;
`

const Label = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: ${props => props.theme.text};
`

const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  border-radius: 10px;
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
`

const TextArea = styled.textarea`
  width: 100%;
  padding: 12px 16px;
  border-radius: 10px;
  border: 2px solid ${props => props.theme.border};
  background: ${props => props.theme.bgSecondary};
  color: ${props => props.theme.text};
  font-size: 15px;
  font-family: inherit;
  resize: vertical;
  min-height: 120px;
  transition: all 0.2s ease;
  
  &:focus {
    border-color: ${props => props.theme.primary};
    outline: none;
    box-shadow: 0 0 0 4px ${props => props.theme.primaryLight};
  }
`

export default function TeacherComunicados({ comunicados = [], onAction }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingComunicado, setEditingComunicado] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: new Date().toISOString().split('T')[0]
  })

  const handleOpenModal = (comunicado = null) => {
    if (comunicado) {
      setEditingComunicado(comunicado)
      setFormData({
        title: comunicado.title,
        description: comunicado.description || '',
        date: comunicado.date
      })
    } else {
      setEditingComunicado(null)
      setFormData({
        title: '',
        description: '',
        date: new Date().toISOString().split('T')[0]
      })
    }
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditingComunicado(null)
  }

  const handleSubmit = () => {
    const action = editingComunicado 
      ? `Comunicado "${formData.title}" editado com sucesso!`
      : `Comunicado "${formData.title}" criado com sucesso!`
    onAction(action, 'success')
    handleCloseModal()
  }

  const handleDelete = (comunicado) => {
    if (window.confirm(`Deseja realmente excluir o comunicado "${comunicado.title}"?`)) {
      onAction(`Comunicado "${comunicado.title}" excluído`, 'success')
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString + 'T00:00:00')
    return date.toLocaleDateString('pt-BR', { 
      day: '2-digit', 
      month: 'long', 
      year: 'numeric' 
    })
  }

  return (
    <Wrap>
      <Header>
        <Title>
          <FiMessageSquare size={32} />
          Comunicados
        </Title>
        <Stats>
          <StatItem>
            <StatValue>{comunicados.length}</StatValue>
            <StatLabel>Total</StatLabel>
          </StatItem>
        </Stats>
      </Header>

      {comunicados.length === 0 ? (
        <EmptyState>
          <EmptyIcon>
            <FiMessageSquare />
          </EmptyIcon>
          <EmptyTitle>Nenhum comunicado ainda</EmptyTitle>
          <EmptyText>Clique no botão + para criar seu primeiro comunicado</EmptyText>
        </EmptyState>
      ) : (
        <ComunicadosList>
          {comunicados.map((comunicado, index) => (
            <ComunicadoCard key={index}>
              <CardHeader>
                <CardContent>
                  <CardTitle>{comunicado.title}</CardTitle>
                  <CardDate>
                    <FiCalendar size={16} />
                    {formatDate(comunicado.date)}
                  </CardDate>
                  {comunicado.description && (
                    <CardDescription>{comunicado.description}</CardDescription>
                  )}
                </CardContent>
              </CardHeader>
              <CardActions>
                <ActionButton 
                  $variant="edit"
                  onClick={() => handleOpenModal(comunicado)}
                >
                  <FiEdit2 size={14} />
                  Editar
                </ActionButton>
                <ActionButton 
                  $variant="delete"
                  onClick={() => handleDelete(comunicado)}
                >
                  <FiTrash2 size={14} />
                  Excluir
                </ActionButton>
              </CardActions>
            </ComunicadoCard>
          ))}
        </ComunicadosList>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingComunicado ? 'Editar Comunicado' : 'Novo Comunicado'}
        footer={
          <>
            <ModalButton onClick={handleCloseModal}>
              Cancelar
            </ModalButton>
            <ModalButton $variant="primary" onClick={handleSubmit}>
              <FiSend size={16} />
              {editingComunicado ? 'Salvar' : 'Publicar'}
            </ModalButton>
          </>
        }
      >
        <FormGroup>
          <Label>Título do Comunicado</Label>
          <Input
            type="text"
            placeholder="Ex: Treino extra na quarta-feira"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
        </FormGroup>

        <FormGroup>
          <Label>Descrição (opcional)</Label>
          <TextArea
            placeholder="Adicione mais detalhes sobre o comunicado..."
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
        </FormGroup>

        <FormGroup>
          <Label>Data</Label>
          <Input
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          />
        </FormGroup>
      </Modal>

      <FloatingButton 
        onClick={() => handleOpenModal()}
        icon={<FiPlus />}
      />
    </Wrap>
  )
}
