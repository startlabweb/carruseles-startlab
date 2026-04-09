/**
 * StartLab brand adaptation via Claude Sonnet
 * Reescrito desde analyzer/startlab_adapter.py
 */

import { AnalyzedItem, AdaptedItem, CarruselSlide } from '@/types'
import { calculateTokenCost, toOpenRouterModel } from '@/lib/pricing'

const STARTLAB_CONTEXT = `## EMPRESA: StartLab — Plataforma de escalado para negocios digitales B2B

### Quién es StartLab
Empresa de educación y consultoría B2B con 10+ años, 800+ clientes y equipo de 16 personas. Liderada por María Rodríguez (CEO), Raquel Román y Álvaro Menendez. Ayudan a dueños de negocios digitales de servicios a pasar de operaciones frágiles y dependientes del fundador a empresas sistematizadas, rentables y predecibles.

### Cliente ideal (ICP)
Dueños de negocios digitales de educación online, coaching, consultoría, agencias digitales e infoproductos. Tienen 30-50 años, son expertos reconocidos en su campo con casos de éxito reales, pero su operación es frágil.

**Perfil ME6 (programa principal):** Facturan 5k-30k USD/mes con inestabilidad. Quieren escalar a 50k-80k USD/mes.
**Perfil ME7 (programa avanzado):** Facturan 20k-300k USD/mes pero dependen 100% de su presencia. "Castillo de arena con buena facturación."

### Dolores específicos del ICP (usar estos, NO genéricos)
- Facturación inestable: un mes espectacular, al siguiente no saben qué va a pasar
- Esclavos del contenido y del marketing: publican diario sin retorno predecible
- Dependencia de lanzamientos agotadores para pagar las cuentas (picos de 30k-60k seguidos de meses vacíos)
- Clientes de bajo ticket que exigen demasiado tiempo y soporte
- Miedo a contratar equipo sin ingresos predecibles
- Sensación de "pulpo": hacen todo ellos mismos, el negocio no funciona sin su presencia
- Tasa de cierre baja (<20%), reembolsos altos (>10%), gastos desordenados
- Márgenes pequeños a pesar de buenos ingresos brutos ("no es que no venden, es que manejan fatal el dinero")

### Deseos concretos del ICP
- 5-15 clientes premium pagando +2k USD cada uno (no volumen, sino valor)
- Sistema automático que genere mínimo 30 llamadas calificadas/mes
- Tasa de cierre del 20%+ con setter y closer profesionalizados
- 90 días consecutivos de facturación predecible
- Márgenes netos superiores al 30%
- Delegar sin perder control: "trabajar CON el sistema, no contra él"
- Construir una empresa real: elegante, rentable y sostenible

### Los Dos Pilares de StartLab
1. **Promesa de Alto Valor** — Una oferta específica, medible, dirigida a un nicho claro que justifique tickets de +2k USD
2. **Sistema Automático de Captación y Filtro** — Generación sistemática de leads calificados con filtro integrado (30+ llamadas/mes)

### Programas
- **ME6 (Máster en 6 Cifras):** "Sumar al menos 10k USD extras mensuales en 90 días con un Sistema Automático de Captación de Clientes de Alto Valor." Incluye funnel pre-armado, coaching 1:1 semanal, templates de ads/copy/landing, blueprint de delegación.
- **ME7 (Sistema Empresarial):** Para 20k-300k/mes que quieren sistematizar: sistema de adquisición predecible, equipo comercial, entrega delegable, finanzas ordenadas.

### Estructura retórica del contenido StartLab (SIEMPRE usar)
"Lo que la mayoría hace → Por qué es un problema → Lo que en última instancia genera → En cambio, lo que debes hacer es → Cuando haces esto, obtienes..."

### Reframe central de StartLab (el insight que diferencia)
"No es marketing, es estructura." "No necesitas más seguidores, ni más contenido, ni otro lanzamiento agotador." "No necesitas más tráfico ni más leads." El problema NO es su talento ni su nicho — es su SISTEMA DE VENTAS.

### Modelo de márgenes (referencia para argumentos financieros)
Publicidad: max 20% | Sueldos: max 30% | Overhead: max 10% | Formación: max 5% | Reembolsos: max 5% → Margen mínimo: 30%

### Terminología OBLIGATORIA
USAR: "sistema predecible", "captación automatizada", "clientes premium", "alto valor", "promesa de alto valor", "llamadas calificadas", "setter", "closer", "tasa de cierre", "ingresos recurrentes", "90 días", "escalar sin lanzamientos", "facturación predecible", "empresa elegante", "libertad operativa"

PROHIBIDO: "emprender desde cero", "ganar los primeros 1k", "más seguidores", "más contenido", "crecer en redes", "motivación", dropshipping, e-commerce físico, negocios locales, promesas mágicas, métricas inventadas, casos de éxito no documentados, dirigirse a principiantes sin negocio validado

### Tono de voz
Directo, profesional, basado en datos. Como un mentor confiado que ha estado ahí, usa números religiosamente y se rehúsa a sobrevender. Habla de sistema y estructura, no de motivación. Conversacional e íntimo (como consejo de un amigo experto, no corporativo). Usa frases cortas para énfasis. Primero datos, después explicación.

### CTAs estándar
- "Si ya facturas entre X y X y quieres escalar a 50k-80k, debajo tienes un enlace para agendar una llamada con nuestro equipo."
- "Agenda una llamada sin compromiso. Solo claridad."
- "El enlace está abajo. Sin compromiso. Solo estructura."`

