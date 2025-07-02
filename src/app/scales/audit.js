// AUDIT - Alcohol Use Disorders Identification Test
// Test de Identificación de Trastornos por Consumo de Alcohol

export const auditQuestions = [
  {
    id: 1,
    text: '¿Con qué frecuencia consume alguna bebida alcohólica?'
  },
  {
    id: 2,
    text: '¿Cuántas bebidas alcohólicas suele consumir en un día de consumo normal?',
    description: 'Una bebida equivale a una Unidad de Bebida Estándar (UBE)'
  },
  {
    id: 3,
    text: '¿Con qué frecuencia toma 6 o más bebidas alcohólicas en una sola ocasión?'
  },
  {
    id: 4,
    text: '¿Con qué frecuencia en el curso del último año ha sido incapaz de parar de beber una vez había empezado?'
  },
  {
    id: 5,
    text: '¿Con qué frecuencia en el curso del último año no pudo hacer lo que se esperaba de usted porque había bebido?'
  },
  {
    id: 6,
    text: '¿Con qué frecuencia en el curso del último año ha necesitado beber en ayunas para recuperarse después de haber bebido mucho el día anterior?'
  },
  {
    id: 7,
    text: '¿Con qué frecuencia en el curso del último año ha tenido remordimientos o sentimientos de culpa después de haber bebido?'
  },
  {
    id: 8,
    text: '¿Con qué frecuencia en el curso del último año no ha podido recordar lo que sucedió la noche anterior porque había estado bebiendo?'
  },
  {
    id: 9,
    text: '¿Usted o alguna otra persona han resultado heridos porque usted había bebido?'
  },
  {
    id: 10,
    text: '¿Algún familiar, amigo, médico o profesional sanitario ha mostrado preocupación por su consumo de bebidas alcohólicas o le ha sugerido que deje de beber?'
  }
]

// Opciones estándar para preguntas 1-8
export const auditOptionsStandard = [
  { value: 0, label: 'Nunca' },
  { value: 1, label: 'Menos de una vez al mes' },
  { value: 2, label: 'Mensualmente' },
  { value: 3, label: 'Semanalmente' },
  { value: 4, label: 'A diario o casi a diario' }
]

// Opciones específicas por pregunta
export const auditOptionsSpecial = {
  // Pregunta 1: Frecuencia de consumo
  1: [
    { value: 0, label: 'Nunca' },
    { value: 1, label: 'Una o menos veces al mes' },
    { value: 2, label: 'De 2 a 4 veces al mes' },
    { value: 3, label: 'De 2 a 3 veces a la semana' },
    { value: 4, label: 'Cuatro o más veces a la semana' }
  ],
  // Pregunta 2: Cantidad por día
  2: [
    { value: 0, label: '1 o 2' },
    { value: 1, label: '3 o 4' },
    { value: 2, label: '5 o 6' },
    { value: 3, label: 'De 7 a 9' },
    { value: 4, label: '10 o más' }
  ],
  // Pregunta 3: Binge drinking
  3: [
    { value: 0, label: 'Nunca' },
    { value: 1, label: 'Menos de una vez al mes' },
    { value: 2, label: 'Mensualmente' },
    { value: 3, label: 'Semanalmente' },
    { value: 4, label: 'A diario o casi a diario' }
  ],
  // Preguntas 4-8: Usar opciones estándar
  // Pregunta 9: Lesiones
  9: [
    { value: 0, label: 'No' },
    { value: 2, label: 'Sí, pero no en el curso del último año' },
    { value: 4, label: 'Sí, el último año' }
  ],
  // Pregunta 10: Preocupación social
  10: [
    { value: 0, label: 'No' },
    { value: 2, label: 'Sí, pero no en el curso del último año' },
    { value: 4, label: 'Sí, el último año' }
  ]
}

