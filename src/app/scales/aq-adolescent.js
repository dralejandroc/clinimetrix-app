// AQ-Adolescent - Cociente de TEA Adolescente (Autism Spectrum Quotient for Adolescents)
// Evaluación de rasgos del espectro autista en adolescentes de 10-17 años

// Definición de subescalas según la literatura AQ-Adolescent
export const aqAdolescentSocialSkillsItems = [1, 11, 13, 15, 22, 36, 44, 45, 47, 48] // 10 items - Habilidades sociales
export const aqAdolescentAttentionSwitchingItems = [2, 4, 10, 16, 25, 32, 34, 37, 43, 46] // 10 items - Enganche atencional
export const aqAdolescentAttentionDetailItems = [5, 6, 9, 12, 19, 23, 28, 29, 30, 49] // 10 items - Atención al detalle
export const aqAdolescentCommunicationItems = [7, 17, 18, 26, 27, 31, 33, 35, 38, 39] // 10 items - Comunicación
export const aqAdolescentImaginationItems = [3, 8, 14, 20, 21, 24, 40, 41, 42, 50] // 10 items - Imaginación

// Ítems con puntuación inversa (donde desacuerdo = rasgos autistas)
export const aqAdolescentReverseItems = [1, 3, 8, 10, 11, 14, 15, 17, 24, 25, 27, 28, 31, 32, 34, 36, 37, 38, 40, 43, 44, 47, 48, 50]

