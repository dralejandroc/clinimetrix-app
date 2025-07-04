// STAI - Inventario de Ansiedad Estado-Rasgo
// Escala de autoevaluación que diferencia entre ansiedad situacional (Estado) y disposicional (Rasgo)

// Preguntas de Ansiedad Estado (1-20) - "Cómo se siente AHORA MISMO, en este momento"
export const staiStateQuestions = [
  'Me siento calmado',
  'Me siento seguro',
  'Estoy tenso',
  'Estoy contrariado',
  'Me siento cómodo (estoy a gusto)',
  'Me siento alterado',
  'Estoy preocupado ahora por posibles desgracias futuras',
  'Me siento descansado',
  'Me siento angustiado',
  'Me siento confortable',
  'Tengo confianza en mí mismo',
  'Me siento nervioso',
  'Estoy inquieto/intranquilo/perturbado',
  'Me siento muy "atado" (como oprimido)',
  'Estoy relajado',
  'Me siento satisfecho',
  'Estoy preocupado',
  'Me siento aturdido y sobreexcitado',
  'Me siento alegre',
  'En este momento me siento bien'
]

// Preguntas de Ansiedad Rasgo (21-40) - "Cómo se siente EN GENERAL, la mayoría del tiempo"
export const staiTraitQuestions = [
  'Me siento bien',
  'Me canso rápidamente',
  'Siento ganas de llorar',
  'Me gustaría ser tan feliz como otros',
  'Pierdo oportunidades por no decidirme pronto',
  'Me siento descansado',
  'Soy una persona tranquila, serena y sosegada',
  'Veo que las dificultades se amontonan y no puedo con ellas',
  'Me preocupo demasiado por cosas sin importancia',
  'Soy feliz',
  'Suelo tomar las cosas demasiado seriamente',
  'Me falta confianza en mí mismo',
  'Me siento seguro',
  'No suelo afrontar las crisis o dificultades',
  'Me siento triste (melancólico)',
  'Estoy satisfecho',
  'Me rondan y molestan pensamientos sin importancia',
  'Me afectan tanto los desengaños que no puedo olvidarlos',
  'Soy una persona estable',
  'Cuando pienso sobre asuntos y preocupaciones actuales me pongo tenso y agitado'
]

// Opciones para Ansiedad Estado
export const staiStateOptions = [
  { 
    text: 'Nada', 
    value: 0, 
    emoji: '✅', 
    color: 'linear-gradient(135deg, #48bb78, #38a169)',
    textColor: 'white'
  },
  { 
    text: 'Algo', 
    value: 1, 
    emoji: '🟡', 
    color: 'linear-gradient(135deg, #f6e05e, #ecc94b)',
    textColor: 'white'
  },
  { 
    text: 'Bastante', 
    value: 2, 
    emoji: '🟠', 
    color: 'linear-gradient(135deg, #f6ad55, #ed8936)',
    textColor: 'white'
  },
  { 
    text: 'Mucho', 
    value: 3, 
    emoji: '🚨', 
    color: 'linear-gradient(135deg, #f56565, #e53e3e)',
    textColor: 'white'
  }
]

