// IPDE - Examen Internacional de los Trastornos de Personalidad
// Evaluación de rasgos de trastornos de personalidad en adultos (≥18 años)

// Configuración de clusters y códigos CIE-10
export const ipdeClusterAItems = {
  'Paranoide': { items: [2, 14, 22, 24, 27, 36, 52], code: 'F60.0' },
  'Esquizoide': { items: [1, 8, 12, 21, 31, 46, 55, 57, 58], code: 'F60.1' }
}

export const ipdeClusterBItems = {
  'Disocial': { items: [11, 18, 20, 29, 38, 47, 51], code: 'F60.2' },
  'Impulsivo': { items: [19, 30, 37, 53, 56], code: 'F60.30' },
  'Límite': { items: [4, 9, 13, 25, 40], code: 'F60.31' },
  'Histriónico': { items: [5, 17, 26, 28, 35, 44], code: 'F60.4' }
}

export const ipdeClusterCItems = {
  'Anancástico': { items: [3, 10, 23, 32, 41, 48, 54, 59], code: 'F60.5' },
  'Ansioso': { items: [7, 16, 34, 39, 43, 50], code: 'F60.6' },
  'Dependiente': { items: [6, 15, 33, 42, 45, 49], code: 'F60.7' }
}

// Todas las dimensiones combinadas
export const ipdeAllDisorders = {
  ...ipdeClusterAItems,
  ...ipdeClusterBItems,
  ...ipdeClusterCItems
}

// Respuestas "correctas" (respuestas que NO indican el trastorno)
export const ipdeCorrectAnswers = {
  1: 'V', 2: 'V', 3: 'F', 4: 'F', 5: 'V', 6: 'F', 7: 'V', 8: 'F', 9: 'F', 10: 'V',
  11: 'V', 12: 'F', 13: 'F', 14: 'V', 15: 'F', 16: 'F', 17: 'V', 18: 'V', 19: 'F', 20: 'F',
  21: 'V', 22: 'F', 23: 'V', 24: 'F', 25: 'V', 26: 'V', 27: 'V', 28: 'F', 29: 'F', 30: 'F',
  31: 'V', 32: 'V', 33: 'F', 34: 'F', 35: 'F', 36: 'F', 37: 'F', 38: 'V', 39: 'F', 40: 'F',
  41: 'V', 42: 'F', 43: 'V', 44: 'F', 45: 'F', 46: 'F', 47: 'F', 48: 'F', 49: 'V', 50: 'F',
  51: 'F', 52: 'F', 53: 'F', 54: 'F', 55: 'F', 56: 'F', 57: 'F', 58: 'F', 59: 'V'
}

