// CPQ-A - Cuestionario de Problemas con el Cannabis para Adolescentes
// Escala autoaplicada específica para adolescentes (14-20 años) que evalúa problemas relacionados con el consumo de cannabis

export const cpqAQuestions = [
  "¿Has fumado cannabis con más frecuencia que antes estando solo?",
  "¿Te ha preocupado estar con gente que no conoces cuando estabas \"colocado\"?",
  "¿Has pasado más tiempo con amigos que fuman cannabis que con otros amigos?",
  "¿Te han criticado tus amigos por fumar cannabis en exceso?",
  "¿Has contraído alguna deuda por consumir cannabis?",
  "¿Has empeñado alguna de tus pertenencias para comprar cannabis?",
  "¿Has tenido que poner excusas sobre tu gasto de dinero?",
  "¿Te ha preocupado la cantidad de dinero que has estado gastando en cannabis?",
  "¿Te han pillado mintiendo sobre el dinero que gastas?",
  "¿Has tenido problemas con la policía debido a tu consumo de cannabis?",
  "¿Te has encontrado físicamente mal tras haber fumado cannabis?",
  "¿Te has desmayado alguna vez después de haber fumado cannabis?",
  "¿Has sentido dolor en el pecho o en los pulmones tras haber estado fumando cannabis?",
  "¿Has tenido bronquitis o tos persistente?",
  "¿Te has sentido paranoico o antisocial tras haber estado fumando cannabis?",
  "¿Has perdido peso sin habértelo propuesto?",
  "¿Te has descuidado físicamente?",
  "¿Te has sentido deprimido durante más de una semana?",
  "¿Te has sentido tan deprimido como para pensar en suicidarte?",
  "¿Has dejado de hacer alguna actividad de la que antes disfrutabas por tu consumo de cannabis?",
  "¿Te has sentido con menos energía de lo habitual?",
  "¿Te ha resultado difícil disfrutar como siempre de tus aficiones habituales?",
  "¿Tu salud general ha estado peor de lo habitual?",
  "¿Te ha preocupado perder el contacto con amigos o familiares?",
  "¿Te ha preocupado la falta de motivación para hacer cosas?",
  "¿Te ha resultado más difícil de lo habitual concentrarte?",
  "¿Has estado preocupado por sentimientos de aislamiento o de desapego?"
];

export const cpqAOptions = [
  { value: 0, label: 'No' },
  { value: 1, label: 'Sí' }
];

// Agrupación por dominios clínicos según la literatura
export const cpqADomains = {
  social: {
    name: 'Problemas Sociales',
    items: [1, 2, 3, 4, 24],
    description: 'Cambios en patrones sociales y aislamiento relacionado con el consumo'
  },
  economic: {
    name: 'Problemas Económicos',
    items: [5, 6, 7, 8, 9],
    description: 'Dificultades financieras y comportamientos económicos problemáticos'
  },
  legal: {
    name: 'Problemas Legales',
    items: [10],
    description: 'Consecuencias legales del consumo de cannabis'
  },
  physical: {
    name: 'Problemas Físicos',
    items: [11, 12, 13, 14, 16, 17, 23],
    description: 'Efectos físicos adversos y deterioro de la salud'
  },
  psychological: {
    name: 'Problemas Psicológicos',
    items: [15, 18, 19, 21, 22, 25, 26, 27],
    description: 'Impacto en el estado de ánimo, motivación y funcionamiento cognitivo'
  },
  functional: {
    name: 'Deterioro Funcional',
    items: [20, 21, 22, 25, 26],
    description: 'Pérdida de actividades y reducción del funcionamiento general'
  }
};

// Ítems críticos que requieren atención inmediata
export const cpqACriticalItems = [
  {
    questionNumber: 19,
    type: 'high_risk',
    description: 'Ideación suicida reportada - Requiere evaluación inmediata de riesgo',
    priority: 'urgente'
  },
  {
    questionNumber: 10,
    type: 'legal',
    description: 'Problemas legales relacionados con cannabis - Considerar implicaciones judiciales',
    priority: 'alta'
  },
  {
    questionNumber: 12,
    type: 'medical',
    description: 'Episodios de pérdida de conciencia - Evaluación médica recomendada',
    priority: 'alta'
  },
  {
    questionNumber: 18,
    type: 'mental_health',
    description: 'Síntomas depresivos prolongados - Screening de comorbilidad psiquiátrica',
    priority: 'alta'
  }
];

