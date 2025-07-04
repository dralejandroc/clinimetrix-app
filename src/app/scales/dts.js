// DTS - Escala de Trauma de Davidson
// Evaluación de frecuencia y gravedad de síntomas de TEPT en la última semana

export const dtsQuestions = [
  {
    id: 1,
    text: '¿Ha tenido alguna vez imágenes, recuerdos o pensamientos dolorosos del acontecimiento?',
    type: 'dual_response'
  },
  {
    id: 2,
    text: '¿Ha tenido alguna vez pesadillas sobre el acontecimiento?',
    type: 'dual_response'
  },
  {
    id: 3,
    text: '¿Ha sentido que el acontecimiento estaba ocurriendo de nuevo? ¿Como si lo estuviera reviviendo?',
    type: 'dual_response'
  },
  {
    id: 4,
    text: '¿Le ha molestado alguna cosa que se lo haya recordado?',
    type: 'dual_response'
  },
  {
    id: 5,
    text: '¿Ha tenido manifestaciones físicas por recuerdos del acontecimiento? (Incluye sudores, temblores, taquicardia, disnea, náuseas o diarrea)',
    type: 'dual_response'
  },
  {
    id: 6,
    text: '¿Ha estado evitando algún pensamiento o sentimiento sobre el acontecimiento?',
    type: 'dual_response'
  },
  {
    id: 7,
    text: '¿Ha estado evitando actividades, lugares o personas que se lo recuerden?',
    type: 'dual_response'
  },
  {
    id: 8,
    text: '¿Ha sido incapaz de recordar partes importantes del acontecimiento?',
    type: 'dual_response'
  },
  {
    id: 9,
    text: '¿Ha tenido dificultad para disfrutar de las cosas?',
    type: 'dual_response'
  },
  {
    id: 10,
    text: '¿Se ha sentido distante o alejado de la gente?',
    type: 'dual_response'
  },
  {
    id: 11,
    text: '¿Ha sido incapaz de tener sentimientos de tristeza o de afecto?',
    type: 'dual_response'
  },
  {
    id: 12,
    text: '¿Ha tenido dificultad para imaginar una vida larga y cumplir sus objetivos?',
    type: 'dual_response'
  },
  {
    id: 13,
    text: '¿Ha tenido dificultad para iniciar o mantener el sueño?',
    type: 'dual_response'
  },
  {
    id: 14,
    text: '¿Ha estado irritable o ha tenido accesos de ira?',
    type: 'dual_response'
  },
  {
    id: 15,
    text: '¿Ha tenido dificultades de concentración?',
    type: 'dual_response'
  },
  {
    id: 16,
    text: '¿Se ha sentido nervioso, fácilmente distraído o ha permanecido «en guardia»?',
    type: 'dual_response'
  },
  {
    id: 17,
    text: '¿Ha estado nervioso o se ha asustado fácilmente?',
    type: 'dual_response'
  }
]

// Opciones para frecuencia
export const dtsFrequencyOptions = [
  { value: 0, text: 'Nunca', label: 'Nunca' },
  { value: 1, text: 'A veces', label: 'A veces' },
  { value: 2, text: '2-3 veces', label: '2-3 veces' },
  { value: 3, text: '4 a 6 veces', label: '4 a 6 veces' },
  { value: 4, text: 'A diario', label: 'A diario' }
]

// Opciones para gravedad
export const dtsSeverityOptions = [
  { value: 0, text: 'Nada', label: 'Nada' },
  { value: 1, text: 'Leve', label: 'Leve' },
  { value: 2, text: 'Moderado', label: 'Moderado' },
  { value: 3, text: 'Marcado', label: 'Marcado' },
  { value: 4, text: 'Extrema', label: 'Extrema' }
]

// Clusters según DSM-IV
const clusters = {
  B: {
    name: 'Reexperimentación',
    items: [1, 2, 3, 4, 5],
    description: 'Síntomas intrusivos y de reexperimentación del trauma'
  },
  C: {
    name: 'Evitación/Embotamiento',
    items: [6, 7, 8, 9, 10, 11, 12],
    description: 'Evitación persistente y embotamiento afectivo'
  },
  D: {
    name: 'Hiperactivación',
    items: [13, 14, 15, 16, 17],
    description: 'Síntomas de hiperactivación y reactividad'
  }
}

