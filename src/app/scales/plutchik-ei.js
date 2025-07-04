// EI - Escala de Impulsividad de Plutchik
// Escala de autoevaluación para medir impulsividad y control de impulsos

export const plutchikEiQuestions = [
  '¿Le resulta difícil esperar en una cola?',
  '¿Hace cosas impulsivamente?',
  '¿Gasta dinero impulsivamente?',
  '¿Planea cosas con anticipación?',
  '¿Pierde la paciencia a menudo?',
  '¿Le resulta fácil concentrarse?',
  '¿Le resulta difícil controlar los impulsos sexuales?',
  '¿Dice usted lo primero que le viene a la cabeza?',
  '¿Acostumbra a comer aun cuando no tenga hambre?',
  '¿Es usted impulsivo/a?',
  '¿Termina las cosas que empieza?',
  '¿Le resulta difícil controlar las emociones?',
  '¿Se distrae fácilmente?',
  '¿Le resulta difícil quedarse quieto?',
  '¿Es usted cuidadoso o cauteloso?'
]

export const plutchikEiOptions = [
  { 
    text: 'Nunca', 
    value: 0, 
    emoji: '✅', 
    color: 'linear-gradient(135deg, #48bb78, #38a169)',
    textColor: 'white'
  },
  { 
    text: 'A veces', 
    value: 1, 
    emoji: '🟡', 
    color: 'linear-gradient(135deg, #f6e05e, #ecc94b)',
    textColor: 'white'
  },
  { 
    text: 'A menudo', 
    value: 2, 
    emoji: '🟠', 
    color: 'linear-gradient(135deg, #f6ad55, #ed8936)',
    textColor: 'white'
  },
  { 
    text: 'Casi siempre', 
    value: 3, 
    emoji: '🚨', 
    color: 'linear-gradient(135deg, #f56565, #e53e3e)',
    textColor: 'white'
  }
]

// Items que requieren puntuación inversa
export const plutchikEiReverseItems = [4, 6, 11, 15] // Ítems 4, 6, 11, 15

// Dimensiones de la impulsividad
export const plutchikEiDimensions = {
  autocontrol: {
    name: 'Autocontrol',
    description: 'Capacidad para controlar impulsos y regular comportamientos inmediatos',
    items: [1, 5, 8, 12, 14]
  },
  planificacion: {
    name: 'Planificación de Acciones Futuras',
    description: 'Habilidad para anticipar consecuencias y planificar comportamientos',
    items: [4, 11, 15]
  },
  fisiologicos: {
    name: 'Comportamientos Fisiológicos',
    description: 'Control sobre impulsos relacionados con necesidades fisiológicas básicas',
    items: [7, 9]
  },
  espontaneo: {
    name: 'Comportamiento Espontáneo',
    description: 'Tendencia a actuar espontáneamente sin reflexión previa',
    items: [2, 3, 6, 10, 13]
  }
}

export const calculatePlutchikEiScore = (responses = {}) => {
  let total = 0
  let completedItems = 0

  const dimensionScores = {}

  // Inicializar dimensiones
  Object.keys(plutchikEiDimensions).forEach(dimKey => {
    dimensionScores[dimKey] = {
      score: 0,
      itemCount: 0,
      average: 0
    }
  })

  // Calcular puntuación para cada ítem
  plutchikEiQuestions.forEach((question, index) => {
    const itemNumber = index + 1
    let response = responses[itemNumber] || 0

    if (responses[itemNumber] !== undefined) {
      // Aplicar puntuación inversa si es necesario
      if (plutchikEiReverseItems.includes(itemNumber)) {
        response = 3 - response
      }

      total += response
      completedItems++

      // Asignar puntuaciones a dimensiones
      Object.keys(plutchikEiDimensions).forEach(dimKey => {
        const dimension = plutchikEiDimensions[dimKey]
        if (dimension.items.includes(itemNumber)) {
          dimensionScores[dimKey].score += response
          dimensionScores[dimKey].itemCount++
        }
      })
    }
  })

  // Calcular promedios por dimensión
  Object.keys(dimensionScores).forEach(dimKey => {
    const dimension = dimensionScores[dimKey]
    if (dimension.itemCount > 0) {
      dimension.average = Math.round((dimension.score / dimension.itemCount) * 10) / 10
    }
  })

  return {
    totalScore: total,
    dimensionScores,
    completedItems,
    totalItems: 15,
    maxScore: 45,
    percentage: Math.round((total / 45) * 100),
    clinicalCutoff: 20 // Punto de corte clínico
  }
}