// Preguntas del AQ-Adolescent (50 ítems con 4 opciones cada una)
export const aqAdolescentQuestions = [
  {
    id: 1,
    text: "Prefiere hacer cosas con otras personas más que solo/a",
    subscale: "social_skills",
    reverse: true
  },
  {
    id: 2,
    text: "Prefiere hacer las cosas de la misma manera una y otra vez",
    subscale: "attention_switching",
    reverse: false
  },
  {
    id: 3,
    text: "Si trata de imaginar algo, le resulta muy fácil crear una imagen en su mente",
    subscale: "imagination",
    reverse: true
  },
  {
    id: 4,
    text: "Frecuentemente se queda tan absorto/a con alguna cosa que pierde de vista otras cosas",
    subscale: "attention_switching",
    reverse: false
  },
  {
    id: 5,
    text: "Suele notar sonidos tenues que otros no escuchan",
    subscale: "attention_detail",
    reverse: false
  },
  {
    id: 6,
    text: "Habitualmente se fija en las patentes de los autos o en tipos similares de información",
    subscale: "attention_detail",
    reverse: false
  },
  {
    id: 7,
    text: "La gente con frecuencia le dice que ha dicho algo descortés, aunque él/ella piense que ha sido cortés",
    subscale: "communication",
    reverse: false
  },
  {
    id: 8,
    text: "Cuando lee un cuento, le resulta fácil imaginar la apariencia de los personajes",
    subscale: "imagination",
    reverse: true
  },
  {
    id: 9,
    text: "Le fascinan las fechas",
    subscale: "attention_detail",
    reverse: false
  },
  {
    id: 10,
    text: "En un grupo social, puede seguir fácilmente varias conversaciones de diferentes personas a la vez",
    subscale: "attention_switching",
    reverse: true
  },
  {
    id: 11,
    text: "Le resultan fáciles las situaciones sociales",
    subscale: "social_skills",
    reverse: true
  },
  {
    id: 12,
    text: "Tiende a fijarse en detalles que otros no notan",
    subscale: "attention_detail",
    reverse: false
  },
  {
    id: 13,
    text: "Preferiría ir más a una biblioteca que a una fiesta",
    subscale: "social_skills",
    reverse: false
  },
  {
    id: 14,
    text: "Le resulta fácil inventar historias",
    subscale: "imagination",
    reverse: true
  },
  {
    id: 15,
    text: "Le atraen más las personas que las cosas",
    subscale: "social_skills",
    reverse: true
  },
  {
    id: 16,
    text: "Le interesan mucho ciertos temas y se pone mal si no se puede dedicar a ellos",
    subscale: "attention_switching",
    reverse: false
  },
  {
    id: 17,
    text: "Disfruta de la cháchara social",
    subscale: "communication",
    reverse: true
  },
  {
    id: 18,
    text: "Mientras habla no es siempre fácil que otros puedan hacer algún comentario intercalado",
    subscale: "communication",
    reverse: false
  },
  {
    id: 19,
    text: "Le fascinan los números",
    subscale: "attention_detail",
    reverse: false
  },
  {
    id: 20,
    text: "Cuando lee un cuento le resulta difícil darse cuenta de las intenciones de los personajes",
    subscale: "imagination",
    reverse: false
  },
  {
    id: 21,
    text: "No disfruta particularmente leyendo ficción",
    subscale: "imagination",
    reverse: false
  },
  {
    id: 22,
    text: "Le resulta difícil hacer nuevos amigos",
    subscale: "social_skills",
    reverse: false
  },
  {
    id: 23,
    text: "Nota patrones en las cosas todo el tiempo",
    subscale: "attention_detail",
    reverse: false
  },
  {
    id: 24,
    text: "Preferiría ir más al teatro que a un museo",
    subscale: "imagination",
    reverse: true
  },
  {
    id: 25,
    text: "No se altera si le cambian la rutina diaria",
    subscale: "attention_switching",
    reverse: true
  },
  {
    id: 26,
    text: "Con frecuencia se da cuenta de que no sabe mantener una conversación",
    subscale: "communication",
    reverse: false
  },
  {
    id: 27,
    text: "Le resulta fácil \"leer entre líneas\" cuando alguien le habla",
    subscale: "communication",
    reverse: true
  },
  {
    id: 28,
    text: "Suele concentrarse más en el cuadro entero que en los pequeños detalles",
    subscale: "attention_detail",
    reverse: true
  },
  {
    id: 29,
    text: "No es muy bueno/a para recordar números de teléfono",
    subscale: "attention_detail",
    reverse: false
  },
  {
    id: 30,
    text: "No suele notar pequeños cambios en una situación o en el aspecto de una persona",
    subscale: "attention_detail",
    reverse: false
  },
  {
    id: 31,
    text: "Se puede dar cuenta si quien lo/a escucha se está aburriendo",
    subscale: "communication",
    reverse: true
  },
  {
    id: 32,
    text: "Le resulta fácil hacer más de una cosa a la vez",
    subscale: "attention_switching",
    reverse: true
  },
  {
    id: 33,
    text: "Cuando habla por teléfono no está seguro/a de cuándo le toca hablar",
    subscale: "communication",
    reverse: false
  },
  {
    id: 34,
    text: "Disfruta de hacer cosas espontáneamente",
    subscale: "attention_switching",
    reverse: true
  },
  {
    id: 35,
    text: "Suele ser el/la último/a en entender un chiste",
    subscale: "communication",
    reverse: false
  },
  {
    id: 36,
    text: "Le resulta fácil saber lo que el otro piensa o siente con sólo mirarle la cara",
    subscale: "social_skills",
    reverse: true
  },
  {
    id: 37,
    text: "Si hay una interrupción, puede volver rápidamente a lo que estaba haciendo",
    subscale: "attention_switching",
    reverse: true
  },
  {
    id: 38,
    text: "Es bueno/a para la cháchara social",
    subscale: "communication",
    reverse: true
  },
  {
    id: 39,
    text: "La gente suele decirle que habla persistentemente del mismo tema",
    subscale: "communication",
    reverse: false
  },
  {
    id: 40,
    text: "Cuando era más chico/a solía disfrutar jugando a \"hacer como que\" con otros niños (ej, jugar al doctor o a las visitas)",
    subscale: "imagination",
    reverse: true
  },
  {
    id: 41,
    text: "Le gusta juntar información sobre categorías de cosas (ej, tipos de autos, pájaros, plantas, trenes, etc.)",
    subscale: "imagination",
    reverse: false
  },
  {
    id: 42,
    text: "Le cuesta imaginar cómo sería ser otra persona",
    subscale: "imagination",
    reverse: false
  },
  {
    id: 43,
    text: "Le gusta planear cuidadosamente cualquier actividad en la que participe",
    subscale: "attention_switching",
    reverse: true
  },
  {
    id: 44,
    text: "Disfruta de los eventos sociales",
    subscale: "social_skills",
    reverse: true
  },
  {
    id: 45,
    text: "Le resulta difícil darse cuenta de las intenciones de la gente",
    subscale: "social_skills",
    reverse: false
  },
  {
    id: 46,
    text: "Las situaciones nuevas le generan ansiedad",
    subscale: "attention_switching",
    reverse: false
  },
  {
    id: 47,
    text: "Disfruta conociendo gente nueva",
    subscale: "social_skills",
    reverse: true
  },
  {
    id: 48,
    text: "Es diplomático/a",
    subscale: "social_skills",
    reverse: true
  },
  {
    id: 49,
    text: "No es bueno/a para recordar la fecha de nacimiento de la gente",
    subscale: "attention_detail",
    reverse: false
  },
  {
    id: 50,
    text: "Le resulta muy fácil jugar con otros niños a juegos que impliquen \"hacer como que\"",
    subscale: "imagination",
    reverse: true
  }
]

