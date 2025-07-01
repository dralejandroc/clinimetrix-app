'use client'

import { useState } from 'react'

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f9fafb'
  },
  navbar: {
    backgroundColor: 'white',
    borderBottom: '1px solid #e5e7eb',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
  },
  navContent: {
    maxWidth: '80rem',
    margin: '0 auto',
    padding: '0 1rem',
    display: 'flex',
    justifyContent: 'space-between',
    height: '4rem',
    alignItems: 'center'
  },
  logo: {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    color: '#29A98C'
  },
  navLinks: {
    display: 'flex',
    gap: '2rem'
  },
  navButton: {
    padding: '0.5rem 1rem',
    fontSize: '0.875rem',
    fontWeight: '500',
    borderRadius: '0.375rem',
    border: 'none',
    background: 'none',
    cursor: 'pointer',
    transition: 'all 0.2s'
  },
  navButtonActive: {
    color: '#22C55E',
    backgroundColor: '#f0fdf4'
  },
  navButtonInactive: {
    color: '#6b7280'
  },
  loginContainer: {
    minHeight: 'calc(100vh - 4rem)',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr'
  },
  loginLeft: {
    background: 'linear-gradient(135deg, #29A98C 0%, #112F33 100%)',
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '3rem',
    position: 'relative'
  },
  loginForm: {
    maxWidth: '24rem',
    margin: '0 auto',
    width: '100%'
  },
  loginTitle: {
    fontSize: '1.875rem',
    fontWeight: '800',
    color: '#111827',
    marginBottom: '0.5rem'
  },
  loginSubtitle: {
    fontSize: '0.875rem',
    color: '#6b7280',
    marginBottom: '2rem'
  },
  formGroup: {
    marginBottom: '1.5rem'
  },
  label: {
    display: 'block',
    fontSize: '0.875rem',
    fontWeight: '500',
    color: '#374151',
    marginBottom: '0.5rem'
  },
  input: {
    width: '100%',
    padding: '0.5rem 0.75rem',
    border: '1px solid #d1d5db',
    borderRadius: '0.375rem',
    fontSize: '1rem',
    outline: 'none'
  },
  button: {
    width: '100%',
    padding: '0.5rem 1rem',
    background: 'linear-gradient(135deg, #29A98C 0%, #112F33 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '0.375rem',
    fontSize: '0.875rem',
    fontWeight: '500',
    cursor: 'pointer',
    marginBottom: '1rem'
  },
  toggleButton: {
    background: 'none',
    border: 'none',
    color: '#29A98C',
    cursor: 'pointer',
    fontSize: '0.875rem',
    fontWeight: '500'
  },
  loginRight: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '0 5rem',
    backgroundColor: 'white'
  },
  rightOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.1)'
  },
  leftOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.1)'
  },
  leftContent: {
    position: 'relative',
    textAlign: 'center',
    maxWidth: '28rem'
  },
  rightFormContainer: {
    maxWidth: '24rem',
    margin: '0 auto',
    width: '100%'
  },
  logo2: {
    width: '6rem',
    height: '6rem',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 1.5rem'
  },
  brandTitle: {
    fontSize: '2.25rem',
    fontWeight: 'bold',
    marginBottom: '0.5rem'
  },
  brandSubtitle: {
    fontSize: '1.25rem',
    fontWeight: '300',
    opacity: '0.9',
    marginBottom: '2rem'
  },
  description: {
    fontSize: '1.125rem',
    opacity: '0.9',
    marginBottom: '2rem',
    lineHeight: '1.6'
  },
  features: {
    textAlign: 'left',
    marginBottom: '3rem'
  },
  feature: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '1rem'
  },
  checkIcon: {
    width: '1.25rem',
    height: '1.25rem',
    marginRight: '0.75rem',
    color: '#86efac'
  },
  testimonial: {
    opacity: '0.8',
    fontStyle: 'italic',
    fontSize: '0.875rem'
  },
  contentPage: {
    minHeight: 'calc(100vh - 4rem)',
    padding: '3rem 1rem'
  },
  contentCard: {
    maxWidth: '56rem',
    margin: '0 auto',
    backgroundColor: '#FFF8EE',
    borderRadius: '0.5rem',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    padding: '2rem'
  },
  plansContainer: {
    background: 'linear-gradient(135deg, #29A98C 0%, #112F33 100%)',
    minHeight: 'calc(100vh - 4rem)',
    padding: '4rem 1rem'
  },
  plansCard: {
    maxWidth: '80rem',
    margin: '0 auto',
    backgroundColor: '#FFF8EE',
    borderRadius: '1rem',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
    padding: '3rem'
  },
  planCard: {
    backgroundColor: 'white',
    borderRadius: '0.75rem',
    padding: '2rem',
    position: 'relative',
    border: '1px solid #e5e7eb',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
  },
  planCardPopular: {
    backgroundColor: 'white',
    borderRadius: '0.75rem',
    padding: '2rem',
    position: 'relative',
    border: '2px solid #29A98C',
    transition: 'all 0.3s ease',
    boxShadow: '0 10px 20px rgba(41, 169, 140, 0.15)',
    transform: 'scale(1.05)'
  },
  popularBadge: {
    position: 'absolute',
    top: '-12px',
    left: '50%',
    transform: 'translateX(-50%)',
    background: '#EC7367',
    color: 'white',
    padding: '0.5rem 1.5rem',
    borderRadius: '1.5rem',
    fontSize: '0.875rem',
    fontWeight: '600',
    boxShadow: '0 4px 8px rgba(236, 115, 103, 0.3)'
  },
  planTitle: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#112F33',
    marginBottom: '0.5rem',
    textAlign: 'center'
  },
  planPrice: {
    fontSize: '3rem',
    fontWeight: 'bold',
    color: '#29A98C',
    textAlign: 'center',
    marginBottom: '0.5rem'
  },
  planPriceFree: {
    fontSize: '3rem',
    fontWeight: 'bold',
    color: '#EC7367',
    textAlign: 'center',
    marginBottom: '0.5rem'
  },
  planPeriod: {
    fontSize: '1rem',
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: '2rem'
  },
  planFeatures: {
    marginBottom: '2rem',
    paddingLeft: '0',
    listStyle: 'none'
  },
  planFeature: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '0.75rem',
    fontSize: '0.95rem',
    lineHeight: '1.5',
    color: '#112F33'
  },
  checkIcon: {
    width: '1.25rem',
    height: '1.25rem',
    marginRight: '0.75rem',
    color: '#29A98C',
    flexShrink: 0
  },
  planButton: {
    width: '100%',
    padding: '0.75rem 1.5rem',
    background: 'linear-gradient(135deg, #29A98C 0%, #112F33 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '0.5rem',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 12px rgba(41, 169, 140, 0.3)'
  },
  planButtonSecondary: {
    width: '100%',
    padding: '0.75rem 1.5rem',
    background: 'transparent',
    color: '#112F33',
    border: '2px solid #112F33',
    borderRadius: '0.5rem',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  }
}

