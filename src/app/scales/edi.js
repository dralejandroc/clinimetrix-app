// EDI - Inventario de Trastornos de la Alimentación
// Inventario de autoevaluación para evaluar actitudes y comportamientos relacionados con trastornos alimentarios

export const ediQuestions = [
  'Como dulces e hidratos de carbono (pan, patatas, etc.) sin sentirme nervioso/a',
  'Pienso que mi estómago es demasiado grande',
  'Me gustaría que pudiera volver a la seguridad de la infancia',
  'Como cuando estoy disgustado/a',
  'Me atraco de comida',
  'Me gustaría ser más joven',
  'Pienso en seguir una dieta',
  'Me asusto cuando mis sensaciones/sentimientos son demasiado intensos',
  'Pienso que mis muslos son demasiado anchos',
  'Me siento ineficaz como persona',
  'Me siento extremadamente culpable después de haber comido en exceso',
  'Pienso que mi estómago tiene el tamaño adecuado',
  'Mi familia sólo valora como buenos aquellos rendimientos o resultados que están por encima de lo habitual',
  'El tiempo más feliz de la vida es cuando se es un niño',
  'Soy una persona que demuestra abiertamente sus sentimientos',
  'Me aterroriza ganar peso',
  'Confío en los demás',
  'Me siento solo/a en el mundo',
  'Me siento satisfecho/a con la forma de mi cuerpo',
  'Generalmente siento que las cosas de mi vida están bajo mi control',
  'Me siento confundido/a ante las emociones que siento',
  'Prefiero ser adulto que niño',
  'Me comunico fácilmente con los demás',
  'Me gustaría ser otra persona',
  'Exagero o aumento la importancia del peso',
  'Puedo identificar claramente las emociones que siento',
  'Me siento inadaptado/a',
  'Cuando me estoy atracando de comida siento que no puedo parar de hacerlo',
  'Cuando era niño/a intentaba por todos los medios evitar estar de acuerdo con mis padres y maestros',
  'Tengo amistades íntimas',
  'Me gusta la forma de mis nalgas',
  'Me preocupa el deseo de estar más delgado/a',
  'No sé lo que está pasando dentro de mí',
  'Tengo dificultad para expresar mis emociones hacia los demás',
  'Las exigencias del adulto son demasiado grandes',
  'Me molesta ser menos que el/la mejor en las actividades que hago',
  'Me siento seguro/a de mí mismo/a',
  'Pienso en atracarme de comida',
  'Me siento feliz de no ser nunca más un niño/a',
  'No me doy cuenta de si tengo hambre o no',
  'Tengo una pobre opinión de mí mismo/a',
  'Pienso que puedo alcanzar mis metas',
  'Mis padres han esperado cosas excelentes de mí',
  'Estoy preocupado/a de que mis sentimientos se escapen a mi control',
  'Pienso que mis caderas son demasiado anchas',
  'Como moderadamente cuando estoy con gente y me atraco cuando estoy solo/a',
  'Después de haber comido poco me siento hinchado/a',
  'Pienso que las personas son más felices cuando son niños/as',
  'Si gano algo de peso, me preocupa el que pueda seguir aumentando',
  'Pienso que soy una persona útil',
  'Cuando estoy disgustado/a no sé si estoy triste, atemorizado/a o enojado/a',
  'Creo que las cosas las debo hacer perfectamente, o si no, no hacerlas',
  'Pienso en intentar vomitar con el fin de perder peso',
  'Necesito mantener a las personas a cierta distancia pues me siento incómodo/a si alguien intenta acercárseme o entablar amistad',
  'Pienso que mis muslos tienen el tamaño adecuado',
  'Me siento interiormente vacío/a',
  'Puedo hablar sobre mis sentimientos y mis pensamientos personales',
  'El convertirme en adulto ha sido lo mejor de mi vida',
  'Creo que mis nalgas son demasiado anchas',
  'Tengo sentimientos/sensaciones que no puedo identificar claramente',
  'Como o bebo a escondidas',
  'Pienso que mis caderas tienen el tamaño adecuado',
  'Mis metas son excesivamente altas',
  'Cuando estoy disgustado/a, me preocupa el que pueda empezar a comer'
]

