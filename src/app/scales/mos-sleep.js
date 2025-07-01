// MOS Sleep Scale - Escala de Sueño MOS
// Evaluación de la Calidad del Sueño con múltiples subescalas

export const mosSleepQuestions = [
  {
    text: '¿Cuánto tiempo tardó en dormirse durante las últimas 4 semanas?',
    description: 'Tiempo de latencia del sueño'
  },
  {
    text: 'Durante las últimas 4 semanas, ¿cuántas horas durmió cada noche en promedio?',
    description: 'Piense en las horas que realmente durmió, no el tiempo que pasó en la cama.',
    isHours: true
  },
  {
    text: '¿Con qué frecuencia tuvo dificultades para quedarse dormido?',
    description: 'Dificultades de inicio del sueño'
  },
  {
    text: '¿Con qué frecuencia se despertó durante la noche y tuvo dificultades para volver a dormirse?',
    description: 'Despertares nocturnos con dificultad para volver a dormir'
  },
  {
    text: '¿Con qué frecuencia se despertó demasiado temprano y no pudo volver a dormirse?',
    description: 'Despertar precoz con incapacidad para volver a dormir'
  },
  {
    text: '¿Con qué frecuencia sintió que su sueño no fue reparador?',
    description: 'Es decir, se levantó sintiéndose cansado/a a pesar de haber dormido.'
  },
  {
    text: '¿Con qué frecuencia tuvo somnolencia durante el día?',
    description: 'Somnolencia diurna excesiva'
  },
  {
    text: '¿Le han dicho que ronca?',
    description: 'Ronquidos reportados por otros',
    isSnoring: true
  },
  {
    text: '¿Con qué frecuencia se despertó con falta de aire o con dolor de cabeza?',
    description: 'Síntomas respiratorios o cefalea matutina'
  },
  {
    text: '¿Sintió que durmió lo suficiente para sentirse descansado/a?',
    description: 'Percepción de suficiencia del sueño',
    isReversed: true
  }
]

export const mosSleepOptions = [
  { value: 0, label: 'Nunca' },
  { value: 1, label: 'Pocas veces' },
  { value: 2, label: 'A veces' },
  { value: 3, label: 'Muchas veces' },
  { value: 4, label: 'Siempre' }
]

// Opciones específicas para diferentes preguntas
export const mosSleepOptionsSpecial = {
  // Pregunta 1: Tiempo para dormirse
  latency: [
    { value: 0, label: '0-15 minutos' },
    { value: 1, label: '16-30 minutos' },
    { value: 2, label: '31-45 minutos' },
    { value: 3, label: '46-60 minutos' },
    { value: 4, label: 'Más de 60 minutos' }
  ],
  // Pregunta 2: Horas de sueño
  hours: [
    { value: 3, label: 'Menos de 4 horas' },
    { value: 4.5, label: '4 a 5 horas' },
    { value: 5.5, label: '5 a 6 horas' },
    { value: 6.5, label: '6 a 7 horas' },
    { value: 7.5, label: '7 a 8 horas' },
    { value: 8.5, label: '8 a 9 horas' },
    { value: 10, label: 'Más de 9 horas' }
  ],
  // Pregunta 8: Ronquidos
  snoring: [
    { value: 0, label: 'No / No sé' },
    { value: 1, label: 'Sí, ocasionalmente' },
    { value: 2, label: 'Sí, frecuentemente' },
    { value: 3, label: 'Sí, muy fuerte' }
  ],
  // Pregunta 10: Sueño suficiente (invertida)
  adequacy: [
    { value: 4, label: 'Siempre' },
    { value: 3, label: 'Muchas veces' },
    { value: 2, label: 'A veces' },
    { value: 1, label: 'Pocas veces' },
    { value: 0, label: 'Nunca' }
  ]
}

