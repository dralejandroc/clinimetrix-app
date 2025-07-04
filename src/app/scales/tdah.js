// TDAH - Evaluación de TDAH en Adultos basada en criterios DSM-5
// Escala de screening para síntomas de déficit de atención e hiperactividad-impulsividad en adultos

export const tdahQuestions = [
  // Ítems de Inatención (impares: 1, 3, 5, 7, 9, 11, 13, 15, 17)
  'Al hacer mi trabajo no logro fijar mi atención en los detalles o cometo errores por no tener cuidado',
  'Meneo las manos o los pies o me muevo constantemente en mi asiento',
  'Tengo dificultad para sostener mi atención en las tareas o en las actividades de diversión',
  'Me levanto del asiento en situaciones en donde se espera que permanezca sentado',
  'No presto atención cuando se me habla directamente',
  'Me siento inquieto',
  'No sigo instrucciones de principio a fin y no termino el trabajo asignado',
  'Tengo dificultad para llevar a cabo actividades en mi tiempo libre de manera calmada o para hacer cosas divertidas tranquilamente',
  'Tengo dificultad para organizar las tareas y actividades',
  'Me siento como si tuviera que "moverme continuamente" o "como si me empujara un motor"',
  'Me disgusta, evito o estoy reticente a llevar a cabo trabajo que requiera esfuerzo mental sostenido',
  'Hablo en exceso',
  'Pierdo cosas que son necesarias para llevar a cabo tareas o actividades',
  'Contesto abruptamente antes de que otros terminen de hacerme la pregunta',
  'Me distraigo fácilmente',
  'Tengo dificultad para esperar mi turno',
  'Soy olvidadizo en las actividades diarias',
  'Interrumpo a los demás o soy entrometido'
]

export const tdahOptions = [
  { 
    text: 'Nunca o casi nunca', 
    value: 0, 
    emoji: '✅', 
    color: 'linear-gradient(135deg, #48bb78, #38a169)',
    textColor: 'white'
  },
  { 
    text: 'Algunas veces (más de una vez cada 15 días)', 
    value: 1, 
    emoji: '🟡', 
    color: 'linear-gradient(135deg, #f6e05e, #ecc94b)',
    textColor: 'white'
  },
  { 
    text: 'Frecuentemente (más de una vez por semana)', 
    value: 2, 
    emoji: '🟠', 
    color: 'linear-gradient(135deg, #f6ad55, #ed8936)',
    textColor: 'white'
  },
  { 
    text: 'Muy frecuentemente (casi diario o diario)', 
    value: 3, 
    emoji: '🚨', 
    color: 'linear-gradient(135deg, #f56565, #e53e3e)',
    textColor: 'white'
  }
]

// Distribución de ítems por subescala
export const tdahSubscales = {
  inatencion: {
    name: 'Inatención',
    items: [1, 3, 5, 7, 9, 11, 13, 15, 17], // Ítems impares
    description: 'Dificultades para mantener atención, organización y seguimiento de tareas',
    cutoff: 12 // Punto de corte clínico
  },
  hiperactividadImpulsividad: {
    name: 'Hiperactividad-Impulsividad',
    items: [2, 4, 6, 8, 10, 12, 14, 16, 18], // Ítems pares
    description: 'Inquietud motora, impulsividad y dificultad para autorregulación',
    cutoff: 12 // Punto de corte clínico
  }
}

export const calculateTdahScore = (responses = {}) => {
  let inatentionTotal = 0
  let hiperactividadTotal = 0
  let completedItems = 0

  // Calcular puntuación de Inatención
  tdahSubscales.inatencion.items.forEach(item => {
    if (responses[item] !== undefined) {
      inatentionTotal += responses[item]
      completedItems++
    }
  })

  // Calcular puntuación de Hiperactividad-Impulsividad
  tdahSubscales.hiperactividadImpulsividad.items.forEach(item => {
    if (responses[item] !== undefined) {
      hiperactividadTotal += responses[item]
      completedItems++
    }
  })

  const totalScore = inatentionTotal + hiperactividadTotal
  const maxPossibleScore = 54 // 18 ítems × 3 puntos máximo

  return {
    inatentionScore: inatentionTotal,
    hiperactividadScore: hiperactividadTotal,
    totalScore,
    completedItems,
    totalItems: 18,
    maxScore: maxPossibleScore,
    percentage: Math.round((totalScore / maxPossibleScore) * 100),
    inatentionPercentage: Math.round((inatentionTotal / 27) * 100),
    hiperactividadPercentage: Math.round((hiperactividadTotal / 27) * 100)
  }
}

