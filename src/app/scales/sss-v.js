// SSS-V - Escala de Búsqueda de Sensaciones (Sensation Seeking Scale - Form V)
// Evaluación de la tendencia a buscar experiencias nuevas, variadas y emocionantes en adolescentes y adultos

// Definición de subescalas según Zuckerman
export const sssVSubscales = {
  bae: {
    items: [1, 4, 7, 10, 12, 13, 15, 17, 19], // 9 ítems
    name: 'Búsqueda de Aventura y Emoción (BAE)',
    shortName: 'BAE',
    description: 'Deseo de participar en actividades físicas que proporcionan sensaciones inusuales y deportes de riesgo',
    explanation: 'Actividades como alpinismo, paracaidismo, esquí, surfeo y deportes extremos',
    maxScore: 9
  },
  be: {
    items: [3, 5, 8, 9, 11, 14], // 6 ítems  
    name: 'Búsqueda de Experiencia (BE)',
    shortName: 'BE',
    description: 'Búsqueda de nuevas sensaciones a través de la mente y los sentidos',
    explanation: 'Música, arte, viajes, drogas, experiencias sensoriales y cognitivas nuevas',
    maxScore: 6
  },
  des: {
    items: [2, 6, 16, 18, 20], // 5 ítems
    name: 'Desinhibición (Des)',
    shortName: 'Des', 
    description: 'Búsqueda de sensaciones a través de otras personas y liberación social',
    explanation: 'Fiestas, alcohol, experiencias sexuales y comportamientos socialmente desinhibidos',
    maxScore: 5
  }
}

// Preguntas del SSS-V con sus respuestas correctas para cada subescala
export const sssVQuestions = [
  {
    id: 1,
    text: 'A menudo desearía ser un escalador de montañas',
    subscale: 'bae',
    correctResponse: 1 // SÍ = 1 punto
  },
  {
    id: 2,
    text: 'Me gustan las fiestas desenfrenadas y desinhibidas',
    subscale: 'des',
    correctResponse: 0 // Esta pregunta tiene scoring inverso en el HTML
  },
  {
    id: 3,
    text: 'Me gusta la compañía de personas liberadas que practican el "cambio de parejas"',
    subscale: 'be',
    correctResponse: 1
  },
  {
    id: 4,
    text: 'Me gustaría practicar el esquí acuático',
    subscale: 'bae',
    correctResponse: 1
  },
  {
    id: 5,
    text: 'He probado marihuana u otras hierbas, o me gustaría hacerlo',
    subscale: 'be',
    correctResponse: 1
  },
  {
    id: 6,
    text: 'A menudo me gusta ir colocado (bebiendo alcohol o fumando hierba)',
    subscale: 'des',
    correctResponse: 0 // Scoring inverso
  },
  {
    id: 7,
    text: 'Me gustaría practicar el wind-surfing',
    subscale: 'bae',
    correctResponse: 1
  },
  {
    id: 8,
    text: 'He probado o me gustaría probar alguna droga que produce alucinaciones',
    subscale: 'be',
    correctResponse: 1
  },
  {
    id: 9,
    text: 'Me gusta tener experiencias y sensaciones nuevas y excitantes, aunque sean poco convencionales o incluso ilegales',
    subscale: 'be',
    correctResponse: 1
  },
  {
    id: 10,
    text: 'Me gustaría aprender a volar en avioneta',
    subscale: 'bae',
    correctResponse: 0 // Scoring inverso
  },
  {
    id: 11,
    text: 'Me gusta salir con personas del sexo opuesto que sean físicamente excitantes',
    subscale: 'be',
    correctResponse: 1
  },
  {
    id: 12,
    text: 'Me gustaría practicar el submarinismo',
    subscale: 'bae',
    correctResponse: 0 // Scoring inverso
  },
  {
    id: 13,
    text: 'Me gustaría probar a lanzarme en paracaídas',
    subscale: 'bae',
    correctResponse: 1
  },
  {
    id: 14,
    text: 'Una persona debería tener considerable experiencia sexual antes del matrimonio',
    subscale: 'be',
    correctResponse: 1
  },
  {
    id: 15,
    text: 'Me gusta saltar desde trampolines altos en piscinas',
    subscale: 'bae',
    correctResponse: 0 // Scoring inverso
  },
  {
    id: 16,
    text: 'Me imagino buscando placeres alrededor del mundo con gente adinerada (jet-set)',
    subscale: 'des',
    correctResponse: 0 // Scoring inverso
  },
  {
    id: 17,
    text: 'Me gustaría recorrer una gran distancia en un pequeño velero',
    subscale: 'bae',
    correctResponse: 1
  },
  {
    id: 18,
    text: 'Me gusta ver las escenas sexys de las películas',
    subscale: 'des',
    correctResponse: 0 // Scoring inverso
  },
  {
    id: 19,
    text: 'Me gustaría la sensación de bajar esquiando muy rápido por la pendiente de una gran montaña',
    subscale: 'bae',
    correctResponse: 1
  },
  {
    id: 20,
    text: 'Me siento muy bien después de tomarme unas copas de alcohol',
    subscale: 'des',
    correctResponse: 1
  }
]

