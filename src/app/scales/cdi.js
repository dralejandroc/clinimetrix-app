// CDI - Cuestionario de Depresión Infantil (Children's Depression Inventory)
// Evaluación de síntomas depresivos en niños y adolescentes de 7-17 años

// Definición de subescalas según la literatura CDI
export const disforiaItems = [1, 6, 10, 11, 12, 16, 17, 19, 20, 21] // 10 items - Humor depresivo, tristeza
export const autoestimaItems = [2, 3, 5, 7, 8, 13, 14, 24, 25] // 9 items - Sentimientos de ineficacia

// Preguntas del CDI (27 ítems con 3 opciones cada una)
export const cdiQuestions = [
  {
    id: 1,
    text: '¿Cómo te has sentido de triste?',
    options: [
      { text: 'Estoy triste de vez en cuando.', value: 0 },
      { text: 'Estoy triste muchas veces.', value: 1 },
      { text: 'Estoy triste siempre.', value: 2 }
    ]
  },
  {
    id: 2,
    text: '¿Qué piensas sobre cómo te van a salir las cosas?',
    options: [
      { text: 'Las cosas me saldrán bien.', value: 0 },
      { text: 'No estoy seguro de si las cosas me saldrán bien.', value: 1 },
      { text: 'Nunca me saldrá nada bien.', value: 2 }
    ]
  },
  {
    id: 3,
    text: '¿Cómo haces las cosas?',
    options: [
      { text: 'Hago bien la mayoría de las cosas.', value: 0 },
      { text: 'Hago mal muchas cosas.', value: 1 },
      { text: 'Todo lo hago mal.', value: 2 }
    ]
  },
  {
    id: 4,
    text: '¿Qué cosas te divierten?',
    options: [
      { text: 'Me divierten muchas cosas.', value: 0 },
      { text: 'Me divierten algunas cosas.', value: 1 },
      { text: 'Nada me divierte.', value: 2 }
    ]
  },
  {
    id: 5,
    text: '¿Cómo te consideras?',
    options: [
      { text: 'Soy malo algunas veces.', value: 0 },
      { text: 'Soy malo muchas veces.', value: 1 },
      { text: 'Soy malo siempre.', value: 2 }
    ]
  },
  {
    id: 6,
    text: '¿Qué piensas que te puede ocurrir?',
    options: [
      { text: 'A veces pienso que me pueden ocurrir cosas malas.', value: 0 },
      { text: 'Me preocupa que me ocurran cosas malas.', value: 1 },
      { text: 'Estoy seguro de que me van a ocurrir cosas terribles.', value: 2 }
    ]
  },
  {
    id: 7,
    text: '¿Cómo te sientes contigo mismo?',
    options: [
      { text: 'Me gusta como soy.', value: 0 },
      { text: 'No me gusta como soy.', value: 1 },
      { text: 'Me odio.', value: 2 }
    ]
  },
  {
    id: 8,
    text: '¿De quién es la culpa cuando ocurren cosas malas?',
    options: [
      { text: 'Generalmente no tengo la culpa de que ocurran cosas malas.', value: 0 },
      { text: 'Muchas cosas malas son culpa mía.', value: 1 },
      { text: 'Todas las cosas malas son culpa mía.', value: 2 }
    ]
  },
  {
    id: 9,
    text: '¿Piensas en hacerte daño?',
    options: [
      { text: 'No pienso en matarme.', value: 0 },
      { text: 'Pienso en matarme pero no lo haría.', value: 1 },
      { text: 'Quiero matarme.', value: 2 }
    ]
  },
  {
    id: 10,
    text: '¿Con qué frecuencia tienes ganas de llorar?',
    options: [
      { text: 'Tengo ganas de llorar de cuando en cuando.', value: 0 },
      { text: 'Tengo ganas de llorar muchos días.', value: 1 },
      { text: 'Tengo ganas de llorar todos los días.', value: 2 }
    ]
  },
  {
    id: 11,
    text: '¿Con qué frecuencia te preocupan las cosas?',
    options: [
      { text: 'Las cosas me preocupan de cuando en cuando.', value: 0 },
      { text: 'Las cosas me preocupan muchas veces.', value: 1 },
      { text: 'Las cosas me preocupan siempre.', value: 2 }
    ]
  },
  {
    id: 12,
    text: '¿Te gusta estar con la gente?',
    options: [
      { text: 'Me gusta estar con la gente.', value: 0 },
      { text: 'Muy a menudo no me gusta estar con la gente.', value: 1 },
      { text: 'No quiero en absoluto estar con la gente.', value: 2 }
    ]
  },
  {
    id: 13,
    text: '¿Cómo tomas las decisiones?',
    options: [
      { text: 'Me decido fácilmente.', value: 0 },
      { text: 'Me cuesta decidirme.', value: 1 },
      { text: 'No puedo decidirme.', value: 2 }
    ]
  },
  {
    id: 14,
    text: '¿Cómo ves tu aspecto?',
    options: [
      { text: 'Tengo buen aspecto.', value: 0 },
      { text: 'Hay algunas cosas de mi aspecto que no me gustan.', value: 1 },
      { text: 'Soy feo.', value: 2 }
    ]
  },
  {
    id: 15,
    text: '¿Cómo te sientes cuando tienes que hacer los deberes?',
    options: [
      { text: 'No me cuesta ponerme a hacer los deberes.', value: 0 },
      { text: 'Muchas veces me cuesta ponerme a hacer los deberes.', value: 1 },
      { text: 'Siempre me cuesta ponerme a hacer los deberes.', value: 2 }
    ]
  },
  {
    id: 16,
    text: '¿Cómo duermes por las noches?',
    options: [
      { text: 'Duermo muy bien.', value: 0 },
      { text: 'Muchas noches me cuesta dormirme.', value: 1 },
      { text: 'Todas las noches me cuesta dormirme.', value: 2 }
    ]
  },
  {
    id: 17,
    text: '¿Cómo te sientes de cansado?',
    options: [
      { text: 'Estoy cansado de cuando en cuando.', value: 0 },
      { text: 'Estoy cansado muchos días.', value: 1 },
      { text: 'Estoy cansado siempre.', value: 2 }
    ]
  },
  {
    id: 18,
    text: '¿Cómo tienes el apetito?',
    options: [
      { text: 'Como muy bien.', value: 0 },
      { text: 'Muchos días no tengo ganas de comer.', value: 1 },
      { text: 'La mayoría de los días no tengo ganas de comer.', value: 2 }
    ]
  },
  {
    id: 19,
    text: '¿Te preocupas por dolores y enfermedades?',
    options: [
      { text: 'No me preocupa el dolor ni la enfermedad.', value: 0 },
      { text: 'Muchas veces me preocupa el dolor y la enfermedad.', value: 1 },
      { text: 'Siempre me preocupa el dolor y la enfermedad.', value: 2 }
    ]
  },
  {
    id: 20,
    text: '¿Te sientes solo?',
    options: [
      { text: 'Nunca me siento solo.', value: 0 },
      { text: 'Me siento solo muchas veces.', value: 1 },
      { text: 'Me siento solo siempre.', value: 2 }
    ]
  },
  {
    id: 21,
    text: '¿Te diviertes en el colegio?',
    options: [
      { text: 'Me divierto en el colegio muchas veces.', value: 0 },
      { text: 'Me divierto en el colegio sólo de vez en cuando.', value: 1 },
      { text: 'Nunca me divierto en el colegio.', value: 2 }
    ]
  },
  {
    id: 22,
    text: '¿Cuántos amigos tienes?',
    options: [
      { text: 'Tengo muchos amigos.', value: 0 },
      { text: 'Tengo muchos amigos pero me gustaría tener más.', value: 1 },
      { text: 'No tengo amigos.', value: 2 }
    ]
  },
  {
    id: 23,
    text: '¿Cómo va tu trabajo en el colegio?',
    options: [
      { text: 'Mi trabajo en el colegio es bueno.', value: 0 },
      { text: 'Mi trabajo en el colegio no es tan bueno como antes.', value: 1 },
      { text: 'Llevo muy mal las asignaturas que antes llevaba bien.', value: 2 }
    ]
  },
  {
    id: 24,
    text: '¿Cómo te comparas con otros niños?',
    options: [
      { text: 'Soy tan bueno como otros niños.', value: 0 },
      { text: 'Si quiero puedo ser tan bueno como otros niños.', value: 1 },
      { text: 'Nunca podré ser tan bueno como otros niños.', value: 2 }
    ]
  },
  {
    id: 25,
    text: '¿Sientes que alguien te quiere?',
    options: [
      { text: 'Estoy seguro de que alguien me quiere.', value: 0 },
      { text: 'No estoy seguro de que alguien me quiera.', value: 1 },
      { text: 'Nadie me quiere.', value: 2 }
    ]
  },
  {
    id: 26,
    text: '¿Haces lo que te dicen?',
    options: [
      { text: 'Generalmente hago lo que me dicen.', value: 0 },
      { text: 'Muchas veces no hago lo que me dicen.', value: 1 },
      { text: 'Nunca hago lo que me dicen.', value: 2 }
    ]
  },
  {
    id: 27,
    text: '¿Cómo te llevas con la gente?',
    options: [
      { text: 'Me llevo bien con la gente.', value: 0 },
      { text: 'Me peleo muchas veces.', value: 1 },
      { text: 'Me peleo siempre.', value: 2 }
    ]
  }
]

