// PHQ-9 - Cuestionario de Salud del Paciente-9
// Cuestionario de autoevaluación para detectar y medir la gravedad de síntomas depresivos

export const phq9Questions = [
  {
    id: 1,
    text: 'Poco interés o alegría para hacer las cosas'
  },
  {
    id: 2,
    text: 'Sensación de estar decaído, deprimido o desesperanzado'
  },
  {
    id: 3,
    text: 'Problemas para quedarse dormido, para seguir durmiendo o dormir demasiado'
  },
  {
    id: 4,
    text: 'Sensación de cansancio o de tener poca energía'
  },
  {
    id: 5,
    text: 'Poco apetito o comer demasiado'
  },
  {
    id: 6,
    text: 'Sentirse mal consigo mismo; sentir que es un fracasado o que ha decepcionado a su familia o a sí mismo'
  },
  {
    id: 7,
    text: 'Problemas para concentrarse en algo, como leer el periódico o ver la televisión'
  },
  {
    id: 8,
    text: 'Moverse o hablar tan despacio que los demás pueden haberlo notado. O lo contrario: estar tan inquieto o agitado que se ha estado moviendo de un lado a otro más de lo habitual'
  },
  {
    id: 9,
    text: 'Pensamientos de que estaría mejor muerto o de querer hacerse daño de algún modo'
  },
  {
    id: 10,
    text: 'Si ha marcado alguno de los problemas de este cuestionario, ¿hasta qué punto estos problemas le han creado dificultades para hacer su trabajo, ocuparse de la casa o relacionarse con los demás?',
    type: 'percentage',
    description: 'Evalúe el impacto funcional de los síntomas depresivos en su vida diaria',
    percentageLabels: {
      0: 'Sin disfunción (0%)',
      25: 'Disfunción leve (25%)',
      50: 'Disfunción moderada (50%)',
      75: 'Disfunción severa (75%)',
      100: 'Totalmente disfuncional (100%)'
    }
  }
]

export const phq9Options = [
  { 
    text: 'Nunca', 
    value: 0, 
    emoji: '✅', 
    color: 'linear-gradient(135deg, #48bb78, #38a169)',
    textColor: 'white'
  },
  { 
    text: 'Varios días', 
    value: 1, 
    emoji: '⚠️', 
    color: 'linear-gradient(135deg, #f6ad55, #ed8936)',
    textColor: 'white'
  },
  { 
    text: 'Más de la mitad de los días', 
    value: 2, 
    emoji: '❗', 
    color: 'linear-gradient(135deg, #ed8936, #dd6b20)',
    textColor: 'white'
  },
  { 
    text: 'Casi todos los días', 
    value: 3, 
    emoji: '🚨', 
    color: 'linear-gradient(135deg, #f56565, #e53e3e)',
    textColor: 'white'
  }
]

export const calculatePhq9Score = (responses = {}) => {
  let total = 0
  let functionalImpairment = 0
  
  // Calcular puntuación de los 9 ítems principales (excluyendo la pregunta funcional)
  for (let i = 1; i <= 9; i++) {
    total += responses[i] || 0
  }
  
  // Obtener evaluación funcional (pregunta 10) como porcentaje
  if (responses[10] !== undefined) {
    functionalImpairment = responses[10]
  }
  
  return {
    totalScore: total,
    functionalImpairment,
    maxScore: 27,
    percentage: Math.round((total / 27) * 100),
    functionalPercentage: functionalImpairment,
    completedQuestions: Object.keys(responses).length,
    totalQuestions: 10
  }
}

