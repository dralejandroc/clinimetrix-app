// Beck-21 - Inventario de Depresión de Beck (versión larga)
// Evaluación de síntomas depresivos con subescalas específicas

// Definición de ítems por subescala
export const cognitiveItems = [2, 3, 6, 8, 13] // Pesimismo, fracaso, castigo, autoacusación, indecisión
export const affectiveItems = [1, 4, 5, 7, 9, 10, 11, 12] // Estado ánimo, insatisfacción, culpa, odio, suicidio, llanto, irritabilidad, aislamiento
export const somaticItems = [14, 17, 20] // Imagen corporal, cansancio, hipocondria
export const vegetativeItems = [15, 16, 18, 19, 21] // Capacidad laboral, sueño, apetito, peso, libido

// Preguntas con múltiples afirmaciones y scoring no lineal
export const beck21Questions = [
  {
    id: 1,
    title: 'Estado de ánimo',
    type: 'multiple-statements',
    statements: [
      { text: 'NO me encuentro triste', value: 0 },
      { text: 'Me siento algo triste y deprimido', value: 1 },
      { text: 'Esta tristeza me produce verdaderos sufrimientos', value: 2 },
      { text: 'Tengo SIEMPRE como una pena encima que no me la puedo quitar', value: 2 },
      { text: 'Ya no puedo soportar esta pena', value: 3 }
    ]
  },
  {
    id: 2,
    title: 'Pesimismo',
    type: 'multiple-statements',
    statements: [
      { text: 'No soy especialmente pesimista, ni creo que las cosas me vayan a ir mal', value: 0 },
      { text: 'Me siento desanimado cuando pienso en el futuro', value: 1 },
      { text: 'Creo que nunca me recuperaré de mis penas', value: 2 },
      { text: 'NO espero nada bueno de la vida', value: 2 },
      { text: 'No espero nada. Esto NO tiene remedio', value: 3 }
    ]
  },
  {
    id: 3,
    title: 'Sentimiento de fracaso',
    type: 'multiple-statements',
    statements: [
      { text: 'NO me considero fracasado', value: 0 },
      { text: 'He tenido MÁS fracasos que la mayoría de la gente', value: 1 },
      { text: 'Siento que he hecho pocas cosas que valgan la pena', value: 2 },
      { text: 'Veo mi vida LLENA de fracasos', value: 2 },
      { text: 'He fracasado TOTALMENTE como persona (padre, madre, marido, hijo, profesional, etc.)', value: 3 }
    ]
  },
  {
    id: 4,
    title: 'Insatisfacción',
    type: 'multiple-statements',
    statements: [
      { text: 'NO estoy especialmente insatisfecho', value: 0 },
      { text: 'Me encuentro insatisfecho conmigo mismo', value: 1 },
      { text: 'Ya NO me divierte lo que antes me divertía', value: 1 },
      { text: 'Ya nada me llena', value: 2 },
      { text: 'Estoy HARTO de todo', value: 3 }
    ]
  },
  {
    id: 5,
    title: 'Sentimientos de culpa',
    type: 'multiple-statements',
    statements: [
      { text: 'NO me siento culpable', value: 0 },
      { text: 'A VECES me siento despreciable y mala persona', value: 1 },
      { text: 'Me siento bastante culpable', value: 2 },
      { text: 'Me siento prácticamente todo el tiempo MALA PERSONA y despreciable', value: 2 },
      { text: 'Me siento muy infame (perverso, canalla) y despreciable', value: 3 }
    ]
  },
  {
    id: 6,
    title: 'Sentimiento de castigo',
    type: 'multiple-statements',
    statements: [
      { text: 'NO pienso que esté siendo castigado', value: 0 },
      { text: 'Presiento que algo malo me puede suceder', value: 1 },
      { text: 'Siento que me están castigando o me castigarán', value: 2 },
      { text: 'Siento que MEREZCO ser castigado', value: 3 },
      { text: 'QUIERO que me castiguen', value: 3 }
    ]
  },
  {
    id: 7,
    title: 'Odio a sí mismo',
    type: 'multiple-statements',
    statements: [
      { text: 'Estoy satisfecho de mí mismo', value: 0 },
      { text: 'Estoy descontento conmigo mismo', value: 1 },
      { text: 'NO me aprecio', value: 1 },
      { text: 'Me odio (me desprecio)', value: 2 },
      { text: 'Estoy asqueado de mí', value: 2 }
    ]
  },
  {
    id: 8,
    title: 'Autoacusación',
    type: 'multiple-statements',
    statements: [
      { text: 'NO creo ser peor que otros', value: 0 },
      { text: 'Me critico mucho a causa de mis debilidades y errores', value: 1 },
      { text: 'Me acuso a mí mismo de todo lo que va mal', value: 2 },
      { text: 'Siento que tengo MUCHOS y muy graves defectos', value: 2 },
      { text: 'Me siento culpable de TODO lo malo que ocurre', value: 3 }
    ]
  },
  {
    id: 9,
    title: 'Impulsos suicidas',
    type: 'multiple-statements',
    statements: [
      { text: 'NO tengo pensamientos de hacerme daño', value: 0 },
      { text: 'Tengo pensamientos de hacerme daño, pero NO llegaría a hacerlo', value: 1 },
      { text: 'Siento que estaría mejor muerto', value: 2 },
      { text: 'Siento que mi familia estaría mejor si yo muriera', value: 2 },
      { text: 'Me mataría si pudiera', value: 2 },
      { text: 'Tengo planes decididos de SUICIDARME', value: 3 }
    ]
  },
  {
    id: 10,
    title: 'Períodos de llanto',
    type: 'multiple-statements',
    statements: [
      { text: 'NO lloro más de lo habitual', value: 0 },
      { text: 'Ahora lloro MÁS de lo normal', value: 1 },
      { text: 'Ahora lloro CONTINUAMENTE. No puedo evitarlo', value: 2 },
      { text: 'Antes podía llorar; ahora no lloro aunque me sienta MUY mal', value: 3 }
    ]
  },
  {
    id: 11,
    title: 'Irritabilidad',
    type: 'multiple-statements',
    statements: [
      { text: 'NO estoy más irritable que normalmente', value: 0 },
      { text: 'Me irrito con más facilidad que antes', value: 1 },
      { text: 'Ya no me irrita lo que antes me irritaba', value: 1 },
      { text: 'Me siento irritado todo el tiempo', value: 3 }
    ]
  },
  {
    id: 12,
    title: 'Aislamiento social',
    type: 'multiple-statements',
    statements: [
      { text: 'NO he perdido mi interés por los demás', value: 0 },
      { text: 'Me intereso por la gente MENOS que antes', value: 1 },
      { text: 'He perdido casi todo mi interés por los demás y apenas tengo sentimientos hacia ellos', value: 2 },
      { text: 'He perdido TODO mi interés por los demás y no me importan en absoluto', value: 3 }
    ]
  },
  {
    id: 13,
    title: 'Indecisión',
    type: 'multiple-statements',
    statements: [
      { text: 'Tomo mis decisiones igual como siempre', value: 0 },
      { text: 'Ahora estoy inseguro de mí mismo y procuro evitar tomar decisiones', value: 1 },
      { text: 'NO puedo tomar decisiones SIN ayuda', value: 2 },
      { text: 'Ya NO puedo tomar decisiones en absoluto', value: 3 }
    ]
  },
  {
    id: 14,
    title: 'Imagen corporal',
    type: 'multiple-statements',
    statements: [
      { text: 'NO me siento con peor aspecto que antes', value: 0 },
      { text: 'Estoy preocupado porque me veo viejo y desmejorado', value: 1 },
      { text: 'Siento que hay cambios en mi aspecto físico que me hacen parecer DESAGRADABLE (o menos atractivo)', value: 2 },
      { text: 'Me siento feo y repulsivo', value: 3 }
    ]
  },
  {
    id: 15,
    title: 'Capacidad laboral',
    type: 'multiple-statements',
    statements: [
      { text: 'Puedo trabajar tan bien como antes', value: 0 },
      { text: 'Tengo que esforzarme mucho MAS para hacer cualquier cosa', value: 1 },
      { text: 'NO trabajo tan bien como lo hacía antes', value: 1 },
      { text: 'Necesito un esfuerzo extra para empezar a hacer algo', value: 2 },
      { text: 'NO puedo trabajar en nada', value: 3 }
    ]
  },
  {
    id: 16,
    title: 'Trastornos del sueño',
    type: 'multiple-statements',
    statements: [
      { text: 'Duermo tan bien como antes', value: 0 },
      { text: 'Me despierto MÁS cansado por la mañana', value: 1 },
      { text: 'Me despierto unas 2 horas antes de lo normal y me resulta difícil volver a dormir', value: 2 },
      { text: 'Tardo 1 o 2 horas en dormirme por la noche', value: 2 },
      { text: 'Me despierto sin motivo en mitad de la noche y tardo en volver a dormirme', value: 2 },
      { text: 'Me despierto temprano todos los días y NO duermo más de 5 horas', value: 3 },
      { text: 'Tardo más de 2 horas en dormirme y NO duermo más de 5 horas', value: 3 },
      { text: 'NO logro dormir MÁS de 3 o 4 horas seguidas', value: 3 }
    ]
  },
  {
    id: 17,
    title: 'Cansancio',
    type: 'multiple-statements',
    statements: [
      { text: 'NO me canso más de lo normal', value: 0 },
      { text: 'Me canso MÁS fácilmente que antes', value: 1 },
      { text: 'Cualquier cosa que hago me fatiga', value: 2 },
      { text: 'Me canso tanto que NO PUEDO hacer nada', value: 3 }
    ]
  },
  {
    id: 18,
    title: 'Pérdida de apetito',
    type: 'multiple-statements',
    statements: [
      { text: 'Tengo el mismo apetito de siempre', value: 0 },
      { text: 'Mi apetito NO es tan bueno como antes', value: 1 },
      { text: 'Mi apetito es ahora MUCHO menor', value: 2 },
      { text: 'He perdido TOTALMENTE el apetito', value: 3 }
    ]
  },
  {
    id: 19,
    title: 'Pérdida de peso',
    type: 'multiple-statements',
    statements: [
      { text: 'NO he perdido peso últimamente', value: 0 },
      { text: 'He perdido MÁS de 2,5 kg', value: 1 },
      { text: 'He perdido MÁS de 5 kg', value: 2 },
      { text: 'He perdido MÁS de 7,5 kg', value: 3 }
    ]
  },
  {
    id: 20,
    title: 'Hipocondria',
    type: 'multiple-statements',
    statements: [
      { text: 'NO me preocupa mi salud más de lo normal', value: 0 },
      { text: 'Estoy preocupado por dolores y trastornos', value: 1 },
      { text: 'Estoy TAN preocupado por mi salud que me es difícil pensar en otras cosas', value: 2 },
      { text: 'Estoy CONSTANTEMENTE pendiente de lo que me sucede y de cómo me encuentro', value: 3 }
    ]
  },
  {
    id: 21,
    title: 'Libido',
    type: 'multiple-statements',
    statements: [
      { text: 'NO he notado ningún cambio en mi atracción por el sexo', value: 0 },
      { text: 'Estoy MENOS interesado por el sexo que antes', value: 1 },
      { text: 'Apenas me siento atraído sexualmente', value: 2 },
      { text: 'He perdido TODO mi interés por el sexo', value: 3 }
    ]
  }
]

