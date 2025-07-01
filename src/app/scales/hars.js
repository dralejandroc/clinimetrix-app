// HARS - Escala de Hamilton para la Ansiedad
// Escala heteroaplicada de 14 ítems para evaluar severidad de síntomas de ansiedad

export const harsQuestions = [
  {
    text: 'Humor ansioso',
    description: 'Inquietud, espera de lo peor, aprensión (anticipación temerosa), irritabilidad'
  },
  {
    text: 'Tensión',
    description: 'Sensación de tensión, fatigabilidad, imposibilidad de relajarse, llanto fácil, temblor, sensación de no poder quedarse en un lugar'
  },
  {
    text: 'Miedos',
    description: 'A la oscuridad, a la gente desconocida, a quedarse solo, a los animales grandes, a las multitudes, etc.'
  },
  {
    text: 'Insomnio',
    description: 'Dificultad para conciliar el sueño, sueño interrumpido, sueño no satisfactorio con cansancio al despertar, malos sueños, pesadillas, terrores nocturnos'
  },
  {
    text: 'Funciones intelectuales',
    description: 'Dificultad de concentración, mala memoria'
  },
  {
    text: 'Humor deprimido',
    description: 'Falta de interés, no disfruta con sus pasatiempos, depresión, despertar precoz, variaciones del humor a lo largo del día'
  },
  {
    text: 'Síntomas somáticos generales (musculares)',
    description: 'Dolores y molestias musculares, rigidez muscular, sacudidas clónicas, rechinar de dientes, voz poco firme o insegura'
  },
  {
    text: 'Síntomas somáticos generales (sensoriales)',
    description: 'Zumbidos de oídos, visión borrosa, sofocos o escalofríos, sensación de debilidad, sensación de hormigueo'
  },
  {
    text: 'Síntomas cardiovasculares',
    description: 'Taquicardia, palpitaciones, dolores en el pecho, latidos vasculares, extrasístoles'
  },
  {
    text: 'Síntomas respiratorios',
    description: 'Peso en el pecho o sensación de opresión torácica, sensación de ahogo, suspiros, falta de aire'
  },
  {
    text: 'Síntomas gastrointestinales',
    description: 'Dificultad para tragar, meteorismo, dispepsia, dolor antes o después de comer, sensación de ardor, distensión abdominal, pirosis, náuseas, vómitos, sensación de estómago vacío, cólicos abdominales, borborigmos, diarrea, estreñimiento'
  },
  {
    text: 'Síntomas genitourinarios',
    description: 'Amenorrea, metrorragia, micciones frecuentes, urgencia de la micción, desarrollo de frigidez, eyaculación precoz, impotencia'
  },
  {
    text: 'Síntomas del sistema nervioso autónomo',
    description: 'Sequedad de boca, enrojecimiento, palidez, sudoración excesiva, vértigos, cefaleas de tensión, piloerección'
  },
  {
    text: 'Comportamiento durante la entrevista',
    description: 'General: El sujeto se muestra tenso, incómodo, agitación nerviosa de las manos, se frota los dedos, aprieta los puños, inestabilidad, postura cambiante, temblor de manos, ceño fruncido, facies tensa, aumento del tono muscular, respiración jadeante, palidez facial. Fisiológico: Traga saliva, eructa, taquicardia de reposo, frecuencia respiratoria superior a 20 resp./min, reflejos tendinosos vivos, temblor, dilatación pupilar, exoftalmía, mioclonías palpebrales'
  }
]

export const harsOptions = [
  { value: 0, label: 'No presente' },
  { value: 1, label: 'Intensidad ligera' },
  { value: 2, label: 'Intensidad media' },
  { value: 3, label: 'Intensidad elevada' },
  { value: 4, label: 'Intensidad máxima/incapacitante' }
]

export const calculateHarsScore = (responses = {}) => {
  let total = 0
  let psychic = 0 // Ítems 1-6, 14
  let somatic = 0 // Ítems 7-13
  
  for (let i = 0; i < 14; i++) {
    const score = responses[i] || 0
    total += score
    
    // Síntomas psíquicos (ítems 1-6 y 14)
    if (i <= 5 || i === 13) {
      psychic += score
    }
    // Síntomas somáticos (ítems 7-13)
    else if (i >= 6 && i <= 12) {
      somatic += score
    }
  }
  
  return {
    total,
    psychic,
    somatic,
    percentage: Math.round((total / 56) * 100)
  }
}

