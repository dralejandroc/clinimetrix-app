// BLS-23 - Lista de Síntomas de Trastorno Límite
// Evaluación de síntomas del trastorno límite de personalidad

export const bls23AffectiveQuestions = [
  'Me resultaba difícil concentrarme',
  'Me sentí indefenso',
  'Estuve ausente e incapaz de recordar que estaba haciendo en realidad',
  'Sentí asco',
  'Pensé en hacerme daño',
  'Desconfié de los demás',
  'No creía que tuviera derecho a vivir',
  'Me sentía solo',
  'Sentí una tensión interna estresante',
  'Sentí mucho miedo de imágenes que me vinieron a la cabeza',
  'Me odié a mí mismo',
  'Quise castigarme',
  'Sufrí de vergüenza',
  'Mi humor oscilaba rápidamente entre la ansiedad, la rabia y la depresión',
  'Sufrí al oír voces y ruidos procedentes de dentro o fuera de mi cabeza',
  'Las críticas tuvieron un efecto demoledor en mí',
  'Me sentí vulnerable',
  'La idea de morirme me causó una cierta fascinación',
  'Nada parecía tener sentido para mí',
  'Tuve miedo de perder el control',
  'Me di asco a mí mismo',
  'Tuve la sensación de salir de mí mismo',
  'Sentí que no valía nada'
]

export const bls23BehavioralQuestions = [
  'Me hice daño cortándome, quemándome, estrangulándome, dándome golpes con la cabeza, etc.',
  'Dije a otras personas que iba a matarme',
  'Intenté suicidarme',
  'Tuve atracones de comida',
  'Me provoqué el vómito',
  'Realicé deliberadamente conductas arriesgadas como conducir demasiado rápido o en dirección contraria, hacer equilibrios y juegos en lugares altos, etc.',
  'Me emborraché',
  'Usé drogas',
  'Tomé medicación que no se me había recetado o si se me había prescrito, tomé más de la dosis recetada',
  'Tuve brotes de ira incontrolada o ataqué físicamente a otras personas',
  'Tuve relaciones sexuales que no pude controlar, de las cuales más tarde me sentí avergonzado/a o enfadado/a'
]

// Todas las preguntas combinadas con metadatos
export const bls23Questions = [
  // Síntomas afectivos (0-22)
  ...bls23AffectiveQuestions.map((text, index) => ({
    id: index,
    text,
    type: 'affective',
    section: 'Parte 1: Síntomas y Sentimientos',
    sectionSubtitle: 'Indique en qué grado le afectó cada problema durante la última semana'
  })),
  // Conductas (23-33)
  ...bls23BehavioralQuestions.map((text, index) => ({
    id: index + 23,
    text,
    type: 'behavioral', 
    section: 'Parte 2: Conductas y Comportamientos',
    sectionSubtitle: 'Selecciona la FRECUENCIA que corresponda en cada una'
  })),
  // Evaluación general con porcentaje (34)
  {
    id: 34,
    text: 'Califica la CALIDAD DE TU ESTADO EN GENERAL a lo largo de la última semana',
    description: '0% significa absolutamente hundido, 100% significa excelente. Por favor, señale el porcentaje que más se aproxime a tu situación.',
    type: 'percentage',
    section: 'Evaluación General',
    min: 0,
    max: 100,
    defaultValue: 50,
    labels: {
      min: 'Absolutamente hundido (0%)',
      max: 'Excelente (100%)'
    }
  }
]

export const bls23AffectiveOptions = [
  { value: 0, label: 'Nunca' },
  { value: 1, label: 'Algo' },
  { value: 2, label: 'Bastante' },
  { value: 3, label: 'Mucho' },
  { value: 4, label: 'Extremadamente' }
]

export const bls23BehavioralOptions = [
  { value: 0, label: 'Nada' },
  { value: 1, label: '1 vez' },
  { value: 2, label: '2 a 3 veces' },
  { value: 3, label: '4 a 6 veces' },
  { value: 4, label: 'Diario' }
]

