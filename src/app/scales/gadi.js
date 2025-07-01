// GADI - Inventario de Ansiedad Generalizada
// Inventario de autoevaluación que evalúa síntomas cognitivos, somáticos y alteraciones del sueño

export const gadiQuestions = [
  'Estoy ansioso/a la mayoría de los días',
  'Me canso fácilmente',
  'Me preocupo por los acontecimientos cotidianos',
  'Encuentro dificultad para relajarme',
  'Me siento «al límite»',
  'Me despierto por la noche',
  'Experimento sofocos o escalofríos',
  'Tengo malestar por mi ansiedad',
  'Tengo la boca seca',
  'Temo perder el control, desmayarme o volverme loco/a',
  'Estoy molesto/a por la inquietud',
  'Sufro mareos',
  'Estoy molesto/a por tener temblores y sacudidas',
  'Tengo dificultad para coger el sueño',
  'Sufro por la tensión o dolor de los músculos',
  'Estoy molesto/a por la dificultad con la respiración',
  'Me asusto fácilmente',
  'Tengo dificultad para concentrarme',
  'Tengo dificultad para controlar mi ansiedad',
  'Estoy molesto/a por hormigueos o insensibilidad en las manos',
  'Me preocupo excesivamente',
  'Estoy irritable'
]

export const gadiOptions = [
  { value: 0, label: 'En absoluto o no ha ocurrido' },
  { value: 1, label: 'Un poco' },
  { value: 2, label: 'Algo' },
  { value: 3, label: 'Mucho' },
  { value: 4, label: 'Extremadamente' }
]

export const calculateGadiScore = (responses = {}) => {
  let total = 0
  let cognitive = 0
  let somatic = 0
  let sleep = 0

  // Factores cognitivos (ítems 1, 3, 8, 10, 17, 18, 19, 21, 22)
  const cognitiveItems = [0, 2, 7, 9, 16, 17, 18, 20, 21]
  cognitiveItems.forEach(i => {
    const score = responses[i] || 0
    cognitive += score
    total += score
  })

  // Factores somáticos (ítems 2, 4, 7, 9, 11, 12, 13, 15, 16, 20, 22)
  const somaticItems = [1, 3, 6, 8, 10, 11, 12, 14, 15, 19, 21]
  somaticItems.forEach(i => {
    const score = responses[i] || 0
    somatic += score
    total += score
  })

  // Factores de sueño (ítems 6, 14)
  const sleepItems = [5, 13]
  sleepItems.forEach(i => {
    const score = responses[i] || 0
    sleep += score
    total += score
  })

  return {
    total,
    cognitive,
    somatic,
    sleep,
    percentage: Math.round((total / 88) * 100)
  }
}

