// EPDS - Escala de Depresión Postnatal de Edimburgo
// Escala autoaplicada específica para detectar depresión postnatal en madres (período postparto)

export const epdsQuestions = [
  "He sido capaz de reírme y ver el lado divertido de las cosas",
  "He mirado las cosas con ilusión", 
  "Me he culpado innecesariamente cuando las cosas han salido mal",
  "Me he sentido nerviosa o preocupada sin tener motivo",
  "He sentido miedo o he estado asustada sin motivo",
  "Las cosas me han agobiado",
  "Me he sentido tan infeliz que he tenido dificultades para dormir",
  "Me he sentido triste o desgraciada",
  "Me he sentido tan infeliz que he estado llorando",
  "He tenido pensamientos de hacerme daño"
];

// Opciones por pregunta (cada pregunta tiene opciones específicas)
export const epdsQuestionOptions = {
  1: [
    { value: 0, label: 'Igual que siempre' },
    { value: 1, label: 'Ahora, no tanto como siempre' },
    { value: 2, label: 'Ahora, mucho menos' },
    { value: 3, label: 'No, nada en absoluto' }
  ],
  2: [
    { value: 0, label: 'Igual que siempre' },
    { value: 1, label: 'Algo menos de lo que es habitual en mí' },
    { value: 2, label: 'Bastante menos de lo que es habitual en mí' },
    { value: 3, label: 'Mucho menos que antes' }
  ],
  3: [
    { value: 3, label: 'Sí, la mayor parte del tiempo' },
    { value: 2, label: 'Sí, a veces' },
    { value: 1, label: 'No muy a menudo' },
    { value: 0, label: 'No, en ningún momento' }
  ],
  4: [
    { value: 0, label: 'No, en ningún momento' },
    { value: 1, label: 'Casi nunca' },
    { value: 2, label: 'Sí, algunas veces' },
    { value: 3, label: 'Sí, con mucha frecuencia' }
  ],
  5: [
    { value: 3, label: 'Sí, bastante' },
    { value: 2, label: 'Sí, a veces' },
    { value: 1, label: 'No, no mucho' },
    { value: 0, label: 'No, en absoluto' }
  ],
  6: [
    { value: 3, label: 'Sí, la mayoría de las veces no he sido capaz de afrontarlas' },
    { value: 2, label: 'Sí, a veces no he sido capaz de afrontarlas tan bien como siempre' },
    { value: 1, label: 'No, la mayor parte de las veces las he afrontado bastante bien' },
    { value: 0, label: 'No, he afrontado las cosas tan bien como siempre' }
  ],
  7: [
    { value: 3, label: 'Sí, la mayor parte del tiempo' },
    { value: 2, label: 'Sí, a veces' },
    { value: 1, label: 'No muy a menudo' },
    { value: 0, label: 'No, en ningún momento' }
  ],
  8: [
    { value: 3, label: 'Sí, la mayor parte del tiempo' },
    { value: 2, label: 'Sí, bastante a menudo' },
    { value: 1, label: 'No con mucha frecuencia' },
    { value: 0, label: 'No, en ningún momento' }
  ],
  9: [
    { value: 3, label: 'Sí, la mayor parte del tiempo' },
    { value: 2, label: 'Sí, bastante a menudo' },
    { value: 1, label: 'Sólo en alguna ocasión' },
    { value: 0, label: 'No, en ningún momento' }
  ],
  10: [
    { value: 3, label: 'Sí, bastante a menudo' },
    { value: 2, label: 'A veces' },
    { value: 1, label: 'Casi nunca' },
    { value: 0, label: 'En ningún momento' }
  ]
};

// Subescalas según la estructura factorial validada
export const epdsSubscales = {
  anhedonia: {
    name: 'Anhedonia',
    items: [1, 2],
    description: 'Pérdida de placer e ilusión por las actividades',
    interpretation: 'Evalúa la capacidad de experimentar placer y mantener expectativas positivas'
  },
  anxiety: {
    name: 'Ansiedad',
    items: [3, 4, 5, 6],
    description: 'Síntomas de ansiedad, preocupación y nerviosismo',
    interpretation: 'Evalúa síntomas ansiosos incluyendo culpa, preocupación, miedo y sentirse agobiada'
  },
  depression: {
    name: 'Depresión',
    items: [7, 8, 9, 10],
    description: 'Síntomas depresivos centrales incluyendo ideación de daño',
    interpretation: 'Evalúa tristeza, llanto, infelicidad e ideación de autolesión'
  }
};