export const calculateBls23Score = (responses = {}) => {
  // Calcular puntuación afectiva (preguntas 0-22)
  let affectiveScore = 0
  for (let i = 0; i < 23; i++) {
    if (responses[i] !== undefined) {
      affectiveScore += responses[i]
    }
  }

  // Calcular puntuación conductual (preguntas 23-33)
  let behavioralScore = 0
  for (let i = 23; i < 34; i++) {
    if (responses[i] !== undefined) {
      behavioralScore += responses[i]
    }
  }

  const totalScore = affectiveScore + behavioralScore
  const meanAffective = affectiveScore / 23

  // Estado general (pregunta 34 - porcentaje)
  const generalState = responses[34] || 50

  return {
    affectiveScore,
    behavioralScore,
    totalScore,
    meanAffective: Math.round(meanAffective * 100) / 100,
    generalState,
    maxAffective: 92, // 23 items × 4 puntos max
    maxBehavioral: 44, // 11 items × 4 puntos max
    maxTotal: 136,
    completedQuestions: Object.keys(responses).length - (responses[34] !== undefined ? 1 : 0), // Excluir el porcentaje del conteo
    totalQuestions: 34
  }
}

export const getBls23SeverityLevel = (totalScore) => {
  if (totalScore <= 48) {
    return {
      level: 'Leve',
      class: 'severity-low',
      color: '#48bb78'
    }
  } else if (totalScore <= 62) {
    return {
      level: 'Moderado', 
      class: 'severity-moderate',
      color: '#ed8936'
    }
  } else {
    return {
      level: 'Grave',
      class: 'severity-severe', 
      color: '#f56565'
    }
  }
}

export const getBls23DetailedInterpretation = (result) => {
  const { totalScore, affectiveScore, behavioralScore, meanAffective, generalState } = result
  const severity = getBls23SeverityLevel(totalScore)

  let interpretation = ''
  let recommendations = []

  switch (severity.level) {
    case 'Leve':
      interpretation = 'El paciente presenta síntomas mínimos a leves relacionados con el trastorno límite de personalidad. La sintomatología afectiva y conductual se encuentra en rangos que no interfieren significativamente con el funcionamiento diario. Se recomienda seguimiento preventivo y evaluación de factores de riesgo.'
      recommendations = [
        'Seguimiento clínico preventivo cada 3-6 meses',
        'Evaluación de factores de riesgo y estrategias de afrontamiento',
        'Consideración de psicoterapia de apoyo si aumenta la sintomatología'
      ]
      break

    case 'Moderado':
      interpretation = 'Se identifica un nivel moderado de sintomatología límite que requiere atención clínica. Los síntomas afectivos y las conductas problema interfieren con el funcionamiento diario y las relaciones interpersonales. Se requiere intervención terapéutica estructurada y seguimiento regular.'
      recommendations = [
        'Indicación de psicoterapia especializada (TDC, terapia específica para TLP)',
        'Evaluación integral de comorbilidades psiquiátricas',
        'Planificación de tratamiento estructurado a mediano plazo',
        'Seguimiento mensual durante la fase inicial del tratamiento'
      ]
      break

    case 'Grave':
      interpretation = 'El paciente presenta sintomatología límite severa con impacto significativo en múltiples áreas de funcionamiento. Se observan síntomas afectivos intensos y conductas de alto riesgo que requieren intervención inmediata y manejo intensivo. Evaluación urgente de riesgo suicida y autolesivo requerida.'
      recommendations = [
        'Intervención terapéutica intensiva inmediata (TDC intensiva o similar)',
        'Consideración inmediata de tratamiento farmacológico (estabilizadores del ánimo, antipsicóticos)',
        'Implementación de plan de seguridad y manejo de crisis',
        'Consideración de tratamiento residencial o parcial hospitalización'
      ]
      break
  }

  // Consideraciones adicionales por estado general
  if (generalState <= 30) {
    recommendations.push('⚠️ Estado general muy deteriorado: Evaluación de necesidad de soporte adicional')
  }

  // Consideraciones por puntuación conductual alta
  if (behavioralScore > 20) {
    recommendations.push('Enfoque específico en reducción de conductas problema y habilidades de regulación emocional')
  }

  return {
    level: severity.level,
    title: `Sintomatología Límite ${severity.level}`,
    description: interpretation,
    recommendations: recommendations.join('; '),
    color: severity.color,
    className: severity.class
  }
}

