# CLAUDE.md — Carruseles StartLab

> Referencia operativa para la IA. Leer en cada sesión de trabajo.

---

## ⚠️ REGLAS CRÍTICAS (leer primero)

1. **GitHub: SIEMPRE `startlabweb`** — NUNCA `JoseAI-Automatizaciones`. Sin excepciones.
2. **NUNCA correr la app local** — todo cambio va via `git push`. Vercel hace deploy automático.
3. **Filtrar Sidecar desde el raw** — nunca normalizar primero y filtrar después (el campo `type` se pierde).
4. **`max_tokens: 8000` en OpenRouter** — con menos, el JSON de Claude se trunca en carruseles de 7-10 slides.
5. **No retry automático en Apify** — puede duplicar cobros. Si falla, mostrar error y dejar al usuario reintentar.

---

## Stack

- **Frontend:** HTML puro + JS vanilla (`fetch` nativo, sin frameworks, sin bundlers)
- **Deploy:** Vercel (static site, auto-deploy en cada `git push` a `main`)
- **Repo:** `https://github.com/startlabweb/carruseles-startlab`
- **APIs externas:** Apify (scraping), OpenRouter → Claude (adaptación), Notion (guardar resultados)

---

## Flujo de trabajo

```
Editar código → git add <archivo> → git commit -m "descripción" → git push → Vercel deploya
```

**Comandos estándar:**
```bash
git add index.html
git commit -m "descripción del cambio"
git push
```

Ver resultado en la URL de Vercel. Si algo falla: `vercel logs` o revisar el dashboard de Vercel.

---

## Estructura del proyecto

```
/
├── index.html          ← app completa (UI + lógica JS)
├── CLAUDE.md           ← este archivo (referencia operativa)
├── README.md           ← documentación para humanos
├── TROUBLESHOOTING.md  ← bugs conocidos y fixes
├── .gitignore
└── _reference/         ← implementaciones TypeScript de producción (leer, no modificar)
    ├── adapter.ts      ← extractJson(), toPlainText(), normalizeSlides(), normalizeAdaptation()
    ├── apify.ts        ← searchInstagramApify(), fetchInstagramByUrlApify(), runActorSync()
    ├── defaults.ts     ← keywords, perfiles IG/TikTok, STARTLAB_CONTEXT, prompts
    ├── filter.ts       ← deduplicación por URL
    └── notion.ts       ← createNotionPage(), buildPageBlocks(), richText()
```

---

## API: Apify (Instagram Scraper)

**Actor:** `apify/instagram-scraper`  
**Endpoint:** `https://api.apify.com/v2/acts/apify~instagram-scraper/run-sync-get-dataset-items?token=TOKEN`