export const getTdahDetailedInterpretation = (result) => {
  const { inatentionScore, hiperactividadScore, totalScore, percentage } = result
  
  let level = 'minimo'
  let title = 'Sintomatología TDAH Mínima'
  let color = '#48bb78'
  let description = ''
  let recommendations = ''
  let subtypePattern = ''
  let clinicalSignificance = false

  // Determinación del patrón de subtipo TDAH
  const inatentionClinical = inatentionScore >= 12
  const hiperactividadClinical = hiperactividadScore >= 12
  const scoreDifference = Math.abs(inatentionScore - hiperactividadScore)

  if (inatentionClinical && hiperactividadClinical) {
    subtypePattern = 'TDAH COMBINADO'
  } else if (inatentionClinical && !hiperactividadClinical) {
    subtypePattern = 'TDAH PREDOMINANTEMENTE INATENTO'
  } else if (!inatentionClinical && hiperactividadClinical) {
    subtypePattern = 'TDAH PREDOMINANTEMENTE HIPERACTIVO-IMPULSIVO'
  } else {
    subtypePattern = 'NO CUMPLE CRITERIOS SINTOMÁTICOS'
  }

  // Interpretación global basada en porcentaje del DSM-5
  if (percentage >= 67) { // ≥36/54 puntos
    level = 'significativo'
    title = 'Sintomatología TDAH Significativa'
    color = '#dc2626'
    clinicalSignificance = true
    description = `Puntuación total: ${totalScore}/54 (${percentage}%). Sintomatología significativa que sugiere PROBABLE TDAH en adulto. Patrón: ${subtypePattern}. Requiere evaluación neuropsicológica integral y evaluación de deterioro funcional.`
    recommendations = 'Evaluación neuropsicológica completa. Evaluación funcional en múltiples dominios. Consideración de tratamiento farmacológico (estimulantes, no estimulantes) y psicoeducación.'
  } else if (percentage >= 44) { // 24-35/54 puntos
    level = 'moderado'
    title = 'Sintomatología TDAH Moderada'
    color = '#f97316'
    description = `Puntuación total: ${totalScore}/54 (${percentage}%). Sintomatología moderada que requiere evaluación adicional. Patrón: ${subtypePattern}. Necesaria valoración clínica integral para descartar TDAH.`
    recommendations = 'Evaluación clínica especializada. Historia del desarrollo detallada. Evaluación de deterioro funcional. Descartar comorbilidades (ansiedad, depresión). Considerar evaluación neuropsicológica.'
  } else {
    level = 'minimo'
    title = 'Sintomatología TDAH Mínima'
    color = '#48bb78'
    description = `Puntuación total: ${totalScore}/54 (${percentage}%). Sintomatología mínima o ausente. Patrón: ${subtypePattern}. No sugiere TDAH, pero evaluar otras causas si hay preocupaciones funcionales.`
    recommendations = 'Seguimiento rutinario. Si persisten dificultades funcionales, evaluar otras causas: trastornos del aprendizaje, ansiedad, depresión, problemas médicos.'
  }

  // Análisis específico por subescala
  const subscaleAnalysis = {
    inatencion: {
      score: inatentionScore,
      maxScore: 27,
      percentage: Math.round((inatentionScore / 27) * 100),
      clinical: inatentionClinical,
      interpretation: inatentionClinical ? 
        'Dificultades significativas de atención y concentración que interfieren con el funcionamiento diario.' :
        'Síntomas de inatención dentro de rangos normativos.'
    },
    hiperactividad: {
      score: hiperactividadScore,
      maxScore: 27,
      percentage: Math.round((hiperactividadScore / 27) * 100),
      clinical: hiperactividadClinical,
      interpretation: hiperactividadClinical ? 
        'Inquietud motora e impulsividad significativas que afectan el control inhibitorio.' :
        'Síntomas de hiperactividad-impulsividad dentro de rangos normativos.'
    }
  }

  return {
    level,
    title,
    description,
    recommendations,
    color,
    className: `level-${level}`,
    subtypePattern,
    clinicalSignificance,
    subscaleAnalysis,
    differentialConsiderations: getDifferentialConsiderations(result),
    functionalImpairmentAreas: getFunctionalImpairmentAreas(result)
  }
}

