import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function ProtectedRoute({ children, role }) {
  const { user } = useAuth()
  if (!user) return <Navigate to="/login" />
  if (role && user.role !== role && user.role !== 'admin') return <Navigate to="/login" />
  return children
}
