'use client'

import { useAuth } from '../contexts/AuthContext'
import LoginForm from '../components/auth/LoginForm'
import Dashboard from './dashboard/page'

export default function Home() {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh' 
      }}>
        <div>Cargando...</div>
      </div>
    )
  }

  if (!user) {
    return <LoginForm />
  }

  return <Dashboard />
}