const ADAPT_PROMPT = `Eres el estratega de contenido #1 de StartLab, una empresa B2B de educación y consultoría que ayuda a coaches, consultores, agencias e infoproductores a escalar de 5k-30k a 50k-80k USD/mes con un sistema predecible.

Tu mentalidad al adaptar contenido:
- Primero dolor, después solución (nunca al revés)
- Números específicos siempre (no claims genéricos)
- Desafiar las falsas soluciones primero ("No es X, es Y")
- Mostrar evidencia y datos, no solo testimonios
- Enfocarte en márgenes y sistema, no métricas de vanidad
- Frases cortas y directas para énfasis
- Español auténtico latinoamericano, no corporativo traducido

---
{brand_context}
---

## REEL ORIGINAL A ADAPTAR

**Cuenta:** @{account}
**Plataforma:** {platform}
**Views:** {views}

**Transcript original:**
{transcript}

**Análisis de por qué funciona:**
- Hook: {hook}
- Tipo de hook: {hook_tipo}
- Estructura: {estructura}
- Estilo: {estilo}
- CTA original: {cta}
- Fórmula viral: {formula_viral}

---

## REGLAS DE ADAPTACIÓN STARTLAB

**ESTRUCTURA RETÓRICA OBLIGATORIA** (aplicar siempre que el formato lo permita):
Lo que la mayoría hace → Por qué es un problema → Lo que en última instancia genera → En cambio, lo que debes hacer es → Cuando haces esto, obtienes...

**GANCHOS QUE FUNCIONAN PARA EL ICP** (usar como inspiración, adaptar la mecánica del original):
- "¿Estás facturando entre 10 y 30 mil dólares al mes… pero un mes es espectacular y al siguiente no sabes qué va a pasar?"
- "El 99% de los coaches/consultores que facturan 20k al mes tienen el mismo problema: no es que no venden, es que manejan fatal el dinero."
- "No necesitas más seguidores, ni más contenido, ni otro lanzamiento agotador."
- "¿Y si el problema no es tu talento, sino tu sistema de ventas?"

**DATOS REALES PARA USAR** (no inventar otros):
- Empresarios que facturaban 15k-25k mensuales sin estabilidad → hoy trabajan con 5-15 clientes premium pagando +2k USD
- Tasa de cierre objetivo: 20%+ | Reembolsos objetivo: <5% | Margen neto: 30%+
- 30+ llamadas calificadas/mes | 90 días consecutivos de facturación predecible
- A mayor ticket, menor complejidad para escalar

**TRANSFORMACIONES REFERENCIALES** (nichos reales que han escalado):
- Agencias de migración → 200k/mes | Consultoría organizacional → 100k/mes
- Educación e-commerce → 100k/mes | Coaching de escalado → 70-90k/mes

**EL GUION DEBE:**
- Abrir con un dolor reconocible para alguien que factura 10k-30k/mes con inestabilidad
- Eliminar falsas soluciones antes de presentar la real
- Usar la terminología obligatoria de StartLab naturalmente
- Cerrar SIEMPRE con CTA: "Si ya facturas entre X y X al mes y quieres escalar a 50k-80k con un sistema predecible, el enlace está abajo. Sin compromiso. Solo estructura."

---

INSTRUCCIONES DE FORMATO:

1. guion_adaptado: guion completo en español con saltos de línea para indicar ritmo y cortes. Respetar la misma estructura y fórmula del original aplicada al ICP de StartLab. El guion debe sonar como María Rodríguez hablándole directamente a un consultor/coach que factura 15k-25k pero está agotado.

2. formula_estructura: primera línea: "FÓRMULA: [Nombre] → [parte1] → [parte2] → [parte3] → ...". Luego numeración 1, 2, 3... con NOMBRE EN MAYÚSCULAS: explicación de 2-4 líneas de qué cumple esa parte narrativamente.

3. estilo_produccion: 6 bloques con encabezado en MAYÚSCULAS: "TIPO DE PLANO:", "RITMO DE CORTE:", "ILUMINACIÓN:", "MÚSICA:", "ELEMENTOS EN PANTALLA:", "DURACIÓN RECOMENDADA:". Cada bloque con párrafo de instrucciones específicas. Paleta visual: Midnight Black (#121212), Gold (#EAB660→#C09D46), tipografía Red Hat Display en mayúsculas.

4. notas_grabacion: exactamente 3 tips numerados. NOMBRE EN MAYÚSCULAS: explicación de 3-5 líneas con instrucciones de entrega, voz, ritmo, pausa o corporalidad.

5. por_que_funciona: 3 a 5 puntos numerados. RAZÓN EN MAYÚSCULAS: explicación de 2-4 líneas conectando el mecanismo viral con el dolor/deseo específico del ICP de StartLab.

6. carrusel.slides: 7-10 slides. Slide 1 = portada (gancho directo al dolor). Intermedios = contenido (estructura retórica StartLab). Último = CTA. Bullets con • si aplica.

JSON estricto (sin markdown, sin texto extra):
{
  "hook_adaptado": "Hook en español usando la mecánica viral del original aplicada al dolor del ICP de StartLab",
  "hook_variantes": [
    "Variante 1: mismo mecanismo, ángulo de inestabilidad financiera",
    "Variante 2: mismo mecanismo, ángulo de dependencia de lanzamientos",
    "Variante 3: mismo mecanismo, ángulo de esclavitud del contenido"
  ],
  "guion_adaptado": "Guion completo. Saltos de línea para ritmo. Estructura retórica StartLab. CTA al final.",
  "formula_estructura": "FÓRMULA: [Nombre] → ... \\n\\n1. NOMBRE: explicación...",
  "estilo_produccion": "TIPO DE PLANO: ...\\n\\nRITMO DE CORTE: ...\\n\\nILUMINACIÓN: ...\\n\\nMÚSICA: ...\\n\\nELEMENTOS EN PANTALLA: ...\\n\\nDURACIÓN RECOMENDADA: ...",
  "notas_grabacion": "1. NOMBRE: explicación...\\n\\n2. NOMBRE: explicación...\\n\\n3. NOMBRE: explicación...",
  "por_que_funciona": "1. RAZÓN: explicación...\\n\\n2. RAZÓN: explicación...\\n\\n3. RAZÓN: explicación...",
  "carrusel": {
    "slides": [
      {"numero": 1, "tipo": "portada", "titulo": "Gancho directo (máx 8 palabras)", "subtitulo": "Completa la promesa (máx 12 palabras)"},
      {"numero": 2, "tipo": "contenido", "titulo": "Título corto", "cuerpo": "Texto. Bullets con • si aplica. Máx 4 líneas."},
      {"numero": 3, "tipo": "contenido", "titulo": "Título corto", "cuerpo": "Texto del slide."},
      {"numero": 4, "tipo": "contenido", "titulo": "Título corto", "cuerpo": "Texto del slide."},
      {"numero": 5, "tipo": "contenido", "titulo": "Título corto", "cuerpo": "Texto del slide."},
      {"numero": 6, "tipo": "contenido", "titulo": "Título corto", "cuerpo": "Texto del slide."},
      {"numero": 7, "tipo": "contenido", "titulo": "Título corto", "cuerpo": "Texto del slide."},
      {"numero": 8, "tipo": "cta", "titulo": "CTA final", "cuerpo": "Texto de cierre con CTA de StartLab"}
    ],
    "cta_ultimo_slide": "CTA de StartLab"
  }
}`