export function calculateCpqAScore(responses) {
  const domainScores = {
    social: 0,
    economic: 0,
    legal: 0,
    physical: 0,
    psychological: 0,
    functional: 0
  };

  let totalScore = 0;

  // Calcular puntuación total y por dominios
  for (let i = 1; i <= 27; i++) {
    const response = responses[i] || 0;
    totalScore += response;

    // Asignar a dominios
    Object.keys(cpqADomains).forEach(domain => {
      if (cpqADomains[domain].items.includes(i)) {
        domainScores[domain] += response;
      }
    });
  }

  return {
    totalScore,
    domainScores,
    maxScore: 27
  };
}

export function interpretCpqAScore(totalScore, domainScores) {
  let interpretation = {};
  let findings = [];
  let clinicalPatterns = [];
  
  // Análisis por dominios
  Object.keys(domainScores).forEach(domain => {
    const score = domainScores[domain];
    const maxPossible = cpqADomains[domain].items.length;
    const percentage = (score / maxPossible) * 100;
    
    if (percentage >= 60) { // 60% o más de problemas en el dominio
      clinicalPatterns.push(`Problemas significativos en ${cpqADomains[domain].name.toLowerCase()}`);
    }
  });

  // Interpretación principal según puntuación total (basada en validación española)
  if (totalScore >= 0 && totalScore <= 4) {
    interpretation = {
      level: 'Sin problemas significativos',
      title: 'Consumo sin Problemas Clínicos Significativos',
      description: 'La puntuación obtenida indica un consumo de cannabis sin problemas significativos asociados en los últimos 3 meses.',
      risk: 'bajo',
      color: '#16a34a',
      recommendations: [
        'Mantener estrategias de consumo responsable',
        'Continuar con seguimiento preventivo',
        'Reforzar factores protectores y habilidades de afrontamiento'
      ]
    };

    findings = [
      'Consumo recreacional sin indicadores de problemática clínica',
      'Ausencia de criterios de uso problemático según CPQ-A',
      'Funcionamiento psicosocial preservado'
    ];

  } else if (totalScore >= 5 && totalScore <= 9) {
    interpretation = {
      level: 'Problemas Leves-Moderados',
      title: 'Uso Problemático de Cannabis Identificado',
      description: 'Puntuación indicativa de problemas relacionados con el consumo de cannabis según el punto de corte validado (≥5).',
      risk: 'moderado',
      color: '#f97316',
      recommendations: [
        'Evaluación especializada para determinar criterios diagnósticos',
        'Considerar intervención breve y psicoeducación',
        'Desarrollo de estrategias de reducción de riesgos'
      ]
    };

    findings = [
      'Indicativo de uso problemático según criterios del CPQ-A',
      'Probable cumplimiento de criterios de abuso según DSM-IV-TR',
      'Presencia de consecuencias negativas asociadas al uso'
    ];

  } else if (totalScore >= 10 && totalScore <= 15) {
    interpretation = {
      level: 'Problemas Moderados-Severos',
      title: 'Patrón Problemático Significativo',
      description: 'Puntuación que sugiere un patrón problemático significativo con múltiples consecuencias negativas en diferentes áreas.',
      risk: 'alto',
      color: '#dc2626',
      recommendations: [
        'Evaluación comprehensiva para dependencia de cannabis',
        'Tratamiento estructurado con terapia cognitivo-conductual',
        'Considerar programas de tratamiento intensivo'
      ]
    };

    findings = [
      'Patrón de uso asociado con deterioro funcional significativo',
      'Alta probabilidad de criterios de dependencia',
      'Múltiples áreas de funcionamiento comprometidas'
    ];

  } else { // totalScore >= 16
    interpretation = {
      level: 'Problemas Severos',
      title: 'Uso Severo con Deterioro Funcional Importante',
      description: 'Puntuación elevada que indica un patrón severo de problemas con múltiples consecuencias graves.',
      risk: 'muy_alto',
      color: '#991b1b',
      recommendations: [
        'Evaluación psiquiátrica completa para comorbilidad',
        'Tratamiento especializado en adicciones con componente médico',
        'Considerar programas residenciales o de hospital de día'
      ]
    };

    findings = [
      'Indicadores de dependencia severa con deterioro funcional importante',
      'Presencia probable de comorbilidad psiquiátrica',
      'Múltiples consecuencias graves en funcionamiento psicosocial'
    ];
  }

  // Agregar patrones clínicos específicos si los hay
  if (clinicalPatterns.length > 0) {
    findings = [...findings, ...clinicalPatterns];
  }

  return {
    interpretation,
    findings,
    needsAttention: totalScore >= 5,
    highRisk: totalScore >= 10,
    severeRisk: totalScore >= 16
  };
}

