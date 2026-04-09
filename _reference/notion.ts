/**
 * Notion API client — sin SDK, fetch nativo.
 * Notion-Version: 2022-06-28
 */

import { AdaptedItem, NotionConfig, NotionPageResult, GoldenNugget } from '@/types'

const NOTION_API = 'https://api.notion.com/v1'
const NOTION_VERSION = '2022-06-28'

// Claude sometimes returns text fields as objects/arrays — extract readable text
function extractText(val: unknown): string {
  if (typeof val === 'string') return val
  if (val == null) return ''
  if (Array.isArray(val)) {
    return val.map(item =>
      typeof item === 'string' ? item :
      (item && typeof item === 'object' && 'texto' in (item as object)) ? String((item as Record<string, unknown>).texto) :
      JSON.stringify(item)
    ).join('\n')
  }
  if (typeof val === 'object') {
    const obj = val as Record<string, unknown>
    if ('texto' in obj) return String(obj.texto)
    if ('nombre' in obj || 'logica' in obj) {
      // formula_estructura object
      return [
        obj.nombre && `FÓRMULA: ${obj.nombre}`,
        obj.logica && String(obj.logica),
      ].filter(Boolean).join('\n\n')
    }
    // Generic object: join key: value pairs
    return Object.entries(obj).map(([k, v]) =>
      `${k.toUpperCase()}: ${typeof v === 'object' ? JSON.stringify(v, null, 2) : v}`
    ).join('\n\n')
  }
  return String(val)
}

function headers(token: string) {
  return {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
    'Notion-Version': NOTION_VERSION,
  }
}

// ─── Users ────────────────────────────────────────────────────────────────────

export interface NotionUser {
  id: string
  name: string
  avatar_url?: string
  type: string
  person?: { email: string }
}

export async function listNotionUsers(token: string): Promise<NotionUser[]> {
  const res = await fetch(`${NOTION_API}/users`, { headers: headers(token) })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Notion users error ${res.status}: ${text}`)
  }
  const data = await res.json() as { results: NotionUser[] }
  return (data.results || []).filter(u => u.type === 'person')
}

// ─── Database ─────────────────────────────────────────────────────────────────

export async function getNotionDatabase(token: string, databaseId: string) {
  const res = await fetch(`${NOTION_API}/databases/${databaseId}`, {
    headers: headers(token),
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Notion database error ${res.status}: ${text}`)
  }
  return res.json() as Promise<{ id: string; title: { plain_text: string }[]; properties: Record<string, { type: string }> }>
}

// ─── Rich text helpers ────────────────────────────────────────────────────────

/** Notion rich text blocks have a 2000-char limit per element */
function richText(content: string) {
  if (!content) return [{ type: 'text', text: { content: '' } }]
  const chunks: unknown[] = []
  for (let i = 0; i < content.length; i += 1900) {
    chunks.push({ type: 'text', text: { content: content.slice(i, i + 1900) } })
  }
  return chunks
}

function heading2(text: string) {
  return { object: 'block', type: 'heading_2', heading_2: { rich_text: richText(text) } }
}

function heading3(text: string) {
  return { object: 'block', type: 'heading_3', heading_3: { rich_text: richText(text) } }
}

function paragraph(text: string) {
  if (!text?.trim()) return null
  return { object: 'block', type: 'paragraph', paragraph: { rich_text: richText(text) } }
}

function bullet(text: string) {
  if (!text?.trim()) return null
  return { object: 'block', type: 'bulleted_list_item', bulleted_list_item: { rich_text: richText(text) } }
}

const divider = { object: 'block', type: 'divider', divider: {} }

function compact<T>(arr: (T | null | undefined)[]): T[] {
  return arr.filter(Boolean) as T[]
}

// ─── Page content ─────────────────────────────────────────────────────────────

