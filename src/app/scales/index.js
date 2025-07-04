// Índice centralizado de escalas
// Este archivo importa y exporta todas las escalas del sistema

// Importar todas las escalas
import {
  phq9Config,
  phq9ScaleData,
  phq9HelpInfo
} from './phq9.js'

import {
  gadiConfig,
  gadiScaleData,
  gadiHelpInfo
} from './gadi.js'

import {
  harsConfig,
  harsScaleData,
  harsHelpInfo
} from './hars.js'

import {
  mosSleepConfig,
  mosSleepScaleData,
  mosSleepHelpInfo
} from './mos-sleep.js'

import {
  bls23Config,
  bls23ScaleData,
  bls23HelpInfo
} from './bls-23.js'

import {
  beck21Config,
  beck21ScaleData,
  beck21HelpInfo
} from './beck-21.js'

import {
  cdiConfig,
  cdiScaleData,
  cdiHelpInfo
} from './cdi.js'

import {
  aqChildConfig,
  aqChildScaleData,
  aqChildHelpInfo
} from './aq-child.js'

import {
  aqAdolescentConfig,
  aqAdolescentScaleData,
  aqAdolescentHelpInfo
} from './aq-adolescent.js'

import {
  ipdeConfig,
  ipdeScaleData,
  ipdeHelpInfo
} from './ipde.js'

import {
  salamancaConfig,
  salamancaScaleData,
  salamancaHelpInfo
} from './salamanca.js'

import {
  sssVConfig,
  sssVScaleData,
  sssVHelpInfo
} from './sss-v.js'

import {
  auditConfig,
  auditScaleData,
  auditHelpInfo
} from './audit.js'

import {
  bdi13Config,
  bdi13ScaleData,
  bdi13HelpInfo
} from './bdi-13.js'

import {
  esadfunConfig,
  esadfunScaleData,
  esadfunHelpInfo
} from './esadfun.js'

import {
  ctqSfConfig,
  ctqSfScaleData,
  ctqSfHelpInfo
} from './ctq-sf.js'

import {
  dtsConfig,
  dtsScaleData,
  dtsHelpInfo
} from './dts.js'

import {
  eat26Config,
  eat26ScaleData,
  eat26HelpInfo
} from './eat-26.js'

import {
  cpqAConfig,
  cpqAScaleData,
  cpqAHelpInfo
} from './cpq-a.js'

import {
  epdsConfig,
  epdsScaleData,
  epdsHelpInfo
} from './epds.js'

import {
  iief15Config,
  iief15ScaleData,
  iief15HelpInfo
} from './iief-15.js'

import {
  ediConfig,
  ediScaleData,
  ediHelpInfo
} from './edi.js'

import {
  emunArConfig,
  emunArScaleData,
  emunArHelpInfo
} from './emun-ar.js'

import {
  plutchikEiConfig,
  plutchikEiScaleData,
  plutchikEiHelpInfo
} from './plutchik-ei.js'

import {
  staiConfig,
  staiScaleData,
  staiHelpInfo
} from './stai.js'

import {
  tdahConfig,
  tdahScaleData,
  tdahHelpInfo
} from './tdah.js'

// Configuraciones de escalas consolidadas
export const scaleConfigs = {
  phq9: phq9Config,
  gadi: gadiConfig,
  hars: harsConfig,
  'mos-sleep': mosSleepConfig,
  'bls-23': bls23Config,
  'beck-21': beck21Config,
  cdi: cdiConfig,
  'aq-child': aqChildConfig,
  'aq-adolescent': aqAdolescentConfig,
  ipde: ipdeConfig,
  salamanca: salamancaConfig,
  'sss-v': sssVConfig,
  audit: auditConfig,
  'bdi-13': bdi13Config,
  esadfun: esadfunConfig,
  'ctq-sf': ctqSfConfig,
  dts: dtsConfig,
  'eat-26': eat26Config,
  'cpq-a': cpqAConfig,
  epds: epdsConfig,
  'iief-15': iief15Config,
  edi: ediConfig,
  'emun-ar': emunArConfig,
  'plutchik-ei': plutchikEiConfig,
  stai: staiConfig,
  tdah: tdahConfig
}

