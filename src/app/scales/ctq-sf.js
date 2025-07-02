// CTQ-SF - Cuestionario de Acontecimientos Traumáticos en la Infancia - Forma Breve
// Evaluación retrospectiva de trauma infantil con múltiples subescalas

export const ctqSfQuestions = [
  {
    id: 1,
    text: 'Cuando era niño(a)... No tenía suficiente para comer',
    type: 'single_choice'
  },
  {
    id: 2,
    text: 'Cuando era niño(a)... Sabía que había alguien que me cuidara y protegiera',
    type: 'single_choice'
  },
  {
    id: 3,
    text: 'Cuando era niño(a)... Mis familiares me decían cosas como "estúpido(a)", "perezoso(a)" o "feo(a)"',
    type: 'single_choice'
  },
  {
    id: 4,
    text: 'Cuando era niño(a)... Mis padres estaban demasiado borrachos o drogados para cuidar a mi familia',
    type: 'single_choice'
  },
  {
    id: 5,
    text: 'Cuando era niño(a)... Había alguien en mi familia que me ayudaba a sentirme importante o especial',
    type: 'single_choice'
  },
  {
    id: 6,
    text: 'Cuando era niño(a)... Tuve que usar ropa sucia',
    type: 'single_choice'
  },
  {
    id: 7,
    text: 'Cuando era niño(a)... Me sentía querido(a)',
    type: 'single_choice'
  },
  {
    id: 8,
    text: 'Cuando era niño(a)... Pensé que mis padres deseaban que yo nunca hubiera nacido',
    type: 'single_choice'
  },
  {
    id: 9,
    text: 'Cuando era niño(a)... Me golpearon tan fuerte que tuve que ir al médico o al hospital',
    type: 'single_choice'
  },
  {
    id: 10,
    text: 'Cuando era niño(a)... No había nada que quisiera cambiar de mi familia',
    type: 'single_choice'
  },
  {
    id: 11,
    text: 'Cuando era niño(a)... Los miembros de mi familia me golpearon tanto que me dejaron moretones o marcas',
    type: 'single_choice'
  },
  {
    id: 12,
    text: 'Cuando era niño(a)... Me castigaron con un cinturón, tabla, cuerda u otro objeto duro',
    type: 'single_choice'
  },
  {
    id: 13,
    text: 'Cuando era niño(a)... Los miembros de mi familia se cuidaban mutuamente',
    type: 'single_choice'
  },
  {
    id: 14,
    text: 'Cuando era niño(a)... Los miembros de mi familia me dijeron cosas hirientes o insultantes',
    type: 'single_choice'
  },
  {
    id: 15,
    text: 'Cuando era niño(a)... Creo que fui maltratado(a) físicamente',
    type: 'single_choice'
  },
  {
    id: 16,
    text: 'Cuando era niño(a)... Tuve la infancia perfecta',
    type: 'single_choice'
  },
  {
    id: 17,
    text: 'Cuando era niño(a)... Me golpearon tanto que un maestro, vecino u otro adulto se dio cuenta',
    type: 'single_choice'
  },
  {
    id: 18,
    text: 'Cuando era niño(a)... Sentí que alguien en mi familia me odiaba',
    type: 'single_choice'
  },
  {
    id: 19,
    text: 'Cuando era niño(a)... Los miembros de mi familia se sentían cercanos entre sí',
    type: 'single_choice'
  },
  {
    id: 20,
    text: 'Cuando era niño(a)... Alguien trató de tocarme de manera sexual o trató de hacerme tocar a esa persona',
    type: 'single_choice'
  },
  {
    id: 21,
    text: 'Cuando era niño(a)... Alguien amenazó con lastimarme o decir mentiras sobre mí a menos que hiciera algo sexual',
    type: 'single_choice'
  },
  {
    id: 22,
    text: 'Cuando era niño(a)... Tuve la mejor familia del mundo',
    type: 'single_choice'
  },
  {
    id: 23,
    text: 'Cuando era niño(a)... Alguien trató de hacerme hacer cosas sexuales o mirar cosas sexuales',
    type: 'single_choice'
  },
  {
    id: 24,
    text: 'Cuando era niño(a)... Alguien me molestó sexualmente',
    type: 'single_choice'
  },
  {
    id: 25,
    text: 'Cuando era niño(a)... Creo que fui maltratado(a) emocionalmente',
    type: 'single_choice'
  },
  {
    id: 26,
    text: 'Cuando era niño(a)... Había alguien que me llevara al médico si lo necesitaba',
    type: 'single_choice'
  },
  {
    id: 27,
    text: 'Cuando era niño(a)... Creo que fui abusado(a) sexualmente',
    type: 'single_choice'
  },
  {
    id: 28,
    text: 'Cuando era niño(a)... Mi familia fue una fuente de fortaleza y apoyo',
    type: 'single_choice'
  }
]