export function calculateEpdsScore(responses) {
  const subscaleScores = {
    anhedonia: 0,
    anxiety: 0,
    depression: 0
  };

  let totalScore = 0;

  // Calcular puntuación total y por subescalas
  for (let i = 1; i <= 10; i++) {
    const response = responses[i] || 0;
    totalScore += response;

    // Asignar a subescalas
    Object.keys(epdsSubscales).forEach(subscale => {
      if (epdsSubscales[subscale].items.includes(i)) {
        subscaleScores[subscale] += response;
      }
    });
  }

  return {
    totalScore,
    subscaleScores,
    maxScore: 30
  };
}

export function interpretEpdsScore(totalScore, subscaleScores) {
  let interpretation = {};
  let findings = [];
  let recommendations = [];

  // Interpretación principal según puntos de corte validados
  if (totalScore < 10) {
    interpretation = {
      level: 'Riesgo Bajo',
      title: 'Riesgo Bajo de Depresión Postnatal',
      description: 'Los resultados sugieren un riesgo bajo de depresión postnatal según los criterios establecidos.',
      risk: 'bajo',
      color: '#16a34a',
      sensitivity: 'N/A',
      specificity: 'N/A'
    };

    findings = [
      'Ausencia de criterios clínicos significativos para depresión postnatal',
      'Adaptación emocional aparentemente adecuada al período postparto',
      'Funcionamiento emocional dentro de parámetros esperados'
    ];

    recommendations = [
      'Seguimiento rutinario según protocolo estándar de atención postnatal',
      'Continuar con estrategias de autocuidado y apoyo social',
      'Reevaluar si aparecen síntomas nuevos o se intensifican los existentes'
    ];

  } else if (totalScore >= 10 && totalScore < 13) {
    interpretation = {
      level: 'Riesgo Moderado',
      title: 'Posible Depresión Postnatal',
      description: 'Puntuación indicativa de posible presencia de depresión postnatal que requiere evaluación clínica.',
      risk: 'moderado',
      color: '#f97316',
      sensitivity: '86%',
      specificity: '78%'
    };

    findings = [
      'Puntuación por encima del punto de corte inicial (≥10)',
      'Presencia de síntomas que sugieren depresión postnatal',
      'Requiere evaluación clínica complementaria para confirmación diagnóstica'
    ];

    recommendations = [
      'Evaluación clínica estructurada para confirmar diagnóstico',
      'Considerar re-evaluación con EPDS en 2 semanas',
      'Valorar factores de riesgo adicionales y apoyo social',
      'Monitoreo estrecho de la evolución sintomatológica'
    ];

  } else {
    interpretation = {
      level: 'Riesgo Alto',
      title: 'Alta Probabilidad de Depresión Postnatal',
      description: 'Puntuación elevada que sugiere alta probabilidad de depresión postnatal clínicamente significativa.',
      risk: 'alto',
      color: '#dc2626',
      sensitivity: '86%',
      specificity: '78% (especificidad aumentada)'
    };

    findings = [
      'Puntuación significativamente elevada (≥13)',
      'Alta probabilidad de depresión postnatal según criterios validados',
      'Síntomas clínicamente significativos que requieren intervención',
      'Mayor especificidad diagnóstica en este rango de puntuación'
    ];

    recommendations = [
      'Evaluación clínica especializada inmediata',
      'Consideración de intervención terapéutica inmediata',
      'Evaluación del riesgo para la madre y el bebé',
      'Activación de red de apoyo familiar y profesional',
      'Seguimiento intensivo y planificación de tratamiento integral'
    ];
  }

  // Análisis dimensional por subescalas
  let subscaleAnalysis = [];
  
  if (subscaleScores.anhedonia >= 4) {
    subscaleAnalysis.push('Anhedonia significativa - pérdida marcada de placer e ilusión');
  }
  if (subscaleScores.anxiety >= 6) {
    subscaleAnalysis.push('Síntomas ansiosos prominentes - preocupación y nerviosismo elevados');
  }
  if (subscaleScores.depression >= 6) {
    subscaleAnalysis.push('Síntomas depresivos centrales - tristeza e infelicidad significativas');
  }

  if (subscaleAnalysis.length > 0) {
    findings = [...findings, ...subscaleAnalysis];
  }

  return {
    interpretation,
    findings,
    recommendations,
    needsAttention: totalScore >= 10,
    highRisk: totalScore >= 13,
    requiresImmediateEvaluation: totalScore >= 13
  };
}