function buildPageBlocks(item: AdaptedItem): unknown[] {
  const a = item.adaptation
  const an = item.analysis
  const vp = item.video_production
  const blocks: unknown[] = []

  // ── Info del Video Original ──────────────────────────────────────────────────
  blocks.push(heading2('Info del Video Original'))

  const meta = [
    item.platform && `Plataforma: ${item.platform.toUpperCase()}`,
    item.views && `Views: ${item.views.toLocaleString()}`,
    item.followers && `Seguidores: ${item.followers.toLocaleString()}`,
    item.url && `URL: ${item.url}`,
    item.keyword && `Keyword: ${item.keyword}`,
  ].filter(Boolean).join('\n')
  if (meta) blocks.push(...compact([paragraph(meta)]))

  if (item.caption) {
    blocks.push(heading3('Caption original'))
    blocks.push(...compact([paragraph(item.caption)]))
  }

  if (item.transcript) {
    blocks.push(heading3('Transcripción'))
    const parts = item.transcript.split('\n\n').filter(Boolean)
    blocks.push(...compact(parts.length > 1 ? parts.map(p => paragraph(p)) : [paragraph(item.transcript)]))
  }

  // ── Análisis del Script ──────────────────────────────────────────────────────
  if (an) {
    blocks.push(heading3('Análisis del Script'))
    if (an.hook) {
      const hookText = an.hook_tipo ? `${an.hook}\n\nTipo: ${an.hook_tipo}` : an.hook
      blocks.push(...compact([paragraph(`Hook: ${hookText}`)]))
    }
    if (an.estructura) blocks.push(...compact([paragraph(`Estructura: ${an.estructura}`)]))
    if (an.formula_viral) blocks.push(...compact([paragraph(`Fórmula viral: ${an.formula_viral}`)]))
    if (an.insight_clave) blocks.push(...compact([paragraph(`Insight clave: ${an.insight_clave}`)]))
    if (an.cta) blocks.push(...compact([paragraph(`CTA: ${an.cta}`)]))
  }

  // ── Análisis de Producción ───────────────────────────────────────────────────
  if (vp) {
    blocks.push(heading3('Análisis de Producción'))
    const prodDetails = [
      vp.tipo_plano && `Tipo de plano: ${vp.tipo_plano}`,
      vp.ritmo_edicion && `Ritmo de edición: ${vp.ritmo_edicion}`,
      vp.duracion_estimada && `Duración estimada: ${vp.duracion_estimada}`,
      vp.hook_visual_3s && `Hook visual 3s: ${vp.hook_visual_3s}`,
      vp.formato_contenido && `Formato: ${vp.formato_contenido}`,
      vp.nivel_produccion && `Nivel de producción: ${vp.nivel_produccion}`,
      vp.musica_ambiente && `Música: ${vp.musica_ambiente}`,
      vp.texto_en_pantalla && `Texto en pantalla: ${vp.texto_en_pantalla}`,
      vp.estilo_visual && `Estilo visual: ${vp.estilo_visual}`,
    ].filter(Boolean) as string[]
    blocks.push(...compact(prodDetails.map(d => bullet(d))))
    if (vp.notas_produccion) blocks.push(...compact([paragraph(`Notas: ${vp.notas_produccion}`)]))
  }

  // ── Divider ─────────────────────────────────────────────────────────────────
  blocks.push(divider)

  // ── Fase 4: Adaptación ──────────────────────────────────────────────────────
  if (a) {
    blocks.push(heading2('Adaptación StartLab'))

    if (a.hook_adaptado) {
      blocks.push(heading3('Hook Adaptado'))
      blocks.push(...compact([paragraph(extractText(a.hook_adaptado))]))
    }

    if (a.hook_variantes?.length) {
      blocks.push(heading3('Variantes del Hook'))
      blocks.push(...compact(a.hook_variantes.map(v => bullet(extractText(v)))))
    }

    if (a.guion_adaptado) {
      blocks.push(heading3('Guión Adaptado'))
      const guionStr = extractText(a.guion_adaptado)
      const parts = guionStr.split('\n\n').filter(Boolean)
      blocks.push(...compact(parts.length > 1 ? parts.map(p => paragraph(p)) : [paragraph(guionStr)]))
    }

    if (a.formula_estructura) {
      blocks.push(heading3('Fórmula / Estructura'))
      blocks.push(...compact([paragraph(extractText(a.formula_estructura))]))
    }

    if (a.estilo_produccion) {
      blocks.push(heading3('Estilo de Producción'))
      blocks.push(...compact([paragraph(extractText(a.estilo_produccion))]))
    }

    if (a.notas_grabacion) {
      blocks.push(heading3('Notas de Grabación'))
      const notasStr = extractText(a.notas_grabacion)
      const notasParts = notasStr.split('\n').filter(Boolean)
      if (notasParts.length > 1) {
        blocks.push(...compact(notasParts.map(p => bullet(p))))
      } else {
        blocks.push(...compact([paragraph(notasStr)]))
      }
    }

    if (a.por_que_funciona) {
      blocks.push(heading3('¿Por qué funciona?'))
      blocks.push(...compact([paragraph(extractText(a.por_que_funciona))]))
    }

    if (a.carrusel?.slides?.length) {
      blocks.push(heading3(`Carrusel (${a.carrusel.slides.length} slides)`))
      for (const slide of a.carrusel.slides) {
        const parts = [
          `Slide ${slide.numero} · ${extractText(slide.tipo)}`,
          extractText(slide.titulo),
          slide.subtitulo ? extractText(slide.subtitulo) : null,
          slide.cuerpo ? extractText(slide.cuerpo) : null,
        ].filter(Boolean).join('\n')
        blocks.push(...compact([paragraph(parts)]))
      }
      if (a.carrusel.cta_ultimo_slide) {
        blocks.push(...compact([paragraph(`CTA último slide: ${extractText(a.carrusel.cta_ultimo_slide)}`)]))
      }
    }
  }

  // ── YouTube Long: Golden Nuggets ───────────────────────────────────────────
  const yt = item.youtube_adaptation
  if (yt) {
    blocks.push(divider)
    blocks.push(heading2('Golden Nuggets'))

    if (yt.resumen_video) {
      blocks.push(heading3('Resumen del Video'))
      blocks.push(...compact([paragraph(yt.resumen_video)]))
    }

    for (const nugget of (yt.golden_nuggets || []) as GoldenNugget[]) {
      blocks.push(heading3(`#${nugget.order} — ${nugget.titulo}`))
      if (nugget.formato_recomendado) blocks.push(...compact([paragraph(`Formato: ${nugget.formato_recomendado}`)]))
      if (nugget.por_que_es_viral) blocks.push(...compact([paragraph(`Por qué es viral: ${nugget.por_que_es_viral}`)]))
      if (nugget.hook) {
        blocks.push(heading3('Hook'))
        blocks.push(...compact([paragraph(nugget.hook)]))
      }
      if (nugget.guion_adaptado) {
        blocks.push(heading3('Guión Adaptado'))
        const parts = nugget.guion_adaptado.split('\n\n').filter(Boolean)
        blocks.push(...compact(parts.length > 1 ? parts.map(p => paragraph(p)) : [paragraph(nugget.guion_adaptado)]))
      }
      if (nugget.estructura) blocks.push(...compact([paragraph(`Fórmula: ${nugget.estructura}`)]))
      blocks.push(divider)
    }
  }

  return blocks
}

