'use client'

import { useState } from 'react'
import Navigation from '../components/Navigation'
import LoginDualPanel from '../components/LoginDualPanel'
import AboutPage from '../components/AboutPage'
import ContactPage from '../components/ContactPage'

export default function HomePage() {
  const [currentPage, setCurrentPage] = useState('login')

  const handleNavigate = (page) => {
    setCurrentPage(page)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation onNavigate={handleNavigate} currentPage={currentPage} />
      
      {currentPage === 'login' && <LoginDualPanel />}
      {currentPage === 'about' && <AboutPage />}
      {currentPage === 'contact' && <ContactPage />}
    </div>
  )
}