// Análisis específico de patrones de sueño
export const sleepPatterns = [
  {
    type: "Sin alteraciones del sueño",
    description: "No se identifican trastornos del sueño significativos. El patrón de sueño se mantiene dentro de parámetros normales.",
    clinical: "No requiere intervención específica para trastornos del sueño."
  },
  {
    type: "Sueño no reparador",
    description: "Se presenta fatiga matutina a pesar de horas de sueño aparentemente adecuadas.",
    clinical: "Evaluar higiene del sueño, descartar trastornos respiratorios del sueño."
  },
  {
    type: "Despertar precoz clásico",
    description: "Despertar temprano con incapacidad para retomar el sueño. Característico de depresión mayor.",
    clinical: "Altamente asociado con depresión mayor. Considerar tratamiento antidepresivo."
  },
  {
    type: "Insomnio de conciliación",
    description: "Dificultad para iniciar el sueño con latencia prolongada (1-2 horas).",
    clinical: "Técnicas de relajación, higiene del sueño, manejo de ansiedad."
  },
  {
    type: "Insomnio de mantenimiento",
    description: "Despertares frecuentes durante la noche con dificultad para retomar el sueño.",
    clinical: "Evaluar causas médicas. Considerar tratamiento farmacológico."
  },
  {
    type: "Despertar precoz severo",
    description: "Despertar temprano con reducción severa del tiempo total de sueño (≤5 horas).",
    clinical: "Intervención prioritaria. Tratamiento antidepresivo indicado."
  },
  {
    type: "Insomnio de conciliación severo",
    description: "Latencia extremadamente prolongada (>2h) con tiempo total reducido (≤5h).",
    clinical: "Requiere evaluación multidisciplinaria urgente."
  },
  {
    type: "Insomnio total/Global",
    description: "Sueño severamente fragmentado con incapacidad para mantener períodos continuos.",
    clinical: "Urgencia terapéutica. Evaluación inmediata de causas subyacentes."
  }
]

