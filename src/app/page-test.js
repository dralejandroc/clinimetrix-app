export default function TestPage() {
  return (
    <div className="min-h-screen gradient-primary flex items-center justify-center">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold text-gray-900 text-center mb-4">
          ¡Clinimetrix Funciona!
        </h1>
        <p className="text-gray-600 text-center mb-6">
          Los estilos se están aplicando correctamente
        </p>
        <button className="w-full py-2 px-4 gradient-primary text-white rounded-md font-medium">
          Botón de Prueba
        </button>
      </div>
    </div>
  )
}