export const getPhq9DetailedInterpretation = (result) => {
  const { totalScore, functionalImpairment } = result
  const score = totalScore
  if (score >= 0 && score <= 4) {
    return {
      level: 'minimal',
      title: 'Sintomatología Depresiva Mínima',
      description: `Los síntomas reportados son mínimos y no sugieren un episodio depresivo clínicamente significativo. Impacto funcional: ${functionalImpairment}%. Se recomienda monitoreo rutinario y promoción de hábitos saludables.`,
      recommendations: 'Mantenimiento de rutinas saludables, ejercicio regular, y seguimiento preventivo. Monitoreo del funcionamiento si hay deterioro funcional.',
      className: 'level-minimal',
      color: '#48bb78'
    }
  } else if (score >= 5 && score <= 9) {
    return {
      level: 'mild',
      title: 'Sintomatología Depresiva Leve',
      description: `Presencia de síntomas depresivos leves que pueden requerir vigilancia clínica. Impacto funcional: ${functionalImpairment}%. Se sugiere evaluación psicológica y consideración de intervenciones psicoterapéuticas.`,
      recommendations: 'Evaluación psicológica, técnicas de manejo del estrés, seguimiento clínico en 2-4 semanas, y evaluación del impacto funcional.',
      className: 'level-mild',
      color: '#f6ad55'
    }
  } else if (score >= 10 && score <= 14) {
    return {
      level: 'moderate',
      title: 'Sintomatología Depresiva Moderada',
      description: `Síntomas depresivos moderados que requieren intervención clínica activa. Impacto funcional: ${functionalImpairment}%. Se recomienda evaluación psiquiátrica y consideración de tratamiento psicoterapéutico y/o farmacológico.`,
      recommendations: 'Evaluación psiquiátrica prioritaria, inicio de psicoterapia estructurada, seguimiento clínico semanal, y rehabilitación funcional si es necesaria.',
      className: 'level-moderate',
      color: '#ed8936'
    }
  } else if (score >= 15 && score <= 19) {
    return {
      level: 'moderate-severe',
      title: 'Sintomatología Depresiva Moderada-Severa',
      description: `Síntomas depresivos moderados a severos que requieren intervención inmediata. Impacto funcional: ${functionalImpairment}%. Se recomienda evaluación psiquiátrica urgente y consideración de tratamiento combinado.`,
      recommendations: 'Evaluación psiquiátrica urgente, tratamiento farmacológico y psicoterapéutico combinado, seguimiento estrecho, y plan de rehabilitación funcional.',
      className: 'level-severe',
      color: '#f56565'
    }
  } else {
    return {
      level: 'severe',
      title: 'Sintomatología Depresiva Severa',
      description: `Síntomas depresivos severos que requieren atención clínica inmediata y manejo especializado. Impacto funcional: ${functionalImpairment}%. Alto riesgo de deterioro funcional significativo.`,
      recommendations: 'Evaluación psiquiátrica inmediata, hospitalización si es necesario, tratamiento intensivo combinado, seguimiento diario, y rehabilitación funcional integral.',
      className: 'level-severe',
      color: '#f56565'
    }
  }
  
  // Añadir análisis funcional específico
  let functionalAnalysis = ''
  if (functionalImpairment >= 75) {
    functionalAnalysis = ' Deterioro funcional severo que requiere intervención rehabilitatoria inmediata.'
  } else if (functionalImpairment >= 50) {
    functionalAnalysis = ' Deterioro funcional moderado que interfiere significativamente con las actividades diarias.'
  } else if (functionalImpairment >= 25) {
    functionalAnalysis = ' Deterioro funcional leve que requiere seguimiento.'
  } else {
    functionalAnalysis = ' Funcionamiento preservado sin deterioro significativo.'
  }
  
  const interpretation = getPhq9SeverityLevel(score)
  interpretation.description += functionalAnalysis
  
  return {
    level: interpretation.level,
    title: interpretation.title,
    description: interpretation.description,
    recommendations: interpretation.recommendations,
    color: interpretation.color,
    className: interpretation.className
  }
}

