// EMUN-AR - Auto-reporte para medición de síntomas maníacos
// Escala de autoevaluación para medir síntomas maníacos en trastorno bipolar

export const emunArQuestions = [
  'Me sentí con más energía de lo normal',
  'Necesité dormir menos horas de lo habitual',
  'Me sentí más hablador de lo normal',
  'Tuve más ideas o pensamientos de lo usual',
  'Me sentí más distraído de lo normal',
  'Me sentí más impulsivo de lo habitual',
  'Me sentí más irritable o agresivo',
  'Me sentí más confiado en mí mismo',
  'Tuve más actividad sexual de lo normal',
  'Gasté más dinero del que debería',
  'Me sentí más sociable de lo usual',
  'Me sentí exageradamente alegre o eufórico',
  'Mis familiares o amigos notaron que estaba exageradamente alegre',
  'Me sentí más activo físicamente',
  'Tuve más planes o proyectos de lo normal',
  'Me sentí más creativo de lo habitual',
  'Me moví o caminé más rápido de lo normal',
  'Hablé más rápido de lo usual',
  'Me sentí más importante o especial',
  'Tuve pensamientos de grandeza sobre mí mismo',
  'Me sentí triste o deprimido',
  'Tuve pensamientos de muerte o suicidio',
  'Me sentí sin esperanza',
  'Perdí el interés en las cosas que antes disfrutaba',
  'Me sentí culpable o inútil',
  'Mi estado de ánimo cambió rápidamente durante el día'
]

// Opciones para intensidad y frecuencia (0-10)
export const intensityFrequencyOptions = [
  { value: 0, label: '0' },
  { value: 1, label: '1' },
  { value: 2, label: '2' },
  { value: 3, label: '3' },
  { value: 4, label: '4' },
  { value: 5, label: '5' },
  { value: 6, label: '6' },
  { value: 7, label: '7' },
  { value: 8, label: '8' },
  { value: 9, label: '9' },
  { value: 10, label: '10' }
]

// Opciones para grado de molestia (0-3)
export const distressOptions = [
  { 
    value: 0, 
    label: 'No me molestó para nada',
    emoji: '✅',
    color: 'linear-gradient(135deg, #48bb78, #38a169)',
    textColor: 'white'
  },
  { 
    value: 1, 
    label: 'Me molestó un poco, pero pude continuar',
    emoji: '🟡',
    color: 'linear-gradient(135deg, #f6e05e, #ecc94b)',
    textColor: 'white'
  },
  { 
    value: 2, 
    label: 'Me molestó bastante e interfirió con mis actividades',
    emoji: '🟠',
    color: 'linear-gradient(135deg, #f6ad55, #ed8936)',
    textColor: 'white'
  },
  { 
    value: 3, 
    label: 'Me molestó mucho e interfirió gravemente con mi vida',
    emoji: '🚨',
    color: 'linear-gradient(135deg, #f56565, #e53e3e)',
    textColor: 'white'
  }
]

// Definición de factores clínicos
export const emunArFactors = {
  activacion: {
    name: 'Factor de Activación',
    items: [1, 2, 3, 4, 8, 9, 11, 12, 14, 15, 16, 17, 18],
    description: 'Síntomas de activación conductual y energía elevada'
  },
  agresividadImpulsividad: {
    name: 'Factor de Agresividad/Impulsividad',
    items: [7, 10, 26],
    description: 'Síntomas de irritabilidad, impulsividad y cambios de humor'
  },
  cognitivo: {
    name: 'Factor Cognitivo',
    items: [4, 5, 16, 19, 20],
    description: 'Síntomas cognitivos: distractibilidad, grandiosidad, creatividad'
  },
  depresivo: {
    name: 'Factor Depresivo',
    items: [21, 22, 23, 24, 25],
    description: 'Síntomas depresivos mixtos'
  },
  inhibicion: {
    name: 'Factor de Inhibición',
    items: [24, 25],
    description: 'Síntomas de inhibición e inutilidad'
  }
}

