'use client'

import { useState } from 'react'

export default function Navigation({ onNavigate, currentPage }) {
  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-xl font-bold text-primary-500">MindHub</h1>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => onNavigate('login')}
              className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                currentPage === 'login'
                  ? 'text-primary-600 bg-primary-50'
                  : 'text-gray-600 hover:text-primary-600'
              }`}
            >
              Iniciar Sesión
            </button>
            <button
              onClick={() => onNavigate('about')}
              className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                currentPage === 'about'
                  ? 'text-primary-600 bg-primary-50'
                  : 'text-gray-600 hover:text-primary-600'
              }`}
            >
              Acerca de
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                currentPage === 'contact'
                  ? 'text-primary-600 bg-primary-50'
                  : 'text-gray-600 hover:text-primary-600'
              }`}
            >
              Contacto
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button className="text-gray-600 hover:text-primary-600">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}