export const getBls23HighScoreItems = (responses = {}) => {
  const threshold = Math.ceil(4 * 0.66) // 66% del máximo (≥3 puntos)
  const highItems = []

  // Verificar síntomas afectivos
  for (let i = 0; i < 23; i++) {
    if (responses[i] !== undefined && responses[i] >= threshold) {
      highItems.push({
        number: i + 1,
        text: bls23AffectiveQuestions[i],
        score: responses[i],
        type: 'Síntoma',
        maxScore: 4
      })
    }
  }

  // Verificar conductas
  for (let i = 23; i < 34; i++) {
    if (responses[i] !== undefined && responses[i] >= threshold) {
      highItems.push({
        number: (i - 23) + 1,
        text: bls23BehavioralQuestions[i - 23],
        score: responses[i],
        type: 'Conducta',
        maxScore: 4
      })
    }
  }

  return highItems
}

export const checkBls23ClinicalAlerts = (responses = {}) => {
  const alerts = []

  // Conductas críticas de alto riesgo (autolesión, amenazas suicidas, intentos)
  const criticalBehaviors = [
    { index: 23, name: 'Autolesión', question: bls23BehavioralQuestions[0] },
    { index: 24, name: 'Amenazas suicidas', question: bls23BehavioralQuestions[1] },
    { index: 25, name: 'Intentos de suicidio', question: bls23BehavioralQuestions[2] }
  ]

  criticalBehaviors.forEach(behavior => {
    if (responses[behavior.index] !== undefined && responses[behavior.index] > 0) {
      alerts.push({
        type: 'critical',
        title: `⚠️ ALERTA CRÍTICA: ${behavior.name}`,
        message: `El paciente reporta ${behavior.question.toLowerCase()} con frecuencia ${bls23BehavioralOptions[responses[behavior.index]].label.toLowerCase()}. Requiere evaluación inmediata de riesgo y protocolo de seguridad.`,
        priority: 'urgent'
      })
    }
  })

  // Alerta por ideación suicida (síntoma 5 y 18)
  if ((responses[4] !== undefined && responses[4] >= 2) || (responses[17] !== undefined && responses[17] >= 2)) {
    alerts.push({
      type: 'warning',
      title: '⚠️ Ideación Suicida Presente',
      message: 'El paciente reporta pensamientos de hacerse daño o fascinación con la muerte. Evaluar riesgo suicida y considerar intervención preventiva.',
      priority: 'high'
    })
  }

  // Alerta por síntomas psicóticos (síntoma 15)
  if (responses[14] !== undefined && responses[14] >= 2) {
    alerts.push({
      type: 'warning',
      title: '⚠️ Síntomas Pseudopsicóticos',
      message: 'El paciente reporta escuchar voces o ruidos. Evaluar diagnóstico diferencial y posible necesidad de tratamiento antipsicótico.',
      priority: 'high'
    })
  }

  // Alerta por disociación severa (síntomas 3 y 22)
  if ((responses[2] !== undefined && responses[2] >= 3) || (responses[21] !== undefined && responses[21] >= 3)) {
    alerts.push({
      type: 'warning',
      title: '⚠️ Síntomas Disociativos Severos',
      message: 'El paciente reporta episodios significativos de despersonalización o ausencias. Evaluar intensidad de síntomas disociativos.',
      priority: 'medium'
    })
  }

  // Alerta por conductas de riesgo múltiples
  const riskBehaviors = [26, 27, 28, 29, 30, 31, 32, 33] // Atracones, vómito, conductas arriesgadas, alcohol, drogas, medicación, ira, sexo
  const riskCount = riskBehaviors.filter(index => responses[index] !== undefined && responses[index] >= 1).length

  if (riskCount >= 3) {
    alerts.push({
      type: 'warning',
      title: '⚠️ Múltiples Conductas de Riesgo',
      message: `El paciente reporta ${riskCount} diferentes tipos de conductas impulsivas o de riesgo. Requiere evaluación integral de control de impulsos y desarrollo de estrategias de manejo.`,
      priority: 'medium'
    })
  }

  // Alerta por estado general muy deteriorado
  if (responses[34] !== undefined && responses[34] <= 20) {
    alerts.push({
      type: 'warning',
      title: '⚠️ Estado General Críticamente Deteriorado',
      message: `El paciente califica su estado general como ${responses[34]}%. Indica deterioro severo del funcionamiento global que requiere atención inmediata.`,
      priority: 'high'
    })
  }

  return alerts
}