const getDifferentialConsiderations = (result) => {
  const { inatentionScore, hiperactividadScore } = result
  const considerations = []

  if (inatentionScore >= 15) {
    considerations.push('Descartar trastornos del aprendizaje, especialmente dislexia y discalculia')
    considerations.push('Evaluar trastornos del estado de ánimo que afecten la concentración')
  }

  if (hiperactividadScore >= 15) {
    considerations.push('Descartar trastornos de ansiedad con inquietud psicomotora')
    considerations.push('Evaluar trastorno bipolar, especialmente episodios hipomaníacos')
  }

  if (inatentionScore >= 12 && hiperactividadScore >= 12) {
    considerations.push('Evaluar comorbilidades: ansiedad (70%), depresión (50%), trastornos del aprendizaje (45%)')
    considerations.push('Assess abuso de sustancias como automedicación')
  }

  return considerations
}

const getFunctionalImpairmentAreas = (result) => {
  const { inatentionScore, hiperactividadScore } = result
  const areas = []

  if (inatentionScore >= 12) {
    areas.push('Rendimiento laboral/académico: Dificultades para completar tareas, errores por descuido')
    areas.push('Organización: Problemas con gestión del tiempo y organización de espacios')
    areas.push('Relaciones: Parecer desinteresado o no escuchar durante conversaciones')
  }

  if (hiperactividadScore >= 12) {
    areas.push('Trabajo: Dificultad para permanecer sentado, interrumpir reuniones')
    areas.push('Relaciones sociales: Impulsividad en decisiones, interrumpir conversaciones')
    areas.push('Manejo emocional: Baja tolerancia a la frustración, explosiones emocionales')
  }

  return areas
}

export const checkTdahClinicalAlerts = (responses = {}, result = {}) => {
  const alerts = []
  const { inatentionScore, hiperactividadScore, totalScore, clinicalSignificance } = result

  // Alerta crítica por puntuación muy alta
  if (totalScore >= 40) {
    alerts.push({
      type: 'critical',
      title: '🚨 SINTOMATOLOGÍA TDAH MUY SEVERA',
      message: `Puntuación extremadamente alta (${totalScore}/54). Alto riesgo de deterioro funcional severo. Requiere evaluación neuropsicológica urgente y consideración de tratamiento inmediato.`,
      priority: 'urgent'
    })
  } else if (clinicalSignificance) {
    alerts.push({
      type: 'warning',
      title: '⚠️ Probable TDAH en Adulto',
      message: `Sintomatología significativa (${totalScore}/54). Cumple criterios sintomáticos para evaluación especializada de TDAH.`,
      priority: 'high'
    })
  }

  // Alertas por subescalas específicas
  if (inatentionScore >= 18) {
    alerts.push({
      type: 'critical',
      title: '🚨 INATENCIÓN SEVERA',
      message: `Síntomas de inatención muy severos (${inatentionScore}/27). Alto riesgo de deterioro académico/laboral. Evaluar comorbilidades.`,
      priority: 'urgent'
    })
  } else if (inatentionScore >= 12) {
    alerts.push({
      type: 'warning',
      title: '⚠️ Inatención Clínicamente Significativa',
      message: `Dificultades significativas de atención (${inatentionScore}/27). Evaluar impacto funcional en trabajo/estudios.`,
      priority: 'high'
    })
  }

  if (hiperactividadScore >= 18) {
    alerts.push({
      type: 'critical',
      title: '🚨 HIPERACTIVIDAD-IMPULSIVIDAD SEVERA',
      message: `Síntomas hiperactivo-impulsivos muy severos (${hiperactividadScore}/27). Riesgo de decisiones imprudentes y conflictos interpersonales.`,
      priority: 'urgent'
    })
  } else if (hiperactividadScore >= 12) {
    alerts.push({
      type: 'warning',
      title: '⚠️ Hiperactividad-Impulsividad Significativa',
      message: `Inquietud e impulsividad significativas (${hiperactividadScore}/27). Evaluar impacto en relaciones y decisiones.`,
      priority: 'high'
    })
  }

  // Alertas por ítems críticos específicos
  if (responses[7] && responses[7] >= 2) { // No sigue instrucciones hasta el final
    alerts.push({
      type: 'warning',
      title: '⚠️ Dificultades Ejecutivas Significativas',
      message: 'Problemas severos para seguir instrucciones y completar tareas. Evaluar funciones ejecutivas.',
      priority: 'medium'
    })
  }

  if (responses[14] && responses[14] >= 2) { // Contesta antes de que terminen la pregunta
    alerts.push({
      type: 'warning',
      title: '⚠️ Impulsividad Verbal Significativa',
      message: 'Impulsividad verbal marcada. Evaluar impacto en relaciones laborales y personales.',
      priority: 'medium'
    })
  }

  if (responses[17] && responses[17] >= 2) { // Olvidadizo en actividades diarias
    alerts.push({
      type: 'info',
      title: '📋 Problemas de Memoria de Trabajo',
      message: 'Olvidos frecuentes en actividades diarias. Evaluar estrategias compensatorias y ayudas externas.',
      priority: 'medium'
    })
  }

  // Alerta por patrón de subtipo
  if (inatentionScore >= 12 && hiperactividadScore >= 12) {
    alerts.push({
      type: 'info',
      title: '📋 PATRÓN COMBINADO DETECTADO',
      message: 'Ambas dimensiones elevadas sugieren TDAH tipo combinado. Requiere intervención integral.',
      priority: 'medium'
    })
  }

  return alerts
}