// Opciones de respuesta con emojis (sin colores de fondo, más sobrias para adolescentes)
export const aqAdolescentOptions = [
  { 
    text: "Definitivamente de acuerdo", 
    value: "definitely_agree", 
    emoji: "✅", 
    color: "rgba(255, 255, 255, 0.8)", // Fondo neutro
    textColor: "#112F33"
  },
  { 
    text: "Ligeramente de acuerdo", 
    value: "slightly_agree", 
    emoji: "☑️", 
    color: "rgba(255, 255, 255, 0.8)", // Fondo neutro
    textColor: "#112F33"
  },
  { 
    text: "Ligeramente en desacuerdo", 
    value: "slightly_disagree", 
    emoji: "🤔", 
    color: "rgba(255, 255, 255, 0.8)", // Fondo neutro
    textColor: "#112F33"
  },
  { 
    text: "Definitivamente en desacuerdo", 
    value: "definitely_disagree", 
    emoji: "❌", 
    color: "rgba(255, 255, 255, 0.8)", // Fondo neutro
    textColor: "#112F33"
  }
]

export const calculateAqAdolescentScore = (responses = {}) => {
  let totalScore = 0
  let subscaleScores = {
    social_skills: 0,
    attention_switching: 0,
    attention_detail: 0,
    communication: 0,
    imagination: 0
  }

  // Calcular puntuación total y por subescalas
  aqAdolescentQuestions.forEach(question => {
    const response = responses[question.id]
    if (response !== undefined) {
      let score = 0
      
      if (question.reverse) {
        // Para ítems inversos: desacuerdo = rasgos autistas
        if (response === 'slightly_disagree' || response === 'definitely_disagree') {
          score = 1
        }
      } else {
        // Para ítems normales: acuerdo = rasgos autistas  
        if (response === 'definitely_agree' || response === 'slightly_agree') {
          score = 1
        }
      }
      
      totalScore += score
      subscaleScores[question.subscale] += score
    }
  })

  return {
    totalScore,
    subscaleScores,
    maxTotal: 50, // 50 items × 1 punto max
    maxSubscale: 10, // 10 items × 1 punto max por subescala
    completedQuestions: Object.keys(responses).length,
    totalQuestions: 50
  }
}