export const getHarsDetailedInterpretation = (result) => {
  const { total, psychic, somatic } = result
  
  if (total >= 24) {
    return {
      level: 'severe',
      title: 'Ansiedad Severa',
      description: `Puntuación total: ${total}/56. Síntomas ansiosos de alta intensidad que causan deterioro significativo en múltiples áreas del funcionamiento. La severidad de los síntomas indica la necesidad de intervención inmediata y seguimiento especializado.`,
      recommendations: 'Requiere intervención inmediata. Considerar tratamiento farmacológico intensivo y psicoterapia especializada. Evaluar riesgo y necesidad de seguimiento frecuente.',
      factorInterpretations: {
        psychic: psychic >= 17 ? 'Síntomas psíquicos severos: ansiedad, tensión y alteraciones del humor prominentes.' : 'Síntomas psíquicos moderados.',
        somatic: somatic >= 15 ? 'Manifestaciones somáticas severas: múltiples síntomas físicos significativos.' : 'Síntomas somáticos moderados.'
      },
      className: 'level-severe',
      color: '#f56565'
    }
  } else if (total >= 15) {
    return {
      level: 'moderate',
      title: 'Ansiedad Moderada',
      description: `Puntuación total: ${total}/56. Síntomas ansiosos de intensidad moderada que interfieren significativamente con el funcionamiento personal, social o laboral. Se requiere evaluación clínica y consideración de tratamiento específico.`,
      recommendations: 'Se recomienda intervención terapéutica específica. Evaluar necesidad de tratamiento farmacológico y psicoterapia. Seguimiento regular de síntomas.',
      factorInterpretations: {
        psychic: psychic >= 10 ? 'Síntomas psíquicos significativos que requieren atención clínica.' : 'Síntomas psíquicos dentro de rangos esperados.',
        somatic: somatic >= 8 ? 'Manifestaciones somáticas significativas de ansiedad.' : 'Síntomas somáticos dentro de rangos esperados.'
      },
      className: 'level-moderate',
      color: '#ed8936'
    }
  } else if (total >= 8) {
    return {
      level: 'mild',
      title: 'Ansiedad Leve',
      description: `Puntuación total: ${total}/56. Presencia de síntomas ansiosos de intensidad leve que pueden interferir mínimamente con el funcionamiento diario. Se beneficia de intervenciones psicoeducativas y seguimiento regular.`,
      recommendations: 'Considerar intervenciones psicoeducativas, técnicas de relajación y seguimiento regular. Evaluación de factores precipitantes y estrategias de afrontamiento.',
      factorInterpretations: {
        psychic: psychic >= 5 ? 'Síntomas psíquicos leves presentes.' : 'Síntomas psíquicos mínimos.',
        somatic: somatic >= 4 ? 'Algunos síntomas físicos de ansiedad presentes.' : 'Síntomas somáticos mínimos.'
      },
      className: 'level-mild',
      color: '#f6ad55'
    }
  } else {
    return {
      level: 'normal',
      title: 'Sin ansiedad o ansiedad muy leve',
      description: `Puntuación total: ${total}/56. Los síntomas de ansiedad están ausentes o son mínimos. El paciente presenta un funcionamiento normal en las áreas evaluadas por la escala.`,
      recommendations: 'No se requiere intervención específica para ansiedad. Mantener seguimiento rutinario y promoción de estrategias de bienestar general.',
      factorInterpretations: {
        psychic: 'Síntomas psíquicos ausentes o mínimos.',
        somatic: 'Síntomas somáticos ausentes o mínimos.'
      },
      className: 'level-normal',
      color: '#48bb78'
    }
  }
}

export const checkHarsClinicalAlerts = (responses = {}) => {
  const alerts = []
  const alertThreshold = 3 // ≥75% del máximo (3 de 4)
  
  const itemNames = [
    'Humor ansioso',
    'Tensión',
    'Miedos',
    'Insomnio',
    'Funciones intelectuales',
    'Humor deprimido',
    'Síntomas musculares',
    'Síntomas sensoriales',
    'Síntomas cardiovasculares',
    'Síntomas respiratorios',
    'Síntomas gastrointestinales',
    'Síntomas genitourinarios',
    'Síntomas del sistema nervioso autónomo',
    'Comportamiento durante la entrevista'
  ]
  
  // Revisar ítems específicos de alta preocupación
  for (let i = 0; i < 14; i++) {
    if (responses[i] && responses[i] >= alertThreshold) {
      alerts.push({
        type: 'warning',
        title: `⚠️ ${itemNames[i]} - Nivel Elevado`,
        message: `Puntuación elevada (${responses[i]}/4) en ${itemNames[i].toLowerCase()}. Requiere atención clínica específica.`,
        priority: 'high'
      })
    }
  }
  
  // Alertas específicas para síntomas cardiovasculares severos
  if (responses[8] && responses[8] >= alertThreshold) {
    alerts.push({
      type: 'critical',
      title: '⚠️ ALERTA: Síntomas Cardiovasculares Severos',
      message: 'Presencia de síntomas cardiovasculares significativos (taquicardia, palpitaciones). Considerar evaluación médica para descartar causas orgánicas.',
      priority: 'urgent'
    })
  }
  
  // Alertas para síntomas respiratorios severos
  if (responses[9] && responses[9] >= alertThreshold) {
    alerts.push({
      type: 'critical',
      title: '⚠️ ALERTA: Síntomas Respiratorios Severos',
      message: 'Presencia de síntomas respiratorios significativos. Evaluar posible componente de crisis de pánico y descartar causas médicas.',
      priority: 'urgent'
    })
  }
  
  // Múltiples síntomas somáticos severos
  const severeSomaticItems = [6, 7, 8, 9, 10, 11, 12].filter(i => responses[i] && responses[i] >= alertThreshold)
  if (severeSomaticItems.length >= 3) {
    alerts.push({
      type: 'warning',
      title: '⚠️ Múltiples Síntomas Somáticos Severos',
      message: 'Presencia de múltiples síntomas físicos severos. Se recomienda evaluación médica integral para descartar causas orgánicas.',
      priority: 'high'
    })
  }
  
  return alerts
}