export const getGadiDetailedInterpretation = (result) => {
  const { total, cognitive, somatic, sleep } = result
  
  if (total >= 31) {
    return {
      level: 'severe',
      title: 'Ansiedad Generalizada Severa',
      description: `Puntuación total: ${total}/88. La puntuación indica un nivel severo de sintomatología ansiosa que sugiere la presencia de un Trastorno de Ansiedad Generalizada clínicamente significativo. Se recomienda evaluación psiquiátrica urgente e intervención terapéutica inmediata.`,
      recommendations: 'Evaluación psiquiátrica urgente, consideración de farmacoterapia e intervención psicoterapéutica inmediata. Monitoreo estrecho de síntomas.',
      factorInterpretations: {
        cognitive: cognitive >= 22 ? 'Síntomas cognitivos severos: preocupación excesiva y dificultades para controlar la ansiedad prominentes.' : 'Síntomas cognitivos moderados.',
        somatic: somatic >= 26 ? 'Manifestaciones físicas severas: tensión muscular, síntomas autonómicos y fatiga significativos.' : 'Síntomas somáticos moderados.',
        sleep: sleep >= 5 ? 'Alteraciones del sueño severas asociadas con ansiedad.' : 'Alteraciones del sueño leves a moderadas.'
      },
      className: 'level-severe',
      color: '#f56565'
    }
  } else if (total >= 23) {
    return {
      level: 'moderate',
      title: 'Ansiedad Generalizada Moderada-Severa',
      description: `Puntuación total: ${total}/88. La puntuación sugiere presencia de sintomatología ansiosa clínicamente significativa que puede indicar riesgo de Trastorno de Ansiedad Generalizada. Se recomienda evaluación clínica detallada.`,
      recommendations: 'Evaluación clínica completa, consideración de intervención psicoterapéutica y/o farmacológica. Seguimiento regular de síntomas.',
      factorInterpretations: {
        cognitive: cognitive >= 14 ? 'Síntomas cognitivos significativos que requieren atención clínica.' : 'Síntomas cognitivos dentro de rangos esperados.',
        somatic: somatic >= 18 ? 'Manifestaciones físicas significativas de ansiedad.' : 'Síntomas somáticos dentro de rangos esperados.',
        sleep: sleep >= 4 ? 'Alteraciones del sueño relacionadas con ansiedad.' : 'Alteraciones del sueño mínimas.'
      },
      className: 'level-moderate',
      color: '#ed8936'
    }
  } else if (total >= 13) {
    return {
      level: 'mild',
      title: 'Ansiedad Generalizada Leve-Moderada',
      description: `Puntuación total: ${total}/88. La puntuación indica un nivel leve a moderado de síntomas ansiosos. Puede beneficiarse de estrategias de manejo de estrés y seguimiento clínico.`,
      recommendations: 'Estrategias de manejo del estrés, técnicas de relajación, seguimiento clínico. Evaluar factores estresantes actuales y recursos de afrontamiento.',
      factorInterpretations: {
        cognitive: cognitive >= 8 ? 'Preocupaciones y ansiedad cognitiva presente pero manejable.' : 'Síntomas cognitivos mínimos.',
        somatic: somatic >= 10 ? 'Algunos síntomas físicos de ansiedad presentes.' : 'Síntomas somáticos mínimos.',
        sleep: sleep >= 2 ? 'Algunas dificultades del sueño relacionadas con ansiedad.' : 'Sueño poco afectado.'
      },
      className: 'level-mild',
      color: '#f6ad55'
    }
  } else {
    return {
      level: 'minimal',
      title: 'Ansiedad Generalizada Mínima',
      description: `Puntuación total: ${total}/88. La puntuación indica un nivel mínimo de sintomatología ansiosa, dentro de rangos normativos. Los síntomas reportados no sugieren la presencia de un Trastorno de Ansiedad Generalizada.`,
      recommendations: 'Mantenimiento de estrategias de bienestar general, técnicas preventivas de manejo del estrés. Seguimiento rutinario.',
      factorInterpretations: {
        cognitive: 'Síntomas cognitivos mínimos o ausentes.',
        somatic: 'Síntomas somáticos mínimos o ausentes.',
        sleep: 'Sueño no afectado significativamente por ansiedad.'
      },
      className: 'level-minimal',
      color: '#48bb78'
    }
  }
}

export const checkGadiClinicalAlerts = (responses = {}) => {
  const alerts = []
  const highThreshold = 3 // ≥75% del máximo (3 de 4)
  
  // Revisar ítems específicos de alta preocupación
  if (responses[9] && responses[9] >= highThreshold) { // Ítem 10: Temor a perder control
    alerts.push({
      type: 'critical',
      title: '⚠️ ALERTA: Temor a Pérdida de Control',
      message: 'El paciente reporta temor significativo a perder el control, desmayarse o volverse loco. Requiere evaluación de riesgo de crisis de pánico y manejo específico.',
      priority: 'high'
    })
  }
  
  if (responses[18] && responses[18] >= highThreshold) { // Ítem 19: Dificultad para controlar ansiedad
    alerts.push({
      type: 'warning',
      title: '⚠️ Dificultad Severa de Control',
      message: 'El paciente reporta dificultad severa para controlar su ansiedad, lo que puede indicar deterioro funcional significativo.',
      priority: 'high'
    })
  }
  
  // Revisar síntomas somáticos severos
  const severeSomaticSymptoms = [15, 7, 11, 12].filter(index => responses[index] && responses[index] >= highThreshold)
  if (severeSomaticSymptoms.length >= 2) {
    alerts.push({
      type: 'warning',
      title: '⚠️ Síntomas Somáticos Múltiples',
      message: 'Presencia de múltiples síntomas físicos severos que requieren evaluación médica para descartar causas orgánicas.',
      priority: 'medium'
    })
  }
  
  // Revisar alteraciones severas del sueño
  if ((responses[5] && responses[5] >= highThreshold) || (responses[13] && responses[13] >= highThreshold)) {
    alerts.push({
      type: 'warning',
      title: '⚠️ Alteraciones Severas del Sueño',
      message: 'Presencia de alteraciones significativas del sueño que pueden requerir intervención específica.',
      priority: 'medium'
    })
  }
  
  return alerts
}

