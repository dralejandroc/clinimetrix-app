# Clinimetrix App - Configuración de Desarrollo

## Comandos de desarrollo
- **Iniciar servidor**: `npm run dev`
- **Build**: `npm run build`
- **Linting**: Sin configurar aún
- **Testing**: Sin configurar aún

## Arquitectura del proyecto
- Framework: Next.js 15 con JavaScript (no TypeScript)
- Estilos: Tailwind CSS v3.4.17 (funcionando correctamente)
- Backend: Xano
- Autenticación: Auth0 (hasta el deployment, de momento para revisión en local, no hay login)

## Colores de marca
- Fondo principal: #FFF8EE
- Texto principal: #112F33
- Color primario: #29A98C
- Color acento: #EC7367

## Planes de suscripción definidos
1. **Gratuito**: $0 - 25 apps/mes, 50 pacientes, 3 meses historial
2. **Individual**: $99 - 50 apps/mes, 200 pacientes, 6 meses historial
3. **Ilimitado**: $150 - Apps ilimitadas, pacientes ilimitados, 2 años historial
4. **Clínicas**: $599 - 100 apps/mes por usuario, hasta 10 usuarios, +$50 por usuario extra

## Problemas conocidos y soluciones
- **Problema**: Errores de permisos npm y instalación
  - **Solución**: Usar inline styles, evitar dependencias complejas
- **Problema resuelto**: ~~Tailwind CSS no compila~~
  - **Solución**: Instalado Tailwind CSS v3.4.17 con configuración correcta (tailwind.config.js y postcss.config.js)
- **Problema**: Servidor no responde
  - **Solución**: Reiniciar con `npm run dev`, usar código simplificado

## Información del dominio
- **Dominio principal**: mindhub.cloud
- **Email de soporte**: soporte@mindhub.cloud

## Escalas implementadas
- **PHQ-9**: Patient Health Questionnaire-9 (Depresión) - Completamente funcional (Actualizado con evaluación de funcionalidad mediante barra de porcentaje 0-100%, opciones visuales con emojis)
- **GADI**: Inventario de Ansiedad Generalizada - Completamente funcional  
- **HARS**: Escala de Hamilton para la Ansiedad - Completamente funcional (Heteroaplicada)
- **MOS Sleep**: Escala de Sueño MOS - Completamente funcional (6 subescalas, opciones dinámicas)
- **BLS-23**: Lista de Síntomas de Trastorno Límite - Completamente funcional (Personalidad, alertas críticas, barra de porcentaje)
- **Beck-21**: Inventario de Depresión de Beck (versión larga) - Completamente funcional (4 subescalas, scoring no lineal)
- **CDI**: Cuestionario de Depresión Infantil - Completamente funcional (Niños/adolescentes 7-17 años, 2 subescalas, alertas críticas)
- **AQ-Child**: Cociente de TEA Niño - Completamente funcional (Niños 4-11 años, 5 subescalas, respuestas visuales con colores y emojis)
- **AQ-Adolescent**: Cociente de TEA Adolescente - Completamente funcional (Adolescentes 10-17 años, 5 subescalas, respuestas con emojis)
- **IPDE**: Examen Internacional de los Trastornos de Personalidad - Completamente funcional (Adultos ≥18 años, 9 trastornos en 3 clusters, scoring inverso, alertas críticas)
- **Salamanca**: Cuestionario Salamanca de Trastornos de la Personalidad - Completamente funcional (Adultos, 11 trastornos DSM-IV en 3 clusters, respuestas graduales únicas: Falso/A veces/Con frecuencia/Siempre)
- **SSS-V**: Escala de Búsqueda de Sensaciones - Completamente funcional (Adolescentes y adultos, 3 subescalas específicas, respuestas SÍ/NO, contenido sensible: drogas, sexualidad, riesgo)

## Sistema genérico de escalas
- **Arquitectura modular**: Sistema unificado con escalas separadas en archivos individuales
- **Estructura de carpetas**:
  ```
  src/app/scales/
  ├── index.js (importa y exporta todas las escalas)
  ├── phq9.js (PHQ-9 completo)
  ├── gadi.js (GADI completo)
  ├── hars.js (HARS completo)
  ├── mos-sleep.js (MOS Sleep con subescalas complejas)
  ├── bls-23.js (BLS-23 con alertas críticas y porcentaje)
  ├── beck-21.js (Beck-21 con declaraciones múltiples y 4 subescalas)
  ├── cdi.js (CDI con evaluación pediátrica y 2 subescalas)
  ├── aq-child.js (AQ-Child con respuestas visuales y 5 subescalas)
  ├── aq-adolescent.js (AQ-Adolescent con respuestas con emojis y 5 subescalas)
  ├── ipde.js (IPDE con 9 trastornos de personalidad en 3 clusters y scoring inverso)
  ├── salamanca.js (Salamanca con 11 trastornos DSM-IV en 3 clusters y respuestas graduales)
  ├── sss-v.js (SSS-V con 3 subescalas de búsqueda de sensaciones y contenido sensible)
  └── ... (escalas futuras)
  ```
