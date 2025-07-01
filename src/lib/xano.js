// Configuración de Xano API
export const XANO_CONFIG = {
  baseURL: 'https://x8ki-letl-twmt.n7.xano.io/api:6dMEiwI2',
  endpoints: {
    // Auth endpoints
    signup: '/auth/signup',
    login: '/auth/login',
    logout: '/auth/logout',
    me: '/auth/me',
    
    // User endpoints
    users: '/users',
    profile: '/users/profile',
    
    // Patient endpoints
    patients: '/patients',
    patientsByUser: '/patients/by-user',
    
    // Scale endpoints
    scales: '/scales',
    scaleApplications: '/scale-applications',
    applyScale: '/scale-applications/apply',
  }
}

// Función helper para hacer requests a Xano
export async function xanoRequest(endpoint, options = {}) {
  const url = `${XANO_CONFIG.baseURL}${endpoint}`
  
  const defaultHeaders = {
    'Content-Type': 'application/json',
  }
  
  // Agregar token de autenticación si existe
  const token = localStorage.getItem('authToken')
  if (token) {
    defaultHeaders['Authorization'] = `Bearer ${token}`
  }
  
  const config = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  }
  
  try {
    const response = await fetch(url, config)
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    return await response.json()
  } catch (error) {
    console.error('Xano request error:', error)
    throw error
  }
}

// Auth functions
export const authService = {
  async login(email, password) {
    const response = await xanoRequest(XANO_CONFIG.endpoints.login, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    })
    
    if (response.authToken) {
      localStorage.setItem('authToken', response.authToken)
    }
    
    return response
  },
  
  async signup(email, password, name) {
    return await xanoRequest(XANO_CONFIG.endpoints.signup, {
      method: 'POST',
      body: JSON.stringify({ email, password, name }),
    })
  },
  
  async logout() {
    await xanoRequest(XANO_CONFIG.endpoints.logout, { method: 'POST' })
    localStorage.removeItem('authToken')
  },
  
  async getCurrentUser() {
    return await xanoRequest(XANO_CONFIG.endpoints.me)
  }
}