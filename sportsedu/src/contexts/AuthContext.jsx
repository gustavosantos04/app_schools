import React, { createContext, useContext, useState, useEffect } from 'react'
import api from '../services/api'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const s = localStorage.getItem('futsal_user'); return s ? JSON.parse(s) : null
  })

  useEffect(() => {
    if (user) localStorage.setItem('futsal_user', JSON.stringify(user))
    else localStorage.removeItem('futsal_user')
  }, [user])

  async function login({ email, password }) {
    // chamar backend real em breve; aqui exemplo com api
    const res = await api.post('/auth/login', { email, password })
    // backend deve retornar { user, token }
    const { user: u, token } = res.data
    localStorage.setItem('futsal_token', token)
    setUser(u)
    return u
  }

  function logout() {
    localStorage.removeItem('futsal_token')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