// Opciones de respuesta específicas del SSS-V
export const sssVOptions = [
  { 
    text: 'SÍ', 
    value: 1,
    emoji: '✅',
    color: 'linear-gradient(135deg, #48bb78, #38a169)',
    textColor: 'white'
  },
  { 
    text: 'NO', 
    value: 0,
    emoji: '❌',
    color: 'linear-gradient(135deg, #f56565, #e53e3e)',
    textColor: 'white'
  }
]

export const calculateSssVScore = (responses = {}) => {
  const subscaleScores = {}
  let totalScore = 0
  
  // Calcular puntuación por subescala
  Object.entries(sssVSubscales).forEach(([key, subscale]) => {
    let score = 0
    
    subscale.items.forEach(itemId => {
      const question = sssVQuestions.find(q => q.id === itemId)
      const response = responses[itemId]
      
      if (response !== undefined && question) {
        // Aplicar scoring según la respuesta correcta
        if (response === question.correctResponse) {
          score++
        }
      }
    })
    
    subscaleScores[key] = {
      score,
      maxScore: subscale.maxScore,
      percentage: Math.round((score / subscale.maxScore) * 100),
      name: subscale.name,
      shortName: subscale.shortName,
      description: subscale.description,
      explanation: subscale.explanation
    }
    
    totalScore += score
  })
  
  return {
    totalScore,
    maxTotalScore: 20,
    subscaleScores,
    percentage: Math.round((totalScore / 20) * 100),
    completedQuestions: Object.keys(responses).length,
    totalQuestions: 20
  }
}

export const getSssVDetailedInterpretation = (result) => {
  const { totalScore, subscaleScores } = result
  
  let level = 'minimal'
  let title = 'Riesgo Nulo o Mínimo'
  let description = 'Presenta muy baja tendencia a la búsqueda de sensaciones. Prefiere experiencias familiares y predecibles. No representa riesgo significativo para conductas de riesgo.'
  let recommendations = 'Mantener estilo de vida estable; Fomentar actividades seguras y estructuradas; Seguimiento rutinario.'
  
  if (totalScore <= 3) {
    level = 'minimal'
    title = 'Riesgo Nulo o Mínimo'
    description = 'Presenta muy baja tendencia a la búsqueda de sensaciones. Prefiere experiencias familiares y predecibles. No representa riesgo significativo para conductas de riesgo.'
    recommendations = 'Mantener estilo de vida estable; Fomentar actividades seguras y estructuradas; Seguimiento rutinario.'
  } else if (totalScore <= 8) {
    level = 'low'
    title = 'Riesgo Leve'
    description = 'Presenta tendencia leve a la búsqueda de sensaciones. Ocasionalmente busca experiencias nuevas pero mantiene cautela. Riesgo bajo para conductas problemáticas.'
    recommendations = 'Canalizar búsqueda de sensaciones hacia actividades constructivas; Educación sobre riesgos; Seguimiento preventivo.'
  } else if (totalScore <= 14) {
    level = 'moderate'
    title = 'Riesgo Moderado'
    description = 'Presenta tendencia moderada a la búsqueda de sensaciones. Busca activamente experiencias nuevas y emocionantes. Requiere supervisión para prevenir conductas de riesgo.'
    recommendations = 'Supervisión y orientación; Programas de prevención de riesgos; Canalización hacia actividades deportivas seguras; Evaluación de factores de riesgo adicionales.'
  } else {
    level = 'high'
    title = 'Riesgo Alto'
    description = 'Presenta alta tendencia a la búsqueda de sensaciones. Fuerte inclinación hacia experiencias intensas y potencialmente peligrosas. Alto riesgo para conductas problemáticas y necesita intervención profesional.'
    recommendations = 'Intervención profesional especializada; Evaluación de riesgo de adicciones; Terapia conductual; Supervisión estrecha; Programa de reducción de daños.'
  }
  
  // Análisis específico de subescalas
  let subscaleAnalysis = []
  Object.entries(subscaleScores).forEach(([key, data]) => {
    if (data.percentage >= 66) {
      subscaleAnalysis.push(`${data.shortName} elevada: ${data.explanation}`)
    }
  })
  
  return {
    level,
    title,
    description,
    recommendations,
    subscaleAnalysis: subscaleAnalysis.join('; ') || 'No se identifican subescalas con puntuaciones elevadas',
    color: level === 'high' ? '#f56565' : level === 'moderate' ? '#ed8936' : level === 'low' ? '#f6ad55' : '#48bb78',
    className: `severity-${level}`
  }
}