export const calculateCdiScore = (responses = {}) => {
  let totalScore = 0
  let disforiaScore = 0
  let autoestimaScore = 0

  // Calcular puntuación total
  for (let i = 1; i <= 27; i++) {
    if (responses[i] !== undefined) {
      totalScore += responses[i]
    }
  }

  // Calcular subescalas
  disforiaItems.forEach(item => {
    if (responses[item] !== undefined) {
      disforiaScore += responses[item]
    }
  })

  autoestimaItems.forEach(item => {
    if (responses[item] !== undefined) {
      autoestimaScore += responses[item]
    }
  })

  return {
    totalScore,
    disforiaScore,
    autoestimaScore,
    maxTotal: 54, // 27 items × 2 puntos max
    maxDisforia: 20, // 10 items × 2 puntos max
    maxAutoestima: 18, // 9 items × 2 puntos max
    completedQuestions: Object.keys(responses).length,
    totalQuestions: 27
  }
}

export const getCdiSeverityLevel = (totalScore) => {
  if (totalScore < 19) {
    return {
      level: 'Sin indicadores de depresión',
      class: 'severity-normal',
      color: '#48bb78'
    }
  } else if (totalScore < 29) {
    return {
      level: 'Depresión leve',
      class: 'severity-mild',
      color: '#f6ad55'
    }
  } else if (totalScore < 39) {
    return {
      level: 'Depresión moderada',
      class: 'severity-moderate',
      color: '#ed8936'
    }
  } else {
    return {
      level: 'Depresión grave',
      class: 'severity-severe',
      color: '#f56565'
    }
  }
}

