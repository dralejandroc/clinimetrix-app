'use client'

export default function HomePage() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#FFF8EE', padding: '2rem', textAlign: 'center' }}>
      <h1 style={{ color: '#29A98C', fontSize: '3rem', marginBottom: '2rem' }}>MindHub</h1>
      <h2 style={{ color: '#112F33', fontSize: '2rem', marginBottom: '1rem' }}>Clinimetrix</h2>
      <p style={{ color: '#112F33', fontSize: '1.25rem' }}>Sistema funcionando correctamente ✅</p>
      
      <div style={{ marginTop: '2rem', padding: '2rem', backgroundColor: 'white', borderRadius: '12px', maxWidth: '400px', margin: '2rem auto' }}>
        <h3 style={{ color: '#112F33', marginBottom: '1rem' }}>Login Simple</h3>
        <input style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem', border: '1px solid #ccc', borderRadius: '4px' }} placeholder="Email" />
        <input style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem', border: '1px solid #ccc', borderRadius: '4px' }} placeholder="Contraseña" type="password" />
        <button style={{ width: '100%', padding: '0.75rem', backgroundColor: '#29A98C', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Entrar
        </button>
      </div>
    </div>
  )
}