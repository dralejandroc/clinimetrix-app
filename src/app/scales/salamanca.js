// Cuestionario Salamanca de Trastornos de la Personalidad
// Evaluación dimensional de trastornos de personalidad según DSM-IV en adultos

// Definición de los trastornos y sus ítems
export const salamancaDisorders = {
  paranoide: { 
    items: [1, 2], 
    name: 'Paranoide', 
    group: 'A',
    description: 'Desconfianza y suspicacia hacia los demás'
  },
  esquizoide: { 
    items: [3, 4], 
    name: 'Esquizoide', 
    group: 'A',
    description: 'Distanciamiento de las relaciones sociales'
  },
  esquizotipico: { 
    items: [5, 6], 
    name: 'Esquizotípico', 
    group: 'A',
    description: 'Comportamiento excéntrico y creencias peculiares'
  },
  histrionico: { 
    items: [7, 8], 
    name: 'Histriónico', 
    group: 'B',
    description: 'Emotividad excesiva y búsqueda de atención'
  },
  antisocial: { 
    items: [9, 10], 
    name: 'Antisocial', 
    group: 'B',
    description: 'Desprecio y violación de los derechos de los demás'
  },
  narcisista: { 
    items: [11, 12], 
    name: 'Narcisista', 
    group: 'B',
    description: 'Grandiosidad y necesidad de admiración'
  },
  inestabilidad_impulsivo: { 
    items: [13, 14], 
    name: 'Inestabilidad Emocional (Impulsivo)', 
    group: 'B',
    description: 'Impulsividad y cambios emocionales rápidos'
  },
  inestabilidad_limite: { 
    items: [15, 16], 
    name: 'Inestabilidad Emocional (Límite)', 
    group: 'B',
    description: 'Inestabilidad en relaciones interpersonales y autoimagen'
  },
  anancastico: { 
    items: [17, 18], 
    name: 'Anancástico (Obsesivo-Compulsivo)', 
    group: 'C',
    description: 'Preocupación por el orden, perfeccionismo y control'
  },
  dependiente: { 
    items: [19, 20], 
    name: 'Dependiente', 
    group: 'C',
    description: 'Necesidad excesiva de que se ocupen de uno'
  },
  ansioso: { 
    items: [21, 22], 
    name: 'Ansioso (Evitativo)', 
    group: 'C',
    description: 'Inhibición social y sentimientos de inferioridad'
  }
}

// Nombres de los grupos/clusters
export const salamancaGroupNames = {
  'A': 'Grupo A - Raros/Excéntricos',
  'B': 'Grupo B - Dramáticos/Emocionales', 
  'C': 'Grupo C - Ansiosos/Temerosos'
}

// Preguntas del Cuestionario Salamanca (22 ítems)
export const salamancaQuestions = [
  {
    id: 1,
    text: 'Pienso que más vale no confiar en los demás'
  },
  {
    id: 2,
    text: 'Me gustaría dar a la gente su merecido'
  },
  {
    id: 3,
    text: 'Prefiero realizar actividades que pueda hacer yo solo'
  },
  {
    id: 4,
    text: 'Prefiero estar conmigo mismo'
  },
  {
    id: 5,
    text: '¿Piensa la gente que es usted raro o excéntrico?'
  },
  {
    id: 6,
    text: 'Estoy más en contacto con lo paranormal que la mayoría de la gente'
  },
  {
    id: 7,
    text: 'Soy demasiado emocional'
  },
  {
    id: 8,
    text: 'Doy mucha importancia y atención a mi imagen'
  },
  {
    id: 9,
    text: 'Hago cosas que están fuera de la ley'
  },
  {
    id: 10,
    text: 'Tengo poco respeto por los derechos de los demás'
  },
  {
    id: 11,
    text: 'Soy especial y merezco que me lo reconozcan'
  },
  {
    id: 12,
    text: 'Mucha gente me envidia por mi valía'
  },
  {
    id: 13,
    text: 'Mis emociones son como una montaña rusa'
  },
  {
    id: 14,
    text: 'Soy impulsivo'
  },
  {
    id: 15,
    text: 'Me pregunto con frecuencia cuál es mi papel en la vida'
  },
  {
    id: 16,
    text: 'Me siento aburrido y vacío con facilidad'
  },
  {
    id: 17,
    text: '¿Le considera la gente demasiado perfeccionista, obstinado o rígido?'
  },
  {
    id: 18,
    text: 'Soy detallista, minucioso y demasiado trabajador'
  },
  {
    id: 19,
    text: 'Necesito sentirme cuidado y protegido por los demás'
  },
  {
    id: 20,
    text: 'Me cuesta tomar decisiones por mí mismo'
  },
  {
    id: 21,
    text: 'Soy nervioso'
  },
  {
    id: 22,
    text: 'Tengo mucho miedo a hacer el ridículo'
  }
]

