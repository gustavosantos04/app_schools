import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import TeacherDashboard from './pages/TeacherDashboard'
import ParentDashboard from './pages/ParentDashboard'
import ProtectedRoute from './components/ProtectedRoute'

export default function App(){
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/teacher/*" element={<ProtectedRoute role="teacher"><TeacherDashboard/></ProtectedRoute>} />
      <Route path="/parent/*" element={<ProtectedRoute role="parent"><ParentDashboard/></ProtectedRoute>} />
      <Route path="/" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}