export const getPlutchikEiDetailedInterpretation = (result) => {
  const { totalScore, dimensionScores, percentage } = result
  
  let level = 'baja'
  let title = 'Impulsividad Baja'
  let color = '#48bb78'
  let description = ''
  let recommendations = ''
  let clinicalSignificance = false

  // Interpretación global basada en puntuación total
  if (totalScore >= 30) {
    level = 'muy-alta'
    title = 'Impulsividad Muy Alta'
    color = '#991b1b'
    clinicalSignificance = true
    description = `Puntuación total: ${totalScore}/45 (${percentage}%). Impulsividad muy elevada con impacto significativo en el funcionamiento global. Desregulación conductual marcada que requiere intervención intensiva.`
    recommendations = 'Intervención psicoterapéutica intensiva (TDC, TCC), consideración de farmacoterapia (antipsicóticos atípicos, estabilizadores), estrategias de manejo de crisis.'
  } else if (totalScore >= 20) {
    level = 'alta'
    title = 'Impulsividad Alta'
    color = '#dc2626'
    clinicalSignificance = true
    description = `Puntuación total: ${totalScore}/45 (${percentage}%). Impulsividad clínicamente significativa que interfiere con el funcionamiento. Por encima del punto de corte clínico (≥20).`
    recommendations = 'Evaluación clínica comprensiva, intervención psicoterapéutica, técnicas de control de impulsos, seguimiento regular.'
  } else if (totalScore >= 10) {
    level = 'moderada'
    title = 'Impulsividad Moderada'
    color = '#f97316'
    description = `Puntuación total: ${totalScore}/45 (${percentage}%). Rango moderado con dificultades ocasionales sin significancia clínica. Dentro del rango esperado para población general.`
    recommendations = 'Técnicas de autorregulación, mindfulness, seguimiento preventivo, estrategias de manejo del estrés.'
  } else {
    level = 'baja'
    title = 'Impulsividad Baja'
    color = '#48bb78'
    description = `Puntuación total: ${totalScore}/45 (${percentage}%). Rango normal-bajo con buen control de impulsos y autorregulación conductual. Funcionamiento adaptativo.`
    recommendations = 'Mantenimiento de estrategias adaptativas actuales, seguimiento rutinario.'
  }

  // Análisis de dimensiones
  const dimensionInterpretations = {}
  Object.keys(dimensionScores).forEach(dimKey => {
    const dimension = dimensionScores[dimKey]
    const dimInfo = plutchikEiDimensions[dimKey]
    
    let dimLevel = 'adecuado'
    let dimColor = '#48bb78'
    let dimDescription = 'Funcionamiento adecuado en esta dimensión.'

    if (dimension.average >= 2.5) {
      dimLevel = 'problemático'
      dimColor = '#dc2626'
      dimDescription = 'Dificultades significativas que requieren intervención específica.'
    } else if (dimension.average >= 2.0) {
      dimLevel = 'elevado'
      dimColor = '#f97316'
      dimDescription = 'Niveles elevados que requieren atención y seguimiento.'
    } else if (dimension.average >= 1.5) {
      dimLevel = 'moderado'
      dimColor = '#eab308'
      dimDescription = 'Dificultades moderadas ocasionales.'
    }

    dimensionInterpretations[dimKey] = {
      name: dimInfo.name,
      description: dimInfo.description,
      level: dimLevel,
      color: dimColor,
      interpretation: dimDescription,
      score: dimension.score,
      average: dimension.average,
      itemCount: dimension.itemCount
    }
  })

  return {
    level,
    title,
    description,
    recommendations,
    color,
    className: `level-${level}`,
    clinicalSignificance,
    dimensionInterpretations,
    cutoffAnalysis: totalScore >= 20 ? 'Por encima del punto de corte clínico' : 'Por debajo del punto de corte clínico'
  }
}