export const calculateDtsScore = (responses = {}) => {
  let frequencyTotal = 0
  let severityTotal = 0
  const clusterScores = { B: 0, C: 0, D: 0 }
  
  // Calcular puntuaciones totales y por clusters
  for (let i = 1; i <= 17; i++) {
    if (responses[i]) {
      const freq = responses[i].frequency || 0
      const sev = responses[i].severity || 0
      frequencyTotal += freq
      severityTotal += sev
      
      // Determinar a qué cluster pertenece
      for (const [clusterKey, cluster] of Object.entries(clusters)) {
        if (cluster.items.includes(i)) {
          clusterScores[clusterKey] += freq + sev
          break
        }
      }
    }
  }
  
  const totalScore = frequencyTotal + severityTotal
  
  // Interpretación según puntuación total
  let interpretation = ''
  let riskLevel = ''
  let clinical = ''
  
  if (totalScore < 10) {
    interpretation = 'Síntomas Mínimos'
    riskLevel = 'minimal'
    clinical = 'Síntomas mínimos o ausentes. Puntuación dentro del rango normal de la población general. No cumple criterios para TEPT.'
  } else if (totalScore < 25) {
    interpretation = 'Síntomas Leves'
    riskLevel = 'mild'
    clinical = 'Síntomas leves que pueden requerir monitoreo clínico. Posible estrés postraumático subclínico.'
  } else if (totalScore < 40) {
    interpretation = 'Síntomas Moderados'
    riskLevel = 'moderate'
    clinical = 'Síntomas moderados que requieren evaluación clínica detallada. Alta probabilidad de cumplir algunos criterios para TEPT.'
  } else {
    interpretation = 'Síntomas Severos - Compatible con TEPT'
    riskLevel = 'severe'
    clinical = 'Puntuación ≥40 puntos sugiere presencia de TEPT según punto de corte validado (sensibilidad 69%, especificidad 95%, precisión diagnóstica 83%).'
  }
  
  // Identificar cluster predominante
  const predominantCluster = Object.entries(clusterScores).reduce((a, b) => 
    clusterScores[a[0]] > clusterScores[b[0]] ? a : b
  )[0]
  
  return {
    frequencyScore: frequencyTotal,
    severityScore: severityTotal,
    totalScore,
    maxScore: 136,
    interpretation,
    riskLevel,
    clinical,
    clusterScores,
    predominantCluster: clusters[predominantCluster].name,
    details: {
      frequency: { score: frequencyTotal, max: 68 },
      severity: { score: severityTotal, max: 68 },
      clusters: clusterScores
    }
  }
}

