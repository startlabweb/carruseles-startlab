import { DiscoveryMode, Prompts, WorkspaceConfig } from '@/types'

// Simple Fisher-Yates shuffle (deterministic per call, different each run)
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export { shuffle }
import { DEFAULT_MODELS } from './pricing'

export const DEFAULT_PROMPTS: Prompts = {
  account_filter: `Eres un filtro de inteligencia de contenido para StartLab — empresa B2B de educación y consultoría (10+ años, 800+ clientes) que ayuda a dueños de negocios digitales de servicios a escalar con un sistema predecible de captación de clientes premium.

Analiza esta cuenta y decide si es relevante para el ICP de StartLab.

## ICP DE STARTLAB (quién SÍ es relevante):
- Coaches (vida, negocios, salud), consultores (B2B, organizacional, estratégico, financiero, tech/SaaS), agencias digitales (marketing, migración, e-commerce, real estate), infoproductores, educadores online
- YA facturan 5k-30k USD/mes con inestabilidad (o 20k-300k con operación frágil)
- Hablan de: escalar, sistematizar, vender high ticket, delegar, automatizar captación, mejorar márgenes, cerrar clientes premium, construir equipo comercial

## NO es relevante si:
- Habla de emprender desde cero, primeros 1k, dropshipping, e-commerce físico, negocios locales, afiliados, MLM
- Motivación genérica sin estrategia de negocio concreta
- Audiencia son principiantes sin negocio validado
- Contenido sobre crecer en redes como fin (no como medio de captación)

Datos de la cuenta:
- Handle: {account}
- Seguidores: {followers}
- Bio: {bio}
- Temas frecuentes: {topics}

JSON estricto:
{
  "relevante": true/false,
  "score": 1-10,
  "razon": "1 línea: por qué sí/no es relevante para el ICP de StartLab",
  "categoria": "coach_ventas | consultor_scaling | agencia_digital | infoproductor | setter_closer | educador_online | otro"
}`,

  content_filter: `Eres un analista de contenido viral para StartLab — empresa B2B que ayuda a coaches, consultores, agencias e infoproductores a pasar de facturación inestable (5k-30k USD/mes) a un sistema predecible que genera 50k-80k USD/mes con clientes premium.

Evalúa si este video es ALTAMENTE relevante para adaptar al contenido de StartLab.

## CRITERIOS DE RELEVANCIA (cumplir al menos 2):

1. **Toca dolores reales del ICP:** facturación inestable (meses buenos seguidos de vacíos), dependencia de lanzamientos agotadores, esclavitud del contenido diario sin retorno, clientes de bajo ticket que exigen demasiado, miedo a contratar sin previsibilidad, ser "pulpo" que hace todo, márgenes pequeños a pesar de buenos ingresos brutos, tasa de cierre baja

2. **Habla de soluciones del universo StartLab:** sistema predecible de ventas, captación automatizada, clientes premium/high ticket, promesa de alto valor, setter/closer, llamadas calificadas, tasa de cierre 20%+, ingresos recurrentes, delegación, márgenes 30%+, escalar sin lanzamientos, reestructuración de oferta

3. **El formato es estratégico y replicable:**
   - Educativo-contraste: "lo que la mayoría hace vs lo correcto"
   - Storytelling de transformación: "de X a Y con números"
   - Framework de pasos: proceso replicable
   - Datos + argumento: números que prueban un punto
   - Objeción + refutación: "crees que X, pero en realidad Y"
   - Ranking/comparación con datos

4. **El hook activa un dolor reconocible** para alguien que factura 10k-30k/mes con inestabilidad o que factura 20k-300k pero es esclavo de su negocio

## NO es relevante si:
- Habla de: más seguidores, viral en redes como fin, dropshipping, emprender desde cero, motivación genérica, o va dirigido a principiantes
- Es contenido de entretenimiento puro sin insight de negocio aplicable

Video:
- Cuenta: {account}
- Views: {views}
- Caption: {caption}
- Transcript: {transcript}

JSON estricto:
{
  "relevante": true/false,
  "score": 1-10,
  "razon": "1 línea: qué dolor/tema específico del ICP toca y por qué es adaptable",
  "temas": ["tema1", "tema2"],
  "formato": "educativo-contraste | storytelling-transformacion | framework-pasos | datos-argumento | objecion-refutacion | ranking | tutorial-sistema | caso-de-exito"
}`,

  adaptation: `Eres el estratega de contenido #1 de StartLab — empresa B2B de educación y consultoría (10+ años, 800+ clientes, equipo de 16) que ayuda a coaches, consultores, agencias e infoproductores a escalar de 5k-30k a 50k-80k USD/mes con un sistema predecible.

## CONTEXTO PROFUNDO STARTLAB

**ICP:** Coaches, consultores, agencias digitales, infoproductores, educadores online. Facturan 5k-30k USD/mes (ME6) o 20k-300k (ME7) con operación frágil dependiente del fundador. Tienen 30-50 años, son expertos con casos de éxito, pero sin sistema.

**Dolores que DUELEN (usar estos, no genéricos):**
- "Un mes es espectacular y al siguiente no sabes qué va a pasar"
- Esclavos del contenido: publican diario sin retorno predecible
- Picos de 30k-60k con lanzamientos seguidos de meses vacíos
- Clientes de bajo ticket que exigen demasiado tiempo
- Miedo a contratar sin ingresos predecibles
- Son el "pulpo": todo depende de su presencia
- "No es que no venden — es que manejan fatal el dinero" (márgenes rotos)

**Deseos concretos:**
- 5-15 clientes premium pagando +2k USD cada uno
- 30+ llamadas calificadas/mes automatizadas
- Tasa de cierre 20%+ con setter y closer
- 90 días consecutivos de facturación predecible
- Márgenes netos 30%+
- "Empresa elegante, rentable y sostenible"
- Delegar sin perder control

**Dos Pilares StartLab:** 1) Promesa de Alto Valor (oferta que justifica +2k USD) 2) Sistema Automático de Captación y Filtro (30+ llamadas/mes)

**Estructura retórica OBLIGATORIA:**
"Lo que la mayoría hace → Por qué es un problema → Lo que genera → Lo que debes hacer → Lo que obtienes"

**Reframe central:** "No es marketing, es estructura." "No necesitas más seguidores ni otro lanzamiento. El problema no es tu talento — es tu sistema de ventas."

**Datos reales para usar:** 15k-25k/mes inestable → 5-15 clientes premium +2k USD | Tasa cierre 20%+ | Margen 30%+ | 90 días predecibles | Agencias migración→200k/mes | Consultoría organizacional→100k/mes

**Terminología OBLIGATORIA:** sistema predecible, captación automatizada, clientes premium, promesa de alto valor, llamadas calificadas, setter, closer, tasa de cierre, ingresos recurrentes, 90 días, escalar sin lanzamientos, facturación predecible, libertad operativa

**PROHIBIDO:** emprender desde cero, primeros 1k, más seguidores, más contenido, crecer en redes, motivación vacía, métricas inventadas, promesas mágicas, dirigirse a principiantes

**Tono:** Directo, datos primero, como mentor confiado. Español auténtico latinoamericano. Frases cortas para énfasis.

**CTA:** "Si ya facturas entre X y X al mes y quieres escalar a 50k-80k con un sistema predecible, el enlace está abajo. Sin compromiso. Solo estructura."

---

Adapta este reel viral conservando estructura y fórmula de engagement para el ICP de StartLab:

Transcript: {transcript}
Análisis: Hook: {hook} | Fórmula: {formula_viral} | Estructura: {estructura}

JSON con: hook_adaptado, hook_variantes (3), guion_adaptado (estructura retórica StartLab, CTA al final), formula_estructura, estilo_produccion, por_que_funciona, notas_grabacion, carrusel (slides + cta_ultimo_slide)`,

  search: `Encuentra reels y videos virales sobre: sistema predecible de ventas, captación automatizada de clientes premium, escalar negocio de coaching o consultoría de 10k a 50k-80k, clientes de alto valor high ticket, inestabilidad financiera en negocios digitales, dejar de depender de lanzamientos, setter closer ventas B2B, llamadas calificadas sistema automático, promesa de alto valor, cerrar clientes premium 2k+, escalar agencia digital, infoproductor sistema de ventas, tasa de cierre ventas 20%, automatización embudo de ventas, delegar sin perder control, márgenes 30% negocio digital, reestructurar oferta consultoría, facturación predecible 90 días`,
}

