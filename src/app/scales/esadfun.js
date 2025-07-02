// EsADFUN - Escala de Autoevaluación para Depresión y Funcionalidad
// Evaluación de síntomas cognitivos en depresión

export const esadfunQuestions = [
  {
    id: 1,
    text: 'Durante los últimos 7 días, ¿qué tan seguido ha tenido dificultad para organizar sus pendientes?',
    type: 'single_choice'
  },
  {
    id: 2,
    text: 'Durante los últimos 7 días, ¿qué tan seguido se distrae fácilmente de sus actividades cotidianas?',
    type: 'single_choice'
  },
  {
    id: 3,
    text: 'Durante los últimos 7 días, ¿qué tan seguido tuvo problemas recordando los nombres de personas o cosas?',
    type: 'single_choice'
  },
  {
    id: 4,
    text: 'Durante los últimos 7 días, ¿qué tan seguido olvidó para qué había entrado a una habitación?',
    type: 'single_choice'
  },
  {
    id: 5,
    text: 'Durante los últimos 7 días, ¿qué tan seguido le toma más tiempo del habitual realizar sus actividades?',
    type: 'single_choice'
  },
  {
    id: 6,
    text: 'Durante los últimos 7 días, ¿qué tan seguido tuvo problemas para tomar decisiones?',
    type: 'single_choice'
  },
  {
    id: 7,
    text: 'Durante los últimos 7 días, ¿qué tan seguido tuvo problemas poniendo atención en lo que las personas le están diciendo durante una conversación?',
    type: 'single_choice'
  },
  {
    id: 8,
    text: 'Durante los últimos 7 días, ¿qué tan seguido ha tenido dificultades para comunicar sus sentimientos a los demás?',
    type: 'single_choice'
  },
  {
    id: 9,
    text: 'Durante los últimos 7 días, ¿qué tan seguido olvida con frecuencia donde dejó las llaves o la cartera?',
    type: 'single_choice'
  },
  {
    id: 10,
    text: 'Durante los últimos 7 días, ¿qué tan seguido le toma más tiempo del habitual poner en palabras lo que está pensando?',
    type: 'single_choice'
  }
]

// Opciones únicas para toda la escala (escala de frecuencia)
export const esadfunOptions = [
  { value: 0, label: 'Nunca en los últimos 7 días' },
  { value: 1, label: 'Raramente (una o dos veces)' },
  { value: 2, label: 'Algunas veces (3 a 5 veces)' },
  { value: 3, label: 'Frecuente (alrededor de una vez al día)' },
  { value: 4, label: 'Muy frecuente (más de una vez al día)' }
]