### Función base
```js
async function callApify(input, apifyToken) {
  const url = `https://api.apify.com/v2/acts/apify~instagram-scraper/run-sync-get-dataset-items?token=${encodeURIComponent(apifyToken)}`
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
    signal: AbortSignal.timeout(120_000),  // 2 min — el actor puede tardar
  })
  if (!res.ok) {
    const errText = await res.text()
    let msg = `Apify HTTP ${res.status}`
    try {
      const e = JSON.parse(errText)
      if (e.error?.type === 'not-enough-usage-to-run-paid-actor') msg = 'Sin créditos en Apify. Recarga en console.apify.com/billing'
      else if (e.error?.message) msg = `Apify: ${e.error.message}`
    } catch {}
    throw new Error(msg)
  }
  const data = await res.json()
  return Array.isArray(data) ? data : [data]
}
```

### Búsqueda por keywords (hashtags)
```js
// UNA llamada por keyword — el actor NO acepta múltiples keywords en una sola llamada
async function searchByKeywords(keywords, objetivo, apifyToken) {
  const allRaw = []
  for (const keyword of keywords) {
    const resultsLimit = Math.max(objetivo * 4, 15)  // 4x el objetivo, mínimo 15
    const raw = await callApify({
      search: keyword,
      searchType: 'hashtag',
      searchLimit: 1,
      resultsType: 'posts',
      resultsLimit,
      onlyPostsNewerThan: '30 days',  // siempre formato relativo (no ISO)
      addParentData: false,
    }, apifyToken)
    allRaw.push(...raw)
    // Parar cuando hay suficientes Sidecars — no gastar más créditos
    if (allRaw.filter(i => i.type === 'Sidecar').length >= objetivo) break
  }
  // CRÍTICO: filtrar desde el raw, antes de normalizar
  return allRaw.filter(i => i.type === 'Sidecar').slice(0, objetivo)
}
```

### Búsqueda por URLs directas
```js
async function searchByUrls(urls, apifyToken) {
  const raw = await callApify({
    directUrls: urls,
    resultsType: 'posts',
    resultsLimit: urls.length,
    addParentData: false,
  }, apifyToken)
  // Filtrar solo Sidecars desde el raw
  return raw.filter(i => i.type === 'Sidecar')
}
```

### Campos garantizados en cada Sidecar
```js
{
  type: 'Sidecar',           // ← FILTRAR POR ESTE (desde el raw)
  shortCode: 'ABC123',
  url: 'https://www.instagram.com/p/ABC123/',
  caption: 'texto del post...',
  likesCount: 1240,
  commentsCount: 45,
  timestamp: '2025-03-15T10:00:00.000Z',
  ownerUsername: 'cuenta',
  ownerFullName: 'Nombre Completo',
  displayUrl: 'https://cdn.../imagen.jpg',  // primera imagen del carrusel
  // videoViewCount: null en carruseles de imágenes
}
```

---

## API: OpenRouter → Claude (Adaptación)

```js
async function adaptCarousel(carousel, openrouterKey) {
  const caption = carousel.caption || ''
  if (!caption) throw new Error('El carrusel no tiene caption — no hay contenido para adaptar')

  const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${openrouterKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'anthropic/claude-sonnet-4-6',
      max_tokens: 8000,  // OBLIGATORIO — con menos se trunca el JSON
      response_format: { type: 'json_object' },
      provider: { order: ['Anthropic'] },
      messages: [{ role: 'user', content: buildAdaptPrompt(carousel) }],
    }),
    signal: AbortSignal.timeout(120_000),
  })

  if (!res.ok) {
    const err = await res.text()
    throw new Error(`OpenRouter ${res.status}: ${err.slice(0, 200)}`)
  }

  const data = await res.json()
  const rawText = data.choices[0].message.content.trim()
  return parseClaudeResponse(rawText)
}
```

### Parseo robusto de respuestas Claude
```js
// NUNCA hacer JSON.parse() directo — Claude es impredecible en el formato
function extractJson(text) {
  let cleaned = text.trim()
  const codeBlock = cleaned.match(/```(?:json)?\s*([\s\S]*?)```/)
  if (codeBlock) cleaned = codeBlock[1].trim()
  try { return JSON.parse(cleaned) } catch {}
  const first = cleaned.indexOf('{'), last = cleaned.lastIndexOf('}')
  if (first !== -1 && last > first) {
    try { return JSON.parse(cleaned.slice(first, last + 1)) } catch {}
  }
  return null
}

// Normalizar valores — Claude a veces devuelve objetos/arrays en vez de strings
function toText(val) {
  if (val == null) return ''
  if (typeof val === 'string') return val
  if (Array.isArray(val)) return val.map(i =>
    typeof i === 'string' ? i :
    (i.etiqueta && i.texto) ? `${i.etiqueta}\n${i.texto}` :
    i.texto || JSON.stringify(i)
  ).join('\n\n')
  if (typeof val === 'object') {
    if (val.texto) return String(val.texto)
    return Object.entries(val).map(([k, v]) => `${k.toUpperCase()}: ${v}`).join('\n\n')
  }
  return String(val)
}

// Normalizar slides — Claude a veces devuelve {1: {...}, 2: {...}} en vez de array
function normalizeSlides(slides) {
  if (!slides) return []
  const arr = Array.isArray(slides) ? slides : Object.values(slides)
  return arr.map((s, i) => ({
    numero: s.numero ?? i + 1,
    tipo: s.tipo || 'contenido',
    titulo: toText(s.titulo) || '',
    ...(s.subtitulo ? { subtitulo: toText(s.subtitulo) } : {}),
    cuerpo: toText(s.cuerpo) || '',
  }))
}
```

### Schema JSON esperado de Claude
```json
{
  "hook_adaptado": "string",
  "hook_variantes": ["v1", "v2", "v3"],
  "guion_adaptado": "string con saltos de línea",
  "formula_estructura": "FÓRMULA: Nombre → ...\n\n1. NOMBRE: explicación",
  "estilo_produccion": "TIPO DE PLANO: ...\n\nRITMO DE CORTE: ...",
  "notas_grabacion": "1. NOMBRE: ...\n\n2. NOMBRE: ...\n\n3. NOMBRE: ...",
  "por_que_funciona": "1. RAZÓN: ...\n\n2. RAZÓN: ...",
  "carrusel": {
    "slides": [
      {"numero": 1, "tipo": "portada", "titulo": "Gancho (máx 8 palabras)", "subtitulo": "Completa la promesa"},
      {"numero": 2, "tipo": "contenido", "titulo": "Título", "cuerpo": "Texto con • bullets"},
      {"numero": 8, "tipo": "cta", "titulo": "CTA final", "cuerpo": "Texto de cierre StartLab"}
    ],
    "cta_ultimo_slide": "string"
  }
}
```

---

## API: Notion

```js
const NOTION_API = 'https://api.notion.com/v1'
const NOTION_VERSION = '2022-06-28'  // versión fija — no cambiar