export const DEFAULT_KEYWORDS_ES = [
  'sistema predecible ventas',
  'captación automatizada clientes',
  'escalar consultoría',
  'clientes premium alto valor',
  'dejar de depender lanzamientos',
  'setter closer ventas',
  'llamadas calificadas negocio',
  'facturación predecible coaching',
  'escalar agencia digital',
  'infoproductor sistema ventas',
  'cerrar clientes high ticket',
  'ingresos recurrentes coaching',
  'automatización embudo ventas',
  'escalar negocio coaching',
]

export const DEFAULT_KEYWORDS_EN = [
  'predictable revenue system',
  'automated client acquisition',
  'scale coaching business',
  'high ticket clients',
  'stop depending on launches',
  'setter closer sales',
  'qualified sales calls',
  'scale consulting business',
  'digital agency scaling',
  'close high ticket clients',
  'recurring revenue coaching',
  'sales funnel automation',
  'info product sales system',
  'online business scaling',
]

// ~70 curated Instagram coaching/B2B accounts (no @ prefix) — full pool
export const DEFAULT_IG_PROFILES = [
  // EN — English-speaking creators
  'hormozi', 'leilahormozi', 'grantcardone', 'russellbrunson', 'danmartell',
  'garyvee', 'patrickbetdavid', 'tailopez', 'sabrisuby', 'imangadzhi',
  'tonyrobbins', 'melrobbins', 'lewishowes', 'codiesanchez', 'jameswedmore',
  'amyporterfield', 'robdialjr', 'therealbrianmark', 'realnatberman', 'simonsquibb',
  'charliejohnsonfitness', 'alexcattoni', 'jennakutcher', 'xoamandafrances',
  'jenniferallwood', 'jereshiahawk', 'jennaokeefe.co', 'tom__youngs',
  'lisajohnsonstrategist', 'justnlalonde', 'realgavinwhite1', 'melissa_henault',
  'netzley', 'tanbiswasster', 'camie.wilke', 'davestrug', 'josh.hills0',
  'anastasiafrank', 'erik_anthonyfit', 'remotelatinos', 'thetashabooth', 'sam.ovens',
  // ES — Spanish-speaking / Hispanic creators
  'soyjosuepena', 'vixmeldrew', 'coach_fryer', 'emmacooperonline', 'the_melissalin',
  'joeljota', 'toni_delatorre', 'soyaugustobianchi',
  'academiafivestars', 'braianflorentinok', 'thamaraatacoa', 'adrianbravo.es',
  'juanmamarketing', 'vickimartin_digital', 'saiddaibesoficial', 'alvaroluque.co',
  'thejordisegues', 'marcosrazzetti', 'rodrigoherrera', 'marcusdantus', 'ariborovoy',
  'spencer.hoffmann', 'mauriciobenoist', 'jurgenklaric', 'jose_elias_navarro',
  'nick_saraev', 'andresbilbao', 'margaritapasos',
]