export const calculateEmunArScore = (responses = {}) => {
  let totalIntensity = 0
  let totalFrequency = 0
  let totalDistress = 0
  let completedItems = 0

  const factorScores = {}

  // Inicializar factores
  Object.keys(emunArFactors).forEach(factorKey => {
    factorScores[factorKey] = {
      intensity: 0,
      frequency: 0,
      distress: 0,
      itemCount: 0,
      averageIntensity: 0,
      averageFrequency: 0,
      averageDistress: 0,
      combinedAverage: 0
    }
  })

  // Calcular puntuaciones para cada ítem
  emunArQuestions.forEach((question, index) => {
    const itemIndex = index + 1
    const intensity = responses[`${itemIndex}_intensity`] || 0
    const frequency = responses[`${itemIndex}_frequency`] || 0
    const distress = responses[`${itemIndex}_distress`] || 0

    if (intensity !== undefined && frequency !== undefined && distress !== undefined) {
      totalIntensity += intensity
      totalFrequency += frequency
      totalDistress += distress
      completedItems++

      // Asignar puntuaciones a factores
      Object.keys(emunArFactors).forEach(factorKey => {
        const factor = emunArFactors[factorKey]
        if (factor.items.includes(itemIndex)) {
          factorScores[factorKey].intensity += intensity
          factorScores[factorKey].frequency += frequency
          factorScores[factorKey].distress += distress
          factorScores[factorKey].itemCount++
        }
      })
    }
  })

  // Calcular promedios por factor
  Object.keys(factorScores).forEach(factorKey => {
    const factor = factorScores[factorKey]
    if (factor.itemCount > 0) {
      factor.averageIntensity = Math.round((factor.intensity / factor.itemCount) * 10) / 10
      factor.averageFrequency = Math.round((factor.frequency / factor.itemCount) * 10) / 10
      factor.averageDistress = Math.round((factor.distress / factor.itemCount) * 10) / 10
      factor.combinedAverage = Math.round(((factor.intensity + factor.frequency) / factor.itemCount) * 10) / 10
    }
  })

  const totalCombined = totalIntensity + totalFrequency + totalDistress
  const maxPossibleScore = 26 * (10 + 10 + 3) // 598 puntos máximos

  return {
    totalIntensity,
    totalFrequency,
    totalDistress,
    totalCombined,
    factorScores,
    completedItems,
    totalItems: 26,
    maxPossibleScore,
    percentage: Math.round((totalCombined / maxPossibleScore) * 100),
    averageIntensity: completedItems > 0 ? Math.round((totalIntensity / completedItems) * 10) / 10 : 0,
    averageFrequency: completedItems > 0 ? Math.round((totalFrequency / completedItems) * 10) / 10 : 0,
    averageDistress: completedItems > 0 ? Math.round((totalDistress / completedItems) * 10) / 10 : 0
  }
}

export const getEmunArDetailedInterpretation = (result) => {
  const { totalCombined, percentage, factorScores, averageIntensity, averageFrequency, averageDistress } = result
  
  let level = 'leve'
  let title = 'Sintomatología Maníaca Leve'
  let color = '#48bb78'
  let description = ''
  let recommendations = ''

  // Interpretación global basada en porcentaje
  if (percentage >= 66) {
    level = 'severo'
    title = 'Sintomatología Maníaca Severa'
    color = '#dc2626'
    description = `Puntuación total: ${totalCombined}/598 (${percentage}%). Presencia de síntomas maníacos severos que requieren intervención inmediata. Alto riesgo de episodio maníaco o mixto.`
    recommendations = 'Consideración de hospitalización, estabilización del ánimo con medicación (litio, anticonvulsivos), seguimiento intensivo diario.'
  } else if (percentage >= 33) {
    level = 'moderado'
    title = 'Sintomatología Maníaca Moderada'
    color = '#f97316'
    description = `Puntuación total: ${totalCombined}/598 (${percentage}%). Presencia de síntomas maníacos moderados que sugieren posible episodio hipomaníaco o maníaco inicial. Requiere evaluación clínica especializada.`
    recommendations = 'Evaluación psiquiátrica prioritaria, ajuste de medicación estabilizadora del ánimo, psicoeducación, seguimiento semanal.'
  } else {
    level = 'leve'
    title = 'Sintomatología Maníaca Leve'
    color = '#48bb78'
    description = `Puntuación total: ${totalCombined}/598 (${percentage}%). Síntomas maníacos mínimos o ausentes. Las puntuaciones están dentro de rangos normativos para población general.`
    recommendations = 'Seguimiento rutinario, mantenimiento de medicación estabilizadora si aplica, monitoreo de cambios del estado de ánimo.'
  }

  // Análisis de factores
  const factorInterpretations = {}
  Object.keys(factorScores).forEach(factorKey => {
    const factor = factorScores[factorKey]
    const factorInfo = emunArFactors[factorKey]
    
    let factorLevel = 'normal'
    let factorColor = '#48bb78'
    let factorDescription = 'Puntuaciones dentro de rangos normativos.'

    if (factor.combinedAverage > 15) {
      factorLevel = 'severo'
      factorColor = '#dc2626'
      factorDescription = 'Síntomas severos que requieren atención inmediata.'
    } else if (factor.combinedAverage > 8) {
      factorLevel = 'moderado'
      factorColor = '#f97316'
      factorDescription = 'Síntomas moderados que requieren seguimiento clínico.'
    } else if (factor.averageIntensity > 5) {
      factorLevel = 'elevado'
      factorColor = '#eab308'
      factorDescription = 'Síntomas leves a moderados presentes.'
    }

    factorInterpretations[factorKey] = {
      name: factorInfo.name,
      description: factorInfo.description,
      level: factorLevel,
      color: factorColor,
      interpretation: factorDescription,
      averageIntensity: factor.averageIntensity,
      averageFrequency: factor.averageFrequency,
      combinedAverage: factor.combinedAverage
    }
  })

  return {
    level,
    title,
    description,
    recommendations,
    color,
    className: `level-${level}`,
    factorInterpretations,
    activationProfile: factorScores.activacion?.averageIntensity > 5,
    depressiveComponent: factorScores.depresivo?.averageIntensity > 3,
    functionalImpact: totalDistress > 26 ? 'Significativo' : 'Leve'
  }
}

