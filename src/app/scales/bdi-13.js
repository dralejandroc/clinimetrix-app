// BDI-13 - Beck Depression Inventory-13 (Versión Abreviada)
// Inventario de Depresión de Beck versión corta de 13 ítems

export const bdi13Questions = [
  {
    id: 1,
    text: 'Estado de ánimo',
    type: 'multiple_statements',
    statements: [
      'No me encuentro triste',
      'Me siento triste o melancólico',
      'Constantemente estoy melancólico o triste y no puedo superarlo',
      'Me siento tan triste o infeliz que no puedo resistirlo'
    ]
  },
  {
    id: 2,
    text: 'Pesimismo',
    type: 'multiple_statements',
    statements: [
      'No soy particularmente pesimista y no me encuentro desalentado respecto al futuro',
      'Me siento desanimado respecto al futuro',
      'No tengo nada que esperar del futuro',
      'No tengo ninguna esperanza en el futuro y creo que las cosas no pueden mejorar'
    ]
  },
  {
    id: 3,
    text: 'Sentimiento de fracaso',
    type: 'multiple_statements',
    statements: [
      'No me siento fracasado',
      'Creo que he fracasado más que la mayoría de las personas',
      'Cuando miro hacia atrás en mi vida, todo lo que veo son un montón de fracasos',
      'Creo que como persona soy un completo fracaso (como padre, marido, esposa etc)'
    ]
  },
  {
    id: 4,
    text: 'Insatisfacción',
    type: 'multiple_statements',
    statements: [
      'No estoy particularmente descontento',
      'No disfruto de las cosas como antes',
      'No encuentro satisfacción en nada',
      'Me siento descontento de todo'
    ]
  },
  {
    id: 5,
    text: 'Sentimientos de culpa',
    type: 'multiple_statements',
    statements: [
      'No me siento particularmente culpable',
      'Me siento malo o indigno muchas veces',
      'Me siento culpable',
      'Pienso que soy muy malo e indigno'
    ]
  },
  {
    id: 6,
    text: 'Autodesprecio',
    type: 'multiple_statements',
    statements: [
      'No me siento decepcionado conmigo mismo',
      'Estoy decepcionado conmigo mismo',
      'Estoy disgustado conmigo mismo',
      'Me odio'
    ]
  },
  {
    id: 7,
    text: 'Ideas suicidas',
    type: 'multiple_statements',
    statements: [
      'No tengo pensamientos de dañarme',
      'Creo que estaría mejor muerto',
      'Tengo planes precisos para suicidarme',
      'Me mataría si tuviera la oportunidad'
    ]
  },
  {
    id: 8,
    text: 'Aislamiento social',
    type: 'multiple_statements',
    statements: [
      'No he perdido el interés por los demás',
      'Estoy menos interesado en los demás que antes',
      'He perdido la mayor parte del interés por los demás y pienso poco en ellos',
      'He perdido todo el interés por los demás y no me importa en absoluto'
    ]
  },
  {
    id: 9,
    text: 'Indecisión',
    type: 'multiple_statements',
    statements: [
      'Tomo mis decisiones con la misma facilidad que antes',
      'Trato de no tener que tomar decisiones',
      'Tengo grandes dificultades para tomar decisiones',
      'Ya no puedo tomar decisiones'
    ]
  },
  {
    id: 10,
    text: 'Imagen corporal',
    type: 'multiple_statements',
    statements: [
      'No creo que mi aspecto haya empeorado',
      'Estoy preocupado porque me veo viejo y poco atractivo',
      'Creo que mi aspecto empeora constantemente quitándome atractivo',
      'Siento que mi aspecto es feo y repulsivo'
    ]
  },
  {
    id: 11,
    text: 'Capacidad laboral',
    type: 'multiple_statements',
    statements: [
      'Puedo trabajar igual de bien que antes',
      'Me cuesta un esfuerzo especial comenzar a hacer algo',
      'Debo esforzarme mucho para hacer cualquier cosa',
      'No puedo realizar ningún trabajo'
    ]
  },
  {
    id: 12,
    text: 'Fatiga',
    type: 'multiple_statements',
    statements: [
      'No me canso más que antes',
      'Me canso más fácilmente que antes',
      'Me canso por cualquier cosa',
      'Me canso demasiado por hacer cualquier cosa'
    ]
  },
  {
    id: 13,
    text: 'Pérdida de apetito',
    type: 'multiple_statements',
    statements: [
      'Mi apetito es normal (igual que antes)',
      'Mi apetito no es tan bueno como antes (subió o bajó)',
      'Mi apetito es ahora mucho peor (bajó mucho o subió mucho)',
      'He perdido el apetito por completo (no como nada o como cada que tengo oportunidad)'
    ]
  }
]