// ─── Normalización de la respuesta de Claude ─────────────────────────────────
// Claude es impredecible: a veces devuelve strings, a veces objetos, a veces
// arrays. Esta función convierte todo a texto plano antes de guardar en Supabase.

type RawValue = string | Record<string, unknown> | unknown[] | unknown

function toPlainText(val: RawValue): string {
  if (val == null) return ''
  if (typeof val === 'string') {
    // Detectar si es un JSON string y parsearlo
    const t = val.trim()
    if (t.length > 2 && (t.startsWith('{') || t.startsWith('['))) {
      try { return toPlainText(JSON.parse(t) as RawValue) } catch { /* not JSON */ }
    }
    return val
  }
  if (Array.isArray(val)) {
    return val.map((item, i) => {
      if (typeof item === 'string') return item
      if (item && typeof item === 'object') {
        const obj = item as Record<string, unknown>
        // Bloques de guion: {etiqueta, texto}
        if ('etiqueta' in obj && 'texto' in obj) return `${obj.etiqueta}\n${obj.texto}`
        if ('texto' in obj) return String(obj.texto)
        // Objeto genérico en array: concatenar valores string
        const strings = Object.entries(obj)
          .filter(([, v]) => typeof v === 'string')
          .map(([k, v]) => `${k.toUpperCase().replace(/_/g, ' ')}: ${v}`)
        return strings.length ? strings.join('\n') : `${i + 1}. ${JSON.stringify(obj)}`
      }
      return String(item)
    }).join('\n\n')
  }
  if (typeof val === 'object') {
    const obj = val as Record<string, unknown>
    // Guion: {bloques: [{etiqueta, texto}...], estructura?}
    if ('bloques' in obj && Array.isArray(obj.bloques)) {
      return (obj.bloques as Array<Record<string, unknown>>)
        .map(b => `${b.etiqueta || ''}\n${b.texto || ''}`.trim())
        .join('\n\n')
    }
    // Fórmula: {pasos: [...], nombre?, reframe_central?, tension_narrativa?}
    if ('pasos' in obj) {
      const parts: string[] = []
      if (obj.nombre) parts.push(`FÓRMULA: ${obj.nombre}`)
      if (Array.isArray(obj.pasos)) parts.push((obj.pasos as string[]).map((p, i) => `${i + 1}. ${p}`).join('\n'))
      if (obj.reframe_central) parts.push(`\nREFRAME CENTRAL: ${obj.reframe_central}`)
      if (obj.tension_narrativa) parts.push(`TENSIÓN NARRATIVA: ${obj.tension_narrativa}`)
      return parts.join('\n')
    }
    // Objeto simple con "texto"
    if ('texto' in obj) return String(obj.texto)
    // Objeto genérico: formatear como secciones etiquetadas
    return Object.entries(obj)
      .filter(([, v]) => v != null && v !== '')
      .map(([k, v]) => {
        const label = k.toUpperCase().replace(/_/g, ' ')
        if (Array.isArray(v)) {
          return `${label}:\n${(v as unknown[]).map(item => `• ${typeof item === 'string' ? item : JSON.stringify(item)}`).join('\n')}`
        }
        if (typeof v === 'object') return `${label}:\n${toPlainText(v as RawValue)}`
        return `${label}: ${v}`
      })
      .join('\n\n')
  }
  return String(val)
}

