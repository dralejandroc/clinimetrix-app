export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Acerca de Clinimetrix</h1>
          
          <div className="prose max-w-none">
            <h2 className="text-2xl font-semibold text-primary-600 mb-4">¿Qué es Clinimetrix?</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Clinimetrix es una plataforma profesional especializada en escalas psicológicas y psiquiátricas, 
              diseñada para profesionales de la salud mental que buscan herramientas confiables y basadas en 
              evidencia científica para la evaluación clínica.
            </p>

            <h2 className="text-2xl font-semibold text-primary-600 mb-4">Características Principales</h2>
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-primary-50 p-4 rounded-lg">
                <h3 className="font-semibold text-primary-700 mb-2">38+ Escalas Validadas</h3>
                <p className="text-sm text-gray-600">
                  Amplia biblioteca de escalas clinimetricas estandarizadas para uso de profesionales de la salud mental validadas científicamente
                </p>
              </div>
              <div className="bg-primary-50 p-4 rounded-lg">
                <h3 className="font-semibold text-primary-700 mb-2">Gestión de Pacientes</h3>
                <p className="text-sm text-gray-600">
                  Sistema completo para organizar y hacer seguimiento de tus pacientes
                </p>
              </div>
              <div className="bg-primary-50 p-4 rounded-lg">
                <h3 className="font-semibold text-primary-700 mb-2">Reportes Automáticos</h3>
                <p className="text-sm text-gray-600">
                  Interpretaciones clínicas automáticas basadas en criterios científicos estandarizados
                </p>
              </div>
              <div className="bg-primary-50 p-4 rounded-lg">
                <h3 className="font-semibold text-primary-700 mb-2">Historico de esclas aplicadas</h3>
                <p className="text-sm text-gray-600">
                  Seguimiento longitudinal de la evolución de tus pacientes segun resultados de evaluaciones administradas
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-semibold text-primary-600 mb-4">Escalas Disponibles</h2>
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h4 className="font-medium mb-2">Escalas de Depresión:</h4>
                  <ul className="space-y-1 text-gray-600">
                    <li>• PHQ-9</li>
                    <li>• Beck Depression Inventory (BDI-21, BDI-13)</li>
                    <li>• Hamilton Depression Rating Scale (HDRS)</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Escalas de Ansiedad:</h4>
                  <ul className="space-y-1 text-gray-600">
                    <li>• HADS (Hospital Anxiety and Depression Scale)</li>
                    <li>• STAI (State-Trait Anxiety Inventory)</li>
                    <li>• SPIN (Social Phobia Inventory)</li>
                  </ul>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-semibold text-primary-600 mb-4">Para Profesionales</h2>
            <p className="text-gray-600 mb-4">
              Clinimetrix está diseñado específicamente para psicólogos, psiquiatras, y otros profesionales 
              de la salud mental que requieren herramientas de evaluación confiables y eficientes, con evidencia cientifica validada.
            </p>
            
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
              <p className="text-sm text-yellow-800">
                <strong>Importante:</strong> Esta plataforma está destinada únicamente para uso profesional. 
                Todas las escalas deben ser administradas e interpretadas por personal calificado.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