export const checkSssVClinicalAlerts = (responses = {}, result = {}) => {
  const alerts = []
  const { totalScore, subscaleScores } = result
  
  // Alerta por puntuación total muy alta
  if (totalScore >= 15) {
    alerts.push({
      type: 'critical',
      title: '🚨 ALERTA: Búsqueda de Sensaciones Extrema',
      message: `Puntuación muy elevada (${totalScore}/20). Alto riesgo de conductas peligrosas, uso de sustancias y comportamientos impulsivos. Requiere evaluación e intervención inmediata.`,
      priority: 'urgent'
    })
  }
  
  // Alerta por Búsqueda de Experiencia elevada (drogas y comportamientos riesgosos)
  if (subscaleScores.be && subscaleScores.be.percentage >= 66) {
    alerts.push({
      type: 'warning',
      title: '⚠️ Búsqueda de Experiencia Elevada',
      message: `Puntuación alta en Búsqueda de Experiencia (${subscaleScores.be.score}/${subscaleScores.be.maxScore}). Riesgo de experimentación con drogas, comportamientos sexuales de riesgo y actividades ilegales.`,
      priority: 'high'
    })
  }
  
  // Alerta por Desinhibición elevada (alcohol y comportamiento social riesgoso)
  if (subscaleScores.des && subscaleScores.des.percentage >= 60) {
    alerts.push({
      type: 'warning',
      title: '⚠️ Desinhibición Elevada',
      message: `Puntuación alta en Desinhibición (${subscaleScores.des.score}/${subscaleScores.des.maxScore}). Riesgo de abuso de alcohol, comportamientos sexuales de riesgo y falta de control en situaciones sociales.`,
      priority: 'high'
    })
  }
  
  // Alerta por Búsqueda de Aventura y Emoción muy elevada (deportes extremos)
  if (subscaleScores.bae && subscaleScores.bae.percentage >= 77) {
    alerts.push({
      type: 'info',
      title: '📋 Búsqueda de Aventura Muy Elevada',
      message: `Puntuación muy alta en Búsqueda de Aventura y Emoción (${subscaleScores.bae.score}/${subscaleScores.bae.maxScore}). Tendencia a deportes extremos y actividades físicas de alto riesgo. Recomendar medidas de seguridad apropiadas.`,
      priority: 'medium'
    })
  }
  
  // Alerta específica por respuestas problemáticas individuales
  const problematicResponses = []
  
  // Revisar respuestas específicas de alto riesgo
  if (responses[5] === 1) problematicResponses.push('Uso/interés en marihuana')
  if (responses[8] === 1) problematicResponses.push('Uso/interés en drogas alucinógenas')
  if (responses[9] === 1) problematicResponses.push('Actividades ilegales por sensaciones')
  if (responses[6] === 0) problematicResponses.push('Uso frecuente de sustancias')
  
  if (problematicResponses.length >= 2) {
    alerts.push({
      type: 'critical',
      title: '🚨 MÚLTIPLES CONDUCTAS DE ALTO RIESGO',
      message: `Se detectan múltiples indicadores de riesgo: ${problematicResponses.join(', ')}. Requiere evaluación especializada en adicciones y conductas de riesgo.`,
      priority: 'urgent'
    })
  }
  
  // Alerta por múltiples subescalas elevadas
  const elevatedSubscales = Object.values(subscaleScores).filter(s => s.percentage >= 60).length
  if (elevatedSubscales >= 2) {
    alerts.push({
      type: 'warning',
      title: '⚠️ Patrón Mixto de Búsqueda de Sensaciones',
      message: `${elevatedSubscales} subescalas con puntuaciones elevadas. Sugiere patrón complejo de búsqueda de sensaciones que requiere abordaje integral.`,
      priority: 'high'
    })
  }
  
  return alerts
}

