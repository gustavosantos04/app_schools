import React, { createContext, useContext, useState, useEffect } from 'react'
import api from '../services/api'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('futsal_user')
    return savedUser ? JSON.parse(savedUser) : null
  })

  useEffect(() => {
    const token = localStorage.getItem('futsal_token')
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`
    }

    if (user) {
      localStorage.setItem('futsal_user', JSON.stringify(user))
    } else {
      localStorage.removeItem('futsal_user')
    }
  }, [user])

  // 🔐 Login usando a API real (FastAPI)
  async function login({ email, password }) {
    try {
      const { data } = await api.post('/login', { email, password })

      // salva token e usuário localmente
      localStorage.setItem('futsal_token', data.access_token)
      localStorage.setItem('futsal_user', JSON.stringify(data.user))

      api.defaults.headers.common['Authorization'] = `Bearer ${data.access_token}`

      setUser(data.user)
      return data.user
    } catch (err) {
      console.error('Erro no login:', err)
      throw new Error('Credenciais inválidas ou erro de conexão')
    }
  }

  // 🚪 Logout limpa tudo
  function logout() {
    localStorage.removeItem('futsal_token')
    localStorage.removeItem('futsal_user')
    delete api.defaults.headers.common['Authorization']
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
