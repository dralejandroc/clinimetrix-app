// AQ-Child - Cociente de TEA Niño (Autism Spectrum Quotient for Children)
// Evaluación de rasgos del espectro autista en niños de 4-11 años mediante reporte parental

// Definición de subescalas según la literatura AQ-Child
export const socialItems = [1, 11, 13, 15, 22, 36, 44, 45, 47, 48] // 10 items - Habilidades sociales
export const communicationItems = [7, 17, 18, 26, 27, 31, 33, 35, 38, 39] // 10 items - Comunicación
export const imaginationItems = [3, 8, 14, 20, 21, 24, 40, 42, 50] // 9 items - Imaginación
export const attentionDetailItems = [5, 6, 9, 12, 19, 23, 28, 29, 30, 41, 49] // 11 items - Atención al detalle
export const attentionSwitchingItems = [2, 4, 10, 16, 25, 32, 34, 37, 43, 46] // 10 items - Cambios de atención

// Preguntas del AQ-Child (50 ítems con 4 opciones cada una)
export const aqChildQuestions = [
  {
    id: 1,
    text: "Prefiere hacer cosas con otros a hacerlas solo/a.",
    subscale: "social",
    reverse: false
  },
  {
    id: 2,
    text: "Prefiere hacer las cosas de una misma manera una y otra vez.",
    subscale: "attention_switching",
    reverse: true
  },
  {
    id: 3,
    text: "Cuando trata de imaginarse algo, le parece muy fácil crear la imagen en su cabeza.",
    subscale: "imagination",
    reverse: false
  },
  {
    id: 4,
    text: "Con frecuencia queda tan absorto/a (Concentrado) en una actividad que parece no darse cuenta de las cosas que suceden a su alrededor.",
    subscale: "attention_switching",
    reverse: true
  },
  {
    id: 5,
    text: "Usualmente puede oír débiles sonidos que otros no.",
    subscale: "attention_detail",
    reverse: true
  },
  {
    id: 6,
    text: "A menudo le llaman la atención los números de las casas, matrículas de coches, números impresos en carteles o información similar.",
    subscale: "attention_detail",
    reverse: true
  },
  {
    id: 7,
    text: "Tiene dificultad en comprender las reglas de la conducta cortés.",
    subscale: "communication",
    reverse: true
  },
  {
    id: 8,
    text: "Cuando lee un cuento, le resulta fácil imaginarse cómo son los personajes.",
    subscale: "imagination",
    reverse: false
  },
  {
    id: 9,
    text: "Le fascinan las fechas.",
    subscale: "attention_detail",
    reverse: true
  },
  {
    id: 10,
    text: "Cuando está con otras personas, puede seguir varias conversaciones de distintas personas.",
    subscale: "attention_switching",
    reverse: false
  },
  {
    id: 11,
    text: "Se desenvuelve con facilidad en distintas situaciones sociales.",
    subscale: "social",
    reverse: false
  },
  {
    id: 12,
    text: "Suele fijarse en detalles que a otros no les llaman la atención.",
    subscale: "attention_detail",
    reverse: true
  },
  {
    id: 13,
    text: "Se sentiría más a gusto en una biblioteca que en una fiesta de cumpleaños.",
    subscale: "social",
    reverse: true
  },
  {
    id: 14,
    text: "Inventa historias con facilidad.",
    subscale: "imagination",
    reverse: false
  },
  {
    id: 15,
    text: "Le interesan más las personas que las cosas.",
    subscale: "social",
    reverse: false
  },
  {
    id: 16,
    text: "Algunas cosas le interesan mucho y se molesta si no puede dedicarles tiempo.",
    subscale: "attention_switching",
    reverse: true
  },
  {
    id: 17,
    text: "Le gusta la charlar de manera social.",
    subscale: "communication",
    reverse: false
  },
  {
    id: 18,
    text: "Cuando habla no siempre es fácil para los demás meterse en la conversación.",
    subscale: "communication",
    reverse: true
  },
  {
    id: 19,
    text: "Le fascinan los números.",
    subscale: "attention_detail",
    reverse: true
  },
  {
    id: 20,
    text: "Cuando lee un cuento le cuesta identificar las intenciones o sentimientos de los personajes.",
    subscale: "imagination",
    reverse: true
  },
  {
    id: 21,
    text: "No le gustan los cuentos de historias de ficción.",
    subscale: "imagination",
    reverse: true
  },
  {
    id: 22,
    text: "Le cuesta hacer nuevos amigos.",
    subscale: "social",
    reverse: true
  },
  {
    id: 23,
    text: "Siempre está encontrando patrones o regularidades en las cosas.",
    subscale: "attention_detail",
    reverse: true
  },
  {
    id: 24,
    text: "Le gusta más ir al cine que a un museo.",
    subscale: "imagination",
    reverse: false
  },
  {
    id: 25,
    text: "No se altera cuando se le cambia su rutina diaria.",
    subscale: "attention_switching",
    reverse: false
  },
  {
    id: 26,
    text: "No sabe como hacer para conversar con niños de su edad.",
    subscale: "communication",
    reverse: true
  },
  {
    id: 27,
    text: "No le cuesta \"leer entre líneas\" cuando otras personas le dicen algo.",
    subscale: "communication",
    reverse: false
  },
  {
    id: 28,
    text: "Cuando mira un dibujo, un cuadro, o una fotografía, presta más atención a la imagen completa que a los detalles.",
    subscale: "attention_detail",
    reverse: false
  },
  {
    id: 29,
    text: "No se le da bien memorizar números de teléfono.",
    subscale: "attention_detail",
    reverse: false
  },
  {
    id: 30,
    text: "No suele darse cuenta de pequeños cambios en la situación de objetos o en la apariencia de las personas.",
    subscale: "attention_detail",
    reverse: false
  },
  {
    id: 31,
    text: "Cuando habla, se da cuenta cuando la gente se aburre con lo que dice.",
    subscale: "communication",
    reverse: false
  },
  {
    id: 32,
    text: "Le es fácil hacer más de una cosa a la vez.",
    subscale: "attention_switching",
    reverse: false
  },
  {
    id: 33,
    text: "Cuando habla por teléfono no sabe cuando es su turno para hablar.",
    subscale: "communication",
    reverse: true
  },
  {
    id: 34,
    text: "Le gusta hacer cosas de manera espontánea.",
    subscale: "attention_switching",
    reverse: false
  },
  {
    id: 35,
    text: "Es el/la último/a en entender un chiste o una broma.",
    subscale: "communication",
    reverse: true
  },
  {
    id: 36,
    text: "Se da cuenta fácilmente de lo que piensa o siente una persona sólo con mirarla a la cara.",
    subscale: "social",
    reverse: false
  },
  {
    id: 37,
    text: "Cuando hay alguna interrupción, puede volver facilidad a lo que estaba haciendo.",
    subscale: "attention_switching",
    reverse: false
  },
  {
    id: 38,
    text: "Es bueno para las conversaciones sociales.",
    subscale: "communication",
    reverse: false
  },
  {
    id: 39,
    text: "La gente dice que él/ella siempre habla del mismo tema.",
    subscale: "communication",
    reverse: true
  },
  {
    id: 40,
    text: "Cuando estaba en preescolar le gustaba jugar a juegos de simulación con otros niños (por ejemplo: vaqueros, mamá y papá,...).",
    subscale: "imagination",
    reverse: false
  },
  {
    id: 41,
    text: "Le gusta juntar información sobre categorías de cosas (autos, trenes, aviones, plantas, animales, etc.).",
    subscale: "attention_detail",
    reverse: true
  },
  {
    id: 42,
    text: "Le cuesta imaginarse como sería ser otra persona.",
    subscale: "imagination",
    reverse: true
  },
  {
    id: 43,
    text: "Le gusta planificar cuidadosamente cualquier actividad en la que vaya a participar.",
    subscale: "attention_switching",
    reverse: true
  },
  {
    id: 44,
    text: "Disfruta de situaciones o eventos sociales.",
    subscale: "social",
    reverse: false
  },
  {
    id: 45,
    text: "Le es difícil darse cuenta de las intenciones de las otras personas.",
    subscale: "social",
    reverse: true
  },
  {
    id: 46,
    text: "Las situaciones nuevas le generan ansiedad.",
    subscale: "attention_switching",
    reverse: true
  },
  {
    id: 47,
    text: "Disfruta conociendo gente nueva.",
    subscale: "social",
    reverse: false
  },
  {
    id: 48,
    text: "Va con cuidado para no herir los sentimientos de la gente.",
    subscale: "social",
    reverse: false
  },
  {
    id: 49,
    text: "No se le da bien recordar las fechas de cumpleaños.",
    subscale: "attention_detail",
    reverse: false
  },
  {
    id: 50,
    text: "Le resulta fácil jugar con otros niños haciendose pasar por personajes.",
    subscale: "imagination",
    reverse: false
  }
]

