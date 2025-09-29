import React, { useState } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

const Wrap = styled.div`
  min-height: 100vh;
  display:flex; align-items:center; justify-content:center;
  padding: 24px;
  background: linear-gradient(180deg,#0b1220 0%, #0f172a 100%);
  color: #fff;
`
const Card = styled.div`
  width:100%; max-width:420px; background: #071027; padding: 20px; border-radius:12px;
  box-shadow: 0 6px 20px rgba(0,0,0,0.4);
`
const Input = styled.input`
  width:100%; padding:12px; margin-top:8px; border-radius:8px; border: none;
`

export default function Login(){
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [role,setRole]=useState('parent') // parent | teacher
  const auth = useAuth()
  const nav = useNavigate()

  async function handleSubmit(e){
  e.preventDefault()
  try{
    const loggedUser = await auth.login({ email, password, role }) // 👈 pega o retorno
    if (loggedUser.role === 'teacher') nav('/teacher')
    else nav('/parent')
  }catch(err){
    console.error(err)
    alert('Erro ao logar — ver console')
  }
}

  return (
    <Wrap>
      <Card>
        <h2>Entrar</h2>
        <form onSubmit={handleSubmit}>
          <label>Email</label>
          <Input value={email} onChange={e=>setEmail(e.target.value)} />
          <label>Senha</label>
          <Input type="password" value={password} onChange={e=>setPassword(e.target.value)} />
          <label>Sou:</label>
          <select value={role} onChange={e=>setRole(e.target.value)} style={{width:'100%', padding:10, marginTop:8, borderRadius:8}}>
            <option value="parent">Pai/Aluno</option>
            <option value="teacher">Professor</option>
          </select>
          <button style={{width:'100%', padding:12, marginTop:12, borderRadius:8}}>Entrar</button>
        </form>
        <p style={{marginTop:12}}>Não tem conta? <a href="/register">Cadastre-se</a></p>
      </Card>
    </Wrap>
  )
}