export const ediOptions = [
  { 
    text: 'Nunca', 
    value: 0, 
    emoji: '✅', 
    color: 'linear-gradient(135deg, #48bb78, #38a169)',
    textColor: 'white'
  },
  { 
    text: 'Raramente', 
    value: 1, 
    emoji: '🟢', 
    color: 'linear-gradient(135deg, #68d391, #48bb78)',
    textColor: 'white'
  },
  { 
    text: 'Algunas veces', 
    value: 2, 
    emoji: '🟡', 
    color: 'linear-gradient(135deg, #f6e05e, #ecc94b)',
    textColor: 'white'
  },
  { 
    text: 'A menudo', 
    value: 3, 
    emoji: '🟠', 
    color: 'linear-gradient(135deg, #f6ad55, #ed8936)',
    textColor: 'white'
  },
  { 
    text: 'Habitualmente', 
    value: 4, 
    emoji: '🔴', 
    color: 'linear-gradient(135deg, #fc8181, #f56565)',
    textColor: 'white'
  },
  { 
    text: 'Siempre', 
    value: 5, 
    emoji: '🚨', 
    color: 'linear-gradient(135deg, #f56565, #e53e3e)',
    textColor: 'white'
  }
]

// Items que requieren puntuación inversa
export const reverseItems = [1, 12, 15, 17, 19, 20, 22, 23, 26, 30, 31, 37, 39, 42, 50, 55, 57, 58, 62]

// Definición de subescalas
export const ediSubscales = {
  impulsoDelgadez: {
    name: 'Impulso a la Delgadez',
    items: [1, 7, 16, 25, 32, 49],
    percentiles: { p25: 10, p50: 14, p75: 17, p95: 20.4 }
  },
  bulimia: {
    name: 'Sintomatología Bulímica',
    items: [4, 5, 11, 28, 38, 46, 53, 61],
    percentiles: { p25: 0, p50: 2.5, p75: 8.75, p95: 18 }
  },
  insatisfaccionCorporal: {
    name: 'Insatisfacción Corporal',
    items: [2, 9, 12, 19, 31, 45, 55, 59, 62],
    percentiles: { p25: 7, p50: 12, p75: 21, p95: 26 }
  },
  inefectividad: {
    name: 'Inefectividad y Baja Autoestima',
    items: [10, 18, 20, 24, 27, 37, 41, 50, 56],
    percentiles: { p25: 7, p50: 13, p75: 19, p95: 24.35 }
  },
  perfeccionismo: {
    name: 'Perfeccionismo',
    items: [13, 29, 36, 43, 52, 63],
    percentiles: { p25: 6, p50: 8.5, p75: 12, p95: 14.35 }
  },
  desconfianzaInterpersonal: {
    name: 'Desconfianza Interpersonal',
    items: [15, 17, 23, 30, 34, 54, 57],
    percentiles: { p25: 3.24, p50: 7, p75: 10, p95: 15.35 }
  },
  concienciaInteroceptiva: {
    name: 'Conciencia Interoceptiva',
    items: [8, 21, 26, 33, 40, 44, 51, 60],
    percentiles: { p25: 8, p50: 13, p75: 17, p95: 20.7 }
  },
  miedoMadurar: {
    name: 'Miedo a Madurar',
    items: [3, 6, 14, 22, 35, 39, 48, 58],
    percentiles: { p25: 5, p50: 7.5, p75: 12.75, p95: 19.35 }
  }
}

export const calculateEdiScore = (responses = {}) => {
  // Aplicar scoring específico del EDI: solo puntuaciones ≥3 contribuyen al score final
  const convertToEdiScore = (value, isReverse = false) => {
    let score = value
    if (isReverse) {
      score = 5 - value
    }
    
    if (score <= 2) return 0
    if (score === 3) return 1
    if (score === 4) return 2
    if (score === 5) return 3
    return 0
  }

  const subscaleScores = {}
  let totalQuestions = 0

  // Calcular puntuación por subescala
  Object.keys(ediSubscales).forEach(subscaleKey => {
    const subscale = ediSubscales[subscaleKey]
    let subscaleTotal = 0
    
    subscale.items.forEach(item => {
      const responseValue = responses[item - 1] // Ajustar índice (array empieza en 0)
      if (responseValue !== undefined) {
        const isReverse = reverseItems.includes(item)
        subscaleTotal += convertToEdiScore(responseValue, isReverse)
        totalQuestions++
      }
    })
    
    subscaleScores[subscaleKey] = subscaleTotal
  })

  return {
    subscales: subscaleScores,
    completedQuestions: Object.keys(responses).length,
    totalQuestions: 64,
    maxScorePerSubscale: {
      impulsoDelgadez: 18,
      bulimia: 24,
      insatisfaccionCorporal: 27,
      inefectividad: 27,
      perfeccionismo: 18,
      desconfianzaInterpersonal: 21,
      concienciaInteroceptiva: 24,
      miedoMadurar: 24
    }
  }
}