// Opciones de respuesta con emojis y colores
export const aqChildOptions = [
  { 
    text: "Muy de acuerdo", 
    value: 0, 
    emoji: "✅", 
    color: "linear-gradient(135deg, #48bb78, #38a169)", // Verde intenso
    textColor: "white"
  },
  { 
    text: "Medianamente de acuerdo", 
    value: 1, 
    emoji: "☑️", 
    color: "linear-gradient(135deg, #68d391, #48bb78)", // Verde claro
    textColor: "white"
  },
  { 
    text: "Medianamente en desacuerdo", 
    value: 2, 
    emoji: "🤔", 
    color: "linear-gradient(135deg, #fc8181, #f56565)", // Rojo claro
    textColor: "white"
  },
  { 
    text: "Muy en desacuerdo", 
    value: 3, 
    emoji: "❌", 
    color: "linear-gradient(135deg, #f56565, #e53e3e)", // Rojo intenso
    textColor: "white"
  }
]

export const calculateAqChildScore = (responses = {}) => {
  let totalScore = 0
  let subscaleScores = {
    social: 0,
    communication: 0,
    imagination: 0,
    attention_detail: 0,
    attention_switching: 0
  }

  // Calcular puntuación total y por subescalas
  aqChildQuestions.forEach(question => {
    const response = responses[question.id]
    if (response !== undefined) {
      let score
      if (question.reverse) {
        // Para ítems inversos, invertir la puntuación
        score = 3 - response
      } else {
        score = response
      }
      
      totalScore += score
      subscaleScores[question.subscale] += score
    }
  })

  return {
    totalScore,
    subscaleScores,
    maxTotal: 150, // 50 items × 3 puntos max
    maxSocial: 30, // 10 items × 3 puntos max
    maxCommunication: 30, // 10 items × 3 puntos max
    maxImagination: 27, // 9 items × 3 puntos max
    maxAttentionDetail: 33, // 11 items × 3 puntos max
    maxAttentionSwitching: 30, // 10 items × 3 puntos max
    completedQuestions: Object.keys(responses).length,
    totalQuestions: 50
  }
}