export const getTdahHighScoreItems = (responses = {}) => {
  const highItems = []
  const threshold = 2 // Puntuaciones altas (≥2 = "Frecuentemente")

  tdahQuestions.forEach((question, index) => {
    const itemNumber = index + 1
    const response = responses[itemNumber]
    
    if (response !== undefined && response >= threshold) {
      const subscale = tdahSubscales.inatencion.items.includes(itemNumber) ? 'Inatención' : 'Hiperactividad-Impulsividad'
      
      highItems.push({
        number: itemNumber,
        text: question,
        score: response,
        maxScore: 3,
        subscale,
        concernLevel: response >= 3 ? 'high' : 'moderate',
        responseText: tdahOptions[response].text
      })
    }
  })

  return highItems
}

// Configuración completa de la escala
export const tdahConfig = {
  id: 'tdah',
  name: 'TDAH-Adultos',
  fullName: 'Evaluación de TDAH en Adultos (DSM-5)',
  description: 'Escala de screening basada en criterios DSM-5 para evaluar síntomas de déficit de atención e hiperactividad-impulsividad en adultos',
  questions: tdahQuestions,
  options: tdahOptions,
  maxScore: 54,
  scoreRange: '0-54 (Inatención: 0-27, Hiperactividad-Impulsividad: 0-27)',
  clinicalCutoffs: {
    total: 24, // 44% del máximo
    inatencion: 12,
    hiperactividad: 12
  },
  instructions: [
    'Esta escala evalúa síntomas de TDAH basados en criterios del DSM-5',
    'Piense en cómo se ha sentido y comportado durante los últimos 6 meses',
    'Responda con la frecuencia con que experimenta cada síntoma',
    'Sea honesto sobre la frecuencia real de estos comportamientos',
    'Esta evaluación NO constituye un diagnóstico médico',
    'Los resultados deben ser interpretados por un profesional de la salud',
    'Recuerde que el TDAH requiere evaluación integral que incluya historia del desarrollo'
  ],
  timeEstimate: '5-8 minutos',
  calculateScore: calculateTdahScore,
  getInterpretation: getTdahDetailedInterpretation,
  checkAlerts: checkTdahClinicalAlerts,
  hasSubscales: true,
  subscales: tdahSubscales,
  visualOptions: true,
  applicationType: 'Autoaplicada',
  isDSMBased: true // Marca especial para escalas basadas en DSM
}

