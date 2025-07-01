'use client'

export default function Header({ user, onLogout }) {
  return (
    <header style={{ 
      background: 'linear-gradient(135deg, #29A98C 0%, #112F33 100%)',
      color: 'white',
      padding: '1rem 0',
      marginBottom: '2rem'
    }}>
      <div className="container" style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center' 
      }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: 0 }}>
            Clinimetrix
          </h1>
          <p style={{ fontSize: '0.9rem', opacity: '0.9', margin: 0 }}>
            MindHub - Escalas Psicológicas
          </p>
        </div>
        
        {user && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span>Hola, {user.name}</span>
            <button
              onClick={onLogout}
              style={{
                background: 'rgba(255,255,255,0.2)',
                border: '1px solid rgba(255,255,255,0.3)',
                color: 'white',
                padding: '0.5rem 1rem',
                borderRadius: '0.5rem',
                cursor: 'pointer'
              }}
            >
              Cerrar Sesión
            </button>
          </div>
        )}
      </div>
    </header>
  )
}