import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

import Login from './pages/auth/Login'
import Register from './pages/auth/Register'

// Páginas reais
import TeacherDashboard from './pages/TeacherDashboard'
import ParentDashboard from './pages/ParentDashboard'
import Users from './pages/Users'

// Novas rotas que o sidebar usa
import TeacherTurmas from './pages/TeacherTurmas'
import TeacherComunicados from './pages/TeacherComunicados'
import TeacherPagamentos from './pages/TeacherPagamentos'
import ParentFinanceiro from './pages/ParentFinanceiro'
import ParentVagas from './pages/ParentVagas'

import ProtectedRoute from './components/ProtectedRoute'

import { ThemeProvider as StyledProvider } from 'styled-components'
import { ThemeProvider, useTheme } from './contexts/ThemeContext'
import { darkTheme, lightTheme } from './themes'

function AppWrapper() {
  const { theme } = useTheme()

  return (
    <StyledProvider theme={theme === 'dark' ? darkTheme : lightTheme}>
      <Routes>

        {/* Rotas públicas */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* SUPERADMIN + PROFESSOR */}
        <Route
          path="/users"
          element={
            <ProtectedRoute allowedRoles={["superadmin", "professor"]}>
              <Users />
            </ProtectedRoute>
          }
        />

        <Route
          path="/turmas"
          element={
            <ProtectedRoute allowedRoles={["superadmin", "professor"]}>
              <TeacherTurmas />
            </ProtectedRoute>
          }
        />

        <Route
          path="/comunicados"
          element={
            <ProtectedRoute allowedRoles={["superadmin", "professor"]}>
              <TeacherComunicados />
            </ProtectedRoute>
          }
        />

        <Route
          path="/financeiro"
          element={
            <ProtectedRoute allowedRoles={["superadmin", "professor"]}>
              <TeacherPagamentos />
            </ProtectedRoute>
          }
        />

        {/* PROFESSOR */}
        <Route
          path="/pagamentos"
          element={
            <ProtectedRoute role="professor">
              <ParentFinanceiro />
            </ProtectedRoute>
          }
        />

        {/* ALUNO */}
        <Route
          path="/vagas"
          element={
            <ProtectedRoute role="aluno">
              <ParentVagas />
            </ProtectedRoute>
          }
        />

        {/* DASHBOARDS */}
        <Route
          path="/teacher"
          element={
            <ProtectedRoute role="professor">
              <TeacherDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/parent"
          element={
            <ProtectedRoute role="aluno">
              <ParentDashboard />
            </ProtectedRoute>
          }
        />

        {/* Redirecionamento padrão */}
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </StyledProvider>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <AppWrapper />
    </ThemeProvider>
  )
}