export const checkPlutchikEiClinicalAlerts = (responses = {}, result = {}) => {
  const alerts = []
  const { totalScore, dimensionScores } = result

  // Alerta por puntuación total alta
  if (totalScore >= 30) {
    alerts.push({
      type: 'critical',
      title: '🚨 IMPULSIVIDAD EXTREMA',
      message: `Puntuación muy elevada (${totalScore}/45). Riesgo alto de conductas impulsivas peligrosas. Requiere evaluación inmediata.`,
      priority: 'urgent'
    })
  } else if (totalScore >= 20) {
    alerts.push({
      type: 'warning',
      title: '⚠️ Impulsividad Clínicamente Significativa',
      message: `Puntuación por encima del punto de corte clínico (${totalScore}/45). Requiere evaluación profesional.`,
      priority: 'high'
    })
  }

  // Alertas por ítems específicos de alto riesgo
  if (responses[3] && responses[3] >= 2) { // Gasto impulsivo
    alerts.push({
      type: 'warning',
      title: '⚠️ Gasto Impulsivo Significativo',
      message: 'Comportamiento de gasto impulsivo frecuente. Evaluar impacto financiero y control de impulsos económicos.',
      priority: 'medium'
    })
  }

  if (responses[7] && responses[7] >= 2) { // Control impulsos sexuales
    alerts.push({
      type: 'warning',
      title: '⚠️ Dificultad Control Impulsos Sexuales',
      message: 'Dificultades para controlar impulsos sexuales. Requiere evaluación de comportamientos de riesgo.',
      priority: 'medium'
    })
  }

  if (responses[12] && responses[12] >= 2) { // Control emocional
    alerts.push({
      type: 'warning',
      title: '⚠️ Desregulación Emocional',
      message: 'Dificultades significativas para controlar emociones. Evaluar riesgo de explosiones emocionales.',
      priority: 'medium'
    })
  }

  // Alerta por múltiples dimensiones afectadas
  const problematicDimensions = Object.keys(dimensionScores).filter(key => 
    dimensionScores[key].average >= 2.0
  )

  if (problematicDimensions.length >= 3) {
    alerts.push({
      type: 'critical',
      title: '🚨 IMPULSIVIDAD MULTIDIMENSIONAL',
      message: `Múltiples dimensiones afectadas (${problematicDimensions.length}/4). Patrón generalizado de descontrol de impulsos.`,
      priority: 'urgent'
    })
  }

  return alerts
}

export const getPlutchikEiHighScoreItems = (responses = {}) => {
  const highItems = []
  const threshold = 2 // Puntuaciones altas (≥2 = "A menudo")

  plutchikEiQuestions.forEach((question, index) => {
    const itemNumber = index + 1
    const response = responses[itemNumber]
    
    if (response !== undefined && response >= threshold) {
      const isReverse = plutchikEiReverseItems.includes(itemNumber)
      
      highItems.push({
        number: itemNumber,
        text: question,
        score: response,
        maxScore: 3,
        isReverse,
        concernLevel: response >= 3 ? 'high' : 'moderate',
        responseText: plutchikEiOptions[response].text
      })
    }
  })

  return highItems
}