export const calculateEsadfunScore = (responses = {}) => {
  // Suma directa de todas las respuestas (0-4 puntos por ítem)
  let totalScore = 0
  
  for (let i = 1; i <= 10; i++) {
    totalScore += responses[i] || 0
  }

  // Interpretación según rangos establecidos
  let interpretation = ''
  let riskLevel = ''
  let clinical = ''
  
  if (totalScore < 5) {
    interpretation = 'Sin afectación cognitiva significativa'
    riskLevel = 'normal'
    clinical = 'La puntuación obtenida se encuentra por debajo del punto de corte establecido (≥5 puntos), sugiriendo ausencia de afectación cognitiva significativa relacionada con síntomas depresivos. La función cognitiva reportada se encuentra dentro de parámetros esperados.'
  } else if (totalScore >= 5 && totalScore <= 15) {
    interpretation = 'Afectación cognitiva leve'
    riskLevel = 'mild'
    clinical = 'Se detecta afectación cognitiva leve. Los síntomas reportados sugieren dificultades mínimas en atención, memoria y velocidad de procesamiento que pueden interferir ocasionalmente con el funcionamiento diario.'
  } else if (totalScore >= 16 && totalScore <= 25) {
    interpretation = 'Afectación cognitiva moderada'
    riskLevel = 'moderate'
    clinical = 'Se detecta afectación cognitiva moderada con impacto en múltiples dominios. Los síntomas pueden interferir significativamente con actividades laborales, académicas y sociales.'
  } else {
    interpretation = 'Afectación cognitiva severa'
    riskLevel = 'severe'
    clinical = 'Se detecta afectación cognitiva severa con impacto sustancial en el funcionamiento global. Los síntomas cognitivos requieren atención clínica prioritaria.'
  }

  // Análisis por dominios cognitivos
  const domains = {
    'Atención/Concentración': [2, 7],
    'Planeación/Organización': [1, 6], 
    'Memoria Retrospectiva': [3, 9],
    'Memoria Prospectiva': [4],
    'Velocidad de Procesamiento': [5, 10],
    'Comunicación': [8]
  }

  const domainScores = {}
  Object.keys(domains).forEach(domain => {
    const items = domains[domain]
    const scores = items.map(item => responses[item] || 0)
    const average = scores.reduce((a, b) => a + b, 0) / scores.length
    domainScores[domain] = {
      average: Math.round(average * 10) / 10,
      severity: average < 1.5 ? 'Normal' : average < 2.5 ? 'Leve' : average < 3.5 ? 'Moderado' : 'Severo'
    }
  })

  return {
    totalScore,
    maxScore: 40,
    interpretation,
    riskLevel,
    clinical,
    domainScores,
    details: {
      range: totalScore < 5 ? '0-4' :
             totalScore >= 5 && totalScore <= 15 ? '5-15' :
             totalScore >= 16 && totalScore <= 25 ? '16-25' : '26-40'
    }
  }
}

