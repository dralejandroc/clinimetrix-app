# PROMPT PARA ESTRUCTURAR ESCALAS EN PLATAFORMA CLINIMETRIX

## CONTEXTO TÉCNICO
Soy el desarrollador de **Clinimetrix**, una plataforma de escalas automatizadas para evaluación psicológica/psiquiátrica. Necesito que me ayudes a estructurar una nueva escala psicológica siguiendo nuestro **sistema genérico** establecido.

## ARQUITECTURA DE LA PLATAFORMA

### 1. ESTRUCTURA DE ARCHIVOS
Cada escala tiene un archivo individual en `src/app/scales/[nombre-escala].js` con estas exportaciones:
- `[nombre]Questions`: Array de preguntas
- `[nombre]Options`: Opciones de respuesta (si son uniformes)
- `[nombre]OptionsSpecial`: Opciones específicas por pregunta (si varían)
- `calculate[Nombre]Score`: Función de cálculo de puntuaciones
- `[nombre]Config`: Configuración completa de la escala
- `[nombre]ScaleData`: Datos para el catálogo
- `[nombre]HelpInfo`: Información de ayuda detallada

### 2. TIPOS DE ESCALAS SOPORTADAS

#### AUTOAPLICADAS
- Usuario responde directamente
- Flujo: Profesional → Paciente → Resultados
- Ejemplos: PHQ-9, GADI, MOS Sleep

#### HETEROAPLICADAS  
- Profesional aplica al paciente
- Flujo directo a resultados
- Ejemplos: HARS

### 3. CARACTERÍSTICAS AVANZADAS SOPORTADAS

#### TIPOS DE PREGUNTAS
- **Estándar**: Texto + opciones uniformes
- **Objeto**: `{ text, description }` para información adicional
- **Porcentaje**: Slider 0-100% con etiquetas personalizadas
- **Declaraciones múltiples**: Varias afirmaciones por ítem

#### OPCIONES DE RESPUESTA
- **Uniformes**: Mismas opciones para todas las preguntas
- **Dinámicas**: Diferentes opciones por pregunta específica
- **Visuales**: Con emojis y colores (ej: AQ-Child)
- **Graduales**: Escalas tipo Likert personalizadas

#### SUBESCALAS MÚLTIPLES
- Cálculo automático de dimensiones separadas
- Interpretación individual por subescala
- Transformaciones matemáticas complejas

#### CARACTERÍSTICAS ESPECIALES
- **Scoring inverso**: Preguntas con puntuación invertida
- **Alertas críticas**: Detección de riesgo alto
- **Barras de porcentaje**: Evaluación funcional visual
- **Contenido sensible**: Advertencias especiales

### 4. GRUPOS DE EDAD SOPORTADOS
- **Niños**: 4-11 años (ej: AQ-Child)
- **Adolescentes**: 10-17 años (ej: CDI, AQ-Adolescent)  
- **Adultos**: ≥18 años (ej: PHQ-9, HARS)
- **Rangos específicos**: Personalizables

---

## INFORMACIÓN REQUERIDA

Para estructurar correctamente una nueva escala, necesito que me proporciones:

### 📋 DATOS BÁSICOS
1. **Nombre completo** de la escala
2. **Nombre corto/acrónimo**
3. **Propósito/objetivo** de evaluación
4. **Población objetivo** (edad, características)
5. **Tipo de aplicación** (autoaplicada/heteroaplicada)
6. **Tiempo estimado** de aplicación
7. **Categorías/tags** relevantes

### 📝 PREGUNTAS Y OPCIONES
8. **Lista completa de preguntas/ítems**
9. **Opciones de respuesta** para cada pregunta
10. **Instrucciones específicas** para el usuario
11. **Preguntas especiales** (porcentaje, múltiples declaraciones, etc.)

### 🧮 SISTEMA DE PUNTUACIÓN
12. **Método de cálculo** del puntaje total
13. **Subescalas** (si las hay) y cómo se calculan
14. **Ítems con puntuación inversa** (si los hay)
15. **Fórmulas matemáticas** específicas
16. **Transformaciones** necesarias (promedios, sumas, multiplicaciones)

### 📊 INTERPRETACIÓN
17. **Rangos de puntuación** y significado clínico
18. **Puntos de corte** diagnósticos
19. **Niveles de severidad** (leve, moderado, severo)
20. **Interpretación por subescalas** (si aplica)

### ⚠️ ALERTAS Y CONSIDERACIONES
21. **Ítems críticos** que requieren atención inmediata
22. **Factores de riesgo** a destacar
23. **Contraindicaciones** o precauciones
24. **Contenido sensible** (drogas, sexualidad, violencia)

### 🎨 PRESENTACIÓN VISUAL
25. **Colores** preferidos para la interfaz
26. **Iconos** sugeridos
27. **Estilo de respuestas** (visual, textual, emojis)
28. **Elementos especiales** de UI necesarios

### 📚 INFORMACIÓN ADICIONAL
29. **Autores/desarrolladores** de la escala
30. **Año de publicación**
31. **Validación** en población específica
32. **Referencias bibliográficas** importantes
33. **Notas especiales** de aplicación

---

## EJEMPLO DE SALIDA ESPERADA

Al proporcionar esta información, generaré:

```javascript
// Archivo: nombre-escala.js
export const nombreEscalaQuestions = [...]
export const nombreEscalaOptions = [...]
export const calculateNombreEscalaScore = (responses) => {...}
export const nombreEscalaConfig = {...}
export const nombreEscalaScaleData = {...}
export const nombreEscalaHelpInfo = {...}
```

**Formato de respuesta ideal**: Proporciona la información en el orden listado, siendo lo más específico posible. Si algún elemento no aplica para tu escala, indícalo claramente.

---

## PREGUNTA PARA INICIAR
**¿Qué escala psicológica/psiquiátrica quieres que estructure para la plataforma Clinimetrix? Proporciona toda la información disponible siguiendo la lista anterior.**