export const getCdiDetailedInterpretation = (result) => {
  const { totalScore, disforiaScore, autoestimaScore } = result
  const severity = getCdiSeverityLevel(totalScore)

  let interpretation = ''
  let recommendations = []

  switch (severity.level) {
    case 'Sin indicadores de depresión':
      interpretation = 'La puntuación obtenida se encuentra dentro del rango normal. No se evidencian síntomas depresivos clínicamente significativos según los criterios del CDI.'
      recommendations = [
        'Mantener seguimiento preventivo',
        'Promover factores protectores del bienestar emocional',
        'Continuar con actividades recreativas y sociales',
        'Seguimiento rutinario en controles regulares'
      ]
      break

    case 'Depresión leve':
      interpretation = 'Se identifican síntomas depresivos de intensidad leve que requieren atención y seguimiento clínico en población infantil/adolescente.'
      recommendations = [
        'Intervención psicoterapéutica temprana',
        'Evaluación de factores precipitantes',
        'Apoyo familiar y escolar',
        'Actividades estructuradas y socialización',
        'Seguimiento clínico periódico'
      ]
      break

    case 'Depresión moderada':
      interpretation = 'Presencia de sintomatología depresiva moderada que interfiere significativamente con el funcionamiento diario del menor.'
      recommendations = [
        'Intervención psicoterapéutica estructurada',
        'Evaluación de necesidad de intervención farmacológica',
        'Coordinación con familia y escuela',
        'Evaluación de riesgo suicida',
        'Seguimiento clínico regular'
      ]
      break

    case 'Depresión grave':
      interpretation = 'Sintomatología depresiva severa con alto impacto funcional en población infantil/adolescente. Requiere atención clínica inmediata.'
      recommendations = [
        'Intervención clínica urgente',
        'Evaluación inmediata de riesgo suicida',
        'Considerar hospitalización si procede',
        'Tratamiento multidisciplinario intensivo',
        'Intervención familiar intensiva'
      ]
      break
  }

  // Análisis específico de subescalas
  const subscaleAnalysis = []
  
  if (disforiaScore > (disforiaItems.length * 1.3)) {
    subscaleAnalysis.push('Disforia elevada: Indica presencia significativa de humor depresivo, tristeza y preocupación que requiere atención específica.')
  } else if (disforiaScore > (disforiaItems.length * 0.7)) {
    subscaleAnalysis.push('Disforia moderada: Presencia de algunos síntomas disfóricos que requieren seguimiento.')
  }
  
  if (autoestimaScore > (autoestimaItems.length * 1.3)) {
    subscaleAnalysis.push('Autoestima negativa elevada: Indica sentimientos marcados de ineficacia, culpa y baja autoestima que requieren intervención específica.')
  } else if (autoestimaScore > (autoestimaItems.length * 0.7)) {
    subscaleAnalysis.push('Autoestima negativa moderada: Presencia de algunos sentimientos de inadecuación personal.')
  }

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

export const checkCdiClinicalAlerts = (responses = {}) => {
  const alerts = []

  // Alerta crítica por ideación suicida (ítem 9)
  const suicidalIdeation = responses[9] || 0
  if (suicidalIdeation === 2) {
    alerts.push({
      type: 'critical',
      title: '🚨 ALERTA CRÍTICA: Ideación Suicida Activa',
      message: 'El menor expresó "Quiero matarme". Requiere evaluación inmediata de riesgo suicida y protocolo de seguridad urgente.',
      priority: 'urgent'
    })
  } else if (suicidalIdeation === 1) {
    alerts.push({
      type: 'warning',
      title: '⚠️ Ideación Suicida Pasiva',
      message: 'El menor reporta pensamientos suicidas pasivos. Requiere evaluación de riesgo y seguimiento clínico inmediato.',
      priority: 'high'
    })
  }

  // Alerta por autoconcepto muy negativo (ítem 7)
  const selfHatred = responses[7] || 0
  if (selfHatred === 2) {
    alerts.push({
      type: 'warning',
      title: '⚠️ Autoconcepto Severamente Negativo',
      message: 'El menor expresa autorrechazo extremo ("Me odio"). Requiere intervención en autoestima y autoconcepto.',
      priority: 'high'
    })
  }

  // Alerta por sentimientos de rechazo (ítem 25)
  const feelingUnloved = responses[25] || 0
  if (feelingUnloved === 2) {
    alerts.push({
      type: 'warning',
      title: '⚠️ Sentimientos de Rechazo Severos',
      message: 'El menor siente que "nadie lo quiere". Evaluar dinámicas familiares y red de apoyo social.',
      priority: 'high'
    })
  }

  // Alerta por aislamiento social severo (ítem 12)
  const socialIsolation = responses[12] || 0
  if (socialIsolation === 2) {
    alerts.push({
      type: 'warning',
      title: '⚠️ Aislamiento Social Severo',
      message: 'El menor no quiere estar con la gente en absoluto. Evaluar habilidades sociales y apoyo interpersonal.',
      priority: 'medium'
    })
  }

  // Alerta por múltiples áreas problemáticas
  const highScoreItems = Object.keys(responses).filter(key => responses[key] >= 2).length
  if (highScoreItems >= 5) {
    alerts.push({
      type: 'warning',
      title: '⚠️ Múltiples Áreas Problemáticas',
      message: `Se identifican ${highScoreItems} áreas con puntuación máxima. Requiere evaluación integral multidisciplinaria.`,
      priority: 'medium'
    })
  }

  return alerts
}

export const getCdiHighScoreItems = (responses = {}) => {
  const highItems = []
  const threshold = 2 // Puntuación máxima

  for (let i = 1; i <= 27; i++) {
    if (responses[i] !== undefined && responses[i] >= threshold) {
      const question = cdiQuestions.find(q => q.id === i)
      highItems.push({
        number: i,
        text: question ? question.text : `Ítem ${i}`,
        score: responses[i],
        maxScore: 2
      })
    }
  }

  return highItems
}

// Configuración completa de la escala
export const cdiConfig = {
  id: 'cdi',
  name: 'CDI',
  fullName: 'Cuestionario de Depresión Infantil',
  description: 'Evaluación de síntomas depresivos en niños y adolescentes de 7-17 años con dos subescalas principales: disforia y autoestima negativa',
  applicationType: 'Autoaplicada',
  questions: cdiQuestions,
  options: [], // No aplica - cada pregunta tiene sus propias opciones
  maxScore: 54,
  scoreRange: 'Total: 0-54, Disforia: 0-20, Autoestima Negativa: 0-18',
  instructions: [
    'Este cuestionario tiene oraciones que están en grupos de tres',
    'Escoge en cada grupo una oración, la que mejor diga cómo te has sentido en las ÚLTIMAS DOS SEMANAS',
    'No hay respuesta correcta ni falsa, solo trata de contestar con sinceridad',
    'Piensa en cómo te has portado y cómo te has sentido recientemente',
    'Marca la opción que mejor describa tu situación',
    'Tómate tu tiempo para leer cada grupo de oraciones completo antes de elegir'
  ],
  timeEstimate: '8-12 minutos',
  calculateScore: calculateCdiScore,
  getInterpretation: getCdiDetailedInterpretation,
  checkAlerts: checkCdiClinicalAlerts,
  factors: {
    disforia: { name: 'Disforia', maxScore: 20, items: disforiaItems },
    autoestima: { name: 'Autoestima Negativa', maxScore: 18, items: autoestimaItems }
  }
}

// Datos para el catálogo de escalas
export const cdiScaleData = {
  id: 'cdi',
  fullName: 'Cuestionario de Depresión Infantil',
  shortName: 'CDI',
  description: 'Evaluación específica de síntomas depresivos en población infantil y adolescente (7-17 años) con análisis de disforia y autoestima.',
  questions: 27,
  duration: '8-12',
  applicationType: 'Autoaplicada',
  ageRange: 'Niños y adolescentes (7-17 años)',
  diagnostics: ['Depresión Infantil', 'Trastornos del Estado de Ánimo', 'Evaluación Pediátrica'],
  tags: ['Depresión', 'Infantil', 'Adolescentes', 'Kovacs', 'Pediatría', 'Disforia'],
  available: true,
  icon: 'picklist-type-svgrepo-com',
  color: '#ec4899'
}

// Información de ayuda
export const cdiHelpInfo = {
  purpose: "El CDI evalúa la presencia e intensidad de síntomas depresivos en niños y adolescentes de 7-17 años mediante 27 ítems con tres opciones de respuesta cada uno, organizados en dos subescalas principales.",
  scoring: {
    method: "27 ítems con 3 opciones cada uno (0-2 puntos), dos subescalas principales",
    ranges: [
      { range: "0-18", severity: "Sin indicadores de depresión", color: "#48bb78" },
      { range: "19-28", severity: "Depresión leve", color: "#f6ad55" },
      { range: "29-38", severity: "Depresión moderada", color: "#ed8936" },
      { range: "39-54", severity: "Depresión grave", color: "#f56565" }
    ]
  },
  clinical_considerations: [
    "Específicamente diseñado para población pediátrica (7-17 años)",
    "Evaluación de síntomas en las últimas dos semanas",
    "Incluye detección de ideación suicida y riesgo de autolesión",
    "Dos subescalas: Disforia (humor depresivo) y Autoestima Negativa",
    "Útil para seguimiento de tratamiento en población infantil",
    "Requiere evaluación contextual (familia, escuela, desarrollo)",
    "Considera aspectos específicos del desarrollo infantil/adolescente"
  ],
  limitations: [
    "Requiere capacidad de lectura y comprensión apropiada para la edad",
    "Puede estar influenciado por el nivel de desarrollo cognitivo",
    "No reemplaza la evaluación clínica integral pediátrica",
    "Requiere consideración del contexto familiar y escolar",
    "Algunos ítems pueden requerir explicación según la edad del menor"
  ],
  references: "Kovacs, M. (1992). Children's Depression Inventory Manual. Multi-Health Systems."
}