// Preguntas del IPDE (59 ítems con respuestas Verdadero/Falso)
export const ipdeQuestions = [
  {
    id: 1,
    text: "Normalmente me divierto y disfruto de la vida",
    correctAnswer: 'V'
  },
  {
    id: 2,
    text: "No reacciono bien cuando alguien me ofende",
    correctAnswer: 'V'
  },
  {
    id: 3,
    text: "No soy minucioso con los pequeños detalles",
    correctAnswer: 'F'
  },
  {
    id: 4,
    text: "No puedo decidir qué tipo de persona quiero ser",
    correctAnswer: 'F'
  },
  {
    id: 5,
    text: "Muestro mis sentimientos a todo el mundo",
    correctAnswer: 'V'
  },
  {
    id: 6,
    text: "Dejo que los demás tomen decisiones importantes por mí",
    correctAnswer: 'F'
  },
  {
    id: 7,
    text: "Habitualmente me siento tenso o nervioso",
    correctAnswer: 'V'
  },
  {
    id: 8,
    text: "Casi nunca me enfado con nada",
    correctAnswer: 'F'
  },
  {
    id: 9,
    text: "Hago lo que sea necesario para que la gente no me abandone",
    correctAnswer: 'F'
  },
  {
    id: 10,
    text: "Soy una persona muy precavida",
    correctAnswer: 'V'
  },
  {
    id: 11,
    text: "Nunca me han detenido",
    correctAnswer: 'V'
  },
  {
    id: 12,
    text: "La gente cree que soy frío y distante",
    correctAnswer: 'F'
  },
  {
    id: 13,
    text: "Me meto en relaciones muy intensas, pero poco duraderas",
    correctAnswer: 'F'
  },
  {
    id: 14,
    text: "La mayoría de la gente es justa y honesta conmigo",
    correctAnswer: 'V'
  },
  {
    id: 15,
    text: "Me cuesta discrepar de las personas de quienes dependo mucho",
    correctAnswer: 'F'
  },
  {
    id: 16,
    text: "Me siento molesto o fuera de lugar en situaciones sociales",
    correctAnswer: 'F'
  },
  {
    id: 17,
    text: "Me siento fácilmente influido por lo que me rodea",
    correctAnswer: 'V'
  },
  {
    id: 18,
    text: "Normalmente me siento mal cuando hago daño o trato mal a alguien",
    correctAnswer: 'V'
  },
  {
    id: 19,
    text: "Discuto o me peleo con la gente cuando tratan de impedirme que haga lo que quiero",
    correctAnswer: 'F'
  },
  {
    id: 20,
    text: "A veces he rechazado un trabajo, incluso si estaba esperándolo",
    correctAnswer: 'F'
  },
  {
    id: 21,
    text: "Cuando me alaban o critican, no manifiesto mi reacción a los demás",
    correctAnswer: 'V'
  },
  {
    id: 22,
    text: "No he perdonado los agravios de otros durante años",
    correctAnswer: 'F'
  },
  {
    id: 23,
    text: "Paso demasiado tiempo tratando de hacer las cosas perfectamente",
    correctAnswer: 'V'
  },
  {
    id: 24,
    text: "A menudo la gente se ríe de mí a mis espaldas",
    correctAnswer: 'F'
  },
  {
    id: 25,
    text: "Nunca me he autolesionado a propósito, ni he amenazado con suicidarme",
    correctAnswer: 'V'
  },
  {
    id: 26,
    text: "Mis sentimientos son como el tiempo: siempre están cambiando",
    correctAnswer: 'V'
  },
  {
    id: 27,
    text: "Lucho por mis derechos aunque moleste a la gente",
    correctAnswer: 'V'
  },
  {
    id: 28,
    text: "Me gusta vestirme para destacar entre la gente",
    correctAnswer: 'F'
  },
  {
    id: 29,
    text: "Mentiría o haría trampas para lograr mis propósitos",
    correctAnswer: 'F'
  },
  {
    id: 30,
    text: "No mantengo un plan si no obtengo resultados inmediatamente",
    correctAnswer: 'F'
  },
  {
    id: 31,
    text: "Tengo poco o ningún deseo de mantener relaciones sexuales",
    correctAnswer: 'V'
  },
  {
    id: 32,
    text: "La gente cree que soy demasiado estricto con las normas y reglas",
    correctAnswer: 'V'
  },
  {
    id: 33,
    text: "Generalmente me siento incómodo o desvalido si estoy solo",
    correctAnswer: 'F'
  },
  {
    id: 34,
    text: "No me gusta relacionarme con la gente hasta que no estoy seguro de que les gusto",
    correctAnswer: 'F'
  },
  {
    id: 35,
    text: "No me gusta ser el centro de atención",
    correctAnswer: 'F'
  },
  {
    id: 36,
    text: "Creo que mi cónyuge (amante) me puede ser infiel",
    correctAnswer: 'F'
  },
  {
    id: 37,
    text: "A veces me enfado tanto que rompo o tiro cosas",
    correctAnswer: 'F'
  },
  {
    id: 38,
    text: "He tenido amistades íntimas que duraron mucho tiempo",
    correctAnswer: 'V'
  },
  {
    id: 39,
    text: "Me preocupa mucho no gustar a la gente",
    correctAnswer: 'F'
  },
  {
    id: 40,
    text: "A menudo me siento «vacío» por dentro",
    correctAnswer: 'F'
  },
  {
    id: 41,
    text: "Trabajo tanto que no tengo tiempo para nada más",
    correctAnswer: 'V'
  },
  {
    id: 42,
    text: "Me da miedo que me dejen solo y tener que cuidar de mí mismo",
    correctAnswer: 'F'
  },
  {
    id: 43,
    text: "Muchas cosas me parecen peligrosas, y no a la mayoría de la gente",
    correctAnswer: 'V'
  },
  {
    id: 44,
    text: "Tengo fama de que me gusta «flirtear»",
    correctAnswer: 'F'
  },
  {
    id: 45,
    text: "No pido favores a la gente de la que dependo mucho",
    correctAnswer: 'F'
  },
  {
    id: 46,
    text: "Prefiero las actividades que puedo hacer por mí mismo",
    correctAnswer: 'F'
  },
  {
    id: 47,
    text: "Pierdo los estribos y me meto en peleas",
    correctAnswer: 'F'
  },
  {
    id: 48,
    text: "La gente piensa que soy demasiado inflexible o formal",
    correctAnswer: 'F'
  },
  {
    id: 49,
    text: "Con frecuencia busco consejos o recomendaciones sobre decisiones de la vida cotidiana",
    correctAnswer: 'V'
  },
  {
    id: 50,
    text: "Me guardo las cosas para mí, incluso cuando estoy con gente",
    correctAnswer: 'F'
  },
  {
    id: 51,
    text: "Para mí es difícil estar sin problemas",
    correctAnswer: 'F'
  },
  {
    id: 52,
    text: "Estoy convencido de que existe una conspiración tras muchas cosas que pasan en el mundo",
    correctAnswer: 'F'
  },
  {
    id: 53,
    text: "Soy muy emocional y caprichoso",
    correctAnswer: 'F'
  },
  {
    id: 54,
    text: "Me resulta difícil acostumbrarme a hacer cosas nuevas",
    correctAnswer: 'F'
  },
  {
    id: 55,
    text: "La mayoría de la gente piensa que soy una persona extraña",
    correctAnswer: 'F'
  },
  {
    id: 56,
    text: "Me arriesgo y hago cosas temerarias",
    correctAnswer: 'F'
  },
  {
    id: 57,
    text: "Todo el mundo necesita uno o dos amigos para ser feliz",
    correctAnswer: 'F'
  },
  {
    id: 58,
    text: "Estoy más interesado en mis pensamientos que en lo que pasa fuera",
    correctAnswer: 'F'
  },
  {
    id: 59,
    text: "Normalmente trato que la gente haga las cosas a mi manera",
    correctAnswer: 'V'
  }
]

