// PHQ-9 - Patient Health Questionnaire-9
// Cuestionario de autoevaluación para detectar y medir la gravedad de síntomas depresivos

export const phq9Questions = [
  'Poco interés o alegría para hacer las cosas',
  'Sensación de estar decaído, deprimido o desesperanzado',
  'Problemas para quedarse dormido, para seguir durmiendo o dormir demasiado',
  'Sensación de cansancio o de tener poca energía',
  'Poco apetito o comer demasiado',
  'Sentirse mal consigo mismo; sentir que es un fracasado o que ha decepcionado a su familia o a sí mismo',
  'Problemas para concentrarse en algo, como leer el periódico o ver la televisión',
  'Moverse o hablar tan despacio que los demás pueden haberlo notado. O lo contrario: estar tan inquieto o agitado que se ha estado moviendo de un lado a otro más de lo habitual',
  'Pensamientos de que estaría mejor muerto o de querer hacerse daño de algún modo'
]

export const phq9Options = [
  { value: 0, label: 'Nunca' },
  { value: 1, label: 'Varios días' },
  { value: 2, label: 'Más de la mitad de los días' },
  { value: 3, label: 'Casi todos los días' }
]

export const calculatePhq9Score = (responses = {}) => {
  let total = 0
  for (let i = 0; i < 9; i++) {
    total += responses[i] || 0
  }
  return {
    total,
    percentage: Math.round((total / 27) * 100)
  }
}

export const getDetailedInterpretation = (score) => {
  if (score >= 0 && score <= 4) {
    return {
      level: 'minimal',
      title: 'Sintomatología Depresiva Mínima',
      description: 'Los síntomas reportados son mínimos y no sugieren un episodio depresivo clínicamente significativo. Se recomienda monitoreo rutinario y promoción de hábitos saludables.',
      recommendations: 'Mantenimiento de rutinas saludables, ejercicio regular, y seguimiento preventivo.',
      className: 'level-minimal',
      color: '#48bb78'
    }
  } else if (score >= 5 && score <= 9) {
    return {
      level: 'mild',
      title: 'Sintomatología Depresiva Leve',
      description: 'Presencia de síntomas depresivos leves que pueden requerir vigilancia clínica. Se sugiere evaluación psicológica y consideración de intervenciones psicoterapéuticas.',
      recommendations: 'Evaluación psicológica, técnicas de manejo del estrés, y seguimiento clínico en 2-4 semanas.',
      className: 'level-mild',
      color: '#f6ad55'
    }
  } else if (score >= 10 && score <= 14) {
    return {
      level: 'moderate',
      title: 'Sintomatología Depresiva Moderada',
      description: 'Síntomas depresivos moderados que requieren intervención clínica activa. Se recomienda evaluación psiquiátrica y consideración de tratamiento psicoterapéutico y/o farmacológico.',
      recommendations: 'Evaluación psiquiátrica prioritaria, inicio de psicoterapia estructurada, y seguimiento clínico semanal.',
      className: 'level-moderate',
      color: '#ed8936'
    }
  } else if (score >= 15 && score <= 19) {
    return {
      level: 'moderate-severe',
      title: 'Sintomatología Depresiva Moderada-Severa',
      description: 'Síntomas depresivos moderados a severos que requieren intervención inmediata. Se recomienda evaluación psiquiátrica urgente y consideración de tratamiento combinado.',
      recommendations: 'Evaluación psiquiátrica urgente, tratamiento farmacológico y psicoterapéutico combinado, y seguimiento estrecho.',
      className: 'level-severe',
      color: '#f56565'
    }
  } else {
    return {
      level: 'severe',
      title: 'Sintomatología Depresiva Severa',
      description: 'Síntomas depresivos severos que requieren atención clínica inmediata y manejo especializado. Alto riesgo de deterioro funcional significativo.',
      recommendations: 'Evaluación psiquiátrica inmediata, hospitalización si es necesario, tratamiento intensivo combinado, y seguimiento diario.',
      className: 'level-severe',
      color: '#f56565'
    }
  }
}

