// EAT-26 - Test de Actitudes hacia la Alimentación
// Escala autoaplicada para evaluación de actitudes hacia la alimentación (≥12 años)

export const eat26Questions = [
  "Me aterra estar con sobrepeso",
  "Evito comer cuando tengo hambre",
  "Me preocupo mucho por la comida",
  "He sufrido episodios de atracones de comida durante los cuales he sentido que podría no ser capaz de parar de comer",
  "Corto mis alimentos en trozos pequeños",
  "Estoy al tanto del contenido calórico de los alimentos que como",
  "Evito especialmente aquellos alimentos con alto contenido de carbohidratos (por ejemplo: pan, arroz, papas, etc.)",
  "Siento que las otras personas preferirían que comiera más",
  "Vomito después de comer",
  "Me siento extremadamente culpable después de comer",
  "Me preocupa el deseo de estar más delgado/a",
  "Cuando hago ejercicio pienso en quemar calorías",
  "Otras personas piensan que estoy demasiado delgado/a",
  "Me preocupa la idea de tener grasa en mi cuerpo",
  "Tardo más tiempo en comer que otras personas",
  "Evito alimentos que contienen azúcar",
  "Como alimentos dietéticos",
  "Siento que la comida controla mi vida",
  "Muestro autocontrol en relación con la comida",
  "Siento que otras personas me presionan para comer",
  "Paso demasiado tiempo pensando en comida",
  "Me siento incómodo/a después de comer dulces",
  "Me comprometo a hacer dieta",
  "Me gusta sentir el estómago vacío",
  "Disfruto probando comidas nuevas y sabrosas",
  "Tengo impulso de vomitar después de las comidas"
];

export const eat26Options = [
  { value: 0, label: 'Nunca' },
  { value: 0, label: 'Raramente' },
  { value: 0, label: 'A veces' },
  { value: 1, label: 'A menudo' },
  { value: 2, label: 'Muy a menudo' },
  { value: 3, label: 'Siempre' }
];

// Opciones especiales para pregunta 25 (scoring invertido)
export const eat26Question25Options = [
  { value: 3, label: 'Nunca' },
  { value: 2, label: 'Raramente' },
  { value: 1, label: 'A veces' },
  { value: 0, label: 'A menudo' },
  { value: 0, label: 'Muy a menudo' },
  { value: 0, label: 'Siempre' }
];

export const eat26Subscales = {
  dieting: {
    name: 'Dieta/Restricción',
    items: [1, 6, 7, 10, 11, 12, 14, 16, 17, 22, 23, 24, 26],
    description: 'Evalúa conductas evitativas de alimentos calóricos y preocupaciones por la delgadez',
    cutoff: 8
  },
  bulimia: {
    name: 'Bulimia y Preocupación por la Comida',
    items: [3, 4, 9, 18, 21],
    description: 'Evalúa conductas bulímicas y pensamientos obsesivos sobre la comida',
    cutoff: 3
  },
  oralControl: {
    name: 'Control Oral',
    items: [2, 5, 8, 13, 15, 19, 20, 25],
    description: 'Evalúa autocontrol sobre la ingesta y presión externa para comer',
    cutoff: 5
  }
};

export function calculateEat26Score(responses) {
  const subscaleScores = {
    dieting: 0,
    bulimia: 0,
    oralControl: 0
  };

  let totalScore = 0;

  // Calcular puntuaciones por subescala y total
  for (let i = 1; i <= 26; i++) {
    const response = responses[i] || 0;
    totalScore += response;

    // Asignar a subescalas
    if (eat26Subscales.dieting.items.includes(i)) {
      subscaleScores.dieting += response;
    } else if (eat26Subscales.bulimia.items.includes(i)) {
      subscaleScores.bulimia += response;
    } else if (eat26Subscales.oralControl.items.includes(i)) {
      subscaleScores.oralControl += response;
    }
  }

  return {
    totalScore,
    subscaleScores,
    maxScore: 78
  };
}