// Opciones de respuesta (Verdadero/Falso)
export const ipdeOptions = [
  { 
    text: "Verdadero", 
    value: "V",
    emoji: "✅", 
    color: "linear-gradient(135deg, #29A98C, #112F33)",
    textColor: "white"
  },
  { 
    text: "Falso", 
    value: "F",
    emoji: "❌", 
    color: "linear-gradient(135deg, #EC7367, #112F33)",
    textColor: "white"
  }
]

export const calculateIpdeScore = (responses = {}) => {
  const clusterScores = {
    clusterA: {},
    clusterB: {},
    clusterC: {}
  }
  
  const disorderScores = {}
  const alerts = []
  
  // Calcular puntuaciones por trastorno
  Object.entries(ipdeAllDisorders).forEach(([disorderName, config]) => {
    let score = 0
    
    // Contar respuestas que NO coinciden con las "correctas" (indican presencia del trastorno)
    config.items.forEach(itemId => {
      const response = responses[itemId]
      const correctAnswer = ipdeCorrectAnswers[itemId]
      
      if (response && response !== correctAnswer) {
        score++
      }
    })
    
    const percentage = (score / config.items.length) * 100
    
    disorderScores[disorderName] = {
      score,
      total: config.items.length,
      percentage,
      code: config.code
    }
    
    // Determinar cluster
    let cluster = ''
    if (ipdeClusterAItems[disorderName]) cluster = 'clusterA'
    else if (ipdeClusterBItems[disorderName]) cluster = 'clusterB'
    else if (ipdeClusterCItems[disorderName]) cluster = 'clusterC'
    
    clusterScores[cluster][disorderName] = disorderScores[disorderName]
    
    // Alertas para puntuaciones altas (≥66% del máximo)
    if (percentage >= 66) {
      alerts.push({
        disorder: disorderName,
        score,
        total: config.items.length,
        percentage,
        code: config.code
      })
    }
  })
  
  return {
    disorderScores,
    clusterScores,
    alerts,
    completedQuestions: Object.keys(responses).length,
    totalQuestions: 59
  }
}