// Las opciones para cada pregunta son los valores 0, 1, 2, 3
export const bdi13Options = [
  { value: 0, label: 'Opción 1' },
  { value: 1, label: 'Opción 2' },
  { value: 2, label: 'Opción 3' },
  { value: 3, label: 'Opción 4' }
]

export const calculateBdi13Score = (responses = {}) => {
  // Suma directa de todas las respuestas (0-3 puntos por ítem)
  let totalScore = 0
  
  for (let i = 1; i <= 13; i++) {
    totalScore += responses[i] || 0
  }

  // Interpretación según rangos del BDI-13
  let interpretation = ''
  let riskLevel = ''
  let clinical = ''
  
  if (totalScore >= 0 && totalScore <= 8) {
    interpretation = 'Depresión Mínima'
    riskLevel = 'minimal'
    clinical = 'Sin sintomatología depresiva clínicamente significativa. El paciente presenta un estado de ánimo dentro de parámetros normales.'
  } else if (totalScore >= 9 && totalScore <= 12) {
    interpretation = 'Depresión Leve'
    riskLevel = 'mild'
    clinical = 'Sintomatología depresiva leve. Los síntomas están presentes pero no cumplen criterios para episodio depresivo mayor. Posible trastorno adaptativo con estado de ánimo deprimido.'
  } else if (totalScore >= 13 && totalScore <= 20) {
    interpretation = 'Depresión Moderada'
    riskLevel = 'moderate'
    clinical = 'Presencia de sintomatología depresiva moderada. Probable episodio depresivo mayor. Los síntomas interfieren significativamente con el funcionamiento social, laboral o en otras áreas importantes.'
  } else {
    interpretation = 'Depresión Grave'
    riskLevel = 'severe'
    clinical = 'Episodio depresivo mayor grave. Los síntomas son severos e interfieren marcadamente con el funcionamiento. Alto riesgo de deterioro funcional y posibles ideas suicidas.'
  }

  return {
    totalScore,
    maxScore: 39,
    interpretation,
    riskLevel,
    clinical,
    details: {
      range: totalScore >= 0 && totalScore <= 8 ? '0-8' :
             totalScore >= 9 && totalScore <= 12 ? '9-12' :
             totalScore >= 13 && totalScore <= 20 ? '13-20' : '21-39'
    }
  }
}