// Opciones para todas las preguntas (escala Likert 1-5)
export const ctqSfOptions = [
  { value: 1, label: 'Nunca' },
  { value: 2, label: 'Pocas veces' },
  { value: 3, label: 'A veces' },
  { value: 4, label: 'Muchas veces' },
  { value: 5, label: 'Siempre' }
]

// Configuración de subescalas
const subscales = {
  emotional_abuse: {
    items: [3, 8, 14, 18, 25],
    name: 'Abuso Emocional',
    cutoffs: { low: 9, moderate: 13, severe: 16 }
  },
  physical_abuse: {
    items: [9, 11, 12, 15, 17],
    name: 'Abuso Físico',
    cutoffs: { low: 8, moderate: 10, severe: 13 }
  },
  sexual_abuse: {
    items: [20, 21, 23, 24, 27],
    name: 'Abuso Sexual',
    cutoffs: { low: 6, moderate: 8, severe: 13 }
  },
  emotional_neglect: {
    items: [5, 7, 13, 19, 28],
    name: 'Negligencia Emocional',
    cutoffs: { low: 10, moderate: 15, severe: 18 },
    reversed: true
  },
  physical_neglect: {
    items: [1, 2, 4, 6, 26],
    name: 'Negligencia Física',
    cutoffs: { low: 8, moderate: 10, severe: 13 },
    partial_reversed: [2, 26]
  },
  minimization_denial: {
    items: [10, 16, 22],
    name: 'Minimización/Negación',
    cutoffs: { threshold: 2 },
    reversed: true
  }
}

// Ítems que se puntúan de forma inversa
const reversedItems = [2, 5, 7, 10, 13, 16, 19, 22, 26, 28]

export const calculateCtqSfScore = (responses = {}) => {
  const scores = {}
  const interpretations = {}
  
  // Calcular puntuaciones por subescala
  for (const [subscaleKey, subscale] of Object.entries(subscales)) {
    let sum = 0
    
    for (const item of subscale.items) {
      let value = responses[item] || 1
      
      // Invertir puntuación si es necesario
      if (reversedItems.includes(item)) {
        value = 6 - value
      }
      
      sum += value
    }
    
    scores[subscaleKey] = sum
    
    // Interpretación por subescala
    if (subscaleKey === 'minimization_denial') {
      interpretations[subscaleKey] = {
        score: sum,
        level: sum >= subscale.cutoffs.threshold ? 'high' : 'normal',
        interpretation: sum >= subscale.cutoffs.threshold 
          ? 'Posible minimización o negación de experiencias traumáticas' 
          : 'Sin indicadores significativos de minimización'
      }
    } else {
      const cutoffs = subscale.cutoffs
      let level, interpretation
      
      if (sum < cutoffs.low) {
        level = 'none'
        interpretation = 'Sin indicadores o mínimo'
      } else if (sum < cutoffs.moderate) {
        level = 'low'
        interpretation = 'Leve a moderado'
      } else if (sum < cutoffs.severe) {
        level = 'moderate'
        interpretation = 'Moderado a severo'
      } else {
        level = 'severe'
        interpretation = 'Severo a extremo'
      }
      
      interpretations[subscaleKey] = {
        score: sum,
        level,
        interpretation,
        maxScore: 25
      }
    }
  }
  
  // Cálculo del total de trauma (excluyendo minimización/negación)
  const clinicalSubscales = ['emotional_abuse', 'physical_abuse', 'sexual_abuse', 'emotional_neglect', 'physical_neglect']
  const totalScore = clinicalSubscales.reduce((sum, subscale) => sum + scores[subscale], 0)
  
  // Identificar formas de trauma presentes
  const elevatedSubscales = clinicalSubscales.filter(subscale => {
    const score = scores[subscale]
    const cutoffs = subscales[subscale].cutoffs
    return score >= cutoffs.moderate
  })
  
  // Interpretación global
  let globalInterpretation = ''
  let riskLevel = ''
  
  if (elevatedSubscales.length === 0) {
    globalInterpretation = 'No se identifican experiencias traumáticas significativas en la evaluación actual'
    riskLevel = 'minimal'
  } else if (elevatedSubscales.length === 1) {
    globalInterpretation = `Se identifica una forma específica de trauma: ${subscales[elevatedSubscales[0]].name}`
    riskLevel = 'mild'
  } else if (elevatedSubscales.length <= 3) {
    globalInterpretation = `Múltiples formas de trauma identificadas (${elevatedSubscales.length}/5 subescalas)`
    riskLevel = 'moderate'
  } else {
    globalInterpretation = `Politraumatización severa: ${elevatedSubscales.length}/5 formas de trauma identificadas`
    riskLevel = 'severe'
  }
  
  return {
    totalScore,
    maxScore: 125,
    scores,
    interpretations,
    globalInterpretation,
    riskLevel,
    elevatedSubscales,
    validity: interpretations.minimization_denial.level === 'high' 
      ? 'Las puntuaciones pueden estar subestimadas debido a minimización/negación' 
      : 'Respuestas válidas sin indicadores de minimización'
  }
}

