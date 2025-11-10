import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import TeacherDashboard from './pages/TeacherDashboard'
import ParentDashboard from './pages/ParentDashboard'
import ProtectedRoute from './components/ProtectedRoute'

import { ThemeProvider as StyledProvider } from 'styled-components'
import { ThemeProvider, useTheme } from './contexts/ThemeContext'
import { darkTheme, lightTheme } from './themes'

// Wrapper para aplicar o styled-components theme
function AppWrapper() {
  const { theme } = useTheme()

  return (
    <StyledProvider theme={theme === 'dark' ? darkTheme : lightTheme}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/teacher/*"
          element={
            <ProtectedRoute role="teacher">
              <TeacherDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/parent/*"
          element={
            <ProtectedRoute role="parent">
              <ParentDashboard />
            </ProtectedRoute>
          }
        />

        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </StyledProvider>
  )
}

// Export final com ThemeProvider
export default function App() {
  return (
    <ThemeProvider>
      <AppWrapper />
    </ThemeProvider>
  )
}
