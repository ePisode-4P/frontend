import React from 'react'
import { Navigate } from 'react-router-dom'

export default function RequireAuth({ children }) {
  const isLoggedIn = localStorage.getItem('isLoggedIn')

  if (isLoggedIn === 'false') {
    return <Navigate to="/login" />
  }

  return children
}