export const dtsConfig = {
  id: 'dts',
  name: 'DTS',
  fullName: 'Escala de Trauma de Davidson',
  shortName: 'DTS',
  description: 'Evaluación integral de síntomas de TEPT con medición dual de frecuencia y gravedad en la última semana',
  version: '1.0',
  author: 'Davidson et al.',
  
  // Configuración de la escala
  type: 'autoaplicada',
  duration: '10-15',
  questions: dtsQuestions,
  options: dtsFrequencyOptions, // Opciones por defecto para compatibilidad con sistema genérico
  totalQuestions: 17,
  
  // Función especial para obtener opciones (dual response)
  getQuestionOptions: (questionNumber, responseType) => {
    if (responseType === 'frequency') {
      return dtsFrequencyOptions
    } else if (responseType === 'severity') {
      return dtsSeverityOptions
    }
    return []
  },
  
  // Función de cálculo
  calculateScore: calculateDtsScore,
  
  // Interpretación clínica detallada
  getDetailedInterpretation: (responses) => {
    const result = calculateDtsScore(responses)
    
    let description = ''
    let recommendations = []
    
    if (result.riskLevel === 'minimal') {
      description = 'No se observan síntomas significativos de estrés postraumático. El funcionamiento actual no sugiere presencia de TEPT.'
      recommendations = [
        'Mantener factores protectores actuales',
        'Fortalecer recursos de afrontamiento existentes',
        'Reevaluación si aparecen nuevos estresores',
        'Considerar factores de resiliencia'
      ]
    } else if (result.riskLevel === 'mild') {
      description = 'Presencia de síntomas leves de estrés postraumático. Se requiere evaluación adicional para determinar impacto funcional.'
      recommendations = [
        'Evaluación detallada del evento traumático',
        'Explorar clusters con mayor puntuación',
        'Considerar intervenciones psicoeducativas',
        'Monitoreo de evolución sintomática',
        'Evaluar funcionamiento psicosocial actual'
      ]
    } else if (result.riskLevel === 'moderate') {
      description = 'Síntomas moderados de estrés postraumático con probable interferencia en el funcionamiento. Alta probabilidad de TEPT parcial o subsindrómico.'
      recommendations = [
        'Evaluación diagnóstica completa para TEPT',
        'Priorizar intervención en cluster predominante',
        'Considerar terapia especializada en trauma',
        'Evaluar comorbilidades (depresión, ansiedad)',
        'Revisar estrategias de afrontamiento actuales'
      ]
    } else {
      description = 'Síntomas severos compatibles con TEPT según criterios de punto de corte validado. Se requiere intervención especializada inmediata.'
      recommendations = [
        'Confirmar diagnóstico de TEPT con criterios DSM-5',
        'Iniciar tratamiento especializado en trauma (TCC-Trauma, EMDR)',
        'Evaluar seguridad y riesgo suicida',
        'Considerar intervención farmacológica si indicada',
        'Establecer plan de seguridad y red de apoyo',
        'Monitoreo frecuente de síntomas'
      ]
    }
    
    // Agregar información sobre cluster predominante
    description += ` El cluster predominante es ${result.predominantCluster}.`
    
    return {
      interpretation: result.clinical,
      description,
      recommendations,
      clusterAnalysis: {
        B: `Reexperimentación: ${result.clusterScores.B} puntos`,
        C: `Evitación/Embotamiento: ${result.clusterScores.C} puntos`,
        D: `Hiperactivación: ${result.clusterScores.D} puntos`
      }
    }
  },
  
  // Alertas clínicas
  getAlerts: (responses) => {
    const alerts = []
    const result = calculateDtsScore(responses)
    
    // Alerta por puntuación total alta
    if (result.totalScore >= 40) {
      alerts.push({
        type: 'critical',
        message: 'ALERTA: Puntuación compatible con TEPT. Se requiere evaluación clínica especializada inmediata.'
      })
    }
    
    // Alerta por ítems específicos de alta gravedad
    const criticalItems = [3, 5, 12] // Reviviscencias, síntomas físicos, dificultad para imaginar futuro
    const highRiskItems = []
    
    for (const itemNum of criticalItems) {
      if (responses[itemNum]) {
        const itemScore = (responses[itemNum].frequency || 0) + (responses[itemNum].severity || 0)
        if (itemScore >= 6) { // ≥75% del máximo
          const question = dtsQuestions.find(q => q.id === itemNum)
          highRiskItems.push({
            number: itemNum,
            text: question.text,
            score: itemScore
          })
        }
      }
    }
    
    if (highRiskItems.length > 0) {
      alerts.push({
        type: 'warning',
        message: `ATENCIÓN: Síntomas críticos elevados - ${highRiskItems.map(item => `Ítem ${item.number}`).join(', ')}`
      })
    }
    
    // Alerta por cluster C (evitación) severo
    if (result.clusterScores.C >= 35) { // ≥62.5% del máximo para el cluster
      alerts.push({
        type: 'warning',
        message: 'ALERTA: Evitación severa detectada. Puede interferir significativamente con el tratamiento.'
      })
    }
    
    // Alerta por múltiples síntomas diarios
    let dailySymptoms = 0
    for (let i = 1; i <= 17; i++) {
      if (responses[i] && responses[i].frequency === 4) {
        dailySymptoms++
      }
    }
    
    if (dailySymptoms >= 5) {
      alerts.push({
        type: 'warning',
        message: `ATENCIÓN: ${dailySymptoms} síntomas ocurren diariamente. Impacto funcional severo probable.`
      })
    }
    
    return alerts
  },

  // Instrucciones especiales para el paciente
  patientInstructions: {
    title: 'Instrucciones para la Escala DTS',
    content: [
      '📋 Esta escala evalúa síntomas relacionados con eventos traumáticos',
      '📅 Todas las preguntas se refieren a la ÚLTIMA SEMANA solamente',
      '🎯 Para cada síntoma, responda DOS aspectos:',
      '   • FRECUENCIA: ¿Con qué frecuencia ocurrió?',
      '   • GRAVEDAD: ¿Qué tan intenso o molesto fue?',
      '💭 Piense en el evento traumático mientras responde',
      '⏱️ Tomará aproximadamente 10-15 minutos',
      '🔐 Sus respuestas son confidenciales'
    ]
  }
}

// Datos para el catálogo de escalas
export const dtsScaleData = {
  id: 'dts',
  fullName: 'Escala de Trauma de Davidson',
  shortName: 'DTS',
  description: 'Evaluación comprehensiva de síntomas de TEPT con medición dual de frecuencia y gravedad, basada en criterios DSM-IV',
  questions: 17,
  duration: '10-15',
  applicationType: 'Autoaplicada',
  ageRange: 'Adolescentes y adultos (≥16 años)',
  diagnostics: ['TEPT', 'Trauma', 'Estrés postraumático'],
  tags: ['Trauma', 'TEPT', 'Eventos traumáticos', 'Frecuencia', 'Gravedad', 'DSM-IV'],
  available: true,
  icon: 'picklist-type-svgrepo-com',
  color: '#dc2626'
}