// Opciones para Ansiedad Rasgo
export const staiTraitOptions = [
  { 
    text: 'Casi nunca', 
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

// Items con puntuación inversa
export const staiStateReverseItems = [1, 2, 5, 8, 10, 11, 15, 16, 19, 20]
export const staiTraitReverseItems = [21, 26, 27, 30, 33, 36, 39]

// Todas las preguntas combinadas para el componente genérico
export const staiQuestions = [...staiStateQuestions, ...staiTraitQuestions]

export const calculateStaiScore = (responses = {}) => {
  let stateTotal = 0
  let traitTotal = 0
  let stateCompleted = 0
  let traitCompleted = 0

  // Calcular Ansiedad Estado (ítems 1-20)
  staiStateQuestions.forEach((question, index) => {
    const itemNumber = index + 1
    let response = responses[itemNumber] || 0

    if (responses[itemNumber] !== undefined) {
      // Aplicar puntuación inversa si es necesario
      if (staiStateReverseItems.includes(itemNumber)) {
        response = 3 - response
      }
      stateTotal += response
      stateCompleted++
    }
  })

  // Calcular Ansiedad Rasgo (ítems 21-40)
  staiTraitQuestions.forEach((question, index) => {
    const itemNumber = index + 21 // Continúa desde el ítem 21
    let response = responses[itemNumber] || 0

    if (responses[itemNumber] !== undefined) {
      // Aplicar puntuación inversa si es necesario
      if (staiTraitReverseItems.includes(itemNumber)) {
        response = 3 - response
      }
      traitTotal += response
      traitCompleted++
    }
  })

  const totalScore = stateTotal + traitTotal

  return {
    stateScore: stateTotal,
    traitScore: traitTotal,
    totalScore,
    stateCompleted,
    traitCompleted,
    totalCompleted: stateCompleted + traitCompleted,
    totalItems: 40,
    statePercentage: Math.round((stateTotal / 60) * 100),
    traitPercentage: Math.round((traitTotal / 60) * 100),
    totalPercentage: Math.round((totalScore / 120) * 100)
  }
}

export const getStaiSeverityLevel = (score) => {
  if (score >= 56) return { level: 'muy-alta', text: 'Muy Alta', color: '#991b1b', percentile: '85-99%' }
  if (score >= 46) return { level: 'alta', text: 'Alta', color: '#dc2626', percentile: '75-85%' }
  if (score >= 36) return { level: 'media', text: 'Media', color: '#f97316', percentile: '65-75%' }
  if (score >= 26) return { level: 'media-baja', text: 'Media-Baja', color: '#eab308', percentile: '50-65%' }
  return { level: 'baja', text: 'Baja', color: '#48bb78', percentile: '<50%' }
}

export const getStaiDetailedInterpretation = (result) => {
  const { stateScore, traitScore, totalScore } = result
  
  const stateSeverity = getStaiSeverityLevel(stateScore)
  const traitSeverity = getStaiSeverityLevel(traitScore)
  
  // Análisis diferencial Estado vs Rasgo
  let diagnosticPattern = ''
  let treatmentRecommendations = ''
  let prognosisOutlook = ''
  let clinicalPriority = 'medium'

  // Patrones diagnósticos diferenciales
  if (stateScore >= 46 && traitScore < 36) {
    diagnosticPattern = 'ANSIEDAD SITUACIONAL (Alta Estado / Baja Rasgo)'
    treatmentRecommendations = 'Intervención aguda: técnicas de manejo del estrés, terapia breve centrada en el problema, relajación, posible medicación PRN.'
    prognosisOutlook = 'Excelente: Típicamente se resuelve al eliminar el estresor. Respuesta rápida al tratamiento (días a semanas).'
    clinicalPriority = 'high'
  } else if (stateScore < 36 && traitScore >= 46) {
    diagnosticPattern = 'PERSONALIDAD ANSIOSA (Baja Estado / Alta Rasgo)'
    treatmentRecommendations = 'Tratamiento a largo plazo: TCC, terapia centrada en esquemas, medicación de mantenimiento (ISRS), mindfulness.'
    prognosisOutlook = 'Bueno con tratamiento sostenido: Requiere 6+ meses. Mejora gradual del patrón de personalidad.'
    clinicalPriority = 'high'
  } else if (stateScore >= 46 && traitScore >= 46) {
    diagnosticPattern = 'ANSIEDAD AGUDA SOBRE CRÓNICA (Alta Estado / Alta Rasgo)'
    treatmentRecommendations = 'Intervención combinada: manejo inmediato de crisis + tratamiento a largo plazo. Medicación + psicoterapia.'
    prognosisOutlook = 'Moderado: Requiere tratamiento integral. Mayor riesgo de recaída sin manejo continuo.'
    clinicalPriority = 'urgent'
  } else if (stateScore < 36 && traitScore < 36) {
    diagnosticPattern = 'ANSIEDAD MÍNIMA (Baja Estado / Baja Rasgo)'
    treatmentRecommendations = 'Enfoque preventivo: técnicas de manejo del estrés, psicoeducación, seguimiento rutinario.'
    prognosisOutlook = 'Excelente: Bajo riesgo de desarrollar trastornos de ansiedad. Funcionamiento adaptativo.'
    clinicalPriority = 'low'
  } else {
    diagnosticPattern = 'ANSIEDAD MODERADA MIXTA'
    treatmentRecommendations = 'Evaluación integral: determinar predominio de componente situacional vs disposicional para tratamiento dirigido.'
    prognosisOutlook = 'Bueno: Respuesta favorable con tratamiento apropiado. Monitoreo regular recomendado.'
    clinicalPriority = 'medium'
  }

  // Recomendaciones farmacológicas específicas
  let pharmacologyRecommendations = ''
  if (stateScore >= 46 && traitScore < 36) {
    pharmacologyRecommendations = 'Benzodiacepinas PRN para crisis agudas. Beta-bloqueadores para ansiedad de rendimiento.'
  } else if (traitScore >= 46) {
    pharmacologyRecommendations = 'ISRS/IRSN como primera línea. Buspirona como alternativa no adictiva. Tratamiento a largo plazo (6+ meses).'
  } else if (stateScore >= 46 && traitScore >= 46) {
    pharmacologyRecommendations = 'Combinación: ISRS/IRSN para mantenimiento + benzodiacepinas PRN para crisis agudas.'
  }

  return {
    stateInterpretation: {
      score: stateScore,
      severity: stateSeverity,
      description: `Ansiedad Estado: ${stateSeverity.text} (${stateScore}/60, ${stateSeverity.percentile})`
    },
    traitInterpretation: {
      score: traitScore,
      severity: traitSeverity,
      description: `Ansiedad Rasgo: ${traitSeverity.text} (${traitScore}/60, ${traitSeverity.percentile})`
    },
    differentialAnalysis: {
      pattern: diagnosticPattern,
      treatmentRecommendations,
      prognosisOutlook,
      pharmacologyRecommendations,
      clinicalPriority
    },
    overallSeverity: Math.max(stateScore, traitScore) >= 56 ? 'crítica' : 
                     Math.max(stateScore, traitScore) >= 46 ? 'alta' : 
                     Math.max(stateScore, traitScore) >= 36 ? 'moderada' : 'baja'
  }
}

export const checkStaiClinicalAlerts = (responses = {}, result = {}) => {
  const alerts = []
  const { stateScore, traitScore } = result

  // Alertas críticas por puntuaciones muy altas
  if (stateScore >= 56) {
    alerts.push({
      type: 'critical',
      title: '🚨 ANSIEDAD ESTADO CRÍTICA',
      message: `Ansiedad situacional extrema (${stateScore}/60). Riesgo de crisis de pánico. Requiere intervención inmediata y evaluación de seguridad.`,
      priority: 'urgent'
    })
  }

  if (traitScore >= 56) {
    alerts.push({
      type: 'critical',
      title: '🚨 ANSIEDAD RASGO CRÍTICA',
      message: `Patrón de ansiedad crónica extrema (${traitScore}/60). Alto riesgo de deterioro funcional. Requiere tratamiento intensivo a largo plazo.`,
      priority: 'urgent'
    })
  }

  // Alertas por patrones diferenciales específicos
  if (stateScore >= 46 && traitScore < 26) {
    alerts.push({
      type: 'warning',
      title: '⚠️ PATRÓN SITUACIONAL PURO',
      message: 'Ansiedad alta actual con personalidad no ansiosa. Identifique estresores específicos para intervención dirigida.',
      priority: 'high'
    })
  }

  if (stateScore < 26 && traitScore >= 46) {
    alerts.push({
      type: 'warning',
      title: '⚠️ PATRÓN RASGO PREDOMINANTE',
      message: 'Ansiedad crónica con estado actual controlado. Evalúe factores protectores actuales y riesgo de exacerbación.',
      priority: 'high'
    })
  }

  if (stateScore >= 46 && traitScore >= 46) {
    alerts.push({
      type: 'critical',
      title: '🚨 ANSIEDAD GENERALIZADA SEVERA',
      message: 'Combinación de ansiedad aguda y crónica. Alto riesgo de complicaciones. Requiere tratamiento integral inmediato.',
      priority: 'urgent'
    })
  }

  // Alertas por ítems específicos críticos
  if (responses[7] && responses[7] >= 2) { // Preocupación por desgracias futuras
    alerts.push({
      type: 'warning',
      title: '⚠️ Pensamiento Catastrófico Agudo',
      message: 'Preocupación intensa por desgracias futuras. Evalúe pensamientos catastróficos y técnicas de reestructuración cognitiva.',
      priority: 'medium'
    })
  }

  if (responses[9] && responses[9] >= 2) { // Angustia
    alerts.push({
      type: 'warning',
      title: '⚠️ Angustia Significativa',
      message: 'Nivel elevado de angustia actual. Monitoree riesgo de crisis y considere intervención inmediata.',
      priority: 'high'
    })
  }

  if (responses[28] && responses[28] >= 2) { // Dificultades se amontonan (rasgo)
    alerts.push({
      type: 'warning',
      title: '⚠️ Sensación de Abrumamiento Crónico',
      message: 'Patrón crónico de sentirse abrumado. Evalúe recursos de afrontamiento y riesgo de desesperanza.',
      priority: 'high'
    })
  }

  // Alertas por diferencia significativa Estado-Rasgo
  const difference = Math.abs(stateScore - traitScore)
  if (difference >= 20) {
    alerts.push({
      type: 'info',
      title: '📋 GRAN DIFERENCIA ESTADO-RASGO',
      message: `Diferencia significativa entre Estado (${stateScore}) y Rasgo (${traitScore}). Patrón diagnóstico claro para tratamiento diferencial.`,
      priority: 'medium'
    })
  }

  return alerts
}

export const getStaiHighScoreItems = (responses = {}) => {
  const highItems = []
  const threshold = 2 // Puntuaciones altas (≥2)

  // Revisar ítems de Estado
  staiStateQuestions.forEach((question, index) => {
    const itemNumber = index + 1
    const response = responses[itemNumber]
    
    if (response !== undefined && response >= threshold) {
      const isReverse = staiStateReverseItems.includes(itemNumber)
      
      highItems.push({
        number: itemNumber,
        text: question,
        score: response,
        maxScore: 3,
        type: 'Estado',
        isReverse,
        concernLevel: response >= 3 ? 'high' : 'moderate'
      })
    }
  })

  // Revisar ítems de Rasgo
  staiTraitQuestions.forEach((question, index) => {
    const itemNumber = index + 21
    const response = responses[itemNumber]
    
    if (response !== undefined && response >= threshold) {
      const isReverse = staiTraitReverseItems.includes(itemNumber)
      
      highItems.push({
        number: itemNumber,
        text: question,
        score: response,
        maxScore: 3,
        type: 'Rasgo',
        isReverse,
        concernLevel: response >= 3 ? 'high' : 'moderate'
      })
    }
  })

  return highItems
}

// Configuración completa de la escala
export const staiConfig = {
  id: 'stai',
  name: 'STAI',
  fullName: 'Inventario de Ansiedad Estado-Rasgo',
  description: 'Escala diferencial que evalúa ansiedad situacional (Estado) vs disposicional (Rasgo) para optimizar decisiones de tratamiento',
  questions: staiQuestions,
  stateQuestions: staiStateQuestions,
  traitQuestions: staiTraitQuestions,
  stateOptions: staiStateOptions,
  traitOptions: staiTraitOptions,
  maxScore: 120, // 60 Estado + 60 Rasgo
  scoreRange: '0-120 (Estado: 0-60, Rasgo: 0-60)',
  instructions: [
    'Esta escala evalúa DOS tipos diferentes de ansiedad',
    'PARTE 1 (ítems 1-20): Cómo se siente AHORA MISMO, en este momento',
    'PARTE 2 (ítems 21-40): Cómo se siente EN GENERAL, la mayoría del tiempo',
    'Es importante responder honestamente a ambas partes',
    'La diferencia entre sus puntuaciones ayudará a determinar el mejor tratamiento',
    'No hay respuestas correctas ni incorrectas',
    'Sus respuestas son confidenciales y serán interpretadas por un profesional'
  ],
  timeEstimate: '8-12 minutos',
  calculateScore: calculateStaiScore,
  getInterpretation: getStaiDetailedInterpretation,
  checkAlerts: checkStaiClinicalAlerts,
  hasSubscales: true,
  subscales: {
    state: { name: 'Ansiedad Estado', items: 20, maxScore: 60 },
    trait: { name: 'Ansiedad Rasgo', items: 20, maxScore: 60 }
  },
  isDifferential: true, // Marca especial para escalas diferenciales
  visualOptions: true,
  applicationType: 'Autoaplicada'
}

// Datos para el catálogo de escalas
export const staiScaleData = {
  id: 'stai',
  fullName: 'Inventario de Ansiedad Estado-Rasgo',
  shortName: 'STAI',
  description: 'Escala diferencial que distingue entre ansiedad situacional (aguda, reciente) y rasgo de personalidad (crónica). Crítica para decisiones de tratamiento y pronóstico.',
  questions: 40,
  duration: '8-12',
  applicationType: 'Autoaplicada',
  ageRange: 'Adolescentes y adultos',
  diagnostics: ['Trastornos de ansiedad'],
  tags: ['Ansiedad', 'Diagnóstico diferencial', 'Estado vs Rasgo', 'Tratamiento', 'Pronóstico', 'Personalidad'],
  available: true,
  icon: 'picklist-type-svgrepo-com',
  color: '#8b5cf6'
}

// Información de ayuda
export const staiHelpInfo = {
  purpose: "El STAI es fundamental para distinguir entre ansiedad situacional (Estado) y disposicional (Rasgo), diferencia crítica para seleccionar el tratamiento óptimo y establecer pronóstico.",
  scoring: {
    method: "Dos subescalas independientes de 20 ítems cada una (0-3 puntos). Items positivos requieren puntuación inversa.",
    subscales: [
      { name: "Ansiedad Estado", items: 20, description: "Ansiedad actual, situacional, temporal (cómo se siente AHORA)" },
      { name: "Ansiedad Rasgo", items: 20, description: "Ansiedad como rasgo de personalidad (cómo se siente EN GENERAL)" }
    ],
    ranges: [
      { range: "0-25", severity: "Baja", color: "#22c55e" },
      { range: "26-35", severity: "Media-Baja", color: "#eab308" },
      { range: "36-45", severity: "Media", color: "#f97316" },
      { range: "46-55", severity: "Alta", color: "#dc2626" },
      { range: "56-60", severity: "Muy Alta", color: "#991b1b" }
    ]
  },
  clinical_considerations: [
    "PATRÓN SITUACIONAL (Alta Estado/Baja Rasgo): Terapia breve, medicación PRN, excelente pronóstico",
    "PATRÓN RASGO (Baja Estado/Alta Rasgo): Tratamiento a largo plazo, ISRS/IRSN, TCC prolongada",
    "PATRÓN MIXTO (Alta Estado/Alta Rasgo): Tratamiento combinado, mayor riesgo de recaída",
    "Diferencia ≥20 puntos indica patrón diagnóstico claro para tratamiento diferencial",
    "Items 7, 9, 28 requieren atención especial por riesgo asociado"
  ],
  limitations: [
    "Requiere insight del paciente para diferenciar estados temporales vs permanentes",
    "Puede ser influenciado por el momento de aplicación (estrés situacional)",
    "No evalúa tipos específicos de ansiedad (social, generalizada, etc.)",
    "Requiere interpretación profesional para decisiones de tratamiento"
  ],
  references: "Spielberger, C.D., Gorsuch, R.L., Lushene, R., Vagg, P.R., & Jacobs, G.A. (1983). Manual for the State-Trait Anxiety Inventory. Consulting Psychologists Press."
}