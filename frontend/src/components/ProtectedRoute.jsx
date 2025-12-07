import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function ProtectedRoute({ children, role, allowedRoles }) {
  const { user } = useAuth()

  if (user === undefined) return null

  if (!user) return <Navigate to="/login" replace />

  const userRole = user.role || user.tipo

  // 🔥 Se allowedRoles for passado, usa ele
  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to="/login" replace />
  }

  // 🔥 Se role único for passado, usa ele
  if (role && userRole !== role && userRole !== "superadmin") {
    return <Navigate to="/login" replace />
  }

  return children
}