export const checkClinicalAlerts = (responses = {}) => {
  const alerts = []
  
  // Check for suicidal ideation (question 9)
  if (responses[8] && responses[8] >= 1) {
    alerts.push({
      type: 'critical',
      title: '⚠️ ALERTA CRÍTICA: Ideación Suicida',
      message: 'El paciente reporta pensamientos de muerte o autolesión. Requiere evaluación inmediata de riesgo suicida y manejo de seguridad.',
      priority: 'urgent'
    })
  }

  // Check for high-scoring items (≥2 points = 66% of maximum)
  const highScoreItems = []
  const itemTexts = {
    0: 'Anhedonia (pérdida de interés/placer)',
    1: 'Estado de ánimo deprimido',
    2: 'Alteraciones del sueño',
    3: 'Fatiga/pérdida de energía',
    4: 'Alteraciones del apetito',
    5: 'Sentimientos de culpa/inutilidad',
    6: 'Problemas de concentración',
    7: 'Alteraciones psicomotoras'
  }

  for (let i = 0; i <= 7; i++) {
    if (responses[i] && responses[i] >= 2) {
      highScoreItems.push(itemTexts[i])
    }
  }

  if (highScoreItems.length > 0) {
    alerts.push({
      type: 'warning',
      title: '⚠️ Síntomas Significativos',
      message: 'Los siguientes síntomas requieren atención clínica: ' + highScoreItems.join(', ') + '.',
      priority: 'high'
    })
  }

  return alerts
}

// Configuración completa de la escala
export const phq9Config = {
  id: 'phq9',
  name: 'PHQ-9',
  fullName: 'Patient Health Questionnaire-9',
  description: 'Cuestionario de autoevaluación para detectar y medir la gravedad de síntomas depresivos',
  questions: phq9Questions,
  options: phq9Options,
  maxScore: 27,
  scoreRange: '0-27',
  instructions: [
    'Por favor, asegúrese de responder todas las preguntas sobre cómo se ha sentido en las últimas dos semanas',
    'No se detenga demasiado tiempo en cada pregunta',
    'No hay respuestas correctas ni incorrectas',
    'Esta evaluación consta de 9 preguntas sobre síntomas depresivos',
    'Sus respuestas son confidenciales y serán revisadas por un profesional de la salud'
  ],
  timeEstimate: '3-5 minutos',
  calculateScore: calculatePhq9Score,
  getInterpretation: getDetailedInterpretation,
  checkAlerts: checkClinicalAlerts,
  factors: null // PHQ-9 no tiene subfactores
}

// Datos para el catálogo de escalas
export const phq9ScaleData = {
  id: 'phq9',
  fullName: 'Patient Health Questionnaire-9',
  shortName: 'PHQ-9',
  description: 'Cuestionario de autoevaluación para detectar y medir la gravedad de síntomas depresivos en las últimas dos semanas.',
  questions: 9,
  duration: '3-5',
  applicationType: 'Autoaplicada',
  ageRange: 'Adolescentes y adultos',
  diagnostics: ['Depresión'],
  tags: ['Depresión', 'Screening', 'DSM-5'],
  available: true,
  icon: 'brain',
  color: '#29A98C'
}

// Información de ayuda
export const phq9HelpInfo = {
  purpose: "El PHQ-9 es una herramienta de screening y evaluación para detectar episodios de depresión mayor según criterios del DSM-5.",
  scoring: {
    method: "Suma simple de 9 ítems (0-3 puntos cada uno)",
    ranges: [
      { range: "0-4", severity: "Mínima o sin depresión", color: "#22c55e" },
      { range: "5-9", severity: "Depresión leve", color: "#eab308" },
      { range: "10-14", severity: "Depresión moderada", color: "#f97316" },
      { range: "15-19", severity: "Depresión moderada-severa", color: "#dc2626" },
      { range: "20-27", severity: "Depresión severa", color: "#991b1b" }
    ]
  },
  clinical_considerations: [
    "Item 9 evalúa ideación suicida - requiere evaluación inmediata si es positivo",
    "Puntuaciones ≥10 sugieren depresión mayor probable",
    "Útil para monitoreo de tratamiento (aplicar cada 2-4 semanas)"
  ],
  limitations: [
    "No reemplaza evaluación clínica completa",
    "Puede dar falsos positivos en duelo o condiciones médicas",
    "Requiere capacidad de lectura y comprensión adecuada"
  ],
  references: "Kroenke, Spitzer & Williams (2001). Journal of General Internal Medicine"
}