const STANDARD_SLIDE_TYPES = new Set(['portada', 'contenido', 'cta'])

function normalizeSlides(slides: unknown): CarruselSlide[] {
  // Si slides es un objeto numerado {1: {...}, 2: {...}} en lugar de array
  const arr: unknown[] = Array.isArray(slides)
    ? slides
    : (slides && typeof slides === 'object')
      ? Object.values(slides as Record<string, unknown>)
      : []

  return arr.map((slide, i): CarruselSlide => {
    if (!slide || typeof slide !== 'object') {
      return { numero: i + 1, tipo: 'contenido', titulo: String(slide || ''), cuerpo: '' }
    }
    const s = slide as Record<string, unknown>
    const tipoRaw = toPlainText(s.tipo as RawValue).trim().toLowerCase()
    const tipoIsStandard = STANDARD_SLIDE_TYPES.has(tipoRaw)
    const tipoNorm: CarruselSlide['tipo'] = tipoRaw === 'portada' ? 'portada'
      : tipoRaw === 'cta' || tipoRaw.includes('cta') ? 'cta'
      : 'contenido'
    // Si tipo no es estándar, Claude lo usó como título descriptivo → moverlo a titulo
    const titulo = toPlainText(s.titulo as RawValue) || (!tipoIsStandard ? toPlainText(s.tipo as RawValue).trim() : '')
    const subtitulo = toPlainText(s.subtitulo as RawValue) || undefined
    return {
      numero: typeof s.numero === 'number' ? s.numero : i + 1,
      tipo: tipoNorm,
      titulo,
      ...(subtitulo ? { subtitulo } : {}),
      cuerpo: toPlainText(s.cuerpo as RawValue),
    }
  })
}

