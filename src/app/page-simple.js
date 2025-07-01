export default function Home() {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1 style={{ color: '#29A98C', fontSize: '2rem', marginBottom: '1rem' }}>
        Clinimetrix - MindHub
      </h1>
      <p style={{ color: '#666', fontSize: '1.2rem' }}>
        Plataforma de escalas psicológicas
      </p>
      <div style={{ 
        background: 'white', 
        padding: '2rem', 
        borderRadius: '8px', 
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        marginTop: '2rem'
      }}>
        <h2>¡La aplicación está funcionando!</h2>
        <p>Próximamente: Sistema de autenticación y escalas</p>
      </div>
    </div>
  )
}