export function getEpdsCriticalItems(responses) {
  const criticalItems = [];
  
  // Ítem 10 es crítico independientemente de la puntuación total
  if (responses[10] >= 1) {
    criticalItems.push({
      questionNumber: 10,
      questionText: epdsQuestions[9], // índice 9 para pregunta 10
      score: responses[10],
      maxScore: 3,
      type: 'critical',
      description: 'ALERTA CRÍTICA: Pensamientos de autolesión reportados',
      priority: 'urgente',
      action: 'Requiere evaluación inmediata del riesgo suicida y medidas de protección apropiadas',
      isCritical: true
    });
  }

  // Ítems con puntuación ≥2 (≥66% del máximo) requieren atención
  const itemDescriptions = {
    1: 'Capacidad de reír/humor significativamente reducida',
    2: 'Pérdida marcada de ilusión y expectativas positivas',
    3: 'Autoculpabilización excesiva por eventos negativos',
    4: 'Nerviosismo y preocupación frecuentes sin causa aparente',
    5: 'Miedo persistente sin justificación objetiva',
    6: 'Sentirse frecuentemente agobiada e incapaz de afrontar situaciones',
    7: 'Infelicidad severa que interfiere con el sueño',
    8: 'Tristeza persistente y sentimientos de desgracia',
    9: 'Llanto frecuente asociado a infelicidad profunda'
  };

  for (let i = 1; i <= 9; i++) {
    const score = responses[i] || 0;
    
    if (score >= 2) {
      criticalItems.push({
        questionNumber: i,
        questionText: epdsQuestions[i - 1],
        score: score,
        maxScore: 3,
        type: 'significant',
        description: itemDescriptions[i],
        priority: 'alta',
        action: 'Requiere atención clínica y seguimiento especializado',
        isCritical: i === 10
      });
    }
  }

  return criticalItems;
}

// Configuración principal de la escala
export const epdsConfig = {
  id: 'epds',
  name: 'EPDS',
  fullName: 'Escala de Depresión Postnatal de Edimburgo',
  description: 'Instrumento de cribado específico para detectar depresión en el período postnatal',
  version: '1.0',
  type: 'autoaplicada',
  questions: epdsQuestions,
  questionOptions: epdsQuestionOptions,
  subscales: epdsSubscales,
  calculateScore: calculateEpdsScore,
  interpretScore: interpretEpdsScore,
  getCriticalItems: getEpdsCriticalItems,
  scoring: {
    type: 'sum',
    range: { min: 0, max: 30 },
    cutoffs: {
      low: { min: 0, max: 9, label: 'Riesgo Bajo' },
      moderate: { min: 10, max: 12, label: 'Riesgo Moderado' },
      high: { min: 13, max: 30, label: 'Riesgo Alto' }
    }
  },
  demographics: {
    ageRange: 'Mujeres en período postparto',
    gender: 'Femenino',
    applicationTime: '5-10 minutos',
    timeFrame: 'Últimos 7 días'
  },
  instructions: {
    professional: 'La EPDS es un instrumento de cribado validado para detectar depresión postnatal. Debe aplicarse desde una semana postparto, con mayor sensibilidad entre 4-6 semanas. El ítem 10 requiere evaluación inmediata independientemente de la puntuación total.',
    patient: 'Este cuestionario evalúa cómo se ha sentido durante la última semana después de haber tenido su bebé. No hay respuestas correctas o incorrectas. Seleccione la opción que mejor describe su experiencia durante los últimos 7 días.'
  },
  clinical: {
    purpose: 'Detección de depresión postnatal en mujeres durante el período postparto',
    timeFrame: 'Últimos 7 días',
    validity: 'Sensibilidad 86%, Especificidad 78% (punto de corte ≥10)',
    cutoffs: '≥10: Posible depresión postnatal; ≥13: Mayor probabilidad de depresión',
    specialConsiderations: 'Validada desde 1 semana postparto. Mayor sensibilidad entre 4-6 semanas. Ítem 10 crítico independientemente del total.',
    limitations: 'No detecta trastornos de ansiedad, fobias o trastornos de personalidad. Específica para período postnatal.'
  }
};

// Datos para el catálogo de escalas
export const epdsScaleData = {
  id: 'epds',
  fullName: 'Escala de Depresión Postnatal de Edimburgo',
  shortName: 'EPDS',
  description: 'Instrumento de cribado específico y validado para detectar depresión en mujeres durante el período postnatal.',
  questions: 10,
  duration: '5-10',
  applicationType: 'Autoaplicada',
  ageRange: 'Mujeres postparto',
  diagnostics: ['Depresión postnatal', 'Trastornos del estado de ánimo postparto'],
  tags: ['Depresión', 'Postnatal', 'Maternidad', 'Cribado', 'Mujeres', 'Postparto'],
  available: true,
  icon: 'heart-circle-svgrepo-com',
  color: '#ec4899'
};