export const ctqSfConfig = {
  id: 'ctq-sf',
  name: 'CTQ-SF',
  fullName: 'Cuestionario de Acontecimientos Traumáticos en la Infancia - Forma Breve',
  shortName: 'CTQ-SF',
  description: 'Evaluación retrospectiva de experiencias traumáticas durante la infancia y adolescencia',
  version: '1.0',
  author: 'Bernstein & Fink',
  
  // Configuración de la escala
  type: 'autoaplicada',
  duration: '5-7',
  questions: ctqSfQuestions,
  totalQuestions: 28,
  
  // Función para obtener opciones (iguales para todas las preguntas)
  getQuestionOptions: (questionNumber) => {
    return ctqSfOptions
  },
  
  // Función de cálculo
  calculateScore: calculateCtqSfScore,
  
  // Interpretación clínica detallada
  getDetailedInterpretation: (responses) => {
    const result = calculateCtqSfScore(responses)
    
    let description = ''
    let recommendations = []
    
    // Descripción basada en el nivel de riesgo global
    if (result.riskLevel === 'minimal') {
      description = 'La evaluación no identifica experiencias traumáticas significativas durante la infancia. Los factores protectores parecen haber estado presentes.'
      recommendations = [
        'Explorar otros factores de riesgo si hay síntomas actuales',
        'Considerar factores de resiliencia y recursos personales',
        'Documentar la ausencia de trauma infantil significativo'
      ]
    } else if (result.riskLevel === 'mild') {
      description = 'Se identifica una forma específica de trauma que puede requerir atención clínica. El impacto puede variar según factores de resiliencia.'
      recommendations = [
        'Explorar en profundidad el área de trauma identificada',
        'Evaluar el impacto actual en el funcionamiento',
        'Considerar intervenciones específicas para el tipo de trauma',
        'Evaluar factores protectores y resiliencia'
      ]
    } else if (result.riskLevel === 'moderate') {
      description = 'Múltiples formas de trauma identificadas sugieren un ambiente adverso durante el desarrollo. Mayor riesgo de secuelas psicológicas.'
      recommendations = [
        'Evaluación comprehensiva del trauma y sus secuelas',
        'Considerar evaluación de TEPT o TEPT complejo',
        'Implementar intervenciones informadas en trauma',
        'Evaluar necesidad de tratamiento especializado',
        'Explorar patrones de apego y regulación emocional'
      ]
    } else {
      description = 'Politraumatización severa identificada. Alto riesgo de consecuencias significativas en múltiples áreas del funcionamiento.'
      recommendations = [
        'Evaluación especializada en trauma urgente',
        'Considerar diagnóstico de TEPT complejo',
        'Tratamiento multidisciplinario recomendado',
        'Evaluar seguridad actual y riesgo de revictimización',
        'Implementar plan de tratamiento intensivo e integral',
        'Considerar intervenciones de estabilización inicial'
      ]
    }
    
    // Agregar nota sobre validez si hay minimización
    if (result.interpretations.minimization_denial.level === 'high') {
      description += ' NOTA IMPORTANTE: Los resultados pueden estar subestimados debido a tendencia a minimizar o negar experiencias traumáticas.'
    }
    
    return {
      interpretation: result.globalInterpretation,
      description,
      recommendations,
      subscaleDetails: result.interpretations
    }
  },
  
  // Alertas clínicas
  getAlerts: (responses) => {
    const alerts = []
    const result = calculateCtqSfScore(responses)
    
    // Alerta por abuso sexual
    if (result.interpretations.sexual_abuse.level !== 'none') {
      alerts.push({
        type: 'critical',
        message: `ALERTA: Abuso sexual identificado (${result.interpretations.sexual_abuse.interpretation}). Requiere evaluación especializada.`
      })
    }
    
    // Alerta por múltiples formas de trauma
    if (result.elevatedSubscales.length >= 3) {
      alerts.push({
        type: 'warning',
        message: `ATENCIÓN: Politraumatización identificada (${result.elevatedSubscales.length} formas de trauma). Alto riesgo de TEPT complejo.`
      })
    }
    
    // Alerta por abuso físico severo
    if (result.interpretations.physical_abuse.level === 'severe') {
      alerts.push({
        type: 'warning',
        message: 'ALERTA: Abuso físico severo reportado. Evaluar secuelas físicas y psicológicas.'
      })
    }
    
    // Alerta por negligencia severa
    const severeNeglect = ['emotional_neglect', 'physical_neglect'].filter(
      subscale => result.interpretations[subscale].level === 'severe'
    )
    if (severeNeglect.length > 0) {
      alerts.push({
        type: 'warning',
        message: `ATENCIÓN: Negligencia severa identificada. Evaluar impacto en el desarrollo y funcionamiento actual.`
      })
    }
    
    // Alerta por minimización
    if (result.interpretations.minimization_denial.level === 'high') {
      alerts.push({
        type: 'info',
        message: 'VALIDEZ: Posible minimización de experiencias. Las puntuaciones reales pueden ser más altas.'
      })
    }
    
    return alerts
  },

  // Instrucciones especiales para el paciente
  patientInstructions: {
    title: 'Instrucciones para el CTQ-SF',
    content: [
      '📋 Este cuestionario evalúa experiencias durante la infancia y adolescencia',
      '🕐 Todas las preguntas se refieren a experiencias ANTES de los 18 años',
      '💭 Responda basándose en sus recuerdos personales',
      '🎯 Para cada afirmación, seleccione la frecuencia que mejor describa su experiencia',
      '🔐 Sus respuestas son confidenciales y serán tratadas con total privacidad',
      '⏱️ Tomará aproximadamente 5-7 minutos completarlo',
      '❗ Si alguna pregunta le resulta incómoda, puede tomarse un momento antes de responder'
    ]
  }
}

