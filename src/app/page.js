'use client'

import { useState, useEffect } from 'react'
// import { useAuth0 } from '@auth0/auth0-react' // COMENTADO TEMPORALMENTE PARA DESARROLLO LOCAL
import { jsPDF } from 'jspdf'
import { 
  scaleConfigs, 
  scalesData, 
  scalesHelpInfo,
  getScaleConfig,
  getAvailableScales
} from './scales/index.js'

// Componente para iconos SVG coloreados - Temporalmente usando emojis para evitar errores
const SvgIcon = ({ name, size = '1.2rem', color = 'currentColor' }) => {
  // Mapeo de nombres de iconos a emojis
  const iconMap = {
    'analyse-svgrepo-com': '📊',
    'budget-allocation-svgrepo-com': '💰',
    'contact-list-svgrepo-com': '👥',
    'operating-hours-svgrepo-com': '⏰',
    'opportunity-svgrepo-com': '⭐',
    'product-request-svgrepo-com': '📋',
    'task-svgrepo-com': '✅',
    'report': '📄',
    'medical-icon': '🏥',
    'heart-circle-svgrepo-com': '❤️',
    'leaf-svgrepo-com': '🌿',
    'restaurant-svgrepo-com': '🍽️'
  }
  
  const emoji = iconMap[name] || '📋'
  
  return (
    <span 
      style={{ 
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: size,
        lineHeight: 1
      }}
    >
      {emoji}
    </span>
  )
}