export const getSssVHighScoreItems = (responses = {}) => {
  const highItems = []
  
  sssVQuestions.forEach(question => {
    const response = responses[question.id]
    if (response !== undefined && response === question.correctResponse) {
      highItems.push({
        number: question.id,
        text: question.text,
        subscale: question.subscale,
        subscaleName: sssVSubscales[question.subscale].shortName,
        response: response === 1 ? 'SÍ' : 'NO',
        riskLevel: question.subscale === 'be' ? 'Alto' : question.subscale === 'des' ? 'Moderado-Alto' : 'Moderado'
      })
    }
  })
  
  return highItems
}

// Configuración completa de la escala
export const sssVConfig = {
  id: 'sss-v',
  name: 'SSS-V',
  fullName: 'Escala de Búsqueda de Sensaciones (Form V)',
  description: 'Evaluación de la tendencia a buscar experiencias nuevas, variadas y emocionantes. Incluye 3 subescalas: Búsqueda de Aventura y Emoción, Búsqueda de Experiencia, y Desinhibición.',
  applicationType: 'Autoaplicada',
  questions: sssVQuestions,
  options: sssVOptions,
  maxScore: 20,
  scoreRange: 'Total: 0-20, BAE: 0-9, BE: 0-6, Des: 0-5',
  instructions: [
    'A continuación encontrará 20 afirmaciones sobre experiencias y sensaciones',
    'Para cada una, deberá elegir SÍ si está de acuerdo o NO si no está de acuerdo',
    'No hay respuestas correctas o incorrectas',
    'Responda con honestidad según sus preferencias reales',
    'Elija la opción que mejor refleje su forma de ser',
    'No piense demasiado en cada respuesta',
    '⚠️ NOTA: Esta escala aborda temas relacionados con sexualidad y comportamientos personales. Sus respuestas serán tratadas con máxima confidencialidad.'
  ],
  timeEstimate: '5-8 minutos',
  calculateScore: calculateSssVScore,
  getInterpretation: getSssVDetailedInterpretation,
  checkAlerts: checkSssVClinicalAlerts,
  visualOptions: true,
  sensitiveContent: true, // Bandera para indicar contenido sensible
  factors: {
    bae: { 
      name: 'Búsqueda de Aventura y Emoción (BAE)', 
      maxScore: 9, 
      description: 'Actividades como alpinismo, paracaidismo, esquí, surfeo y deportes extremos'
    },
    be: { 
      name: 'Búsqueda de Experiencia (BE)', 
      maxScore: 6, 
      description: 'Música, arte, viajes, drogas, experiencias sensoriales y cognitivas nuevas'
    },
    des: { 
      name: 'Desinhibición (Des)', 
      maxScore: 5, 
      description: 'Fiestas, alcohol, experiencias sexuales y comportamientos socialmente desinhibidos'
    }
  }
}