// Función auxiliar para obtener interpretación detallada por subescala
function getSubscaleInterpretation(subscale, level) {
  const interpretations = {
    emotional_abuse: {
      none: 'No se identifican indicadores significativos de abuso emocional en la infancia.',
      low: 'Presencia leve de experiencias de abuso emocional. Explorar patrones familiares de comunicación.',
      moderate: 'Experiencias moderadas de abuso emocional que pueden haber impactado el desarrollo emocional.',
      severe: 'Historia significativa de abuso emocional severo. Asociado con mayor riesgo de psicopatología.'
    },
    physical_abuse: {
      none: 'No se identifican indicadores de abuso físico en la infancia.',
      low: 'Presencia leve de experiencias de abuso físico. Considerar disciplina física excesiva.',
      moderate: 'Historia de abuso físico moderado que puede requerir exploración adicional.',
      severe: 'Historia de abuso físico severo con potencial impacto en el funcionamiento actual.'
    },
    sexual_abuse: {
      none: 'No se identifican indicadores de abuso sexual en la infancia.',
      low: 'Posibles experiencias sexuales inapropiadas. Requiere evaluación cuidadosa.',
      moderate: 'Historia de abuso sexual que puede estar relacionada con síntomas actuales.',
      severe: 'Historia de abuso sexual severo. Explorar trauma y síntomas asociados.'
    },
    emotional_neglect: {
      none: 'Adecuado apoyo emocional durante la infancia.',
      low: 'Cierto grado de negligencia emocional. Explorar patrones de apego.',
      moderate: 'Negligencia emocional significativa que puede afectar la regulación emocional.',
      severe: 'Negligencia emocional severa con posible impacto en el funcionamiento interpersonal.'
    },
    physical_neglect: {
      none: 'Cuidado físico adecuado durante la infancia.',
      low: 'Algunos indicadores de negligencia física leve.',
      moderate: 'Negligencia física moderada que puede haber afectado el desarrollo.',
      severe: 'Negligencia física severa con posibles consecuencias para la salud y desarrollo.'
    }
  }
  
  return interpretations[subscale]?.[level] || ''
}

// Datos para el catálogo de escalas
export const ctqSfScaleData = {
  id: 'ctq-sf',
  fullName: 'Cuestionario de Acontecimientos Traumáticos en la Infancia - Forma Breve',
  shortName: 'CTQ-SF',
  description: 'Evaluación retrospectiva validada de cinco tipos de trauma infantil: abuso emocional, físico y sexual, negligencia emocional y física',
  questions: 28,
  duration: '5-7',
  applicationType: 'Autoaplicada',
  ageRange: 'Adolescentes tardíos y adultos (≥16 años)',
  diagnostics: ['Trauma infantil', 'Abuso', 'Negligencia', 'TEPT', 'Trauma complejo'],
  tags: ['Trauma', 'Infancia', 'Abuso', 'Negligencia', 'Retrospectivo', 'Subescalas'],
  available: true,
  icon: 'picklist-type-svgrepo-com',
  color: '#e53e3e'
}