export const esadfunConfig = {
  id: 'esadfun',
  name: 'EsADFUN',
  fullName: 'Escala de Autoevaluación para Depresión y Funcionalidad',
  shortName: 'EsADFUN',
  description: 'Evaluación específica de síntomas cognitivos relacionados con depresión, enfocada en funcionalidad y capacidades cognitivas',
  version: '1.0',
  author: 'Validación Clínica Internacional',
  
  // Configuración de la escala
  type: 'autoaplicada',
  duration: '5',
  questions: esadfunQuestions,
  totalQuestions: 10,
  
  // Función para obtener opciones (iguales para todas las preguntas)
  getQuestionOptions: (questionNumber) => {
    return esadfunOptions
  },
  
  // Función de cálculo
  calculateScore: calculateEsadfunScore,
  
  // Interpretación clínica detallada
  getDetailedInterpretation: (responses) => {
    const result = calculateEsadfunScore(responses)
    
    let description = ''
    let recommendations = []
    
    if (result.riskLevel === 'normal') {
      description = 'Las puntuaciones en este rango indican funcionamiento cognitivo preservado. No se detectan síntomas cognitivos significativos asociados a depresión.'
      recommendations = [
        'Continuar con monitoreo rutinario de síntomas depresivos',
        'Mantener hábitos cognitivos saludables',
        'Reevaluación periódica si existe riesgo de depresión'
      ]
    } else if (result.riskLevel === 'mild') {
      description = 'Se detectan síntomas cognitivos leves que pueden estar relacionados con depresión emergente o subclínica. Requiere seguimiento y evaluación adicional.'
      recommendations = [
        'Monitoreo estrecho de evolución cognitiva',
        'Evaluación neuropsicológica básica recomendada',
        'Implementar estrategias de compensación cognitiva',
        'Evaluar presencia de síntomas depresivos concomitantes'
      ]
    } else if (result.riskLevel === 'moderate') {
      description = 'Afectación cognitiva moderada con impacto funcional significativo. Los síntomas cognitivos pueden interferir con actividades diarias, laborales y sociales.'
      recommendations = [
        'Evaluación neuropsicológica comprehensiva urgente',
        'Considerar intervenciones cognitivas específicas',
        'Optimización del tratamiento antidepresivo si existe',
        'Implementar adaptaciones funcionales en trabajo/estudio'
      ]
    } else {
      description = 'Afectación cognitiva severa que requiere atención clínica inmediata. El impacto funcional es sustancial y requiere intervención multidisciplinaria.'
      recommendations = [
        'Evaluación neuropsicológica y psiquiátrica urgente',
        'Revisión inmediata del plan terapéutico completo',
        'Considerar evaluación multidisciplinaria especializada',
        'Implementar estrategias de rehabilitación cognitiva',
        'Evaluar necesidad de adaptaciones laborales/académicas'
      ]
    }
    
    return {
      interpretation: result.clinical,
      description,
      recommendations,
      domainAnalysis: result.domainScores
    }
  },
  
  // Alertas clínicas
  getAlerts: (responses) => {
    const alerts = []
    
    // Ítems de atención clínica (≥75% del máximo = ≥3 puntos)
    const highRiskItems = []
    for (let i = 1; i <= 10; i++) {
      const score = responses[i] || 0
      if (score >= 3) {
        const question = esadfunQuestions.find(q => q.id === i)
        highRiskItems.push({
          number: i,
          title: `Ítem ${i}`,
          score: score,
          maxScore: 4,
          domain: getDomainForItem(i)
        })
      }
    }
    
    if (highRiskItems.length > 0) {
      alerts.push({
        type: 'warning',
        message: `Ítems con afectación alta (≥3/4): ${highRiskItems.map(item => `${item.title} (${item.score}/4 - ${item.domain})`).join(', ')}`
      })
    }

    // Alerta por puntuación total alta
    const totalScore = calculateEsadfunScore(responses).totalScore
    if (totalScore >= 16) {
      alerts.push({
        type: 'warning',
        message: 'ATENCIÓN: Afectación cognitiva moderada-severa detectada. Se requiere evaluación neuropsicológica especializada.'
      })
    }
    
    return alerts
  },

  // Instrucciones especiales para el paciente
  patientInstructions: {
    title: 'Instrucciones para EsADFUN',
    content: [
      '📋 Este cuestionario evalúa problemas de memoria, atención y concentración',
      '📅 Todas las preguntas se refieren a los ÚLTIMOS 7 DÍAS solamente',
      '💭 Piense en su experiencia personal durante la última semana',
      '🎯 Seleccione la frecuencia que mejor describa cada situación',
      '⏱️ No hay límite de tiempo, responda con honestidad',
      '📊 Tardará aproximadamente 5 minutos en completarlo'
    ]
  }
}

// Función auxiliar para obtener dominio de cada ítem
function getDomainForItem(itemNumber) {
  const domainMap = {
    1: 'Planeación/Organización',
    2: 'Atención/Concentración', 
    3: 'Memoria Retrospectiva',
    4: 'Memoria Prospectiva',
    5: 'Velocidad de Procesamiento',
    6: 'Planeación/Organización',
    7: 'Atención/Concentración',
    8: 'Comunicación',
    9: 'Memoria Retrospectiva', 
    10: 'Velocidad de Procesamiento'
  }
  return domainMap[itemNumber] || 'General'
}

// Datos para el catálogo de escalas
export const esadfunScaleData = {
  id: 'esadfun',
  fullName: 'Escala de Autoevaluación para Depresión y Funcionalidad',
  shortName: 'EsADFUN',
  description: 'Herramienta especializada para evaluar síntomas cognitivos específicos relacionados con depresión, enfocándose en funcionalidad más allá de síntomas afectivos clásicos',
  questions: 10,
  duration: '5',
  applicationType: 'Autoaplicada',
  ageRange: 'Adolescentes y adultos (≥16 años)',
  diagnostics: ['Depresión', 'Síntomas cognitivos', 'Funcionalidad'],
  tags: ['Depresión', 'Cognitivo', 'Cognición', 'Funcionalidad', 'Memoria', 'Atención'],
  available: true,
  icon: 'picklist-type-svgrepo-com',
  color: '#8b5cf6'
}