export const getPhq9SeverityLevel = (score) => {
  if (score >= 0 && score <= 4) {
    return {
      level: 'minimal',
      title: 'Sintomatología Depresiva Mínima',
      description: 'Los síntomas reportados son mínimos y no sugieren un episodio depresivo clínicamente significativo.',
      recommendations: 'Mantenimiento de rutinas saludables, ejercicio regular, y seguimiento preventivo.',
      className: 'level-minimal',
      color: '#48bb78'
    }
  } else if (score >= 5 && score <= 9) {
    return {
      level: 'mild',
      title: 'Sintomatología Depresiva Leve',
      description: 'Presencia de síntomas depresivos leves que pueden requerir vigilancia clínica.',
      recommendations: 'Evaluación psicológica, técnicas de manejo del estrés, y seguimiento clínico en 2-4 semanas.',
      className: 'level-mild',
      color: '#f6ad55'
    }
  } else if (score >= 10 && score <= 14) {
    return {
      level: 'moderate',
      title: 'Sintomatología Depresiva Moderada',
      description: 'Síntomas depresivos moderados que requieren intervención clínica activa.',
      recommendations: 'Evaluación psiquiátrica prioritaria, inicio de psicoterapia estructurada, y seguimiento clínico semanal.',
      className: 'level-moderate',
      color: '#ed8936'
    }
  } else if (score >= 15 && score <= 19) {
    return {
      level: 'moderate-severe',
      title: 'Sintomatología Depresiva Moderada-Severa',
      description: 'Síntomas depresivos moderados a severos que requieren intervención inmediata.',
      recommendations: 'Evaluación psiquiátrica urgente, tratamiento farmacológico y psicoterapéutico combinado, y seguimiento estrecho.',
      className: 'level-severe',
      color: '#f56565'
    }
  } else {
    return {
      level: 'severe',
      title: 'Sintomatología Depresiva Severa',
      description: 'Síntomas depresivos severos que requieren atención clínica inmediata y manejo especializado.',
      recommendations: 'Evaluación psiquiátrica inmediata, hospitalización si es necesario, tratamiento intensivo combinado, y seguimiento diario.',
      className: 'level-severe',
      color: '#f56565'
    }
  }
}