type AdaptationData = {
  hook_adaptado: string
  hook_variantes: string[]
  guion_adaptado: string
  formula_estructura: string
  estilo_produccion: string
  notas_grabacion: string
  por_que_funciona: string
  carrusel: {
    slides: CarruselSlide[]
    cta_ultimo_slide: string
  }
}

function normalizeAdaptation(parsed: Record<string, unknown>): AdaptationData {
  const carruselRaw = parsed.carrusel as Record<string, unknown> | undefined
  return {
    hook_adaptado:     toPlainText(parsed.hook_adaptado as RawValue),
    hook_variantes:    Array.isArray(parsed.hook_variantes)
                         ? (parsed.hook_variantes as unknown[]).map(v => toPlainText(v as RawValue))
                         : [],
    guion_adaptado:    toPlainText(parsed.guion_adaptado as RawValue),
    formula_estructura: toPlainText(parsed.formula_estructura as RawValue),
    estilo_produccion: toPlainText(parsed.estilo_produccion as RawValue),
    notas_grabacion:   toPlainText(parsed.notas_grabacion as RawValue),
    por_que_funciona:  toPlainText(parsed.por_que_funciona as RawValue),
    carrusel: {
      slides: normalizeSlides(carruselRaw?.slides),
      cta_ultimo_slide: toPlainText(carruselRaw?.cta_ultimo_slide as RawValue),
    },
  }
}

// ─── Extractor robusto de JSON ────────────────────────────────────────────────
// Claude a veces devuelve JSON dentro de prosa, markdown, o con texto extra.
// Esta función intenta múltiples estrategias para extraer el JSON válido.

function extractJson(text: string): Record<string, unknown> | null {
  // 1. Limpiar markdown code block (```json ... ```)
  let cleaned = text.trim()
  const codeBlockMatch = cleaned.match(/```(?:json)?\s*([\s\S]*?)```/)
  if (codeBlockMatch) cleaned = codeBlockMatch[1].trim()

  // 2. Intentar parse directo
  try { return JSON.parse(cleaned) as Record<string, unknown> } catch { /* sigue */ }

  // 3. Buscar el objeto JSON más grande en el texto (primer { ... último })
  const firstBrace = cleaned.indexOf('{')
  const lastBrace = cleaned.lastIndexOf('}')
  if (firstBrace !== -1 && lastBrace > firstBrace) {
    const candidate = cleaned.slice(firstBrace, lastBrace + 1)
    try { return JSON.parse(candidate) as Record<string, unknown> } catch { /* sigue */ }
  }

  // 4. Buscar bloques ```json en el texto sin backticks al inicio
  const jsonInText = text.match(/```json\s*([\s\S]*?)```/)
  if (jsonInText) {
    try { return JSON.parse(jsonInText[1].trim()) as Record<string, unknown> } catch { /* sigue */ }
  }

  return null
}

