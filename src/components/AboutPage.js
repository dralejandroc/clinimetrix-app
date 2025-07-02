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
                <h3 className="font-semibold text-primary-700 mb-2">14+ Escalas Validadas</h3>
                <p className="text-sm text-gray-600">
                  Amplia biblioteca de escalas clinimétricas estandarizadas para uso de profesionales de la salud mental validadas científicamente
                </p>
              </div>
              <div className="bg-primary-50 p-4 rounded-lg">
                <h3 className="font-semibold text-primary-700 mb-2">Gestión de Pacientes</h3>
                <p className="text-sm text-gray-600">
                  Sistema completo para organizar tus evaluaciones y dar seguimiento objetivo de tus pacientes, mediante escalas clinimétricas estandarizadas, ya sea en tu consulta de manera presencial, o enviando links personalizados y recibiendo los resultados en la plataforma
                </p>
              </div>
              <div className="bg-primary-50 p-4 rounded-lg">
                <h3 className="font-semibold text-primary-700 mb-2">Reportes Automáticos</h3>
                <p className="text-sm text-gray-600">
                  Interpretaciones clínicas automáticas basadas en criterios científicos estandarizados, con advertencias específicas y conductas a seguir de manera instantánea
                </p>
              </div>
              <div className="bg-primary-50 p-4 rounded-lg">
                <h3 className="font-semibold text-primary-700 mb-2">Historial Clínico</h3>
                <p className="text-sm text-gray-600">
                  Seguimiento longitudinal de la evolución de tus pacientes según resultados de evaluaciones administradas
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-semibold text-primary-600 mb-4">Escalas Disponibles</h2>
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div>
                  <h4 className="font-medium mb-2">Escalas de Depresión:</h4>
                  <ul className="space-y-1 text-gray-600">
                    <li>• PHQ-9 - Patient Health Questionnaire-9</li>
                    <li>• Beck-21 - Inventario de Depresión de Beck</li>
                    <li>• BDI-13 - Beck Depression Inventory (Versión Abreviada)</li>
                    <li>• CDI - Cuestionario de Depresión Infantil</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Escalas de Ansiedad:</h4>
                  <ul className="space-y-1 text-gray-600">
                    <li>• GADI - Inventario de Ansiedad Generalizada</li>
                    <li>• HARS - Escala de Hamilton para la Ansiedad</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Escalas de Sueño:</h4>
                  <ul className="space-y-1 text-gray-600">
                    <li>• MOS Sleep - Escala de Sueño MOS</li>
                  </ul>
                </div>
              </div>
              <div className="grid md:grid-cols-3 gap-4 text-sm mt-4">
                <div>
                  <h4 className="font-medium mb-2">Escalas de Personalidad:</h4>
                  <ul className="space-y-1 text-gray-600">
                    <li>• BLS-23 - Lista de Síntomas de Trastorno Límite</li>
                    <li>• IPDE - Examen Internacional de Trastornos de Personalidad</li>
                    <li>• Salamanca - Cuestionario Salamanca de Trastornos de Personalidad</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Escalas de TEA:</h4>
                  <ul className="space-y-1 text-gray-600">
                    <li>• AQ-Child - Cociente de TEA Niño (4-11 años)</li>
                    <li>• AQ-Adolescent - Cociente de TEA Adolescente (10-17 años)</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Escalas Especializadas:</h4>
                  <ul className="space-y-1 text-gray-600">
                    <li>• SSS-V - Escala de Búsqueda de Sensaciones</li>
                    <li>• AUDIT - Test de Identificación de Trastornos por Consumo de Alcohol</li>
                  </ul>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-semibold text-primary-600 mb-4">Para Profesionales</h2>
            <p className="text-gray-600 mb-4">
              Clinimetrix es una plataforma creada por psicólogos y psiquiatras, diseñada específicamente para los profesionales de la salud mental que utilizan herramientas clinimétricas en su práctica diaria. Ofrece instrumentos de evaluación intuitivos, confiables y respaldados por evidencia científica, con un diseño elegante y profesional, orientado a mejorar la calidad de atención a cada paciente y elevar el nivel de excelencia en su consulta.
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