export const calculateBeck21Score = (responses = {}) => {
  let totalScore = 0
  let cognitiveScore = 0
  let affectiveScore = 0
  let somaticScore = 0
  let vegetativeScore = 0

  // Calcular puntuaciones por subescalas
  for (let i = 1; i <= 21; i++) {
    const score = responses[i] || 0
    totalScore += score

    if (cognitiveItems.includes(i)) {
      cognitiveScore += score
    } else if (affectiveItems.includes(i)) {
      affectiveScore += score
    } else if (somaticItems.includes(i)) {
      somaticScore += score
    } else if (vegetativeItems.includes(i)) {
      vegetativeScore += score
    }
  }

  return {
    totalScore,
    cognitiveScore,
    affectiveScore,
    somaticScore,
    vegetativeScore,
    maxTotal: 63, // 21 items × 3 puntos max
    maxCognitive: 15, // 5 items × 3 puntos max
    maxAffective: 24, // 8 items × 3 puntos max
    maxSomatic: 9, // 3 items × 3 puntos max
    maxVegetative: 15, // 5 items × 3 puntos max
    completedQuestions: Object.keys(responses).length,
    totalQuestions: 21
  }
}

export const getBeck21SeverityLevel = (totalScore) => {
  if (totalScore <= 9) {
    return {
      level: 'Sin depresión',
      class: 'severity-minimal',
      color: '#48bb78'
    }
  } else if (totalScore <= 18) {
    return {
      level: 'Depresión leve',
      class: 'severity-mild',
      color: '#f6ad55'
    }
  } else if (totalScore <= 29) {
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

export const getBeck21DetailedInterpretation = (result) => {
  const { totalScore, cognitiveScore, affectiveScore, somaticScore, vegetativeScore } = result
  const severity = getBeck21SeverityLevel(totalScore)

  let interpretation = ''
  let recommendations = []

  switch (severity.level) {
    case 'Sin depresión':
      interpretation = 'La puntuación indica ausencia de sintomatología depresiva clínicamente significativa. El paciente presenta un funcionamiento emocional dentro de parámetros normales.'
      recommendations = [
        'Mantener estrategias de bienestar actual',
        'Continuar con actividades preventivas de salud mental',
        'Monitoreo rutinario en seguimientos regulares'
      ]
      break

    case 'Depresión leve':
      interpretation = 'Se evidencia presencia de sintomatología depresiva de intensidad leve. Los síntomas pueden estar relacionados con factores situacionales o estresores específicos.'
      recommendations = [
        'Evaluación de factores precipitantes',
        'Considerar intervenciones psicoeducativas',
        'Estrategias de manejo del estrés',
        'Monitoreo periódico para prevenir escalamiento'
      ]
      break

    case 'Depresión moderada':
      interpretation = 'La puntuación indica sintomatología depresiva de intensidad moderada que requiere intervención clínica. Los síntomas interfieren significativamente con el funcionamiento diario.'
      recommendations = [
        'Intervención psicoterapéutica estructurada',
        'Evaluación de tratamiento farmacológico',
        'Evaluación de riesgo suicida',
        'Seguimiento clínico regular',
        'Evaluación de apoyo psicosocial'
      ]
      break

    case 'Depresión grave':
      interpretation = 'La puntuación indica sintomatología depresiva severa que requiere intervención clínica inmediata. Existe alto riesgo de deterioro funcional significativo.'
      recommendations = [
        'Intervención clínica inmediata',
        'Evaluación prioritaria de riesgo suicida',
        'Tratamiento farmacológico combinado',
        'Seguimiento clínico intensivo',
        'Consideración de hospitalización si es necesario'
      ]
      break
  }

  // Análisis específico de subescalas
  const subscaleAnalysis = []
  
  if (cognitiveScore >= 8) { // >50% del máximo
    subscaleAnalysis.push('Síntomas cognitivos prominentes: Se observan distorsiones significativas en el procesamiento de información, pesimismo y autoevaluación negativa.')
  }
  
  if (affectiveScore >= 12) { // >50% del máximo
    subscaleAnalysis.push('Síntomas afectivos prominentes: Alteraciones significativas del estado de ánimo, con presencia de tristeza, culpa y posible ideación suicida.')
  }
  
  if (somaticScore >= 5) { // >50% del máximo
    subscaleAnalysis.push('Síntomas somáticos prominentes: Preocupaciones significativas por la imagen corporal, fatiga y síntomas físicos.')
  }
  
  if (vegetativeScore >= 8) { // >50% del máximo
    subscaleAnalysis.push('Síntomas vegetativos prominentes: Alteraciones neurovegetativas que incluyen problemas de sueño, apetito y función sexual.')
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

export const getSleepAnalysis = (responses = {}, responseDetails = {}) => {
  // Analizar el ítem 16 (trastornos del sueño)
  const sleepResponse = responses[16] || 0
  const sleepDetail = responseDetails[16]
  
  if (!sleepDetail || sleepDetail.optionIndex === undefined) {
    return {
      type: "Sin información sobre el sueño",
      description: "No se completó la evaluación del ítem de sueño.",
      clinical: "Completar evaluación para análisis específico."
    }
  }

  const optionIndex = sleepDetail.optionIndex
  return sleepPatterns[optionIndex] || sleepPatterns[0]
}

export const checkBeck21ClinicalAlerts = (responses = {}) => {
  const alerts = []

  // Alerta crítica por ideación suicida (ítem 9)
  const suicidalIdeation = responses[9] || 0
  if (suicidalIdeation >= 2) {
    alerts.push({
      type: 'critical',
      title: '🚨 ALERTA CRÍTICA: Ideación Suicida',
      message: `El paciente presenta ideación suicida con puntuación ${suicidalIdeation}/3. Requiere evaluación inmediata del riesgo suicida y protocolo de seguridad.`,
      priority: 'urgent'
    })
  } else if (suicidalIdeation === 1) {
    alerts.push({
      type: 'warning',
      title: '⚠️ Pensamientos de Autolesión',
      message: 'El paciente reporta pensamientos de hacerse daño sin intención. Requiere monitoreo y evaluación de riesgo.',
      priority: 'high'
    })
  }

  // Alerta por desesperanza severa (ítem 2)
  const hopelessness = responses[2] || 0
  if (hopelessness === 3) {
    alerts.push({
      type: 'warning',
      title: '⚠️ Desesperanza Severa',
      message: 'El paciente presenta desesperanza extrema ("No espero nada. Esto NO tiene remedio"). Factor de riesgo suicida elevado.',
      priority: 'high'
    })
  }

  // Alerta por pérdida de interés total (ítem 12)
  const socialWithdrawal = responses[12] || 0
  if (socialWithdrawal === 3) {
    alerts.push({
      type: 'warning',
      title: '⚠️ Aislamiento Social Severo',
      message: 'Pérdida total del interés por otros. Indica riesgo de deterioro funcional severo.',
      priority: 'medium'
    })
  }

  // Alerta por incapacidad laboral total (ítem 15)
  const workIncapacity = responses[15] || 0
  if (workIncapacity === 3) {
    alerts.push({
      type: 'warning',
      title: '⚠️ Incapacidad Funcional Total',
      message: 'El paciente reporta incapacidad total para trabajar. Evaluación de deterioro funcional severo.',
      priority: 'medium'
    })
  }

  // Alerta por trastornos del sueño severos (ítem 16)
  const sleepProblems = responses[16] || 0
  if (sleepProblems === 3) {
    alerts.push({
      type: 'warning',
      title: '⚠️ Trastornos del Sueño Severos',
      message: 'Trastornos del sueño graves que requieren evaluación especializada. Posible depresión mayor con síntomas melancólicos.',
      priority: 'medium'
    })
  }

  // Alerta por múltiples síntomas cognitivos elevados
  const cognitiveSymptoms = cognitiveItems.filter(item => (responses[item] || 0) >= 2).length
  if (cognitiveSymptoms >= 3) {
    alerts.push({
      type: 'warning',
      title: '⚠️ Múltiples Distorsiones Cognitivas',
      message: `Se identifican ${cognitiveSymptoms} síntomas cognitivos significativos. Candidato prioritario para terapia cognitivo-conductual.`,
      priority: 'medium'
    })
  }

  return alerts
}

export const getBeck21HighScoreItems = (responses = {}) => {
  const highItems = []
  const threshold = 2 // Puntuación ≥2 considerada elevada

  for (let i = 1; i <= 21; i++) {
    if (responses[i] !== undefined && responses[i] >= threshold) {
      const question = beck21Questions.find(q => q.id === i)
      highItems.push({
        number: i,
        title: question ? question.title : `Ítem ${i}`,
        score: responses[i],
        maxScore: 3
      })
    }
  }

  return highItems
}

// Configuración completa de la escala
export const beck21Config = {
  id: 'beck-21',
  name: 'Beck-21',
  fullName: 'Inventario de Depresión de Beck (versión larga)',
  description: 'Evaluación integral de sintomatología depresiva con 4 subescalas específicas: cognitiva, afectiva, somática y vegetativa',
  applicationType: 'Autoaplicada',
  questions: beck21Questions,
  options: [], // No aplica - usa declaraciones múltiples
  maxScore: 63,
  scoreRange: 'Total: 0-63, Cognitivo: 0-15, Afectivo: 0-24, Somático: 0-9, Vegetativo: 0-15',
  instructions: [
    'Este cuestionario contiene grupos de afirmaciones',
    'Por favor, lea íntegro el grupo de afirmaciones de cada uno de los 21 apartados',
    'Escoja la afirmación de cada grupo que mejor describa el modo en que se siente en el tiempo más reciente',
    'Marque la opción que mejor refleje su situación actual',
    'No hay respuestas correctas o incorrectas. Es importante que sea honesto(a) en sus respuestas',
    'Si se ha sentido de diferente manera, haga una valoración promedio de cómo le fueron las cosas'
  ],
  timeEstimate: '10-15 minutos',
  calculateScore: calculateBeck21Score,
  getInterpretation: getBeck21DetailedInterpretation,
  checkAlerts: checkBeck21ClinicalAlerts,
  factors: {
    cognitive: { name: 'Síntomas Cognitivos', maxScore: 15, items: cognitiveItems },
    affective: { name: 'Síntomas Afectivos', maxScore: 24, items: affectiveItems },
    somatic: { name: 'Síntomas Somáticos', maxScore: 9, items: somaticItems },
    vegetative: { name: 'Síntomas Vegetativos', maxScore: 15, items: vegetativeItems }
  }
}

// Datos para el catálogo de escalas
export const beck21ScaleData = {
  id: 'beck-21',
  fullName: 'Inventario de Depresión de Beck (versión larga)',
  shortName: 'Beck-21',
  description: 'Evaluación multidimensional de síntomas depresivos con análisis específico de subescalas cognitivas, afectivas, somáticas y vegetativas.',
  questions: 21,
  duration: '10-15',
  applicationType: 'Autoaplicada',
  ageRange: 'Adolescentes, adultos y adultos mayores',
  diagnostics: ['Depresión Mayor', 'Trastornos del Estado de Ánimo', 'Evaluación de severidad'],
  tags: ['Depresión', 'Beck', 'Subescalas múltiples', 'Clásica', 'Ampliamente utilizada'],
  available: true,
  icon: 'picklist-type-svgrepo-com',
  color: '#3b82f6'
}

// Información de ayuda
export const beck21HelpInfo = {
  purpose: "El BDI-21 evalúa la severidad de síntomas depresivos mediante 21 ítems con múltiples afirmaciones, organizados en 4 subescalas específicas que permiten un análisis detallado del perfil sintomático.",
  scoring: {
    method: "Múltiples afirmaciones por ítem con scoring variable no lineal",
    ranges: [
      { range: "Total: 0-9", severity: "Sin depresión", color: "#48bb78" },
      { range: "Total: 10-18", severity: "Depresión leve", color: "#f6ad55" },
      { range: "Total: 19-29", severity: "Depresión moderada", color: "#ed8936" },
      { range: "Total: 30-63", severity: "Depresión grave", color: "#f56565" }
    ]
  },
  clinical_considerations: [
    "Incluye análisis específico de 4 subescalas diferenciadas",
    "Permite identificar perfiles sintomáticos predominantes",
    "Análisis detallado de patrones de sueño (8 categorías específicas)",
    "Detección prioritaria de ideación suicida con alertas críticas",
    "Scoring no lineal que refleja la complejidad de síntomas depresivos",
    "Útil para personalizar estrategias terapéuticas según subescalas"
  ],
  limitations: [
    "Requiere capacidad de lectura y comprensión adecuada",
    "Tiempo de aplicación mayor que escalas más breves",
    "Puede ser influenciado por el estado de ánimo actual",
    "No reemplaza la evaluación clínica estructurada",
    "Algunas afirmaciones pueden resultar ambiguas para ciertos pacientes"
  ],
  references: "Beck et al. (1996). Manual for the Beck Depression Inventory-II. Psychological Corporation."
}