export const calculateAuditScore = (responses = {}) => {
  let totalScore = 0
  let consumptionScore = 0
  let dependenceScore = 0
  let psychologicalScore = 0
  let socialScore = 0

  // Calcular puntajes por subescala
  for (let i = 1; i <= 10; i++) {
    const score = responses[i] || 0
    totalScore += score
    
    if (i >= 1 && i <= 3) {
      consumptionScore += score
    } else if (i >= 4 && i <= 6) {
      dependenceScore += score
    } else if (i >= 7 && i <= 8) {
      psychologicalScore += score
    } else if (i >= 9 && i <= 10) {
      socialScore += score
    }
  }

  // Interpretación general
  let interpretation = ''
  let riskLevel = ''
  if (totalScore <= 7) {
    interpretation = 'Consumo de Bajo Riesgo'
    riskLevel = 'low'
  } else if (totalScore <= 14) {
    interpretation = 'Consumo de Riesgo'
    riskLevel = 'medium'
  } else {
    interpretation = 'Consumo Problemático'
    riskLevel = 'high'
  }

  // Interpretaciones por subescala
  const subscales = {
    consumption: {
      score: consumptionScore,
      max: 12,
      name: 'Consumo de Alcohol',
      interpretation: consumptionScore <= 3 ? 'Bajo riesgo' : 
                     consumptionScore <= 6 ? 'Riesgo moderado' : 'Alto riesgo'
    },
    dependence: {
      score: dependenceScore,
      max: 12,
      name: 'Dependencia',
      interpretation: dependenceScore === 0 ? 'Sin síntomas' :
                     dependenceScore <= 3 ? 'Síntomas leves' : 'Síntomas significativos'
    },
    psychological: {
      score: psychologicalScore,
      max: 8,
      name: 'Problemas Psicológicos',
      interpretation: psychologicalScore === 0 ? 'Sin consecuencias' :
                     psychologicalScore <= 2 ? 'Consecuencias leves' : 'Consecuencias significativas'
    },
    social: {
      score: socialScore,
      max: 8,
      name: 'Problemas Sociales',
      interpretation: socialScore === 0 ? 'Sin problemas sociales' : 'Consecuencias sociales presentes'
    }
  }

  return {
    totalScore,
    maxScore: 40,
    interpretation,
    riskLevel,
    subscales,
    details: {
      consumption: consumptionScore,
      dependence: dependenceScore,
      psychological: psychologicalScore,
      social: socialScore
    }
  }
}

export const auditConfig = {
  id: 'audit',
  name: 'AUDIT',
  fullName: 'Alcohol Use Disorders Identification Test',
  shortName: 'AUDIT',
  description: 'Test de identificación de trastornos por consumo de alcohol desarrollado por la OMS',
  version: '1.0',
  author: 'Organización Mundial de la Salud (OMS)',
  
  // Configuración de la escala
  type: 'autoaplicada',
  duration: '3-5',
  questions: auditQuestions,
  totalQuestions: 10,
  
  // Función para obtener opciones por pregunta
  getQuestionOptions: (questionNumber) => {
    return auditOptionsSpecial[questionNumber] || auditOptionsStandard
  },
  
  // Función de cálculo
  calculateScore: calculateAuditScore,
  
  // Interpretación clínica detallada
  getDetailedInterpretation: (responses) => {
    const result = calculateAuditScore(responses)
    
    let clinicalInterpretation = ''
    let recommendations = []
    
    if (result.riskLevel === 'low') {
      clinicalInterpretation = 'El paciente presenta un patrón de consumo que no sugiere problemas relacionados con el alcohol. Los resultados indican que el consumo actual no constituye un factor de riesgo significativo para el desarrollo de trastornos por uso de alcohol.'
      recommendations = [
        'Mantener estrategias de consumo responsable',
        'Continuar con pautas de prevención primaria',
        'Aprovechar para reforzar hábitos saludables'
      ]
    } else if (result.riskLevel === 'medium') {
      clinicalInterpretation = 'Los resultados sugieren un patrón de consumo que incrementa el riesgo de desarrollar problemas relacionados con el alcohol. Se recomienda intervención breve para reducir el consumo y prevenir la progresión hacia patrones más problemáticos.'
      recommendations = [
        'Implementar intervención breve estructurada',
        'Establecer objetivos de reducción del consumo',
        'Seguimiento en 1-3 meses para evaluar evolución',
        'Educación sobre límites de consumo de bajo riesgo'
      ]
    } else {
      clinicalInterpretation = 'Los resultados indican un patrón de consumo altamente problemático que sugiere la posible presencia de un trastorno por uso de alcohol. Se requiere evaluación diagnóstica integral y consideración de derivación a servicios especializados en adicciones.'
      recommendations = [
        'Realizar evaluación diagnóstica completa (DSM-5/CIE-11)',
        'Considerar derivación a especialista en adicciones',
        'Evaluar necesidad de desintoxicación médica supervisada',
        'Implementar plan de tratamiento individualizado',
        'Considerar intervenciones farmacológicas si está indicado'
      ]
    }
    
    return {
      interpretation: clinicalInterpretation,
      recommendations
    }
  },
  
  // Alertas críticas
  getAlerts: (responses) => {
    const alerts = []
    
    // Alertas específicas basadas en literatura
    if (responses[4] >= 2 || responses[5] >= 2 || responses[6] >= 2) {
      alerts.push({
        type: 'warning',
        message: 'ALERTA DEPENDENCIA: Puntaje ≥2 en ítems de dependencia (4-6) requiere intervención de máxima intensidad independientemente del puntaje total'
      })
    }

    if (responses[9] === 4) {
      alerts.push({
        type: 'critical',
        message: 'ALERTA CRÍTICA: Lesiones relacionadas con alcohol en el último año - Riesgo inmediato para la seguridad'
      })
    }

    if (responses[10] === 4) {
      alerts.push({
        type: 'warning',
        message: 'ALERTA SOCIAL: Preocupación familiar/profesional reciente - Indicador de impacto social significativo'
      })
    }

    if (responses[3] >= 3) {
      alerts.push({
        type: 'warning',
        message: 'ALERTA CONSUMO EPISÓDICO: Patrón de binge drinking (≥6 bebidas) semanal o mayor frecuencia'
      })
    }

    if (responses[8] >= 2) {
      alerts.push({
        type: 'warning',
        message: 'ALERTA NEUROLÓGICA: Lagunas de memoria frecuentes - Evaluar posible daño neurológico'
      })
    }

    return alerts
  },

  // Instrucciones especiales para el paciente
  patientInstructions: {
    title: 'Instrucciones Importantes',
    content: [
      '📅 Todas las preguntas se refieren al consumo en los últimos 12 meses',
      '🍷 Una "bebida" equivale a una Unidad de Bebida Estándar (UBE):',
      '  • 🍷 1 copa de vino (100-125ml)',
      '  • 🍺 1 cerveza o caña (200-250ml)', 
      '  • 🥃 1/2 copa de destilados (whisky, ron, ginebra, etc.)',
      '✅ Responda de manera honesta y reflexiva',
      '🔒 El cuestionario es completamente confidencial',
      '⏱️ Tardará aproximadamente 3-5 minutos en completarlo'
    ]
  }
}