// Opciones de respuesta específicas del Salamanca
export const salamancaOptions = [
  { 
    text: 'Falso', 
    value: 0,
    emoji: '❌',
    color: 'linear-gradient(135deg, #48bb78, #38a169)',
    textColor: 'white'
  },
  { 
    text: 'A veces', 
    value: 1,
    emoji: '🤔',
    color: 'linear-gradient(135deg, #4299e1, #3182ce)',
    textColor: 'white'
  },
  { 
    text: 'Con frecuencia', 
    value: 2,
    emoji: '⚠️',
    color: 'linear-gradient(135deg, #f6ad55, #ed8936)',
    textColor: 'white'
  },
  { 
    text: 'Siempre', 
    value: 3,
    emoji: '🚨',
    color: 'linear-gradient(135deg, #f56565, #e53e3e)',
    textColor: 'white'
  }
]

export const calculateSalamancaScore = (responses = {}) => {
  const scores = {}
  const groupScores = { A: {}, B: {}, C: {} }
  
  // Calcular puntuación por trastorno
  for (const [disorderKey, disorder] of Object.entries(salamancaDisorders)) {
    let score = 0
    disorder.items.forEach(itemNum => {
      score += responses[itemNum] || 0
    })
    
    scores[disorderKey] = {
      score,
      maxScore: 6, // 2 ítems × 3 puntos máximo
      percentage: Math.round((score / 6) * 100),
      name: disorder.name,
      group: disorder.group,
      description: disorder.description
    }
    
    // Agrupar por cluster
    if (!groupScores[disorder.group]) {
      groupScores[disorder.group] = {}
    }
    groupScores[disorder.group][disorderKey] = scores[disorderKey]
  }
  
  return {
    disorderScores: scores,
    groupScores,
    completedQuestions: Object.keys(responses).length,
    totalQuestions: 22
  }
}

export const getSalamancaDetailedInterpretation = (result) => {
  const { disorderScores } = result
  const highScores = []
  const moderateScores = []
  const alerts = []
  
  // Analizar cada trastorno
  for (const [disorderKey, data] of Object.entries(disorderScores)) {
    if (data.score >= 4) { // ≥66% del máximo (6)
      highScores.push(data.name)
      alerts.push({
        type: 'critical',
        disorder: data.name,
        score: data.score,
        group: data.group
      })
    } else if (data.score >= 2) { // Punto de corte clínico
      moderateScores.push(data.name)
    }
  }
  
  let level = 'normal'
  let title = 'Perfil de Screening Negativo'
  let description = 'No se identifican patrones significativos que sugieran trastornos de personalidad según los criterios de screening del Cuestionario Salamanca.'
  let recommendations = 'Mantener seguimiento rutinario. No se requiere evaluación especializada inmediata.'
  
  if (highScores.length > 0) {
    level = 'high'
    title = 'Alertas Clínicas Prioritarias'
    description = `Se detectaron puntuaciones muy elevadas (≥4/6) en: ${highScores.join(', ')}. Estos patrones requieren evaluación clínica detallada inmediata.`
    recommendations = 'Evaluación psiquiátrica especializada urgente; Entrevista diagnóstica estructurada (IPDE o SCID-II); Valoración de impacto funcional y necesidad de tratamiento.'
  } else if (moderateScores.length > 0) {
    level = 'moderate'
    title = 'Indicadores de Evaluación Adicional'
    description = `Los siguientes patrones superan el punto de corte (≥2): ${moderateScores.join(', ')}. Se recomienda exploración clínica más detallada de estos dominios.`
    recommendations = 'Evaluación clínica especializada; Entrevista semiestructurada para confirmar rasgos; Monitoreo de evolución y funcionalidad.'
  }
  
  // Análisis por grupos
  let groupAnalysis = []
  const groups = ['A', 'B', 'C']
  groups.forEach(group => {
    const groupDisorders = Object.values(result.groupScores[group] || {})
    const significantInGroup = groupDisorders.filter(d => d.score >= 2).length
    if (significantInGroup > 0) {
      groupAnalysis.push(`${salamancaGroupNames[group]}: ${significantInGroup} trastorno(s) con puntuación significativa`)
    }
  })
  
  return {
    level,
    title,
    description,
    recommendations,
    groupAnalysis: groupAnalysis.join('; '),
    color: level === 'high' ? '#f56565' : level === 'moderate' ? '#f6ad55' : '#48bb78',
    className: `severity-${level}`
  }
}