export const bdi13Config = {
  id: 'bdi-13',
  name: 'BDI-13',
  fullName: 'Beck Depression Inventory-13',
  shortName: 'BDI-13',
  description: 'Versión abreviada del Inventario de Depresión de Beck de aplicación rápida para evaluación de síntomas depresivos',
  version: '1.0',
  author: 'Aaron T. Beck',
  
  // Configuración de la escala
  type: 'autoaplicada',
  duration: '3-5',
  questions: bdi13Questions,
  totalQuestions: 13,
  
  // Función para obtener opciones (en este caso son las declaraciones de cada ítem)
  getQuestionOptions: (questionNumber) => {
    const question = bdi13Questions.find(q => q.id === questionNumber)
    if (!question) return []
    
    return question.statements.map((statement, index) => ({
      value: index,
      label: statement
    }))
  },
  
  // Función de cálculo
  calculateScore: calculateBdi13Score,
  
  // Interpretación clínica detallada
  getDetailedInterpretation: (responses) => {
    const result = calculateBdi13Score(responses)
    
    let description = ''
    let recommendations = []
    
    if (result.riskLevel === 'minimal') {
      description = 'Las puntuaciones en este rango indican síntomas depresivos mínimos o ausentes. Los síntomas presentes no interfieren significativamente con el funcionamiento diario.'
      recommendations = [
        'Mantener hábitos saludables actuales',
        'Continuar con estrategias de autocuidado',
        'Reevaluación periódica si existe antecedente de depresión'
      ]
    } else if (result.riskLevel === 'mild') {
      description = 'Presencia de síntomas depresivos leves que pueden interferir ocasionalmente con el funcionamiento diario. Se requiere evaluación clínica adicional.'
      recommendations = [
        'Evaluación clínica integral para descartar episodio depresivo',
        'Implementar estrategias de autocuidado y manejo del estrés',
        'Considerar psicoterapia de apoyo',
        'Seguimiento en 2-4 semanas'
      ]
    } else if (result.riskLevel === 'moderate') {
      description = 'Sintomatología depresiva moderada que interfiere de manera significativa con el funcionamiento diario. Se requiere intervención terapéutica estructurada.'
      recommendations = [
        'Evaluación diagnóstica completa para episodio depresivo mayor',
        'Iniciar psicoterapia estructurada (TCC, TIP)',
        'Considerar evaluación para tratamiento farmacológico',
        'Seguimiento semanal inicialmente'
      ]
    } else {
      description = 'Sintomatología depresiva grave que interfiere severamente con el funcionamiento diario. Se requiere intervención inmediata y seguimiento especializado.'
      recommendations = [
        'Evaluación psiquiátrica urgente',
        'Considerar hospitalización si hay riesgo suicida',
        'Tratamiento farmacológico y psicoterapéutico combinado',
        'Seguimiento estrecho y frecuente',
        'Evaluar red de apoyo familiar y social'
      ]
    }
    
    return {
      interpretation: result.clinical,
      description,
      recommendations
    }
  },
  
  // Alertas críticas
  getAlerts: (responses) => {
    const alerts = []
    
    // Alerta crítica por ideación suicida (ítem 7)
    if (responses[7] >= 2) {
      alerts.push({
        type: 'critical',
        message: 'ALERTA CRÍTICA: Riesgo suicida identificado. Evaluación inmediata requerida.'
      })
    } else if (responses[7] === 1) {
      alerts.push({
        type: 'warning',
        message: 'ALERTA: Pensamientos de muerte detectados. Requiere evaluación clínica.'
      })
    }
    
    // Ítems de atención clínica (≥66% del máximo = 2 o 3 puntos)
    const highRiskItems = []
    for (let i = 1; i <= 13; i++) {
      const score = responses[i] || 0
      if (score >= 2) {
        const question = bdi13Questions.find(q => q.id === i)
        highRiskItems.push({
          number: i,
          title: question?.text || `Ítem ${i}`,
          score: score,
          maxScore: 3
        })
      }
    }
    
    if (highRiskItems.length > 0) {
      alerts.push({
        type: 'warning',
        message: `Ítems de atención clínica: ${highRiskItems.map(item => `${item.title} (${item.score}/3)`).join(', ')}`
      })
    }
    
    return alerts
  },

  // Instrucciones especiales para el paciente
  patientInstructions: {
    title: 'Instrucciones para el BDI-13',
    content: [
      '📋 Este cuestionario consiste en 13 grupos de afirmaciones',
      '👁️ Por favor, lea atentamente cada grupo completo antes de realizar su elección',
      '✅ Seleccione UNA afirmación de cada grupo que mejor describa cómo se ha sentido actualmente',
      '📊 Si varias afirmaciones del mismo grupo le parecen aplicables, seleccione la que indique el mayor grado de intensidad',
      '🔍 Asegúrese de leer todas las afirmaciones de cada grupo antes de hacer su elección',
      '⏱️ Tardará aproximadamente 3-5 minutos en completarlo'
    ]
  }
}