// Datos del catálogo de escalas consolidados
export const scalesData = [
  phq9ScaleData,
  gadiScaleData,
  harsScaleData,
  mosSleepScaleData,
  bls23ScaleData,
  beck21ScaleData,
  cdiScaleData,
  aqChildScaleData,
  aqAdolescentScaleData,
  ipdeScaleData,
  salamancaScaleData,
  sssVScaleData,
  auditScaleData,
  bdi13ScaleData,
  esadfunScaleData,
  ctqSfScaleData,
  dtsScaleData,
  eat26ScaleData,
  cpqAScaleData,
  epdsScaleData,
  iief15ScaleData,
  ediScaleData,
  emunArScaleData,
  plutchikEiScaleData,
  staiScaleData,
  tdahScaleData,
  // Escalas no implementadas (mantenidas para compatibilidad)
  {
    id: 'gad7',
    fullName: 'Trastorno de Ansiedad Generalizada-7',
    shortName: 'GAD-7',
    description: 'Herramienta de detección para el trastorno de ansiedad generalizada y para medir la gravedad de los síntomas.',
    questions: 7,
    duration: '2-3',
    applicationType: 'Autoaplicada',
    ageRange: 'Adolescentes y adultos',
    diagnostics: ['Ansiedad'],
    tags: ['Ansiedad', 'TAG', 'Screening'],
    available: false,
    icon: 'picklist-type-svgrepo-com',
    color: '#f59e0b'
  },
  {
    id: 'hamilton',
    fullName: 'Escala de Depresión de Hamilton',
    shortName: 'HAM-D',
    description: 'Escala heteroaplicada que evalúa la gravedad de síntomas depresivos mediante entrevista clínica estructurada.',
    questions: 17,
    duration: '15-20',
    applicationType: 'Heteroaplicada',
    ageRange: 'Adultos',
    diagnostics: ['Depresión'],
    tags: ['Depresión', 'Clínica', 'Heteroaplicada'],
    available: false,
    icon: 'picklist-type-svgrepo-com',
    color: '#8b5cf6'
  },
  {
    id: 'ymrs',
    fullName: 'Escala de Manía de Young',
    shortName: 'YMRS',
    description: 'Escala para evaluar la intensidad de síntomas maníacos en pacientes con trastorno bipolar.',
    questions: 11,
    duration: '10-15',
    applicationType: 'Heteroaplicada',
    ageRange: 'Adolescentes y adultos',
    diagnostics: ['Bipolar', 'Manía'],
    tags: ['Bipolar', 'Manía', 'Evaluación'],
    available: false,
    icon: 'picklist-type-svgrepo-com',
    color: '#ec4899'
  },
  {
    id: 'mmse',
    fullName: 'Examen Cognoscitivo Mini-Mental',
    shortName: 'MMSE',
    description: 'Prueba breve de detección de deterioro cognitivo y demencia en adultos mayores.',
    questions: 30,
    duration: '10-15',
    applicationType: 'Heteroaplicada',
    ageRange: 'Adultos mayores',
    diagnostics: ['Deterioro cognitivo', 'Demencia'],
    tags: ['Cognitivo', 'Demencia', 'Screening'],
    available: false,
    icon: 'picklist-type-svgrepo-com',
    color: '#06b6d4'
  }
]