export const getIpdeInterpretation = (percentage) => {
  if (percentage >= 80) {
    return {
      level: 'Muy Alto',
      description: 'Puntuación muy elevada que sugiere presencia significativa de rasgos del trastorno.',
      color: '#f56565',
      className: 'severity-very-high'
    }
  } else if (percentage >= 60) {
    return {
      level: 'Alto', 
      description: 'Puntuación elevada que sugiere presencia notable de rasgos del trastorno.',
      color: '#f6ad55',
      className: 'severity-high'
    }
  } else if (percentage >= 40) {
    return {
      level: 'Moderado',
      description: 'Puntuación moderada con algunos rasgos presentes.',
      color: '#fbbf24',
      className: 'severity-moderate'
    }
  } else {
    return {
      level: 'Bajo',
      description: 'Puntuación baja con rasgos mínimos o ausentes.',
      color: '#48bb78',
      className: 'severity-low'
    }
  }
}

export const getIpdeDetailedInterpretation = (result) => {
  const { disorderScores, alerts } = result
  
  let interpretation = ''
  let recommendations = []
  
  if (alerts.length > 0) {
    interpretation = `Se detectaron puntuaciones elevadas (≥66%) en ${alerts.length} trastorno(s) de personalidad que requieren evaluación clínica especializada. Los siguientes trastornos presentan rasgos significativos: ${alerts.map(a => a.disorder).join(', ')}.`
    
    recommendations = [
      'Evaluación clínica especializada para trastornos con puntuaciones elevadas',
      'Considerar entrevista diagnóstica estructurada (IPDE completo) para confirmación',
      'Evaluar impacto funcional y necesidad de intervención terapéutica',
      'Descartar influencia de trastornos del Eje I (sesgo de estado)',
      'Evaluación longitudinal para confirmar estabilidad de los rasgos'
    ]
  } else {
    interpretation = 'Los resultados sugieren un perfil de personalidad dentro de parámetros normales. No se detectaron puntuaciones elevadas significativas en ningún trastorno de personalidad según los criterios de screening del IPDE.'
    
    recommendations = [
      'Perfil de personalidad dentro de rangos normales',
      'Seguimiento rutinario según criterio clínico',
      'Mantener observación en caso de cambios significativos',
      'Considerar factores de estrés actuales que puedan influir en las respuestas'
    ]
  }
  
  return {
    level: alerts.length > 0 ? `${alerts.length} Trastorno(s) Elevado(s)` : 'Perfil Normal',
    title: alerts.length > 0 ? 'Screening Positivo' : 'Screening Negativo',
    description: interpretation,
    recommendations: recommendations.join('; '),
    color: alerts.length > 0 ? '#f6ad55' : '#48bb78',
    className: alerts.length > 0 ? 'severity-high' : 'severity-normal'
  }
}