// Datos para el catálogo de escalas
export const bdi13ScaleData = {
  id: 'bdi-13',
  fullName: 'Beck Depression Inventory-13',
  shortName: 'BDI-13',
  description: 'Versión abreviada del Inventario de Depresión de Beck de aplicación rápida para evaluación de síntomas depresivos con sistema de puntuación simplificado',
  questions: 13,
  duration: '3-5',
  applicationType: 'Autoaplicada',
  ageRange: 'Adolescentes y adultos (≥13 años)',
  diagnostics: ['Depresión', 'Trastornos del estado de ánimo'],
  tags: ['Depresión', 'Beck', 'Screening', 'Versión corta'],
  available: true,
  icon: 'picklist-type-svgrepo-com',
  color: '#3b82f6'
}

// Información de ayuda detallada
export const bdi13HelpInfo = {
  id: 'bdi-13',
  title: 'BDI-13 - Inventario de Depresión de Beck (Versión Abreviada)',
  description: 'El BDI-13 es una versión abreviada del Beck Depression Inventory que mantiene las propiedades psicométricas del instrumento original con un formato más breve y aplicación más rápida.',
  
  sections: {
    objetivo: {
      title: '🎯 Objetivo',
      content: 'Evaluación rápida de la gravedad de síntomas depresivos en adolescentes y adultos, utilizando un formato abreviado que mantiene la sensibilidad diagnóstica del BDI original.'
    },
    
    administracion: {
      title: '📝 Administración',
      content: [
        'Modalidad: Autoaplicada',
        'Tiempo: 3-5 minutos',
        'Población: Adolescentes y adultos ≥13 años',
        'Contexto: Atención primaria, especializada, investigación'
      ]
    },
    
    puntuacion: {
      title: '📊 Puntuación',
      content: [
        'Rango total: 0-39 puntos',
        'Sistema uniforme: 0-1-2-3 puntos por ítem',
        'Sin subescalas (puntuación total únicamente)',
        'Fácil cálculo: suma directa de todos los ítems'
      ]
    },
    
    interpretacion: {
      title: '🔍 Interpretación',
      content: [
        '0-8 puntos: Depresión Mínima',
        '9-12 puntos: Depresión Leve',
        '13-20 puntos: Depresión Moderada',
        '21-39 puntos: Depresión Grave',
        '',
        'Nota: Cualquier puntuación ≥2 en ítem 7 (ideas suicidas) requiere evaluación inmediata'
      ]
    },
    
    validacion: {
      title: '✅ Validación',
      content: [
        'Derivado del BDI-21 original validado',
        'Mantiene alta correlación con la versión completa (r > 0.90)',
        'Consistencia interna: α = 0.85-0.92',
        'Sensibilidad y especificidad comparables al BDI-21',
        'Validado en múltiples poblaciones clínicas'
      ]
    },
    
    ventajas: {
      title: '✨ Ventajas del BDI-13',
      content: [
        'Aplicación más rápida (50% menos tiempo)',
        'Menor fatiga del paciente',
        'Sistema de puntuación simplificado',
        'Mantiene sensibilidad diagnóstica',
        'Ideal para seguimiento frecuente',
        'Reducción de carga administrativa'
      ]
    },
    
    limitaciones: {
      title: '⚠️ Consideraciones',
      content: [
        'No reemplaza la evaluación clínica completa',
        'Menor detalle que la versión de 21 ítems',
        'Requiere honestidad del paciente',
        'No evalúa todos los criterios diagnósticos DSM-5'
      ]
    }
  },
  
  references: [
    'Beck, A.T., & Steer, R.A. (1993). Beck Depression Inventory Manual. San Antonio, TX: Psychological Corporation.',
    'Beck, A.T., Steer, R.A., & Brown, G.K. (1996). Manual for the Beck Depression Inventory-II. San Antonio, TX: Psychological Corporation.',
    'Segal, D.L., et al. (2008). Diagnostic efficiency of the Beck Depression Inventory-II for older adult psychiatric outpatients. Assessment, 15(4), 531-541.'
  ]
}