export const getAqAdolescentSeverityLevel = (totalScore) => {
  if (totalScore >= 30) {
    return {
      level: 'Elevado (≥30)',
      class: 'severity-high',
      color: '#f56565',
      description: 'Puntaje consistente con presencia significativa de rasgos del espectro autista. El 90% de adolescentes con TEA puntúan en este rango.'
    }
  } else if (totalScore >= 20) {
    return {
      level: 'Moderado (20-29)',
      class: 'severity-moderate',
      color: '#f6ad55',
      description: 'Puntaje sugiere presencia de algunos rasgos del espectro autista. Monitoreo clínico recomendado.'
    }
  } else {
    return {
      level: 'Bajo (<20)',
      class: 'severity-normal',
      color: '#48bb78',
      description: 'Puntaje dentro del rango neurotípico. Rasgos del espectro autista no prominentes en el perfil actual.'
    }
  }
}

export const getAqAdolescentDetailedInterpretation = (result) => {
  const { totalScore, subscaleScores } = result
  const severity = getAqAdolescentSeverityLevel(totalScore)

  let interpretation = ''
  let recommendations = []

  switch (severity.level) {
    case 'Bajo (<20)':
      interpretation = 'La puntuación obtenida se encuentra dentro del rango neurotípico. No se evidencian rasgos del espectro autista clínicamente significativos según los criterios del AQ-Adolescent.'
      recommendations = [
        'Desarrollo neurotípico identificado',
        'Continuar seguimientos rutinarios del desarrollo',
        'Promover habilidades sociales y académicas apropiadas para la edad',
        'Seguimiento regular en controles pediátricos'
      ]
      break

    case 'Moderado (20-29)':
      interpretation = 'Se identifican algunos rasgos relacionados con el espectro autista que requieren observación y evaluación del funcionamiento adaptativo en adolescencia.'
      recommendations = [
        'Evaluación del funcionamiento adaptativo y académico',
        'Observación de habilidades sociales en contexto escolar',
        'Seguimiento del ajuste psicosocial adolescente',
        'Consulta con especialista si hay dificultades funcionales'
      ]
      break

    case 'Elevado (≥30)':
      interpretation = 'Puntuación superior al punto de corte que indica alta probabilidad de rasgos del espectro autista clínicamente significativos. Requiere evaluación diagnóstica especializada integral.'
      recommendations = [
        'Evaluación diagnóstica especializada urgente',
        'Evaluación multidisciplinaria (neurología, psicología, psiquiatría)',
        'Evaluación del funcionamiento adaptativo académico y social',
        'Considerar apoyo educativo especializado',
        'Apoyo familiar e información sobre TEA en adolescencia'
      ]
      break
  }

  // Análisis específico de subescalas
  const subscaleAnalysis = []
  const subscaleNames = {
    social_skills: "Habilidades Sociales",
    attention_switching: "Enganche Atencional", 
    attention_detail: "Atención al Detalle",
    communication: "Comunicación",
    imagination: "Imaginación"
  }

  Object.entries(subscaleScores).forEach(([key, score]) => {
    if (score >= 7) { // ≥70% del máximo
      let description = ''
      switch(key) {
        case 'social_skills':
          description = `Dificultades significativas en interacción social y preferencias sociales (${score}/10). Evaluar habilidades de reciprocidad social.`
          break
        case 'attention_switching':
          description = `Rigidez cognitiva y dificultades en flexibilidad atencional (${score}/10). Considerar impacto en funcionamiento adaptativo.`
          break
        case 'attention_detail':
          description = `Atención hiperfocalizada en detalles específicos (${score}/10). Patrón consistente con procesamiento perceptual autista.`
          break
        case 'communication':
          description = `Dificultades en comunicación pragmática y reciprocidad conversacional (${score}/10). Evaluar competencias comunicativas.`
          break
        case 'imagination':
          description = `Limitaciones en pensamiento simbólico y juego imaginativo (${score}/10). Patrón de pensamiento concreto predominante.`
          break
      }
      subscaleAnalysis.push(`${subscaleNames[key]}: ${description}`)
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

export const checkAqAdolescentClinicalAlerts = (responses = {}, result = {}) => {
  const alerts = []
  const { totalScore, subscaleScores } = result

  // Alerta crítica por puntuación total alta
  if (totalScore >= 30) {
    alerts.push({
      type: 'critical',
      title: '🚨 PUNTUACIÓN ELEVADA - EVALUACIÓN URGENTE',
      message: `Puntuación total de ${totalScore}/50 (≥30). El 90% de adolescentes con TEA puntúan en este rango. Se recomienda evaluación diagnóstica especializada inmediata.`,
      priority: 'urgent'
    })
  } else if (totalScore >= 20) {
    alerts.push({
      type: 'warning',
      title: '⚠️ Puntuación Moderada - Seguimiento Recomendado',
      message: `Puntuación total de ${totalScore}/50 (rango 20-29). Se sugiere monitoreo clínico y evaluación de funcionamiento adaptativo.`,
      priority: 'high'
    })
  }

  // Alertas por subescalas elevadas
  const subscaleNames = {
    social_skills: "Habilidades Sociales",
    attention_switching: "Enganche Atencional", 
    attention_detail: "Atención al Detalle",
    communication: "Comunicación",
    imagination: "Imaginación"
  }

  Object.entries(subscaleScores).forEach(([key, score]) => {
    if (score >= 7) { // ≥70% del máximo
      alerts.push({
        type: 'warning',
        title: `⚠️ ${subscaleNames[key]} Elevada`,
        message: `Puntuación alta en ${subscaleNames[key]} (${score}/10). Requiere evaluación específica de esta área del desarrollo.`,
        priority: 'high'
      })
    }
  })

  // Alerta por múltiples áreas problemáticas
  const highScoreAreas = Object.entries(subscaleScores).filter(([key, score]) => score >= 7).length

  if (highScoreAreas >= 3) {
    alerts.push({
      type: 'warning',
      title: '⚠️ Múltiples Áreas Afectadas',
      message: `Se identifican ${highScoreAreas} áreas con puntuaciones elevadas (≥70%). Requiere evaluación integral multidisciplinaria especializada en TEA.`,
      priority: 'high'
    })
  }

  return alerts
}

export const getAqAdolescentHighScoreItems = (responses = {}) => {
  const highItems = []

  aqAdolescentQuestions.forEach(question => {
    const response = responses[question.id]
    if (response !== undefined) {
      let isHighScore = false
      
      if (question.reverse) {
        // Para ítems inversos: desacuerdo = rasgos autistas
        if (response === 'slightly_disagree' || response === 'definitely_disagree') {
          isHighScore = true
        }
      } else {
        // Para ítems normales: acuerdo = rasgos autistas  
        if (response === 'definitely_agree' || response === 'slightly_agree') {
          isHighScore = true
        }
      }
      
      if (isHighScore) {
        highItems.push({
          number: question.id,
          text: question.text,
          subscale: question.subscale,
          score: 1,
          maxScore: 1,
          reverse: question.reverse
        })
      }
    }
  })

  return highItems
}

// Configuración completa de la escala
export const aqAdolescentConfig = {
  id: 'aq-adolescent',
  name: 'AQ-Adolescent',
  fullName: 'Cociente de TEA Adolescente (10-17 años)',
  description: 'Evaluación de rasgos del espectro autista en adolescentes de 10-17 años con 5 subescalas: habilidades sociales, enganche atencional, atención al detalle, comunicación e imaginación',
  applicationType: 'Autoaplicada',
  questions: aqAdolescentQuestions,
  options: aqAdolescentOptions,
  maxScore: 50,
  scoreRange: 'Total: 0-50, Subescalas: 0-10 cada una',
  instructions: [
    'Este cuestionario evalúa rasgos relacionados con el espectro autista en adolescentes de 10-17 años',
    'Lea cada afirmación detalladamente y marque cuánto está de acuerdo o en desacuerdo',
    'Son 50 preguntas sobre 5 áreas importantes del funcionamiento adolescente',
    'Para cada pregunta, seleccione la opción que mejor describa al adolescente',
    'Use las respuestas con emojis para mayor claridad',
    'Responda de manera honesta pensando en el comportamiento habitual'
  ],
  timeEstimate: '12-18 minutos',
  calculateScore: calculateAqAdolescentScore,
  getInterpretation: getAqAdolescentDetailedInterpretation,
  checkAlerts: checkAqAdolescentClinicalAlerts,
  factors: {
    social_skills: { name: 'Habilidades Sociales', maxScore: 10, items: aqAdolescentSocialSkillsItems },
    attention_switching: { name: 'Enganche Atencional', maxScore: 10, items: aqAdolescentAttentionSwitchingItems },
    attention_detail: { name: 'Atención al Detalle', maxScore: 10, items: aqAdolescentAttentionDetailItems },
    communication: { name: 'Comunicación', maxScore: 10, items: aqAdolescentCommunicationItems },
    imagination: { name: 'Imaginación', maxScore: 10, items: aqAdolescentImaginationItems }
  },
  visualOptions: true // Indicador para mostrar opciones con emojis (pero sin colores de fondo)
}

// Datos para el catálogo de escalas
export const aqAdolescentScaleData = {
  id: 'aq-adolescent',
  fullName: 'Cociente de TEA Adolescente (10-17 años)',
  shortName: 'AQ-Adolescent',
  description: 'Evaluación de rasgos del espectro autista en adolescentes de 10-17 años. Versión adaptada con emojis comprensibles para esta población y análisis de 5 subescalas.',
  questions: 50,
  duration: '12-18',
  applicationType: 'Autoaplicada',
  ageRange: 'Adolescentes (10-17 años)',
  diagnostics: ['Trastorno del Espectro Autista', 'Evaluación Adolescente', 'Screening TEA'],
  tags: ['TEA', 'Autismo', 'Adolescentes', 'Desarrollo', 'Screening', 'Baron-Cohen', '10-17 años'],
  available: true,
  icon: 'picklist-type-svgrepo-com',
  color: '#8b5cf6'
}

// Información de ayuda
export const aqAdolescentHelpInfo = {
  purpose: "El AQ-Adolescent evalúa rasgos relacionados con el espectro autista en adolescentes de 10-17 años, cuantificando características en 5 subescalas principales con sistema de respuestas adaptado para esta población.",
  scoring: {
    method: "50 ítems binarios (0-1 puntos), 5 subescalas de 10 ítems cada una, scoring reverso en 24 ítems específicos",
    ranges: [
      { range: "0-19", severity: "Rango neurotípico", color: "#48bb78" },
      { range: "20-29", severity: "Rasgos moderados", color: "#f6ad55" },
      { range: "30-50", severity: "Rasgos elevados - Evaluación urgente", color: "#f56565" }
    ]
  },
  clinical_considerations: [
    "Diseñado específicamente para adolescentes de 10-17 años",
    "Punto de corte de 30 con sensibilidad del 90% para TEA en adolescentes",
    "Incluye respuestas con emojis comprensibles para población adolescente",
    "Cinco subescalas: Habilidades Sociales, Enganche Atencional, Atención al Detalle, Comunicación, Imaginación",
    "Útil como herramienta de screening en población adolescente",
    "Considera desafíos específicos del desarrollo adolescente",
    "Evaluación del funcionamiento adaptativo académico y social"
  ],
  limitations: [
    "Requiere comprensión lectora apropiada para la edad",
    "No reemplaza la evaluación diagnóstica especializada integral",
    "Puede estar influenciado por factores del desarrollo adolescente",
    "Requiere consideración del contexto escolar y social",
    "No evalúa comorbilidades frecuentes en adolescencia",
    "Limitado al rango de edad de 10-17 años"
  ],
  references: "Baron-Cohen, S., et al. (2006). The Autism-Spectrum Quotient (AQ): Evidence from Asperger Syndrome/High-Functioning Autism in adolescents. Journal of Autism and Developmental Disorders."
}