// Información de ayuda para profesionales
export const epdsHelpInfo = {
  purpose: "La EPDS es un instrumento de cribado específicamente diseñado y validado para identificar mujeres con riesgo de desarrollar depresión postnatal durante el período postparto.",
  
  scoring: {
    method: "Suma de 10 ítems con puntuación variable (0-3 puntos cada uno). Cada pregunta tiene opciones específicas adaptadas al contenido.",
    timeFrame: "Evaluación de síntomas en los últimos 7 días",
    subscales: [
      { name: "Anhedonia (2 ítems)", description: "Ítems 1-2: Capacidad de reír y mirar con ilusión", interpretation: "Pérdida de placer y expectativas positivas" },
      { name: "Ansiedad (4 ítems)", description: "Ítems 3-6: Culpa, nerviosismo, miedo, agobio", interpretation: "Síntomas ansiosos y preocupación excesiva" },
      { name: "Depresión (4 ítems)", description: "Ítems 7-10: Infelicidad, tristeza, llanto, ideación", interpretation: "Síntomas depresivos centrales incluyendo riesgo suicida" }
    ],
    interpretation: [
      { range: "0-9", level: "Riesgo Bajo", description: "Depresión postnatal improbable", color: "#16a34a" },
      { range: "10-12", level: "Riesgo Moderado", description: "Posible depresión postnatal", color: "#f97316" },
      { range: "≥13", level: "Riesgo Alto", description: "Alta probabilidad de depresión postnatal", color: "#dc2626" }
    ]
  },

  clinical_considerations: [
    "Punto de corte principal: ≥10 (sensibilidad 86%, especificidad 78%)",
    "Punto de corte conservador: ≥13 (mayor especificidad para diagnóstico)",
    "Ítem 10 (pensamientos de daño) crítico independientemente del total",
    "Aplicable desde 1 semana postparto, óptimo entre 4-6 semanas",
    "Puede re-administrarse cada 2 semanas en casos dudosos",
    "Estructura factorial: anhedonia, ansiedad y depresión"
  ],

  populations: [
    "Mujeres en período postparto (desde 1 semana después del parto)",
    "Aplicable en atención primaria y especializada",
    "Útil en seguimiento de embarazos de alto riesgo psicológico",
    "Apropiada para diferentes niveles socioeconómicos y culturales"
  ],

  critical_items: [
    "Ítem 10: Pensamientos de autolesión - Evaluación inmediata del riesgo suicida",
    "Ítems ≥2 puntos: Síntomas significativos que requieren atención clínica",
    "Anhedonia severa (ítems 1-2 ≥4 puntos): Pérdida marcada de placer",
    "Ansiedad elevada (ítems 3-6 ≥6 puntos): Síntomas ansiosos prominentes"
  ],

  limitations: [
    "Específica para período postnatal, no aplicable fuera de este contexto",
    "No detecta trastornos de ansiedad puros, fobias o trastornos de personalidad",
    "Sensible a factores culturales en la expresión de síntomas",
    "Requiere confirmación diagnóstica mediante evaluación clínica",
    "No evalúa la relación madre-bebé o competencias parentales"
  ],

  administration: [
    "Autoaplicada: 5-10 minutos",
    "Ambiente privado y tranquilo recomendado",
    "Explicar el propósito de detección precoz",
    "Enfatizar que se evalúan los últimos 7 días específicamente"
  ],

  followUp: [
    "Puntuaciones ≥10: Evaluación clínica estructurada recomendada",
    "Puntuaciones ≥13: Intervención clínica especializada inmediata",
    "Ítem 10 positivo: Evaluación inmediata del riesgo suicida",
    "Re-evaluación cada 2 semanas en casos límite",
    "Seguimiento continuo durante primer año postparto"
  ],

  psychometric: [
    "Sensibilidad: 86% (punto de corte ≥10)",
    "Especificidad: 78% (punto de corte ≥10)",
    "Fiabilidad test-retest: r = 0.84",
    "Consistencia interna: α = 0.87",
    "Validada en múltiples poblaciones y culturas"
  ],

  references: "Cox, J.L., Holden, J.M., & Sagovsky, R. (1987). Detection of postnatal depression: Development of the 10-item Edinburgh Postnatal Depression Scale. British Journal of Psychiatry, 150, 782-786."
};