export const calculateMosSleepScore = (responses = {}) => {
  // 1. Trastornos del Sueño (Sleep Disturbance)
  // Promedio de ítems 1, 3, 4, 5, 6 multiplicado por 25
  const disturbanceItems = [
    responses[0] || 0, // Latencia del sueño
    responses[2] || 0, // Dificultad para quedarse dormido
    responses[3] || 0, // Despertares nocturnos
    responses[4] || 0, // Despertar precoz
    responses[5] || 0  // Sueño no reparador
  ]
  const sleepDisturbance = (disturbanceItems.reduce((a, b) => a + b, 0) / disturbanceItems.length) * 25

  // 2. Calidad del Sueño (Sleep Adequacy)
  // Ítem 10 multiplicado por 25
  const sleepAdequacy = (responses[9] || 0) * 25

  // 3. Somnolencia Diurna (Daytime Somnolence)
  // Ítem 7 multiplicado por 25
  const daytimeSomnolence = (responses[6] || 0) * 25

  // 4. Ronquidos (Snoring)
  // Ítem 8 (escala 0-3)
  const snoring = responses[7] || 0

  // 5. Despertar con síntomas (Awakening with symptoms)
  // Ítem 9 (escala 0-4)
  const awakening = responses[8] || 0

  // 6. Horas de Sueño
  // Ítem 2 (valores específicos)
  const hoursOfSleep = responses[1] || 0

  // Crear subescalas
  const subscales = {
    sleepDisturbance: {
      name: 'Trastornos del Sueño',
      score: Math.round(sleepDisturbance * 10) / 10,
      maxScore: 100,
      items: disturbanceItems
    },
    sleepAdequacy: {
      name: 'Calidad del Sueño',
      score: Math.round(sleepAdequacy * 10) / 10,
      maxScore: 100,
      items: [responses[9] || 0]
    },
    daytimeSomnolence: {
      name: 'Somnolencia Diurna',
      score: Math.round(daytimeSomnolence * 10) / 10,
      maxScore: 100,
      items: [responses[6] || 0]
    },
    snoring: {
      name: 'Ronquidos',
      score: snoring,
      maxScore: 3,
      items: [snoring]
    },
    awakening: {
      name: 'Despertar con Síntomas',
      score: awakening,
      maxScore: 4,
      items: [awakening]
    },
    hoursOfSleep: {
      name: 'Horas de Sueño',
      score: hoursOfSleep,
      maxScore: null, // No tiene máximo definido
      items: [hoursOfSleep]
    }
  }

  // Índice de problemas de sueño general (promedio de las escalas transformadas)
  const sleepProblemsIndex = Math.round(((sleepDisturbance + (100 - sleepAdequacy) + daytimeSomnolence) / 3) * 10) / 10

  return {
    subscales,
    sleepProblemsIndex,
    totalScore: sleepProblemsIndex, // Para compatibilidad con el sistema genérico
    totalQuestions: 10,
    completedQuestions: Object.keys(responses).length
  }
}