export const getEdiDetailedInterpretation = (result) => {
  const { subscales } = result
  const interpretations = {}
  let criticalAlerts = []
  let clinicallySignificant = []

  Object.keys(ediSubscales).forEach(subscaleKey => {
    const subscale = ediSubscales[subscaleKey]
    const score = subscales[subscaleKey]
    const percentiles = subscale.percentiles

    let level = 'normal'
    let severity = 'Normal'
    let color = '#22c55e'
    let description = 'Puntuación dentro de rangos normativos.'

    if (score >= percentiles.p95) {
      level = 'very-high'
      severity = 'Muy Alto (Atención Inmediata)'
      color = '#991b1b'
      description = 'Puntuación muy elevada que requiere evaluación clínica inmediata.'
      criticalAlerts.push(subscale.name)
    } else if (score >= percentiles.p75) {
      level = 'high'
      severity = 'Alto (Clínicamente Significativo)'
      color = '#dc2626'
      description = 'Puntuación clínicamente significativa que requiere atención profesional.'
      clinicallySignificant.push(subscale.name)
    } else if (score >= percentiles.p50) {
      level = 'moderate'
      severity = 'Moderado'
      color = '#f97316'
      description = 'Puntuación moderada que requiere seguimiento.'
    } else if (score >= percentiles.p25) {
      level = 'low-moderate'
      severity = 'Bajo-Moderado'
      color = '#eab308'
      description = 'Puntuación ligeramente elevada que requiere monitoreo.'
    }

    interpretations[subscaleKey] = {
      name: subscale.name,
      score,
      level,
      severity,
      color,
      description,
      percentile: score >= percentiles.p95 ? '≥P95' : 
                 score >= percentiles.p75 ? 'P75-P95' :
                 score >= percentiles.p50 ? 'P50-P75' :
                 score >= percentiles.p25 ? 'P25-P50' : '<P25'
    }
  })

  return {
    subscales: interpretations,
    criticalAlerts,
    clinicallySignificant,
    overallRisk: criticalAlerts.length > 0 ? 'Alto riesgo' : 
                 clinicallySignificant.length > 0 ? 'Riesgo moderado' : 'Bajo riesgo'
  }
}

export const checkEdiClinicalAlerts = (responses = {}, result = {}) => {
  const alerts = []
  const { subscales } = result

  // Alertas por subescalas críticas
  if (subscales.bulimia >= ediSubscales.bulimia.percentiles.p75) {
    alerts.push({
      type: 'critical',
      title: '🚨 ALERTA CRÍTICA: Sintomatología Bulímica',
      message: 'Puntuación elevada en sintomatología bulímica. Requiere evaluación inmediata de comportamientos compensatorios y riesgo médico.',
      priority: 'urgent'
    })
  }

  if (subscales.impulsoDelgadez >= ediSubscales.impulsoDelgadez.percentiles.p75) {
    alerts.push({
      type: 'critical',
      title: '🚨 RIESGO ALTO: Impulso a la Delgadez',
      message: 'Preocupación significativa por el peso y la delgadez. Evaluar restricción alimentaria y comportamientos de control de peso.',
      priority: 'urgent'
    })
  }

  if (subscales.insatisfaccionCorporal >= ediSubscales.insatisfaccionCorporal.percentiles.p75) {
    alerts.push({
      type: 'warning',
      title: '⚠️ Insatisfacción Corporal Significativa',
      message: 'Distorsión de la imagen corporal que puede contribuir a comportamientos alimentarios problemáticos.',
      priority: 'high'
    })
  }

  // Alertas por ítems específicos de alto riesgo
  if (responses[52] && responses[52] >= 4) { // Ítem 53: vomitar para perder peso
    alerts.push({
      type: 'critical',
      title: '🚨 COMPORTAMIENTO COMPENSATORIO',
      message: 'El paciente reporta pensamientos sobre vomitar para perder peso. Requiere evaluación médica urgente.',
      priority: 'urgent'
    })
  }

  if (responses[60] && responses[60] >= 4) { // Ítem 61: comer a escondidas
    alerts.push({
      type: 'warning',
      title: '⚠️ Comportamiento Alimentario Secreto',
      message: 'Comportamiento alimentario secreto que puede indicar vergüenza y pérdida de control.',
      priority: 'high'
    })
  }

  // Múltiples áreas de riesgo
  const highRiskAreas = Object.keys(subscales).filter(key => 
    subscales[key] >= ediSubscales[key].percentiles.p75
  )

  if (highRiskAreas.length >= 3) {
    alerts.push({
      type: 'critical',
      title: '🚨 RIESGO MULTIDIMENSIONAL',
      message: `Puntuaciones elevadas en múltiples áreas (${highRiskAreas.length}/8 subescalas). Requiere evaluación integral de trastorno alimentario.`,
      priority: 'urgent'
    })
  }

  return alerts
}