async function createNotionPage(item, notionToken, databaseId) {
  const children = buildNotionBlocks(item).slice(0, 100)  // máx 100 bloques

  const res = await fetch(`${NOTION_API}/pages`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${notionToken}`,
      'Content-Type': 'application/json',
      'Notion-Version': NOTION_VERSION,  // OBLIGATORIO
    },
    body: JSON.stringify({
      parent: { database_id: databaseId },
      properties: {
        'Nombre': { title: [{ text: { content: `@${item.ownerUsername} — ${item.url}` } }] }
      },
      children,
    }),
  })

  if (!res.ok) {
    const err = await res.text()
    throw new Error(`Notion ${res.status}: ${err}`)
  }

  const page = await res.json()
  // Construir URL manualmente — page.url a veces no abre la página
  return `https://www.notion.so/${page.id.replace(/-/g, '')}`
}
```

**Errores comunes de Notion:**
- `404 object_not_found` → la DB no está compartida con la integration (Notion DB → `···` → Connections)
- `400 validation_error` → nombre de propiedad incorrecto (son **case-sensitive**)
- Bloques truncados silenciosamente → siempre `.slice(0, 100)` antes del POST

---

## StartLab — Contexto de marca

**ICP:** Coaches, consultores, agencias digitales, infoproductores. Facturan 5k-30k USD/mes con inestabilidad (ME6) o 20k-300k con operación frágil (ME7).

**Dolores que usar en el copy:**
- "Un mes espectacular, al siguiente no saben qué va a pasar"
- Esclavos del contenido sin retorno predecible
- Picos de lanzamientos seguidos de meses vacíos
- Clientes de bajo ticket que exigen demasiado tiempo
- Ser el "pulpo": el negocio no funciona sin su presencia

**Terminología OBLIGATORIA:** sistema predecible, captación automatizada, clientes premium, promesa de alto valor, llamadas calificadas, setter, closer, tasa de cierre, ingresos recurrentes, 90 días, escalar sin lanzamientos, facturación predecible, libertad operativa

**PROHIBIDO:** emprender desde cero, primeros 1k, más seguidores, más contenido, crecer en redes, motivación genérica, métricas inventadas, principiantes sin negocio validado

**Estructura retórica:** "Lo que la mayoría hace → Por qué es un problema → Lo que genera → Lo que debes hacer → Lo que obtienes"

**CTA estándar:** "Si ya facturas entre X y X al mes y quieres escalar a 50k-80k con un sistema predecible, el enlace está abajo. Sin compromiso. Solo estructura."

**Datos reales para usar:** 15k-25k/mes inestable → 5-15 clientes premium +2k USD | Tasa cierre 20%+ | Margen 30%+ | 90 días predecibles | Agencias migración→200k/mes | Consultoría organizacional→100k/mes

---

## Keywords y perfiles por defecto (ver `_reference/defaults.ts`)

**Keywords ES:** sistema predecible ventas, captación automatizada clientes, escalar consultoría, clientes premium alto valor, dejar de depender lanzamientos, setter closer ventas, llamadas calificadas negocio, facturación predecible coaching, escalar agencia digital, infoproductor sistema ventas

**Perfiles IG prioritarios (ES):** spencer.hoffmann, jose_elias_navarro, marcosrazzetti, andresbilbao, rodrigoherrera, alvaroluque.co, thejordisegues, jurgenklaric, joeljota, toni_delatorre, soyaugustobianchi, adrianbravo.es

---

## Errores conocidos — resumen rápido

| # | Error | Fix |
|---|---|---|
| 1 | Resultados vacíos sin error visible | `if (items.length === 0)` mostrar mensaje claro |
| 2 | 0 carruseles después de filtrar | Usar multiplicador 4x: `Math.max(objetivo * 4, 15)` |
| 3 | Doble submit al hacer clic dos veces | `button.disabled = true` + `finally { button.disabled = false }` |
| 4 | Timeout del browser | `AbortSignal.timeout(120_000)` — 2 min máximo |
| 5 | `onlyPostsNewerThan` con ISO falla | Usar `"30 days"` (formato relativo, no ISO) |
| 6 | Créditos cobrados sin Sidecars | Loguear ratio total/Sidecars para diagnosticar |
| 7 | Retry automático duplica cobros | NO implementar retry — mostrar error y dejar al usuario reintentar |
| 8 | Token Apify visible en código fuente | Aceptado — es uso interno. Si se hace público: usar un proxy (Vercel Function) |

Ver detalles completos en `TROUBLESHOOTING.md`.