export const getMosSleepDetailedInterpretation = (result) => {
  const { subscales, sleepProblemsIndex } = result
  
  let overallLevel = 'good'
  let overallTitle = 'Calidad de Sueño Buena'
  let overallDescription = ''
  let recommendations = []

  // Determinar nivel general basado en el índice de problemas
  if (sleepProblemsIndex >= 75) {
    overallLevel = 'severe'
    overallTitle = 'Problemas Severos de Sueño'
    overallDescription = `Índice de problemas: ${sleepProblemsIndex}/100. Presenta múltiples dificultades significativas con el sueño que requieren atención médica inmediata.`
    recommendations = [
      'Evaluación médica especializada del sueño',
      'Posible estudio polisomnográfico',
      'Tratamiento farmacológico si está indicado',
      'Higiene del sueño estricta'
    ]
  } else if (sleepProblemsIndex >= 50) {
    overallLevel = 'moderate'
    overallTitle = 'Problemas Moderados de Sueño'
    overallDescription = `Índice de problemas: ${sleepProblemsIndex}/100. Presenta dificultades notables con el sueño que interfieren con su calidad de vida.`
    recommendations = [
      'Evaluación médica del sueño',
      'Implementar técnicas de higiene del sueño',
      'Considerar terapia cognitivo-conductual para el insomnio',
      'Revisar medicamentos y hábitos actuales'
    ]
  } else if (sleepProblemsIndex >= 25) {
    overallLevel = 'mild'
    overallTitle = 'Problemas Leves de Sueño'
    overallDescription = `Índice de problemas: ${sleepProblemsIndex}/100. Presenta algunas dificultades ocasionales con el sueño.`
    recommendations = [
      'Mejorar hábitos de higiene del sueño',
      'Establecer rutina regular de sueño',
      'Evitar cafeína y pantallas antes de dormir',
      'Seguimiento en consulta rutinaria'
    ]
  } else {
    overallLevel = 'good'
    overallTitle = 'Calidad de Sueño Buena'
    overallDescription = `Índice de problemas: ${sleepProblemsIndex}/100. Su calidad de sueño es generalmente buena con mínimas dificultades.`
    recommendations = [
      'Mantener hábitos actuales de sueño',
      'Continuar con rutina regular',
      'Seguimiento preventivo rutinario'
    ]
  }

  // Interpretaciones específicas por subescala
  const subscaleInterpretations = {}
  
  // Trastornos del sueño
  const disturbanceScore = subscales.sleepDisturbance.score
  if (disturbanceScore <= 25) {
    subscaleInterpretations.sleepDisturbance = 'Mínimos trastornos del sueño. Su sueño es generalmente bueno.'
  } else if (disturbanceScore <= 50) {
    subscaleInterpretations.sleepDisturbance = 'Trastornos del sueño leves. Presenta algunas dificultades ocasionales.'
  } else if (disturbanceScore <= 75) {
    subscaleInterpretations.sleepDisturbance = 'Trastornos del sueño moderados. Dificultades frecuentes que requieren atención.'
  } else {
    subscaleInterpretations.sleepDisturbance = 'Trastornos del sueño severos. Problemas significativos que requieren evaluación médica.'
  }

  // Calidad del sueño
  const adequacyScore = subscales.sleepAdequacy.score
  if (adequacyScore >= 75) {
    subscaleInterpretations.sleepAdequacy = 'Excelente calidad de sueño. Se siente bien descansado.'
  } else if (adequacyScore >= 50) {
    subscaleInterpretations.sleepAdequacy = 'Buena calidad de sueño. Generalmente se siente descansado.'
  } else if (adequacyScore >= 25) {
    subscaleInterpretations.sleepAdequacy = 'Calidad de sueño regular. A veces no se siente completamente descansado.'
  } else {
    subscaleInterpretations.sleepAdequacy = 'Calidad de sueño deficiente. Raramente se siente descansado.'
  }

  // Somnolencia diurna
  const somnolenceScore = subscales.daytimeSomnolence.score
  if (somnolenceScore <= 25) {
    subscaleInterpretations.daytimeSomnolence = 'Mínima somnolencia diurna. Buen estado de alerta durante el día.'
  } else if (somnolenceScore <= 50) {
    subscaleInterpretations.daytimeSomnolence = 'Somnolencia diurna leve. Ocasionalmente se siente somnoliento.'
  } else if (somnolenceScore <= 75) {
    subscaleInterpretations.daytimeSomnolence = 'Somnolencia diurna moderada. Frecuentemente se siente somnoliento durante el día.'
  } else {
    subscaleInterpretations.daytimeSomnolence = 'Somnolencia diurna excesiva. Problemas significativos de somnolencia que interfieren con actividades.'
  }

  // Horas de sueño
  const hoursScore = subscales.hoursOfSleep.score
  if (hoursScore < 5) {
    subscaleInterpretations.hoursOfSleep = 'Significativamente por debajo de lo recomendado. Duración muy insuficiente.'
  } else if (hoursScore < 6) {
    subscaleInterpretations.hoursOfSleep = 'Por debajo de lo recomendado. Duración insuficiente.'
  } else if (hoursScore < 7) {
    subscaleInterpretations.hoursOfSleep = 'Ligeramente por debajo de lo recomendado.'
  } else if (hoursScore <= 9) {
    subscaleInterpretations.hoursOfSleep = 'Cantidad óptima de sueño. Duración adecuada.'
  } else {
    subscaleInterpretations.hoursOfSleep = 'Más horas de lo típicamente recomendado. Podría indicar hipersomnia.'
  }

  return {
    level: overallLevel,
    title: overallTitle,
    description: overallDescription,
    recommendations: recommendations.join('; '),
    subscaleInterpretations,
    sleepProblemsIndex,
    className: `level-${overallLevel}`,
    color: overallLevel === 'severe' ? '#f56565' : 
           overallLevel === 'moderate' ? '#ed8936' : 
           overallLevel === 'mild' ? '#f6ad55' : '#48bb78'
  }
}