// ─────────────────────────────────────────────────────────────────────────────

export async function adaptToStartLab(
  item: AnalyzedItem,
  openrouterKey: string,
  model = 'anthropic/claude-sonnet-4.6',
  customPrompt?: string
): Promise<AdaptedItem> {
  const content = (item.transcript || item.caption || '').slice(0, 3000)
  const analysis = (item.analysis || {}) as Record<string, string>

  if (!content || !openrouterKey) {
    console.error(`[Adapter] Early return: content=${!!content} key=${!!openrouterKey} account=${item.account}`)
    return { ...item, _adaptation_error: !content ? 'no_content' : 'no_key' }
  }

  // El customPrompt siempre se usa como contexto de marca (reemplaza {brand_context}).
  // ADAPT_PROMPT siempre controla el formato de salida y el schema JSON.
  // Esto garantiza que cambiar el prompt en Config nunca rompe el output.
  const prompt = ADAPT_PROMPT
    .replace('{brand_context}', customPrompt || STARTLAB_CONTEXT)
    .replace('{account}', item.account)
    .replace('{platform}', item.platform.toUpperCase())
    .replace('{views}', item.views.toLocaleString())
    .replace('{transcript}', content)
    .replace('{hook}', analysis.hook || 'N/A')
    .replace('{hook_tipo}', analysis.hook_tipo || 'N/A')
    .replace('{estructura}', analysis.estructura || 'N/A')
    .replace('{estilo}', analysis.estilo || 'N/A')
    .replace('{cta}', analysis.cta || 'N/A')
    .replace('{formula_viral}', analysis.formula_viral || 'N/A')

  try {
    const resolvedModel = toOpenRouterModel(model, 'anthropic/claude-3.5-sonnet')
    console.log(`[Adapter] Calling OpenRouter model=${resolvedModel} account=${item.account}`)
    const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openrouterKey}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model: resolvedModel,
        max_tokens: 8000,
        provider: {
          order: ['Anthropic'],
        },
        response_format: { type: 'json_object' },
        messages: [{ role: 'user', content: prompt }],
      }),
      signal: AbortSignal.timeout(120000),
    })

    if (!res.ok) {
      const errBody = await res.text()
      console.error(`[Adapter] OpenRouter error: ${res.status} body=${errBody.slice(0, 300)}`)
      return { ...item, _adaptation_error: `openrouter_${res.status}: ${errBody.slice(0, 200)}` }
    }

    const data = await res.json() as {
      choices: Array<{ message: { content: string } }>
      usage?: { prompt_tokens: number; completion_tokens: number }
    }

    const rawText = data.choices[0].message.content.trim()
    console.log(`[Adapter] Raw response (first 300 chars): ${rawText.slice(0, 300)}`)

    const parsed = extractJson(rawText)
    if (!parsed) {
      console.error(`[Adapter] JSON parse failed. Raw: ${rawText.slice(0, 500)}`)
      return { ...item, _adaptation_error: `json_parse_failed: ${rawText.slice(0, 200)}` }
    }
    const input_tokens = data.usage?.prompt_tokens || 0
    const output_tokens = data.usage?.completion_tokens || 0
    const tokens_used = input_tokens + output_tokens
    const cost = calculateTokenCost(resolvedModel, input_tokens, output_tokens)

    return {
      ...item,
      adaptation: {
        ...normalizeAdaptation(parsed),
        _tokens_used: tokens_used,
        _cost: cost,
      },
    }
  } catch (err) {
    console.error(`[Adapter] Error para ${item.account} (${item.platform}):`, err)
    return { ...item, _adaptation_error: `exception: ${String(err)}` }
  }
}