export const checkSalamancaClinicalAlerts = (responses = {}, result = {}) => {
  const alerts = []
  const { disorderScores } = result
  
  // Alerta por trastorno antisocial alto
  if (disorderScores.antisocial && disorderScores.antisocial.score >= 4) {
    alerts.push({
      type: 'critical',
      title: '🚨 ALERTA: Rasgos Antisociales Severos',
      message: 'Puntuación muy elevada en trastorno antisocial. Evaluar riesgo de conductas disruptivas y cumplimiento terapéutico.',
      priority: 'urgent'
    })
  }
  
  // Alerta por inestabilidad emocional límite alta
  if (disorderScores.inestabilidad_limite && disorderScores.inestabilidad_limite.score >= 4) {
    alerts.push({
      type: 'critical',
      title: '🚨 ALERTA: Inestabilidad Emocional Severa',
      message: 'Puntuación muy elevada en trastorno límite. Evaluar riesgo de autolesión y necesidad de intervención inmediata.',
      priority: 'urgent'
    })
  }
  
  // Alerta por múltiples trastornos del mismo cluster
  const groupAlerts = { A: 0, B: 0, C: 0 }
  Object.values(disorderScores).forEach(disorder => {
    if (disorder.score >= 2) {
      groupAlerts[disorder.group]++
    }
  })
  
  Object.entries(groupAlerts).forEach(([group, count]) => {
    if (count >= 2) {
      alerts.push({
        type: 'warning',
        title: `⚠️ Múltiples Indicadores en ${salamancaGroupNames[group]}`,
        message: `Se detectan ${count} trastornos con puntuación significativa en el mismo cluster. Sugiere patrón complejo de personalidad.`,
        priority: 'high'
      })
    }
  })
  
  // Alerta por puntuaciones elevadas en múltiples clusters
  const clustersWithHighScores = Object.keys(groupAlerts).filter(g => groupAlerts[g] > 0).length
  if (clustersWithHighScores >= 2) {
    alerts.push({
      type: 'warning',
      title: '⚠️ Patrones Mixtos de Personalidad',
      message: `Indicadores significativos en ${clustersWithHighScores} clusters diferentes. Requiere evaluación integral multidimensional.`,
      priority: 'high'
    })
  }
  
  // Alerta por paranoia significativa
  if (disorderScores.paranoide && disorderScores.paranoide.score >= 4) {
    alerts.push({
      type: 'warning',
      title: '⚠️ Rasgos Paranoides Significativos',
      message: 'Puntuación elevada en trastorno paranoide. Considerar impacto en alianza terapéutica y adherencia al tratamiento.',
      priority: 'high'
    })
  }
  
  return alerts
}

export const getSalamancaHighScoreItems = (responses = {}) => {
  const highItems = []
  const threshold = 2 // Puntuaciones altas (≥2: Con frecuencia o Siempre)
  
  salamancaQuestions.forEach(question => {
    const response = responses[question.id]
    if (response !== undefined && response >= threshold) {
      // Encontrar a qué trastorno pertenece este ítem
      let relatedDisorders = []
      Object.entries(salamancaDisorders).forEach(([key, disorder]) => {
        if (disorder.items.includes(question.id)) {
          relatedDisorders.push(disorder.name)
        }
      })
      
      highItems.push({
        number: question.id,
        text: question.text,
        score: response,
        maxScore: 3,
        responseText: salamancaOptions[response].text,
        relatedDisorders: relatedDisorders.join(', ')
      })
    }
  })
  
  return highItems
}