// Configuración completa de la escala
export const plutchikEiConfig = {
  id: 'plutchik-ei',
  name: 'EI-Plutchik',
  fullName: 'Escala de Impulsividad de Plutchik',
  description: 'Escala breve de autoevaluación para medir impulsividad y control de impulsos en diferentes dimensiones conductuales',
  questions: plutchikEiQuestions,
  options: plutchikEiOptions,
  maxScore: 45,
  scoreRange: '0-45',
  clinicalCutoff: 20,
  instructions: [
    'Por favor, lea cada afirmación cuidadosamente e indique con qué frecuencia le ocurren las siguientes situaciones',
    'Seleccione lo que mejor se ajuste a su caso',
    'Responda con sinceridad y marque la opción que mejor describa su situación habitual',
    'Esta evaluación consta de 15 preguntas sobre control de impulsos',
    'No hay respuestas correctas ni incorrectas',
    'Sus respuestas son confidenciales y serán revisadas por un profesional de la salud'
  ],
  timeEstimate: '3-5 minutos',
  calculateScore: calculatePlutchikEiScore,
  getInterpretation: getPlutchikEiDetailedInterpretation,
  checkAlerts: checkPlutchikEiClinicalAlerts,
  hasDimensions: true,
  dimensions: plutchikEiDimensions,
  reverseItems: plutchikEiReverseItems,
  visualOptions: true,
  applicationType: 'Autoaplicada',
  autoAdvance: true // Las preguntas avanzan automáticamente
}

// Datos para el catálogo de escalas
export const plutchikEiScaleData = {
  id: 'plutchik-ei',
  fullName: 'Escala de Impulsividad de Plutchik',
  shortName: 'EI-Plutchik',
  description: 'Escala breve y rápida de autoevaluación que mide impulsividad y control de impulsos en cuatro dimensiones conductuales. Validada y con punto de corte clínico establecido.',
  questions: 15,
  duration: '3-5',
  applicationType: 'Autoaplicada',
  ageRange: 'Adolescentes y adultos',
  diagnostics: ['Trastornos del control de impulsos'],
  tags: ['Impulsividad', 'Control de impulsos', 'Autocontrol', 'Planificación', 'Screening', 'Breve'],
  available: true,
  icon: 'picklist-type-svgrepo-com',
  color: '#f59e0b'
}

// Información de ayuda
export const plutchikEiHelpInfo = {
  purpose: "La Escala de Impulsividad de Plutchik (EI) es un instrumento breve de 15 ítems que evalúa la impulsividad y el control de impulsos en cuatro dimensiones conductuales específicas.",
  scoring: {
    method: "Suma de 15 ítems (0-3 puntos cada uno). Ítems 4, 6, 11, 15 requieren puntuación inversa (3-respuesta original)",
    dimensions: [
      { name: "Autocontrol", items: 5, description: "Control de impulsos y regulación conductual inmediata" },
      { name: "Planificación", items: 3, description: "Anticipación de consecuencias y planificación de acciones" },
      { name: "Comportamientos Fisiológicos", items: 2, description: "Control de impulsos relacionados con necesidades básicas" },
      { name: "Comportamiento Espontáneo", items: 5, description: "Tendencia a actuar sin reflexión previa" }
    ],
    ranges: [
      { range: "0-9", severity: "Impulsividad Baja", color: "#22c55e" },
      { range: "10-19", severity: "Impulsividad Moderada", color: "#f97316" },
      { range: "20-29", severity: "Impulsividad Alta (Clínica)", color: "#dc2626" },
      { range: "30-45", severity: "Impulsividad Muy Alta", color: "#991b1b" }
    ]
  },
  clinical_considerations: [
    "Punto de corte clínico: ≥20 puntos indica impulsividad clínicamente significativa",
    "Confiabilidad: α = 0.70-0.73 (consistencia interna adecuada)",
    "Ítems 3, 7, 12 requieren evaluación especial por riesgo asociado",
    "Útil como screening rápido en consulta clínica",
    "Aplicación breve (3-5 minutos) facilita uso rutinario"
  ],
  limitations: [
    "Escala de screening, no diagnóstica",
    "Requiere capacidad de introspección del paciente",
    "Puede ser influenciada por deseabilidad social",
    "No evalúa consecuencias específicas de la impulsividad"
  ],
  references: "Plutchik, R. & Van Praag, H.M. (1989). The measurement of suicidality, aggressivity and impulsivity. Progress in Neuro-Psychopharmacology & Biological Psychiatry, 13, S23-S34."
}