export const getAqChildSeverityLevel = (totalScore) => {
  if (totalScore >= 76) {
    return {
      level: 'Alto riesgo de TEA',
      class: 'severity-high',
      color: '#f56565',
      description: 'Puntuación superior al punto de corte (≥76). Se recomienda evaluación diagnóstica especializada.'
    }
  } else if (totalScore >= 65) {
    return {
      level: 'Moderado-Alto',
      class: 'severity-moderate-high',
      color: '#f6ad55',
      description: 'Puntuación en rango moderado-alto. Seguimiento clínico recomendado.'
    }
  } else if (totalScore >= 50) {
    return {
      level: 'Moderado',
      class: 'severity-moderate',
      color: '#ed8936',
      description: 'Puntuación en rango moderado. Algunos rasgos presentes.'
    }
  } else {
    return {
      level: 'Desarrollo típico',
      class: 'severity-normal',
      color: '#48bb78',
      description: 'Puntuación en rango típico. Rasgos autistas mínimos o ausentes.'
    }
  }
}

export const getAqChildDetailedInterpretation = (result) => {
  const { totalScore, subscaleScores } = result
  const severity = getAqChildSeverityLevel(totalScore)

  let interpretation = ''
  let recommendations = []

  switch (severity.level) {
    case 'Desarrollo típico':
      interpretation = 'La puntuación obtenida se encuentra dentro del rango típico de desarrollo. No se evidencian rasgos del espectro autista clínicamente significativos según los criterios del AQ-Child.'
      recommendations = [
        'Desarrollo típico identificado',
        'Continuar seguimientos rutinarios del desarrollo',
        'Promover habilidades sociales y comunicativas normales',
        'Seguimiento regular en controles pediátricos'
      ]
      break

    case 'Moderado':
      interpretation = 'Se identifican algunos rasgos relacionados con el espectro autista que requieren observación y seguimiento del desarrollo.'
      recommendations = [
        'Observación del desarrollo social y comunicativo',
        'Evaluación de habilidades adaptativas',
        'Seguimiento del progreso escolar y social',
        'Consulta con especialista si hay preocupaciones adicionales'
      ]
      break

    case 'Moderado-Alto':
      interpretation = 'Presencia de rasgos moderados-altos relacionados con el espectro autista que sugieren la necesidad de evaluación clínica especializada.'
      recommendations = [
        'Evaluación clínica por especialista en desarrollo',
        'Evaluación de habilidades sociales y comunicativas',
        'Considerar evaluación neuropsicológica',
        'Intervención temprana si procede',
        'Seguimiento clínico regular'
      ]
      break

    case 'Alto riesgo de TEA':
      interpretation = 'Puntuación superior al punto de corte que sugiere alta probabilidad de rasgos del espectro autista. Requiere evaluación diagnóstica especializada inmediata.'
      recommendations = [
        'Evaluación diagnóstica especializada integral',
        'Evaluación multidisciplinaria (pediatría, neurología, psicología)',
        'Intervención temprana especializada',
        'Apoyo familiar e información sobre TEA',
        'Coordinación con servicios escolares especializados'
      ]
      break
  }

  // Análisis específico de subescalas
  const subscaleAnalysis = []
  const subscaleNames = {
    social: "Habilidades Sociales",
    communication: "Comunicación", 
    imagination: "Imaginación",
    attention_detail: "Atención al Detalle",
    attention_switching: "Cambios de Atención"
  }

  const maxScores = {
    social: 30,
    communication: 30,
    imagination: 27,
    attention_detail: 33,
    attention_switching: 30
  }

  Object.entries(subscaleScores).forEach(([key, score]) => {
    const maxScore = maxScores[key]
    const percentage = (score / maxScore) * 100
    
    if (percentage >= 66) {
      subscaleAnalysis.push(`${subscaleNames[key]} elevada: Requiere atención específica en esta área del desarrollo.`)
    } else if (percentage >= 50) {
      subscaleAnalysis.push(`${subscaleNames[key]} moderada: Algunos rasgos presentes que requieren seguimiento.`)
    }
  })

  return {
    level: severity.level,
    title: severity.level,
    description: interpretation,
    recommendations: recommendations.join('; '),
    subscaleAnalysis: subscaleAnalysis.join(' '),
    color: severity.color,
    className: severity.class
  }
}