// Priority Instagram accounts — scraped first each run (shuffled within group).
// Includes top Hispanic/ES creators + top EN creators.
export const DEFAULT_IG_PROFILES_PRIORITY = [
  // ES — Hispanic priority
  'spencer.hoffmann', 'jose_elias_navarro', 'marcosrazzetti', 'andresbilbao',
  'rodrigoherrera', 'marcusdantus', 'ariborovoy', 'alvaroluque.co', 'thejordisegues',
  'mauriciobenoist', 'jurgenklaric', 'nick_saraev',
  'soyjosuepena', 'joeljota', 'toni_delatorre', 'soyaugustobianchi',
  'academiafivestars', 'braianflorentinok', 'thamaraatacoa', 'adrianbravo.es',
  'juanmamarketing', 'vickimartin_digital', 'saiddaibesoficial', 'margaritapasos',
  // EN — Top English priority
  'hormozi', 'leilahormozi', 'grantcardone', 'russellbrunson', 'danmartell',
  'garyvee', 'patrickbetdavid', 'tailopez', 'tonyrobbins', 'simonsquibb',
]

// ~55 curated TikTok coaching/B2B accounts (no @ prefix) — full pool
export const DEFAULT_TIKTOK_PROFILES = [
  // EN — English-speaking creators
  'ahormozi', 'leilahormozi', 'grantcardone', 'russellbrunson', 'danvmartell',
  'lewis', 'neilpatel', 'evancarmichael', 'geoffketterer', 'diaryofasalesgirl',
  'madelinekossin', 'natashahemmingway', 'davidthesalesangel', 'ben_alistor',
  'dawnxbusiness', 'aubriannakay', 'donmarkland', 'the.lindsey.anderson',
  'avamistruzzi', 'radiantrahaf', 'jakeryann.04', 'hustleden', 'cody.askins',
  'sthimothy', 'contentcanvasco', 'digitalmarketinglib',
  // ES — Spanish-speaking / Hispanic creators
  'mateo_folador', 'adrianbravo.es', 'sebastianriveracoach', 'juanjochris',
  'soyclaraperez', 'catherinamontes', 'adrianherz', 'charlycreator', '_agusfloresp',
  'andreaestratega', 'haciendola', 'tinchostuch', 'soychristianbustamante',
  'danielbarbap', 'jesusvargasads', 'luisfernandocacer3', 'desarrolloemprendedorfp',
  'nano.emprendimientos', 'mr.adscol', 'maricarrillofz', 'claudiamartinezfo',
  'remotosacademy', 'margaritapasos', 'divasdelmarketing', 'maubenoist',
  'lachamba.oficial', 'vinigugavi',
]