// Datos para el catálogo de escalas
export const auditScaleData = {
  id: 'audit',
  fullName: 'Alcohol Use Disorders Identification Test',
  shortName: 'AUDIT',
  description: 'Test de identificación de trastornos por consumo de alcohol desarrollado por la OMS para detectar consumo de riesgo, consumo perjudicial y dependencia del alcohol',
  questions: 10,
  duration: '3-5',
  applicationType: 'Autoaplicada',
  ageRange: 'Adultos (≥18 años)',
  diagnostics: ['Consumo de alcohol', 'Trastorno por uso de alcohol'],
  tags: ['Alcohol', 'Adicciones', 'OMS', 'Screening'],
  available: true,
  icon: 'medication-svgrepo-com',
  color: '#f59e0b'
}

// Información de ayuda detallada
export const auditHelpInfo = {
  id: 'audit',
  title: 'Test AUDIT - Identificación de Trastornos por Consumo de Alcohol',
  description: 'El Test AUDIT es un cuestionario de 10 ítems desarrollado por la Organización Mundial de la Salud para identificar personas con consumo de riesgo, consumo perjudicial y dependencia del alcohol.',
  
  sections: {
    objetivo: {
      title: '🎯 Objetivo',
      content: 'Detectar precozmente problemas relacionados con el consumo de alcohol en atención primaria y especializada, evaluando el patrón de consumo en los últimos 12 meses.'
    },
    
    administracion: {
      title: '📝 Administración',
      content: [
        'Modalidad: Autoaplicada',
        'Tiempo: 3-5 minutos',
        'Población: Adultos ≥18 años',
        'Contexto: Atención primaria, especializada, investigación'
      ]
    },
    
    puntuacion: {
      title: '📊 Puntuación',
      content: [
        'Rango total: 0-40 puntos',
        'Subescalas:',
        '• Consumo de Alcohol (ítems 1-3): 0-12 puntos',
        '• Dependencia (ítems 4-6): 0-12 puntos', 
        '• Problemas Psicológicos (ítems 7-8): 0-8 puntos',
        '• Problemas Sociales (ítems 9-10): 0-8 puntos'
      ]
    },
    
    interpretacion: {
      title: '🔍 Interpretación',
      content: [
        '0-7 puntos: Consumo de Bajo Riesgo',
        '8-14 puntos: Consumo de Riesgo (intervención breve)',
        '15-40 puntos: Consumo Problemático (evaluación especializada)',
        '',
        'Nota: Cualquier puntaje ≥2 en ítems 4-6 requiere atención especial independientemente del puntaje total'
      ]
    },
    
    validacion: {
      title: '✅ Validación',
      content: [
        'Validado en múltiples países y culturas',
        'Sensibilidad: 85-95% para detectar consumo problemático',
        'Especificidad: 85-90%',
        'Ampliamente utilizado en investigación y práctica clínica',
        'Traducido a más de 40 idiomas'
      ]
    },
    
    limitaciones: {
      title: '⚠️ Consideraciones',
      content: [
        'No constituye un diagnóstico por sí solo',
        'Requiere evaluación clínica complementaria',
        'Puede subestimar problemas en poblaciones específicas',
        'La honestidad del paciente es crucial para la validez'
      ]
    }
  },
  
  references: [
    'Saunders, J.B., et al. (1993). Development of the Alcohol Use Disorders Identification Test (AUDIT). Addiction, 88(6), 791-804.',
    'World Health Organization. (2001). AUDIT: The Alcohol Use Disorders Identification Test. Guidelines for use in primary care.',
    'Reinert, D.F., & Allen, J.P. (2007). The alcohol use disorders identification test: An update of research findings. Alcoholism: Clinical and Experimental Research, 31(2), 185-199.'
  ]
}