// Configuración completa de la escala
export const gadiConfig = {
  id: 'gadi',
  name: 'GADI',
  fullName: 'Inventario de Ansiedad Generalizada',
  description: 'Inventario de autoevaluación que evalúa síntomas cognitivos, somáticos y alteraciones del sueño relacionadas con ansiedad generalizada',
  questions: gadiQuestions,
  options: gadiOptions,
  maxScore: 88,
  scoreRange: '0-88',
  instructions: [
    'Asegúrese de responder todas las preguntas sobre síntomas que ha sentido en las últimas dos semanas',
    'No se detenga demasiado tiempo en cada pregunta, ya que no hay respuestas correctas ni incorrectas',
    'Esta evaluación consta de 22 preguntas sobre síntomas de ansiedad',
    'Sus respuestas son confidenciales y serán revisadas por un profesional de la salud'
  ],
  timeEstimate: '2-5 minutos',
  calculateScore: calculateGadiScore,
  getInterpretation: getGadiDetailedInterpretation,
  checkAlerts: checkGadiClinicalAlerts,
  factors: {
    cognitive: { name: 'Síntomas Cognitivos', maxScore: 36 },
    somatic: { name: 'Síntomas Somáticos', maxScore: 44 },
    sleep: { name: 'Alteraciones del Sueño', maxScore: 8 }
  }
}

// Datos para el catálogo de escalas
export const gadiScaleData = {
  id: 'gadi',
  fullName: 'Inventario de Ansiedad Generalizada',
  shortName: 'GADI',
  description: 'Inventario de autoevaluación que evalúa síntomas cognitivos, somáticos y alteraciones del sueño relacionadas con ansiedad generalizada.',
  questions: 22,
  duration: '2-5',
  applicationType: 'Autoaplicada',
  ageRange: 'Adolescentes y adultos',
  diagnostics: ['Ansiedad'],
  tags: ['Ansiedad', 'TAG'],
  available: true,
  icon: 'brain',
  color: '#EC7367'
}

// Información de ayuda
export const gadiHelpInfo = {
  purpose: "El GADI evalúa síntomas de ansiedad generalizada diferenciando entre componentes cognitivos, somáticos y alteraciones del sueño.",
  scoring: {
    method: "Suma de 22 ítems (0-4 puntos cada uno)",
    ranges: [
      { range: "0-12", severity: "Ansiedad mínima", color: "#22c55e" },
      { range: "13-22", severity: "Ansiedad leve-moderada", color: "#eab308" },
      { range: "23-30", severity: "Ansiedad moderada-severa", color: "#f97316" },
      { range: "≥31", severity: "Ansiedad severa", color: "#dc2626" }
    ]
  },
  clinical_considerations: [
    "Evalúa tres factores: cognitivo, somático y alteraciones del sueño",
    "Útil para seguimiento de tratamiento en TAG",
    "Item 10 evalúa temor a pérdida de control - importante para crisis de pánico"
  ],
  limitations: [
    "Requiere validación en población hispanohablante",
    "Puede confundirse con síntomas de otras condiciones médicas",
    "No diferencia entre TAG y otros trastornos de ansiedad"
  ],
  references: "Roemer et al. (2008). Behavior Research and Therapy"
}