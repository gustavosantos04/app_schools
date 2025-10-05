import React, { useState } from 'react'
import styled from 'styled-components'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { FiMail, FiLock, FiUser, FiArrowRight } from 'react-icons/fi'
import { IoFootball } from 'react-icons/io5'

const Wrap = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: ${props => props.theme.gradientDark};
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -20%;
    width: 800px;
    height: 800px;
    background: ${props => props.theme.gradientPrimary};
    border-radius: 50%;
    opacity: 0.1;
    filter: blur(100px);
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: -50%;
    left: -20%;
    width: 600px;
    height: 600px;
    background: ${props => props.theme.gradientSecondary};
    border-radius: 50%;
    opacity: 0.1;
    filter: blur(100px);
  }
`

const Container = styled.div`
  display: flex;
  max-width: 1000px;
  width: 100%;
  background: ${props => props.theme.cardBg};
  border-radius: 24px;
  overflow: hidden;
  box-shadow: ${props => props.theme.shadowXl};
  position: relative;
  z-index: 1;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`

const LeftPanel = styled.div`
  flex: 1;
  padding: 48px;
  background: ${props => props.theme.gradientPrimary};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: -50px;
    right: -50px;
    width: 200px;
    height: 200px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
  }
  
  @media (max-width: 768px) {
    padding: 32px;
  }
`

const Logo = styled.div`
  font-size: 48px;
  margin-bottom: 24px;
  animation: bounce 2s ease-in-out infinite;
  
  @keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }
`

const Title = styled.h1`
  font-size: 32px;
  font-weight: 800;
  margin-bottom: 16px;
  text-align: center;
`

const Subtitle = styled.p`
  font-size: 16px;
  text-align: center;
  opacity: 0.9;
  line-height: 1.6;
`

const RightPanel = styled.div`
  flex: 1;
  padding: 48px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  
  @media (max-width: 768px) {
    padding: 32px;
  }
`

const FormTitle = styled.h2`
  font-size: 28px;
  font-weight: 700;
  color: ${props => props.theme.text};
  margin-bottom: 8px;
`

const FormSubtitle = styled.p`
  font-size: 14px;
  color: ${props => props.theme.textSecondary};
  margin-bottom: 32px;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const Label = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: ${props => props.theme.text};
`

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`

const InputIcon = styled.div`
  position: absolute;
  left: 16px;
  color: ${props => props.theme.textTertiary};
  display: flex;
  align-items: center;
  pointer-events: none;
`

const Input = styled.input`
  width: 100%;
  padding: 14px 16px 14px 48px;
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
`

const Select = styled.select`
  width: 100%;
  padding: 14px 16px 14px 48px;
  border-radius: 12px;
  border: 2px solid ${props => props.theme.border};
  background: ${props => props.theme.bgSecondary};
  color: ${props => props.theme.text};
  font-size: 15px;
  transition: all 0.2s ease;
  cursor: pointer;
  
  &:focus {
    border-color: ${props => props.theme.primary};
    outline: none;
    box-shadow: 0 0 0 4px ${props => props.theme.primaryLight};
  }
`

const Button = styled.button`
  width: 100%;
  padding: 16px;
  border-radius: 12px;
  border: none;
  background: ${props => props.theme.gradientPrimary};
  color: white;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 8px;
  box-shadow: 0 4px 12px ${props => props.theme.primary}40;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px ${props => props.theme.primary}60;
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`

const Footer = styled.div`
  margin-top: 24px;
  text-align: center;
  font-size: 14px;
  color: ${props => props.theme.textSecondary};
  
  a {
    color: ${props => props.theme.primary};
    font-weight: 600;
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
`

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('parent')
  const [loading, setLoading] = useState(false)
  const auth = useAuth()
  const nav = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    
    try {
      const loggedUser = await auth.login({ email, password, role })
      if (loggedUser.role === 'teacher') nav('/teacher')
      else nav('/parent')
    } catch (err) {
      console.error(err)
      alert('Erro ao fazer login. Verifique suas credenciais.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Wrap>
      <Container>
        <LeftPanel>
          <Logo><IoFootball size={80} /></Logo>
          <Title>SportsEdu</Title>
          <Subtitle>
            Gerencie suas escolinhas de esportes de forma simples e eficiente.
            Conecte professores, alunos e responsáveis em um só lugar.
          </Subtitle>
        </LeftPanel>
        
        <RightPanel>
          <FormTitle>Bem-vindo de volta!</FormTitle>
          <FormSubtitle>Entre com suas credenciais para continuar</FormSubtitle>
          
          <Form onSubmit={handleSubmit}>
            <InputGroup>
              <Label>Email</Label>
              <InputWrapper>
                <InputIcon><FiMail size={18} /></InputIcon>
                <Input
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
              </InputWrapper>
            </InputGroup>
            
            <InputGroup>
              <Label>Senha</Label>
              <InputWrapper>
                <InputIcon><FiLock size={18} /></InputIcon>
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                />
              </InputWrapper>
            </InputGroup>
            
            <InputGroup>
              <Label>Entrar como</Label>
              <InputWrapper>
                <InputIcon><FiUser size={18} /></InputIcon>
                <Select value={role} onChange={e => setRole(e.target.value)}>
                  <option value="parent">Pai/Responsável ou Aluno</option>
                  <option value="teacher">Professor</option>
                </Select>
              </InputWrapper>
            </InputGroup>
            
            <Button type="submit" disabled={loading}>
              {loading ? 'Entrando...' : 'Entrar'}
              {!loading && <FiArrowRight size={18} />}
            </Button>
          </Form>
          
          <Footer>
            Não tem uma conta? <Link to="/register">Cadastre-se</Link>
          </Footer>
        </RightPanel>
      </Container>
    </Wrap>
  )
}