// Información de ayuda detallada
export const dtsHelpInfo = {
  id: 'dts',
  title: 'DTS - Escala de Trauma de Davidson',
  description: 'La DTS es un instrumento validado de 17 ítems que evalúa la frecuencia y gravedad de síntomas de TEPT según criterios DSM-IV durante la última semana.',
  
  sections: {
    objetivo: {
      title: '🎯 Objetivo Principal',
      content: 'Evaluación dimensional de síntomas de TEPT mediante medición dual (frecuencia y gravedad), permitiendo una caracterización detallada del cuadro clínico y monitoreo de cambios.'
    },
    
    administracion: {
      title: '📝 Administración',
      content: [
        'Modalidad: Autoaplicada o heteroaplicada',
        'Tiempo: 10-15 minutos aproximadamente',
        'Población: Adolescentes y adultos ≥16 años',
        'Período evaluado: Última semana (7 días)',
        'Contexto: Clínico, investigación, seguimiento'
      ]
    },
    
    estructura: {
      title: '📊 Estructura de la Escala',
      content: [
        '17 ítems con doble puntuación (frecuencia + gravedad)',
        'Frecuencia: 0 (Nunca) a 4 (A diario)',
        'Gravedad: 0 (Nada) a 4 (Extrema)',
        'Puntuación total: 0-136 puntos',
        'Punto de corte para TEPT: ≥40 puntos'
      ]
    },
    
    clusters: {
      title: '🔍 Clusters DSM-IV',
      content: [
        'Cluster B - Reexperimentación (ítems 1-5): Recuerdos intrusivos, pesadillas, flashbacks',
        'Cluster C - Evitación/Embotamiento (ítems 6-12): Evitación, amnesia, anhedonia, distanciamiento',
        'Cluster D - Hiperactivación (ítems 13-17): Insomnio, irritabilidad, hipervigilancia, sobresalto'
      ]
    },
    
    validacion: {
      title: '✅ Propiedades Psicométricas',
      content: [
        'Consistencia interna: α = 0.97-0.99',
        'Fiabilidad test-retest: r = 0.86',
        'Sensibilidad: 69% (punto de corte ≥40)',
        'Especificidad: 95% (punto de corte ≥40)',
        'Precisión diagnóstica: 83%',
        'Validez convergente con CAPS y otras escalas'
      ]
    },
    
    interpretacion: {
      title: '💡 Guía de Interpretación',
      content: [
        '0-9 puntos: Síntomas mínimos o ausentes',
        '10-24 puntos: Síntomas leves',
        '25-39 puntos: Síntomas moderados',
        '≥40 puntos: Compatible con TEPT',
        'Media población general: 11.0 ± 18.1',
        'Evaluar clusters individualmente para focalizar tratamiento'
      ]
    },
    
    ventajas: {
      title: '✨ Ventajas Clínicas',
      content: [
        'Medición dual permite evaluar patrón sintomático',
        'Sensible al cambio terapéutico',
        'Útil para screening y seguimiento',
        'Identifica síntomas diana para intervención',
        'Aplicación breve y fácil interpretación',
        'Validada en múltiples poblaciones y traumas'
      ]
    },
    
    limitaciones: {
      title: '⚠️ Consideraciones',
      content: [
        'Basada en criterios DSM-IV (no DSM-5)',
        'No evalúa cogniciones negativas ni conductas temerarias',
        'Requiere identificación previa del evento traumático',
        'Período de evaluación limitado (1 semana)',
        'No distingue entre TEPT agudo, crónico o demorado'
      ]
    }
  },
  
  references: [
    'Davidson, J.R.T., et al. (1997). Assessment of a new self-rating scale for post-traumatic stress disorder. Psychological Medicine, 27(1), 153-160.',
    'Davidson, J.R.T. (2002). Davidson Trauma Scale (DTS) Manual. Multi-Health Systems Inc.',
    'Villafañe, A., et al. (2003). Validación de la Escala de Trauma de Davidson en población española. Actas Españolas de Psiquiatría, 31(4), 191-196.'
  ],
  
  // Funciones estándar para compatibilidad con sistema genérico
  getInterpretation: function(responses) {
    return this.getDetailedInterpretation(responses)
  },
  
  checkAlerts: function(responses, result) {
    return this.getAlerts(responses)
  },
  
  // Configuración adicional para sistema genérico
  timeEstimate: '10-15 minutos',
  maxScore: 136,
  scoreRange: '0-136',
  instructions: [
    'Por favor, responda basándose en síntomas que ha experimentado durante la última semana',
    'Para cada síntoma, indique tanto la FRECUENCIA como la GRAVEDAD',
    'No hay respuestas correctas o incorrectas',
    'Sea honesto en sus respuestas'
  ],
  applicationType: 'Autoaplicada',
  factors: {
    intrusion: { name: 'Reexperimentación', maxScore: 34 },
    avoidance: { name: 'Evitación/Embotamiento', maxScore: 68 },
    hyperarousal: { name: 'Hiperactivación', maxScore: 34 }
  }
}