// Datos para el catálogo de escalas
export const tdahScaleData = {
  id: 'tdah',
  fullName: 'Evaluación de TDAH en Adultos (DSM-5)',
  shortName: 'TDAH-Adultos',
  description: 'Escala de screening basada en los 18 criterios DSM-5 para evaluar síntomas de déficit de atención e hiperactividad-impulsividad en adultos. Ampliamente utilizada en práctica clínica diaria.',
  questions: 18,
  duration: '5-8',
  applicationType: 'Autoaplicada',
  ageRange: 'Adultos (18+ años)',
  diagnostics: ['TDAH'],
  tags: ['TDAH', 'Déficit de atención', 'Hiperactividad', 'Impulsividad', 'DSM-5', 'Adultos', 'Screening'],
  available: true,
  icon: 'picklist-type-svgrepo-com',
  color: '#3b82f6'
}

// Información de ayuda con validación científica
export const tdahHelpInfo = {
  purpose: "Escala de screening para TDAH en adultos basada en los 18 criterios sintomáticos del DSM-5. Evalúa dos dimensiones principales: inatención e hiperactividad-impulsividad para detectar posibles casos que requieren evaluación especializada.",
  scoring: {
    method: "Suma de 18 ítems DSM-5 (0-3 puntos cada uno). Puntuación separada por subescalas de inatención e hiperactividad-impulsividad",
    subscales: [
      { name: "Inatención", items: 9, description: "Dificultades atencionales, organización y seguimiento de tareas", cutoff: "≥12/27" },
      { name: "Hiperactividad-Impulsividad", items: 9, description: "Inquietud motora, impulsividad y autorregulación", cutoff: "≥12/27" }
    ],
    ranges: [
      { range: "0-23", severity: "Sintomatología mínima", description: "<44% máximo", color: "#22c55e" },
      { range: "24-35", severity: "Sintomatología moderada", description: "44-67% máximo", color: "#f97316" },
      { range: "36-54", severity: "Sintomatología significativa", description: "≥67% máximo", color: "#dc2626" }
    ]
  },
  clinical_considerations: [
    "HERRAMIENTA DE SCREENING ÚNICAMENTE - No constituye diagnóstico médico",
    "Puntuaciones ≥24/54 sugieren evaluación neuropsicológica especializada",
    "Evaluar deterioro funcional en múltiples dominios (laboral, social, académico)",
    "Historia del desarrollo esencial: síntomas deben estar presentes desde infancia",
    "Descartar comorbilidades frecuentes: ansiedad (70%), depresión (50%), t. aprendizaje (45%)",
    "Considerar diagnóstico diferencial: trastornos del aprendizaje, ansiedad, depresión, trastorno bipolar"
  ],
  validation_context: [
    "Basado en criterios DSM-5 para TDAH en adultos (American Psychiatric Association, 2013)",
    "Estructura similar a escalas validadas como ASRS v1.1 (Kessler et al., 2005)",
    "Prevalencia TDAH adultos: 2.5-4.4% población general (Fayyad et al., 2017)",
    "IMPORTANTE: Esta adaptación específica carece de estudios de validación publicados",
    "Recomendación: Complementar con escalas validadas (ASRS, CAARS) cuando sea posible"
  ],
  limitations: [
    "Sin validación psicométrica específica para esta adaptación en español",
    "Sesgo de autoinforme inherente a todas las escalas autoaplicadas",
    "No evalúa deterioro funcional de manera sistemática",
    "Requiere capacidad de introspección y memoria retrospectiva del paciente",
    "Puede ser influenciado por comorbilidades psiquiátricas actuales",
    "No incluye evaluación de informantes externos (familia, pareja)"
  ],
  references: [
    "American Psychiatric Association. (2013). Diagnostic and Statistical Manual of Mental Disorders (5th ed.). Arlington, VA: American Psychiatric Publishing.",
    "Kessler, R.C., et al. (2005). The World Health Organization Adult ADHD Self-Report Scale (ASRS). Psychological Medicine, 35(2), 245-256.",
    "Fayyad, J., et al. (2017). Cross-national prevalence and correlates of adult attention-deficit hyperactivity disorder. British Journal of Psychiatry, 190(5), 402-409.",
    "Conners, C.K., et al. (1999). Conners' Adult ADHD Rating Scales (CAARS). Multi-Health Systems.",
    "Ward, M.F., et al. (1993). The Wender Utah Rating Scale. American Journal of Psychiatry, 150(12), 1792-1798."
  ]
}