export function getCpqACriticalItems(responses) {
  const criticalItems = [];
  
  // Verificar ítems críticos específicos
  cpqACriticalItems.forEach(critical => {
    if (responses[critical.questionNumber] === 1) {
      criticalItems.push({
        questionNumber: critical.questionNumber,
        questionText: cpqAQuestions[critical.questionNumber - 1],
        type: critical.type,
        description: critical.description,
        priority: critical.priority,
        isCritical: true
      });
    }
  });

  // Análisis de patrones problemáticos por dominio
  const economicProblems = cpqADomains.economic.items.filter(item => responses[item] === 1).length;
  if (economicProblems >= 3) {
    criticalItems.push({
      type: 'pattern',
      description: `Problemas económicos significativos (${economicProblems}/5 ítems) - Evaluar impacto familiar`,
      priority: 'moderada',
      isCritical: false
    });
  }

  const physicalProblems = cpqADomains.physical.items.filter(item => responses[item] === 1).length;
  if (physicalProblems >= 3) {
    criticalItems.push({
      type: 'pattern',
      description: `Múltiples problemas físicos (${physicalProblems}/${cpqADomains.physical.items.length} ítems) - Considerar evaluación médica`,
      priority: 'moderada',
      isCritical: false
    });
  }

  const psychologicalProblems = cpqADomains.psychological.items.filter(item => responses[item] === 1).length;
  if (psychologicalProblems >= 4) {
    criticalItems.push({
      type: 'pattern',
      description: `Sintomatología psicológica significativa (${psychologicalProblems}/${cpqADomains.psychological.items.length} ítems) - Evaluación especializada`,
      priority: 'moderada',
      isCritical: false
    });
  }

  return criticalItems;
}

// Configuración principal de la escala
export const cpqAConfig = {
  id: 'cpq-a',
  name: 'CPQ-A',
  fullName: 'Cuestionario de Problemas con el Cannabis para Adolescentes',
  description: 'Instrumento específico para evaluar problemas relacionados con el consumo de cannabis en población adolescente',
  version: '1.0',
  type: 'autoaplicada',
  questions: cpqAQuestions,
  options: cpqAOptions,
  domains: cpqADomains,
  criticalItems: cpqACriticalItems,
  calculateScore: calculateCpqAScore,
  interpretScore: interpretCpqAScore,
  getCriticalItems: getCpqACriticalItems,
  scoring: {
    type: 'sum',
    range: { min: 0, max: 27 },
    cutoffs: {
      normal: { min: 0, max: 4, label: 'Sin problemas significativos' },
      mild: { min: 5, max: 9, label: 'Problemas leves-moderados' },
      moderate: { min: 10, max: 15, label: 'Problemas moderados-severos' },
      severe: { min: 16, max: 27, label: 'Problemas severos' }
    }
  },
  demographics: {
    ageRange: 'Adolescentes y jóvenes (14-20 años)',
    gender: 'Ambos géneros',
    applicationTime: '5-10 minutos'
  },
  instructions: {
    professional: 'El CPQ-A es un instrumento validado específicamente para adolescentes que evalúa problemas relacionados con el consumo de cannabis en los últimos 3 meses. Punto de corte ≥5 indica uso problemático.',
    patient: 'Este cuestionario evalúa problemas que pueden estar relacionados con el consumo de cannabis. Por favor, responde con honestidad sobre tu experiencia en los últimos 3 meses.'
  },
  clinical: {
    purpose: 'Evaluación de problemas relacionados con el consumo de cannabis en adolescentes',
    timeFrame: 'Últimos 3 meses',
    validity: 'Fiabilidad α = 0.86 (validación española). Test-retest r = 0.91',
    cutoff: 'Puntuación ≥5 indica uso problemático de cannabis',
    specialConsiderations: 'Diseñado específicamente para población adolescente. Evalúa múltiples dominios de problemas.'
  }
};

// Datos para el catálogo de escalas
export const cpqAScaleData = {
  id: 'cpq-a',
  fullName: 'Cuestionario de Problemas con el Cannabis para Adolescentes',
  shortName: 'CPQ-A',
  description: 'Instrumento específico para evaluar problemas relacionados con el consumo de cannabis en adolescentes de 14-20 años.',
  questions: 27,
  duration: '5-10',
  applicationType: 'Autoaplicada',
  ageRange: 'Adolescentes (14-20 años)',
  diagnostics: ['Trastornos por uso de cannabis', 'Abuso de sustancias', 'Dependencia'],
  tags: ['Adolescentes', 'Cannabis', 'Drogas', 'Adicciones', 'Cribado', 'Problemas funcionales'],
  available: true,
  icon: 'leaf-svgrepo-com',
  color: '#059669'
};