export const getEdiHighScoreItems = (responses = {}) => {
  const highItems = []
  const threshold = 3 // Puntuaciones altas en EDI (≥3)

  ediQuestions.forEach((question, index) => {
    const response = responses[index]
    if (response !== undefined && response >= threshold) {
      const isReverse = reverseItems.includes(index + 1)
      
      highItems.push({
        number: index + 1,
        text: question,
        score: response,
        maxScore: 5,
        isReverse,
        concernLevel: response >= 4 ? 'high' : 'moderate'
      })
    }
  })

  return highItems
}

// Configuración completa de la escala
export const ediConfig = {
  id: 'edi',
  name: 'EDI',
  fullName: 'Inventario de Trastornos de la Alimentación',
  description: 'Inventario de autoevaluación para evaluar actitudes y comportamientos relacionados con trastornos alimentarios',
  questions: ediQuestions,
  options: ediOptions,
  maxScore: 'Variable por subescala',
  scoreRange: 'Por subescalas (0-3 puntos transformados)',
  instructions: [
    'Por favor, responda todas las preguntas sobre cómo se ha sentido generalmente',
    'No hay respuestas correctas ni incorrectas',
    'Responda de manera honesta sobre sus pensamientos y sentimientos',
    'Esta evaluación consta de 64 preguntas sobre diferentes aspectos relacionados con la alimentación',
    'Sus respuestas son confidenciales y serán revisadas por un profesional de la salud',
    'Algunas preguntas pueden parecer repetitivas, pero cada una evalúa aspectos específicos'
  ],
  timeEstimate: '10-15 minutos',
  calculateScore: calculateEdiScore,
  getInterpretation: getEdiDetailedInterpretation,
  checkAlerts: checkEdiClinicalAlerts,
  hasSubscales: true,
  subscales: ediSubscales,
  visualOptions: true,
  applicationType: 'Autoaplicada',
  reverseItems: reverseItems
}

// Datos para el catálogo de escalas
export const ediScaleData = {
  id: 'edi',
  fullName: 'Inventario de Trastornos de la Alimentación',
  shortName: 'EDI',
  description: 'Inventario comprensivo para evaluar actitudes, comportamientos y síntomas asociados con trastornos de la conducta alimentaria mediante 8 subescalas específicas.',
  questions: 64,
  duration: '10-15',
  applicationType: 'Autoaplicada',
  ageRange: 'Adolescentes y adultos',
  diagnostics: ['Trastornos de la conducta alimentaria'],
  tags: ['Trastornos alimentarios', 'Anorexia', 'Bulimia', 'Imagen corporal', 'Autoestima', 'Adolescentes', 'Adultos', 'Autoaplicada'],
  available: true,
  icon: 'picklist-type-svgrepo-com',
  color: '#e91e63'
}

// Información de ayuda
export const ediHelpInfo = {
  purpose: "El EDI (Inventario de Trastornos de la Alimentación) es un instrumento multidimensional que evalúa actitudes y comportamientos relacionados con trastornos alimentarios a través de 8 subescalas específicas.",
  scoring: {
    method: "Scoring específico EDI: solo respuestas ≥3 contribuyen al score (3=1, 4=2, 5=3 puntos). Items positivos requieren inversión antes del scoring.",
    subscales: [
      { name: "Impulso a la Delgadez", items: 6, description: "Preocupación excesiva por el peso y la dieta" },
      { name: "Sintomatología Bulímica", items: 8, description: "Atracones y comportamientos compensatorios" },
      { name: "Insatisfacción Corporal", items: 9, description: "Insatisfacción con la forma y tamaño corporal" },
      { name: "Inefectividad", items: 9, description: "Sentimientos de inadecuación e inseguridad" },
      { name: "Perfeccionismo", items: 6, description: "Expectativas excesivamente altas de rendimiento" },
      { name: "Desconfianza Interpersonal", items: 7, description: "Dificultades en relaciones cercanas" },
      { name: "Conciencia Interoceptiva", items: 8, description: "Confusión sobre estados emocionales y físicos" },
      { name: "Miedo a Madurar", items: 8, description: "Deseo de regresar a la infancia" }
    ]
  },
  clinical_considerations: [
    "Evaluación multidimensional específica para trastornos alimentarios",
    "Útil para screening, diagnóstico y seguimiento de tratamiento",
    "Puntuaciones ≥P75 indican significancia clínica en cada subescala",
    "Items sobre vomitar y comer secreto requieren evaluación inmediata",
    "15 items requieren puntuación inversa antes del cálculo final"
  ],
  limitations: [
    "No reemplaza evaluación clínica integral",
    "Puede ser influenciado por deseabilidad social",
    "Requiere supervisión profesional para interpretación",
    "Algunos ítems pueden ser sensibles culturalmente"
  ],
  references: "Garner, D.M. (1991). Eating Disorder Inventory-2 Professional Manual. Psychological Assessment Resources."
}