export function interpretEat26Score(totalScore, subscaleScores) {
  let interpretation = {};
  let findings = [];
  let clinicalPatterns = [];

  // Análisis de patrones clínicos por subescalas
  if (subscaleScores.dieting >= eat26Subscales.dieting.cutoff) {
    clinicalPatterns.push('Alta probabilidad de conductas restrictivas tipo anorexia nerviosa');
    findings.push('Patrón restrictivo significativo en la alimentación');
  }

  if (subscaleScores.bulimia >= eat26Subscales.bulimia.cutoff) {
    clinicalPatterns.push('Alta probabilidad de conductas bulímicas y obsesión por la comida');
    findings.push('Presencia de conductas bulímicas o preocupación excesiva por la comida');
  }

  if (subscaleScores.oralControl >= eat26Subscales.oralControl.cutoff) {
    clinicalPatterns.push('Marcadas alteraciones en el control de la ingesta');
    findings.push('Alteraciones significativas en el control alimentario');
  }

  if (clinicalPatterns.length > 1) {
    clinicalPatterns.push('Patrón mixto de trastorno de la conducta alimentaria');
  }

  // Interpretación principal según puntuación total
  if (totalScore >= 20) {
    interpretation = {
      level: 'Alto',
      title: 'Riesgo Alto - Patrón Clínico Significativo',
      description: 'Puntuación ≥20 indica presencia significativa de actitudes y comportamientos característicos de trastornos de la conducta alimentaria.',
      risk: 'alto',
      color: '#dc2626',
      recommendations: [
        'Evaluación especializada inmediata recomendada',
        'Considerar derivación a especialista en trastornos alimentarios',
        'Seguimiento clínico estrecho necesario'
      ]
    };

    findings = findings.length > 0 ? findings : [
      'Actitudes alimentarias patológicas significativas',
      'Distorsión de la imagen corporal',
      'Comportamientos de riesgo para la salud'
    ];

  } else if (totalScore >= 11) {
    interpretation = {
      level: 'Moderado',
      title: 'Riesgo Moderado - Actitudes de Riesgo Presentes',
      description: 'Puntuación entre 11-19 indica presencia de actitudes alimentarias de riesgo que requieren atención.',
      risk: 'moderado',
      color: '#f97316',
      recommendations: [
        'Evaluación clínica complementaria recomendada',
        'Monitoreo de evolución de síntomas',
        'Intervención preventiva puede ser beneficiosa'
      ]
    };

    findings = findings.length > 0 ? findings : [
      'Actitudes alimentarias subclínicas de riesgo',
      'Preocupación moderada por peso y forma corporal',
      'Algunos patrones de pensamiento disfuncional sobre la comida'
    ];

  } else {
    interpretation = {
      level: 'Bajo',
      title: 'Riesgo Bajo - Actitudes Normales',
      description: 'Puntuación <11 sugiere actitudes alimentarias dentro de parámetros normales.',
      risk: 'bajo',
      color: '#16a34a',
      recommendations: [
        'Continuar con hábitos alimentarios saludables',
        'Mantener seguimiento clínico de rutina',
        'Educación sobre alimentación balanceada'
      ]
    };

    findings = [
      'Actitudes alimentarias adaptativas',
      'Relación saludable con la comida y el peso',
      'Ausencia de patrones patológicos significativos'
    ];
  }

  return {
    interpretation,
    findings,
    clinicalPatterns: clinicalPatterns.length > 0 ? clinicalPatterns : null,
    needsAttention: totalScore >= 11,
    highRisk: totalScore >= 20
  };
}

export function getEat26CriticalItems(responses) {
  const criticalItems = [];
  const highRiskThreshold = 2; // Puntuación ≥2 considerada de alerta

  // Ítems especialmente críticos que requieren atención inmediata
  const criticalQuestions = [4, 9, 26]; // Atracones, vómitos, impulso de vomitar

  for (let i = 1; i <= 26; i++) {
    const score = responses[i] || 0;
    
    if (score >= highRiskThreshold) {
      const isCritical = criticalQuestions.includes(i);
      
      criticalItems.push({
        questionNumber: i,
        questionText: eat26Questions[i - 1],
        score: score,
        maxScore: 3,
        isCritical: isCritical,
        severity: score === 3 ? 'Muy Alta' : score === 2 ? 'Alta' : 'Moderada'
      });
    }
  }

  return criticalItems;
}

// Configuración principal de la escala
export const eat26Config = {
  id: 'eat-26',
  name: 'EAT-26',
  fullName: 'Test de Actitudes hacia la Alimentación',
  description: 'Herramienta de cribado para identificar riesgo de trastornos de la conducta alimentaria',
  version: '1.0',
  type: 'autoaplicada',
  questions: eat26Questions,
  options: eat26Options,
  specialOptions: {
    25: eat26Question25Options // Pregunta 25 con scoring invertido
  },
  subscales: eat26Subscales,
  calculateScore: calculateEat26Score,
  interpretScore: interpretEat26Score,
  getCriticalItems: getEat26CriticalItems,
  scoring: {
    type: 'sum',
    range: { min: 0, max: 78 },
    cutoffs: {
      normal: { min: 0, max: 10, label: 'Riesgo Bajo' },
      moderate: { min: 11, max: 19, label: 'Riesgo Moderado' },
      high: { min: 20, max: 78, label: 'Riesgo Alto' }
    }
  },
  demographics: {
    ageRange: 'Adolescentes y adultos (≥12 años)',
    gender: 'Ambos géneros',
    applicationTime: '5-10 minutos'
  },
  instructions: {
    professional: 'El EAT-26 es una herramienta de cribado validada internacionalmente para identificar riesgo de trastornos de la conducta alimentaria. Debe ser administrado e interpretado por profesionales de la salud mental.',
    patient: 'Este cuestionario evalúa sus actitudes, sentimientos y comportamientos relacionados con la alimentación. Por favor, responda de forma honesta basándose en sus pensamientos y comportamientos actuales.'
  },
  clinical: {
    purpose: 'Detección temprana de trastornos de la conducta alimentaria',
    validity: 'Alta validez y confiabilidad en población clínica y general',
    limitations: 'Es una herramienta de cribado, no constituye diagnóstico por sí sola',
    followUp: 'Puntuaciones ≥20 requieren evaluación especializada inmediata'
  }
};