export const checkIpdeClinicalAlerts = (responses = {}, result = {}) => {
  const alerts = []
  const { disorderScores } = result
  
  // Alerta crítica por múltiples trastornos elevados
  const highScoreDisorders = Object.entries(disorderScores).filter(([name, data]) => data.percentage >= 66)
  
  if (highScoreDisorders.length >= 3) {
    alerts.push({
      type: 'critical',
      title: '🚨 MÚLTIPLES TRASTORNOS ELEVADOS',
      message: `Se detectaron ${highScoreDisorders.length} trastornos con puntuaciones ≥66%. Requiere evaluación psiquiátrica especializada urgente.`,
      priority: 'urgent'
    })
  } else if (highScoreDisorders.length >= 1) {
    alerts.push({
      type: 'warning',
      title: '⚠️ Trastornos de Personalidad Elevados',
      message: `Se detectaron ${highScoreDisorders.length} trastorno(s) con puntuaciones elevadas. Requiere evaluación clínica especializada.`,
      priority: 'high'
    })
  }
  
  // Alerta específica por Trastorno Límite (riesgo suicida)
  if (disorderScores['Límite'] && disorderScores['Límite'].percentage >= 60) {
    // Verificar respuestas específicas de autolesión
    if (responses[25] === 'F') { // "Nunca me he autolesionado a propósito, ni he amenazado con suicidarme" = Falso
      alerts.push({
        type: 'critical',
        title: '🚨 RIESGO DE AUTOLESIÓN/SUICIDIO',
        message: 'Puntuación elevada en Trastorno Límite con antecedentes de autolesión. Evaluación de riesgo suicida inmediata necesaria.',
        priority: 'urgent'
      })
    }
  }
  
  // Alerta por Trastorno Antisocial/Disocial
  if (disorderScores['Disocial'] && disorderScores['Disocial'].percentage >= 70) {
    alerts.push({
      type: 'warning',
      title: '⚠️ Rasgos Antisociales Significativos',
      message: 'Puntuación muy elevada en Trastorno Disocial. Evaluar antecedentes legales y riesgo de conducta antisocial.',
      priority: 'high'
    })
  }
  
  // Alerta por múltiples clusters afectados
  const clustersWithElevated = ['clusterA', 'clusterB', 'clusterC'].filter(cluster => {
    return Object.values(result.clusterScores[cluster] || {}).some(disorder => disorder.percentage >= 60)
  })
  
  if (clustersWithElevated.length >= 2) {
    alerts.push({
      type: 'warning',
      title: '⚠️ Múltiples Clusters Afectados',
      message: `Se detectaron rasgos elevados en ${clustersWithElevated.length} clusters diferentes. Sugiere comorbilidad compleja de personalidad.`,
      priority: 'medium'
    })
  }
  
  return alerts
}

export const getIpdeHighScoreItems = (responses = {}) => {
  const highItems = []
  
  Object.entries(responses).forEach(([questionId, response]) => {
    const correctAnswer = ipdeCorrectAnswers[parseInt(questionId)]
    
    // Si la respuesta NO coincide con la "correcta", indica presencia del rasgo
    if (response && response !== correctAnswer) {
      const question = ipdeQuestions.find(q => q.id === parseInt(questionId))
      if (question) {
        highItems.push({
          number: parseInt(questionId),
          text: question.text,
          response: response,
          correctAnswer: correctAnswer,
          indicatesDisorder: true
        })
      }
    }
  })
  
  return highItems
}

// Configuración completa de la escala
export const ipdeConfig = {
  id: 'ipde',
  name: 'IPDE',
  fullName: 'Examen Internacional de los Trastornos de Personalidad',
  description: 'Screening para detectar rasgos de trastornos de personalidad en adultos. Evalúa 9 trastornos organizados en 3 clusters (A: Excéntrico, B: Dramático, C: Ansioso) basándose en criterios CIE-10.',
  applicationType: 'Autoaplicada',
  questions: ipdeQuestions,
  options: ipdeOptions,
  maxScore: 59, // Puntuación máxima teórica (si todas las respuestas indican trastorno)
  scoreRange: 'Por trastorno: 0-9 ítems, Clusters: A (0-16), B (0-22), C (0-21)',
  instructions: [
    'La intención de este cuestionario es conocer qué tipo de persona ha sido usted durante los últimos 5 años',
    'Por favor no omita ningún ítem. Si no está seguro, seleccione la respuesta que le parezca más correcta',
    'No hay límite de tiempo, pero no pierda mucho tiempo pensando la respuesta correcta',
    'Cuando la respuesta sea verdadero, seleccione "Verdadero". Cuando sea falso, seleccione "Falso"',
    'Piense en cómo ha sido habitualmente, no en estados temporales o situaciones específicas',
    'Este es un cuestionario de screening inicial que requiere confirmación clínica'
  ],
  timeEstimate: '15-25 minutos',
  calculateScore: calculateIpdeScore,
  getInterpretation: getIpdeDetailedInterpretation,
  checkAlerts: checkIpdeClinicalAlerts,
  factors: {
    clusterA: { 
      name: 'Cluster A - Excéntrico/Psicótico', 
      maxScore: 16, 
      disorders: ['Paranoide', 'Esquizoide'] 
    },
    clusterB: { 
      name: 'Cluster B - Dramático/Emocional', 
      maxScore: 22, 
      disorders: ['Disocial', 'Impulsivo', 'Límite', 'Histriónico'] 
    },
    clusterC: { 
      name: 'Cluster C - Ansioso/Temeroso', 
      maxScore: 21, 
      disorders: ['Anancástico', 'Ansioso', 'Dependiente'] 
    }
  },
  visualOptions: true // Usar opciones con colores y emojis
}