// ─── Create page ──────────────────────────────────────────────────────────────

export async function createNotionPage(
  item: AdaptedItem,
  token: string,
  config: NotionConfig,
): Promise<NotionPageResult> {
  const title = `@${item.account}`
  const titleProp = config.title_property || 'Name'

  const properties: Record<string, unknown> = {
    [titleProp]: {
      title: [{ text: { content: title } }],
    },
  }

  if (config.responsible_property && config.responsible_users?.length) {
    properties[config.responsible_property] = {
      people: config.responsible_users.map(u => ({ object: 'user', id: u.id })),
    }
  }

  if (config.fase_property && config.fase_value) {
    properties[config.fase_property] = {
      select: { name: config.fase_value },
    }
  }

  const children = buildPageBlocks(item)
  // Notion allows max 100 blocks per request — truncate silently
  const safeChildren = children.slice(0, 100)

  const body = {
    parent: { database_id: config.database_id },
    properties,
    children: safeChildren,
  }

  const res = await fetch(`${NOTION_API}/pages`, {
    method: 'POST',
    headers: headers(token),
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    const errText = await res.text()
    throw new Error(`Notion create page error ${res.status}: ${errText}`)
  }

  const page = await res.json() as { id: string; url: string }
  // Construct a reliable direct URL from the page ID (no dashes format that Notion uses in URLs)
  const pageIdClean = page.id.replace(/-/g, '')
  const notionUrl = `https://www.notion.so/${pageIdClean}`
  return {
    item_id: item.id,
    notion_page_id: page.id,
    notion_url: notionUrl,
    title,
  }
}