export const checkEmunArClinicalAlerts = (responses = {}, result = {}) => {
  const alerts = []
  const { factorScores } = result

  // Alerta crítica por ideación suicida (ítem 22)
  const suicidalThoughts = responses['22_intensity'] || 0
  if (suicidalThoughts >= 3) {
    alerts.push({
      type: 'critical',
      title: '🚨 ALERTA CRÍTICA: Ideación Suicida',
      message: `El paciente reporta pensamientos de muerte o suicidio (intensidad: ${suicidalThoughts}/10). Requiere evaluación inmediata de riesgo suicida y protocolo de seguridad.`,
      priority: 'urgent'
    })
  }

  // Alerta por desesperanza (ítem 23)
  const hopelessness = responses['23_intensity'] || 0
  if (hopelessness >= 5) {
    alerts.push({
      type: 'warning',
      title: '⚠️ Desesperanza Significativa',
      message: `Sentimientos intensos de desesperanza (intensidad: ${hopelessness}/10). Evaluar riesgo de autolesión y depresión mixta.`,
      priority: 'high'
    })
  }

  // Alerta por síntomas severos de activación
  if (factorScores.activacion?.averageIntensity >= 7) {
    alerts.push({
      type: 'critical',
      title: '🚨 ACTIVACIÓN MANÍACA SEVERA',
      message: `Factor de activación muy elevado (promedio: ${factorScores.activacion.averageIntensity}/10). Riesgo de episodio maníaco completo.`,
      priority: 'urgent'
    })
  }

  // Alerta por impulsividad y agresividad
  if (factorScores.agresividadImpulsividad?.averageIntensity >= 6) {
    alerts.push({
      type: 'warning',
      title: '⚠️ Agresividad e Impulsividad Elevadas',
      message: `Síntomas significativos de irritabilidad e impulsividad. Evaluar riesgo de comportamientos peligrosos.`,
      priority: 'high'
    })
  }

  // Alerta por síntomas cognitivos severos (grandiosidad)
  const grandiosity = Math.max(responses['19_intensity'] || 0, responses['20_intensity'] || 0)
  if (grandiosity >= 7) {
    alerts.push({
      type: 'warning',
      title: '⚠️ Síntomas de Grandiosidad',
      message: `Pensamientos de grandiosidad o importancia especial (intensidad: ${grandiosity}/10). Evaluar insight y riesgo de decisiones imprudentes.`,
      priority: 'high'
    })
  }

  // Alerta por gasto excesivo (ítem 10)
  const excessiveSpending = responses['10_intensity'] || 0
  if (excessiveSpending >= 6) {
    alerts.push({
      type: 'warning',
      title: '⚠️ Gasto Excesivo de Dinero',
      message: `Comportamiento de gasto significativo (intensidad: ${excessiveSpending}/10). Evaluar impacto financiero y control de impulsos.`,
      priority: 'medium'
    })
  }

  // Alerta por estado mixto
  if (factorScores.activacion?.averageIntensity >= 5 && factorScores.depresivo?.averageIntensity >= 5) {
    alerts.push({
      type: 'critical',
      title: '🚨 POSIBLE ESTADO MIXTO',
      message: 'Presencia simultánea de síntomas maníacos y depresivos. Alto riesgo de suicidio y mayor complejidad terapéutica.',
      priority: 'urgent'
    })
  }

  return alerts
}

export const getEmunArHighScoreItems = (responses = {}) => {
  const highItems = []
  const intensityThreshold = 7
  const frequencyThreshold = 7
  const distressThreshold = 2

  emunArQuestions.forEach((question, index) => {
    const itemIndex = index + 1
    const intensity = responses[`${itemIndex}_intensity`] || 0
    const frequency = responses[`${itemIndex}_frequency`] || 0
    const distress = responses[`${itemIndex}_distress`] || 0

    if (intensity >= intensityThreshold || frequency >= frequencyThreshold || distress >= distressThreshold) {
      highItems.push({
        number: itemIndex,
        text: question,
        intensity,
        frequency,
        distress,
        concernLevel: (intensity >= 8 || frequency >= 8 || distress >= 3) ? 'high' : 'moderate'
      })
    }
  })

  return highItems
}

