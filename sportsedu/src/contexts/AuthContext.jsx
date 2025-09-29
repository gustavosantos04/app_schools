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

  async function login({ email, password, role }) {
  if (email === "teste@futsal.com" && password === "123456") {
    const fakeUser = { 
      id: 1, 
      name: "Usuário Teste", 
      email, 
      role // 👈 adiciona role fake
    }
    const fakeToken = "fake-jwt-token-123"

    localStorage.setItem("futsal_token", fakeToken)
    setUser(fakeUser)
    return fakeUser
  } else {
    throw new Error("Credenciais inválidas")
  }
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