// Configuración completa de la escala
export const salamancaConfig = {
  id: 'salamanca',
  name: 'Salamanca',
  fullName: 'Cuestionario Salamanca de Trastornos de la Personalidad',
  description: 'Evaluación dimensional de trastornos de personalidad según DSM-IV. Incluye 11 trastornos agrupados en 3 clusters con 22 ítems de respuesta gradual.',
  applicationType: 'Autoaplicada',
  questions: salamancaQuestions,
  options: salamancaOptions,
  maxScore: 66, // 22 items × 3 puntos max
  scoreRange: 'Por trastorno: 0-6 puntos, Punto de corte: ≥2',
  instructions: [
    'Este es un cuestionario de screening para la evaluación de los trastornos de la personalidad',
    'Conteste según sea su manera de ser habitual y no según se encuentre en un momento dado',
    'Para cada pregunta, seleccione la opción que mejor lo describa:',
    '• Falso: Si la afirmación NO aplica para nada a usted',
    '• A veces: Si es verdadero pero solo ocasionalmente',
    '• Con frecuencia: Si es verdadero y ocurre a menudo',
    '• Siempre: Si es verdadero y ocurre constantemente',
    'Responda según sus patrones habituales de comportamiento, no según se sienta hoy específicamente'
  ],
  timeEstimate: '8-12 minutos',
  calculateScore: calculateSalamancaScore,
  getInterpretation: getSalamancaDetailedInterpretation,
  checkAlerts: checkSalamancaClinicalAlerts,
  visualOptions: true,
  factors: {
    clusterA: { 
      name: 'Cluster A - Raros/Excéntricos', 
      disorders: ['Paranoide', 'Esquizoide', 'Esquizotípico']
    },
    clusterB: { 
      name: 'Cluster B - Dramáticos/Emocionales', 
      disorders: ['Histriónico', 'Antisocial', 'Narcisista', 'Inestabilidad Emocional (Impulsivo)', 'Inestabilidad Emocional (Límite)']
    },
    clusterC: { 
      name: 'Cluster C - Ansiosos/Temerosos', 
      disorders: ['Anancástico', 'Dependiente', 'Ansioso']
    }
  }
}

// Datos para el catálogo de escalas
export const salamancaScaleData = {
  id: 'salamanca',
  fullName: 'Cuestionario Salamanca de Trastornos de la Personalidad',
  shortName: 'Salamanca',
  description: 'Screening dimensional para 11 trastornos de personalidad del DSM-IV organizados en 3 clusters. Validado contra IPDE con alta sensibilidad (94.34%).',
  questions: 22,
  duration: '8-12',
  applicationType: 'Autoaplicada',
  ageRange: 'Adultos',
  diagnostics: ['Trastornos de Personalidad', 'Screening Personalidad', 'DSM-IV'],
  tags: ['Personalidad', 'Salamanca', 'Clusters', 'DSM-IV', 'Screening', 'Dimensional'],
  available: true,
  icon: 'picklist-type-svgrepo-com',
  color: '#9f7aea'
}

// Información de ayuda
export const salamancaHelpInfo = {
  purpose: "El Cuestionario Salamanca evalúa de forma dimensional 11 trastornos de personalidad del DSM-IV mediante 22 ítems con respuesta gradual, organizados en 3 clusters (A: Raros/Excéntricos, B: Dramáticos/Emocionales, C: Ansiosos/Temerosos).",
  scoring: {
    method: "22 ítems con 4 opciones (0-3 puntos), 2 ítems por trastorno, punto de corte ≥2 por trastorno",
    ranges: [
      { range: "0-1", severity: "Sin indicadores", color: "#48bb78" },
      { range: "2-3", severity: "Supera punto de corte", color: "#f6ad55" },
      { range: "4-6", severity: "Indicadores severos", color: "#f56565" }
    ]
  },
  clinical_considerations: [
    "Herramienta de screening validada contra IPDE con sensibilidad del 94.34%",
    "Punto de corte ≥2 por trastorno sugiere necesidad de evaluación más detallada",
    "Evalúa patrones habituales de comportamiento, no estados temporales",
    "Incluye 11 trastornos: 3 en Cluster A, 5 en Cluster B, 3 en Cluster C",
    "Útil para identificar áreas que requieren evaluación clínica profunda",
    "NO constituye diagnóstico definitivo, requiere confirmación clínica",
    "Especialmente útil para detectar comorbilidad entre trastornos de personalidad"
  ],
  limitations: [
    "Es una herramienta de screening, no un diagnóstico definitivo",
    "Basado en criterios DSM-IV (considerar actualizaciones DSM-5)",
    "Requiere honestidad y autoconocimiento del evaluado",
    "Debe complementarse con entrevista clínica estructurada",
    "No evalúa severidad funcional específica",
    "Puede dar falsos positivos en situaciones de estrés agudo"
  ],
  references: "Cuestionario Salamanca (2007). Universidad de Salamanca. Validación contra IPDE."
}