export const checkAqChildClinicalAlerts = (responses = {}, result = {}) => {
  const alerts = []
  const { totalScore, subscaleScores } = result

  // Alerta crítica por puntuación total alta
  if (totalScore >= 76) {
    alerts.push({
      type: 'critical',
      title: '🚨 PUNTUACIÓN SUPERIOR AL PUNTO DE CORTE',
      message: `Puntuación total de ${totalScore}/150 (≥76). Se recomienda evaluación diagnóstica especializada inmediata por profesional experto en TEA.`,
      priority: 'urgent'
    })
  }

  // Alertas por subescalas elevadas
  const subscaleNames = {
    social: "Habilidades Sociales",
    communication: "Comunicación", 
    imagination: "Imaginación",
    attention_detail: "Atención al Detalle",
    attention_switching: "Cambios de Atención"
  }

  const maxScores = {
    social: 30,
    communication: 30,
    imagination: 27,
    attention_detail: 33,
    attention_switching: 30
  }

  if (subscaleScores && typeof subscaleScores === 'object') {
    Object.entries(subscaleScores).forEach(([key, score]) => {
      const maxScore = maxScores[key]
      const percentage = (score / maxScore) * 100
      
      if (percentage >= 70) {
        alerts.push({
          type: 'warning',
          title: `⚠️ ${subscaleNames[key]} Elevada`,
          message: `Puntuación alta en ${subscaleNames[key]} (${score}/${maxScore}). Requiere evaluación específica de esta área del desarrollo.`,
          priority: 'high'
        })
      }
    })
  }

  // Alerta por múltiples áreas problemáticas
  const highScoreAreas = subscaleScores && typeof subscaleScores === 'object' 
    ? Object.entries(subscaleScores).filter(([key, score]) => {
        const maxScore = maxScores[key]
        return (score / maxScore) >= 0.66
      }).length 
    : 0

  if (highScoreAreas >= 3) {
    alerts.push({
      type: 'warning',
      title: '⚠️ Múltiples Áreas Afectadas',
      message: `Se identifican ${highScoreAreas} áreas con puntuaciones elevadas. Requiere evaluación integral multidisciplinaria especializada en TEA.`,
      priority: 'high'
    })
  }

  return alerts
}

export const getAqChildHighScoreItems = (responses = {}) => {
  const highItems = []
  const threshold = 2 // Puntuaciones altas (2-3)

  aqChildQuestions.forEach(question => {
    const response = responses[question.id]
    if (response !== undefined) {
      let score = question.reverse ? (3 - response) : response
      if (score >= threshold) {
        highItems.push({
          number: question.id,
          text: question.text,
          subscale: question.subscale,
          score: score,
          maxScore: 3,
          reverse: question.reverse
        })
      }
    }
  })

  return highItems
}