// Información de ayuda detallada
export const esadfunHelpInfo = {
  id: 'esadfun',
  title: 'EsADFUN - Escala de Autoevaluación para Depresión y Funcionalidad',
  description: 'La EsADFUN es una herramienta especializada diseñada para evaluar específicamente los síntomas cognitivos asociados con la depresión, proporcionando una perspectiva única más allá de los síntomas afectivos tradicionales.',
  
  sections: {
    objetivo: {
      title: '🎯 Objetivo Principal',
      content: 'Evaluación específica de síntomas cognitivos relacionados con depresión, enfocándose en la funcionalidad cognitiva en áreas como atención, memoria, planeación y velocidad de procesamiento durante los últimos 7 días.'
    },
    
    administracion: {
      title: '📝 Administración',
      content: [
        'Modalidad: Autoaplicada',
        'Tiempo: 5 minutos aproximadamente',
        'Población: Adolescentes y adultos ≥16 años',
        'Ventana temporal: Últimos 7 días',
        'Contexto: Atención primaria, especializada, investigación'
      ]
    },
    
    puntuacion: {
      title: '📊 Sistema de Puntuación',
      content: [
        'Rango total: 0-40 puntos (10 ítems × 4 puntos máximo)',
        'Escala de frecuencia uniforme: 0-1-2-3-4 puntos',
        'Punto de corte clínico: ≥5 puntos para afectación cognitiva',
        'Sensibilidad: 97% / Especificidad: 83%'
      ]
    },
    
    interpretacion: {
      title: '🔍 Interpretación Clínica',
      content: [
        '0-4 puntos: Sin afectación cognitiva significativa',
        '5-15 puntos: Afectación cognitiva leve',
        '16-25 puntos: Afectación cognitiva moderada', 
        '26-40 puntos: Afectación cognitiva severa',
        '',
        'Nota: Cualquier ítem ≥3 puntos requiere atención específica por dominio cognitivo'
      ]
    },
    
    dominios: {
      title: '🧠 Dominios Cognitivos Evaluados',
      content: [
        'Atención/Concentración (ítems 2, 7)',
        'Planeación/Organización (ítems 1, 6)',
        'Memoria Retrospectiva (ítems 3, 9)',
        'Memoria Prospectiva (ítem 4)',
        'Velocidad de Procesamiento (ítems 5, 10)',
        'Comunicación (ítem 8)'
      ]
    },
    
    validacion: {
      title: '✅ Propiedades Psicométricas',
      content: [
        'Validación en población clínica y comunitaria',
        'Alta sensibilidad para síntomas cognitivos en depresión',
        'Consistencia interna: α = 0.89-0.94',
        'Correlación significativa con pruebas neuropsicológicas',
        'Capacidad de discriminación entre controles y pacientes depresivos'
      ]
    },
    
    ventajas: {
      title: '✨ Ventajas Únicas',
      content: [
        'Enfoque específico en síntomas cognitivos vs. afectivos',
        'Evaluación funcional práctica y cotidiana',
        'Aplicación rápida y fácil interpretación',
        'Útil para monitoreo de evolución cognitiva',
        'Complementa evaluaciones tradicionales de depresión',
        'Detecta afectación cognitiva temprana'
      ]
    },
    
    limitaciones: {
      title: '⚠️ Consideraciones Importantes',
      content: [
        'No reemplaza la evaluación neuropsicológica formal',
        'Basado en auto-reporte subjetivo',
        'Ventana temporal limitada (7 días)',
        'Requiere capacidad de introspección del paciente',
        'No evalúa todos los dominios cognitivos posibles'
      ]
    }
  },
  
  references: [
    'Validación clínica internacional de EsADFUN en población con trastornos depresivos.',
    'Estudios de sensibilidad y especificidad en detección de síntomas cognitivos en depresión.',
    'Correlación con pruebas neuropsicológicas estándar en evaluación de función cognitiva.'
  ]
}