// Configuración completa de la escala
export const harsConfig = {
  id: 'hars',
  name: 'HARS',
  fullName: 'Escala de Hamilton para la Ansiedad',
  description: 'Escala heteroaplicada de 14 ítems para evaluar la severidad de síntomas de ansiedad mediante entrevista clínica estructurada',
  questions: harsQuestions,
  options: harsOptions,
  maxScore: 56,
  scoreRange: '0-56',
  applicationType: 'Heteroaplicada',
  instructions: [
    'Esta es una escala heteroaplicada que debe ser administrada por un profesional',
    'Realice la entrevista en un ambiente tranquilo y privado',
    'Base su puntuación en la información de la última semana',
    'Observe al paciente durante toda la evaluación para el ítem 14',
    'Considere tanto la frecuencia como la intensidad de los síntomas'
  ],
  professionalInstructions: [
    'Para cada ítem, seleccione la puntuación que mejor refleje la severidad',
    'El ítem 14 requiere observación directa durante la entrevista',
    'Considere síntomas tanto psíquicos como somáticos',
    'La escala total puede oscilar entre 0-56 puntos'
  ],
  timeEstimate: '15-20 minutos',
  calculateScore: calculateHarsScore,
  getInterpretation: getHarsDetailedInterpretation,
  checkAlerts: checkHarsClinicalAlerts,
  factors: {
    psychic: { name: 'Síntomas Psíquicos', maxScore: 28 },
    somatic: { name: 'Síntomas Somáticos', maxScore: 28 }
  }
}

// Datos para el catálogo de escalas
export const harsScaleData = {
  id: 'hars',
  fullName: 'Escala de Hamilton para la Ansiedad',
  shortName: 'HARS',
  description: 'Escala heteroaplicada de 14 ítems para evaluar la severidad de síntomas de ansiedad mediante entrevista clínica estructurada.',
  questions: 14,
  duration: '15-20',
  applicationType: 'Heteroaplicada',
  ageRange: 'Adolescentes y adultos',
  diagnostics: ['Ansiedad'],
  tags: ['Ansiedad', 'Hamilton', 'Heteroaplicada', 'Clínica'],
  available: true,
  icon: 'brain',
  color: '#f59e0b'
}

// Información de ayuda
export const harsHelpInfo = {
  purpose: "La HARS evalúa la severidad de síntomas de ansiedad mediante entrevista clínica estructurada, diferenciando entre síntomas psíquicos y somáticos.",
  scoring: {
    method: "Suma de 14 ítems (0-4 puntos cada uno)",
    ranges: [
      { range: "0-7", severity: "Sin ansiedad o muy leve", color: "#22c55e" },
      { range: "8-14", severity: "Ansiedad leve", color: "#eab308" },
      { range: "15-23", severity: "Ansiedad moderada", color: "#f97316" },
      { range: "≥24", severity: "Ansiedad severa", color: "#dc2626" }
    ]
  },
  clinical_considerations: [
    "Requiere entrevista clínica estructurada por profesional entrenado",
    "El ítem 14 requiere observación directa durante la entrevista",
    "Útil para monitoreo de respuesta a tratamiento ansiolítico",
    "Diferencia entre síntomas psíquicos (ítems 1-6, 14) y somáticos (ítems 7-13)"
  ],
  limitations: [
    "Requiere tiempo considerable de aplicación (15-20 minutos)",
    "Depende de la habilidad del entrevistador",
    "Puede confundirse con síntomas de otras condiciones médicas"
  ],
  references: "Hamilton (1959). British Journal of Medical Psychology"
}