// Configuración completa de la escala
export const aqChildConfig = {
  id: 'aq-child',
  name: 'AQ-Child',
  fullName: 'Cociente de TEA Niño (4-11 años)',
  description: 'Evaluación de rasgos del espectro autista en niños de 4-11 años mediante reporte parental con 5 subescalas: habilidades sociales, comunicación, imaginación, atención al detalle y cambios de atención',
  applicationType: 'Autoaplicada',
  questions: aqChildQuestions,
  options: aqChildOptions,
  maxScore: 150,
  scoreRange: 'Total: 0-150, Subescalas: Social 0-30, Comunicación 0-30, Imaginación 0-27, Atención al Detalle 0-33, Cambios de Atención 0-30',
  instructions: [
    'Este cuestionario evalúa rasgos relacionados con el espectro autista en niños de 4 a 11 años',
    'Conteste pensando en el comportamiento habitual de su hijo/a',
    'Son 50 preguntas sobre 5 áreas importantes del desarrollo',
    'Para cada pregunta, elija la opción que mejor describa a su hijo/a',
    'Use las respuestas visuales con colores y emojis como guía',
    'No hay respuestas correctas o incorrectas, responda con sinceridad'
  ],
  timeEstimate: '15-20 minutos',
  calculateScore: calculateAqChildScore,
  getInterpretation: getAqChildDetailedInterpretation,
  checkAlerts: checkAqChildClinicalAlerts,
  factors: {
    social: { name: 'Habilidades Sociales', maxScore: 30, items: socialItems },
    communication: { name: 'Comunicación', maxScore: 30, items: communicationItems },
    imagination: { name: 'Imaginación', maxScore: 27, items: imaginationItems },
    attention_detail: { name: 'Atención al Detalle', maxScore: 33, items: attentionDetailItems },
    attention_switching: { name: 'Cambios de Atención', maxScore: 30, items: attentionSwitchingItems }
  },
  visualOptions: true // Indicador para mostrar opciones con colores y emojis
}

// Datos para el catálogo de escalas
export const aqChildScaleData = {
  id: 'aq-child',
  fullName: 'Cociente de TEA Niño (4-11 años)',
  shortName: 'AQ-Child',
  description: 'Evaluación de rasgos del espectro autista en niños de 4-11 años mediante reporte parental. Incluye análisis de 5 subescalas con respuestas visuales (colores y emojis).',
  questions: 50,
  duration: '15-20',
  applicationType: 'Autoaplicada',
  ageRange: 'Niños (4-11 años) - Reporte parental',
  diagnostics: ['Trastorno del Espectro Autista', 'Evaluación del Desarrollo', 'Screening TEA'],
  tags: ['TEA', 'Autismo', 'Infantil', 'Desarrollo', 'Padres', 'Screening', 'Baron-Cohen'],
  available: true,
  icon: 'picklist-type-svgrepo-com',
  color: '#8b5cf6'
}

// Información de ayuda
export const aqChildHelpInfo = {
  purpose: "El AQ-Child evalúa rasgos relacionados con el espectro autista en niños de 4-11 años mediante reporte parental, cuantificando características en 5 subescalas principales con un sistema de respuestas visuales.",
  scoring: {
    method: "50 ítems con 4 opciones cada uno (0-3 puntos), 5 subescalas principales, scoring reverso en ítems específicos",
    ranges: [
      { range: "0-49", severity: "Desarrollo típico", color: "#48bb78" },
      { range: "50-64", severity: "Rasgos moderados", color: "#ed8936" },
      { range: "65-75", severity: "Rasgos moderados-altos", color: "#f6ad55" },
      { range: "76-150", severity: "Alto riesgo de TEA", color: "#f56565" }
    ]
  },
  clinical_considerations: [
    "Diseñado específicamente para niños de 4-11 años mediante reporte parental",
    "Punto de corte de 76 con sensibilidad y especificidad del 95%",
    "Incluye respuestas visuales (colores y emojis) para facilitar comprensión",
    "Cinco subescalas: Habilidades Sociales, Comunicación, Imaginación, Atención al Detalle, Cambios de Atención",
    "Útil como herramienta de screening inicial para TEA",
    "Requiere confirmación diagnóstica por especialista",
    "Considera el contexto del desarrollo típico infantil"
  ],
  limitations: [
    "Requiere que los padres tengan conocimiento adecuado del comportamiento del niño",
    "No reemplaza la evaluación diagnóstica especializada",
    "Puede estar influenciado por la percepción parental",
    "Requiere consideración del contexto cultural y familiar",
    "No evalúa severidad o necesidades específicas de apoyo",
    "Limitado a la edad de 4-11 años"
  ],
  references: "Baron-Cohen, S., et al. (2008). The Autism-Spectrum Quotient (AQ): Evidence from Asperger Syndrome/High-Functioning Autism, Males and Females, Scientists and Mathematicians. Journal of Autism and Developmental Disorders."
}