// Información de ayuda detallada
export const ctqSfHelpInfo = {
  id: 'ctq-sf',
  title: 'CTQ-SF - Cuestionario de Acontecimientos Traumáticos en la Infancia',
  description: 'El CTQ-SF es un instrumento de autoreporte ampliamente validado para evaluar retrospectivamente cinco tipos de maltrato infantil. Es la versión breve del CTQ original de 70 ítems.',
  
  sections: {
    objetivo: {
      title: '🎯 Objetivo Principal',
      content: 'Identificar y cuantificar experiencias de trauma infantil en cinco dominios específicos, proporcionando información crucial para la conceptualización clínica y planificación del tratamiento.'
    },
    
    administracion: {
      title: '📝 Administración',
      content: [
        'Modalidad: Autoaplicada',
        'Tiempo: 5-7 minutos aproximadamente',
        'Población: Adolescentes tardíos y adultos ≥16 años',
        'Contexto: Clínico, investigación, forense',
        'Requiere: Capacidad de lectura y comprensión básica'
      ]
    },
    
    subescalas: {
      title: '📊 Subescalas del CTQ-SF',
      content: [
        '1. Abuso Emocional (5 ítems): Agresiones verbales al sentido de valía o bienestar del niño',
        '2. Abuso Físico (5 ítems): Agresiones físicas por parte de un adulto que causaron o pudieron causar lesiones',
        '3. Abuso Sexual (5 ítems): Contacto o conducta sexual entre el niño y un adulto o persona mayor',
        '4. Negligencia Emocional (5 ítems): Falta de amor, apoyo y pertenencia por parte de la familia',
        '5. Negligencia Física (5 ítems): Falta de provisión de necesidades físicas básicas',
        '6. Minimización/Negación (3 ítems): Escala de validez para detectar falsos negativos'
      ]
    },
    
    puntuacion: {
      title: '💯 Sistema de Puntuación',
      content: [
        'Escala Likert: 1 (Nunca) a 5 (Siempre)',
        'Rango por subescala clínica: 5-25 puntos',
        'Ítems invertidos: 2, 5, 7, 13, 19, 26, 28 (negligencia) y 10, 16, 22 (minimización)',
        'Puntos de corte específicos por subescala',
        'Interpretación: Ninguno/Mínimo, Leve-Moderado, Moderado-Severo, Severo-Extremo'
      ]
    },
    
    validacion: {
      title: '✅ Propiedades Psicométricas',
      content: [
        'Consistencia interna: α = 0.79-0.94 por subescala',
        'Fiabilidad test-retest: r = 0.80-0.88',
        'Validez convergente establecida con entrevistas clínicas',
        'Validación en múltiples culturas y poblaciones clínicas',
        'Sensibilidad y especificidad adecuadas para detección de trauma'
      ]
    },
    
    interpretacion: {
      title: '🔍 Interpretación Clínica',
      content: [
        'Evaluar cada subescala independientemente',
        'Considerar patrones de politraumatización',
        'Integrar con historia clínica y observación',
        'Puntuaciones altas en minimización sugieren subestimación',
        'Considerar factores culturales en la interpretación',
        'Relacionar con síntomas actuales y diagnósticos'
      ]
    },
    
    consideraciones: {
      title: '⚠️ Consideraciones Importantes',
      content: [
        'Basado en recuerdos retrospectivos (sesgo de memoria)',
        'No establece causalidad directa con psicopatología',
        'Requiere seguimiento clínico para casos positivos',
        'Sensible a deseabilidad social y minimización',
        'No reemplaza la evaluación clínica integral',
        'Considerar retraumatización durante la aplicación'
      ]
    }
  },
  
  references: [
    'Bernstein, D.P., & Fink, L. (1998). Childhood Trauma Questionnaire: A retrospective self-report manual. San Antonio, TX: The Psychological Corporation.',
    'Bernstein, D.P., et al. (2003). Development and validation of a brief screening version of the Childhood Trauma Questionnaire. Child Abuse & Neglect, 27(2), 169-190.',
    'Spinhoven, P., et al. (2014). Childhood Trauma Questionnaire: Factor structure, measurement invariance, and validity across emotional disorders. Psychological Assessment, 26(3), 717-729.'
  ]
}