export const checkMosSleepClinicalAlerts = (responses = {}) => {
  const alerts = []
  
  // Alerta por ronquidos frecuentes o fuertes
  const snoring = responses[7] || 0
  if (snoring >= 2) {
    alerts.push({
      type: 'warning',
      title: '⚠️ ALERTA: Ronquidos Frecuentes o Fuertes',
      message: 'Los ronquidos frecuentes o fuertes pueden indicar apnea del sueño u otros trastornos respiratorios del sueño. Se recomienda evaluación especializada.',
      priority: 'high'
    })
  }

  // Alerta por despertar con síntomas
  const awakening = responses[8] || 0
  if (awakening >= 2) {
    alerts.push({
      type: 'critical',
      title: '⚠️ ALERTA CRÍTICA: Despertar con Síntomas',
      message: 'Despertar frecuente con falta de aire o dolor de cabeza puede indicar apnea del sueño, hipertensión nocturna u otros trastornos graves. Requiere evaluación médica urgente.',
      priority: 'urgent'
    })
  }

  // Alerta por somnolencia diurna excesiva
  const somnolence = responses[6] || 0
  if (somnolence >= 3) {
    alerts.push({
      type: 'warning',
      title: '⚠️ Somnolencia Diurna Excesiva',
      message: 'La somnolencia diurna frecuente puede comprometer la seguridad y el rendimiento. Evaluar causas subyacentes y riesgo de accidentes.',
      priority: 'high'
    })
  }

  // Alerta por horas de sueño insuficientes
  const hours = responses[1] || 0
  if (hours < 5) {
    alerts.push({
      type: 'warning',
      title: '⚠️ Duración de Sueño Críticamente Baja',
      message: 'Dormir menos de 5 horas por noche se asocia con mayor riesgo de problemas de salud, accidentes y deterioro cognitivo.',
      priority: 'high'
    })
  }

  // Alerta por múltiples problemas de inicio y mantenimiento del sueño
  const sleepInitiation = responses[0] || 0 // Latencia
  const sleepMaintenance = responses[2] || 0 // Dificultad para quedarse dormido
  const nightAwakenings = responses[3] || 0 // Despertares nocturnos
  const earlyAwakening = responses[4] || 0 // Despertar precoz
  
  const sleepProblems = [sleepInitiation, sleepMaintenance, nightAwakenings, earlyAwakening].filter(score => score >= 3)
  if (sleepProblems.length >= 2) {
    alerts.push({
      type: 'warning',
      title: '⚠️ Múltiples Trastornos del Sueño',
      message: 'Presenta múltiples problemas para iniciar o mantener el sueño. Considerar evaluación para insomnio crónico y tratamiento especializado.',
      priority: 'medium'
    })
  }

  // Alerta por sueño no reparador persistente
  const nonRestorativeSleep = responses[5] || 0
  if (nonRestorativeSleep >= 3) {
    alerts.push({
      type: 'warning',
      title: '⚠️ Sueño No Reparador Persistente',
      message: 'El sueño no reparador frecuente puede indicar trastornos del sueño subyacentes, depresión o condiciones médicas. Requiere evaluación integral.',
      priority: 'medium'
    })
  }

  return alerts
}