- **Componentes**: Páginas genéricas que se adaptan según la configuración de cada escala
- **Configuración por escala**: Cada archivo contiene preguntas, opciones, scoring, interpretación y alertas
- **Funciones genéricas**: 
  - `handleStartScale(scaleId)` - Inicia cualquier escala
  - `handleScaleResponse()` - Maneja respuestas genéricas
  - `autoSaveGenericEvaluation()` - Guardado universal
- **Páginas genéricas**:
  - `currentPage === 'scale'` - Página única para todas las escalas
  - Resultados unificados con interpretación automática
- **Flujo de experiencia separado**:
  - **Tarjeta del Profesional**: Configuración, búsqueda de paciente, modo de aplicación
  - **Tarjeta del Paciente**: Instrucciones específicas, bienvenida personalizada
  - **Diferenciación por modo**:
    - **Presencial**: "Pasar dispositivo al médico" → Botón para profesional
    - **A distancia**: "Resultados enviados" → Botón de finalizar para paciente
- **Diferenciación por tipo de aplicación**:
    - **Autoaplicadas** (PHQ-9, GADI, MOS Sleep): Flujo completo con tarjetas del profesional y paciente
    - **Heteroaplicadas** (HARS): Saltan tarjeta de instrucciones y van directo a resultados
- **Escalas complejas soportadas**:
    - **Preguntas con objetos**: Texto principal + descripción adicional (MOS Sleep)
    - **Opciones dinámicas**: Diferentes opciones por pregunta según contexto
    - **Subescalas múltiples**: Cálculo automático de múltiples dimensiones
    - **Scoring complejo**: Fórmulas avanzadas con promedios y transformaciones
    - **Barras de porcentaje**: Slider interactivo para evaluaciones generales (BLS-23, PHQ-9 funcionalidad)
    - **Declaraciones múltiples**: Múltiples afirmaciones por ítem con scoring no lineal (Beck-21)
    - **Respuestas visuales**: Opciones con colores y emojis para facilitar comprensión (AQ-Child)
    - **Alertas críticas**: Detección automática de conductas de alto riesgo
- **Características**:
  - Búsqueda activa de pacientes con autocompletado
  - Selección de modo (local/remoto)
  - Instrucciones dinámicas por escala
  - Experiencia separada profesional/paciente
  - Scoring automático con interpretación clínica
  - Alertas clínicas específicas por escala
  - Exportación a PDF con formato profesional
  - Finalización diferenciada según modo de aplicación

## Próximos pasos
1. ✅ ~~Implementar sistema de scoring genérico para escalas~~
2. ✅ ~~Crear formularios dinámicos para escalas~~
3. ✅ ~~Agregar HARS como escala heteroaplicada~~
4. ✅ ~~Refactorizar a arquitectura modular (separar escalas en archivos)~~
5. Integrar autenticación con Xano
6. Desarrollar gestión de pacientes
7. Configurar deployment para mindhub.cloud
8. Agregar más escalas al sistema genérico (GAD-7, Beck-21, etc.)

## Beneficios de la arquitectura modular
- **Escalabilidad**: Fácil agregar nuevas escalas sin inflar page.js
- **Mantenibilidad**: Cada escala es independiente y fácil de modificar
- **Reutilización**: Funciones compartidas a través del sistema
- **Organización**: Código limpio y bien estructurado para 50+ escalas

## Indicaciones especificas de Alejandro para trabajar:
1. Primero, analiza el problema, lee el código base para encontrar los archivos relevantes y escribe un plan en task/todo.md.
2. El plan debe incluir una lista de tareas pendientes que puedas marcar a medida que las completes.
3. Antes de empezar a trabajar, contáctame y verificaré el plan.
4. Luego, empieza a trabajar en las tareas pendientes, marcándolas como completadas a medida que avanzas. 5. Por favor, en cada paso del proceso, simplemente dame una explicación detallada de los cambios que realizaste.
6. Simplifica al máximo cada tarea y cambio de código que realices. Queremos evitar cambios masivos o complejos. Cada cambio debe afectar la menor cantidad de código posible. Todo se basa en la simplicidad.
7. Finalmente, agrega una sección de revisión al archivo [todo.md]con un resumen de los cambios que realizaste y cualquier otra información relevante.

## Indicación de seguridad:

Revisa todo el código que acabas de escribir y asegúrate de que cumpla con las mejores prácticas de seguridad. Asegúrate de que no contenga información confidencial ni vulnerabilidades que puedan explotarse.