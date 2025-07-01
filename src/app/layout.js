import './globals.css'

export const metadata = {
  title: 'Clinimetrix - MindHub',
  description: 'Plataforma profesional de escalas psicológicas y psiquiátricas',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <link rel="icon" href="/LogoPrincipal.svg" type="image/svg+xml" />
        <link rel="shortcut icon" href="/LogoPrincipal.svg" />
        <link rel="apple-touch-icon" href="/LogoPrincipal.svg" />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}