// Información de ayuda consolidada
export const scalesHelpInfo = {
  phq9: phq9HelpInfo,
  gadi: gadiHelpInfo,
  hars: harsHelpInfo,
  'mos-sleep': mosSleepHelpInfo,
  'bls-23': bls23HelpInfo,
  'beck-21': beck21HelpInfo,
  cdi: cdiHelpInfo,
  'aq-child': aqChildHelpInfo,
  'aq-adolescent': aqAdolescentHelpInfo,
  ipde: ipdeHelpInfo,
  salamanca: salamancaHelpInfo,
  'sss-v': sssVHelpInfo,
  audit: auditHelpInfo,
  'bdi-13': bdi13HelpInfo,
  esadfun: esadfunHelpInfo,
  'ctq-sf': ctqSfHelpInfo,
  dts: dtsHelpInfo,
  'eat-26': eat26HelpInfo,
  'cpq-a': cpqAHelpInfo,
  epds: epdsHelpInfo,
  'iief-15': iief15HelpInfo,
  edi: ediHelpInfo,
  'emun-ar': emunArHelpInfo,
  'plutchik-ei': plutchikEiHelpInfo,
  stai: staiHelpInfo,
  tdah: tdahHelpInfo,
  // Información de escalas no implementadas (mantenida para compatibilidad)
  beck21: {
    purpose: "El BDI-II evalúa la severidad de síntomas depresivos en las últimas dos semanas, basado en criterios del DSM-IV.",
    scoring: {
      method: "Suma de 21 ítems (0-3 puntos cada uno)",
      ranges: [
        { range: "0-13", severity: "Depresión mínima", color: "#22c55e" },
        { range: "14-19", severity: "Depresión leve", color: "#eab308" },
        { range: "20-28", severity: "Depresión moderada", color: "#f97316" },
        { range: "29-63", severity: "Depresión severa", color: "#dc2626" }
      ]
    },
    clinical_considerations: [
      "Alta sensibilidad para detectar cambios en síntomas depresivos",
      "Útil en seguimiento de tratamiento farmacológico y psicoterapéutico",
      "Correlaciona bien con escalas heteroaplicadas como HAM-D"
    ],
    limitations: [
      "Puede ser influenciado por condiciones médicas",
      "Requiere capacidad de lectura adecuada",
      "No evalúa funcionalidad social o laboral directamente"
    ],
    references: "Beck et al. (1996). Manual for the Beck Depression Inventory-II"
  },
  gad7: {
    purpose: "El GAD-7 es una herramienta de screening para detectar y medir la severidad del trastorno de ansiedad generalizada.",
    scoring: {
      method: "Suma de 7 ítems (0-3 puntos cada uno)",
      ranges: [
        { range: "0-4", severity: "Ansiedad mínima", color: "#22c55e" },
        { range: "5-9", severity: "Ansiedad leve", color: "#eab308" },
        { range: "10-14", severity: "Ansiedad moderada", color: "#f97316" },
        { range: "15-21", severity: "Ansiedad severa", color: "#dc2626" }
      ]
    },
    clinical_considerations: [
      "Puntuaciones ≥10 sugieren TAG probable",
      "Útil para monitoreo de respuesta a tratamiento",
      "Buena sensibilidad para TAG, trastorno de pánico y fobia social"
    ],
    limitations: [
      "Menos específico para TAG que para ansiedad en general",
      "No evalúa todos los criterios diagnósticos del TAG",
      "Puede dar falsos positivos en condiciones médicas"
    ],
    references: "Spitzer et al. (2006). Archives of Internal Medicine"
  },
  hamilton: {
    purpose: "La HAM-D evalúa la severidad de síntomas depresivos mediante entrevista clínica estructurada.",
    scoring: {
      method: "Suma de 17 ítems con diferentes ponderaciones",
      ranges: [
        { range: "0-7", severity: "Sin depresión", color: "#22c55e" },
        { range: "8-13", severity: "Depresión leve", color: "#eab308" },
        { range: "14-18", severity: "Depresión moderada", color: "#f97316" },
        { range: "19-22", severity: "Depresión severa", color: "#dc2626" },
        { range: "≥23", severity: "Depresión muy severa", color: "#991b1b" }
      ]
    },
    clinical_considerations: [
      "Estándar de oro para evaluación de depresión en investigación",
      "Requiere entrevista clínica por profesional entrenado",
      "Útil para monitoreo de respuesta a antidepresivos"
    ],
    limitations: [
      "Tiempo de aplicación considerable (20-30 minutos)",
      "Requiere entrenamiento especializado",
      "Puede ser menos sensible a cambios en depresión leve"
    ],
    references: "Hamilton (1960). Journal of Neurology, Neurosurgery & Psychiatry"
  },
  ymrs: {
    purpose: "La YMRS evalúa la intensidad de síntomas maníacos en pacientes con trastorno bipolar.",
    scoring: {
      method: "Suma de 11 ítems con diferentes ponderaciones",
      ranges: [
        { range: "0-12", severity: "Sin manía", color: "#22c55e" },
        { range: "13-19", severity: "Manía leve", color: "#eab308" },
        { range: "20-25", severity: "Manía moderada", color: "#f97316" },
        { range: "≥26", severity: "Manía severa", color: "#dc2626" }
      ]
    },
    clinical_considerations: [
      "Requiere entrevista clínica estructurada",
      "Útil para monitoreo de respuesta a estabilizadores del ánimo",
      "Algunos ítems tienen doble ponderación"
    ],
    limitations: [
      "Requiere entrenamiento especializado",
      "Dificulta aplicación en pacientes muy agitados",
      "Puede confundirse con síntomas psicóticos"
    ],
    references: "Young et al. (1978). British Journal of Psychiatry"
  },
  mmse: {
    purpose: "El MMSE es una prueba breve de screening para detectar deterioro cognitivo y demencia.",
    scoring: {
      method: "Suma de 30 puntos máximo en diferentes dominios cognitivos",
      ranges: [
        { range: "24-30", severity: "Normal", color: "#22c55e" },
        { range: "18-23", severity: "Deterioro cognitivo leve", color: "#eab308" },
        { range: "10-17", severity: "Deterioro cognitivo moderado", color: "#f97316" },
        { range: "0-9", severity: "Deterioro cognitivo severo", color: "#dc2626" }
      ]
    },
    clinical_considerations: [
      "Ajustar puntos de corte según nivel educativo",
      "Incluye orientación, memoria, atención y lenguaje",
      "No detecta deterioro cognitivo leve temprano"
    ],
    limitations: [
      "Influenciado por nivel educativo y cultural",
      "Poco sensible a disfunción ejecutiva",
      "No evalúa todas las funciones cognitivas"
    ],
    references: "Folstein et al. (1975). Journal of Psychiatric Research"
  }
}