export const checkPhq9ClinicalAlerts = (responses = {}, result = {}) => {
  const alerts = []
  const { functionalImpairment } = result
  
  // Check for suicidal ideation (question 9)
  if (responses[9] && responses[9] >= 1) {
    alerts.push({
      type: 'critical',
      title: '🚨 ALERTA CRÍTICA: Ideación Suicida',
      message: 'El paciente reporta pensamientos de muerte o autolesión. Requiere evaluación inmediata de riesgo suicida y manejo de seguridad.',
      priority: 'urgent'
    })
  }

  // Check for high-scoring items (≥2 points = 66% of maximum)
  const highScoreItems = []
  const itemTexts = {
    1: 'Anhedonia (pérdida de interés/placer)',
    2: 'Estado de ánimo deprimido',
    3: 'Alteraciones del sueño',
    4: 'Fatiga/pérdida de energía',
    5: 'Alteraciones del apetito',
    6: 'Sentimientos de culpa/inutilidad',
    7: 'Problemas de concentración',
    8: 'Alteraciones psicomotoras'
  }

  for (let i = 1; i <= 8; i++) {
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

  // Check for significant functional impairment
  if (functionalImpairment >= 75) {
    alerts.push({
      type: 'critical',
      title: '🚨 DETERIORO FUNCIONAL SEVERO',
      message: `Disfunción funcional severa (${functionalImpairment}%). Requiere intervención inmediata para restaurar funcionamiento laboral, doméstico y social.`,
      priority: 'urgent'
    })
  } else if (functionalImpairment >= 50) {
    alerts.push({
      type: 'warning',
      title: '⚠️ Deterioro Funcional Moderado',
      message: `Disfunción funcional moderada (${functionalImpairment}%). Impacto significativo en actividades diarias que requiere atención clínica.`,
      priority: 'high'
    })
  } else if (functionalImpairment >= 25) {
    alerts.push({
      type: 'info',
      title: '📋 Deterioro Funcional Leve',
      message: `Disfunción funcional leve (${functionalImpairment}%). Monitoreo del impacto en actividades diarias recomendado.`,
      priority: 'medium'
    })
  }

  return alerts
}

export const getPhq9HighScoreItems = (responses = {}) => {
  const highItems = []
  const threshold = 2 // Puntuaciones altas (≥2)

  phq9Questions.forEach((question, index) => {
    // Solo evaluar las primeras 9 preguntas (síntomas depresivos)
    if (question.id <= 9) {
      const response = responses[question.id]
      if (response !== undefined && response >= threshold) {
        highItems.push({
          number: question.id,
          text: question.text,
          score: response,
          maxScore: 3
        })
      }
    }
  })

  return highItems
}

// Configuración completa de la escala
export const phq9Config = {
  id: 'phq9',
  name: 'PHQ-9',
  fullName: 'Cuestionario de Salud del Paciente-9',
  description: 'Cuestionario de autoevaluación para detectar y medir la gravedad de síntomas depresivos',
  questions: phq9Questions,
  options: phq9Options,
  maxScore: 27,
  scoreRange: '0-27',
  instructions: [
    'Por favor, asegúrese de responder todas las preguntas sobre cómo se ha sentido en las últimas dos semanas',
    'No se detenga demasiado tiempo en cada pregunta',
    'No hay respuestas correctas ni incorrectas',
    'Esta evaluación consta de 9 preguntas sobre síntomas depresivos más una evaluación de impacto funcional',
    'La última pregunta utiliza una barra deslizante para evaluar el deterioro funcional en porcentaje',
    'Sus respuestas son confidenciales y serán revisadas por un profesional de la salud'
  ],
  timeEstimate: '3-5 minutos',
  calculateScore: calculatePhq9Score,
  getInterpretation: getPhq9DetailedInterpretation,
  checkAlerts: checkPhq9ClinicalAlerts,
  hasPercentageQuestion: true,
  visualOptions: true,
  applicationType: 'Autoaplicada',
  factors: null // PHQ-9 no tiene subfactores
}

// Datos para el catálogo de escalas
export const phq9ScaleData = {
  id: 'phq9',
  fullName: 'Cuestionario de Salud del Paciente-9',
  shortName: 'PHQ-9',
  description: 'Cuestionario de autoevaluación para detectar y medir la gravedad de síntomas depresivos en las últimas dos semanas, incluyendo evaluación de impacto funcional.',
  questions: 10,
  duration: '3-5',
  applicationType: 'Autoaplicada',
  ageRange: 'Adolescentes y adultos',
  diagnostics: ['Depresión'],
  tags: ['Depresión', 'Screening', 'DSM-5'],
  available: true,
  icon: 'picklist-type-svgrepo-com',
  color: '#29A98C'
}

// Información de ayuda
export const phq9HelpInfo = {
  purpose: "El PHQ-9 (Cuestionario de Salud del Paciente-9) es una herramienta de screening y evaluación para detectar episodios de depresión mayor según criterios del DSM-5, incluyendo evaluación del impacto funcional mediante barra de porcentaje.",
  scoring: {
    method: "Suma simple de 9 ítems (0-3 puntos cada uno) + evaluación funcional en porcentaje (0-100%)",
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
    "Ítem funcional (10) evalúa deterioro en trabajo, hogar y relaciones mediante porcentaje",
    "Deterioro funcional ≥50% requiere intervención rehabilitatoria específica",
    "Útil para monitoreo de tratamiento (aplicar cada 2-4 semanas)",
    "Incluye opciones visuales con colores y emojis para facilitar respuesta"
  ],
  limitations: [
    "No reemplaza evaluación clínica completa",
    "Puede dar falsos positivos en duelo o condiciones médicas",
    "Requiere capacidad de lectura y comprensión adecuada",
    "Evaluación funcional es subjetiva y requiere interpretación clínica"
  ],
  references: "Kroenke, Spitzer & Williams (2001). Journal of General Internal Medicine"
}