export default function HomePage() {
  // Auth0 hooks - COMENTADO TEMPORALMENTE PARA DESARROLLO LOCAL
  // const { loginWithRedirect, logout, user: auth0User, isAuthenticated: auth0IsAuthenticated, isLoading } = useAuth0()
  
  const [currentPage, setCurrentPage] = useState('dashboard')
  const [isAuthenticated, setIsAuthenticated] = useState(true)
  const [user, setUser] = useState({ name: 'Usuario Local', email: 'local@mindhub.cloud' })
  const [loginForm, setLoginForm] = useState({ email: '', password: '' })
  const [registerForm, setRegisterForm] = useState({ name: '', email: '', password: '' })
  const [isLoginMode, setIsLoginMode] = useState(true)
  const [currentScale, setCurrentScale] = useState(null)
  const [phq9Responses, setPhq9Responses] = useState({})
  const [gadiResponses, setGadiResponses] = useState({})
  const [currentPatient, setCurrentPatient] = useState('')
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [showWelcome, setShowWelcome] = useState(true)
  const [showProfessionalCard, setShowProfessionalCard] = useState(true) // Nueva: tarjeta del profesional
  const [showPatientInstructions, setShowPatientInstructions] = useState(false) // Nueva: tarjeta del paciente
  const [applicationMode, setApplicationMode] = useState('') // 'local' o 'remote'
  const [showCompletionCard, setShowCompletionCard] = useState(false)
  const [evaluationHistory, setEvaluationHistory] = useState([])
  const [feedbackForm, setFeedbackForm] = useState({
    type: 'bug',
    title: '',
    description: '',
    priority: 'medium',
    email: user?.email || ''
  })
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    location: '',
    message: ''
  })
  const [scalesView, setScalesView] = useState('grid') // 'grid', 'list', 'favorites'
  const [scalesSearch, setScalesSearch] = useState('')
  const [favoriteScales, setFavoriteScales] = useState(() => {
    // Cargar favoritos desde localStorage o usar PHQ-9 por defecto
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('clinimetrix-favorites')
      return saved ? JSON.parse(saved) : ['phq9']
    }
    return ['phq9']
  })
  const [showScaleHelp, setShowScaleHelp] = useState(false)
  const [currentScaleHelp, setCurrentScaleHelp] = useState(null)
  
  // Estados para gestión de pacientes
  const [patients, setPatients] = useState([])
  const [currentPatientData, setCurrentPatientData] = useState({
    name: '',
    birthDate: '',
    gender: '',
    email: '',
    phone: '',
    diagnosis: '',
    tags: [],
    referringProfessional: '',
    firstConsultDate: '',
    emergencyContact: '',
    emergencyPhone: '',
    notes: ''
  })
  const [showPatientForm, setShowPatientForm] = useState(false)
  const [isNewPatient, setIsNewPatient] = useState(false)
  const [selectedPatient, setSelectedPatient] = useState(null)
  const [patientsView, setPatientsView] = useState('grid') // 'grid', 'list'
  const [patientsSearch, setPatientsSearch] = useState('')
  const [showPatientChart, setShowPatientChart] = useState(false)
  const [chartPatient, setChartPatient] = useState(null)
  const [showNewPatientModal, setShowNewPatientModal] = useState(false)
  const [patientSuggestions, setPatientSuggestions] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [showScaleSelectionPopup, setShowScaleSelectionPopup] = useState(false)
  const [scaleSelectionPatient, setScaleSelectionPatient] = useState(null)

  // Estados genéricos para escalas (reemplaza estados específicos)
  const [scaleResponses, setScaleResponses] = useState({})
  const [currentScaleConfig, setCurrentScaleConfig] = useState(null)

  // Sync Auth0 authentication state with local state
  // COMENTADO TEMPORALMENTE PARA DESARROLLO LOCAL
  // useEffect(() => {
  //   if (!isLoading) {
  //     setIsAuthenticated(auth0IsAuthenticated)
  //     if (auth0IsAuthenticated && auth0User) {
  //       setUser({
  //         name: auth0User.name || auth0User.email?.split('@')[0] || 'Usuario',
  //         email: auth0User.email,
  //         picture: auth0User.picture
  //       })
  //       setCurrentPage('dashboard')
  //     } else {
  //       setUser(null)
  //       setCurrentPage('signup')
  //     }
  //   }
  // }, [auth0IsAuthenticated, auth0User, isLoading])

  const handleNavigate = (page) => {
    setCurrentPage(page)
  }

  const handleLogin = (e) => {
    e.preventDefault()
    // Simulación de login exitoso
    if (loginForm.email && loginForm.password) {
      setUser({ 
        name: loginForm.email.split('@')[0], 
        email: loginForm.email,
        plan: 'Individual'
      })
      setIsAuthenticated(true)
      setCurrentPage('dashboard')
    }
  }

  const handleRegister = (e) => {
    e.preventDefault()
    // Simulación de registro exitoso
    if (registerForm.name && registerForm.email && registerForm.password) {
      setUser({ 
        name: registerForm.name, 
        email: registerForm.email,
        plan: 'Gratuito'
      })
      setIsAuthenticated(true)
      setCurrentPage('dashboard')
    }
  }

  const handleLogout = () => {
    // COMENTADO TEMPORALMENTE PARA DESARROLLO LOCAL
    // logout({ 
    //   logoutParams: { 
    //     returnTo: window.location.origin 
    //   } 
    // })
    
    // Para desarrollo local, simplemente resetear estado
    setIsAuthenticated(false)
    setUser(null)
    setCurrentPage('signup')
  }

  // Función para buscar pacientes
  const searchPatients = (searchTerm) => {
    if (!searchTerm.trim()) {
      setPatientSuggestions([])
      setShowSuggestions(false)
      return
    }
    
    // Simular base de datos de pacientes
    const mockPatients = [
      { id: 1, name: 'Juan Pérez', age: 35, gender: 'M' },
      { id: 2, name: 'María García', age: 28, gender: 'F' },
      { id: 3, name: 'Carlos López', age: 42, gender: 'M' },
      { id: 4, name: 'Ana Martínez', age: 31, gender: 'F' },
      { id: 5, name: 'José Rodríguez', age: 55, gender: 'M' }
    ]
    
    const filtered = mockPatients.filter(patient => 
      patient.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    
    setPatientSuggestions(filtered)
    setShowSuggestions(filtered.length > 0)
  }

  // Función para seleccionar paciente de las sugerencias
  const selectPatientFromSuggestion = (patient) => {
    setCurrentPatient(patient.name)
    setSelectedPatient(patient)
    setPatientSuggestions([])
    setShowSuggestions(false)
  }

  // Función para guardar evaluación al paciente
  const saveEvaluationToPatient = (patient, evaluation) => {
    if (!patient) return
    
    // Simular guardado en base de datos
    const evaluationData = {
      id: Date.now(),
      patientId: patient.id,
      patientName: patient.name,
      scale: evaluation.scale,
      date: new Date().toISOString(),
      results: evaluation.results,
      interpretation: evaluation.interpretation,
      alerts: evaluation.alerts || []
    }
    
    // Agregar al historial local (en producción sería enviado al backend)
    setEvaluationHistory(prev => [evaluationData, ...prev])
    
    console.log('Evaluación guardada:', evaluationData)
  }

  // Sistema genérico universal para iniciar cualquier escala
  const handleStartScale = (scaleId) => {
    const config = scaleConfigs[scaleId]
    
    // Debug y validación
    console.log('Starting scale:', scaleId)
    console.log('Config found:', config)
    console.log('All available configs:', Object.keys(scaleConfigs))
    
    if (!config) {
      console.error('Scale config not found for:', scaleId)
      return
    }
    
    if (!config.options || !Array.isArray(config.options)) {
      console.error('Scale options not found or invalid for:', scaleId, config.options)
      return
    }
    
    // Configurar escala seleccionada
    setCurrentScale(scaleId)
    setCurrentScaleConfig(config)
    setScaleResponses({})
    setCurrentQuestionIndex(0)
    
    // Resetear estados del flujo genérico
    setApplicationMode('')           // Presencial vs Remoto
    setCurrentPatient('')           // Paciente seleccionado
    setShowWelcome(false)           // Tarjeta de bienvenida
    setShowProfessionalCard(false)  // Tarjeta profesional
    setShowPatientInstructions(false) // Instrucciones al paciente
    setShowCompletionCard(false)    // Tarjeta de completado
    
    // Iniciar flujo genérico - Primera tarjeta: Modo de aplicación
    setCurrentPage('application-mode')
  }

  // Funciones específicas para mantener compatibilidad
  const handleStartPHQ9 = () => handleStartScale('phq9')
  const handleStartGADI = () => handleStartScale('gadi')

  // Función genérica para manejar respuestas de cualquier escala
  const handleScaleResponse = (questionId, value) => {
    if (!currentScaleConfig) return
    
    // Usar indexación 1-based para compatibilidad con todas las escalas
    // questionId viene 0-based del índice actual, convertir a 1-based
    const oneBasedIndex = questionId + 1
    setScaleResponses(prev => ({
      ...prev,
      [oneBasedIndex]: value
    }))
    
    // Auto-advance to next question after a shorter delay
    setTimeout(() => {
      if (questionId < currentScaleConfig.questions.length - 1) {
        setCurrentQuestionIndex(questionId + 1)
      } else {
        // Para escalas heteroaplicadas, ir directo a resultados
        if (currentScaleConfig.applicationType === 'Heteroaplicada') {
          autoSaveGenericEvaluation()
          showGenericResults()
        } else {
          // Para escalas autoaplicadas, mostrar tarjeta de finalización
          setShowCompletionCard(true)
          autoSaveGenericEvaluation()
        }
      }
    }, 200)
  }

  // Funciones específicas para mantener compatibilidad (deprecated)
  const handlePhq9Response = (questionId, value) => {
    setPhq9Responses(prev => ({
      ...prev,
      [questionId]: parseInt(value)
    }))
    
    // Auto-advance to next question after a shorter delay
    setTimeout(() => {
      if (questionId < phq9Questions.length - 1) {
        setCurrentQuestionIndex(questionId + 1)
      } else {
        // Show completion card, not results
        setShowCompletionCard(true)
        autoSaveEvaluation()
      }
    }, 200)
  }

  const handleGadiResponse = (questionId, value) => {
    setGadiResponses(prev => ({
      ...prev,
      [questionId]: parseInt(value)
    }))
    
    // Auto-advance to next question after a shorter delay
    setTimeout(() => {
      if (questionId < gadiQuestions.length - 1) {
        setCurrentQuestionIndex(questionId + 1)
      } else {
        // Show completion card, not results
        setShowCompletionCard(true)
        autoSaveEvaluation()
      }
    }, 200)
  }

  const startQuestionnaire = () => {
    setShowWelcome(false)
    setCurrentQuestionIndex(0)
  }

  const goBackPHQ9 = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    } else {
      setShowWelcome(true)
    }
  }

  const goBackGADI = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    } else {
      setShowWelcome(true)
    }
  }

  // Función genérica para guardar evaluaciones
  const autoSaveGenericEvaluation = () => {
    if (!currentScaleConfig) return
    
    const evaluation = {
      id: Date.now(),
      scale: currentScaleConfig.name,
      patient: currentPatient || 'Paciente anónimo',
      patientId: selectedPatient?.id || null,
      responses: scaleResponses,
      score: currentScaleConfig.calculateScore(scaleResponses),
      applicationMode: applicationMode,
      date: new Date().toISOString(),
      completed: true,
      diagnosis: currentPatientData.diagnosis || '',
      notes: currentPatientData.notes || ''
    }
    
    // Si hay un paciente seleccionado, guardar la evaluación asociada al paciente
    if (selectedPatient) {
      saveEvaluationToPatient(selectedPatient, evaluation)
    } else {
      // Solo agregar al historial general si es anónimo
      setEvaluationHistory(prev => [evaluation, ...prev])
    }
    
    console.log('Evaluación guardada:', evaluation)
  }

  // Mantener función legacy para compatibilidad
  const autoSaveEvaluation = () => {
    const evaluation = {
      id: Date.now(),
      scale: currentScale === 'gadi' ? 'GADI' : 'PHQ-9',
      patient: currentPatient || 'Paciente anónimo',
      patientId: selectedPatient?.id || null,
      responses: currentScale === 'gadi' ? gadiResponses : phq9Responses,
      score: currentScale === 'gadi' ? calculateGadiScore() : calculatePhq9Score(),
      applicationMode: applicationMode,
      date: new Date().toISOString(),
      completed: true,
      diagnosis: currentPatientData.diagnosis || '',
      notes: currentPatientData.notes || ''
    }
    
    // Si hay un paciente seleccionado, guardar la evaluación asociada al paciente
    if (selectedPatient) {
      saveEvaluationToPatient(selectedPatient, evaluation)
    } else {
      // Solo agregar al historial general si es anónimo
      setEvaluationHistory(prev => [evaluation, ...prev])
    }
    
    console.log('Evaluación guardada:', evaluation)
  }

  const showResultsToDoctor = () => {
    // Usar página genérica de resultados para todas las escalas
    setCurrentPage('generic-results')
  }

  const selectApplicationMode = (mode) => {
    setApplicationMode(mode)
  }

  const handleFeedbackSubmit = (e) => {
    e.preventDefault()
    // Simulación de envío de feedback
    alert('¡Gracias por tu feedback! Tu reporte ha sido enviado al equipo de desarrollo de MindHub.')
    setFeedbackForm({
      type: 'bug',
      title: '',
      description: '',
      priority: 'medium',
      email: user?.email || ''
    })
    setCurrentPage('dashboard')
  }

  const handleContactSubmit = (e) => {
    e.preventDefault()
    // Simulación de envío de contacto
    alert('¡Gracias por contactarnos! Hemos recibido tu mensaje y nos pondremos en contacto contigo pronto.')
    setContactForm({
      name: '',
      email: '',
      location: '',
      message: ''
    })
    setCurrentPage('dashboard')
  }

  // Función para mostrar ayuda de escala
  const showScaleHelpModal = (scaleId) => {
    setCurrentScaleHelp(scaleId)
    setShowScaleHelp(true)
  }

  // Función para calcular edad desde fecha de nacimiento
  const calculateAge = (birthDate) => {
    if (!birthDate) return 0
    const today = new Date()
    const birth = new Date(birthDate)
    let age = today.getFullYear() - birth.getFullYear()
    const monthDiff = today.getMonth() - birth.getMonth()
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--
    }
    return age
  }

  // Función para agregar/quitar favoritos
  const toggleFavorite = (scaleId) => {
    setFavoriteScales(prev => {
      const newFavorites = prev.includes(scaleId) 
        ? prev.filter(id => id !== scaleId)
        : [...prev, scaleId]
      
      // Guardar en localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('clinimetrix-favorites', JSON.stringify(newFavorites))
      }
      
      return newFavorites
    })
  }

  // Función para abrir popup de selección de escalas para paciente
  const openScaleSelectionForPatient = (patient) => {
    setScaleSelectionPatient(patient)
    // Usar setTimeout para evitar conflictos de renderizado
    setTimeout(() => {
      setShowScaleSelectionPopup(true)
    }, 10)
  }

  // Función para seleccionar escala desde popup y aplicarla al paciente
  const selectScaleForPatient = (scaleId) => {
    if (scaleSelectionPatient) {
      setCurrentPatient(scaleSelectionPatient.name)
      setSelectedPatient(scaleSelectionPatient)
      handleStartScale(scaleId)
      setShowScaleSelectionPopup(false)
      setScaleSelectionPatient(null)
    }
  }

  // Función para obtener escalas ordenadas por historial del paciente
  const getOrderedScalesForPatient = (patient) => {
    const availableScales = getAvailableScales()
    
    // Obtener evaluaciones del paciente
    const patientEvaluations = evaluationHistory.filter(evaluation => evaluation.patient === patient.name)
    
    // Crear un mapa de frecuencia de escalas aplicadas
    const scaleFrequency = {}
    patientEvaluations.forEach(evaluation => {
      const scaleId = evaluation.scale.toLowerCase().replace(/[^a-z0-9]/g, '')
      scaleFrequency[scaleId] = (scaleFrequency[scaleId] || 0) + 1
    })
    
    // Ordenar escalas: primero las más aplicadas al paciente, luego alfabéticamente
    return availableScales.sort((a, b) => {
      const freqA = scaleFrequency[a.id] || 0
      const freqB = scaleFrequency[b.id] || 0
      
      if (freqA !== freqB) {
        return freqB - freqA // Más frecuentes primero
      }
      
      return a.fullName.localeCompare(b.fullName) // Alfabético como segundo criterio
    })
  }

  const goBackGenericScale = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    } else {
      // Regresar a las instrucciones del paciente
      setShowPatientInstructions(true)
      setShowWelcome(false)
      setShowProfessionalCard(false)
    }
  }

  const startGenericQuestionnaire = () => {
    setShowWelcome(false)
    setShowProfessionalCard(false)
    
    // Para escalas heteroaplicadas, auto-seleccionar modo local y saltar las instrucciones del paciente
    if (currentScaleConfig && currentScaleConfig.applicationType === 'Heteroaplicada') {
      setApplicationMode('local') // Auto-seleccionar local para heteroaplicadas
      setShowPatientInstructions(false)
      setCurrentQuestionIndex(0)
    } else {
      setShowPatientInstructions(true)
      setCurrentQuestionIndex(0)
    }
  }

  const startPatientQuestions = () => {
    setShowPatientInstructions(false)
    setShowWelcome(false)
    setCurrentQuestionIndex(0)
  }

  const showGenericResults = () => {
    if (!currentScaleConfig) return
    
    // Usar página genérica unificada para todas las escalas
    setCurrentPage('generic-results')
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
      {/* Estilos CSS para el slider de porcentaje */}
      <style jsx>{`
        .percentage-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 25px;
          height: 25px;
          border-radius: 50%;
          background: #29A98C;
          cursor: pointer;
          box-shadow: 0 4px 8px rgba(0,0,0,0.3);
        }
        
        .percentage-slider::-moz-range-thumb {
          width: 25px;
          height: 25px;
          border-radius: 50%;
          background: #29A98C;
          cursor: pointer;
          border: none;
          box-shadow: 0 4px 8px rgba(0,0,0,0.3);
        }
      `}</style>
      {/* Navigation */}
      <nav style={{ backgroundColor: 'white', borderBottom: '1px solid #e5e7eb', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)' }}>
        <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '0 1rem', display: 'flex', justifyContent: 'space-between', height: '4rem', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <img 
              src="/LogoPrincipal.svg" 
              alt="MindHub Logo" 
              style={{ width: '32px', height: '32px' }}
            />
            <span style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#29A98C' }}>MindHub</span>
          </div>
          <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
            {isAuthenticated ? (
              <>
                {['dashboard', 'escalas', 'pacientes', 'reportes'].map(page => (
                  <button
                    key={page}
                    onClick={() => handleNavigate(page)}
                    style={{
                      padding: '0.5rem 1rem',
                      fontSize: '0.875rem',
                      fontWeight: '500',
                      borderRadius: '0.375rem',
                      border: 'none',
                      background: 'none',
                      cursor: 'pointer',
                      color: currentPage === page ? '#22C55E' : '#6b7280',
                      backgroundColor: currentPage === page ? '#f0fdf4' : 'transparent'
                    }}
                  >
                    {page === 'dashboard' ? 'Inicio' : 
                     page === 'escalas' ? 'Escalas' :
                     page === 'pacientes' ? 'Pacientes' : 'Reportes'}
                  </button>
                ))}
                <button
                  onClick={() => handleNavigate('feedback')}
                  style={{
                    padding: '0.5rem 1rem',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    borderRadius: '0.375rem',
                    border: 'none',
                    background: 'none',
                    cursor: 'pointer',
                    color: currentPage === 'feedback' ? '#EC7367' : '#EC7367',
                    backgroundColor: currentPage === 'feedback' ? '#fef2f2' : 'transparent'
                  }}
                >
                  Beta Feedback
                </button>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginLeft: '1rem' }}>
                  <span style={{ fontSize: '0.875rem', color: '#64748b' }}>Hola, {user?.name}</span>
                  <button
                    onClick={handleLogout}
                    style={{
                      padding: '0.5rem 1rem',
                      fontSize: '0.875rem',
                      fontWeight: '500',
                      borderRadius: '0.375rem',
                      border: '1px solid #e5e7eb',
                      background: 'white',
                      cursor: 'pointer',
                      color: '#6b7280'
                    }}
                  >
                    Salir
                  </button>
                </div>
              </>
            ) : (
              <>
                {['about', 'plans', 'contact', 'signup'].map(page => (
                  <button
                    key={page}
                    onClick={() => handleNavigate(page)}
                    style={{
                      padding: '0.5rem 1rem',
                      fontSize: '0.875rem',
                      fontWeight: '500',
                      borderRadius: '0.375rem',
                      border: 'none',
                      background: 'none',
                      cursor: 'pointer',
                      color: currentPage === page ? '#22C55E' : '#6b7280',
                      backgroundColor: currentPage === page ? '#f0fdf4' : 'transparent'
                    }}
                  >
                    {page === 'about' ? 'Acerca de' : 
                     page === 'plans' ? 'Planes' :
                     page === 'contact' ? 'Contacto' : 'Suscríbete'}
                  </button>
                ))}
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Plans Page */}
      {currentPage === 'plans' && (
        <div style={{ backgroundColor: '#f8fafc', minHeight: 'calc(100vh - 4rem)', padding: '5rem 1rem' }}>
          <div style={{ maxWidth: '75rem', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <div style={{ marginBottom: '2rem' }}>
                <img 
                  src="/LogoPrincipal.svg" 
                  alt="MindHub Logo" 
                  style={{ width: '300px', height: 'auto', margin: '0 auto' }}
                />
              </div>
              <h1 style={{ fontSize: '3rem', fontWeight: '800', color: '#1e293b', marginBottom: '1rem', letterSpacing: '-0.025em' }}>
                Planes de Suscripción
              </h1>
              <p style={{ fontSize: '1.25rem', color: '#64748b', maxWidth: '40rem', margin: '0 auto', lineHeight: '1.6' }}>
                Elige el plan perfecto para tu práctica. Comienza gratis y actualiza cuando lo necesites.
              </p>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', alignItems: 'start' }}>
              
              {/* Plan Gratuito */}
              <div style={{ 
                backgroundColor: 'white', 
                borderRadius: '12px', 
                padding: '1.75rem 1.5rem', 
                border: '2px solid #e2e8f0',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}>
                <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1e293b', marginBottom: '0.5rem' }}>Gratuito</h3>
                  <p style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '1.5rem' }}>Perfecto para comenzar</p>
                  <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', marginBottom: '0.75rem' }}>
                    <span style={{ fontSize: '2.75rem', fontWeight: '800', color: '#0f172a' }}>$0</span>
                    <span style={{ fontSize: '0.875rem', color: '#64748b', marginLeft: '0.5rem' }}>/mes</span>
                  </div>
                </div>
                
                <ul style={{ listStyle: 'none', padding: 0, marginBottom: '1.75rem', minHeight: '120px' }}>
                  <li style={{ marginBottom: '1rem', color: '#334155', display: 'flex', alignItems: 'flex-start', fontSize: '0.95rem' }}>
                    <svg style={{ width: '20px', height: '20px', marginRight: '12px', marginTop: '2px', color: '#10b981', flexShrink: 0 }} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span><strong>25 aplicaciones</strong> por mes</span>
                  </li>
                  <li style={{ marginBottom: '1rem', color: '#334155', display: 'flex', alignItems: 'flex-start', fontSize: '0.95rem' }}>
                    <svg style={{ width: '20px', height: '20px', marginRight: '12px', marginTop: '2px', color: '#10b981', flexShrink: 0 }} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>Hasta <strong>50 pacientes</strong></span>
                  </li>
                  <li style={{ marginBottom: '1rem', color: '#334155', display: 'flex', alignItems: 'flex-start', fontSize: '0.95rem' }}>
                    <svg style={{ width: '20px', height: '20px', marginRight: '12px', marginTop: '2px', color: '#10b981', flexShrink: 0 }} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>Historial por <strong>3 meses</strong></span>
                  </li>
                </ul>
                
                <button style={{ 
                  width: '100%', 
                  padding: '0.875rem 1.5rem', 
                  backgroundColor: 'white',
                  color: '#475569', 
                  border: '2px solid #e2e8f0', 
                  borderRadius: '12px', 
                  cursor: 'pointer', 
                  fontSize: '1rem',
                  fontWeight: '600',
                  transition: 'all 0.2s ease'
                }}>
                  Comenzar Gratis
                </button>
              </div>

              {/* Plan Individual - Destacado */}
              <div style={{ 
                backgroundColor: 'white', 
                borderRadius: '12px', 
                padding: '1.75rem 1.5rem', 
                border: '2px solid #29A98C',
                boxShadow: '0 20px 25px -5px rgba(41, 169, 140, 0.1), 0 10px 10px -5px rgba(41, 169, 140, 0.04)',
                position: 'relative',
                transform: 'scale(1.02)',
                cursor: 'pointer'
              }}>
                <div style={{ 
                  position: 'absolute', 
                  top: '-14px', 
                  left: '50%', 
                  transform: 'translateX(-50%)', 
                  backgroundColor: '#29A98C', 
                  color: 'white', 
                  padding: '8px 24px', 
                  borderRadius: '20px', 
                  fontSize: '0.875rem', 
                  fontWeight: '600',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}>
                  Más Popular
                </div>
                
                <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1e293b', marginBottom: '0.5rem' }}>Individual</h3>
                  <p style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '1.5rem' }}>Para profesionales independientes</p>
                  <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', marginBottom: '0.75rem' }}>
                    <span style={{ fontSize: '2.75rem', fontWeight: '800', color: '#29A98C' }}>$99</span>
                    <span style={{ fontSize: '0.875rem', color: '#64748b', marginLeft: '0.5rem' }}>/mes</span>
                  </div>
                </div>
                
                <ul style={{ listStyle: 'none', padding: 0, marginBottom: '1.75rem', minHeight: '120px' }}>
                  <li style={{ marginBottom: '1rem', color: '#334155', display: 'flex', alignItems: 'flex-start', fontSize: '0.95rem' }}>
                    <svg style={{ width: '20px', height: '20px', marginRight: '12px', marginTop: '2px', color: '#10b981', flexShrink: 0 }} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span><strong>50 aplicaciones</strong> por mes</span>
                  </li>
                  <li style={{ marginBottom: '1rem', color: '#334155', display: 'flex', alignItems: 'flex-start', fontSize: '0.95rem' }}>
                    <svg style={{ width: '20px', height: '20px', marginRight: '12px', marginTop: '2px', color: '#10b981', flexShrink: 0 }} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span><strong>200 pacientes</strong> registrados</span>
                  </li>
                  <li style={{ marginBottom: '1rem', color: '#334155', display: 'flex', alignItems: 'flex-start', fontSize: '0.95rem' }}>
                    <svg style={{ width: '20px', height: '20px', marginRight: '12px', marginTop: '2px', color: '#10b981', flexShrink: 0 }} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>Historial por <strong>6 meses</strong></span>
                  </li>
                </ul>
                
                <button style={{ 
                  width: '100%', 
                  padding: '0.875rem 1.5rem', 
                  background: 'linear-gradient(135deg, #29A98C 0%, #22C55E 100%)', 
                  color: 'white', 
                  border: 'none', 
                  borderRadius: '12px', 
                  cursor: 'pointer', 
                  fontSize: '1rem',
                  fontWeight: '600',
                  transition: 'all 0.2s ease',
                  boxShadow: '0 4px 14px 0 rgba(41, 169, 140, 0.25)'
                }}>
                  Empezar Ahora
                </button>
              </div>

              {/* Plan Ilimitado */}
              <div style={{ 
                backgroundColor: 'white', 
                borderRadius: '12px', 
                padding: '1.75rem 1.5rem', 
                border: '2px solid #e2e8f0',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}>
                <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1e293b', marginBottom: '0.5rem' }}>Ilimitado</h3>
                  <p style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '1.5rem' }}>Sin restricciones</p>
                  <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', marginBottom: '0.75rem' }}>
                    <span style={{ fontSize: '2.75rem', fontWeight: '800', color: '#0f172a' }}>$150</span>
                    <span style={{ fontSize: '0.875rem', color: '#64748b', marginLeft: '0.5rem' }}>/mes</span>
                  </div>
                </div>
                
                <ul style={{ listStyle: 'none', padding: 0, marginBottom: '1.75rem', minHeight: '120px' }}>
                  <li style={{ marginBottom: '1rem', color: '#334155', display: 'flex', alignItems: 'flex-start', fontSize: '0.95rem' }}>
                    <svg style={{ width: '20px', height: '20px', marginRight: '12px', marginTop: '2px', color: '#10b981', flexShrink: 0 }} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span><strong>Aplicaciones ilimitadas</strong></span>
                  </li>
                  <li style={{ marginBottom: '1rem', color: '#334155', display: 'flex', alignItems: 'flex-start', fontSize: '0.95rem' }}>
                    <svg style={{ width: '20px', height: '20px', marginRight: '12px', marginTop: '2px', color: '#10b981', flexShrink: 0 }} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span><strong>Pacientes ilimitados</strong></span>
                  </li>
                  <li style={{ marginBottom: '1rem', color: '#334155', display: 'flex', alignItems: 'flex-start', fontSize: '0.95rem' }}>
                    <svg style={{ width: '20px', height: '20px', marginRight: '12px', marginTop: '2px', color: '#10b981', flexShrink: 0 }} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>Historial por <strong>2 años</strong></span>
                  </li>
                </ul>
                
                <button style={{ 
                  width: '100%', 
                  padding: '0.875rem 1.5rem', 
                  background: 'linear-gradient(135deg, #475569 0%, #334155 100%)', 
                  color: 'white', 
                  border: 'none', 
                  borderRadius: '12px', 
                  cursor: 'pointer', 
                  fontSize: '1rem',
                  fontWeight: '600',
                  transition: 'all 0.2s ease'
                }}>
                  Empezar Ahora
                </button>
              </div>

              {/* Plan Clínicas */}
              <div style={{ 
                backgroundColor: 'white', 
                borderRadius: '12px', 
                padding: '1.75rem 1.5rem', 
                border: '2px solid #e2e8f0',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}>
                <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1e293b', marginBottom: '0.5rem' }}>Clínicas</h3>
                  <p style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '1.5rem' }}>Para equipos grandes</p>
                  <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', marginBottom: '0.75rem' }}>
                    <span style={{ fontSize: '2.75rem', fontWeight: '800', color: '#0f172a' }}>$599</span>
                    <span style={{ fontSize: '0.875rem', color: '#64748b', marginLeft: '0.5rem' }}>/mes</span>
                  </div>
                </div>
                
                <ul style={{ listStyle: 'none', padding: 0, marginBottom: '1.75rem', minHeight: '120px' }}>
                  <li style={{ marginBottom: '1rem', color: '#334155', display: 'flex', alignItems: 'flex-start', fontSize: '0.95rem' }}>
                    <svg style={{ width: '20px', height: '20px', marginRight: '12px', marginTop: '2px', color: '#10b981', flexShrink: 0 }} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span><strong>100 aplicaciones/mes</strong> por usuario</span>
                  </li>
                  <li style={{ marginBottom: '1rem', color: '#334155', display: 'flex', alignItems: 'flex-start', fontSize: '0.95rem' }}>
                    <svg style={{ width: '20px', height: '20px', marginRight: '12px', marginTop: '2px', color: '#10b981', flexShrink: 0 }} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>Hasta <strong>10 usuarios</strong> incluidos</span>
                  </li>
                  <li style={{ marginBottom: '1rem', color: '#334155', display: 'flex', alignItems: 'flex-start', fontSize: '0.95rem' }}>
                    <svg style={{ width: '20px', height: '20px', marginRight: '12px', marginTop: '2px', color: '#EC7367', flexShrink: 0 }} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.293l-3-3a1 1 0 00-1.414-1.414L9 5.586 7.707 4.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4a1 1 0 000-1.414z" clipRule="evenodd" />
                    </svg>
                    <span>Usuario extra: <strong style={{ color: '#EC7367' }}>+$50/mes</strong></span>
                  </li>
                </ul>
                
                <button style={{ 
                  width: '100%', 
                  padding: '0.875rem 1.5rem', 
                  background: 'linear-gradient(135deg, #475569 0%, #334155 100%)', 
                  color: 'white', 
                  border: 'none', 
                  borderRadius: '12px', 
                  cursor: 'pointer', 
                  fontSize: '1rem',
                  fontWeight: '600',
                  transition: 'all 0.2s ease'
                }}>
                  Contactar Ventas
                </button>
              </div>
            </div>
            
            {/* Trust section */}
            <div style={{ textAlign: 'center', marginTop: '4rem', padding: '2rem', backgroundColor: 'rgba(41, 169, 140, 0.05)', borderRadius: '16px' }}>
              <p style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '0.5rem' }}>
                Confiado por más de <strong>1,000+ profesionales</strong> de la salud mental
              </p>
              <p style={{ fontSize: '0.875rem', color: '#64748b' }}>
                30 días de garantía • Cancela en cualquier momento • Soporte 24/7
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Signup/Login Page */}
      {currentPage === 'signup' && !isAuthenticated && (
        <div style={{ minHeight: 'calc(100vh - 4rem)', display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
          <div style={{ background: 'linear-gradient(135deg, #29A98C 0%, #112F33 100%)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '3rem', position: 'relative' }}>
            <div style={{ textAlign: 'center', position: 'relative', maxWidth: '28rem' }}>
              <div style={{ margin: '0 auto 1.5rem', textAlign: 'center' }}>
                <img 
                  src="/LogoPrincipal.svg" 
                  alt="MindHub Logo" 
                  style={{ width: '180px', height: 'auto' }}
                />
              </div>
              <h1 style={{ fontSize: '2.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Clinimetrix</h1>
              <p style={{ fontSize: '1.25rem', fontWeight: '300', opacity: '0.9', marginBottom: '2rem' }}>by MindHub</p>
              <p style={{ fontSize: '1.125rem', opacity: '0.9', marginBottom: '2rem', lineHeight: '1.6' }}>
                Tu aliado digital en la práctica clínica
              </p>
            </div>
          </div>
          <div style={{ backgroundColor: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '3rem' }}>
            <div style={{ width: '100%', maxWidth: '24rem' }}>
              <h2 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#112F33', marginBottom: '0.5rem' }}>
                Acceso Profesional
              </h2>
              <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '2rem' }}>
                Únete a más de 1,000 profesionales de la salud mental
              </p>
              
              {false ? ( // isLoading comentado para desarrollo local
                <div style={{ textAlign: 'center', padding: '2rem' }}>
                  <div style={{ fontSize: '1rem', color: '#6b7280' }}>Cargando...</div>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {/* Google Login */}
                  <button 
                    onClick={() => {
                      // loginWithRedirect({ connection: 'google-oauth2' }) // COMENTADO PARA DESARROLLO LOCAL
                      setIsAuthenticated(true)
                      setUser({ name: 'Usuario Google', email: 'google@mindhub.cloud' })
                      setCurrentPage('dashboard')
                    }}
                    style={{ 
                      width: '100%', 
                      padding: '0.75rem', 
                      backgroundColor: '#4285f4', 
                      color: 'white', 
                      border: 'none', 
                      borderRadius: '0.5rem', 
                      cursor: 'pointer', 
                      fontSize: '1rem', 
                      fontWeight: '600',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem'
                    }}
                  >
                    <span style={{ fontSize: '1.2rem' }}>🔍</span>
                    Continuar con Google
                  </button>

                  {/* Email/Password Login */}
                  <button 
                    onClick={() => {
                      // loginWithRedirect({ authorizationParams: { screen_hint: 'signup' } }) // COMENTADO PARA DESARROLLO LOCAL
                      setIsAuthenticated(true)
                      setUser({ name: 'Usuario Email', email: 'email@mindhub.cloud' })
                      setCurrentPage('dashboard')
                    }}
                    style={{ 
                      width: '100%', 
                      padding: '0.75rem', 
                      background: 'linear-gradient(135deg, #29A98C 0%, #112F33 100%)', 
                      color: 'white', 
                      border: 'none', 
                      borderRadius: '0.5rem', 
                      cursor: 'pointer', 
                      fontSize: '1rem', 
                      fontWeight: '600',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem'
                    }}
                  >
                    <span style={{ fontSize: '1.2rem' }}>📧</span>
                    Continuar con Email
                  </button>

                  {/* Microsoft Login */}
                  <button 
                    onClick={() => {
                      // loginWithRedirect({ connection: 'windowslive' }) // COMENTADO PARA DESARROLLO LOCAL
                      setIsAuthenticated(true)
                      setUser({ name: 'Usuario Microsoft', email: 'microsoft@mindhub.cloud' })
                      setCurrentPage('dashboard')
                    }}
                    style={{ 
                      width: '100%', 
                      padding: '0.75rem', 
                      backgroundColor: '#0078d4', 
                      color: 'white', 
                      border: 'none', 
                      borderRadius: '0.5rem', 
                      cursor: 'pointer', 
                      fontSize: '1rem', 
                      fontWeight: '600',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem'
                    }}
                  >
                    <span style={{ fontSize: '1.2rem' }}>🪟</span>
                    Continuar con Microsoft
                  </button>

                  <div style={{ textAlign: 'center', margin: '1rem 0' }}>
                    <div style={{ borderTop: '1px solid #e5e7eb', position: 'relative' }}>
                      <span style={{ 
                        backgroundColor: 'white', 
                        color: '#6b7280', 
                        padding: '0 1rem', 
                        position: 'absolute', 
                        top: '-0.6rem', 
                        left: '50%', 
                        transform: 'translateX(-50%)',
                        fontSize: '0.875rem'
                      }}>
                        Acceso seguro y profesional
                      </span>
                    </div>
                  </div>

                  <div style={{ 
                    backgroundColor: '#f3f4f6', 
                    padding: '1rem', 
                    borderRadius: '0.5rem', 
                    fontSize: '0.875rem', 
                    color: '#374151',
                    textAlign: 'center',
                    lineHeight: '1.5'
                  }}>
                    <strong>🔒 Seguridad garantizada</strong><br/>
                    Usamos Auth0 para proteger tu información profesional y cumplir con los estándares de seguridad médica.
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Dashboard - Main Page after login */}
      {currentPage === 'dashboard' && isAuthenticated && (
        <div style={{ backgroundColor: '#f8fafc', minHeight: 'calc(100vh - 4rem)', padding: '1rem' }}>
          <div style={{ maxWidth: '80rem', margin: '0 auto' }}>

            {/* Welcome Header */}
            <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
              <h1 style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#112F33', marginBottom: '0.75rem' }}>
                ¡Bienvenido {user?.name}! <SvgIcon name="analyse-svgrepo-com" size="1.8rem" />
              </h1>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', fontSize: '0.9rem', color: '#64748b', marginBottom: '0.5rem' }}>
                <span>Plan actual: <strong style={{ color: '#29A98C' }}>{user?.plan}</strong></span>
                <span>Miembro desde: <strong>Enero 2024</strong></span>
                <span>Especialidad: <strong>Psiquiatría</strong></span>
              </div>
              
              {/* Notificación discreta de límites */}
              {(() => {
                const planLimits = {
                  'Gratuito': { evaluations: 25, patients: 50, sent: 10 },
                  'Individual': { evaluations: 50, patients: 200, sent: 30 },
                  'Ilimitado': { evaluations: 999999, patients: 999999, sent: 999999 },
                  'Clínicas': { evaluations: 1000, patients: 999999, sent: 500 }
                }
                const currentPlan = planLimits[user?.plan] || planLimits['Gratuito']
                const usedEvaluations = 23 // Cambiado para simular menos uso
                const usedPatients = 42
                const remainingEvaluations = currentPlan.evaluations - usedEvaluations
                const remainingPatients = currentPlan.patients - usedPatients
                
                return (remainingEvaluations <= 5 || remainingPatients <= 5) && user?.plan !== 'Ilimitado' && user?.plan !== 'Clínicas' ? (
                  <div style={{
                    backgroundColor: '#fef3c7',
                    border: '1px solid #fde68a',
                    borderRadius: '6px',
                    padding: '0.5rem 0.75rem',
                    fontSize: '0.75rem',
                    color: '#92400e',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <span>
                      ⚠️ Te quedan {remainingEvaluations <= 5 ? `${remainingEvaluations} evaluaciones` : `${remainingPatients} pacientes`} este mes
                    </span>
                    <button
                      onClick={() => setCurrentPage('plans')}
                      style={{
                        backgroundColor: '#f59e0b',
                        color: 'white',
                        border: 'none',
                        padding: '0.25rem 0.5rem',
                        borderRadius: '4px',
                        fontSize: '0.7rem',
                        fontWeight: '600',
                        cursor: 'pointer'
                      }}
                    >
                      Upgrade
                    </button>
                  </div>
                ) : null
              })()}
            </div>

            {/* Stats Cards - More compact for mobile */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
              <div style={{ backgroundColor: 'white', borderRadius: '10px', padding: '1rem', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <SvgIcon name="analyse-svgrepo-com" size="1.8rem" />
                  <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#112F33', margin: 0 }}>42</p>
                </div>
                <h3 style={{ fontSize: '0.75rem', fontWeight: '600', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', margin: 0 }}>
                  Pacientes Activos
                </h3>
                <p style={{ fontSize: '0.75rem', color: '#10b981', margin: '0.25rem 0 0 0' }}>+12% vs mes anterior</p>
              </div>

              <div style={{ backgroundColor: 'white', borderRadius: '10px', padding: '1rem', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <SvgIcon name="budget-allocation-svgrepo-com" size="1.8rem" />
                  <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#112F33', margin: 0 }}>127</p>
                </div>
                <h3 style={{ fontSize: '0.75rem', fontWeight: '600', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', margin: 0 }}>
                  Evaluaciones Este Mes
                </h3>
                <p style={{ fontSize: '0.75rem', color: '#f59e0b', margin: '0.25rem 0 0 0' }}>23 restantes</p>
              </div>

              <div style={{ backgroundColor: 'white', borderRadius: '10px', padding: '1rem', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <SvgIcon name="contact-list-svgrepo-com" size="1.8rem" />
                  <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#112F33', margin: 0 }}>8</p>
                </div>
                <h3 style={{ fontSize: '0.75rem', fontWeight: '600', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', margin: 0 }}>
                  Escalas Enviadas
                </h3>
                <p style={{ fontSize: '0.75rem', color: '#10b981', margin: '0.25rem 0 0 0' }}>Este mes</p>
              </div>

              <div style={{ backgroundColor: 'white', borderRadius: '10px', padding: '1rem', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <SvgIcon name="operating-hours-svgrepo-com" size="1.8rem" />
                  <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#112F33', margin: 0 }}>15</p>
                </div>
                <h3 style={{ fontSize: '0.75rem', fontWeight: '600', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', margin: 0 }}>
                  Actividad Reciente
                </h3>
                <p style={{ fontSize: '0.75rem', color: '#10b981', margin: '0.25rem 0 0 0' }}>Últimas 24h</p>
              </div>
            </div>

            {/* Main Content Grid - More compact for mobile */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
              
              {/* Escalas Favoritas */}
              <div style={{ backgroundColor: 'white', borderRadius: '10px', padding: '1.5rem', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 'bold', color: '#112F33', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <SvgIcon name="opportunity-svgrepo-com" size="1.5rem" /> Escalas Favoritas
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <button 
                    onClick={handleStartPHQ9}
                    style={{ 
                      padding: '0.75rem', 
                      backgroundColor: '#f0fdf4', 
                      color: '#166534', 
                      border: '1px solid #bbf7d0', 
                      borderRadius: '8px', 
                      cursor: 'pointer', 
                      fontSize: '0.875rem', 
                      fontWeight: '500', 
                      textAlign: 'left',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center' 
                    }}
                  >
                    <span>🧠 PHQ-9</span>
                    <span style={{ fontSize: '0.75rem', color: '#65a30d' }}>9 preguntas</span>
                  </button>
                  <button 
                    onClick={() => alert('Beck-21 próximamente disponible')}
                    style={{ 
                      padding: '0.75rem', 
                      backgroundColor: '#fef3c7', 
                      color: '#92400e', 
                      border: '1px solid #fde68a', 
                      borderRadius: '8px', 
                      cursor: 'pointer', 
                      fontSize: '0.875rem', 
                      fontWeight: '500', 
                      textAlign: 'left',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center' 
                    }}
                  >
                    <span>📊 Beck-21</span>
                    <span style={{ fontSize: '0.75rem', color: '#d97706' }}>21 preguntas</span>
                  </button>
                  <button 
                    onClick={() => alert('GAD-7 próximamente disponible')}
                    style={{ 
                      padding: '0.75rem', 
                      backgroundColor: '#dbeafe', 
                      color: '#1e40af', 
                      border: '1px solid #bfdbfe', 
                      borderRadius: '8px', 
                      cursor: 'pointer', 
                      fontSize: '0.875rem', 
                      fontWeight: '500', 
                      textAlign: 'left',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center' 
                    }}
                  >
                    <span>⚡ GAD-7</span>
                    <span style={{ fontSize: '0.75rem', color: '#2563eb' }}>7 preguntas</span>
                  </button>
                  <button 
                    onClick={() => handleNavigate('escalas')}
                    style={{ 
                      padding: '0.5rem', 
                      backgroundColor: 'transparent', 
                      color: '#29A98C', 
                      border: 'none', 
                      borderRadius: '6px', 
                      cursor: 'pointer', 
                      fontSize: '0.75rem', 
                      fontWeight: '600', 
                      textAlign: 'center'
                    }}
                  >
                    Ver todas las escalas →
                  </button>
                </div>
              </div>


              {/* Actividad Reciente */}
              <div style={{ backgroundColor: 'white', borderRadius: '10px', padding: '1.5rem', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 'bold', color: '#112F33', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <SvgIcon name="product-request-svgrepo-com" size="2rem" /> Actividad Reciente
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{ width: '6px', height: '6px', backgroundColor: '#29A98C', borderRadius: '50%' }}></div>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: '0.75rem', color: '#112F33', fontWeight: '500', margin: 0 }}>PHQ-9 completado</p>
                      <p style={{ fontSize: '0.675rem', color: '#64748b', margin: 0 }}>María García • Hace 2h</p>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{ width: '6px', height: '6px', backgroundColor: '#29A98C', borderRadius: '50%' }}></div>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: '0.75rem', color: '#112F33', fontWeight: '500', margin: 0 }}>Nuevo paciente registrado</p>
                      <p style={{ fontSize: '0.675rem', color: '#64748b', margin: 0 }}>Carlos Ruiz • Ayer</p>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{ width: '6px', height: '6px', backgroundColor: '#EC7367', borderRadius: '50%' }}></div>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: '0.75rem', color: '#112F33', fontWeight: '500', margin: 0 }}>Reporte generado</p>
                      <p style={{ fontSize: '0.675rem', color: '#64748b', margin: 0 }}>Hace 3 días</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => alert('Historial completo próximamente')}
                    style={{ 
                      padding: '0.5rem', 
                      backgroundColor: 'transparent', 
                      color: '#29A98C', 
                      border: 'none', 
                      borderRadius: '6px', 
                      cursor: 'pointer', 
                      fontSize: '0.75rem', 
                      fontWeight: '600', 
                      textAlign: 'center',
                      marginTop: '0.25rem'
                    }}
                  >
                    Ver historial completo →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Escalas Page - Lista de Escalas Psicológicas */}
      {currentPage === 'escalas' && isAuthenticated && (
        <div style={{ backgroundColor: '#f8fafc', minHeight: 'calc(100vh - 4rem)', padding: '1rem' }}>
          <div style={{ maxWidth: '90rem', margin: '0 auto' }}>

            {/* Barra de búsqueda simplificada */}
            <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '1.5rem', marginBottom: '1rem', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)' }}>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
                
                {/* Búsqueda única */}
                <div style={{ flex: 1, minWidth: '300px' }}>
                  <input 
                    type="text"
                    value={scalesSearch}
                    onChange={(e) => setScalesSearch(e.target.value)}
                    placeholder="🔍 Buscar escalas por nombre, diagnóstico, edad, tipo de aplicación..."
                    style={{ 
                      width: '100%', 
                      padding: '0.875rem 1rem', 
                      border: '1px solid #d1d5db', 
                      borderRadius: '8px', 
                      fontSize: '0.875rem', 
                      outline: 'none',
                      transition: 'border-color 0.2s ease'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#29A98C'}
                    onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                  />
                </div>

                {/* Selectores de vista */}
                <div style={{ display: 'flex', gap: '0.5rem', backgroundColor: '#f8fafc', borderRadius: '8px', padding: '0.25rem' }}>
                  <button
                    onClick={() => setScalesView('grid')}
                    style={{
                      padding: '0.5rem 0.75rem',
                      backgroundColor: scalesView === 'grid' ? '#29A98C' : 'transparent',
                      color: scalesView === 'grid' ? 'white' : '#64748b',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '0.8rem',
                      fontWeight: '500',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    📊 Tarjetas
                  </button>
                  <button
                    onClick={() => setScalesView('list')}
                    style={{
                      padding: '0.5rem 0.75rem',
                      backgroundColor: scalesView === 'list' ? '#29A98C' : 'transparent',
                      color: scalesView === 'list' ? 'white' : '#64748b',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '0.8rem',
                      fontWeight: '500',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    📋 Lista
                  </button>
                  <button
                    onClick={() => setScalesView('favorites')}
                    style={{
                      padding: '0.5rem 0.75rem',
                      backgroundColor: scalesView === 'favorites' ? '#29A98C' : 'transparent',
                      color: scalesView === 'favorites' ? 'white' : '#64748b',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '0.8rem',
                      fontWeight: '500',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <SvgIcon name="opportunity-svgrepo-com" size="1rem" /> Favoritas
                  </button>
                </div>
              </div>
            </div>

            {(() => {
              // Filtrar escalas según búsqueda y vista
              const availableScales = getAvailableScales()
              let filteredScales = availableScales
              
              // Filtrar por búsqueda
              if (scalesSearch.trim()) {
                filteredScales = filteredScales.filter(scale => 
                  scale.fullName.toLowerCase().includes(scalesSearch.toLowerCase()) ||
                  scale.shortName.toLowerCase().includes(scalesSearch.toLowerCase()) ||
                  scale.diagnostics.some(d => d.toLowerCase().includes(scalesSearch.toLowerCase())) ||
                  scale.tags.some(t => t.toLowerCase().includes(scalesSearch.toLowerCase()))
                )
              }
              
              // Filtrar por favoritas
              if (scalesView === 'favorites') {
                filteredScales = filteredScales.filter(scale => favoriteScales.includes(scale.id))
              }

              return (
                <>
                  {/* Resultados */}
                  <div style={{ marginBottom: '1rem' }}>
                    <p style={{ fontSize: '0.875rem', color: '#64748b' }}>
                      {filteredScales.length} escalas encontradas
                    </p>
                  </div>

                  {/* Vista en Tarjetas */}
                  {(scalesView === 'grid' || scalesView === 'favorites') && (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1rem' }}>
                      {filteredScales.map(scale => (
                  <div key={scale.id} style={{ 
                    backgroundColor: 'white', 
                    borderRadius: '12px', 
                    padding: '1.25rem', 
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
                    border: '1px solid #e5e7eb',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    opacity: scale.available ? 1 : 0.7,
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)'
                    e.currentTarget.style.transform = 'translateY(-1px)'
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.05)'
                    e.currentTarget.style.transform = 'translateY(0)'
                  }}>
                    
                    {/* Botón de favorito */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleFavorite(scale.id)
                      }}
                      style={{
                        position: 'absolute',
                        top: '1rem',
                        right: '1rem',
                        backgroundColor: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '1.2rem',
                        padding: '0.25rem',
                        borderRadius: '50%',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.backgroundColor = '#f3f4f6'
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent'
                      }}
                    >
                      <SvgIcon name="opportunity-svgrepo-com" size="1rem" color={favoriteScales.includes(scale.id) ? '#29A98C' : '#d1d5db'} />
                    </button>
                    
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.875rem' }}>
                      <div style={{ 
                        width: '2.5rem', 
                        height: '2.5rem', 
                        backgroundColor: scale.color, 
                        borderRadius: '8px', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        marginRight: '0.875rem'
                      }}>
                        <SvgIcon name={scale.icon} size="1.25rem" />
                      </div>
                      <div style={{ flex: 1, paddingRight: '2rem' }}>
                        <h3 style={{ fontSize: '1rem', fontWeight: 'bold', color: '#112F33', margin: 0 }}>{scale.shortName}</h3>
                        <p style={{ fontSize: '0.8rem', color: '#64748b', margin: 0, marginBottom: '0.25rem' }}>{scale.fullName}</p>
                        <p style={{ fontSize: '0.7rem', color: scale.applicationType === 'Autoaplicada' ? '#059669' : '#7c3aed', margin: 0, fontWeight: '600' }}>
                          {scale.applicationType}
                        </p>
                      </div>
                    </div>
                    
                    <p style={{ color: '#64748b', fontSize: '0.8rem', marginBottom: '0.875rem', lineHeight: '1.4', flex: 1 }}>
                      {scale.description}
                    </p>
                    
                    <div style={{ display: 'flex', gap: '0.375rem', marginBottom: '0.875rem', flexWrap: 'wrap' }}>
                      <span style={{ backgroundColor: '#f0f9ff', color: '#0369a1', padding: '0.2rem 0.4rem', borderRadius: '10px', fontSize: '0.65rem', fontWeight: '500' }}>
                        {scale.questions} preguntas
                      </span>
                      <span style={{ backgroundColor: '#fef3c7', color: '#d97706', padding: '0.2rem 0.4rem', borderRadius: '10px', fontSize: '0.65rem', fontWeight: '500' }}>
                        {scale.duration} min
                      </span>
                      <span style={{ backgroundColor: '#f0fdf4', color: '#059669', padding: '0.2rem 0.4rem', borderRadius: '10px', fontSize: '0.65rem', fontWeight: '500' }}>
                        {scale.ageRange}
                      </span>
                      {scale.tags.slice(0, 2).map(tag => (
                        <span key={tag} style={{ backgroundColor: '#f3f4f6', color: '#374151', padding: '0.2rem 0.4rem', borderRadius: '10px', fontSize: '0.65rem', fontWeight: '500' }}>
                          {tag}
                        </span>
                      ))}
                      {scale.tags.length > 2 && (
                        <span style={{ backgroundColor: '#f3f4f6', color: '#64748b', padding: '0.2rem 0.4rem', borderRadius: '10px', fontSize: '0.65rem', fontWeight: '500' }}>
                          +{scale.tags.length - 2}
                        </span>
                      )}
                    </div>
                    
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                      <button 
                        onClick={() => showScaleHelpModal(scale.id)}
                        style={{ 
                          padding: '0.625rem', 
                          backgroundColor: '#f8fafc', 
                          color: '#64748b', 
                          border: '1px solid #e2e8f0', 
                          borderRadius: '8px', 
                          cursor: 'pointer', 
                          fontSize: '0.8rem', 
                          fontWeight: '600',
                          minWidth: '40px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                        title="Ver información detallada de la escala"
                      >
                        ?
                      </button>
                      <button 
                        onClick={() => {
                          if (scale.available) {
                            handleStartScale(scale.id)
                          }
                        }}
                        style={{ 
                          flex: 1, 
                          padding: '0.625rem', 
                          backgroundColor: scale.available ? scale.color : '#f1f5f9', 
                          color: scale.available ? 'white' : '#64748b', 
                          border: scale.available ? 'none' : '1px solid #e2e8f0', 
                          borderRadius: '8px', 
                          cursor: scale.available ? 'pointer' : 'not-allowed', 
                          fontSize: '0.8rem', 
                          fontWeight: '600'
                        }}
                      >
                        {scale.available ? 'Iniciar Evaluación' : 'Próximamente'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Vista en Lista */}
            {scalesView === 'list' && (
              <div style={{ backgroundColor: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)' }}>
                {filteredScales.map((scale, index) => (
                  <div key={scale.id} style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    padding: '1rem 1.5rem', 
                    borderBottom: index < filteredScales.length - 1 ? '1px solid #f3f4f6' : 'none',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    opacity: scale.available ? 1 : 0.7
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = '#f8fafc'
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent'
                  }}>
                    
                    <div style={{ 
                      width: '2.5rem', 
                      height: '2.5rem', 
                      backgroundColor: scale.color, 
                      borderRadius: '8px', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      marginRight: '1rem',
                      flexShrink: 0
                    }}>
                      <SvgIcon name={scale.icon} size="1.8rem" />
                    </div>
                    
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.25rem' }}>
                        <h3 style={{ fontSize: '1rem', fontWeight: 'bold', color: '#112F33', margin: 0 }}>{scale.shortName}</h3>
                        <span style={{ fontSize: '0.875rem', color: '#64748b' }}>{scale.fullName}</span>
                        <span style={{ 
                          fontSize: '0.75rem', 
                          color: scale.applicationType === 'Autoaplicada' ? '#059669' : '#7c3aed', 
                          backgroundColor: scale.applicationType === 'Autoaplicada' ? '#f0fdf4' : '#f5f3ff',
                          padding: '0.25rem 0.5rem',
                          borderRadius: '12px',
                          fontWeight: '600'
                        }}>
                          {scale.applicationType}
                        </span>
                      </div>
                      
                      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.25rem' }}>
                        {scale.tags.map(tag => (
                          <span key={tag} style={{ backgroundColor: '#f3f4f6', color: '#374151', padding: '0.125rem 0.375rem', borderRadius: '8px', fontSize: '0.7rem', fontWeight: '500' }}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexShrink: 0 }}>
                      <div style={{ textAlign: 'center' }}>
                        <span style={{ fontSize: '0.875rem', fontWeight: 'bold', color: '#112F33' }}>{scale.questions}</span>
                        <p style={{ fontSize: '0.7rem', color: '#64748b', margin: 0 }}>preguntas</p>
                      </div>
                      <div style={{ textAlign: 'center' }}>
                        <span style={{ fontSize: '0.875rem', fontWeight: 'bold', color: '#112F33' }}>{scale.duration}</span>
                        <p style={{ fontSize: '0.7rem', color: '#64748b', margin: 0 }}>minutos</p>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleFavorite(scale.id)
                        }}
                        style={{
                          backgroundColor: 'transparent',
                          border: 'none',
                          cursor: 'pointer',
                          fontSize: '1.1rem',
                          padding: '0.25rem',
                          borderRadius: '50%',
                          transition: 'all 0.2s ease'
                        }}
                        onMouseOver={(e) => {
                          e.currentTarget.style.backgroundColor = '#f3f4f6'
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent'
                        }}
                      >
                        <SvgIcon name="opportunity-svgrepo-com" size="1rem" color={favoriteScales.includes(scale.id) ? '#29A98C' : '#d1d5db'} />
                      </button>
                      <button 
                        onClick={() => showScaleHelpModal(scale.id)}
                        style={{ 
                          padding: '0.5rem', 
                          backgroundColor: '#f8fafc', 
                          color: '#64748b', 
                          border: '1px solid #e2e8f0', 
                          borderRadius: '6px', 
                          cursor: 'pointer', 
                          fontSize: '0.75rem', 
                          fontWeight: '600',
                          minWidth: '30px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                        title="Ver información detallada de la escala"
                      >
                        ?
                      </button>
                      <button 
                        onClick={() => {
                          if (scale.available) {
                            handleStartScale(scale.id)
                          }
                        }}
                        style={{ 
                          padding: '0.5rem 1rem', 
                          backgroundColor: scale.available ? scale.color : '#f1f5f9', 
                          color: scale.available ? 'white' : '#64748b', 
                          border: 'none', 
                          borderRadius: '6px', 
                          cursor: scale.available ? 'pointer' : 'not-allowed', 
                          fontSize: '0.75rem', 
                          fontWeight: '600',
                          whiteSpace: 'nowrap'
                        }}
                      >
                        {scale.available ? 'Iniciar' : 'Próximamente'}
                      </button>
                    </div>
                  </div>
                      ))}
                    </div>
                  )}

                  {filteredScales.length === 0 && (
                    <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '3rem', textAlign: 'center', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)' }}>
                      <span style={{ fontSize: '3rem', marginBottom: '1rem', display: 'block' }}>
                        <SvgIcon name={scalesView === 'favorites' ? 'opportunity-svgrepo-com' : 'product-request-svgrepo-com'} size="2rem" color="#6b7280" />
                      </span>
                      <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#112F33', marginBottom: '0.5rem' }}>
                        {scalesView === 'favorites' ? 'No tienes escalas favoritas' : 'No se encontraron escalas'}
                      </h3>
                      <p style={{ color: '#64748b', fontSize: '0.875rem' }}>
                        {scalesView === 'favorites' 
                          ? 'Marca escalas como favoritas haciendo clic en la estrella para verlas aquí.'
                          : 'Intenta modificar los filtros de búsqueda para encontrar más resultados.'
                        }
                      </p>
                    </div>
                  )}

                  {/* Modal de Ayuda de Escalas */}
                  {showScaleHelp && currentScaleHelp && scalesHelpInfo[currentScaleHelp] && (
                    <div style={{
                      position: 'fixed',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      backgroundColor: 'rgba(0, 0, 0, 0.5)',
                      zIndex: 1000,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '1rem'
                    }}>
                      <div style={{
                        backgroundColor: 'white',
                        borderRadius: '12px',
                        padding: '2rem',
                        maxWidth: '800px',
                        maxHeight: '90vh',
                        overflow: 'auto',
                        position: 'relative',
                        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
                      }}>
                        <button
                          onClick={() => setShowScaleHelp(false)}
                          style={{
                            position: 'absolute',
                            top: '1rem',
                            right: '1rem',
                            backgroundColor: 'transparent',
                            border: 'none',
                            fontSize: '1.5rem',
                            cursor: 'pointer',
                            color: '#64748b',
                            width: '2rem',
                            height: '2rem',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                          onMouseOver={(e) => {
                            e.currentTarget.style.backgroundColor = '#f3f4f6'
                          }}
                          onMouseOut={(e) => {
                            e.currentTarget.style.backgroundColor = 'transparent'
                          }}
                        >
                          ×
                        </button>

                        {(() => {
                          const helpInfo = scalesHelpInfo[currentScaleHelp]
                          const scaleInfo = scalesData.find(s => s.id === currentScaleHelp)
                          
                          return (
                            <>
                              <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                                <div style={{
                            width: '4rem',
                            height: '4rem',
                            backgroundColor: scaleInfo?.color || '#29A98C',
                            borderRadius: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 1rem'
                          }}>
                            <SvgIcon name={scaleInfo?.icon} size="2rem" />
                          </div>
                          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#112F33', margin: 0 }}>
                            {scaleInfo?.shortName}
                          </h2>
                          <p style={{ fontSize: '1rem', color: '#64748b', marginTop: '0.5rem' }}>
                            {scaleInfo?.fullName}
                          </p>
                        </div>

                        <div style={{ marginBottom: '2rem' }}>
                          <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#112F33', marginBottom: '0.75rem' }}>
                            🎯 Propósito
                          </h3>
                          <p style={{ color: '#4a5568', lineHeight: '1.6', margin: 0 }}>
                            {helpInfo.purpose}
                          </p>
                        </div>

                        <div style={{ marginBottom: '2rem' }}>
                          <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#112F33', marginBottom: '0.75rem' }}>
                            📊 Método de Calificación
                          </h3>
                          <p style={{ color: '#4a5568', marginBottom: '1rem' }}>
                            <strong>Método:</strong> {helpInfo.scoring.method}
                          </p>
                          <div style={{ display: 'grid', gap: '0.5rem' }}>
                            {helpInfo.scoring.ranges.map((range, index) => (
                              <div key={index} style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                padding: '0.5rem 0.75rem',
                                backgroundColor: `${range.color}15`,
                                border: `1px solid ${range.color}40`,
                                borderRadius: '6px'
                              }}>
                                <span style={{ fontWeight: '600', color: '#112F33' }}>{range.range}</span>
                                <span style={{ color: range.color, fontWeight: '600' }}>{range.severity}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div style={{ marginBottom: '2rem' }}>
                          <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#112F33', marginBottom: '0.75rem' }}>
                            🏥 Consideraciones Clínicas
                          </h3>
                          <ul style={{ paddingLeft: '1.5rem', margin: 0, color: '#4a5568', lineHeight: '1.6' }}>
                            {helpInfo.clinical_considerations.map((consideration, index) => (
                              <li key={index} style={{ marginBottom: '0.5rem' }}>{consideration}</li>
                            ))}
                          </ul>
                        </div>

                        <div style={{ marginBottom: '2rem' }}>
                          <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#112F33', marginBottom: '0.75rem' }}>
                            ⚠️ Limitaciones
                          </h3>
                          <ul style={{ paddingLeft: '1.5rem', margin: 0, color: '#4a5568', lineHeight: '1.6' }}>
                            {helpInfo.limitations.map((limitation, index) => (
                              <li key={index} style={{ marginBottom: '0.5rem' }}>{limitation}</li>
                            ))}
                          </ul>
                        </div>

                        <div style={{ backgroundColor: '#f8fafc', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}>
                          <h4 style={{ fontSize: '0.875rem', fontWeight: 'bold', color: '#112F33', marginBottom: '0.5rem' }}>
                            📚 Referencia
                          </h4>
                          <p style={{ fontSize: '0.875rem', color: '#64748b', margin: 0, fontStyle: 'italic' }}>
                            {helpInfo.references}
                          </p>
                        </div>

                        <div style={{ textAlign: 'center' }}>
                          <button
                            onClick={() => setShowScaleHelp(false)}
                            style={{
                              padding: '0.75rem 1.5rem',
                              backgroundColor: '#29A98C',
                              color: 'white',
                              border: 'none',
                              borderRadius: '8px',
                              cursor: 'pointer',
                              fontSize: '0.875rem',
                              fontWeight: '600'
                            }}
                          >
                            Cerrar
                          </button>
                        </div>
                      </>
                    )
                  })()}
                </div>
              </div>
            )}
                </>
              )
            })()}
          </div>
        </div>
      )}

      {/* PHQ-9 Formulario - Estilo Card Individual */}
      {currentPage === 'phq9' && isAuthenticated && (
        <div style={{ 
          background: 'linear-gradient(135deg, #29A98C 0%, #112F33 100%)', 
          minHeight: '100vh', 
          padding: '20px',
          fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif'
        }}>
          <div style={{ maxWidth: '600px', margin: '0 auto', position: 'relative' }}>
            
            {/* Selección de Modo de Aplicación */}
            {showWelcome && applicationMode === '' && (
              <div style={{
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)',
                borderRadius: '20px',
                padding: '40px 30px',
                margin: '20px 0',
                boxShadow: '0 15px 35px rgba(0, 0, 0, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                animation: 'fadeIn 0.5s ease-in-out'
              }}>
                <h1 style={{ 
                  color: '#29A98C', 
                  textAlign: 'center', 
                  marginBottom: '20px', 
                  fontSize: '2rem', 
                  fontWeight: '300' 
                }}>
                  PHQ-9
                </h1>
                <h2 style={{ 
                  color: '#112F33', 
                  marginBottom: '30px', 
                  fontSize: '1.5rem', 
                  fontWeight: '400',
                  textAlign: 'center'
                }}>
                  Modo de Aplicación
                </h2>
                
                <div style={{
                  background: 'rgba(41, 169, 140, 0.1)',
                  padding: '20px',
                  borderRadius: '15px',
                  marginBottom: '30px',
                  borderLeft: '4px solid #29A98C',
                  fontSize: '1rem',
                  lineHeight: '1.6'
                }}>
                  Antes de comenzar, complete los datos del paciente y seleccione el modo de aplicación:
                </div>

                {/* Campo para nombre del paciente con autocompletado */}
                <div style={{ marginBottom: '25px', position: 'relative' }}>
                  <label style={{ 
                    display: 'block', 
                    color: '#112F33', 
                    fontWeight: 'bold', 
                    marginBottom: '8px',
                    fontSize: '1rem'
                  }}>
                    Nombre del Paciente:
                  </label>
                  <input
                    type="text"
                    value={currentPatient}
                    onChange={(e) => {
                      const newName = e.target.value
                      setCurrentPatient(newName)
                      
                      // Buscar pacientes en tiempo real
                      searchPatients(newName)
                      
                      // Si hay nombre, buscar o preparar nuevo paciente
                      if (newName.trim()) {
                        const patientData = findOrCreatePatient(newName.trim())
                        if (patientData && isNewPatient) {
                          setShowPatientForm(true)
                        }
                      } else {
                        setSelectedPatient(null)
                        setShowPatientForm(false)
                      }
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#29A98C'
                      e.target.style.backgroundColor = 'white'
                      if (currentPatient.length >= 2) {
                        searchPatients(currentPatient)
                      }
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'rgba(41, 169, 140, 0.2)'
                      e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.9)'
                      // Delay para permitir clics en sugerencias
                      setTimeout(() => setShowSuggestions(false), 150)
                    }}
                    placeholder="Ingrese el nombre completo del paciente (opcional)"
                    style={{
                      width: '100%',
                      padding: '12px 15px',
                      border: '2px solid rgba(41, 169, 140, 0.2)',
                      borderRadius: '10px',
                      fontSize: '1rem',
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      outline: 'none',
                      transition: 'border-color 0.3s ease',
                      boxSizing: 'border-box'
                    }}
                  />

                  {/* Lista de sugerencias */}
                  {showSuggestions && patientSuggestions.length > 0 && (
                    <div style={{
                      position: 'absolute',
                      top: '100%',
                      left: 0,
                      right: 0,
                      backgroundColor: 'white',
                      border: '2px solid #29A98C',
                      borderTop: 'none',
                      borderRadius: '0 0 10px 10px',
                      zIndex: 1000,
                      maxHeight: '200px',
                      overflowY: 'auto',
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                    }}>
                      {patientSuggestions.map((patient, index) => (
                        <div
                          key={patient.id}
                          onClick={() => selectPatientFromSuggestion(patient)}
                          style={{
                            padding: '12px 15px',
                            cursor: 'pointer',
                            borderBottom: index < patientSuggestions.length - 1 ? '1px solid #f1f5f9' : 'none',
                            transition: 'background-color 0.2s ease'
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.backgroundColor = '#f8fafc'
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.backgroundColor = 'white'
                          }}
                        >
                          <div style={{ fontWeight: 'bold', color: '#112F33', marginBottom: '2px' }}>
                            {patient.name}
                          </div>
                          <div style={{ fontSize: '0.875rem', color: '#64748b' }}>
                            {patient.birthDate && `${calculateAge(patient.birthDate)} años`}
                            {patient.gender && ` • ${patient.gender}`}
                            {patient.diagnosis && ` • ${patient.diagnosis}`}
                          </div>
                          <div style={{ fontSize: '0.75rem', color: '#29A98C', marginTop: '2px' }}>
                            {patient.evaluations?.length || 0} evaluaciones registradas
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  <p style={{ 
                    color: '#64748b', 
                    fontSize: '0.875rem', 
                    marginTop: '5px', 
                    marginBottom: 0 
                  }}>
                    {showSuggestions && patientSuggestions.length > 0 
                      ? "👆 Selecciona un paciente existente o continúa escribiendo para crear uno nuevo"
                      : "Si no se especifica un nombre, el reporte se generará como \"Paciente Anónimo\""}
                  </p>
                </div>

                {/* Formulario de datos del paciente */}
                {showPatientForm && isNewPatient && (
                  <div style={{
                    background: 'rgba(255, 255, 255, 0.95)',
                    border: '2px solid #29A98C',
                    borderRadius: '15px',
                    padding: '20px',
                    marginBottom: '25px'
                  }}>
                    <h3 style={{ 
                      color: '#112F33', 
                      marginBottom: '15px', 
                      fontSize: '1.1rem',
                      fontWeight: 'bold'
                    }}>
                      📝 Datos del Paciente Nuevo
                    </h3>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', marginBottom: '15px' }}>
                      <div>
                        <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px', color: '#112F33', fontSize: '0.9rem' }}>
                          Fecha de Nacimiento
                        </label>
                        <input
                          type="date"
                          value={currentPatientData.birthDate}
                          onChange={(e) => setCurrentPatientData(prev => ({...prev, birthDate: e.target.value}))}
                          style={{
                            width: '100%',
                            padding: '8px 10px',
                            border: '1px solid rgba(41, 169, 140, 0.3)',
                            borderRadius: '6px',
                            fontSize: '0.9rem',
                            outline: 'none',
                            boxSizing: 'border-box'
                          }}
                        />
                        {currentPatientData.birthDate && (
                          <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '3px', margin: 0 }}>
                            Edad: {calculateAge(currentPatientData.birthDate)} años
                          </p>
                        )}
                      </div>
                      
                      <div>
                        <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px', color: '#112F33', fontSize: '0.9rem' }}>
                          Sexo
                        </label>
                        <select
                          value={currentPatientData.gender}
                          onChange={(e) => setCurrentPatientData(prev => ({...prev, gender: e.target.value}))}
                          style={{
                            width: '100%',
                            padding: '8px 10px',
                            border: '1px solid rgba(41, 169, 140, 0.3)',
                            borderRadius: '6px',
                            fontSize: '0.9rem',
                            outline: 'none',
                            boxSizing: 'border-box'
                          }}
                        >
                          <option value="">Seleccionar...</option>
                          <option value="masculino">Masculino</option>
                          <option value="femenino">Femenino</option>
                          <option value="otro">Otro</option>
                          <option value="prefiere_no_decir">Prefiere no decir</option>
                        </select>
                      </div>
                    </div>
                    
                    <div style={{ marginBottom: '15px' }}>
                      <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px', color: '#112F33', fontSize: '0.9rem' }}>
                        Diagnóstico (Opcional)
                      </label>
                      <input
                        type="text"
                        value={currentPatientData.diagnosis}
                        onChange={(e) => setCurrentPatientData(prev => ({...prev, diagnosis: e.target.value}))}
                        placeholder="Ej: Episodio depresivo mayor, Trastorno de ansiedad..."
                        style={{
                          width: '100%',
                          padding: '8px 10px',
                          border: '1px solid rgba(41, 169, 140, 0.3)',
                          borderRadius: '6px',
                          fontSize: '0.9rem',
                          outline: 'none',
                          boxSizing: 'border-box'
                        }}
                      />
                    </div>
                    
                    <div style={{ marginBottom: '15px' }}>
                      <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px', color: '#112F33', fontSize: '0.9rem' }}>
                        Notas de la Evaluación (Opcional)
                      </label>
                      <textarea
                        value={currentPatientData.notes}
                        onChange={(e) => setCurrentPatientData(prev => ({...prev, notes: e.target.value}))}
                        placeholder="Observaciones específicas para esta evaluación..."
                        rows={3}
                        style={{
                          width: '100%',
                          padding: '8px 10px',
                          border: '1px solid rgba(41, 169, 140, 0.3)',
                          borderRadius: '6px',
                          fontSize: '0.9rem',
                          outline: 'none',
                          resize: 'vertical',
                          boxSizing: 'border-box'
                        }}
                      />
                    </div>
                    
                    <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                      <button
                        onClick={() => {
                          setShowPatientForm(false)
                          setCurrentPatient('')
                          setSelectedPatient(null)
                        }}
                        style={{
                          padding: '8px 15px',
                          backgroundColor: '#f1f5f9',
                          color: '#475569',
                          border: '1px solid #e2e8f0',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontSize: '0.875rem',
                          fontWeight: '500'
                        }}
                      >
                        Cancelar
                      </button>
                      <button
                        onClick={() => {
                          savePatient(currentPatientData)
                          setShowPatientForm(false)
                        }}
                        style={{
                          padding: '8px 15px',
                          backgroundColor: '#29A98C',
                          color: 'white',
                          border: 'none',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontSize: '0.875rem',
                          fontWeight: '500'
                        }}
                      >
                        Guardar Paciente
                      </button>
                    </div>
                  </div>
                )}

                {/* Información de paciente existente */}
                {selectedPatient && !isNewPatient && (
                  <div style={{
                    background: 'rgba(34, 197, 94, 0.1)',
                    border: '2px solid #22c55e',
                    borderRadius: '15px',
                    padding: '15px',
                    marginBottom: '25px'
                  }}>
                    <h3 style={{ 
                      color: '#15803d', 
                      marginBottom: '10px', 
                      fontSize: '1rem',
                      fontWeight: 'bold'
                    }}>
                      ✅ Paciente Encontrado
                    </h3>
                    <div style={{ color: '#166534', fontSize: '0.875rem', lineHeight: '1.4' }}>
                      <p style={{ margin: '0 0 5px 0' }}>
                        <strong>{selectedPatient.name}</strong>
                      </p>
                      {selectedPatient.birthDate && (
                        <p style={{ margin: '0 0 5px 0' }}>
                          {calculateAge(selectedPatient.birthDate)} años • {selectedPatient.gender}
                        </p>
                      )}
                      {selectedPatient.diagnosis && (
                        <p style={{ margin: '0 0 5px 0' }}>
                          Diagnóstico: {selectedPatient.diagnosis}
                        </p>
                      )}
                      <p style={{ margin: '0' }}>
                        Evaluaciones previas: {selectedPatient.evaluations?.length || 0}
                      </p>
                    </div>
                  </div>
                )}
                
                <div style={{ display: 'grid', gap: '15px', marginBottom: '20px' }}>
                  <div
                    onClick={() => selectApplicationMode('local')}
                    style={{
                      background: 'rgba(255, 255, 255, 0.8)',
                      border: '2px solid rgba(41, 169, 140, 0.2)',
                      borderRadius: '15px',
                      padding: '20px 25px',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      textAlign: 'center'
                    }}
                    onMouseOver={(e) => {
                      e.target.style.borderColor = '#29A98C'
                      e.target.style.background = 'rgba(255, 255, 255, 1)'
                      e.target.style.transform = 'translateY(-2px)'
                    }}
                    onMouseOut={(e) => {
                      e.target.style.borderColor = 'rgba(41, 169, 140, 0.2)'
                      e.target.style.background = 'rgba(255, 255, 255, 0.8)'
                      e.target.style.transform = 'translateY(0)'
                    }}
                  >
                    <h3 style={{ color: '#112F33', marginBottom: '10px', fontSize: '1.3rem' }}>🏥 Aplicación Local</h3>
                    <p style={{ color: '#64748b', margin: 0, fontSize: '1rem' }}>
                      El paciente responderá en el consultorio y pasará el dispositivo al médico para revisar resultados
                    </p>
                  </div>
                  
                  <div
                    onClick={() => selectApplicationMode('remote')}
                    style={{
                      background: 'rgba(255, 255, 255, 0.8)',
                      border: '2px solid rgba(41, 169, 140, 0.2)',
                      borderRadius: '15px',
                      padding: '20px 25px',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      textAlign: 'center'
                    }}
                    onMouseOver={(e) => {
                      e.target.style.borderColor = '#29A98C'
                      e.target.style.background = 'rgba(255, 255, 255, 1)'
                      e.target.style.transform = 'translateY(-2px)'
                    }}
                    onMouseOut={(e) => {
                      e.target.style.borderColor = 'rgba(41, 169, 140, 0.2)'
                      e.target.style.background = 'rgba(255, 255, 255, 0.8)'
                      e.target.style.transform = 'translateY(0)'
                    }}
                  >
                    <h3 style={{ color: '#112F33', marginBottom: '10px', fontSize: '1.3rem' }}>🌐 Aplicación a Distancia</h3>
                    <p style={{ color: '#64748b', margin: 0, fontSize: '1rem' }}>
                      El paciente responderá remotamente y enviará los resultados al médico
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Card de Bienvenida */}
            {showWelcome && applicationMode !== '' && (
              <div style={{
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)',
                borderRadius: '20px',
                padding: '40px 30px',
                margin: '20px 0',
                boxShadow: '0 15px 35px rgba(0, 0, 0, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                animation: 'fadeIn 0.5s ease-in-out'
              }}>
                <h1 style={{ 
                  color: '#29A98C', 
                  textAlign: 'center', 
                  marginBottom: '30px', 
                  fontSize: '2rem', 
                  fontWeight: '300' 
                }}>
                  PHQ-9
                </h1>
                <h2 style={{ 
                  color: '#112F33', 
                  marginBottom: '20px', 
                  fontSize: '1.5rem', 
                  fontWeight: '400',
                  textAlign: 'center'
                }}>
                  Cuestionario de Salud del Paciente - 9
                </h2>
                
                <div style={{
                  background: 'rgba(41, 169, 140, 0.1)',
                  padding: '20px',
                  borderRadius: '15px',
                  marginBottom: '30px',
                  borderLeft: '4px solid #29A98C',
                  fontSize: '1.1rem',
                  lineHeight: '1.6'
                }}>
                  <strong>Instrucciones:</strong><br/>
                  Durante las <strong>ÚLTIMAS DOS SEMANAS</strong>, ¿con qué frecuencia le ha afectado alguno de los siguientes problemas?
                  <br/><br/>
                  Por favor, seleccione la opción que mejor describa su experiencia para cada pregunta.
                  <br/><br/>
                  <em>Esta evaluación consta de 9 preguntas principales.</em>
                </div>
                
                <button 
                  onClick={startQuestionnaire}
                  style={{
                    background: 'linear-gradient(135deg, #29A98C, #112F33)',
                    color: 'white',
                    border: 'none',
                    padding: '18px 35px',
                    borderRadius: '50px',
                    fontSize: '1.2rem',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    margin: '20px auto',
                    display: 'block',
                    fontWeight: '500',
                    textTransform: 'uppercase',
                    letterSpacing: '1px'
                  }}
                  onMouseOver={(e) => {
                    e.target.style.transform = 'translateY(-3px)'
                    e.target.style.boxShadow = '0 10px 25px rgba(41, 169, 140, 0.4)'
                  }}
                  onMouseOut={(e) => {
                    e.target.style.transform = 'translateY(0)'
                    e.target.style.boxShadow = 'none'
                  }}
                >
                  Comenzar Evaluación
                </button>
              </div>
            )}

            {/* Card de Finalización */}
            {!showWelcome && showCompletionCard && (
              <div style={{
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)',
                borderRadius: '20px',
                padding: '40px 30px',
                margin: '20px 0',
                boxShadow: '0 15px 35px rgba(0, 0, 0, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                animation: 'fadeIn 0.5s ease-in-out',
                textAlign: 'center'
              }}>
                <div style={{
                  background: 'linear-gradient(135deg, #29A98C, #112F33)',
                  color: 'white',
                  padding: '15px 20px',
                  borderRadius: '15px',
                  marginBottom: '25px',
                  textAlign: 'center',
                  fontWeight: '500'
                }}>
                  <div style={{ fontSize: '1.2rem', lineHeight: '1.4' }}>
                    ✅ Evaluación Completada
                  </div>
                </div>

                <h2 style={{ 
                  color: '#112F33', 
                  marginBottom: '20px', 
                  fontSize: '1.5rem', 
                  fontWeight: '400'
                }}>
                  Muchas gracias por completar la evaluación
                </h2>

                <div style={{
                  background: 'rgba(41, 169, 140, 0.1)',
                  padding: '20px',
                  borderRadius: '15px',
                  marginBottom: '30px',
                  borderLeft: '4px solid #29A98C',
                  fontSize: '1.1rem',
                  lineHeight: '1.6',
                  textAlign: 'left'
                }}>
                  {applicationMode === 'remote' ? (
                    <>
                      <strong>Siguiente paso:</strong><br/>
                      Los resultados de tu evaluación han sido guardados automáticamente y serán enviados a tu médico para su revisión profesional.
                      <br/><br/>
                      <em>Por motivos de confidencialidad y para un análisis clínico adecuado, los resultados no se muestran al paciente.</em>
                    </>
                  ) : (
                    <>
                      <strong>Siguiente paso:</strong><br/>
                      Por favor, pasa el dispositivo a tu médico para que pueda revisar los resultados de tu evaluación.
                      <br/><br/>
                      <em>Los resultados requieren interpretación profesional y no se muestran al paciente.</em>
                    </>
                  )}
                </div>

                <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
                  {applicationMode === 'remote' ? (
                    <button 
                      onClick={() => {
                        setCurrentPage('dashboard')
                        setShowCompletionCard(false)
                      }}
                      style={{
                        background: 'linear-gradient(135deg, #29A98C, #112F33)',
                        color: 'white',
                        border: 'none',
                        padding: '15px 30px',
                        borderRadius: '50px',
                        fontSize: '1.1rem',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        fontWeight: '500'
                      }}
                      onMouseOver={(e) => {
                        e.target.style.transform = 'translateY(-2px)'
                        e.target.style.boxShadow = '0 8px 20px rgba(41, 169, 140, 0.4)'
                      }}
                      onMouseOut={(e) => {
                        e.target.style.transform = 'translateY(0)'
                        e.target.style.boxShadow = 'none'
                      }}
                    >
                      📧 Resultados Enviados al Médico
                    </button>
                  ) : (
                    <button 
                      onClick={showResultsToDoctor}
                      style={{
                        background: 'linear-gradient(135deg, #29A98C, #112F33)',
                        color: 'white',
                        border: 'none',
                        padding: '15px 30px',
                        borderRadius: '50px',
                        fontSize: '1.1rem',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        fontWeight: '500'
                      }}
                      onMouseOver={(e) => {
                        e.target.style.transform = 'translateY(-2px)'
                        e.target.style.boxShadow = '0 8px 20px rgba(41, 169, 140, 0.4)'
                      }}
                      onMouseOut={(e) => {
                        e.target.style.transform = 'translateY(0)'
                        e.target.style.boxShadow = 'none'
                      }}
                    >
                      👨‍⚕️ Ver Resultados (Solo Médico)
                    </button>
                  )}
                  
                  <button 
                    onClick={() => {
                      setCurrentPage('escalas')
                      setShowCompletionCard(false)
                    }}
                    style={{
                      background: 'rgba(255, 255, 255, 0.8)',
                      color: '#29A98C',
                      border: '2px solid #29A98C',
                      padding: '15px 30px',
                      borderRadius: '50px',
                      fontSize: '1.1rem',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      fontWeight: '500'
                    }}
                    onMouseOver={(e) => {
                      e.target.style.background = '#29A98C'
                      e.target.style.color = 'white'
                      e.target.style.transform = 'translateY(-2px)'
                    }}
                    onMouseOut={(e) => {
                      e.target.style.background = 'rgba(255, 255, 255, 0.8)'
                      e.target.style.color = '#29A98C'
                      e.target.style.transform = 'translateY(0)'
                    }}
                  >
                    Nueva Evaluación
                  </button>
                </div>
              </div>
            )}

            {/* Cards de Preguntas */}
            {!showWelcome && currentQuestionIndex < phq9Questions.length && !showCompletionCard && (
              <div style={{
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)',
                borderRadius: '20px',
                padding: '40px 30px',
                margin: '20px 0',
                boxShadow: '0 15px 35px rgba(0, 0, 0, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                animation: 'fadeIn 0.5s ease-in-out'
              }}>
                {/* Header de la pregunta */}
                <div style={{
                  background: 'linear-gradient(135deg, #29A98C, #112F33)',
                  color: 'white',
                  padding: '15px 20px',
                  borderRadius: '15px',
                  marginBottom: '25px',
                  textAlign: 'center',
                  fontWeight: '500'
                }}>
                  <div style={{ fontSize: '0.9rem', opacity: '0.9', marginBottom: '5px' }}>
                    Pregunta {currentQuestionIndex + 1} de {phq9Questions.length}
                  </div>
                  <div style={{ fontSize: '1.2rem', lineHeight: '1.4' }}>
                    {phq9Questions[currentQuestionIndex]}
                  </div>
                </div>

                {/* Opciones */}
                <div style={{ display: 'grid', gap: '15px', marginTop: '25px' }}>
                  {phq9Options.map((option) => (
                    <div
                      key={option.value}
                      onClick={() => handlePhq9Response(currentQuestionIndex, option.value)}
                      style={{
                        background: phq9Responses[currentQuestionIndex] === option.value 
                          ? 'linear-gradient(135deg, #29A98C, #112F33)' 
                          : 'rgba(255, 255, 255, 0.8)',
                        border: '2px solid rgba(41, 169, 140, 0.2)',
                        borderRadius: '15px',
                        padding: '18px 25px',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '15px',
                        fontSize: '1.1rem',
                        color: phq9Responses[currentQuestionIndex] === option.value ? 'white' : '#333'
                      }}
                      onMouseOver={(e) => {
                        if (phq9Responses[currentQuestionIndex] !== option.value) {
                          e.target.style.borderColor = '#29A98C'
                          e.target.style.background = 'rgba(255, 255, 255, 1)'
                          e.target.style.transform = 'translateY(-2px)'
                          e.target.style.boxShadow = '0 5px 15px rgba(41, 169, 140, 0.2)'
                        }
                      }}
                      onMouseOut={(e) => {
                        if (phq9Responses[currentQuestionIndex] !== option.value) {
                          e.target.style.borderColor = 'rgba(41, 169, 140, 0.2)'
                          e.target.style.background = 'rgba(255, 255, 255, 0.8)'
                          e.target.style.transform = 'translateY(0)'
                          e.target.style.boxShadow = 'none'
                        }
                      }}
                    >
                      <span style={{
                        background: phq9Responses[currentQuestionIndex] === option.value 
                          ? 'rgba(255, 255, 255, 0.3)' 
                          : 'rgba(255, 255, 255, 0.2)',
                        color: phq9Responses[currentQuestionIndex] === option.value ? 'white' : '#333',
                        padding: '8px 12px',
                        borderRadius: '10px',
                        fontWeight: '600',
                        minWidth: '30px',
                        textAlign: 'center'
                      }}>
                        {option.value}
                      </span>
                      <span>{option.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Botón Regresar */}
          {!showWelcome && (
            <button
              onClick={goBackPHQ9}
              style={{
                position: 'fixed',
                bottom: '20px',
                right: '20px',
                background: 'rgba(255, 255, 255, 0.9)',
                color: '#29A98C',
                border: '2px solid #29A98C',
                padding: '15px 20px',
                borderRadius: '50px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                fontWeight: '500',
                zIndex: 1000,
                backdropFilter: 'blur(10px)'
              }}
              onMouseOver={(e) => {
                e.target.style.background = '#29A98C'
                e.target.style.color = 'white'
                e.target.style.transform = 'translateY(-2px)'
              }}
              onMouseOut={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.9)'
                e.target.style.color = '#29A98C'
                e.target.style.transform = 'translateY(0)'
              }}
            >
              ← Regresar
            </button>
          )}

          {/* Barra de Progreso */}
          <div style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            height: '4px',
            background: 'linear-gradient(90deg, #29A98C, #112F33)',
            transition: 'width 0.3s ease',
            zIndex: 1000,
            width: showWelcome ? '0%' : `${((currentQuestionIndex + 1) / phq9Questions.length) * 100}%`
          }}></div>

          {/* Botón Volver a Escalas */}
          <button
            onClick={() => setCurrentPage('escalas')}
            style={{
              position: 'fixed',
              bottom: '20px',
              left: '20px',
              background: 'rgba(255, 255, 255, 0.9)',
              color: '#29A98C',
              border: '2px solid #29A98C',
              padding: '15px 20px',
              borderRadius: '50px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              fontWeight: '500',
              zIndex: 1000,
              backdropFilter: 'blur(10px)'
            }}
            onMouseOver={(e) => {
              e.target.style.background = '#29A98C'
              e.target.style.color = 'white'
              e.target.style.transform = 'translateY(-2px)'
            }}
            onMouseOut={(e) => {
              e.target.style.background = 'rgba(255, 255, 255, 0.9)'
              e.target.style.color = '#29A98C'
              e.target.style.transform = 'translateY(0)'
            }}
          >
            ← Escalas
          </button>
        </div>
      )}

      {/* PHQ-9 Resultados */}
      {currentPage === 'phq9-results' && isAuthenticated && (
        <div style={{ backgroundColor: '#f8fafc', minHeight: 'calc(100vh - 4rem)', padding: '2rem 1rem' }}>
          <div style={{ maxWidth: '50rem', margin: '0 auto' }}>
            <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '2rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
              <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#112F33', marginBottom: '0.5rem' }}>
                  Resultados PHQ-9
                </h1>
                {currentPatient && (
                  <p style={{ color: '#64748b', fontSize: '1.125rem' }}>
                    Paciente: {currentPatient}
                  </p>
                )}
              </div>
              
              {(() => {
                const result = calculatePhq9Score()
                const interpretation = getDetailedInterpretation(result.total)
                const alerts = checkClinicalAlerts()
                
                return (
                  <>
                    {/* Alertas Críticas */}
                    {alerts.length > 0 && (
                      <div style={{ marginBottom: '2rem' }}>
                        {alerts.map((alert, index) => (
                          <div key={index} style={{
                            backgroundColor: alert.type === 'critical' ? '#fef2f2' : '#fffbeb',
                            border: `2px solid ${alert.type === 'critical' ? '#f87171' : '#f59e0b'}`,
                            borderRadius: '12px',
                            padding: '1.5rem',
                            marginBottom: '1rem'
                          }}>
                            <h3 style={{ 
                              color: alert.type === 'critical' ? '#dc2626' : '#d97706',
                              fontWeight: 'bold',
                              marginBottom: '0.5rem',
                              fontSize: '1.125rem'
                            }}>
                              {alert.title}
                            </h3>
                            <p style={{ 
                              color: alert.type === 'critical' ? '#991b1b' : '#92400e',
                              margin: 0,
                              lineHeight: '1.5'
                            }}>
                              {alert.message}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}

                    <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                      <div style={{ 
                        display: 'inline-block',
                        padding: '2rem',
                        backgroundColor: '#f8fafc',
                        borderRadius: '16px',
                        border: `2px solid ${interpretation.color}`
                      }}>
                        <p style={{ fontSize: '3rem', fontWeight: 'bold', color: interpretation.color, margin: 0 }}>
                          {result.total}
                        </p>
                        <p style={{ fontSize: '1.125rem', color: '#64748b', margin: 0 }}>
                          de 27 puntos
                        </p>
                      </div>
                    </div>
                    
                    {/* Interpretación Detallada */}
                    <div style={{
                      backgroundColor: '#f8fafc',
                      border: `1px solid ${interpretation.color}`,
                      borderRadius: '12px',
                      padding: '2rem',
                      marginBottom: '2rem'
                    }}>
                      <h2 style={{ 
                        fontSize: '1.5rem', 
                        fontWeight: 'bold', 
                        color: interpretation.color, 
                        marginBottom: '1rem',
                        textAlign: 'center'
                      }}>
                        {interpretation.title}
                      </h2>
                      
                      <div style={{ marginBottom: '1.5rem' }}>
                        <h3 style={{ 
                          fontSize: '1.125rem', 
                          fontWeight: 'bold', 
                          color: '#112F33', 
                          marginBottom: '0.5rem' 
                        }}>
                          Interpretación Clínica:
                        </h3>
                        <p style={{ 
                          color: '#4a5568', 
                          lineHeight: '1.6', 
                          margin: 0,
                          fontSize: '1rem'
                        }}>
                          {interpretation.description}
                        </p>
                      </div>
                      
                      <div>
                        <h3 style={{ 
                          fontSize: '1.125rem', 
                          fontWeight: 'bold', 
                          color: '#112F33', 
                          marginBottom: '0.5rem' 
                        }}>
                          Recomendaciones:
                        </h3>
                        <p style={{ 
                          color: '#4a5568', 
                          lineHeight: '1.6', 
                          margin: 0,
                          fontSize: '1rem'
                        }}>
                          {interpretation.recommendations}
                        </p>
                      </div>
                    </div>

                    {/* Desglose de Respuestas */}
                    <div style={{
                      backgroundColor: 'white',
                      border: '1px solid #e2e8f0',
                      borderRadius: '12px',
                      padding: '1.5rem',
                      marginBottom: '2rem'
                    }}>
                      <h3 style={{ 
                        fontSize: '1.125rem', 
                        fontWeight: 'bold', 
                        color: '#112F33', 
                        marginBottom: '1rem' 
                      }}>
                        Análisis Detallado de Respuestas:
                      </h3>
                      
                      <div style={{ display: 'grid', gap: '0.75rem' }}>
                        {phq9Questions.map((question, index) => {
                          const score = phq9Responses[index] || 0
                          const isElevated = score >= 2
                          return (
                            <div key={index} style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              padding: '0.75rem',
                              backgroundColor: isElevated ? '#fef3c7' : '#f8fafc',
                              borderRadius: '8px',
                              border: isElevated ? '1px solid #f59e0b' : '1px solid #e2e8f0'
                            }}>
                              <span style={{ 
                                fontSize: '0.875rem', 
                                color: '#374151',
                                flex: 1,
                                marginRight: '1rem'
                              }}>
                                {index + 1}. {question}
                              </span>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <span style={{
                                  backgroundColor: isElevated ? '#f59e0b' : '#6b7280',
                                  color: 'white',
                                  padding: '0.25rem 0.5rem',
                                  borderRadius: '4px',
                                  fontSize: '0.75rem',
                                  fontWeight: 'bold',
                                  minWidth: '20px',
                                  textAlign: 'center'
                                }}>
                                  {score}
                                </span>
                                <span style={{ 
                                  fontSize: '0.75rem', 
                                  color: '#64748b',
                                  minWidth: '100px'
                                }}>
                                  {phq9Options[score]?.label}
                                </span>
                                {isElevated && (
                                  <span style={{ color: '#f59e0b', fontSize: '0.875rem' }}>⚠️</span>
                                )}
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>

                    {/* Información del Modo de Aplicación */}
                    <div style={{
                      backgroundColor: '#f0fdf4',
                      border: '1px solid #22c55e',
                      borderRadius: '12px',
                      padding: '1rem',
                      marginBottom: '2rem',
                      textAlign: 'center'
                    }}>
                      <p style={{ margin: 0, color: '#166534', fontSize: '0.875rem' }}>
                        <strong>Modo de aplicación:</strong> {applicationMode === 'local' ? '🏥 Local (en consultorio)' : '🌐 A distancia'}
                        {applicationMode && (
                          <span style={{ marginLeft: '1rem' }}>
                            • <strong>Fecha:</strong> {new Date().toLocaleDateString('es-ES')}
                          </span>
                        )}
                      </p>
                    </div>
                    
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                      <button
                        onClick={() => setCurrentPage('escalas')}
                        style={{
                          padding: '0.75rem 1.5rem',
                          backgroundColor: '#f1f5f9',
                          color: '#475569',
                          border: '1px solid #e2e8f0',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          fontSize: '0.875rem',
                          fontWeight: '600'
                        }}
                      >
                        Nueva Evaluación
                      </button>
                      <button
                        onClick={() => setCurrentPage('dashboard')}
                        style={{
                          padding: '0.75rem 1.5rem',
                          backgroundColor: '#29A98C',
                          color: 'white',
                          border: 'none',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          fontSize: '0.875rem',
                          fontWeight: '600'
                        }}
                      >
                        Ir al Dashboard
                      </button>
                      <button
                        onClick={() => {
                          exportToPDF(result, interpretation, 'PHQ-9', phq9Responses, phq9Questions)
                        }}
                        style={{
                          padding: '0.75rem 1.5rem',
                          backgroundColor: 'white',
                          color: '#475569',
                          border: '1px solid #e2e8f0',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          fontSize: '0.875rem',
                          fontWeight: '600'
                        }}
                      >
                        📄 Descargar PDF
                      </button>
                    </div>
                  </>
                )
              })()}
            </div>
          </div>
        </div>
      )}

      {/* GADI Page */}
      {currentPage === 'gadi' && isAuthenticated && (
        <div style={{ 
          background: 'linear-gradient(135deg, #29A98C 0%, #112F33 100%)', 
          minHeight: '100vh', 
          padding: '20px',
          fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif'
        }}>
          <div style={{ maxWidth: '600px', margin: '0 auto', position: 'relative' }}>
            
            {/* Selección de Modo de Aplicación */}
            {showWelcome && applicationMode === '' && (
              <div style={{
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)',
                borderRadius: '20px',
                padding: '40px 30px',
                margin: '20px 0',
                boxShadow: '0 15px 35px rgba(0, 0, 0, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                animation: 'fadeIn 0.5s ease-in-out'
              }}>
                <h1 style={{ 
                  color: '#29A98C', 
                  textAlign: 'center', 
                  marginBottom: '10px', 
                  fontSize: '2rem', 
                  fontWeight: '300' 
                }}>
                  GADI
                </h1>
                <p style={{ 
                  color: '#112F33', 
                  textAlign: 'center', 
                  marginBottom: '30px', 
                  fontSize: '1.1rem', 
                  fontWeight: '400' 
                }}>
                  Inventario de Ansiedad Generalizada
                </p>
                
                <div style={{
                  background: 'rgba(41, 169, 140, 0.1)',
                  padding: '20px',
                  borderRadius: '15px',
                  marginBottom: '30px',
                  borderLeft: '4px solid #29A98C',
                  fontSize: '1rem',
                  lineHeight: '1.6'
                }}>
                  <h3 style={{ color: '#112F33', marginBottom: '15px', fontSize: '1.1rem' }}>Instrucciones importantes:</h3>
                  <ul style={{ color: '#112F33', paddingLeft: '20px' }}>
                    <li style={{ marginBottom: '8px' }}><strong>Asegúrese de responder todas las preguntas</strong> sobre síntomas que ha sentido en las <strong>últimas dos semanas</strong></li>
                    <li style={{ marginBottom: '8px' }}><strong>No se detenga demasiado tiempo</strong> en cada pregunta, ya que <strong>no hay respuestas correctas ni incorrectas</strong></li>
                    <li style={{ marginBottom: '8px' }}>Esta evaluación consta de <strong>22 preguntas</strong> sobre síntomas de ansiedad</li>
                    <li style={{ marginBottom: '8px' }}>Sus respuestas son <strong>confidenciales</strong> y serán revisadas por un profesional de la salud</li>
                  </ul>
                </div>

                {/* Campo para nombre del paciente con autocompletado */}
                <div style={{ marginBottom: '25px', position: 'relative' }}>
                  <label style={{ 
                    display: 'block', 
                    color: '#112F33', 
                    fontWeight: 'bold', 
                    marginBottom: '8px',
                    fontSize: '1rem'
                  }}>
                    Nombre del Paciente:
                  </label>
                  <input
                    type="text"
                    value={currentPatient}
                    onChange={(e) => {
                      const newName = e.target.value
                      setCurrentPatient(newName)
                      
                      // Buscar pacientes en tiempo real
                      searchPatients(newName)
                      
                      // Si hay nombre, buscar o preparar nuevo paciente
                      if (newName.trim()) {
                        const patientData = findOrCreatePatient(newName.trim())
                        if (patientData && isNewPatient) {
                          setShowPatientForm(true)
                        }
                      } else {
                        setSelectedPatient(null)
                        setShowPatientForm(false)
                      }
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#29A98C'
                      e.target.style.backgroundColor = 'white'
                      if (currentPatient.length >= 2) {
                        searchPatients(currentPatient)
                      }
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'rgba(41, 169, 140, 0.2)'
                      e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.9)'
                      // Delay para permitir clics en sugerencias
                      setTimeout(() => setShowSuggestions(false), 150)
                    }}
                    placeholder="Ingrese el nombre completo del paciente (opcional)"
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '12px',
                      border: '1px solid rgba(41, 169, 140, 0.2)',
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      fontSize: '1rem',
                      color: '#112F33',
                      transition: 'all 0.3s ease',
                      outline: 'none'
                    }}
                  />
                  
                  {/* Sugerencias de pacientes */}
                  {showSuggestions && patientSuggestions.length > 0 && (
                    <div style={{
                      position: 'absolute',
                      top: '100%',
                      left: 0,
                      right: 0,
                      backgroundColor: 'white',
                      border: '1px solid rgba(41, 169, 140, 0.2)',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                      zIndex: 1000,
                      maxHeight: '200px',
                      overflowY: 'auto'
                    }}>
                      {patientSuggestions.map((patient, index) => (
                        <div
                          key={patient.id}
                          onClick={() => selectPatientFromSuggestion(patient)}
                          style={{
                            padding: '10px 16px',
                            cursor: 'pointer',
                            borderBottom: index < patientSuggestions.length - 1 ? '1px solid rgba(41, 169, 140, 0.1)' : 'none',
                            color: '#112F33'
                          }}
                          onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(41, 169, 140, 0.1)'}
                          onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                        >
                          <div style={{ fontWeight: 'bold' }}>{patient.name}</div>
                          <div style={{ fontSize: '0.85rem', color: '#64748b' }}>
                            {patient.evaluations?.length || 0} evaluaciones previas
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <h2 style={{ 
                  color: '#112F33', 
                  marginBottom: '20px', 
                  fontSize: '1.3rem', 
                  fontWeight: '400',
                  textAlign: 'center'
                }}>
                  Modo de Aplicación
                </h2>
                
                <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                  <button
                    onClick={() => selectApplicationMode('local')}
                    style={{
                      flex: '1',
                      minWidth: '200px',
                      padding: '20px',
                      backgroundColor: 'rgba(41, 169, 140, 0.1)',
                      border: '2px solid #29A98C',
                      borderRadius: '15px',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      fontSize: '1rem',
                      color: '#112F33'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = '#29A98C'
                      e.target.style.color = 'white'
                      e.target.style.transform = 'translateY(-2px)'
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = 'rgba(41, 169, 140, 0.1)'
                      e.target.style.color = '#112F33'
                      e.target.style.transform = 'translateY(0)'
                    }}
                  >
                    <strong>🏥 Aplicación Local</strong>
                    <p style={{ margin: '10px 0 0 0', fontSize: '0.9rem', opacity: '0.8' }}>
                      El paciente completa la evaluación en el consultorio
                    </p>
                  </button>
                  
                  <button
                    onClick={() => selectApplicationMode('remote')}
                    style={{
                      flex: '1',
                      minWidth: '200px',
                      padding: '20px',
                      backgroundColor: 'rgba(41, 169, 140, 0.1)',
                      border: '2px solid #29A98C',
                      borderRadius: '15px',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      fontSize: '1rem',
                      color: '#112F33'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = '#29A98C'
                      e.target.style.color = 'white'
                      e.target.style.transform = 'translateY(-2px)'
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = 'rgba(41, 169, 140, 0.1)'
                      e.target.style.color = '#112F33'
                      e.target.style.transform = 'translateY(0)'
                    }}
                  >
                    <strong>🌐 Aplicación a Distancia</strong>
                    <p style={{ margin: '10px 0 0 0', fontSize: '0.9rem', opacity: '0.8' }}>
                      El paciente completa la evaluación desde casa
                    </p>
                  </button>
                </div>
              </div>
            )}

            {/* Bienvenida */}
            {showWelcome && applicationMode !== '' && (
              <div style={{
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)',
                borderRadius: '20px',
                padding: '40px 30px',
                margin: '20px 0',
                boxShadow: '0 15px 35px rgba(0, 0, 0, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}>
                <h1 style={{ 
                  color: '#29A98C', 
                  textAlign: 'center', 
                  marginBottom: '10px', 
                  fontSize: '2rem', 
                  fontWeight: '300' 
                }}>
                  GADI
                </h1>
                <p style={{ 
                  color: '#112F33', 
                  textAlign: 'center', 
                  marginBottom: '30px', 
                  fontSize: '1.1rem', 
                  fontWeight: '400' 
                }}>
                  Inventario de Ansiedad Generalizada
                </p>
                
                <div style={{
                  background: 'rgba(41, 169, 140, 0.1)',
                  padding: '20px',
                  borderRadius: '15px',
                  marginBottom: '30px',
                  borderLeft: '4px solid #29A98C',
                  fontSize: '1rem',
                  lineHeight: '1.6'
                }}>
                  <p style={{ margin: '0 0 15px 0', color: '#112F33' }}>
                    Este cuestionario evalúa síntomas de ansiedad generalizada experimentados en las últimas dos semanas.
                  </p>
                  <p style={{ margin: '0', color: '#112F33' }}>
                    <strong>Tiempo estimado:</strong> 2-5 minutos<br/>
                    <strong>Preguntas:</strong> 22 ítems<br/>
                    <strong>Paciente:</strong> {currentPatient || 'Evaluación anónima'}
                  </p>
                </div>
                
                <div style={{ textAlign: 'center' }}>
                  <button
                    onClick={startQuestionnaire}
                    style={{
                      backgroundColor: '#29A98C',
                      color: 'white',
                      border: 'none',
                      borderRadius: '25px',
                      padding: '15px 40px',
                      fontSize: '1.1rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      boxShadow: '0 5px 15px rgba(41, 169, 140, 0.3)'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'translateY(-2px)'
                      e.target.style.boxShadow = '0 8px 25px rgba(41, 169, 140, 0.4)'
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'translateY(0)'
                      e.target.style.boxShadow = '0 5px 15px rgba(41, 169, 140, 0.3)'
                    }}
                  >
                    Comenzar GADI
                  </button>
                </div>
              </div>
            )}

            {/* Cuestionario GADI */}
            {!showWelcome && !showCompletionCard && (
              <div style={{
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)',
                borderRadius: '20px',
                padding: '30px',
                margin: '20px 0',
                boxShadow: '0 15px 35px rgba(0, 0, 0, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}>
                <div style={{
                  background: 'linear-gradient(135deg, #29A98C, #112F33)',
                  color: 'white',
                  padding: '15px 25px',
                  borderRadius: '15px',
                  display: 'inline-block',
                  fontWeight: '600',
                  marginBottom: '25px',
                  fontSize: '1.1rem'
                }}>
                  Pregunta {currentQuestionIndex + 1} de {gadiQuestions.length}
                </div>
                
                <div style={{
                  fontSize: '1.3rem',
                  color: '#112F33',
                  marginBottom: '30px',
                  lineHeight: '1.5',
                  fontWeight: '500'
                }}>
                  {gadiQuestions[currentQuestionIndex]}
                </div>
                
                <div style={{ display: 'grid', gap: '15px' }}>
                  {gadiOptions.map((option, index) => (
                    <div
                      key={index}
                      onClick={() => handleGadiResponse(currentQuestionIndex, option.value)}
                      style={{
                        background: gadiResponses[currentQuestionIndex] === option.value ? 
                          'linear-gradient(135deg, #29A98C, #112F33)' : '#FFF8EE',
                        color: gadiResponses[currentQuestionIndex] === option.value ? 'white' : '#112F33',
                        border: `2px solid ${gadiResponses[currentQuestionIndex] === option.value ? '#29A98C' : '#e0e0e0'}`,
                        borderRadius: '12px',
                        padding: '18px',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        fontSize: '1.1rem',
                        position: 'relative',
                        overflow: 'hidden'
                      }}
                      onMouseEnter={(e) => {
                        if (gadiResponses[currentQuestionIndex] !== option.value) {
                          e.target.style.borderColor = '#29A98C'
                          e.target.style.transform = 'translateY(-2px)'
                          e.target.style.boxShadow = '0 5px 15px rgba(41, 169, 140, 0.2)'
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (gadiResponses[currentQuestionIndex] !== option.value) {
                          e.target.style.borderColor = '#e0e0e0'
                          e.target.style.transform = 'translateY(0)'
                          e.target.style.boxShadow = 'none'
                        }
                      }}
                    >
                      {option.label}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tarjeta de Finalización */}
            {showCompletionCard && (
              <div style={{
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)',
                borderRadius: '20px',
                padding: '40px 30px',
                margin: '20px 0',
                boxShadow: '0 15px 35px rgba(0, 0, 0, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                textAlign: 'center'
              }}>
                <div style={{
                  background: 'linear-gradient(135deg, #29A98C, #112F33)',
                  color: 'white',
                  padding: '20px',
                  borderRadius: '15px',
                  marginBottom: '25px'
                }}>
                  <h1 style={{ fontSize: '1.8rem', marginBottom: '10px', fontWeight: '600' }}>
                    ✓ GADI Completado
                  </h1>
                  <p style={{ fontSize: '1rem', opacity: '0.9', margin: 0 }}>
                    Muchas gracias por completar la evaluación
                  </p>
                </div>
                
                <div style={{
                  background: 'rgba(41, 169, 140, 0.1)',
                  padding: '20px',
                  borderRadius: '15px',
                  marginBottom: '25px',
                  borderLeft: '4px solid #29A98C'
                }}>
                  <h3 style={{ color: '#112F33', marginBottom: '15px', fontSize: '1.2rem' }}>
                    Evaluación finalizada
                  </h3>
                  <p style={{ color: '#112F33', margin: '0 0 10px 0', lineHeight: '1.6' }}>
                    <strong>Por favor, pase el dispositivo a su médico o profesional de la salud</strong> para la revisión e interpretación de los resultados.
                  </p>
                  <p style={{ color: '#112F33', margin: 0, lineHeight: '1.6' }}>
                    Los resultados de esta escala deben ser interpretados por un profesional capacitado en el contexto de una evaluación clínica completa.
                  </p>
                </div>
                
                <button
                  onClick={showGenericResults}
                  style={{
                    backgroundColor: '#29A98C',
                    color: 'white',
                    border: 'none',
                    borderRadius: '25px',
                    padding: '15px 30px',
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 5px 15px rgba(41, 169, 140, 0.3)'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-2px)'
                    e.target.style.boxShadow = '0 8px 25px rgba(41, 169, 140, 0.4)'
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)'
                    e.target.style.boxShadow = '0 5px 15px rgba(41, 169, 140, 0.3)'
                  }}
                >
                  Revisar Resultados (Médico)
                </button>
              </div>
            )}

            {/* Botón de regresar */}
            {!showWelcome && !showCompletionCard && (
              <div style={{
                position: 'fixed',
                bottom: '20px',
                right: '20px',
                zIndex: 1000
              }}>
                <button
                  onClick={goBackGADI}
                  style={{
                    background: 'linear-gradient(135deg, #29A98C, #112F33)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '50px',
                    padding: '15px 20px',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.2)',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-2px)'
                    e.target.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.3)'
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)'
                    e.target.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.2)'
                  }}
                >
                  ← Regresar
                </button>
              </div>
            )}

            {/* Barra de progreso */}
            <div style={{
              position: 'fixed',
              bottom: 0,
              left: 0,
              width: '100%',
              height: '6px',
              background: 'rgba(255, 255, 255, 0.2)',
              zIndex: 1000
            }}>
              <div style={{
                height: '100%',
                background: 'linear-gradient(90deg, #29A98C, #112F33)',
                width: `${((currentQuestionIndex + 1) / (gadiQuestions.length + 1)) * 100}%`,
                transition: 'width 0.3s ease'
              }}></div>
            </div>
          </div>
        </div>
      )}

      {/* GADI Results Page */}
      {currentPage === 'gadi-results' && isAuthenticated && (
        <div style={{ 
          background: 'linear-gradient(135deg, #29A98C 0%, #112F33 100%)', 
          minHeight: '100vh', 
          padding: '20px',
          fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif'
        }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)',
              borderRadius: '20px',
              padding: '40px',
              margin: '20px 0',
              boxShadow: '0 15px 35px rgba(0, 0, 0, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}>
              <div style={{
                background: 'linear-gradient(135deg, #29A98C, #112F33)',
                color: 'white',
                padding: '20px',
                borderRadius: '15px',
                textAlign: 'center',
                marginBottom: '25px'
              }}>
                <h1 style={{ fontSize: '1.8rem', marginBottom: '10px', fontWeight: '600' }}>
                  Resultados GADI
                </h1>
                <p style={{ fontSize: '1rem', opacity: '0.9', margin: 0 }}>
                  Inventario de Ansiedad Generalizada
                </p>
              </div>

              {(() => {
                const result = calculateGadiScore()
                const interpretation = getGadiDetailedInterpretation(result)
                const alerts = checkGadiClinicalAlerts()

                return (
                  <>
                    {/* Puntuación Total */}
                    <div style={{
                      background: 'linear-gradient(135deg, #29A98C, #112F33)',
                      color: 'white',
                      padding: '25px',
                      borderRadius: '15px',
                      textAlign: 'center',
                      marginBottom: '25px'
                    }}>
                      <h2 style={{ fontSize: '2.5rem', margin: '0 0 10px 0', fontWeight: 'bold' }}>
                        {result.total}/88
                      </h2>
                      <p style={{ fontSize: '1.2rem', margin: 0, opacity: '0.9' }}>
                        Puntuación Total
                      </p>
                    </div>

                    {/* Interpretación */}
                    <div style={{
                      background: '#FFF8EE',
                      padding: '25px',
                      borderRadius: '15px',
                      marginBottom: '25px',
                      borderLeft: '4px solid #29A98C'
                    }}>
                      <h3 style={{ 
                        color: '#112F33', 
                        marginBottom: '15px', 
                        fontSize: '1.4rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px'
                      }}>
                        Interpretación Clínica
                        <span style={{
                          background: interpretation.color,
                          color: 'white',
                          padding: '5px 15px',
                          borderRadius: '20px',
                          fontSize: '0.9rem',
                          fontWeight: '600'
                        }}>
                          {interpretation.title.split(' ')[2]} {/* Extrae "Severa", "Moderada", etc. */}
                        </span>
                      </h3>
                      <p style={{ color: '#112F33', lineHeight: '1.6', marginBottom: '15px' }}>
                        {interpretation.description}
                      </p>
                      <p style={{ color: '#112F33', lineHeight: '1.6', fontWeight: '600' }}>
                        <strong>Recomendaciones:</strong> {interpretation.recommendations}
                      </p>
                    </div>

                    {/* Puntuaciones por Factor */}
                    <div style={{ 
                      display: 'grid', 
                      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
                      gap: '20px', 
                      marginBottom: '25px' 
                    }}>
                      <div style={{
                        background: '#FFF8EE',
                        padding: '20px',
                        borderRadius: '12px',
                        borderLeft: '4px solid #29A98C'
                      }}>
                        <h4 style={{ 
                          color: '#112F33', 
                          marginBottom: '10px', 
                          fontSize: '1.2rem',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between'
                        }}>
                          Síntomas Cognitivos
                          <span style={{ fontSize: '1rem', fontWeight: 'normal' }}>
                            {result.cognitive}/36
                          </span>
                        </h4>
                        <p style={{ color: '#112F33', fontSize: '0.95rem', lineHeight: '1.5', margin: 0 }}>
                          {interpretation.factorInterpretations.cognitive}
                        </p>
                      </div>

                      <div style={{
                        background: '#FFF8EE',
                        padding: '20px',
                        borderRadius: '12px',
                        borderLeft: '4px solid #29A98C'
                      }}>
                        <h4 style={{ 
                          color: '#112F33', 
                          marginBottom: '10px', 
                          fontSize: '1.2rem',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between'
                        }}>
                          Síntomas Somáticos
                          <span style={{ fontSize: '1rem', fontWeight: 'normal' }}>
                            {result.somatic}/44
                          </span>
                        </h4>
                        <p style={{ color: '#112F33', fontSize: '0.95rem', lineHeight: '1.5', margin: 0 }}>
                          {interpretation.factorInterpretations.somatic}
                        </p>
                      </div>

                      <div style={{
                        background: '#FFF8EE',
                        padding: '20px',
                        borderRadius: '12px',
                        borderLeft: '4px solid #29A98C'
                      }}>
                        <h4 style={{ 
                          color: '#112F33', 
                          marginBottom: '10px', 
                          fontSize: '1.2rem',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between'
                        }}>
                          Alteraciones del Sueño
                          <span style={{ fontSize: '1rem', fontWeight: 'normal' }}>
                            {result.sleep}/8
                          </span>
                        </h4>
                        <p style={{ color: '#112F33', fontSize: '0.95rem', lineHeight: '1.5', margin: 0 }}>
                          {interpretation.factorInterpretations.sleep}
                        </p>
                      </div>
                    </div>

                    {/* Alertas Clínicas */}
                    {alerts.length > 0 && (
                      <div style={{
                        background: '#fee5e5',
                        border: '1px solid #f56565',
                        padding: '20px',
                        borderRadius: '12px',
                        marginBottom: '25px'
                      }}>
                        <h4 style={{ color: '#742a2a', marginBottom: '15px', fontSize: '1.2rem' }}>
                          ⚠️ Síntomas de Atención Prioritaria
                        </h4>
                        {alerts.map((alert, index) => (
                          <div key={index} style={{ marginBottom: '10px' }}>
                            <h5 style={{ color: '#742a2a', margin: '0 0 5px 0', fontSize: '1rem' }}>
                              {alert.title}
                            </h5>
                            <p style={{ color: '#742a2a', margin: 0, fontSize: '0.9rem', lineHeight: '1.5' }}>
                              {alert.message}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Información Técnica */}
                    <div style={{
                      background: '#FFF8EE',
                      padding: '20px',
                      borderRadius: '12px',
                      marginBottom: '25px',
                      borderLeft: '4px solid #29A98C'
                    }}>
                      <h4 style={{ color: '#112F33', marginBottom: '15px', fontSize: '1.2rem' }}>
                        Información Técnica del GADI
                      </h4>
                      <div style={{ color: '#112F33', fontSize: '0.9rem', lineHeight: '1.6' }}>
                        <p style={{ margin: '0 0 10px 0' }}>
                          <strong>Estructura factorial:</strong> El GADI evalúa tres dimensiones principales de la ansiedad generalizada
                        </p>
                        <ul style={{ margin: '0 0 10px 0', paddingLeft: '20px' }}>
                          <li><strong>Síntomas Cognitivos:</strong> Preocupación excesiva, dificultad para controlar la ansiedad, temores específicos</li>
                          <li><strong>Síntomas Somáticos:</strong> Manifestaciones físicas como tensión muscular, fatiga, síntomas autonómicos</li>
                          <li><strong>Alteraciones del Sueño:</strong> Dificultades para conciliar el sueño y despertares nocturnos</li>
                        </ul>
                        <p style={{ margin: '0 0 5px 0' }}>
                          <strong>Confiabilidad:</strong> α = .928 (excelente consistencia interna)
                        </p>
                        <p style={{ margin: '0 0 5px 0' }}>
                          <strong>Periodo evaluado:</strong> Síntomas experimentados en las últimas dos semanas
                        </p>
                        <p style={{ margin: 0 }}>
                          <strong>Puntos de corte:</strong> ≥23 pueden indicar sintomatología clínicamente significativa
                        </p>
                      </div>
                    </div>

                    {/* Botones de Acción */}
                    <div style={{ 
                      display: 'flex', 
                      flexWrap: 'wrap', 
                      gap: '15px', 
                      justifyContent: 'center' 
                    }}>
                      <button
                        onClick={() => {
                          exportToPDF(result, interpretation, 'GADI', gadiResponses, gadiQuestions)
                        }}
                        style={{
                          backgroundColor: '#29A98C',
                          color: 'white',
                          border: 'none',
                          borderRadius: '12px',
                          padding: '12px 25px',
                          fontSize: '1rem',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          fontWeight: '600'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.transform = 'translateY(-2px)'
                          e.target.style.boxShadow = '0 5px 15px rgba(41, 169, 140, 0.3)'
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.transform = 'translateY(0)'
                          e.target.style.boxShadow = 'none'
                        }}
                      >
                        📄 Exportar PDF
                      </button>
                      
                      <button
                        onClick={() => {
                          setCurrentScale(null)
                          setGadiResponses({})
                          setCurrentQuestionIndex(0)
                          setShowWelcome(true)
                          setShowCompletionCard(false)
                          setCurrentPage('dashboard')
                        }}
                        style={{
                          backgroundColor: '#6c757d',
                          color: 'white',
                          border: 'none',
                          borderRadius: '12px',
                          padding: '12px 25px',
                          fontSize: '1rem',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          fontWeight: '600'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.transform = 'translateY(-2px)'
                          e.target.style.boxShadow = '0 5px 15px rgba(108, 117, 125, 0.3)'
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.transform = 'translateY(0)'
                          e.target.style.boxShadow = 'none'
                        }}
                      >
                        🔄 Nueva Evaluación
                      </button>
                    </div>
                  </>
                )
              })()}
            </div>
          </div>
        </div>
      )}

      {/* Generic Scale Page */}
      {currentPage === 'scale' && isAuthenticated && currentScaleConfig && (
        <div style={{ 
          background: 'linear-gradient(135deg, #29A98C 0%, #112F33 100%)', 
          minHeight: '100vh', 
          padding: '20px',
          fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif'
        }}>
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            {/* Tarjeta del Profesional - Configuración de Evaluación (Solo si no viene del flujo nuevo) */}
            {showProfessionalCard && !applicationMode && (
              <div style={{
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)',
                borderRadius: '20px',
                padding: '40px 30px',
                margin: '20px 0',
                boxShadow: '0 15px 35px rgba(0, 0, 0, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                textAlign: 'center'
              }}>
                <div style={{
                  background: 'linear-gradient(135deg, #29A98C, #112F33)',
                  color: 'white',
                  padding: '20px',
                  borderRadius: '15px',
                  marginBottom: '25px'
                }}>
                  <h1 style={{ fontSize: '1.8rem', marginBottom: '10px', fontWeight: '600' }}>
                    🩺 Configuración de Evaluación
                  </h1>
                  <p style={{ fontSize: '1rem', opacity: '0.9', margin: 0 }}>
                    Configure los parámetros antes de entregar al paciente
                  </p>
                </div>

                {/* Información de la escala */}
                <div style={{
                  background: '#FFF8EE',
                  padding: '20px',
                  borderRadius: '15px',
                  marginBottom: '25px',
                  borderLeft: '4px solid #29A98C'
                }}>
                  <h3 style={{ color: '#112F33', marginBottom: '15px', fontSize: '1.3rem', fontWeight: '600' }}>
                    {currentScaleConfig.fullName} ({currentScaleConfig.name})
                  </h3>
                  <p style={{ color: '#112F33', fontSize: '1rem', lineHeight: '1.5', marginBottom: '15px' }}>
                    {currentScaleConfig.description}
                  </p>
                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', 
                    gap: '10px'
                  }}>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '0.9rem', color: '#29A98C', marginBottom: '2px' }}>📊</div>
                      <div style={{ fontSize: '0.75rem', fontWeight: '600', color: '#112F33' }}>
                        {currentScaleConfig.questions.length} preguntas
                      </div>
                      <div style={{ fontSize: '0.65rem', color: '#6b7280' }}>Total de ítems</div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '0.9rem', color: '#29A98C', marginBottom: '2px' }}>⏱️</div>
                      <div style={{ fontSize: '0.75rem', fontWeight: '600', color: '#112F33' }}>
                        {currentScaleConfig.timeEstimate}
                      </div>
                      <div style={{ fontSize: '0.65rem', color: '#6b7280' }}>Duración estimada</div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '0.9rem', color: '#29A98C', marginBottom: '2px' }}>📈</div>
                      <div style={{ fontSize: '0.75rem', fontWeight: '600', color: '#112F33' }}>
                        {currentScaleConfig.scoreRange}
                      </div>
                      <div style={{ fontSize: '0.65rem', color: '#6b7280' }}>
                        Rango de puntuación
                        {currentScaleConfig.factors && (
                          <span style={{ color: '#29A98C', marginLeft: '8px' }}>
                            • {Object.keys(currentScaleConfig.factors).length} subescalas
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Búsqueda de pacientes */}
                <div style={{
                  background: 'rgba(41, 169, 140, 0.1)',
                  padding: '20px',
                  borderRadius: '15px',
                  marginBottom: '25px',
                  borderLeft: '4px solid #29A98C'
                }}>
                  <h3 style={{ color: '#112F33', marginBottom: '15px', fontSize: '1.2rem' }}>
                    👤 Identificación del Paciente
                  </h3>
                  <div style={{ position: 'relative' }}>
                    <input
                      type="text"
                      placeholder="Escriba el nombre del paciente..."
                      value={currentPatient}
                      onChange={(e) => {
                        setCurrentPatient(e.target.value)
                        searchPatients(e.target.value)
                      }}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        borderRadius: '10px',
                        border: '2px solid #e0e0e0',
                        fontSize: '1rem',
                        transition: 'all 0.3s ease',
                        outline: 'none'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#29A98C'
                        e.target.style.boxShadow = '0 0 0 3px rgba(41, 169, 140, 0.1)'
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = '#e0e0e0'
                        e.target.style.boxShadow = 'none'
                      }}
                    />
                    
                    {/* Sugerencias de pacientes */}
                    {showSuggestions && patientSuggestions.length > 0 && (
                      <div style={{
                        position: 'absolute',
                        top: '100%',
                        left: 0,
                        right: 0,
                        background: 'white',
                        borderRadius: '10px',
                        boxShadow: '0 5px 15px rgba(0, 0, 0, 0.2)',
                        border: '1px solid #e0e0e0',
                        zIndex: 1000,
                        maxHeight: '200px',
                        overflowY: 'auto'
                      }}>
                        {patientSuggestions.map((patient, index) => (
                          <div
                            key={patient.id}
                            onClick={() => selectPatientFromSuggestion(patient)}
                            style={{
                              padding: '12px 16px',
                              cursor: 'pointer',
                              borderBottom: index < patientSuggestions.length - 1 ? '1px solid #f0f0f0' : 'none',
                              transition: 'background-color 0.2s ease'
                            }}
                            onMouseEnter={(e) => e.target.style.backgroundColor = '#f8f9fa'}
                            onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
                          >
                            <div style={{ fontWeight: '600', color: '#112F33' }}>{patient.name}</div>
                            <div style={{ fontSize: '0.85rem', color: '#6b7280' }}>
                              {patient.diagnosis || 'Sin diagnóstico'} • {patient.evaluations?.length || 0} evaluaciones
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <p style={{ fontSize: '0.9rem', color: '#112F33', margin: '10px 0 0 0' }}>
                    Deje en blanco para evaluación anónima
                  </p>
                </div>

                {/* Selección de modo */}
                <div style={{
                  background: 'rgba(41, 169, 140, 0.1)',
                  padding: '20px',
                  borderRadius: '15px',
                  marginBottom: '25px',
                  borderLeft: '4px solid #29A98C'
                }}>
                  <h3 style={{ color: '#112F33', marginBottom: '15px', fontSize: '1.2rem' }}>
                    📍 Modo de Aplicación
                  </h3>
                  <div style={{ display: 'grid', gap: '10px' }}>
                    <div
                      onClick={() => selectApplicationMode('local')}
                      style={{
                        background: applicationMode === 'local' ? 'linear-gradient(135deg, #29A98C, #112F33)' : 'white',
                        color: applicationMode === 'local' ? 'white' : '#112F33',
                        border: `2px solid ${applicationMode === 'local' ? '#29A98C' : '#e0e0e0'}`,
                        borderRadius: '12px',
                        padding: '15px',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        textAlign: 'center'
                      }}
                      onMouseEnter={(e) => {
                        if (applicationMode !== 'local') {
                          e.target.style.borderColor = '#29A98C'
                          e.target.style.transform = 'translateY(-2px)'
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (applicationMode !== 'local') {
                          e.target.style.borderColor = '#e0e0e0'
                          e.target.style.transform = 'translateY(0)'
                        }
                      }}
                    >
                      <div style={{ fontSize: '1.5rem', marginBottom: '8px' }}>🏥</div>
                      <div style={{ fontWeight: '600', fontSize: '1.1rem', marginBottom: '5px' }}>
                        {currentScaleConfig?.applicationType === 'Heteroaplicada' ? 'Aplicación por Profesional' : 'En Consultorio'}
                      </div>
                      <div style={{ fontSize: '0.9rem', opacity: '0.8' }}>
                        {currentScaleConfig?.applicationType === 'Heteroaplicada' 
                          ? 'El profesional administra la escala al paciente'
                          : 'El paciente completa la escala con supervisión presencial'
                        }
                      </div>
                    </div>
                    
                    {/* Solo mostrar opción remota para escalas autoaplicadas */}
                    {currentScaleConfig?.applicationType !== 'Heteroaplicada' && (
                      <div
                        onClick={() => selectApplicationMode('remote')}
                        style={{
                          background: applicationMode === 'remote' ? 'linear-gradient(135deg, #29A98C, #112F33)' : 'white',
                          color: applicationMode === 'remote' ? 'white' : '#112F33',
                          border: `2px solid ${applicationMode === 'remote' ? '#29A98C' : '#e0e0e0'}`,
                          borderRadius: '12px',
                          padding: '15px',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          textAlign: 'center'
                        }}
                        onMouseEnter={(e) => {
                          if (applicationMode !== 'remote') {
                            e.target.style.borderColor = '#29A98C'
                            e.target.style.transform = 'translateY(-2px)'
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (applicationMode !== 'remote') {
                            e.target.style.borderColor = '#e0e0e0'
                            e.target.style.transform = 'translateY(0)'
                          }
                        }}
                      >
                        <div style={{ fontSize: '1.5rem', marginBottom: '8px' }}>🏠</div>
                        <div style={{ fontWeight: '600', fontSize: '1.1rem', marginBottom: '5px' }}>A Distancia</div>
                        <div style={{ fontSize: '0.9rem', opacity: '0.8' }}>El paciente completa la escala de forma remota</div>
                      </div>
                    )}
                  </div>
                </div>

                <button
                  onClick={startGenericQuestionnaire}
                  disabled={currentScaleConfig?.applicationType === 'Heteroaplicada' ? false : !applicationMode}
                  style={{
                    backgroundColor: (currentScaleConfig?.applicationType === 'Heteroaplicada' ? true : applicationMode) ? '#29A98C' : '#ccc',
                    color: 'white',
                    border: 'none',
                    borderRadius: '25px',
                    padding: '15px 30px',
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    cursor: !applicationMode ? 'not-allowed' : 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: !applicationMode ? 'none' : '0 5px 15px rgba(41, 169, 140, 0.3)'
                  }}
                  onMouseEnter={(e) => {
                    if (applicationMode) {
                      e.target.style.transform = 'translateY(-2px)'
                      e.target.style.boxShadow = '0 8px 25px rgba(41, 169, 140, 0.4)'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (applicationMode) {
                      e.target.style.transform = 'translateY(0)'
                      e.target.style.boxShadow = '0 5px 15px rgba(41, 169, 140, 0.3)'
                    }
                  }}
                >
                  {
                    currentScaleConfig?.applicationType === 'Heteroaplicada' 
                      ? '🏥 Iniciar Escala'
                      : (applicationMode === 'local' ? '👨‍⚕️ Entregar Dispositivo al Paciente' : '📱 Enviar Enlace al Paciente')
                  }
                </button>
              </div>
            )}

            {/* Tarjeta del Paciente - Instrucciones */}
            {showPatientInstructions && (
              <div style={{
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)',
                borderRadius: '20px',
                padding: '40px 30px',
                margin: '20px 0',
                boxShadow: '0 15px 35px rgba(0, 0, 0, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                textAlign: 'center'
              }}>
                <div style={{
                  background: 'linear-gradient(135deg, #29A98C, #112F33)',
                  color: 'white',
                  padding: '20px',
                  borderRadius: '15px',
                  marginBottom: '25px'
                }}>
                  <h1 style={{ fontSize: '1.8rem', marginBottom: '10px', fontWeight: '600' }}>
                    {currentScaleConfig.fullName}
                  </h1>
                  <p style={{ fontSize: '1rem', opacity: '0.9', margin: 0 }}>
                    {currentScaleConfig.name} - {currentScaleConfig.timeEstimate}
                  </p>
                </div>

                {/* Mensaje de bienvenida para el paciente */}
                <div style={{
                  background: 'rgba(41, 169, 140, 0.1)',
                  padding: '20px',
                  borderRadius: '15px',
                  marginBottom: '25px',
                  borderLeft: '4px solid #29A98C'
                }}>
                  <h3 style={{ color: '#112F33', marginBottom: '15px', fontSize: '1.3rem', fontWeight: '600' }}>
                    👋 Bienvenido/a
                  </h3>
                  <p style={{ color: '#112F33', fontSize: '1rem', lineHeight: '1.6', marginBottom: '15px' }}>
                    Está a punto de completar el <strong>{currentScaleConfig.fullName}</strong>. Esta evaluación consta de <strong>{currentScaleConfig.questions.length} preguntas</strong> y tomará aproximadamente <strong>{currentScaleConfig.timeEstimate}</strong>.
                  </p>
                  <p style={{ color: '#112F33', fontSize: '0.95rem', lineHeight: '1.6', margin: 0 }}>
                    Sus respuestas son confidenciales y serán revisadas únicamente por su profesional de la salud.
                  </p>
                </div>

                {/* Instrucciones detalladas */}
                <div style={{
                  background: '#FFF8EE',
                  padding: '20px',
                  borderRadius: '15px',
                  marginBottom: '25px',
                  borderLeft: '4px solid #29A98C'
                }}>
                  <h3 style={{ color: '#112F33', marginBottom: '15px', fontSize: '1.2rem' }}>
                    📋 Instrucciones
                  </h3>
                  <ul style={{ margin: 0, paddingLeft: '20px', color: '#112F33', lineHeight: '1.6', textAlign: 'left' }}>
                    {(() => {
                      // Manejar tanto arrays como strings en las instrucciones
                      const instructions = Array.isArray(currentScaleConfig.instructions) 
                        ? currentScaleConfig.instructions 
                        : [currentScaleConfig.instructions]
                      
                      return instructions.map((instruction, index) => (
                        <li key={index} style={{ marginBottom: '8px', fontSize: '0.95rem' }}>
                          {instruction}
                        </li>
                      ))
                    })()}
                  </ul>
                </div>

                {/* Información del paciente si está definido */}
                {currentPatient && (
                  <div style={{
                    background: 'rgba(41, 169, 140, 0.1)',
                    padding: '15px',
                    borderRadius: '12px',
                    marginBottom: '25px',
                    borderLeft: '4px solid #29A98C'
                  }}>
                    <p style={{ color: '#112F33', fontSize: '0.95rem', margin: 0 }}>
                      <strong>Evaluación para:</strong> {currentPatient}
                    </p>
                  </div>
                )}

                <button
                  onClick={startPatientQuestions}
                  style={{
                    backgroundColor: '#29A98C',
                    color: 'white',
                    border: 'none',
                    borderRadius: '25px',
                    padding: '15px 30px',
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 5px 15px rgba(41, 169, 140, 0.3)'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-2px)'
                    e.target.style.boxShadow = '0 8px 25px rgba(41, 169, 140, 0.4)'
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)'
                    e.target.style.boxShadow = '0 5px 15px rgba(41, 169, 140, 0.3)'
                  }}
                >
                  ✅ Entendido, Comenzar Evaluación
                </button>
              </div>
            )}

            {/* Preguntas Genéricas */}
            {!showWelcome && !showProfessionalCard && !showPatientInstructions && !showCompletionCard && (
              <div style={{
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)',
                borderRadius: '20px',
                padding: '40px 30px',
                margin: '20px 0',
                boxShadow: '0 15px 35px rgba(0, 0, 0, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}>
                <div style={{
                  background: 'linear-gradient(135deg, #29A98C, #112F33)',
                  color: 'white',
                  padding: '15px 25px',
                  borderRadius: '15px',
                  textAlign: 'center',
                  marginBottom: '30px',
                  fontSize: '1.1rem',
                  fontWeight: '600'
                }}>
                  Pregunta {currentQuestionIndex + 1} de {currentScaleConfig.questions.length}
                </div>
                
                <div style={{
                  fontSize: '1.3rem',
                  color: '#112F33',
                  marginBottom: '20px',
                  lineHeight: '1.5',
                  fontWeight: '500'
                }}>
                  {(() => {
                    const question = currentScaleConfig.questions[currentQuestionIndex]
                    if (typeof question === 'object') {
                      // Para Beck-21 (multiple-statements), mostrar el título
                      if (question.type === 'multiple-statements') {
                        return question.title
                      }
                      // Para otras escalas complejas, mostrar el texto
                      return question.text
                    }
                    // Para escalas simples, mostrar la pregunta directamente
                    return question
                  })()}
                </div>
                
                {/* Descripción adicional para preguntas complejas */}
                {typeof currentScaleConfig.questions[currentQuestionIndex] === 'object' && 
                 currentScaleConfig.questions[currentQuestionIndex].description && (
                  <div style={{
                    fontSize: '0.95rem',
                    color: '#666',
                    marginBottom: '25px',
                    padding: '12px',
                    background: 'rgba(41, 169, 140, 0.1)',
                    borderRadius: '10px',
                    lineHeight: '1.4'
                  }}>
                    {currentScaleConfig.questions[currentQuestionIndex].description}
                  </div>
                )}
                
                <div style={{ display: 'grid', gap: '15px' }}>
                  {(() => {
                    const currentQuestion = currentScaleConfig.questions[currentQuestionIndex]
                    
                    // Verificar si es una pregunta de porcentaje
                    if (typeof currentQuestion === 'object' && currentQuestion.type === 'percentage') {
                      const currentValue = scaleResponses[currentQuestionIndex + 1] || currentQuestion.defaultValue || 50
                      
                      return (
                        <div style={{ textAlign: 'center' }}>
                          {/* Display del valor actual */}
                          <div style={{
                            fontSize: '2rem',
                            fontWeight: 'bold',
                            color: '#29A98C',
                            marginBottom: '20px'
                          }}>
                            {currentValue}%
                          </div>
                          
                          {/* Slider de porcentaje */}
                          <input
                            id={`percentage-slider-${currentQuestionIndex}`}
                            name={`percentage-question-${currentQuestionIndex}`}
                            type="range"
                            min={currentQuestion.min || 0}
                            max={currentQuestion.max || 100}
                            value={currentValue}
                            aria-label={`Porcentaje de disfunción: ${currentValue}%`}
                            onChange={(e) => {
                              const value = parseInt(e.target.value)
                              setScaleResponses({
                                ...scaleResponses,
                                [currentQuestionIndex + 1]: value
                              })
                              // Actualizar display inmediatamente
                              e.target.parentElement.querySelector('div').textContent = `${value}%`
                            }}
                            style={{
                              width: '100%',
                              height: '8px',
                              borderRadius: '5px',
                              background: 'linear-gradient(90deg, #48bb78, #68d391, #f6ad55, #f56565)',
                              outline: 'none',
                              appearance: 'none',
                              WebkitAppearance: 'none',
                              cursor: 'pointer',
                              marginBottom: '15px'
                            }}
                            className="percentage-slider"
                          />
                          
                          {/* Etiquetas del slider */}
                          {currentQuestion.labels && (
                            <div style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              fontSize: '0.9rem',
                              color: '#112F33',
                              marginBottom: '25px'
                            }}>
                              <span>{currentQuestion.labels.min}</span>
                              <span>{currentQuestion.labels.max}</span>
                            </div>
                          )}
                          
                          {/* Botón continuar */}
                          <button
                            onClick={() => {
                              if (scaleResponses[currentQuestionIndex + 1] === undefined) {
                                setScaleResponses({
                                  ...scaleResponses,
                                  [currentQuestionIndex + 1]: currentValue
                                })
                              }
                              handleScaleResponse(currentQuestionIndex, scaleResponses[currentQuestionIndex + 1] || currentValue)
                            }}
                            style={{
                              backgroundColor: '#29A98C',
                              color: 'white',
                              border: 'none',
                              borderRadius: '25px',
                              padding: '15px 30px',
                              fontSize: '1.1rem',
                              fontWeight: '600',
                              cursor: 'pointer',
                              transition: 'all 0.3s ease',
                              boxShadow: '0 5px 15px rgba(41, 169, 140, 0.3)'
                            }}
                            onMouseEnter={(e) => {
                              e.target.style.transform = 'translateY(-2px)'
                              e.target.style.boxShadow = '0 8px 25px rgba(41, 169, 140, 0.4)'
                            }}
                            onMouseLeave={(e) => {
                              e.target.style.transform = 'translateY(0)'
                              e.target.style.boxShadow = '0 5px 15px rgba(41, 169, 140, 0.3)'
                            }}
                          >
                            Continuar
                          </button>
                        </div>
                      )
                    }
                    
                    // Verificar si es una pregunta con declaraciones múltiples (Beck-21)
                    if (typeof currentQuestion === 'object' && currentQuestion.type === 'multiple-statements') {
                      return currentQuestion.statements.map((statement, index) => (
                        <div
                          key={index}
                          onClick={() => handleScaleResponse(currentQuestionIndex, statement.value)}
                          style={{
                            background: scaleResponses[currentQuestionIndex + 1] === statement.value ? 
                              'linear-gradient(135deg, #29A98C, #112F33)' : '#FFF8EE',
                            color: scaleResponses[currentQuestionIndex + 1] === statement.value ? 'white' : '#112F33',
                            border: `2px solid ${scaleResponses[currentQuestionIndex + 1] === statement.value ? '#29A98C' : '#e0e0e0'}`,
                            borderRadius: '12px',
                            padding: '18px',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            fontSize: '1rem',
                            lineHeight: '1.4',
                            position: 'relative',
                            overflow: 'hidden',
                            textAlign: 'left'
                          }}
                          onMouseEnter={(e) => {
                            if (scaleResponses[currentQuestionIndex + 1] !== statement.value) {
                              e.target.style.borderColor = '#29A98C'
                              e.target.style.transform = 'translateY(-2px)'
                              e.target.style.boxShadow = '0 5px 15px rgba(41, 169, 140, 0.2)'
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (scaleResponses[currentQuestionIndex + 1] !== statement.value) {
                              e.target.style.borderColor = '#e0e0e0'
                              e.target.style.transform = 'translateY(0)'
                              e.target.style.boxShadow = 'none'
                            }
                          }}
                        >
                          {statement.text}
                        </div>
                      ))
                    }
                    
                    // Verificar si es escala con opciones visuales (colores y emojis)
                    if (currentScaleConfig.visualOptions && (currentScaleConfig.id === 'aq-child' || currentScaleConfig.id === 'aq-adolescent')) {
                      return currentScaleConfig.options.map((option, index) => (
                        <div
                          key={index}
                          onClick={() => handleScaleResponse(currentQuestionIndex, option.value)}
                          style={{
                            background: scaleResponses[currentQuestionIndex + 1] === option.value ? 
                              'linear-gradient(135deg, #29A98C, #112F33)' : option.color,
                            color: scaleResponses[currentQuestionIndex + 1] === option.value ? 'white' : option.textColor,
                            border: `2px solid ${scaleResponses[currentQuestionIndex + 1] === option.value ? '#29A98C' : 'transparent'}`,
                            borderRadius: '15px',
                            padding: '20px',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            fontSize: '1rem',
                            fontWeight: '500',
                            position: 'relative',
                            overflow: 'hidden',
                            textAlign: 'center',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px'
                          }}
                          onMouseEnter={(e) => {
                            if (scaleResponses[currentQuestionIndex + 1] !== option.value) {
                              e.target.style.transform = 'translateY(-2px)'
                              e.target.style.boxShadow = '0 8px 25px rgba(41, 169, 140, 0.15)'
                              e.target.style.borderColor = '#29A98C'
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (scaleResponses[currentQuestionIndex + 1] !== option.value) {
                              e.target.style.transform = 'translateY(0)'
                              e.target.style.boxShadow = 'none'
                              e.target.style.borderColor = 'transparent'
                            }
                          }}
                        >
                          <span style={{ fontSize: '1.2rem', marginRight: '8px' }}>
                            {option.emoji}
                          </span>
                          <span>{option.text}</span>
                        </div>
                      ))
                    }

                    // Determinar qué opciones usar para escalas especiales
                    let optionsToUse = currentScaleConfig.options
                    
                    // Debug: Log para verificar opciones
                    console.log('Scale ID:', currentScaleConfig.id)
                    console.log('Scale options:', currentScaleConfig.options)
                    console.log('Options to use:', optionsToUse)
                    
                    if (currentScaleConfig.id === 'mos-sleep') {
                      const question = currentScaleConfig.questions[currentQuestionIndex]
                      
                      if (currentQuestionIndex === 0) { // Latencia del sueño
                        optionsToUse = currentScaleConfig.specialOptions.latency
                      } else if (question.isHours) { // Horas de sueño
                        optionsToUse = currentScaleConfig.specialOptions.hours
                      } else if (question.isSnoring) { // Ronquidos
                        optionsToUse = currentScaleConfig.specialOptions.snoring
                      } else if (question.isReversed) { // Sueño suficiente (invertida)
                        optionsToUse = currentScaleConfig.specialOptions.adequacy
                      }
                    } else if (currentScaleConfig.id === 'bls-23') {
                      // Para BLS-23, usar opciones específicas según el tipo de pregunta
                      if (typeof currentQuestion === 'object' && currentQuestion.type === 'behavioral') {
                        optionsToUse = currentScaleConfig.specialOptions.behavioral
                      }
                      // Para preguntas afectivas usa las opciones por defecto
                    }
                    
                    // Validación de seguridad para opciones
                    if (!optionsToUse || !Array.isArray(optionsToUse) || optionsToUse.length === 0) {
                      console.error('No options available for scale:', currentScaleConfig.id)
                      return (
                        <div style={{ 
                          padding: '20px', 
                          textAlign: 'center', 
                          color: '#ef4444',
                          backgroundColor: '#fef2f2',
                          borderRadius: '8px',
                          border: '1px solid #fecaca'
                        }}>
                          Error: No hay opciones de respuesta disponibles para esta escala.
                          <br />
                          <small>Scale ID: {currentScaleConfig.id}</small>
                        </div>
                      )
                    }
                    
                    // Renderizar opciones normales
                    return optionsToUse.map((option, index) => {
                      const optionId = `scale-${currentScaleConfig.id}-q${currentQuestionIndex}-option${index}`
                      const isSelected = scaleResponses[currentQuestionIndex + 1] === option.value
                      
                      return (
                      <label
                        key={index}
                        htmlFor={optionId}
                        style={{
                          background: scaleResponses[currentQuestionIndex + 1] === option.value ? 
                            'linear-gradient(135deg, #29A98C, #112F33)' : '#FFF8EE',
                          color: scaleResponses[currentQuestionIndex + 1] === option.value ? 'white' : '#112F33',
                          border: `2px solid ${scaleResponses[currentQuestionIndex + 1] === option.value ? '#29A98C' : '#e0e0e0'}`,
                          borderRadius: '12px',
                          padding: '18px',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          fontSize: '1.1rem',
                          position: 'relative',
                          overflow: 'hidden'
                        }}
                        onMouseEnter={(e) => {
                          if (scaleResponses[currentQuestionIndex + 1] !== option.value) {
                            e.target.style.borderColor = '#29A98C'
                            e.target.style.transform = 'translateY(-2px)'
                            e.target.style.boxShadow = '0 5px 15px rgba(41, 169, 140, 0.2)'
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (scaleResponses[currentQuestionIndex + 1] !== option.value) {
                            e.target.style.borderColor = '#e0e0e0'
                            e.target.style.transform = 'translateY(0)'
                            e.target.style.boxShadow = 'none'
                          }
                        }}
                      >
                        {/* Radio button oculto para accesibilidad */}
                        <input
                          type="radio"
                          id={optionId}
                          name={`question-${currentQuestionIndex}`}
                          value={option.value}
                          checked={isSelected}
                          onChange={() => handleScaleResponse(currentQuestionIndex, option.value)}
                          style={{ 
                            position: 'absolute',
                            opacity: 0,
                            width: 0,
                            height: 0
                          }}
                        />
                        {/* Emoji y texto */}
                        {option.emoji && (
                          <span style={{ fontSize: '1.2rem', marginRight: '8px' }}>
                            {option.emoji}
                          </span>
                        )}
                        <span>{option.text || option.label}</span>
                      </label>
                    )
                    })
                  })()}
                </div>
              </div>
            )}

            {/* Tarjeta de Finalización Genérica */}
            {showCompletionCard && (
              <div style={{
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)',
                borderRadius: '20px',
                padding: '40px 30px',
                margin: '20px 0',
                boxShadow: '0 15px 35px rgba(0, 0, 0, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                textAlign: 'center'
              }}>
                <div style={{
                  background: 'linear-gradient(135deg, #29A98C, #112F33)',
                  color: 'white',
                  padding: '20px',
                  borderRadius: '15px',
                  marginBottom: '25px'
                }}>
                  <h1 style={{ fontSize: '1.8rem', marginBottom: '10px', fontWeight: '600' }}>
                    ✓ {currentScaleConfig.name} Completado
                  </h1>
                  <p style={{ fontSize: '1rem', opacity: '0.9', margin: 0 }}>
                    Muchas gracias por completar la evaluación
                  </p>
                </div>
                
                {/* Mensaje específico según el modo de aplicación */}
                {applicationMode === 'local' ? (
                  <div style={{
                    background: 'rgba(41, 169, 140, 0.1)',
                    padding: '20px',
                    borderRadius: '15px',
                    marginBottom: '25px',
                    borderLeft: '4px solid #29A98C'
                  }}>
                    <h3 style={{ color: '#112F33', marginBottom: '15px', fontSize: '1.2rem' }}>
                      🏥 Evaluación Presencial Finalizada
                    </h3>
                    <p style={{ color: '#112F33', margin: '0 0 10px 0', lineHeight: '1.6' }}>
                      <strong>Por favor, pase el dispositivo a su médico o profesional de la salud</strong> para la revisión e interpretación de los resultados.
                    </p>
                    <p style={{ color: '#112F33', margin: 0, lineHeight: '1.6' }}>
                      Los resultados de esta escala deben ser interpretados por un profesional capacitado en el contexto de una evaluación clínica completa.
                    </p>
                  </div>
                ) : (
                  <div style={{
                    background: 'rgba(41, 169, 140, 0.1)',
                    padding: '20px',
                    borderRadius: '15px',
                    marginBottom: '25px',
                    borderLeft: '4px solid #29A98C'
                  }}>
                    <h3 style={{ color: '#112F33', marginBottom: '15px', fontSize: '1.2rem' }}>
                      🏠 Evaluación a Distancia Finalizada
                    </h3>
                    <p style={{ color: '#112F33', margin: '0 0 10px 0', lineHeight: '1.6' }}>
                      <strong>¡Muchas gracias por completar la evaluación!</strong> Sus respuestas han sido enviadas de forma segura a su profesional de la salud.
                    </p>
                    <p style={{ color: '#112F33', margin: '0 0 10px 0', lineHeight: '1.6' }}>
                      Su médico revisará los resultados y se pondrá en contacto con usted para discutir los hallazgos y próximos pasos.
                    </p>
                    <p style={{ color: '#112F33', margin: 0, lineHeight: '1.6', fontSize: '0.9rem', fontStyle: 'italic' }}>
                      Los resultados de esta escala deben ser interpretados por un profesional capacitado en el contexto de una evaluación clínica completa.
                    </p>
                  </div>
                )}
                
                {/* Botón específico según el modo */}
                {(applicationMode === 'local' || applicationMode === 'presencial') ? (
                  <button
                    onClick={showGenericResults}
                    style={{
                      backgroundColor: '#29A98C',
                      color: 'white',
                      border: 'none',
                      borderRadius: '25px',
                      padding: '15px 30px',
                      fontSize: '1.1rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      boxShadow: '0 5px 15px rgba(41, 169, 140, 0.3)'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'translateY(-2px)'
                      e.target.style.boxShadow = '0 8px 25px rgba(41, 169, 140, 0.4)'
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'translateY(0)'
                      e.target.style.boxShadow = '0 5px 15px rgba(41, 169, 140, 0.3)'
                    }}
                  >
                    👨‍⚕️ Revisar Resultados (Profesional)
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      // Para modo remoto, solo mostrar mensaje de confirmación
                      setCurrentScale(null)
                      setCurrentScaleConfig(null)
                      setScaleResponses({})
                      setPhq9Responses({})
                      setGadiResponses({})
                      setCurrentQuestionIndex(0)
                      setShowWelcome(true)
                      setShowProfessionalCard(true)
                      setShowPatientInstructions(false)
                      setShowCompletionCard(false)
                      setCurrentPage('dashboard')
                    }}
                    style={{
                      backgroundColor: '#6c757d',
                      color: 'white',
                      border: 'none',
                      borderRadius: '25px',
                      padding: '15px 30px',
                      fontSize: '1.1rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      boxShadow: '0 5px 15px rgba(108, 117, 125, 0.3)'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'translateY(-2px)'
                      e.target.style.boxShadow = '0 8px 25px rgba(108, 117, 125, 0.4)'
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'translateY(0)'
                      e.target.style.boxShadow = '0 5px 15px rgba(108, 117, 125, 0.3)'
                    }}
                  >
                    ✓ Finalizar y Cerrar
                  </button>
                )}
              </div>
            )}

            {/* Botón de regresar genérico */}
            {!showWelcome && !showProfessionalCard && !showPatientInstructions && !showCompletionCard && (
              <div style={{
                position: 'fixed',
                bottom: '20px',
                right: '20px',
                zIndex: 1000
              }}>
                <button
                  onClick={goBackGenericScale}
                  style={{
                    background: 'linear-gradient(135deg, #29A98C, #112F33)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '50px',
                    padding: '15px 20px',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.2)',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-2px)'
                    e.target.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.3)'
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)'
                    e.target.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.2)'
                  }}
                >
                  ← Regresar
                </button>
              </div>
            )}

            {/* Barra de progreso genérica */}
            <div style={{
              position: 'fixed',
              bottom: 0,
              left: 0,
              width: '100%',
              height: '6px',
              background: 'rgba(255, 255, 255, 0.2)',
              zIndex: 1000
            }}>
              <div style={{
                height: '100%',
                background: 'linear-gradient(90deg, #29A98C, #112F33)',
                width: `${((currentQuestionIndex + 1) / (currentScaleConfig.questions.length + 1)) * 100}%`,
                transition: 'width 0.3s ease'
              }}></div>
            </div>
          </div>
        </div>
      )}

      {/* Generic Scale Results Page */}
      {currentPage === 'generic-results' && isAuthenticated && currentScaleConfig && (
        <div style={{ 
          background: 'linear-gradient(135deg, #29A98C 0%, #112F33 100%)', 
          minHeight: '100vh', 
          padding: '20px',
          fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif'
        }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)',
              borderRadius: '20px',
              padding: '40px',
              margin: '20px 0',
              boxShadow: '0 15px 35px rgba(0, 0, 0, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}>
              <div style={{
                background: 'linear-gradient(135deg, #29A98C, #112F33)',
                color: 'white',
                padding: '20px',
                borderRadius: '15px',
                textAlign: 'center',
                marginBottom: '25px'
              }}>
                <h1 style={{ fontSize: '1.8rem', marginBottom: '10px', fontWeight: '600' }}>
                  Resultados {currentScaleConfig.name}
                </h1>
                <p style={{ fontSize: '1rem', opacity: '0.9', margin: 0 }}>
                  {currentScaleConfig.fullName}
                </p>
              </div>

              {(() => {
                // Usar scaleResponses para todas las escalas en el sistema genérico
                const responses = scaleResponses
                
                const result = currentScaleConfig.calculateScore(responses)
                const interpretation = currentScaleConfig.getInterpretation(result)
                const alerts = currentScaleConfig.checkAlerts(responses)

                return (
                  <>
                    {/* Puntuación Total */}
                    <div style={{
                      background: 'linear-gradient(135deg, #29A98C, #112F33)',
                      color: 'white',
                      padding: '25px',
                      borderRadius: '15px',
                      textAlign: 'center',
                      marginBottom: '25px'
                    }}>
                      <h2 style={{ fontSize: '2.5rem', margin: '0 0 10px 0', fontWeight: 'bold' }}>
                        {result.totalScore || result.total || 0}{currentScaleConfig.maxScore ? `/${currentScaleConfig.maxScore}` : ''}
                      </h2>
                      <p style={{ fontSize: '1.2rem', margin: 0, opacity: '0.9' }}>
                        Puntuación Total
                      </p>
                    </div>

                    {/* Interpretación */}
                    <div style={{
                      background: '#FFF8EE',
                      padding: '25px',
                      borderRadius: '15px',
                      marginBottom: '25px',
                      borderLeft: '4px solid #29A98C'
                    }}>
                      <h3 style={{ 
                        color: '#112F33', 
                        marginBottom: '15px', 
                        fontSize: '1.4rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px'
                      }}>
                        Interpretación Clínica
                        <span style={{
                          background: interpretation.color,
                          color: 'white',
                          padding: '5px 15px',
                          borderRadius: '20px',
                          fontSize: '0.9rem',
                          fontWeight: '600'
                        }}>
                          {result.severity}
                        </span>
                      </h3>
                      <p style={{ color: '#112F33', lineHeight: '1.6', marginBottom: '15px' }}>
                        {interpretation.description}
                      </p>
                      <p style={{ color: '#112F33', lineHeight: '1.6', fontWeight: '600' }}>
                        <strong>Recomendaciones:</strong> {interpretation.recommendations}
                      </p>
                    </div>

                    {/* Factores (solo para GADI) */}
                    {currentScaleConfig.factors && (
                      <div style={{ 
                        display: 'grid', 
                        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
                        gap: '20px', 
                        marginBottom: '25px' 
                      }}>
                        {Object.entries(currentScaleConfig.factors).map(([factorKey, factor]) => (
                          <div key={factorKey} style={{
                            background: '#FFF8EE',
                            padding: '20px',
                            borderRadius: '12px',
                            borderLeft: '4px solid #29A98C'
                          }}>
                            <h4 style={{ 
                              color: '#112F33', 
                              marginBottom: '10px', 
                              fontSize: '1.2rem',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between'
                            }}>
                              {factor.name}
                              <span style={{ fontSize: '1rem', fontWeight: 'normal' }}>
                                {result[factorKey]}/{factor.maxScore}
                              </span>
                            </h4>
                            <p style={{ color: '#112F33', fontSize: '0.95rem', lineHeight: '1.5', margin: 0 }}>
                              {interpretation.factorInterpretations?.[factorKey] || 'Evaluación disponible'}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Alertas Clínicas */}
                    {alerts.length > 0 && (
                      <div style={{
                        background: '#fee5e5',
                        border: '1px solid #f56565',
                        padding: '20px',
                        borderRadius: '12px',
                        marginBottom: '25px'
                      }}>
                        <h4 style={{ color: '#742a2a', marginBottom: '15px', fontSize: '1.2rem' }}>
                          ⚠️ Síntomas de Atención Prioritaria
                        </h4>
                        {alerts.map((alert, index) => (
                          <div key={index} style={{ marginBottom: '10px' }}>
                            <h5 style={{ color: '#742a2a', margin: '0 0 5px 0', fontSize: '1rem' }}>
                              {alert.title}
                            </h5>
                            <p style={{ color: '#742a2a', margin: 0, fontSize: '0.9rem', lineHeight: '1.5' }}>
                              {alert.message}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Botones de Acción */}
                    <div style={{ 
                      display: 'flex', 
                      flexWrap: 'wrap', 
                      gap: '15px', 
                      justifyContent: 'center' 
                    }}>
                      <button
                        onClick={() => {
                          exportToPDF(result, interpretation, currentScaleConfig.name, responses, currentScaleConfig.questions)
                        }}
                        style={{
                          backgroundColor: '#29A98C',
                          color: 'white',
                          border: 'none',
                          borderRadius: '12px',
                          padding: '12px 25px',
                          fontSize: '1rem',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          fontWeight: '600'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.transform = 'translateY(-2px)'
                          e.target.style.boxShadow = '0 5px 15px rgba(41, 169, 140, 0.3)'
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.transform = 'translateY(0)'
                          e.target.style.boxShadow = 'none'
                        }}
                      >
                        📄 Exportar PDF
                      </button>
                      
                      <button
                        onClick={() => {
                          setCurrentScale(null)
                          setCurrentScaleConfig(null)
                          setScaleResponses({})
                          setPhq9Responses({})
                          setGadiResponses({})
                          setCurrentQuestionIndex(0)
                          setShowWelcome(true)
                          setShowProfessionalCard(true)
                          setShowPatientInstructions(false)
                          setShowCompletionCard(false)
                          setCurrentPage('dashboard')
                        }}
                        style={{
                          backgroundColor: '#6c757d',
                          color: 'white',
                          border: 'none',
                          borderRadius: '12px',
                          padding: '12px 25px',
                          fontSize: '1rem',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          fontWeight: '600'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.transform = 'translateY(-2px)'
                          e.target.style.boxShadow = '0 5px 15px rgba(108, 117, 125, 0.3)'
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.transform = 'translateY(0)'
                          e.target.style.boxShadow = 'none'
                        }}
                      >
                        🔄 Nueva Evaluación
                      </button>
                    </div>
                  </>
                )
              })()}
            </div>
          </div>
        </div>
      )}

      {/* ======================== SISTEMA GENÉRICO DE ESCALAS ======================== */}
      
      {/* Tarjeta 1: Modo de Aplicación */}
      {currentPage === 'application-mode' && isAuthenticated && currentScaleConfig && (
        <div style={{ 
          background: 'linear-gradient(135deg, #29A98C 0%, #112F33 100%)', 
          minHeight: '100vh', 
          padding: '20px',
          fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif'
        }}>
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)',
              borderRadius: '20px',
              padding: '40px',
              margin: '20px 0',
              boxShadow: '0 15px 35px rgba(0, 0, 0, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}>
              {/* Header */}
              <div style={{
                background: 'linear-gradient(135deg, #29A98C, #112F33)',
                color: 'white',
                padding: '20px',
                borderRadius: '15px',
                textAlign: 'center',
                marginBottom: '30px'
              }}>
                <h1 style={{ fontSize: '1.8rem', marginBottom: '10px', fontWeight: '600' }}>
                  {currentScaleConfig.name}
                </h1>
                <p style={{ fontSize: '1rem', opacity: '0.9', margin: 0 }}>
                  {currentScaleConfig.fullName}
                </p>
              </div>

              {/* Modo de Aplicación */}
              <div style={{ marginBottom: '30px' }}>
                <h3 style={{ 
                  color: '#112F33', 
                  marginBottom: '20px', 
                  fontSize: '1.4rem',
                  textAlign: 'center'
                }}>
                  ¿Cómo desea aplicar esta escala?
                </h3>
                
                <div style={{ display: 'grid', gap: '20px' }}>
                  {/* Opción Presencial */}
                  <div
                    onClick={() => {
                      setApplicationMode('presencial')
                      setCurrentPage('patient-selection')
                    }}
                    style={{
                      background: applicationMode === 'presencial' 
                        ? 'linear-gradient(135deg, #29A98C, #112F33)' 
                        : 'rgba(255, 255, 255, 0.8)',
                      color: applicationMode === 'presencial' ? 'white' : '#112F33',
                      border: '2px solid #29A98C',
                      borderRadius: '15px',
                      padding: '25px',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      textAlign: 'center'
                    }}
                  >
                    <div style={{ fontSize: '2rem', marginBottom: '10px' }}>🏥</div>
                    <h4 style={{ fontSize: '1.3rem', margin: '0 0 10px 0', fontWeight: '600' }}>
                      Presencial / En Consulta
                    </h4>
                    <p style={{ margin: 0, fontSize: '0.95rem', opacity: '0.9' }}>
                      El paciente responderá en este dispositivo o en dispositivo local
                    </p>
                  </div>

                  {/* Opción Remoto */}
                  <div
                    onClick={() => {
                      setApplicationMode('remoto')
                      setCurrentPage('patient-selection')
                    }}
                    style={{
                      background: applicationMode === 'remoto' 
                        ? 'linear-gradient(135deg, #29A98C, #112F33)' 
                        : 'rgba(255, 255, 255, 0.8)',
                      color: applicationMode === 'remoto' ? 'white' : '#112F33',
                      border: '2px solid #29A98C',
                      borderRadius: '15px',
                      padding: '25px',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      textAlign: 'center'
                    }}
                  >
                    <div style={{ fontSize: '2rem', marginBottom: '10px' }}>📱</div>
                    <h4 style={{ fontSize: '1.3rem', margin: '0 0 10px 0', fontWeight: '600' }}>
                      Remoto / A Distancia
                    </h4>
                    <p style={{ margin: 0, fontSize: '0.95rem', opacity: '0.9' }}>
                      Generar link para enviar por correo o mensaje al paciente
                    </p>
                  </div>
                </div>
              </div>

              {/* Botón Regresar */}
              <button
                onClick={() => setCurrentPage('dashboard')}
                style={{
                  background: 'rgba(255, 255, 255, 0.9)',
                  color: '#29A98C',
                  border: '2px solid #29A98C',
                  padding: '12px 25px',
                  borderRadius: '25px',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  fontWeight: '500',
                  width: '100%',
                  transition: 'all 0.3s ease'
                }}
              >
                ← Regresar al Dashboard
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tarjeta 2: Selección de Paciente */}
      {currentPage === 'patient-selection' && isAuthenticated && currentScaleConfig && (
        <div style={{ 
          background: 'linear-gradient(135deg, #29A98C 0%, #112F33 100%)', 
          minHeight: '100vh', 
          padding: '20px',
          fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif'
        }}>
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)',
              borderRadius: '20px',
              padding: '40px',
              margin: '20px 0',
              boxShadow: '0 15px 35px rgba(0, 0, 0, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}>
              {/* Header */}
              <div style={{
                background: 'linear-gradient(135deg, #29A98C, #112F33)',
                color: 'white',
                padding: '20px',
                borderRadius: '15px',
                textAlign: 'center',
                marginBottom: '30px'
              }}>
                <h1 style={{ fontSize: '1.8rem', marginBottom: '10px', fontWeight: '600' }}>
                  Seleccionar Paciente
                </h1>
                <p style={{ fontSize: '1rem', opacity: '0.9', margin: 0 }}>
                  {currentScaleConfig.name} - Modalidad: {applicationMode === 'presencial' ? '🏥 Presencial' : '📱 Remoto'}
                </p>
              </div>

              {/* Campo de búsqueda de paciente */}
              <div style={{ marginBottom: '25px' }}>
                <label style={{ 
                  display: 'block', 
                  color: '#112F33', 
                  fontWeight: '600', 
                  fontSize: '1.1rem',
                  marginBottom: '10px' 
                }}>
                  Nombre del Paciente
                </label>
                <input
                  type="text"
                  value={currentPatient}
                  onChange={(e) => {
                    setCurrentPatient(e.target.value)
                    if (e.target.value.length > 0) {
                      const filtered = patients.filter(patient =>
                        patient.name.toLowerCase().includes(e.target.value.toLowerCase())
                      )
                      setPatientSuggestions(filtered.slice(0, 5))
                      setShowSuggestions(filtered.length > 0)
                    } else {
                      setShowSuggestions(false)
                    }
                  }}
                  placeholder="Ingrese el nombre del paciente o deje vacío para 'Anónimo'"
                  style={{
                    width: '100%',
                    padding: '15px',
                    border: '2px solid #e0e0e0',
                    borderRadius: '10px',
                    fontSize: '1rem',
                    outline: 'none',
                    transition: 'border-color 0.3s ease'
                  }}
                />

                {/* Sugerencias de pacientes */}
                {showSuggestions && patientSuggestions.length > 0 && (
                  <div style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    right: 0,
                    background: 'white',
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px',
                    zIndex: 1000,
                    maxHeight: '200px',
                    overflowY: 'auto',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                  }}>
                    {patientSuggestions.map((patient, index) => (
                      <div
                        key={patient.id}
                        onClick={() => {
                          setCurrentPatient(patient.name)
                          setShowSuggestions(false)
                        }}
                        style={{
                          padding: '12px 15px',
                          cursor: 'pointer',
                          borderBottom: index < patientSuggestions.length - 1 ? '1px solid #f1f5f9' : 'none',
                          transition: 'background-color 0.2s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor = '#f8fafc'
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor = 'white'
                        }}
                      >
                        <div style={{ fontWeight: 'bold', color: '#112F33', marginBottom: '2px' }}>
                          {patient.name}
                        </div>
                        <div style={{ fontSize: '0.875rem', color: '#64748b' }}>
                          {patient.birthDate && `${calculateAge(patient.birthDate)} años`}
                          {patient.gender && ` • ${patient.gender}`}
                          {patient.diagnosis && ` • ${patient.diagnosis}`}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <p style={{ 
                  color: '#64748b', 
                  fontSize: '0.875rem', 
                  marginTop: '5px', 
                  marginBottom: 0 
                }}>
                  Si no se especifica un nombre, el reporte se generará como "Paciente Anónimo"
                </p>
              </div>

              {/* Botón Continuar */}
              <button
                onClick={() => {
                  // Ir directamente al sistema de escalas genérico
                  if (applicationMode === 'presencial') {
                    // Para modo presencial, mostrar instrucciones al paciente
                    setShowWelcome(true)
                    setShowProfessionalCard(false)
                    setShowPatientInstructions(true)
                    setCurrentPage('scale')
                  } else {
                    // Para modo remoto, generar link
                    alert('Función de generar link en desarrollo. Por ahora, continúe con modo presencial.')
                  }
                }}
                style={{
                  background: 'linear-gradient(135deg, #29A98C, #112F33)',
                  color: 'white',
                  border: 'none',
                  padding: '15px 30px',
                  borderRadius: '25px',
                  cursor: 'pointer',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  width: '100%',
                  marginBottom: '15px',
                  transition: 'all 0.3s ease'
                }}
              >
                {applicationMode === 'presencial' ? '➡️ Pasar Dispositivo a Paciente' : '📱 Generar Link de Evaluación'}
              </button>

              {/* Botón Regresar */}
              <button
                onClick={() => setCurrentPage('application-mode')}
                style={{
                  background: 'rgba(255, 255, 255, 0.9)',
                  color: '#29A98C',
                  border: '2px solid #29A98C',
                  padding: '12px 25px',
                  borderRadius: '25px',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  fontWeight: '500',
                  width: '100%',
                  transition: 'all 0.3s ease'
                }}
              >
                ← Regresar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* About Page */}
      {currentPage === 'about' && (
        <div style={{ padding: '3rem 1rem', minHeight: 'calc(100vh - 4rem)' }}>
          <div style={{ maxWidth: '56rem', margin: '0 auto', backgroundColor: '#FFF8EE', borderRadius: '0.5rem', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', padding: '2rem' }}>
            <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#112F33', marginBottom: '1.5rem', textAlign: 'center' }}>
              Acerca de Clinimetrix
            </h1>
            <div style={{ color: '#6b7280', lineHeight: '1.6', marginBottom: '2rem' }}>
              <p style={{ marginBottom: '1.5rem' }}>
                Clinimetrix utiliza escalas clinimetricas estandarizadas que ya existen, con base y fundamento científico comprobado, 
                de libre uso y reconocidas internacionalmente. Lo revolucionario no son las escalas en sí, sino la forma innovadora 
                de aplicarlas.
              </p>
              
              <p style={{ marginBottom: '1.5rem' }}>
                En lugar de usar papel o archivos de Excel, nuestras escalas son completamente automáticas, ofrecen resultados 
                inmediatos con una interfaz amigable y profesional para el paciente, incluyendo advertencias particulares 
                dependiendo de cada escala específica.
              </p>
              
              <p style={{ marginBottom: '1.5rem' }}>
                La plataforma permite guardar evaluaciones a lo largo del tiempo y visualizar el progreso del paciente después 
                de múltiples aplicaciones, proporcionando una herramienta invaluable para el seguimiento longitudinal. Además, 
                ofrece acceso rápido a la mayoría de las escalas más utilizadas en la práctica clínica real.
              </p>
              
              <div style={{ 
                backgroundColor: '#29A98C', 
                color: 'white', 
                padding: '1.5rem', 
                borderRadius: '8px', 
                marginBottom: '2rem' 
              }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>
                  Creado por un Profesional, para Profesionales
                </h3>
                <p>
                  Esta plataforma fue desarrollada por un psiquiatra con más de 10 años de experiencia en la clínica real 
                  con pacientes. Nace de una necesidad personal que ahora queremos compartir con nuestros colegas para 
                  mejorar la práctica clínica diaria.
                </p>
              </div>
              
              <h3 style={{ 
                fontSize: '1.5rem', 
                fontWeight: 'bold', 
                color: '#112F33', 
                marginBottom: '1rem' 
              }}>
                Beneficios Principales
              </h3>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
                <div style={{ 
                  backgroundColor: 'white', 
                  padding: '1.5rem', 
                  borderRadius: '8px', 
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' 
                }}>
                  <h4 style={{ color: '#29A98C', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                    🚀 Eficiencia Clínica
                  </h4>
                  <p style={{ fontSize: '0.9rem' }}>
                    Ahorra tiempo valioso en consulta con aplicación automática y resultados instantáneos
                  </p>
                </div>
                
                <div style={{ 
                  backgroundColor: 'white', 
                  padding: '1.5rem', 
                  borderRadius: '8px', 
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' 
                }}>
                  <h4 style={{ color: '#29A98C', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                    📊 Seguimiento Longitudinal
                  </h4>
                  <p style={{ fontSize: '0.9rem' }}>
                    Visualiza el progreso del paciente a través del tiempo con gráficos intuitivos
                  </p>
                </div>
                
                <div style={{ 
                  backgroundColor: 'white', 
                  padding: '1.5rem', 
                  borderRadius: '8px', 
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' 
                }}>
                  <h4 style={{ color: '#29A98C', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                    📱 Interfaz Profesional
                  </h4>
                  <p style={{ fontSize: '0.9rem' }}>
                    Experiencia amigable para el paciente con diseño moderno y profesional
                  </p>
                </div>
                
                <div style={{ 
                  backgroundColor: 'white', 
                  padding: '1.5rem', 
                  borderRadius: '8px', 
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' 
                }}>
                  <h4 style={{ color: '#29A98C', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                    📋 Escalas Validadas
                  </h4>
                  <p style={{ fontSize: '0.9rem' }}>
                    Acceso a las escalas más utilizadas con base científica comprobada
                  </p>
                </div>
                
                <div style={{ 
                  backgroundColor: 'white', 
                  padding: '1.5rem', 
                  borderRadius: '8px', 
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' 
                }}>
                  <h4 style={{ color: '#29A98C', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                    ⚠️ Alertas Inteligentes
                  </h4>
                  <p style={{ fontSize: '0.9rem' }}>
                    Advertencias específicas y personalizadas según cada escala y resultado
                  </p>
                </div>
                
                <div style={{ 
                  backgroundColor: 'white', 
                  padding: '1.5rem', 
                  borderRadius: '8px', 
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' 
                }}>
                  <h4 style={{ color: '#29A98C', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                    📄 Reportes PDF
                  </h4>
                  <p style={{ fontSize: '0.9rem' }}>
                    Genera reportes profesionales en PDF con información completa del paciente
                  </p>
                </div>
                
                <div style={{ 
                  backgroundColor: 'white', 
                  padding: '1.5rem', 
                  borderRadius: '8px', 
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' 
                }}>
                  <h4 style={{ color: '#29A98C', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                    🔒 Gestión de Pacientes
                  </h4>
                  <p style={{ fontSize: '0.9rem' }}>
                    Sistema completo de gestión con trazabilidad y historial detallado
                  </p>
                </div>
                
                <div style={{ 
                  backgroundColor: 'white', 
                  padding: '1.5rem', 
                  borderRadius: '8px', 
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' 
                }}>
                  <h4 style={{ color: '#29A98C', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                    🌐 Acceso Multiplataforma
                  </h4>
                  <p style={{ fontSize: '0.9rem' }}>
                    Funciona en cualquier dispositivo: computadora, tablet o smartphone
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Contact Page */}
      {currentPage === 'contact' && (
        <div style={{ backgroundColor: '#f8fafc', minHeight: 'calc(100vh - 4rem)', padding: '2rem 1rem' }}>
          <div style={{ maxWidth: '60rem', margin: '0 auto' }}>
            <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '2rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)', marginBottom: '2rem' }}>
              <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <div style={{ marginBottom: '1rem' }}>
                  <img 
                    src="/LogoPrincipal.svg" 
                    alt="MindHub Logo" 
                    style={{ width: '80px', height: 'auto', margin: '0 auto' }}
                  />
                </div>
                <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#112F33', marginBottom: '1rem' }}>
                  Contáctanos
                </h1>
                <div style={{ backgroundColor: '#e0f2fe', border: '1px solid #81d4fa', borderRadius: '8px', padding: '1rem', marginBottom: '1rem' }}>
                  <p style={{ margin: 0, color: '#01579b', fontSize: '0.9rem', lineHeight: '1.5', textAlign: 'left' }}>
                    <strong>¡Hola!</strong><br/>
                    En MindHub valoramos tu comunicación. Ya sea que tengas preguntas, sugerencias o simplemente quieras conocer más sobre nuestros servicios, estamos aquí para ayudarte. Completa el formulario y nos pondremos en contacto contigo pronto.
                  </p>
                </div>
                <div style={{ backgroundColor: '#fef3c7', border: '1px solid #fde68a', borderRadius: '8px', padding: '1rem' }}>
                  <p style={{ margin: 0, color: '#92400e', fontSize: '0.9rem', lineHeight: '1.5', textAlign: 'center' }}>
                    📧 <strong>Email directo:</strong> soporte@mindhub.cloud
                  </p>
                </div>
              </div>

              <form onSubmit={handleContactSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
                      Nombre Completo *
                    </label>
                    <input 
                      type="text"
                      value={contactForm.name}
                      onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                      placeholder="Tu nombre completo..."
                      style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.375rem', fontSize: '1rem', outline: 'none' }}
                      required
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
                      Email *
                    </label>
                    <input 
                      type="email"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                      placeholder="tu@email.com"
                      style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.375rem', fontSize: '1rem', outline: 'none' }}
                      required
                    />
                  </div>
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
                    Lugar de Origen *
                  </label>
                  <input 
                    type="text"
                    value={contactForm.location}
                    onChange={(e) => setContactForm({...contactForm, location: e.target.value})}
                    placeholder="Ciudad, País..."
                    style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.375rem', fontSize: '1rem', outline: 'none' }}
                    required
                  />
                </div>

                <div style={{ marginBottom: '2rem' }}>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
                    Mensaje *
                  </label>
                  <textarea 
                    value={contactForm.message}
                    onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                    placeholder="Escribe tu mensaje aquí. Cuéntanos cómo podemos ayudarte, qué te interesa de MindHub, o cualquier consulta que tengas..."
                    rows="6"
                    style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.375rem', fontSize: '1rem', outline: 'none', resize: 'vertical' }}
                    required
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                  <button
                    type="button"
                    onClick={() => setCurrentPage('dashboard')}
                    style={{ padding: '0.75rem 1.5rem', backgroundColor: '#6b7280', color: 'white', border: 'none', borderRadius: '0.375rem', fontSize: '1rem', cursor: 'pointer' }}
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    style={{ padding: '0.75rem 2rem', backgroundColor: '#29A98C', color: 'white', border: 'none', borderRadius: '0.375rem', fontSize: '1rem', cursor: 'pointer', fontWeight: '600' }}
                  >
                    📨 Enviar Mensaje
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Feedback Page */}
      {currentPage === 'feedback' && isAuthenticated && (
        <div style={{ backgroundColor: '#f8fafc', minHeight: 'calc(100vh - 4rem)', padding: '2rem 1rem' }}>
          <div style={{ maxWidth: '60rem', margin: '0 auto' }}>
            <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '2rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)', marginBottom: '2rem' }}>
              <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <div style={{ marginBottom: '1rem' }}>
                  <SvgIcon name="bot-training-svgrepo-com" size="80px" />
                </div>
                <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#112F33', marginBottom: '1rem' }}>
                  Beta Feedback
                </h1>
                <div style={{ backgroundColor: '#fef3c7', border: '1px solid #fde68a', borderRadius: '8px', padding: '1rem', marginBottom: '1rem' }}>
                  <p style={{ margin: 0, color: '#92400e', fontSize: '0.9rem', lineHeight: '1.5', textAlign: 'left' }}>
                    <strong>¡Hola {user?.name}!</strong><br/>
                    En MindHub estamos constantemente creando y mejorando la experiencia para ti. Te recordamos que estamos en <strong>modo Beta</strong> - la aplicación aún no sale al mercado, por lo que tus informes son muy importantes y queremos mejorar para ti.
                  </p>
                </div>
              </div>

              <form onSubmit={handleFeedbackSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
                      Tipo de Reporte
                    </label>
                    <select 
                      value={feedbackForm.type}
                      onChange={(e) => setFeedbackForm({...feedbackForm, type: e.target.value})}
                      style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.375rem', fontSize: '1rem', outline: 'none' }}
                      required
                    >
                      <option value="bug">Error o Bug</option>
                      <option value="improvement">💡 Sugerencia de Mejora</option>
                      <option value="feature">⭐ Nueva Funcionalidad</option>
                      <option value="ui">🎨 Interfaz de Usuario</option>
                      <option value="performance">⚡ Rendimiento</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
                      Prioridad
                    </label>
                    <select 
                      value={feedbackForm.priority}
                      onChange={(e) => setFeedbackForm({...feedbackForm, priority: e.target.value})}
                      style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.375rem', fontSize: '1rem', outline: 'none' }}
                      required
                    >
                      <option value="low">🟢 Baja</option>
                      <option value="medium">🟡 Media</option>
                      <option value="high">🟠 Alta</option>
                      <option value="critical">🔴 Crítica</option>
                    </select>
                  </div>
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
                    Título del Reporte
                  </label>
                  <input 
                    type="text"
                    value={feedbackForm.title}
                    onChange={(e) => setFeedbackForm({...feedbackForm, title: e.target.value})}
                    placeholder="Describe brevemente el problema o sugerencia..."
                    style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.375rem', fontSize: '1rem', outline: 'none' }}
                    required
                  />
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
                    Descripción Detallada
                  </label>
                  <textarea 
                    value={feedbackForm.description}
                    onChange={(e) => setFeedbackForm({...feedbackForm, description: e.target.value})}
                    placeholder="Por favor, proporciona todos los detalles posibles:&#10;- ¿Qué estabas haciendo cuando ocurrió?&#10;- ¿Qué esperabas que pasara?&#10;- ¿Qué pasó en su lugar?&#10;- ¿Cómo podríamos mejorar esta funcionalidad?"
                    rows={6}
                    style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.375rem', fontSize: '1rem', outline: 'none', resize: 'vertical' }}
                    required
                  />
                </div>

                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <button
                    type="button"
                    onClick={() => setCurrentPage('dashboard')}
                    style={{
                      padding: '0.75rem 1.5rem',
                      backgroundColor: '#f1f5f9',
                      color: '#475569',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontSize: '0.875rem',
                      fontWeight: '600'
                    }}
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    style={{
                      padding: '0.75rem 1.5rem',
                      backgroundColor: '#EC7367',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontSize: '0.875rem',
                      fontWeight: '600'
                    }}
                  >
                    <SvgIcon name="logging-svgrepo-com" size="1rem" /> Enviar Feedback
                  </button>
                </div>
              </form>
            </div>

            {/* Tips section */}
            <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '1.5rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#112F33', marginBottom: '1rem' }}>
                💡 Tips para un buen reporte
              </h3>
              <ul style={{ color: '#64748b', fontSize: '0.875rem', lineHeight: '1.6', paddingLeft: '1.5rem' }}>
                <li>Sé específico sobre qué acción realizaste antes del problema</li>
                <li>Incluye el navegador que estás usando (Chrome, Firefox, Safari, etc.)</li>
                <li>Menciona si el problema se repite siempre o solo a veces</li>
                <li>Para sugerencias, explica cómo mejoraría tu experiencia</li>
                <li>¡No hay reportes tontos! Toda información es valiosa</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Página de Pacientes */}
      {currentPage === 'pacientes' && isAuthenticated && (
        <div style={{ backgroundColor: '#f8fafc', minHeight: 'calc(100vh - 4rem)', padding: '1rem' }}>
          <div style={{ maxWidth: '90rem', margin: '0 auto' }}>
            
            {(() => {
              // Datos simulados de pacientes
              const mockPatients = [
                { 
                  id: 1, 
                  name: 'Juan Pérez', 
                  birthDate: '1989-03-15',
                  age: 35, 
                  gender: 'M',
                  email: 'juan.perez@email.com',
                  phone: '+34 655 123 456',
                  diagnosis: 'Ansiedad generalizada',
                  tags: ['ansiedad', 'adulto', 'terapia individual'],
                  referringProfessional: 'Dra. Martínez',
                  firstConsultDate: '2024-01-10',
                  lastVisit: '2024-06-15',
                  evaluations: [
                    { scale: 'PHQ-9', date: '2024-06-15', score: 12 },
                    { scale: 'GADI', date: '2024-05-20', score: 28 },
                    { scale: 'PHQ-9', date: '2024-04-10', score: 18 }
                  ],
                  status: 'active',
                  createdAt: '2024-01-10'
                },
                { 
                  id: 2, 
                  name: 'María García', 
                  birthDate: '1996-07-22',
                  age: 28, 
                  gender: 'F',
                  email: 'maria.garcia@gmail.com',
                  phone: '+34 612 987 654',
                  diagnosis: 'Depresión mayor',
                  tags: ['depresión', 'adulto joven', 'medicación'],
                  referringProfessional: 'Dr. Rodríguez',
                  firstConsultDate: '2024-02-05',
                  lastVisit: '2024-06-10',
                  evaluations: [
                    { scale: 'Beck-21', date: '2024-06-10', score: 25 },
                    { scale: 'MOS Sleep', date: '2024-06-10', score: 45 },
                    { scale: 'Beck-21', date: '2024-05-05', score: 32 }
                  ],
                  status: 'active',
                  createdAt: '2024-02-05'
                },
                { 
                  id: 3, 
                  name: 'Carlos López', 
                  birthDate: '1982-11-08',
                  age: 42, 
                  gender: 'M',
                  email: 'carlos.lopez@hotmail.com',
                  phone: '+34 699 555 333',
                  diagnosis: 'Trastorno bipolar',
                  tags: ['bipolar', 'adulto', 'seguimiento psiquiátrico'],
                  referringProfessional: 'Psiquiatría General',
                  firstConsultDate: '2023-11-15',
                  lastVisit: '2024-06-05',
                  evaluations: [
                    { scale: 'HARS', date: '2024-06-05', score: 18 },
                    { scale: 'Beck-21', date: '2024-06-05', score: 15 }
                  ],
                  status: 'active',
                  createdAt: '2023-11-15'
                },
                { 
                  id: 4, 
                  name: 'Ana Martínez', 
                  birthDate: '1993-04-30',
                  age: 31, 
                  gender: 'F',
                  email: 'ana.martinez@yahoo.com',
                  diagnosis: 'TLP',
                  tags: ['TLP', 'adulto joven', 'terapia DBT', 'urgente'],
                  referringProfessional: 'Hospital Central',
                  firstConsultDate: '2024-03-20',
                  lastVisit: '2024-06-01',
                  evaluations: [
                    { scale: 'BLS-23', date: '2024-06-01', score: 68 },
                    { scale: 'Beck-21', date: '2024-06-01', score: 38 }
                  ],
                  emergencyContact: 'Pedro Martínez (hermano)',
                  emergencyPhone: '+34 677 888 999',
                  status: 'active',
                  createdAt: '2024-03-20'
                }
              ]
              
              // Filtrar pacientes según búsqueda
              const filteredPatients = mockPatients.filter(patient => {
                if (!patientsSearch.trim()) return true
                
                const searchTerm = patientsSearch.toLowerCase()
                return (
                  patient.name.toLowerCase().includes(searchTerm) ||
                  patient.diagnosis.toLowerCase().includes(searchTerm) ||
                  patient.gender.toLowerCase().includes(searchTerm) ||
                  (patient.email && patient.email.toLowerCase().includes(searchTerm)) ||
                  (patient.phone && patient.phone.toLowerCase().includes(searchTerm)) ||
                  patient.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
                  patient.evaluations.some(evaluation => evaluation.scale.toLowerCase().includes(searchTerm))
                )
              })

              return (
                <>

            {/* Barra de búsqueda y controles */}
            <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '1.5rem', marginBottom: '1rem', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)' }}>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap', marginBottom: '1rem' }}>
                
                {/* Búsqueda */}
                <div style={{ flex: 1, minWidth: '300px' }}>
                  <input 
                    type="text"
                    value={patientsSearch}
                    onChange={(e) => setPatientsSearch(e.target.value)}
                    placeholder="🔍 Buscar por nombre, diagnóstico, email, teléfono, tags..."
                    style={{ 
                      width: '100%', 
                      padding: '0.875rem 1rem', 
                      border: '1px solid #d1d5db', 
                      borderRadius: '8px', 
                      fontSize: '0.875rem', 
                      outline: 'none',
                      transition: 'border-color 0.2s ease'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#29A98C'}
                    onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                  />
                </div>

                {/* Botón nuevo paciente */}
                <button
                  onClick={() => setShowNewPatientModal(true)}
                  style={{
                    padding: '0.875rem 1.25rem',
                    backgroundColor: '#29A98C',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                >
                  + Nuevo Paciente
                </button>

                {/* Selectores de vista */}
                <div style={{ display: 'flex', gap: '0.5rem', backgroundColor: '#f8fafc', borderRadius: '8px', padding: '0.25rem' }}>
                  <button
                    onClick={() => setPatientsView('grid')}
                    style={{
                      padding: '0.5rem 0.75rem',
                      backgroundColor: patientsView === 'grid' ? '#29A98C' : 'transparent',
                      color: patientsView === 'grid' ? 'white' : '#64748b',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '0.8rem',
                      fontWeight: '500',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    📊 Tarjetas
                  </button>
                  <button
                    onClick={() => setPatientsView('list')}
                    style={{
                      padding: '0.5rem 0.75rem',
                      backgroundColor: patientsView === 'list' ? '#29A98C' : 'transparent',
                      color: patientsView === 'list' ? 'white' : '#64748b',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '0.8rem',
                      fontWeight: '500',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    📋 Lista
                  </button>
                </div>
              </div>

              {/* Información de resultados */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <p style={{ fontSize: '0.875rem', color: '#64748b', margin: 0 }}>
                  {filteredPatients.length} pacientes encontrados
                </p>
                <span style={{ fontSize: '0.875rem', color: '#64748b' }}>
                  Total: {mockPatients.length} pacientes registrados
                </span>
              </div>
            </div>

            {/* Contenido principal */}
            {filteredPatients.length === 0 ? (
              <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '3rem', textAlign: 'center', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)' }}>
                <span style={{ fontSize: '3rem', marginBottom: '1rem', display: 'block' }}>
                  {patients.length === 0 ? '👥' : '🔍'}
                </span>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#112F33', marginBottom: '0.5rem' }}>
                  {patients.length === 0 ? 'No hay pacientes registrados' : 'No se encontraron pacientes'}
                </h3>
                <p style={{ color: '#64748b', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
                  {patients.length === 0 
                    ? 'Los pacientes se registrarán automáticamente al iniciar evaluaciones o puedes agregar uno manualmente.'
                    : 'Intenta modificar los términos de búsqueda para encontrar más resultados.'
                  }
                </p>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <button
                    onClick={() => setShowNewPatientModal(true)}
                    style={{
                      padding: '0.75rem 1.5rem',
                      backgroundColor: '#29A98C',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontSize: '0.875rem',
                      fontWeight: '600'
                    }}
                  >
                    + Nuevo Paciente
                  </button>
                  <button
                    onClick={() => setCurrentPage('escalas')}
                    style={{
                      padding: '0.75rem 1.5rem',
                      backgroundColor: '#f1f5f9',
                      color: '#475569',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontSize: '0.875rem',
                      fontWeight: '600'
                    }}
                  >
                    Ir a Escalas
                  </button>
                </div>
              </div>
            ) : (
              <>
                {/* Vista en Tarjetas */}
                {patientsView === 'grid' && (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '1rem' }}>
                    {filteredPatients.map(patient => {
                      const patientEvaluations = patient.evaluations || []
                      const lastEvaluation = patientEvaluations[patientEvaluations.length - 1]
                      const hasPhq9Data = patientEvaluations.some(e => e.scale === 'PHQ-9')
                      
                      // Calcular días desde última visita
                      const daysSinceLastVisit = patient.lastVisit ? 
                        Math.floor((new Date() - new Date(patient.lastVisit)) / (1000 * 60 * 60 * 24)) : null
                      
                      // Determinar estado de actividad
                      const activityStatus = daysSinceLastVisit < 30 ? 'active' : 
                                           daysSinceLastVisit < 90 ? 'moderate' : 'inactive'
                      
                      return (
                        <div key={patient.id} style={{
                          backgroundColor: 'white',
                          borderRadius: '16px',
                          overflow: 'hidden',
                          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                          border: '1px solid #e5e7eb',
                          transition: 'all 0.3s ease',
                          cursor: 'pointer'
                        }}
                        onMouseOver={(e) => {
                          e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.12)'
                          e.currentTarget.style.transform = 'translateY(-2px)'
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)'
                          e.currentTarget.style.transform = 'translateY(0)'
                        }}>
                          
                          {/* Header con gradiente */}
                          <div style={{ 
                            background: 'linear-gradient(135deg, #29A98C 0%, #22875c 100%)',
                            padding: '1.25rem',
                            position: 'relative'
                          }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                              <div style={{ 
                                width: '3.5rem', 
                                height: '3.5rem', 
                                backgroundColor: 'rgba(255, 255, 255, 0.2)', 
                                borderRadius: '50%', 
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'center',
                                border: '2px solid rgba(255, 255, 255, 0.3)'
                              }}>
                                <span style={{ fontSize: '1.5rem', color: 'white' }}>
                                  {patient.gender === 'M' ? '👨' : patient.gender === 'F' ? '👩' : '👤'}
                                </span>
                              </div>
                              <div style={{ flex: 1 }}>
                                <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'white', margin: 0 }}>
                                  {patient.name}
                                </h3>
                                <p style={{ fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.9)', margin: '0.25rem 0 0 0' }}>
                                  ID: #{patient.id.toString().padStart(5, '0')}
                                </p>
                              </div>
                              {/* Indicador de actividad */}
                              <div style={{ 
                                position: 'absolute',
                                top: '1rem',
                                right: '1rem',
                                width: '10px',
                                height: '10px',
                                borderRadius: '50%',
                                backgroundColor: activityStatus === 'active' ? '#10b981' : 
                                               activityStatus === 'moderate' ? '#f59e0b' : '#ef4444',
                                border: '2px solid white',
                                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
                              }} title={`${activityStatus === 'active' ? 'Activo' : 
                                         activityStatus === 'moderate' ? 'Moderado' : 'Inactivo'} 
                                         (${daysSinceLastVisit} días desde última visita)`} />
                            </div>
                          </div>

                          <div style={{ padding: '1.25rem' }}>
                            {/* Información de contacto */}
                            <div style={{ marginBottom: '1rem' }}>
                              <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.5rem' }}>
                                <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                  <span style={{ fontSize: '0.875rem' }}>📧</span>
                                  <span style={{ fontSize: '0.8rem', color: '#64748b' }}>
                                    {patient.email || 'Sin email'}
                                  </span>
                                </div>
                              </div>
                              <div style={{ display: 'flex', gap: '0.75rem' }}>
                                <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                  <span style={{ fontSize: '0.875rem' }}>📱</span>
                                  <span style={{ fontSize: '0.8rem', color: '#64748b' }}>
                                    {patient.phone || 'Sin teléfono'}
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* Información clínica */}
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem', marginBottom: '1rem' }}>
                              <div style={{ backgroundColor: '#f0f9ff', padding: '0.75rem', borderRadius: '8px' }}>
                                <span style={{ fontSize: '0.7rem', color: '#0369a1', display: 'block', marginBottom: '0.25rem' }}>
                                  Edad
                                </span>
                                <span style={{ fontSize: '1rem', fontWeight: '600', color: '#0c4a6e' }}>
                                  {calculateAge(patient.birthDate)} años
                                </span>
                              </div>
                              <div style={{ backgroundColor: '#fef3c7', padding: '0.75rem', borderRadius: '8px' }}>
                                <span style={{ fontSize: '0.7rem', color: '#d97706', display: 'block', marginBottom: '0.25rem' }}>
                                  Evaluaciones
                                </span>
                                <span style={{ fontSize: '1rem', fontWeight: '600', color: '#92400e' }}>
                                  {patientEvaluations.length} total
                                </span>
                              </div>
                            </div>

                            {/* Diagnóstico y profesional */}
                            <div style={{ 
                              backgroundColor: '#fff7ed', 
                              padding: '0.875rem', 
                              borderRadius: '8px', 
                              marginBottom: '1rem' 
                            }}>
                              <div style={{ marginBottom: '0.75rem' }}>
                                <span style={{ fontSize: '0.7rem', color: '#ea580c', display: 'block', marginBottom: '0.25rem' }}>
                                  Diagnóstico Principal
                                </span>
                                <span style={{ fontSize: '0.875rem', color: '#9a3412', fontWeight: '600' }}>
                                  {patient.diagnosis}
                                </span>
                              </div>
                              {patient.referringProfessional && (
                                <div>
                                  <span style={{ fontSize: '0.7rem', color: '#ea580c', display: 'block', marginBottom: '0.25rem' }}>
                                    Referido por
                                  </span>
                                  <span style={{ fontSize: '0.8rem', color: '#9a3412' }}>
                                    {patient.referringProfessional}
                                  </span>
                                </div>
                              )}
                            </div>

                            {/* Tags */}
                            {patient.tags && patient.tags.length > 0 && (
                              <div style={{ marginBottom: '1rem' }}>
                                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                                  {patient.tags.map((tag, index) => (
                                    <span key={index} style={{ 
                                      backgroundColor: tag.includes('urgente') ? '#fee2e2' : '#e0e7ff', 
                                      color: tag.includes('urgente') ? '#dc2626' : '#4338ca', 
                                      padding: '0.25rem 0.75rem', 
                                      borderRadius: '999px', 
                                      fontSize: '0.7rem', 
                                      fontWeight: '500',
                                      border: `1px solid ${tag.includes('urgente') ? '#fecaca' : '#c7d2fe'}`
                                    }}>
                                      {tag}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Escalas aplicadas con detalle - Clickeable para nueva evaluación */}
                            <div 
                              onClick={(e) => {
                                e.stopPropagation()
                                openScaleSelectionForPatient(patient)
                              }}
                              style={{ 
                                backgroundColor: '#f8fafc', 
                                padding: '0.75rem', 
                                borderRadius: '8px', 
                                marginBottom: '1rem',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                                border: '1px solid transparent'
                              }}
                              onMouseOver={(e) => {
                                e.target.style.backgroundColor = '#e2e8f0'
                                e.target.style.borderColor = '#29A98C'
                                e.target.style.transform = 'translateY(-1px)'
                                e.target.style.boxShadow = '0 4px 12px rgba(41, 169, 140, 0.15)'
                                
                                // Mostrar tooltip
                                const tooltip = document.createElement('div')
                                tooltip.id = 'scales-tooltip'
                                tooltip.innerHTML = '+ Aplicar nueva escala'
                                tooltip.style.cssText = `
                                  position: absolute;
                                  background: #112F33;
                                  color: white;
                                  padding: 0.5rem 0.75rem;
                                  border-radius: 6px;
                                  font-size: 0.75rem;
                                  font-weight: 500;
                                  white-space: nowrap;
                                  z-index: 1000;
                                  pointer-events: none;
                                  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                                  transform: translateY(-100%) translateX(-50%);
                                  margin-top: -0.5rem;
                                  left: 50%;
                                  top: 0;
                                `
                                e.target.style.position = 'relative'
                                e.target.appendChild(tooltip)
                              }}
                              onMouseOut={(e) => {
                                e.target.style.backgroundColor = '#f8fafc'
                                e.target.style.borderColor = 'transparent'
                                e.target.style.transform = 'translateY(0)'
                                e.target.style.boxShadow = 'none'
                                
                                // Remover tooltip
                                const tooltip = document.getElementById('scales-tooltip')
                                if (tooltip) {
                                  tooltip.remove()
                                }
                              }}
                            >
                              <div style={{ 
                                fontSize: '0.75rem', 
                                fontWeight: '600', 
                                color: '#475569', 
                                marginBottom: '0.5rem',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                              }}>
                                <span>Escalas Aplicadas</span>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                  <span style={{ fontSize: '0.7rem', fontWeight: 'normal' }}>
                                    Total: {patientEvaluations.length}
                                  </span>
                                  <span style={{ 
                                    fontSize: '0.8rem', 
                                    color: '#29A98C',
                                    fontWeight: '600'
                                  }}>
                                    +
                                  </span>
                                </div>
                              </div>
                              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                                {Object.entries(
                                  patientEvaluations.reduce((acc, evaluation) => {
                                    if (!acc[evaluation.scale]) {
                                      acc[evaluation.scale] = 0
                                    }
                                    acc[evaluation.scale]++
                                    return acc
                                  }, {})
                                ).map(([scale, count]) => (
                                  <span key={scale} style={{ 
                                    backgroundColor: 'white', 
                                    color: '#374151', 
                                    padding: '0.25rem 0.5rem', 
                                    borderRadius: '6px', 
                                    fontSize: '0.65rem', 
                                    fontWeight: '500',
                                    border: '1px solid #e5e7eb',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.25rem'
                                  }}>
                                    {scale} 
                                    {count > 1 && (
                                      <span style={{ 
                                        backgroundColor: '#29A98C', 
                                        color: 'white', 
                                        padding: '0 0.25rem', 
                                        borderRadius: '10px',
                                        fontSize: '0.6rem'
                                      }}>
                                        {count}
                                      </span>
                                    )}
                                  </span>
                                ))}
                              </div>
                              {lastEvaluation && (
                                <div style={{ 
                                  marginTop: '0.5rem', 
                                  paddingTop: '0.5rem', 
                                  borderTop: '1px solid #e5e7eb',
                                  fontSize: '0.7rem',
                                  color: '#64748b'
                                }}>
                                  Última: {lastEvaluation.scale} ({new Date(lastEvaluation.date).toLocaleDateString('es-ES')})
                                </div>
                              )}
                            </div>

                            {/* Contacto de emergencia */}
                            {patient.emergencyContact && (
                              <div style={{ 
                                backgroundColor: '#fee2e2', 
                                padding: '0.75rem', 
                                borderRadius: '8px', 
                                marginBottom: '1rem',
                                fontSize: '0.75rem' 
                              }}>
                                <span style={{ color: '#dc2626', fontWeight: '600' }}>🚨 Contacto Emergencia:</span>
                                <div style={{ color: '#7f1d1d', marginTop: '0.25rem' }}>
                                  {patient.emergencyContact} - {patient.emergencyPhone}
                                </div>
                              </div>
                            )}

                            {/* Botones de acción mejorados */}
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation()
                                  openScaleSelectionForPatient(patient)
                                }}
                                style={{ 
                                  flex: 1,
                                  padding: '0.75rem', 
                                  backgroundColor: '#29A98C', 
                                  color: 'white', 
                                  border: 'none', 
                                  borderRadius: '8px', 
                                  cursor: 'pointer', 
                                  fontSize: '0.8rem', 
                                  fontWeight: '600',
                                  transition: 'all 0.2s ease'
                                }}
                                onMouseOver={(e) => {
                                  e.target.style.backgroundColor = '#22875c'
                                  e.target.style.transform = 'translateY(-1px)'
                                }}
                                onMouseOut={(e) => {
                                  e.target.style.backgroundColor = '#29A98C'
                                  e.target.style.transform = 'translateY(0)'
                                }}
                              >
                                + Nueva Evaluación
                              </button>
                              
                              <div style={{ display: 'flex', gap: '0.5rem' }}>
                                {hasPhq9Data && (
                                  <button 
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      openPatientChart(patient)
                                    }}
                                    style={{ 
                                      padding: '0.75rem', 
                                      backgroundColor: '#f0f9ff', 
                                      color: '#0369a1', 
                                      border: '1px solid #bae6fd', 
                                      borderRadius: '8px', 
                                      cursor: 'pointer', 
                                      fontSize: '0.8rem', 
                                      fontWeight: '500',
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'center'
                                    }}
                                    title="Ver evolución"
                                  >
                                    📊
                                  </button>
                                )}
                                <button 
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    alert('Función de editar paciente próximamente')
                                  }}
                                  style={{ 
                                    padding: '0.75rem', 
                                    backgroundColor: '#f3f4f6', 
                                    color: '#475569', 
                                    border: '1px solid #e5e7eb', 
                                    borderRadius: '8px', 
                                    cursor: 'pointer', 
                                    fontSize: '0.8rem', 
                                    fontWeight: '500',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                  }}
                                  title="Editar paciente"
                                >
                                  ✏️
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}

                {/* Vista en Lista */}
                {patientsView === 'list' && (
                  <div style={{ backgroundColor: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)' }}>
                    {filteredPatients.map((patient, index) => {
                      const patientEvaluations = patient.evaluations || []
                      const lastEvaluation = patientEvaluations[patientEvaluations.length - 1]
                      const hasPhq9Data = patientEvaluations.some(e => e.scale === 'PHQ-9')
                      
                      return (
                        <div key={patient.id} style={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          padding: '1rem 1.5rem', 
                          borderBottom: index < filteredPatients.length - 1 ? '1px solid #f3f4f6' : 'none',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease'
                        }}
                        onMouseOver={(e) => {
                          e.currentTarget.style.backgroundColor = '#f8fafc'
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent'
                        }}>
                          
                          <div style={{ 
                            width: '2rem', 
                            height: '2rem', 
                            backgroundColor: '#29A98C', 
                            borderRadius: '50%', 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center',
                            marginRight: '1rem',
                            flexShrink: 0
                          }}>
                            <span style={{ fontSize: '1rem', color: 'white' }}>👤</span>
                          </div>
                          
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.25rem' }}>
                              <h3 style={{ fontSize: '1rem', fontWeight: 'bold', color: '#112F33', margin: 0 }}>
                                {patient.name}
                              </h3>
                              <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
                                Registrado: {new Date(patient.createdAt).toLocaleDateString('es-ES')}
                              </span>
                              {patient.birthDate && (
                                <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
                                  {calculateAge(patient.birthDate)} años
                                </span>
                              )}
                              {patient.gender && (
                                <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
                                  {patient.gender}
                                </span>
                              )}
                            </div>
                            
                            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                              <span style={{ backgroundColor: '#f0f9ff', color: '#0369a1', padding: '0.125rem 0.375rem', borderRadius: '8px', fontSize: '0.7rem', fontWeight: '500' }}>
                                {patientEvaluations.length} evaluaciones
                              </span>
                              {Object.keys(
                                patientEvaluations.reduce((acc, evaluation) => {
                                  acc[evaluation.scale] = true
                                  return acc
                                }, {})
                              ).map(scale => (
                                <span key={scale} style={{ backgroundColor: '#f3f4f6', color: '#374151', padding: '0.125rem 0.375rem', borderRadius: '8px', fontSize: '0.7rem', fontWeight: '500' }}>
                                  {scale}
                                </span>
                              ))}
                              {lastEvaluation && (
                                <span style={{ backgroundColor: '#f0fdf4', color: '#059669', padding: '0.125rem 0.375rem', borderRadius: '8px', fontSize: '0.7rem', fontWeight: '500' }}>
                                  {new Date(lastEvaluation.date).toLocaleDateString('es-ES')}
                                </span>
                              )}
                            </div>
                          </div>
                          
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
                            {hasPhq9Data && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  openPatientChart(patient)
                                }}
                                style={{
                                  backgroundColor: 'transparent',
                                  border: 'none',
                                  cursor: 'pointer',
                                  fontSize: '1.1rem',
                                  padding: '0.25rem',
                                  borderRadius: '50%',
                                  transition: 'all 0.2s ease'
                                }}
                                onMouseOver={(e) => {
                                  e.currentTarget.style.backgroundColor = '#f3f4f6'
                                }}
                                onMouseOut={(e) => {
                                  e.currentTarget.style.backgroundColor = 'transparent'
                                }}
                                title="Ver evolución en gráfico"
                              >
                                📈
                              </button>
                            )}
                            <button 
                              onClick={(e) => {
                                e.stopPropagation()
                                // Aquí podrías abrir detalles
                              }}
                              style={{ 
                                padding: '0.5rem 1rem', 
                                backgroundColor: '#29A98C', 
                                color: 'white', 
                                border: 'none', 
                                borderRadius: '6px', 
                                cursor: 'pointer', 
                                fontSize: '0.75rem', 
                                fontWeight: '600',
                                whiteSpace: 'nowrap'
                              }}
                            >
                              Ver Detalles
                            </button>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </>
            )}

            {/* Modal de Gráfico de Evolución */}
            {showPatientChart && chartPatient && (
              <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                zIndex: 1000,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '1rem'
              }}>
                <div style={{
                  backgroundColor: 'white',
                  borderRadius: '16px',
                  padding: '2rem',
                  maxWidth: '900px',
                  width: '100%',
                  maxHeight: '90vh',
                  overflow: 'auto',
                  position: 'relative',
                  boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
                }}>
                  <button
                    onClick={() => setShowPatientChart(false)}
                    style={{
                      position: 'absolute',
                      top: '1rem',
                      right: '1rem',
                      backgroundColor: 'transparent',
                      border: 'none',
                      fontSize: '1.5rem',
                      cursor: 'pointer',
                      color: '#64748b',
                      width: '2rem',
                      height: '2rem',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    ×
                  </button>

                  {/* Header del modal */}
                  <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <div style={{
                      width: '4rem',
                      height: '4rem',
                      backgroundColor: '#29A98C',
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 1rem'
                    }}>
                      <span style={{ fontSize: '2rem', color: 'white' }}>📈</span>
                    </div>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#112F33', margin: 0 }}>
                      Evolución de {chartPatient.name}
                    </h2>
                    <p style={{ fontSize: '1rem', color: '#64748b', marginTop: '0.5rem' }}>
                      Progreso en escalas aplicadas a lo largo del tiempo
                    </p>
                  </div>

                  {(() => {
                    const chartData = createChartData(chartPatient, 'PHQ-9')
                    
                    if (chartData.length === 0) {
                      return (
                        <div style={{ textAlign: 'center', padding: '2rem' }}>
                          <span style={{ fontSize: '3rem', marginBottom: '1rem', display: 'block' }}>📊</span>
                          <p style={{ color: '#64748b', fontSize: '1rem' }}>
                            No hay suficientes evaluaciones PHQ-9 para mostrar el gráfico
                          </p>
                        </div>
                      )
                    }

                    const maxScore = Math.max(...chartData.map(d => d.score), 27)
                    const minScore = Math.min(...chartData.map(d => d.score), 0)
                    const scoreRange = maxScore - minScore || 1

                    return (
                      <div>
                        {/* Información del paciente */}
                        <div style={{ backgroundColor: '#f8fafc', padding: '1rem', borderRadius: '8px', marginBottom: '2rem' }}>
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                            <div>
                              <span style={{ fontSize: '0.75rem', color: '#64748b', display: 'block' }}>Total de evaluaciones</span>
                              <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#112F33' }}>{chartData.length}</span>
                            </div>
                            <div>
                              <span style={{ fontSize: '0.75rem', color: '#64748b', display: 'block' }}>Última evaluación</span>
                              <span style={{ fontSize: '1rem', fontWeight: '600', color: '#112F33' }}>
                                {chartData[chartData.length - 1]?.date}
                              </span>
                            </div>
                            <div>
                              <span style={{ fontSize: '0.75rem', color: '#64748b', display: 'block' }}>Rango de seguimiento</span>
                              <span style={{ fontSize: '1rem', fontWeight: '600', color: '#112F33' }}>
                                {chartData[chartData.length - 1]?.daysSinceFirst || 0} días
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Gráfico simple con CSS */}
                        <div style={{ marginBottom: '2rem' }}>
                          <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#112F33', marginBottom: '1rem' }}>
                            📊 Evolución PHQ-9
                          </h3>
                          
                          <div style={{ 
                            backgroundColor: '#f8fafc', 
                            borderRadius: '8px', 
                            padding: '1.5rem',
                            position: 'relative',
                            height: '300px'
                          }}>
                            {/* Líneas de referencia y etiquetas */}
                            <div style={{ position: 'absolute', left: '0', top: '0', bottom: '0', width: '40px' }}>
                              {[0, 5, 10, 15, 20, 25].map(score => (
                                <div key={score} style={{
                                  position: 'absolute',
                                  left: '0',
                                  bottom: `${(score / 27) * 100}%`,
                                  fontSize: '0.75rem',
                                  color: '#64748b',
                                  lineHeight: '1'
                                }}>
                                  {score}
                                </div>
                              ))}
                            </div>

                            {/* Área del gráfico */}
                            <div style={{ 
                              marginLeft: '50px', 
                              height: '100%', 
                              position: 'relative',
                              borderLeft: '2px solid #d1d5db',
                              borderBottom: '2px solid #d1d5db'
                            }}>
                              {/* Puntos de datos */}
                              {chartData.map((point, index) => {
                                const x = (index / (chartData.length - 1 || 1)) * 100
                                const y = ((point.score) / 27) * 100
                                
                                return (
                                  <div key={index} style={{
                                    position: 'absolute',
                                    left: `${x}%`,
                                    bottom: `${y}%`,
                                    transform: 'translate(-50%, 50%)',
                                    width: '12px',
                                    height: '12px',
                                    backgroundColor: point.interpretation.color,
                                    borderRadius: '50%',
                                    border: '2px solid white',
                                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                                    cursor: 'pointer',
                                    zIndex: 2
                                  }}
                                  title={`${point.date}: ${point.score} puntos (${point.interpretation.level})`}
                                  />
                                )
                              })}

                              {/* Línea conectora */}
                              <svg style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                pointerEvents: 'none'
                              }}>
                                <polyline
                                  points={chartData.map((point, index) => {
                                    const x = (index / (chartData.length - 1 || 1)) * 100
                                    const y = 100 - ((point.score) / 27) * 100
                                    return `${x},${y}`
                                  }).join(' ')}
                                  fill="none"
                                  stroke="#29A98C"
                                  strokeWidth="2"
                                  strokeLinejoin="round"
                                  strokeLinecap="round"
                                />
                              </svg>

                              {/* Etiquetas de fechas */}
                              <div style={{ position: 'absolute', bottom: '-30px', left: 0, right: 0 }}>
                                {chartData.map((point, index) => (
                                  <div key={index} style={{
                                    position: 'absolute',
                                    left: `${(index / (chartData.length - 1 || 1)) * 100}%`,
                                    transform: 'translateX(-50%)',
                                    fontSize: '0.75rem',
                                    color: '#64748b',
                                    textAlign: 'center',
                                    whiteSpace: 'nowrap'
                                  }}>
                                    {point.date}
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Leyenda de severidad */}
                        <div style={{ marginBottom: '2rem' }}>
                          <h4 style={{ fontSize: '1rem', fontWeight: 'bold', color: '#112F33', marginBottom: '0.75rem' }}>
                            🎯 Niveles de Severidad PHQ-9
                          </h4>
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.5rem' }}>
                            {[
                              { range: '0-4', level: 'Mínima', color: '#22c55e' },
                              { range: '5-9', level: 'Leve', color: '#eab308' },
                              { range: '10-14', level: 'Moderada', color: '#f97316' },
                              { range: '15-19', level: 'Moderada-Severa', color: '#dc2626' },
                              { range: '20-27', level: 'Severa', color: '#991b1b' }
                            ].map((level, index) => (
                              <div key={index} style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                padding: '0.5rem',
                                backgroundColor: `${level.color}15`,
                                borderRadius: '6px',
                                fontSize: '0.875rem'
                              }}>
                                <div style={{
                                  width: '12px',
                                  height: '12px',
                                  backgroundColor: level.color,
                                  borderRadius: '50%'
                                }} />
                                <span style={{ fontWeight: '600' }}>{level.range}</span>
                                <span style={{ color: '#64748b' }}>{level.level}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Resumen de evaluaciones */}
                        <div style={{ backgroundColor: '#f8fafc', padding: '1rem', borderRadius: '8px' }}>
                          <h4 style={{ fontSize: '1rem', fontWeight: 'bold', color: '#112F33', marginBottom: '0.75rem' }}>
                            📋 Detalle de Evaluaciones
                          </h4>
                          <div style={{ display: 'grid', gap: '0.5rem', maxHeight: '150px', overflow: 'auto' }}>
                            {chartData.reverse().map((point, index) => (
                              <div key={index} style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                padding: '0.5rem',
                                backgroundColor: 'white',
                                borderRadius: '6px',
                                fontSize: '0.875rem'
                              }}>
                                <span>{point.date}</span>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                  <span style={{ fontWeight: 'bold' }}>{point.score} puntos</span>
                                  <span style={{
                                    backgroundColor: point.interpretation.color,
                                    color: 'white',
                                    padding: '0.125rem 0.375rem',
                                    borderRadius: '4px',
                                    fontSize: '0.75rem',
                                    fontWeight: '600'
                                  }}>
                                    {point.interpretation.level}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )
                  })()}

                  <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                    <button
                      onClick={() => setShowPatientChart(false)}
                      style={{
                        padding: '0.75rem 1.5rem',
                        backgroundColor: '#29A98C',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontSize: '0.875rem',
                        fontWeight: '600'
                      }}
                    >
                      Cerrar
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Modal de Nuevo Paciente */}
            {showNewPatientModal && (
              <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                zIndex: 1000,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '1rem'
              }}>
                <div style={{
                  backgroundColor: 'white',
                  borderRadius: '16px',
                  padding: '2rem',
                  maxWidth: '700px',
                  width: '100%',
                  position: 'relative',
                  boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
                  maxHeight: '90vh',
                  overflow: 'auto'
                }}>
                  <button
                    onClick={() => setShowNewPatientModal(false)}
                    style={{
                      position: 'absolute',
                      top: '1rem',
                      right: '1rem',
                      backgroundColor: 'transparent',
                      border: 'none',
                      fontSize: '1.5rem',
                      cursor: 'pointer',
                      color: '#64748b',
                      width: '2rem',
                      height: '2rem',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    ×
                  </button>

                  <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <div style={{
                      width: '4rem',
                      height: '4rem',
                      backgroundColor: '#29A98C',
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 1rem'
                    }}>
                      <SvgIcon name="person-name-svgrepo-com" size="2rem" color="white" />
                    </div>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#112F33', margin: 0 }}>
                      Nuevo Paciente
                    </h2>
                    <p style={{ fontSize: '1rem', color: '#64748b', marginTop: '0.5rem' }}>
                      Completa la información básica del paciente
                    </p>
                  </div>

                  <form onSubmit={(e) => {
                    e.preventDefault()
                    if (currentPatientData.name.trim()) {
                      const newPatient = {
                        ...currentPatientData,
                        id: Date.now().toString(),
                        createdAt: new Date().toISOString(),
                        evaluations: []
                      }
                      setPatients(prev => [...prev, newPatient])
                      setCurrentPatientData({
                        name: '',
                        birthDate: '',
                        gender: '',
                        email: '',
                        phone: '',
                        diagnosis: '',
                        tags: [],
                        referringProfessional: '',
                        firstConsultDate: '',
                        emergencyContact: '',
                        emergencyPhone: '',
                        notes: ''
                      })
                      setShowNewPatientModal(false)
                    }
                  }}>
                    <div style={{ display: 'grid', gap: '1.5rem' }}>
                      {/* Sección 1: Información Personal */}
                      <div style={{ 
                        backgroundColor: '#f8fafc', 
                        padding: '1.5rem', 
                        borderRadius: '12px',
                        border: '1px solid #e5e7eb'
                      }}>
                        <h3 style={{ 
                          fontSize: '1rem', 
                          fontWeight: '600', 
                          color: '#112F33', 
                          marginBottom: '1rem',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem'
                        }}>
                          👤 Información Personal
                        </h3>
                        
                        <div style={{ display: 'grid', gap: '1rem' }}>
                          <div>
                            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#112F33', marginBottom: '0.5rem' }}>
                              Nombre completo *
                            </label>
                            <input
                              type="text"
                              value={currentPatientData.name}
                              onChange={(e) => setCurrentPatientData(prev => ({ ...prev, name: e.target.value }))}
                              placeholder="Ej: Juan Pérez García"
                              required
                              style={{
                                width: '100%',
                                padding: '0.75rem',
                                border: '1px solid #d1d5db',
                                borderRadius: '8px',
                                fontSize: '0.875rem',
                                outline: 'none',
                                boxSizing: 'border-box'
                              }}
                              onFocus={(e) => e.target.style.borderColor = '#29A98C'}
                              onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                            />
                          </div>

                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                            <div>
                              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#112F33', marginBottom: '0.5rem' }}>
                                Fecha de nacimiento
                              </label>
                              <input
                                type="date"
                                value={currentPatientData.birthDate}
                                onChange={(e) => setCurrentPatientData(prev => ({ ...prev, birthDate: e.target.value }))}
                                style={{
                                  width: '100%',
                                  padding: '0.75rem',
                                  border: '1px solid #d1d5db',
                                  borderRadius: '8px',
                                  fontSize: '0.875rem',
                                  outline: 'none',
                                  boxSizing: 'border-box'
                                }}
                                onFocus={(e) => e.target.style.borderColor = '#29A98C'}
                                onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                              />
                            </div>

                            <div>
                              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#112F33', marginBottom: '0.5rem' }}>
                                Sexo
                              </label>
                              <select
                                value={currentPatientData.gender}
                                onChange={(e) => setCurrentPatientData(prev => ({ ...prev, gender: e.target.value }))}
                                style={{
                                  width: '100%',
                                  padding: '0.75rem',
                                  border: '1px solid #d1d5db',
                                  borderRadius: '8px',
                                  fontSize: '0.875rem',
                                  outline: 'none',
                                  backgroundColor: 'white',
                                  boxSizing: 'border-box'
                                }}
                                onFocus={(e) => e.target.style.borderColor = '#29A98C'}
                                onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                              >
                                <option value="">Seleccionar...</option>
                                <option value="M">Masculino</option>
                                <option value="F">Femenino</option>
                                <option value="Otro">Otro</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Sección 2: Información de Contacto */}
                      <div style={{ 
                        backgroundColor: '#f0f9ff', 
                        padding: '1.5rem', 
                        borderRadius: '12px',
                        border: '1px solid #bae6fd'
                      }}>
                        <h3 style={{ 
                          fontSize: '1rem', 
                          fontWeight: '600', 
                          color: '#0c4a6e', 
                          marginBottom: '1rem',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem'
                        }}>
                          📧 Información de Contacto
                        </h3>
                        
                        <div style={{ display: 'grid', gap: '1rem' }}>
                          <div>
                            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#112F33', marginBottom: '0.5rem' }}>
                              Correo electrónico
                            </label>
                            <input
                              type="email"
                              value={currentPatientData.email}
                              onChange={(e) => setCurrentPatientData(prev => ({ ...prev, email: e.target.value }))}
                              placeholder="ejemplo@correo.com"
                              style={{
                                width: '100%',
                                padding: '0.75rem',
                                border: '1px solid #d1d5db',
                                borderRadius: '8px',
                                fontSize: '0.875rem',
                                outline: 'none',
                                boxSizing: 'border-box'
                              }}
                              onFocus={(e) => e.target.style.borderColor = '#29A98C'}
                              onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                            />
                          </div>

                          <div>
                            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#112F33', marginBottom: '0.5rem' }}>
                              Teléfono / WhatsApp
                            </label>
                            <input
                              type="tel"
                              value={currentPatientData.phone}
                              onChange={(e) => setCurrentPatientData(prev => ({ ...prev, phone: e.target.value }))}
                              placeholder="+34 612 345 678"
                              style={{
                                width: '100%',
                                padding: '0.75rem',
                                border: '1px solid #d1d5db',
                                borderRadius: '8px',
                                fontSize: '0.875rem',
                                outline: 'none',
                                boxSizing: 'border-box'
                              }}
                              onFocus={(e) => e.target.style.borderColor = '#29A98C'}
                              onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Sección 3: Información Clínica */}
                      <div style={{ 
                        backgroundColor: '#fff7ed', 
                        padding: '1.5rem', 
                        borderRadius: '12px',
                        border: '1px solid #fed7aa'
                      }}>
                        <h3 style={{ 
                          fontSize: '1rem', 
                          fontWeight: '600', 
                          color: '#9a3412', 
                          marginBottom: '1rem',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem'
                        }}>
                          🏥 Información Clínica
                        </h3>
                        
                        <div style={{ display: 'grid', gap: '1rem' }}>
                          <div>
                            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#112F33', marginBottom: '0.5rem' }}>
                              Diagnóstico / Motivo de consulta
                            </label>
                            <input
                              type="text"
                              value={currentPatientData.diagnosis}
                              onChange={(e) => setCurrentPatientData(prev => ({ ...prev, diagnosis: e.target.value }))}
                              placeholder="Ej: Ansiedad generalizada, Depresión mayor..."
                              style={{
                                width: '100%',
                                padding: '0.75rem',
                                border: '1px solid #d1d5db',
                                borderRadius: '8px',
                                fontSize: '0.875rem',
                                outline: 'none',
                                boxSizing: 'border-box'
                              }}
                              onFocus={(e) => e.target.style.borderColor = '#29A98C'}
                              onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                            />
                          </div>

                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                            <div>
                              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#112F33', marginBottom: '0.5rem' }}>
                                Referido por
                              </label>
                              <input
                                type="text"
                                value={currentPatientData.referringProfessional}
                                onChange={(e) => setCurrentPatientData(prev => ({ ...prev, referringProfessional: e.target.value }))}
                                placeholder="Ej: Dr. García, Hospital Central..."
                                style={{
                                  width: '100%',
                                  padding: '0.75rem',
                                  border: '1px solid #d1d5db',
                                  borderRadius: '8px',
                                  fontSize: '0.875rem',
                                  outline: 'none',
                                  boxSizing: 'border-box'
                                }}
                                onFocus={(e) => e.target.style.borderColor = '#29A98C'}
                                onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                              />
                            </div>

                            <div>
                              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#112F33', marginBottom: '0.5rem' }}>
                                Primera consulta
                              </label>
                              <input
                                type="date"
                                value={currentPatientData.firstConsultDate}
                                onChange={(e) => setCurrentPatientData(prev => ({ ...prev, firstConsultDate: e.target.value }))}
                                style={{
                                  width: '100%',
                                  padding: '0.75rem',
                                  border: '1px solid #d1d5db',
                                  borderRadius: '8px',
                                  fontSize: '0.875rem',
                                  outline: 'none',
                                  boxSizing: 'border-box'
                                }}
                                onFocus={(e) => e.target.style.borderColor = '#29A98C'}
                                onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Sección 4: Contacto de Emergencia */}
                      <div style={{ 
                        backgroundColor: '#fef2f2', 
                        padding: '1.5rem', 
                        borderRadius: '12px',
                        border: '1px solid #fecaca'
                      }}>
                        <h3 style={{ 
                          fontSize: '1rem', 
                          fontWeight: '600', 
                          color: '#dc2626', 
                          marginBottom: '1rem',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem'
                        }}>
                          🚨 Contacto de Emergencia (Opcional)
                        </h3>
                        
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                          <div>
                            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#112F33', marginBottom: '0.5rem' }}>
                              Nombre y relación
                            </label>
                            <input
                              type="text"
                              value={currentPatientData.emergencyContact}
                              onChange={(e) => setCurrentPatientData(prev => ({ ...prev, emergencyContact: e.target.value }))}
                              placeholder="Ej: María Pérez (hermana)"
                              style={{
                                width: '100%',
                                padding: '0.75rem',
                                border: '1px solid #d1d5db',
                                borderRadius: '8px',
                                fontSize: '0.875rem',
                                outline: 'none',
                                boxSizing: 'border-box'
                              }}
                              onFocus={(e) => e.target.style.borderColor = '#29A98C'}
                              onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                            />
                          </div>

                          <div>
                            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#112F33', marginBottom: '0.5rem' }}>
                              Teléfono de emergencia
                            </label>
                            <input
                              type="tel"
                              value={currentPatientData.emergencyPhone}
                              onChange={(e) => setCurrentPatientData(prev => ({ ...prev, emergencyPhone: e.target.value }))}
                              placeholder="+34 612 345 678"
                              style={{
                                width: '100%',
                                padding: '0.75rem',
                                border: '1px solid #d1d5db',
                                borderRadius: '8px',
                                fontSize: '0.875rem',
                                outline: 'none',
                                boxSizing: 'border-box'
                              }}
                              onFocus={(e) => e.target.style.borderColor = '#29A98C'}
                              onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Sección 5: Notas */}
                      <div style={{ 
                        backgroundColor: '#f3f4f6', 
                        padding: '1.5rem', 
                        borderRadius: '12px',
                        border: '1px solid #e5e7eb'
                      }}>
                        <h3 style={{ 
                          fontSize: '1rem', 
                          fontWeight: '600', 
                          color: '#374151', 
                          marginBottom: '1rem',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem'
                        }}>
                          📝 Notas Adicionales
                        </h3>
                        
                        <div>
                          <textarea
                            value={currentPatientData.notes}
                            onChange={(e) => setCurrentPatientData(prev => ({ ...prev, notes: e.target.value }))}
                            placeholder="Notas adicionales, observaciones especiales, medicación actual, etc."
                            rows="3"
                            style={{
                              width: '100%',
                              padding: '0.75rem',
                              border: '1px solid #d1d5db',
                              borderRadius: '8px',
                              fontSize: '0.875rem',
                              outline: 'none',
                              resize: 'vertical',
                              fontFamily: 'inherit',
                              boxSizing: 'border-box'
                            }}
                            onFocus={(e) => e.target.style.borderColor = '#29A98C'}
                            onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                          />
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                      <button
                        type="button"
                        onClick={() => setShowNewPatientModal(false)}
                        style={{
                          flex: 1,
                          padding: '0.75rem',
                          backgroundColor: '#f1f5f9',
                          color: '#475569',
                          border: '1px solid #e2e8f0',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          fontSize: '0.875rem',
                          fontWeight: '600'
                        }}
                      >
                        Cancelar
                      </button>
                      <button
                        type="submit"
                        style={{
                          flex: 1,
                          padding: '0.75rem',
                          backgroundColor: '#29A98C',
                          color: 'white',
                          border: 'none',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          fontSize: '0.875rem',
                          fontWeight: '600'
                        }}
                      >
                        Crear Paciente
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
                </>
              )
            })()}
          </div>
        </div>
      )}

      {/* Página de Reportes - Modern Analytics Dashboard */}
      {currentPage === 'reportes' && isAuthenticated && (
        <div style={{ backgroundColor: '#f8fafc', minHeight: 'calc(100vh - 4rem)', padding: '1.5rem' }}>
          <div style={{ maxWidth: '120rem', margin: '0 auto' }}>
            
            {/* Modern Header Section */}
            <div style={{ 
              background: 'linear-gradient(135deg, #29A98C 0%, #22875c 100%)', 
              borderRadius: '16px', 
              padding: '2rem', 
              marginBottom: '2rem',
              color: '#112F33',
              boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem' }}>
                <div>
                  <h1 style={{ 
                    fontSize: '2.5rem', 
                    fontWeight: '700', 
                    margin: 0, 
                    marginBottom: '0.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem'
                  }}>
                    <SvgIcon name="report" size="2.5rem" />
                    Analytics Dashboard
                  </h1>
                  <p style={{ fontSize: '1.125rem', opacity: '0.9', margin: 0, fontWeight: '300' }}>
                    Insights completos de tu práctica clínica
                  </p>
                </div>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <select style={{
                    padding: '0.75rem 1rem',
                    backgroundColor: 'rgba(255,255,255,0.9)',
                    border: '1px solid rgba(17,47,51,0.2)',
                    borderRadius: '8px',
                    color: '#112F33',
                    fontSize: '0.875rem',
                    cursor: 'pointer'
                  }}>
                    <option>Último mes</option>
                    <option>Últimos 3 meses</option>
                    <option>Último año</option>
                  </select>
                  <button style={{
                    padding: '0.75rem 1.5rem',
                    backgroundColor: 'rgba(255,255,255,0.9)',
                    border: '1px solid rgba(17,47,51,0.2)',
                    borderRadius: '8px',
                    color: '#112F33',
                    cursor: 'pointer',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    <SvgIcon name="dashboard" size="1rem" />
                    Exportar Reporte
                  </button>
                </div>
              </div>
            </div>

            {/* Key Performance Indicators */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
              
              {/* Pacientes Activos */}
              <div style={{ 
                backgroundColor: 'white', 
                borderRadius: '16px', 
                padding: '2rem', 
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                border: '1px solid #e5e7eb',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <div style={{ position: 'absolute', top: 0, right: 0, width: '80px', height: '80px', background: 'linear-gradient(135deg, #29A98C20, #29A98C05)', borderRadius: '0 16px 0 80px' }}></div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem' }}>
                  <div style={{ 
                    width: '4rem', 
                    height: '4rem', 
                    backgroundColor: '#E8F5F1', 
                    borderRadius: '12px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    marginRight: '1rem'
                  }}>
                    <SvgIcon name="team-member" size="2rem" />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '0.875rem', fontWeight: '600', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.1em', margin: 0 }}>
                      Pacientes Activos
                    </h3>
                    <p style={{ fontSize: '2.25rem', fontWeight: '800', color: '#112F33', margin: 0, lineHeight: '1' }}>156</p>
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <span style={{ 
                    color: '#10b981', 
                    fontSize: '0.875rem', 
                    fontWeight: '600',
                    backgroundColor: '#ecfdf5',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '20px'
                  }}>
                    ↗ +12% vs mes anterior
                  </span>
                  <span style={{ color: '#64748b', fontSize: '0.875rem' }}>Nuevos: 42</span>
                </div>
                <div style={{ 
                  backgroundColor: '#f8fafc', 
                  borderRadius: '8px', 
                  padding: '0.75rem',
                  fontSize: '0.875rem', 
                  color: '#64748b' 
                }}>
                  <strong style={{ color: '#29A98C' }}>8 pacientes</strong> registrados esta semana
                </div>
              </div>

              {/* Evaluaciones Completadas */}
              <div style={{ 
                backgroundColor: 'white', 
                borderRadius: '16px', 
                padding: '2rem', 
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                border: '1px solid #e5e7eb',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <div style={{ position: 'absolute', top: 0, right: 0, width: '80px', height: '80px', background: 'linear-gradient(135deg, #29A98C20, #29A98C05)', borderRadius: '0 16px 0 80px' }}></div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem' }}>
                  <div style={{ 
                    width: '4rem', 
                    height: '4rem', 
                    backgroundColor: '#E8F5F1', 
                    borderRadius: '12px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    marginRight: '1rem'
                  }}>
                    <SvgIcon name="task-svgrepo-com" size="2rem" />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '0.875rem', fontWeight: '600', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.1em', margin: 0 }}>
                      Evaluaciones
                    </h3>
                    <p style={{ fontSize: '2.25rem', fontWeight: '800', color: '#112F33', margin: 0, lineHeight: '1' }}>1,234</p>
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <span style={{ 
                    color: '#29A98C', 
                    fontSize: '0.875rem', 
                    fontWeight: '600',
                    backgroundColor: '#E8F5F1',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '20px'
                  }}>
                    127 este mes
                  </span>
                  <span style={{ color: '#64748b', fontSize: '0.875rem' }}>Meta: 150</span>
                </div>
                <div style={{ 
                  backgroundColor: '#f8fafc', 
                  borderRadius: '8px', 
                  padding: '0.75rem',
                  fontSize: '0.875rem', 
                  color: '#64748b' 
                }}>
                  Promedio diario: <strong style={{ color: '#29A98C' }}>18.1 evaluaciones</strong>
                </div>
              </div>

              {/* Escalas Distribuidas */}
              <div style={{ 
                backgroundColor: 'white', 
                borderRadius: '16px', 
                padding: '2rem', 
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                border: '1px solid #e5e7eb',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <div style={{ position: 'absolute', top: 0, right: 0, width: '80px', height: '80px', background: 'linear-gradient(135deg, #EC736720, #EC736705)', borderRadius: '0 16px 0 80px' }}></div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem' }}>
                  <div style={{ 
                    width: '4rem', 
                    height: '4rem', 
                    backgroundColor: '#FFF8EE', 
                    borderRadius: '12px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    marginRight: '1rem'
                  }}>
                    <SvgIcon name="product-request-svgrepo-com" size="2rem" />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '0.875rem', fontWeight: '600', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.1em', margin: 0 }}>
                      Escalas Distribuidas
                    </h3>
                    <p style={{ fontSize: '2.25rem', fontWeight: '800', color: '#112F33', margin: 0, lineHeight: '1' }}>567</p>
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <span style={{ 
                    color: '#EC7367', 
                    fontSize: '0.875rem', 
                    fontWeight: '600',
                    backgroundColor: '#FFF8EE',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '20px'
                  }}>
                    89 este mes
                  </span>
                  <span style={{ color: '#64748b', fontSize: '0.875rem' }}>Via: Link/Email</span>
                </div>
                <div style={{ 
                  backgroundColor: '#f8fafc', 
                  borderRadius: '8px', 
                  padding: '0.75rem',
                  fontSize: '0.875rem', 
                  color: '#64748b' 
                }}>
                  <strong style={{ color: '#EC7367' }}>73% tasa de respuesta</strong> promedio
                </div>
              </div>

              {/* Tiempo Promedio */}
              <div style={{ 
                backgroundColor: 'white', 
                borderRadius: '16px', 
                padding: '2rem', 
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                border: '1px solid #e5e7eb',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <div style={{ position: 'absolute', top: 0, right: 0, width: '80px', height: '80px', background: 'linear-gradient(135deg, #ec736720, #ec736705)', borderRadius: '0 16px 0 80px' }}></div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem' }}>
                  <div style={{ 
                    width: '4rem', 
                    height: '4rem', 
                    backgroundColor: '#FFF8EE', 
                    borderRadius: '12px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    marginRight: '1rem'
                  }}>
                    <SvgIcon name="operating-hours-svgrepo-com" size="2rem" />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '0.875rem', fontWeight: '600', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.1em', margin: 0 }}>
                      Tiempo Promedio
                    </h3>
                    <p style={{ fontSize: '2.25rem', fontWeight: '800', color: '#112F33', margin: 0, lineHeight: '1' }}>4.2<span style={{ fontSize: '1rem', color: '#64748b' }}>min</span></p>
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <span style={{ 
                    color: '#29A98C', 
                    fontSize: '0.875rem', 
                    fontWeight: '600',
                    backgroundColor: '#E8F5F1',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '20px'
                  }}>
                    ↘ -0.6min mejora
                  </span>
                  <span style={{ color: '#64748b', fontSize: '0.875rem' }}>Meta: &lt;4min</span>
                </div>
                <div style={{ 
                  backgroundColor: '#f8fafc', 
                  borderRadius: '8px', 
                  padding: '0.75rem',
                  fontSize: '0.875rem', 
                  color: '#64748b' 
                }}>
                  <strong style={{ color: '#EC7367' }}>94.3% tasa de finalización</strong>
                </div>
              </div>
            </div>

            {/* Analytics Cards - Modern List/Card Format */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))', gap: '2rem' }}>
              
              {/* Top Performing Scales - List Format */}
              <div style={{ 
                backgroundColor: 'white', 
                borderRadius: '16px', 
                padding: '2rem', 
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                border: '1px solid #e5e7eb'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem' }}>
                  <SvgIcon name="opportunity-svgrepo-com" size="1.5rem" />
                  <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#112F33', margin: 0, marginLeft: '0.75rem' }}>
                    Escalas Top Performance
                  </h3>
                </div>
                
                <div style={{ display: 'grid', gap: '1rem' }}>
                  {[
                    { 
                      name: 'PHQ-9 - Depression Scale', 
                      uses: 89, 
                      completion: 97, 
                      avgTime: '3.2min',
                      trend: '+15%',
                      color: '#29A98C'
                    },
                    { 
                      name: 'GAD-7 - Anxiety Scale', 
                      uses: 23, 
                      completion: 94, 
                      avgTime: '2.8min',
                      trend: '+8%',
                      color: '#3b82f6'
                    },
                    { 
                      name: 'Beck Depression Inventory', 
                      uses: 15, 
                      completion: 89, 
                      avgTime: '5.1min',
                      trend: '-2%',
                      color: '#f59e0b'
                    },
                    { 
                      name: 'Hamilton Depression Scale', 
                      uses: 7, 
                      completion: 86, 
                      avgTime: '6.3min',
                      trend: 'Nuevo',
                      color: '#ec7367'
                    }
                  ].map((scale, index) => (
                    <div key={index} style={{
                      padding: '1.5rem',
                      backgroundColor: '#f8fafc',
                      borderRadius: '12px',
                      border: '1px solid #e2e8f0',
                      transition: 'all 0.2s'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                        <div>
                          <h4 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#112F33', margin: 0, marginBottom: '0.25rem' }}>
                            {scale.name}
                          </h4>
                          <div style={{ display: 'flex', gap: '1rem', fontSize: '0.875rem', color: '#64748b' }}>
                            <span>{scale.uses} usos</span>
                            <span>{scale.completion}% completada</span>
                            <span>{scale.avgTime} promedio</span>
                          </div>
                        </div>
                        <span style={{ 
                          fontSize: '0.875rem', 
                          fontWeight: '600',
                          color: scale.trend.includes('+') ? '#10b981' : scale.trend.includes('-') ? '#ef4444' : '#64748b',
                          backgroundColor: scale.trend.includes('+') ? '#ecfdf5' : scale.trend.includes('-') ? '#fef2f2' : '#f3f4f6',
                          padding: '0.25rem 0.75rem',
                          borderRadius: '20px'
                        }}>
                          {scale.trend}
                        </span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ flex: 1, backgroundColor: '#e2e8f0', borderRadius: '8px', height: '8px' }}>
                          <div style={{
                            backgroundColor: scale.color,
                            height: '100%',
                            width: `${(scale.uses / 89) * 100}%`,
                            borderRadius: '8px'
                          }}></div>
                        </div>
                        <span style={{ fontSize: '0.875rem', fontWeight: '600', color: scale.color }}>
                          {Math.round((scale.uses / 89) * 100)}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Patient Demographics - Modern Card */}
              <div style={{ 
                backgroundColor: 'white', 
                borderRadius: '16px', 
                padding: '2rem', 
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                border: '1px solid #e5e7eb'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem' }}>
                  <SvgIcon name="people" size="1.5rem" />
                  <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#112F33', margin: 0, marginLeft: '0.75rem' }}>
                    Demografía de Pacientes
                  </h3>
                </div>
                
                {/* Gender Distribution */}
                <div style={{ marginBottom: '2rem' }}>
                  <h4 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#112F33', marginBottom: '1rem' }}>
                    Distribución por Género
                  </h4>
                  <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                    <div style={{ 
                      width: '120px', 
                      height: '120px', 
                      borderRadius: '50%',
                      background: `conic-gradient(
                        #29A98C 0deg 216deg,
                        #EC7367 216deg 288deg,
                        #112F33 288deg 360deg
                      )`,
                      position: 'relative',
                      boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)'
                    }}>
                      <div style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        backgroundColor: 'white',
                        width: '60px',
                        height: '60px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1rem',
                        fontWeight: 'bold',
                        color: '#112F33',
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
                      }}>
                        156
                      </div>
                    </div>
                    <div style={{ flex: 1 }}>
                      {[
                        { label: 'Femenino', value: 94, percentage: 60, color: '#29A98C' },
                        { label: 'Masculino', value: 42, percentage: 27, color: '#EC7367' },
                        { label: 'Otro/No especifica', value: 20, percentage: 13, color: '#112F33' }
                      ].map((item, index) => (
                        <div key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <div style={{ width: '16px', height: '16px', backgroundColor: item.color, borderRadius: '4px' }}></div>
                            <span style={{ fontSize: '0.875rem', color: '#64748b', fontWeight: '500' }}>{item.label}</span>
                          </div>
                          <div style={{ textAlign: 'right' }}>
                            <span style={{ fontSize: '1rem', fontWeight: '700', color: '#112F33' }}>{item.value}</span>
                            <span style={{ fontSize: '0.875rem', color: '#64748b', marginLeft: '0.25rem' }}>({item.percentage}%)</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Age Groups */}
                <div>
                  <h4 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#112F33', marginBottom: '1rem' }}>
                    Grupos de Edad
                  </h4>
                  <div style={{ display: 'grid', gap: '0.75rem' }}>
                    {[
                      { range: '18-25 años', count: 32, percentage: 21 },
                      { range: '26-35 años', count: 45, percentage: 29 },
                      { range: '36-45 años', count: 38, percentage: 24 },
                      { range: '46-55 años', count: 25, percentage: 16 },
                      { range: '56+ años', count: 16, percentage: 10 }
                    ].map((group, index) => (
                      <div key={index} style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '1rem',
                        padding: '0.75rem',
                        backgroundColor: '#f8fafc',
                        borderRadius: '8px',
                        border: '1px solid #e2e8f0'
                      }}>
                        <span style={{ fontSize: '0.875rem', color: '#64748b', minWidth: '90px', fontWeight: '500' }}>{group.range}</span>
                        <div style={{ flex: 1, backgroundColor: '#e2e8f0', borderRadius: '6px', height: '10px', position: 'relative' }}>
                          <div style={{
                            backgroundColor: '#29A98C',
                            height: '100%',
                            width: `${group.percentage}%`,
                            borderRadius: '6px'
                          }}></div>
                        </div>
                        <span style={{ fontSize: '0.875rem', fontWeight: '700', color: '#112F33', minWidth: '50px', textAlign: 'right' }}>
                          {group.count}
                        </span>
                        <span style={{ fontSize: '0.75rem', color: '#64748b', minWidth: '35px', textAlign: 'right' }}>
                          {group.percentage}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Recent Activities - Enhanced List */}
              <div style={{ 
                backgroundColor: 'white', 
                borderRadius: '16px', 
                padding: '2rem', 
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                border: '1px solid #e5e7eb'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <SvgIcon name="product-request-svgrepo-com" size="2rem" />
                    <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#112F33', margin: 0, marginLeft: '0.75rem' }}>
                      Actividad Reciente
                    </h3>
                  </div>
                  <button style={{
                    padding: '0.5rem 1rem',
                    backgroundColor: '#f8fafc',
                    color: '#29A98C',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '0.875rem',
                    fontWeight: '600'
                  }}>
                    Ver todo
                  </button>
                </div>
                
                <div style={{ display: 'grid', gap: '1rem' }}>
                  {[
                    { 
                      action: 'Evaluación PHQ-9 completada', 
                      patient: 'María García', 
                      time: 'Hace 2 minutos', 
                      status: 'success',
                      icon: 'task-svgrepo-com'
                    },
                    { 
                      action: 'Nuevo paciente registrado', 
                      patient: 'Carlos Mendoza (28 años)', 
                      time: 'Hace 15 minutos', 
                      status: 'info',
                      icon: 'person-name-svgrepo-com'
                    },
                    { 
                      action: 'Escala GAD-7 enviada por email', 
                      patient: 'Ana López', 
                      time: 'Hace 1 hora', 
                      status: 'warning',
                      icon: 'product-request-svgrepo-com'
                    },
                    { 
                      action: 'Beck-21 finalizada con resultados', 
                      patient: 'Pedro Ruiz', 
                      time: 'Hace 2 horas', 
                      status: 'success',
                      icon: 'task-svgrepo-com'
                    },
                    { 
                      action: 'Reporte mensual generado', 
                      patient: 'Sistema automático', 
                      time: 'Hace 4 horas', 
                      status: 'info',
                      icon: 'report'
                    }
                  ].map((activity, index) => (
                    <div key={index} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      padding: '1rem',
                      backgroundColor: index < 2 ? '#f8fafc' : 'transparent',
                      borderRadius: '8px',
                      border: index < 2 ? '1px solid #e2e8f0' : 'none'
                    }}>
                      <div style={{ 
                        width: '3rem', 
                        height: '3rem', 
                        backgroundColor: 
                          activity.status === 'success' ? '#ecfdf5' :
                          activity.status === 'warning' ? '#fef3c7' : '#dbeafe',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <SvgIcon name={activity.icon} size="1.25rem" />
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ fontSize: '1rem', color: '#112F33', fontWeight: '600', margin: 0, marginBottom: '0.25rem' }}>
                          {activity.action}
                        </p>
                        <p style={{ fontSize: '0.875rem', color: '#64748b', margin: 0 }}>
                          {activity.patient}
                        </p>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: '500' }}>
                          {activity.time}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Performance Insights */}
              <div style={{ 
                backgroundColor: 'white', 
                borderRadius: '16px', 
                padding: '2rem', 
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                border: '1px solid #e5e7eb'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem' }}>
                  <SvgIcon name="calculated-insights-svgrepo-com" size="1.5rem" />
                  <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#112F33', margin: 0, marginLeft: '0.75rem' }}>
                    Insights de Rendimiento
                  </h3>
                </div>
                
                <div style={{ display: 'grid', gap: '1.5rem' }}>
                  
                  {/* Key Metrics */}
                  <div style={{ 
                    padding: '1.5rem', 
                    backgroundColor: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)', 
                    borderRadius: '12px', 
                    border: '1px solid #cbd5e1'
                  }}>
                    <h4 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#112F33', marginBottom: '1rem' }}>
                      Métricas Clave del Mes
                    </h4>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                      {[
                        { label: 'Tiempo promedio por evaluación', value: '4.2 min', color: '#29A98C' },
                        { label: 'Tasa de finalización', value: '94.3%', color: '#3b82f6' },
                        { label: 'Satisfacción promedio', value: '4.8/5', color: '#f59e0b' },
                        { label: 'Escalas por paciente', value: '2.9', color: '#ec7367' }
                      ].map((metric, index) => (
                        <div key={index}>
                          <p style={{ fontSize: '0.875rem', color: '#64748b', margin: 0, marginBottom: '0.25rem' }}>
                            {metric.label}
                          </p>
                          <p style={{ fontSize: '1.5rem', fontWeight: '800', color: metric.color, margin: 0 }}>
                            {metric.value}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Monthly Comparison */}
                  <div>
                    <h4 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#112F33', marginBottom: '1rem' }}>
                      Comparación Mensual
                    </h4>
                    <div style={{ display: 'grid', gap: '0.75rem' }}>
                      {[
                        { metric: 'Nuevos pacientes', current: 42, previous: 38, trend: 'up' },
                        { metric: 'Evaluaciones completadas', current: 127, previous: 156, trend: 'down' },
                        { metric: 'Escalas distribuidas', current: 89, previous: 67, trend: 'up' },
                        { metric: 'Tiempo promedio', current: '4.2 min', previous: '4.8 min', trend: 'up' }
                      ].map((item, index) => (
                        <div key={index} style={{ 
                          display: 'flex', 
                          justifyContent: 'space-between', 
                          alignItems: 'center', 
                          padding: '1rem',
                          backgroundColor: '#f8fafc',
                          borderRadius: '8px',
                          border: '1px solid #e2e8f0'
                        }}>
                          <span style={{ fontSize: '0.875rem', color: '#64748b', fontWeight: '500' }}>{item.metric}</span>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <span style={{ fontSize: '0.875rem', fontWeight: '700', color: '#112F33' }}>{item.current}</span>
                            <div style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.25rem',
                              padding: '0.125rem 0.5rem',
                              borderRadius: '12px',
                              fontSize: '0.75rem',
                              fontWeight: '600',
                              backgroundColor: item.trend === 'up' ? '#ecfdf5' : '#fef2f2',
                              color: item.trend === 'up' ? '#10b981' : '#ef4444'
                            }}>
                              {item.trend === 'up' ? '↗' : '↘'}
                              {item.trend === 'up' ? 'Mejora' : 'Declive'}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Popup de selección de escalas para paciente */}
      {showScaleSelectionPopup && scaleSelectionPatient && (
        <div style={{ 
          position: 'fixed', 
          top: 0, 
          left: 0, 
          right: 0, 
          bottom: 0, 
          backgroundColor: 'rgba(0, 0, 0, 0.5)', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          zIndex: 9999,
          padding: '1rem'
        }}>
          <div style={{ 
            backgroundColor: 'white', 
            borderRadius: '16px', 
            width: '100%', 
            maxWidth: '800px', 
            maxHeight: '80vh', 
            overflow: 'hidden',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
          }}>
            {/* Header */}
            <div style={{ 
              padding: '2rem 2rem 1rem', 
              borderBottom: '1px solid #e2e8f0',
              background: 'linear-gradient(135deg, #29A98C 0%, #22C55E 100%)',
              color: 'white'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: '700', margin: 0 }}>
                  Seleccionar Escala para Evaluación
                </h2>
                <button 
                  onClick={() => {
                    setShowScaleSelectionPopup(false)
                    setScaleSelectionPatient(null)
                  }}
                  style={{ 
                    background: 'rgba(255, 255, 255, 0.2)', 
                    border: 'none', 
                    borderRadius: '8px', 
                    padding: '0.5rem', 
                    color: 'white', 
                    cursor: 'pointer',
                    fontSize: '1.5rem',
                    lineHeight: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  ×
                </button>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ 
                  width: '3rem', 
                  height: '3rem', 
                  backgroundColor: 'rgba(255, 255, 255, 0.2)', 
                  borderRadius: '50%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  fontSize: '1.5rem'
                }}>
                  👤
                </div>
                <div>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: '600', margin: 0, marginBottom: '0.25rem' }}>
                    {scaleSelectionPatient.name}
                  </h3>
                  <p style={{ fontSize: '0.875rem', opacity: '0.9', margin: 0 }}>
                    Selecciona la escala que deseas aplicar a este paciente
                  </p>
                </div>
              </div>
            </div>

            {/* Lista de escalas */}
            <div style={{ 
              padding: '1.5rem', 
              maxHeight: 'calc(80vh - 200px)', 
              overflowY: 'auto'
            }}>
              <div style={{ display: 'grid', gap: '0.75rem' }}>
                {(() => {
                  try {
                    const orderedScales = getOrderedScalesForPatient(scaleSelectionPatient)
                    if (!orderedScales || orderedScales.length === 0) {
                      return (
                        <div style={{ textAlign: 'center', padding: '2rem', color: '#64748b' }}>
                          No hay escalas disponibles
                        </div>
                      )
                    }
                    return orderedScales.map((scale, index) => {
                  // Contar evaluaciones previas de esta escala para este paciente
                  const patientEvaluations = evaluationHistory.filter(evaluation => 
                    evaluation.patient === scaleSelectionPatient.name && 
                    evaluation.scale.toLowerCase().replace(/[^a-z0-9]/g, '') === scale.id
                  )
                  const previousEvaluations = patientEvaluations.length

                  return (
                    <div 
                      key={scale.id}
                      onClick={() => selectScaleForPatient(scale.id)}
                      style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '1rem',
                        padding: '1rem 1.5rem', 
                        backgroundColor: index < 3 ? '#f8fafc' : 'white',
                        border: index < 3 ? '2px solid #29A98C' : '1px solid #e2e8f0',
                        borderRadius: '12px', 
                        cursor: 'pointer', 
                        transition: 'all 0.2s ease'
                      }}
                      onMouseOver={(e) => {
                        e.target.style.backgroundColor = '#f1f5f9'
                        e.target.style.transform = 'translateY(-1px)'
                        e.target.style.boxShadow = '0 4px 12px rgba(41, 169, 140, 0.15)'
                      }}
                      onMouseOut={(e) => {
                        e.target.style.backgroundColor = index < 3 ? '#f8fafc' : 'white'
                        e.target.style.transform = 'translateY(0)'
                        e.target.style.boxShadow = 'none'
                      }}
                    >
                      {/* Icono de la escala */}
                      <div style={{ 
                        width: '3rem', 
                        height: '3rem', 
                        backgroundColor: scale.color || '#29A98C', 
                        borderRadius: '8px', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: '1.25rem',
                        fontWeight: 'bold',
                        flexShrink: 0
                      }}>
                        {scale.shortName?.substring(0, 2) || scale.fullName.substring(0, 2)}
                      </div>

                      {/* Información de la escala */}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                          <h4 style={{ fontSize: '1rem', fontWeight: '700', color: '#112F33', margin: 0 }}>
                            {scale.fullName}
                          </h4>
                          {index < 3 && (
                            <span style={{
                              fontSize: '0.75rem',
                              fontWeight: '600',
                              backgroundColor: '#29A98C',
                              color: 'white',
                              padding: '0.125rem 0.5rem',
                              borderRadius: '12px'
                            }}>
                              Favorita
                            </span>
                          )}
                        </div>
                        <p style={{ fontSize: '0.875rem', color: '#64748b', margin: 0, marginBottom: '0.5rem' }}>
                          {scale.description}
                        </p>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.75rem', color: '#64748b' }}>
                          <span>⏱️ {scale.duration} min</span>
                          <span>📋 {scale.questions} preguntas</span>
                          <span>👥 {scale.applicationType}</span>
                          {previousEvaluations > 0 && (
                            <span style={{ 
                              color: '#29A98C', 
                              fontWeight: '600',
                              backgroundColor: '#ecfdf5',
                              padding: '0.125rem 0.375rem',
                              borderRadius: '8px'
                            }}>
                              ✓ {previousEvaluations} evaluación{previousEvaluations !== 1 ? 'es' : ''} previa{previousEvaluations !== 1 ? 's' : ''}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Flecha de acción */}
                      <div style={{ 
                        fontSize: '1.25rem', 
                        color: '#29A98C',
                        flexShrink: 0
                      }}>
                        →
                      </div>
                    </div>
                  )
                    })
                  } catch (error) {
                    console.error('Error loading scales:', error)
                    return (
                      <div style={{ textAlign: 'center', padding: '2rem', color: '#ef4444' }}>
                        Error al cargar las escalas. Por favor, recarga la página.
                      </div>
                    )
                  }
                })()}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}