// Configuración completa de la escala
export const bls23Config = {
  id: 'bls-23',
  name: 'BLS-23',
  fullName: 'Lista de Síntomas de Trastorno Límite',
  description: 'Evaluación de síntomas afectivos y conductuales relacionados con el trastorno límite de personalidad durante la última semana',
  applicationType: 'Autoaplicada',
  questions: bls23Questions,
  options: bls23AffectiveOptions, // Opciones por defecto
  specialOptions: {
    behavioral: bls23BehavioralOptions
  },
  maxScore: 136,
  scoreRange: 'Afectivo: 0-92, Conductual: 0-44, Total: 0-136',
  instructions: [
    'En la siguiente evaluación encontrará una serie de dificultades, problemas y conductas que podrían describirle',
    'Por favor, lea cada afirmación y decida en qué grado le afectó cada problema durante la última semana',
    'En el caso de que no sienta nada en este momento, responda de acuerdo a cómo piensa que podría haberse sentido',
    'Si se ha sentido de diferente manera en diferentes momentos de la semana, haga una valoración promedio',
    'Esta evaluación consta de 23 síntomas, 11 conductas y una evaluación general',
    'Sus respuestas son confidenciales y serán revisadas por un profesional de la salud'
  ],
  timeEstimate: '7-10 minutos',
  calculateScore: calculateBls23Score,
  getInterpretation: getBls23DetailedInterpretation,
  checkAlerts: checkBls23ClinicalAlerts,
  factors: {
    affective: { name: 'Síntomas Afectivos', maxScore: 92 },
    behavioral: { name: 'Conductas Problema', maxScore: 44 },
    general: { name: 'Estado General', maxScore: 100, type: 'percentage' }
  }
}

// Datos para el catálogo de escalas
export const bls23ScaleData = {
  id: 'bls-23',
  fullName: 'Lista de Síntomas de Trastorno Límite',
  shortName: 'BLS-23',
  description: 'Evaluación de síntomas afectivos y conductuales del trastorno límite de personalidad con evaluación de riesgo y conductas críticas.',
  questions: 35, // 23 síntomas + 11 conductas + 1 evaluación general
  duration: '7-10',
  applicationType: 'Autoaplicada',
  ageRange: 'Adolescentes y adultos',
  diagnostics: ['Trastorno Límite de Personalidad', 'Trastornos de Personalidad', 'Evaluación de riesgo'],
  tags: ['Personalidad', 'TLP', 'Autolesión', 'Conductas de riesgo', 'Evaluación integral'],
  available: true,
  icon: 'picklist-type-svgrepo-com',
  color: '#8b5cf6'
}

// Información de ayuda
export const bls23HelpInfo = {
  purpose: "El BLS-23 evalúa síntomas afectivos y conductuales específicos del trastorno límite de personalidad durante la última semana, incluyendo evaluación de riesgo suicida y autolesivo.",
  scoring: {
    method: "Dos subescalas principales más evaluación general por porcentaje",
    ranges: [
      { range: "Afectivo: 0-92", severity: "23 síntomas × 0-4 puntos", color: "#8b5cf6" },
      { range: "Conductual: 0-44", severity: "11 conductas × 0-4 puntos", color: "#8b5cf6" },
      { range: "Total: 0-136", severity: "0-48: Leve, 49-62: Moderado, 63+: Grave", color: "#8b5cf6" },
      { range: "Estado General: 0-100%", severity: "Autoevaluación global del funcionamiento", color: "#8b5cf6" }
    ]
  },
  clinical_considerations: [
    "Incluye detección de conductas críticas (autolesión, amenazas e intentos suicidas)",
    "Evalúa síntomas pseudopsicóticos y disociativos específicos del TLP",
    "Marco temporal de una semana proporciona evaluación del estado actual",
    "Útil para monitoreo de tratamiento y evaluación de riesgo",
    "Diferencia entre síntomas afectivos y conductas problema",
    "Evaluación global complementaria con escala de porcentaje"
  ],
  limitations: [
    "Es una medida de screening, no diagnóstica por sí sola",
    "Requiere capacidad de introspección y memoria de la última semana",
    "Puede ser influenciada por el estado de ánimo actual",
    "Algunas conductas pueden estar subreportadas por vergüenza",
    "No evalúa todos los criterios diagnósticos del DSM-5 para TLP"
  ],
  references: "Bohus et al. (2007). Borderline Symptom List (BSL-23). Validación y propiedades psicométricas."
}