// Datos para el catálogo de escalas
export const eat26ScaleData = {
  id: 'eat-26',
  fullName: 'Test de Actitudes hacia la Alimentación',
  shortName: 'EAT-26',
  description: 'Herramienta de cribado validada para identificar riesgo de trastornos de la conducta alimentaria en adolescentes y adultos.',
  questions: 26,
  duration: '5-10',
  applicationType: 'Autoaplicada',
  ageRange: 'Adolescentes y adultos (≥12 años)',
  diagnostics: ['Trastornos alimentarios', 'Anorexia', 'Bulimia'],
  tags: ['Alimentación', 'Trastornos alimentarios', 'Cribado', 'Actitudes', 'Comportamiento'],
  available: true,
  icon: 'restaurant-svgrepo-com',
  color: '#ec4899'
};

// Información de ayuda para profesionales
export const eat26HelpInfo = {
  purpose: "El EAT-26 es la versión abreviada del Eating Attitudes Test, una herramienta de cribado ampliamente validada para identificar individuos con riesgo de desarrollar trastornos de la conducta alimentaria.",
  
  scoring: {
    method: "Suma de 26 ítems con escala Likert de 6 puntos (Nunca=0, Raramente=0, A veces=0, A menudo=1, Muy a menudo=2, Siempre=3). Pregunta 25 tiene scoring invertido.",
    subscales: [
      { name: "Dieta/Restricción (13 ítems)", description: "Conductas evitativas y preocupaciones por el peso", cutoff: "≥8 puntos sugiere patrón restrictivo" },
      { name: "Bulimia y Preocupación (5 ítems)", description: "Conductas bulímicas y obsesión por la comida", cutoff: "≥3 puntos sugiere conductas bulímicas" },
      { name: "Control Oral (8 ítems)", description: "Control sobre la ingesta y presión externa", cutoff: "≥5 puntos sugiere alteraciones del control" }
    ],
    interpretation: [
      { range: "0-10", level: "Riesgo Bajo", description: "Actitudes alimentarias normales", color: "#16a34a" },
      { range: "11-19", level: "Riesgo Moderado", description: "Actitudes de riesgo presentes", color: "#f97316" },
      { range: "≥20", level: "Riesgo Alto", description: "Patrón clínico significativo", color: "#dc2626" }
    ]
  },

  clinical_considerations: [
    "Punto de corte tradicional: ≥20 para detección de TCA",
    "Algunos estudios sugieren ≥11 para mayor sensibilidad",
    "Las subescalas permiten identificar patrones específicos de síntomas",
    "Ítems críticos (4, 9, 26) requieren atención especial si puntúan alto",
    "Útil en seguimiento de tratamiento para TCA"
  ],

  populations: [
    "Adolescentes desde 12 años en adelante",
    "Adultos de ambos géneros",
    "Poblaciones clínicas y comunitarias",
    "Especialmente útil en atención primaria para cribado"
  ],

  limitations: [
    "Es una herramienta de cribado, no diagnóstica",
    "Requiere evaluación clínica complementaria para confirmar diagnóstico",
    "Puede generar falsos positivos en poblaciones con dietas específicas",
    "No evalúa todos los criterios diagnósticos del DSM-5",
    "Sensible a factores culturales relacionados con la alimentación"
  ],

  administration: [
    "Autoaplicado: 5-10 minutos",
    "Puede administrarse individual o grupalmente",
    "Requiere capacidad de lectura apropiada",
    "Instrucciones claras sobre honestidad en las respuestas"
  ],

  followUp: [
    "Puntuaciones ≥20: Derivación a especialista en TCA recomendada",
    "Puntuaciones 11-19: Seguimiento clínico y re-evaluación",
    "Ítems críticos altos: Evaluación de riesgo inmediato",
    "Considerar evaluación médica completa si hay sospecha de TCA"
  ],

  references: "Garner et al. (1982). The Eating Attitudes Test: psychometric features and clinical correlates. Psychological Medicine, 12(4), 871-878."
};