// Priority TikTok accounts — scraped first each run (shuffled within group).
export const DEFAULT_TIKTOK_PROFILES_PRIORITY = [
  // ES — Hispanic priority (all ES accounts are priority for TikTok)
  'mateo_folador', 'adrianbravo.es', 'sebastianriveracoach', 'juanjochris',
  'soyclaraperez', 'catherinamontes', 'adrianherz', 'charlycreator', '_agusfloresp',
  'andreaestratega', 'haciendola', 'tinchostuch', 'soychristianbustamante',
  'danielbarbap', 'jesusvargasads', 'luisfernandocacer3', 'desarrolloemprendedorfp',
  'nano.emprendimientos', 'mr.adscol', 'maricarrillofz', 'claudiamartinezfo',
  'remotosacademy', 'margaritapasos', 'divasdelmarketing', 'maubenoist',
  'lachamba.oficial', 'vinigugavi',
  // EN — Top English priority
  'ahormozi', 'leilahormozi', 'grantcardone', 'russellbrunson', 'danvmartell',
]

export const DEFAULT_DISCOVERY_MODE: DiscoveryMode = 'keywords'

// Contexto de marca por defecto para Golden Nuggets (YouTube Long).
// El usuario puede personalizar este texto desde Config → YouTube → Prompt Golden Nuggets.
// IMPORTANTE: Solo debe contener contexto de marca — el schema JSON y la estructura
// del prompt están hardcodeados en youtube_adapter.ts (GOLDEN_NUGGETS_PROMPT).
export const DEFAULT_GOLDEN_NUGGETS_PROMPT = `## EMPRESA: StartLab — Plataforma de escalado para negocios digitales B2B

**ICP:** Coaches, consultores, agencias digitales, infoproductores, educadores online. Facturan 5k-30k USD/mes con inestabilidad (ME6) o 20k-300k con operación frágil (ME7).

**Dolores:** facturación inestable, esclavitud del contenido, dependencia de lanzamientos agotadores, clientes de bajo ticket, miedo a contratar, márgenes rotos, ser el "pulpo" que hace todo.

**Desean:** 5-15 clientes premium +2k USD, 30+ llamadas calificadas/mes, tasa cierre 20%+, 90 días predecibles, márgenes 30%+, delegar sin perder control.

**Dos Pilares:** 1) Promesa de Alto Valor 2) Sistema Automático de Captación y Filtro

**Estructura retórica:** "Lo que la mayoría hace → Por qué es problema → Lo que genera → Lo que debes hacer → Lo que obtienes"

**Reframe central:** "No es marketing, es estructura." "No necesitas más seguidores ni otro lanzamiento agotador."

**Terminología OBLIGATORIA:** sistema predecible, captación automatizada, clientes premium, promesa de alto valor, llamadas calificadas, setter, closer, tasa de cierre, 90 días, escalar sin lanzamientos, facturación predecible.

**PROHIBIDO:** emprender desde cero, más seguidores, motivación genérica, métricas inventadas, principiantes sin negocio validado.

**Tono:** Directo, datos primero, como mentor confiado. Español auténtico latinoamericano.`


export const DEFAULT_CONFIG: Omit<WorkspaceConfig, 'id' | 'api_keys_encrypted' | 'updated_at'> = {
  api_keys_set: {},
  keywords_es: DEFAULT_KEYWORDS_ES,
  keywords_en: DEFAULT_KEYWORDS_EN,
  ig_profiles: DEFAULT_IG_PROFILES,
  ig_profiles_priority: DEFAULT_IG_PROFILES_PRIORITY,
  tiktok_profiles: DEFAULT_TIKTOK_PROFILES,
  tiktok_profiles_priority: DEFAULT_TIKTOK_PROFILES_PRIORITY,
  prompts: DEFAULT_PROMPTS,
  models: DEFAULT_MODELS,
  min_views_threshold: 50000,
  max_videos_per_keyword: 20,
  auto_schedule: null,
  notion_config: null,
  youtube_prompts: { golden_nuggets: DEFAULT_GOLDEN_NUGGETS_PROMPT },
  discovery_mode: DEFAULT_DISCOVERY_MODE,
}