export default function HomePage() {
  const [currentPage, setCurrentPage] = useState('about')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [isSignup, setIsSignup] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleNavigate = (page) => {
    setCurrentPage(page)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    alert('¡Autenticación exitosa! (simulada)')
    setIsLoading(false)
  }

  const renderNavigation = () => (
    <nav style={styles.navbar}>
      <div style={styles.navContent}>
        <div style={styles.logo}>MindHub</div>
        <div style={styles.navLinks}>
          {['about', 'plans', 'contact', 'signup'].map(page => (
            <button
              key={page}
              onClick={() => handleNavigate(page)}
              style={{
                ...styles.navButton,
                ...(currentPage === page ? styles.navButtonActive : styles.navButtonInactive)
              }}
            >
              {page === 'about' ? 'Acerca de' : 
               page === 'plans' ? 'Planes' :
               page === 'contact' ? 'Contacto' : 'Suscríbete'}
            </button>
          ))}
        </div>
      </div>
    </nav>
  )

  const renderLogin = () => (
    <div style={styles.loginContainer}>
      {/* Panel Izquierdo - Branding */}
      <div style={styles.loginLeft}>
        <div style={styles.leftOverlay}></div>
        <div style={styles.leftContent}>
          <div style={styles.logo2}>
            <svg style={{ width: '3rem', height: '3rem', color: 'white' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
                    d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h1 style={styles.brandTitle}>MindHub</h1>
          <p style={styles.brandSubtitle}>Clinimetrix</p>
          
          <p style={styles.description}>
            Herramientas confiables y basadas en evidencia científica para la evaluación clínica profesional.
          </p>
          
          <div style={styles.features}>
            {[
              '38+ Escalas validadas científicamente',
              'Gestión completa de pacientes',
              'Reportes automáticos profesionales',
              'Historial clínico seguro'
            ].map((feature, index) => (
              <div key={index} style={styles.feature}>
                <svg style={styles.checkIcon} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>{feature}</span>
              </div>
            ))}
          </div>

          <div style={styles.testimonial}>
            <p>"Una herramienta esencial para mi práctica clínica"</p>
            <p style={{ fontSize: '0.75rem', marginTop: '0.25rem' }}>- Dr. María González, Psiquiatra</p>
          </div>
        </div>
      </div>

      {/* Panel Derecho - Login Form */}
      <div style={styles.loginRight}>
        <div style={styles.rightFormContainer}>
          <h2 style={styles.loginTitle}>
            {isSignup ? 'Crear cuenta' : 'Iniciar sesión'}
          </h2>
          <p style={styles.loginSubtitle}>
            {isSignup ? 'Únete a la plataforma profesional' : 'Accede a tu cuenta profesional'}
          </p>

          <form onSubmit={handleSubmit}>
            {isSignup && (
              <div style={styles.formGroup}>
                <label style={styles.label}>Nombre completo</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={styles.input}
                  placeholder="Dr. Juan Pérez"
                />
              </div>
            )}

            <div style={styles.formGroup}>
              <label style={styles.label}>Email profesional</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={styles.input}
                placeholder="doctor@hospital.com"
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Contraseña</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={styles.input}
                placeholder="••••••••"
              />
            </div>

            <button type="submit" style={styles.button} disabled={isLoading}>
              {isLoading ? 'Procesando...' : (isSignup ? 'Crear cuenta' : 'Iniciar sesión')}
            </button>

            <div style={{ textAlign: 'center' }}>
              <button
                type="button"
                onClick={() => setIsSignup(!isSignup)}
                style={styles.toggleButton}
              >
                {isSignup ? '¿Ya tienes cuenta? Inicia sesión' : '¿No tienes cuenta? Regístrate'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )

  const renderAbout = () => (
    <div style={styles.contentPage}>
      <div style={styles.contentCard}>
        <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#111827', marginBottom: '1.5rem' }}>
          Acerca de Clinimetrix
        </h1>
        <p style={{ color: '#6b7280', marginBottom: '1.5rem', lineHeight: '1.6' }}>
          Clinimetrix es una plataforma profesional especializada en escalas psicológicas y psiquiátricas, 
          diseñada para profesionales de la salud mental que buscan herramientas confiables y basadas en 
          evidencia científica para la evaluación clínica.
        </p>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#29A98C', marginBottom: '1rem' }}>
          Características Principales
        </h2>
        <p style={{ color: '#6b7280', lineHeight: '1.6' }}>
          Nuestra plataforma incluye más de 38 escalas validadas científicamente, sistema de gestión de pacientes, 
          reportes automáticos y seguimiento longitudinal del historial clínico.
        </p>
      </div>
    </div>
  )

  const renderPlans = () => (
    <div style={styles.plansContainer}>
      <div style={styles.plansCard}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#112F33', marginBottom: '1rem' }}>
            Planes de Suscripción
          </h1>
          <p style={{ fontSize: '1.125rem', color: '#6b7280', maxWidth: '40rem', margin: '0 auto' }}>
            Elige el plan que mejor se adapte a tu práctica profesional. Desde estudiantes hasta grandes clínicas.
          </p>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', alignItems: 'start' }}>
          {/* Plan Gratuito */}
          <div style={styles.planCard}>
            <h3 style={styles.planTitle}>Gratuito</h3>
            <div style={styles.planPriceFree}>$0</div>
            <p style={styles.planPeriod}>Para estudiantes y residentes</p>
            
            <ul style={styles.planFeatures}>
              <li style={styles.planFeature}>
                <svg style={styles.checkIcon} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                25 aplicaciones por mes
              </li>
              <li style={styles.planFeature}>
                <svg style={styles.checkIcon} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Hasta 50 pacientes por mes
              </li>
              <li style={styles.planFeature}>
                <svg style={styles.checkIcon} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Historial por 3 meses
              </li>
              <li style={styles.planFeature}>
                <svg style={styles.checkIcon} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Escalas básicas
              </li>
              <li style={styles.planFeature}>
                <svg style={styles.checkIcon} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Soporte por email
              </li>
            </ul>
            
            <button 
              onClick={() => handleNavigate('signup')}
              style={styles.planButtonSecondary}
            >
              Comenzar Gratis
            </button>
          </div>

          {/* Plan Individual - Más Popular */}
          <div style={styles.planCardPopular}>
            <div style={styles.popularBadge}>Más Popular</div>
            <h3 style={styles.planTitle}>Individual</h3>
            <div style={styles.planPrice}>$99</div>
            <p style={styles.planPeriod}>por mes • Para prácticas pequeñas</p>
            
            <ul style={styles.planFeatures}>
              <li style={styles.planFeature}>
                <svg style={styles.checkIcon} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                50 aplicaciones por mes
              </li>
              <li style={styles.planFeature}>
                <svg style={styles.checkIcon} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Hasta 200 pacientes registrados
              </li>
              <li style={styles.planFeature}>
                <svg style={styles.checkIcon} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Historial por 6 meses
              </li>
              <li style={styles.planFeature}>
                <svg style={styles.checkIcon} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                38+ escalas completas
              </li>
              <li style={styles.planFeature}>
                <svg style={styles.checkIcon} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Reportes avanzados
              </li>
              <li style={styles.planFeature}>
                <svg style={styles.checkIcon} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Soporte prioritario
              </li>
            </ul>
            
            <button 
              onClick={() => handleNavigate('signup')}
              style={styles.planButton}
            >
              Empezar Ahora
            </button>
          </div>

          {/* Plan Ilimitado */}
          <div style={styles.planCard}>
            <h3 style={styles.planTitle}>Ilimitado</h3>
            <div style={styles.planPrice}>$150</div>
            <p style={styles.planPeriod}>por mes • Para prácticas grandes</p>
            
            <ul style={styles.planFeatures}>
              <li style={styles.planFeature}>
                <svg style={styles.checkIcon} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Aplicaciones ilimitadas
              </li>
              <li style={styles.planFeature}>
                <svg style={styles.checkIcon} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Pacientes ilimitados
              </li>
              <li style={styles.planFeature}>
                <svg style={styles.checkIcon} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Historial por 2 años
              </li>
              <li style={styles.planFeature}>
                <svg style={styles.checkIcon} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Todas las escalas
              </li>
              <li style={styles.planFeature}>
                <svg style={styles.checkIcon} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Analytics avanzados
              </li>
              <li style={styles.planFeature}>
                <svg style={styles.checkIcon} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Soporte dedicado
              </li>
            </ul>
            
            <button 
              onClick={() => handleNavigate('signup')}
              style={styles.planButton}
            >
              Empezar Ahora
            </button>
          </div>

          {/* Plan Clínicas */}
          <div style={styles.planCard}>
            <h3 style={styles.planTitle}>Clínicas</h3>
            <div style={styles.planPrice}>$599</div>
            <p style={styles.planPeriod}>por mes • Hasta 10 usuarios</p>
            
            <ul style={styles.planFeatures}>
              <li style={styles.planFeature}>
                <svg style={styles.checkIcon} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                100 aplicaciones/mes por usuario
              </li>
              <li style={styles.planFeature}>
                <svg style={styles.checkIcon} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Pacientes ilimitados
              </li>
              <li style={styles.planFeature}>
                <svg style={styles.checkIcon} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Historial por 2 años
              </li>
              <li style={styles.planFeature}>
                <svg style={styles.checkIcon} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Dashboard de administración
              </li>
              <li style={styles.planFeature}>
                <svg style={styles.checkIcon} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>Usuario extra: <strong style={{ color: '#EC7367' }}>+$50</strong></span>
              </li>
              <li style={styles.planFeature}>
                <svg style={styles.checkIcon} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Soporte premium 24/7
              </li>
            </ul>
            
            <button 
              onClick={() => handleNavigate('contact')}
              style={styles.planButton}
            >
              Contactar Ventas
            </button>
          </div>
        </div>
        
        <div style={{ textAlign: 'center', marginTop: '3rem', padding: '2rem', backgroundColor: 'rgba(41, 169, 140, 0.1)', borderRadius: '1rem' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#112F33', marginBottom: '0.5rem' }}>
            ¿Necesitas más información?
          </h3>
          <p style={{ color: '#6b7280', marginBottom: '1rem' }}>
            Todos nuestros planes incluyen actualizaciones automáticas y acceso completo a nuestra biblioteca de escalas validadas.
          </p>
          <button 
            onClick={() => handleNavigate('contact')}
            style={{ ...styles.planButtonSecondary, maxWidth: '200px', margin: '0 auto' }}
          >
            Hablar con Ventas
          </button>
        </div>
      </div>
    </div>
  )

  const renderContact = () => (
    <div style={styles.contentPage}>
      <div style={styles.contentCard}>
        <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#111827', marginBottom: '1.5rem' }}>
          Contáctanos
        </h1>
        <p style={{ color: '#6b7280', marginBottom: '1.5rem' }}>
          ¿Tienes preguntas sobre Clinimetrix? Estamos aquí para ayudarte.
        </p>
        <div style={{ marginBottom: '1rem' }}>
          <strong>Email:</strong> soporte@mindhub.com
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <strong>Teléfono:</strong> +1 (555) 123-4567
        </div>
        <div>
          <strong>Ubicación:</strong> Ciudad de México, México
        </div>
      </div>
    </div>
  )

  return (
    <div style={styles.container}>
      {renderNavigation()}
      {currentPage === 'about' && renderAbout()}
      {currentPage === 'plans' && renderPlans()}
      {currentPage === 'contact' && renderContact()}
      {currentPage === 'signup' && renderLogin()}
    </div>
  )
}