// Funciones de utilidad para manejo de escalas
export const getScaleConfig = (scaleId) => {
  return scaleConfigs[scaleId] || null
}

export const getScaleData = (scaleId) => {
  return scalesData.find(scale => scale.id === scaleId) || null
}

export const getScaleHelpInfo = (scaleId) => {
  return scalesHelpInfo[scaleId] || null
}

export const getAvailableScales = () => {
  return scalesData.filter(scale => scale.available)
}

export const getScalesByType = (applicationType) => {
  return scalesData.filter(scale => scale.applicationType === applicationType)
}

export const getScalesByDiagnostic = (diagnostic) => {
  return scalesData.filter(scale => scale.diagnostics.includes(diagnostic))
}

// Exportar escalas individuales para compatibilidad hacia atrás
export * from './phq9.js'
export * from './gadi.js'
export * from './hars.js'
export * from './mos-sleep.js'
export * from './bls-23.js'
export * from './beck-21.js'
export * from './cdi.js'
export * from './aq-child.js'
export * from './aq-adolescent.js'
export * from './ipde.js'
export * from './salamanca.js'
export * from './sss-v.js'
export * from './audit.js'
export * from './bdi-13.js'
export * from './esadfun.js'
export * from './ctq-sf.js'
export * from './dts.js'
export * from './eat-26.js'
export * from './cpq-a.js'
export * from './epds.js'
export * from './iief-15.js'
export * from './edi.js'
export * from './emun-ar.js'
export * from './plutchik-ei.js'
export * from './stai.js'
export * from './tdah.js'