// Datos para el catálogo de escalas
export const ipdeScaleData = {
  id: 'ipde',
  fullName: 'Examen Internacional de los Trastornos de Personalidad',
  shortName: 'IPDE',
  description: 'Screening de trastornos de personalidad en adultos. Evalúa 9 trastornos en 3 clusters con 59 ítems Verdadero/Falso basándose en criterios CIE-10.',
  questions: 59,
  duration: '15-25',
  applicationType: 'Autoaplicada',
  ageRange: 'Adultos (≥18 años)',
  diagnostics: ['Trastornos de Personalidad', 'Cluster A', 'Cluster B', 'Cluster C', 'Screening Personalidad'],
  tags: ['Personalidad', 'IPDE', 'Adultos', 'CIE-10', 'Screening', 'Clusters', 'Trastornos'],
  available: true,
  icon: 'picklist-type-svgrepo-com',
  color: '#8b5cf6'
}

// Información de ayuda
export const ipdeHelpInfo = {
  purpose: "El IPDE evalúa rasgos de 9 trastornos de personalidad en adultos mediante 59 ítems Verdadero/Falso, organizados en 3 clusters según criterios CIE-10. Es una herramienta de screening inicial que requiere confirmación diagnóstica.",
  scoring: {
    method: "59 ítems Verdadero/Falso, scoring inverso donde respuestas que NO coinciden con las 'correctas' indican presencia del trastorno",
    ranges: [
      { range: "0-39%", severity: "Rasgos mínimos", color: "#48bb78" },
      { range: "40-59%", severity: "Rasgos moderados", color: "#fbbf24" },
      { range: "60-79%", severity: "Rasgos altos", color: "#f6ad55" },
      { range: "80-100%", severity: "Rasgos muy altos", color: "#f56565" }
    ]
  },
  clinical_considerations: [
    "Diseñado específicamente para adultos ≥18 años (personalidad ya establecida)",
    "Evalúa patrones estables de los últimos 5 años, no estados temporales",
    "Punto de corte estándar: ≥3 respuestas no coincidentes por trastorno",
    "Organizado en 3 clusters: A (Excéntrico), B (Dramático), C (Ansioso)",
    "Incluye 9 trastornos específicos con códigos CIE-10",
    "Herramienta de screening que requiere confirmación con entrevista clínica",
    "Detecta comorbilidad entre trastornos de personalidad",
    "Alertas especiales para riesgo suicida y conducta antisocial"
  ],
  limitations: [
    "Es un screening inicial, no un diagnóstico definitivo",
    "Puede estar influenciado por trastornos del Eje I actuales (sesgo de estado)",
    "Requiere confirmación con entrevista clínica estructurada (IPDE completo)",
    "No evalúa la severidad o impacto funcional específico",
    "Puede dar falsos positivos en situaciones de estrés agudo",
    "Requiere honestidad y autoconocimiento del evaluado",
    "No diferencia entre rasgos adaptativos y patológicos sin contexto clínico"
  ],
  references: "Loranger, A.W. (1999). International Personality Disorder Examination (IPDE). Organización Mundial de la Salud. Manual CIE-10 para Trastornos de Personalidad."
}