// Configuración completa de la escala
export const emunArConfig = {
  id: 'emun-ar',
  name: 'EMUN-AR',
  fullName: 'Auto-reporte para medición de síntomas maníacos',
  description: 'Escala de autoevaluación para medir síntomas maníacos en trastorno bipolar mediante evaluación multidimensional',
  questions: emunArQuestions,
  intensityFrequencyOptions,
  distressOptions,
  maxScore: 598, // 26 items × (10+10+3)
  scoreRange: '0-598 puntos combinados',
  instructions: [
    'Piense en LA ÚLTIMA SEMANA O en la PEOR SEMANA que haya experimentado',
    'Si no ha tenido síntomas recientemente, enfóquese únicamente en la peor semana (sin importar cuándo fue)',
    'Para cada síntoma, evalúe tres aspectos: intensidad, frecuencia y grado de molestia',
    'Para intensidad y frecuencia, puede usar cualquier número del 0 al 10',
    'Para grado de molestia, seleccione la opción que mejor describa su experiencia',
    'Esta evaluación consta de 26 síntomas relacionados con cambios del estado de ánimo',
    'Sus respuestas son completamente confidenciales'
  ],
  timeEstimate: '10-15 minutos',
  calculateScore: calculateEmunArScore,
  getInterpretation: getEmunArDetailedInterpretation,
  checkAlerts: checkEmunArClinicalAlerts,
  hasFactors: true,
  factors: emunArFactors,
  isMultidimensional: true,
  applicationType: 'Autoaplicada',
  hasSliders: true // Para intensidad y frecuencia
}

// Datos para el catálogo de escalas
export const emunArScaleData = {
  id: 'emun-ar',
  fullName: 'Auto-reporte para medición de síntomas maníacos',
  shortName: 'EMUN-AR',
  description: 'Escala multidimensional de autoevaluación que mide síntomas maníacos en trastorno bipolar evaluando intensidad, frecuencia y grado de molestia de 26 síntomas a través de 5 factores clínicos.',
  questions: 26,
  duration: '10-15',
  applicationType: 'Autoaplicada',
  ageRange: 'Adolescentes y adultos',
  diagnostics: ['Trastorno bipolar'],
  tags: ['Trastorno bipolar', 'Manía', 'Hipomanía', 'Estado mixto', 'Activación', 'Autoaplicada'],
  available: true,
  icon: 'picklist-type-svgrepo-com',
  color: '#9333ea'
}

// Información de ayuda
export const emunArHelpInfo = {
  purpose: "El EMUN-AR es una escala de autoevaluación que mide síntomas maníacos en trastorno bipolar mediante evaluación multidimensional de intensidad, frecuencia y grado de molestia para cada síntoma.",
  scoring: {
    method: "Evaluación tridimensional: Intensidad (0-10), Frecuencia (0-10), Grado de molestia (0-3) para 26 síntomas",
    factors: [
      { name: "Factor de Activación", items: 13, description: "Energía elevada y activación conductual" },
      { name: "Factor Agresividad/Impulsividad", items: 3, description: "Irritabilidad e impulsividad" },
      { name: "Factor Cognitivo", items: 5, description: "Distractibilidad y grandiosidad" },
      { name: "Factor Depresivo", items: 5, description: "Síntomas depresivos mixtos" },
      { name: "Factor de Inhibición", items: 2, description: "Inutilidad e inhibición" }
    ],
    ranges: [
      { range: "< 33%", severity: "Leve", description: "< 197 puntos", color: "#22c55e" },
      { range: "33-66%", severity: "Moderado", description: "197-395 puntos", color: "#f97316" },
      { range: "> 66%", severity: "Severo", description: "> 395 puntos", color: "#dc2626" }
    ]
  },
  clinical_considerations: [
    "Ítem 22 (ideación suicida) requiere evaluación inmediata si intensidad ≥3",
    "Estados mixtos (activación + depresión) tienen mayor riesgo suicida",
    "Factor de activación > 7 sugiere episodio maníaco en desarrollo",
    "Útil para monitoreo de respuesta a estabilizadores del ánimo",
    "Evalúa tanto síntomas maníacos como depresivos mixtos"
  ],
  limitations: [
    "Requiere capacidad de autoobservación y metacognición",
    "Puede ser influenciado por insight limitado en manía severa",
    "No reemplaza evaluación clínica heteroadministrada",
    "Sensible a deseabilidad social en algunos ítems"
  ],
  references: "Escala desarrollada para población hispanohablante en contexto clínico de trastorno bipolar"
}