// Datos para el catálogo de escalas
export const sssVScaleData = {
  id: 'sss-v',
  fullName: 'Escala de Búsqueda de Sensaciones (Form V)',
  shortName: 'SSS-V',
  description: 'Evaluación de tendencias de búsqueda de sensaciones en adolescentes y adultos. Incluye 3 subescalas específicas con respuestas SÍ/NO. Aborda temas sensibles (sexualidad, drogas, riesgo).',
  questions: 20,
  duration: '5-8',
  applicationType: 'Autoaplicada',
  ageRange: 'Adolescentes y adultos',
  diagnostics: ['Búsqueda de Sensaciones', 'Evaluación de Riesgo', 'Impulsividad', 'Personalidad'],
  tags: ['Sensaciones', 'Riesgo', 'Impulsividad', 'Zuckerman', 'Adolescentes', 'Adultos', 'Drogas', 'Sexualidad', 'Aventura', 'Desinhibición'],
  available: true,
  icon: 'picklist-type-svgrepo-com',
  color: '#f093fb',
  sensitiveContent: true
}

// Información de ayuda con explicaciones detalladas de subescalas
export const sssVHelpInfo = {
  purpose: "El SSS-V evalúa la tendencia individual a buscar experiencias nuevas, variadas, complejas e intensas mediante 20 ítems SÍ/NO distribuidos en 3 subescalas específicas que abordan diferentes aspectos de la búsqueda de sensaciones.",
  scoring: {
    method: "20 ítems SÍ/NO, scoring diferencial por ítem según subescala, 3 subescalas independientes",
    ranges: [
      { range: "0-3", severity: "Riesgo nulo/mínimo", color: "#48bb78" },
      { range: "4-8", severity: "Riesgo leve", color: "#f6ad55" },
      { range: "9-14", severity: "Riesgo moderado", color: "#ed8936" },
      { range: "15-20", severity: "Riesgo alto", color: "#f56565" }
    ]
  },
  subscales: {
    bae: {
      name: "Búsqueda de Aventura y Emoción (BAE)",
      description: "Evalúa el deseo de participar en actividades físicas que proporcionan sensaciones y experiencias inusuales, deportes que implican rapidez o peligro.",
      examples: "Alpinismo, paracaidismo, esquí, surfeo, wind-surfing, submarinismo, aviación deportiva",
      items: "9 ítems",
      riskLevel: "Moderado (principalmente físico)"
    },
    be: {
      name: "Búsqueda de Experiencia (BE)",
      description: "Mide la búsqueda de nuevas sensaciones y experiencias a través de la mente y los sentidos, incluyendo exploración de experiencias no convencionales.",
      examples: "Música, arte, viajes, experimentación con drogas, experiencias sexuales variadas, actividades ilegales por sensaciones",
      items: "6 ítems",
      riskLevel: "Alto (sustancias, comportamientos ilegales)"
    },
    des: {
      name: "Desinhibición (Des)",
      description: "Evalúa la búsqueda de sensaciones a través de otras personas y la liberación social, reflejando deseo de libertad social.",
      examples: "Fiestas desinhibidas, consumo excesivo de alcohol, comportamientos sexuales, búsqueda de placer social",
      items: "5 ítems", 
      riskLevel: "Moderado-Alto (alcohol, comportamiento social)"
    }
  },
  clinical_considerations: [
    "Desarrollado por Zuckerman como medida de rasgo de personalidad estable",
    "Contenido sensible: incluye preguntas sobre drogas, sexualidad y comportamientos de riesgo",
    "Útil para evaluar riesgo de conductas problemáticas en adolescentes y adultos",
    "Puntuaciones altas predicen mayor riesgo de uso de sustancias y comportamientos de riesgo",
    "Subescala BE (Búsqueda de Experiencia) es la más predictiva de uso de drogas",
    "Subescala Des (Desinhibición) se relaciona con problemas de alcohol y comportamiento antisocial",
    "Validado en población mexicana con normas específicas",
    "Requiere confidencialidad especial debido a contenido sensible"
  ],
  limitations: [
    "Aborda temas sensibles que pueden generar incomodidad en algunos evaluados",
    "Requiere honestidad del evaluado en temas personales delicados",
    "No evalúa la severidad actual de comportamientos, solo tendencias",
    "Puede estar influenciado por deseabilidad social",
    "No reemplaza evaluación clínica especializada en adicciones",
    "Algunos ítems pueden resultar culturalmente sensibles"
  ],
  references: "Zuckerman, M., Eysenck, S.B., & Eysenck, H.J. (1978). Sensation seeking in England and America: Cross-cultural, age, and sex comparisons. Journal of Consulting and Clinical Psychology. Validación mexicana disponible."
}