// Configuración completa de la escala
export const mosSleepConfig = {
  id: 'mos-sleep',
  name: 'MOS Sleep',
  fullName: 'Escala de Sueño MOS',
  description: 'Evaluación multidimensional de la calidad del sueño y trastornos relacionados en las últimas 4 semanas',
  questions: mosSleepQuestions,
  options: mosSleepOptions,
  specialOptions: mosSleepOptionsSpecial,
  maxScore: 100, // Índice de problemas de sueño general
  scoreRange: 'Múltiples subescalas: 0-100 (principales), 0-3 (ronquidos), 0-4 (despertar), horas variables',
  instructions: [
    'Piense en cómo ha dormido en las últimas 4 semanas',
    'Responda con sinceridad sobre sus patrones de sueño',
    'No hay respuestas correctas o incorrectas',
    'Esta evaluación consta de 10 preguntas sobre diferentes aspectos del sueño',
    'Sus respuestas son confidenciales y serán revisadas por un profesional de la salud'
  ],
  timeEstimate: '3-5 minutos',
  calculateScore: calculateMosSleepScore,
  getInterpretation: getMosSleepDetailedInterpretation,
  checkAlerts: checkMosSleepClinicalAlerts,
  factors: {
    sleepDisturbance: { name: 'Trastornos del Sueño', maxScore: 100 },
    sleepAdequacy: { name: 'Calidad del Sueño', maxScore: 100 },
    daytimeSomnolence: { name: 'Somnolencia Diurna', maxScore: 100 },
    snoring: { name: 'Ronquidos', maxScore: 3 },
    awakening: { name: 'Despertar con Síntomas', maxScore: 4 },
    hoursOfSleep: { name: 'Horas de Sueño', maxScore: null }
  }
}

// Datos para el catálogo de escalas
export const mosSleepScaleData = {
  id: 'mos-sleep',
  fullName: 'Escala de Sueño MOS',
  shortName: 'MOS Sleep',
  description: 'Evaluación multidimensional de la calidad del sueño que incluye trastornos del sueño, calidad, somnolencia diurna, ronquidos y síntomas asociados.',
  questions: 10,
  duration: '3-5',
  applicationType: 'Autoaplicada',
  ageRange: 'Adolescentes y adultos',
  diagnostics: ['Trastornos del sueño', 'Insomnio', 'Apnea del sueño', 'Hipersomnia'],
  tags: ['Sueño', 'Calidad de vida', 'Subescalas múltiples', 'Evaluación integral'],
  available: true,
  icon: 'brain',
  color: '#9333ea'
}

// Información de ayuda
export const mosSleepHelpInfo = {
  purpose: "La Escala de Sueño MOS evalúa múltiples dimensiones del sueño incluyendo trastornos, calidad, somnolencia diurna y síntomas respiratorios durante las últimas 4 semanas.",
  scoring: {
    method: "Múltiples subescalas con diferentes métodos de cálculo",
    ranges: [
      { range: "Trastornos del sueño: 0-100", severity: "0-25: Mínimos, 26-50: Leves, 51-75: Moderados, 76-100: Severos", color: "#9333ea" },
      { range: "Calidad del sueño: 0-100", severity: "0-25: Deficiente, 26-50: Regular, 51-75: Buena, 76-100: Excelente", color: "#9333ea" },
      { range: "Somnolencia diurna: 0-100", severity: "0-25: Mínima, 26-50: Leve, 51-75: Moderada, 76-100: Excesiva", color: "#9333ea" },
      { range: "Ronquidos: 0-3", severity: "0: No, 1: Ocasional, 2: Frecuente, 3: Muy fuerte", color: "#9333ea" }
    ]
  },
  clinical_considerations: [
    "Evalúa 6 dimensiones diferentes del sueño de forma integral",
    "Útil para detectar múltiples trastornos del sueño simultáneamente",
    "Los ronquidos y despertar con síntomas pueden indicar apnea del sueño",
    "La somnolencia diurna excesiva requiere evaluación de seguridad",
    "Período de evaluación de 4 semanas proporciona estabilidad en las mediciones"
  ],
  limitations: [
    "Es una medida subjetiva basada en autoreporte",
    "No reemplaza estudios objetivos del sueño (polisomnografía)",
    "Puede ser influenciada por el estado de ánimo actual",
    "Requiere capacidad de recordar patrones de las últimas 4 semanas"
  ],
  references: "Hays et al. (2005). Sleep, 28(7), 891-896. Medical Outcomes Study Sleep Scale"
}