// Información de ayuda para profesionales
export const cpqAHelpInfo = {
  purpose: "El CPQ-A es la versión específica para adolescentes del Cannabis Problems Questionnaire, diseñado para identificar problemas relacionados con el uso de cannabis en jóvenes de 14-20 años durante los últimos 3 meses.",
  
  scoring: {
    method: "Suma de 27 ítems dicotómicos (No=0, Sí=1). Rango: 0-27 puntos.",
    cutoff: "≥5 puntos indica uso problemático de cannabis según validación española",
    domains: [
      { name: "Social (5 ítems)", description: "Cambios en patrones sociales y aislamiento", items: "1, 2, 3, 4, 24" },
      { name: "Económico (5 ítems)", description: "Dificultades financieras y comportamientos problemáticos", items: "5, 6, 7, 8, 9" },
      { name: "Legal (1 ítem)", description: "Consecuencias legales del consumo", items: "10" },
      { name: "Físico (7 ítems)", description: "Efectos físicos adversos y deterioro de salud", items: "11, 12, 13, 14, 16, 17, 23" },
      { name: "Psicológico (8 ítems)", description: "Impacto en ánimo, motivación y cognición", items: "15, 18, 19, 21, 22, 25, 26, 27" },
      { name: "Funcional (5 ítems)", description: "Pérdida de actividades y funcionamiento", items: "20, 21, 22, 25, 26" }
    ],
    interpretation: [
      { range: "0-4", level: "Sin problemas", description: "Consumo sin problemas clínicos significativos", color: "#16a34a" },
      { range: "5-9", level: "Leves-Moderados", description: "Uso problemático identificado", color: "#f97316" },
      { range: "10-15", level: "Moderados-Severos", description: "Patrón problemático significativo", color: "#dc2626" },
      { range: "≥16", level: "Severos", description: "Deterioro funcional importante", color: "#991b1b" }
    ]
  },

  clinical_considerations: [
    "Diseñado específicamente para adolescentes (14-20 años)",
    "Marco temporal: últimos 3 meses",
    "Punto de corte ≥5 basado en validación española",
    "Evalúa múltiples dominios de problemas relacionados con cannabis",
    "Útil para detectar uso problemático antes del desarrollo de dependencia completa"
  ],

  critical_items: [
    "Ítem 19: Ideación suicida - Requiere evaluación inmediata de riesgo",
    "Ítem 10: Problemas legales - Considerar implicaciones judiciales",
    "Ítem 12: Pérdida de conciencia - Evaluación médica recomendada",
    "Ítem 18: Depresión prolongada - Screening de comorbilidad"
  ],

  populations: [
    "Adolescentes consumidores de cannabis (14-20 años)",
    "Jóvenes en servicios de salud mental",
    "Población escolar con sospecha de consumo problemático",
    "Programas de prevención selectiva e indicada"
  ],

  limitations: [
    "Específico para cannabis, no evalúa otras sustancias",
    "Basado en auto-reporte, puede haber subreporte",
    "Marco temporal limitado a 3 meses",
    "Requiere capacidad de lectura y comprensión adecuada",
    "No constituye diagnóstico clínico por sí solo"
  ],

  administration: [
    "Autoaplicado: 5-10 minutos",
    "Puede administrarse individual o grupalmente",
    "Requiere privacidad y confidencialidad asegurada",
    "Instrucciones claras sobre período de referencia (3 meses)"
  ],

  followUp: [
    "Puntuaciones ≥5: Evaluación especializada recomendada",
    "Ítems críticos positivos: Intervención inmediata",
    "Múltiples dominios afectados: Tratamiento multimodal",
    "Considerar evaluación familiar y del entorno social"
  ],

  psychometric: [
    "Fiabilidad interna: α = 0.86 (validación española)",
    "Estabilidad temporal: r = 0.91 (test-retest)",
    "Estructura unidimensional confirmada",
    "Validez concurrente con criterios DSM-IV para abuso/dependencia"
  ],

  references: "Piontek et al. (2008). The Cannabis Problems Questionnaire (CPQ): Psychometric properties of a new instrument. European Addiction Research, 14(4), 181-190."
};