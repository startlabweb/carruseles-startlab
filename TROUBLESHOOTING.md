# TROUBLESHOOTING — Carruseles StartLab

Historial de bugs conocidos y sus fixes. Actualizar cuando se resuelva un problema nuevo.

---

## BUG-001: Resultados vacíos sin error visible

**Síntoma:** La búsqueda termina pero no muestra carruseles. No hay error en consola.  
**Causa:** El actor retorna `[]` cuando el hashtag no existe o no tiene posts recientes.  
**Fix:**
```js
if (rawItems.length === 0) {
  showError(`No se encontraron posts para "${keyword}". Prueba otra keyword.`)
  return
}
const sidecars = rawItems.filter(i => i.type === 'Sidecar')
if (sidecars.length === 0) {
  showError(`Se encontraron ${rawItems.length} posts pero ninguno es carrusel. Prueba con más keywords o sube el objetivo.`)
  return
}
```

---

## BUG-002: Cero carruseles después de filtrar (aunque hay posts)

**Síntoma:** Apify retorna posts pero ninguno es `type: "Sidecar"`.  
**Causa:** Se pidieron muy pocos posts (`resultsLimit: 5`) y ninguno era carrusel. En un perfil típico, ~25-35% son carruseles.  
**Fix:** Usar siempre el multiplicador 4x:
```js
const resultsLimit = Math.max(objetivo * 4, 15)  // mínimo 15 posts por keyword
```
Si aun así quedan 0 carruseles → notificar al usuario, NO reintentar automáticamente.

**También puede ser:** El tipo se perdió porque se filtró después de normalizar. El campo `type` DEBE leerse desde el raw array de Apify:
```js
// CORRECTO — desde el raw
const sidecars = rawItems.filter(item => item.type === 'Sidecar')

// INCORRECTO — normalizar y luego filtrar (type se pierde)
const normalized = rawItems.map(item => ({ url: item.url, caption: item.caption }))
const sidecars = normalized.filter(p => p.type === 'Sidecar')  // ← siempre vacío
```

---

## BUG-003: Doble submit al hacer clic dos veces en el botón de búsqueda

**Síntoma:** Se lanzan dos búsquedas en paralelo, los resultados se mezclan y se duplican los cobros de Apify.  
**Causa:** El botón no se deshabilita durante la búsqueda.  
**Fix:**
```js
const btn = document.getElementById('searchBtn')
btn.disabled = true
try {
  await runSearch()
} finally {
  btn.disabled = false  // SIEMPRE re-habilitar, aunque falle
}
```

---

## BUG-004: Timeout del browser (búsqueda expira antes de terminar)

**Síntoma:** La búsqueda falla con `AbortError: The operation was aborted`.  
**Causa:** El endpoint `run-sync-get-dataset-items` espera hasta que el actor termina. Con muchas keywords puede tardar >2 min.  
**Fix:**
- Usar `AbortSignal.timeout(120_000)` (2 minutos máximo)
- Procesar keywords de a una con progreso visible
- Hacer early-stop cuando se acumulan suficientes Sidecars (no procesar todas las keywords si ya hay suficientes)

---

## BUG-005: `onlyPostsNewerThan` con formato ISO falla silenciosamente

**Síntoma:** La búsqueda retorna posts más viejos de lo esperado, o 0 posts cuando debería haber.  
**Causa:** Calcular la fecha ISO en runtime puede dar formatos que el actor no parsea bien en ciertos timezones.  
**Fix:** Usar siempre formato relativo como string:
```js
onlyPostsNewerThan: '30 days'   // ✅ robusto
onlyPostsNewerThan: '1 month'   // ✅ robusto
onlyPostsNewerThan: new Date(Date.now() - 30*24*3600*1000).toISOString()  // ⚠️ puede fallar
```

---

## BUG-006: Créditos de Apify cobrados sin carruseles útiles

**Síntoma:** Se pagaron N posts pero ninguno era Sidecar.  
**Causa:** El hashtag o perfil publicaba principalmente imágenes/reels, no carruseles.  
**Fix:**
- Loguear siempre el ratio: `console.log(`Total: ${raw.length}, Sidecars: ${raw.filter(i => i.type === 'Sidecar').length}`)`
- Priorizar perfiles conocidos que publiquen carruseles frecuentemente
- Probar con 1 keyword primero para verificar el ratio antes de escalar

---

## BUG-007: Retry automático duplica cobros en Apify

**Síntoma:** Se gastaron el doble de créditos esperados.  
**Causa:** Se implementó lógica de retry que disparó la misma llamada dos veces.  
**Fix:** NO implementar retry automático en el cliente. Política: si falla → mostrar error → el usuario decide reintentar manualmente. Los reintentos en Apify cobran por cada ejecución del actor.

---

## BUG-008: Token Apify visible en el código fuente del browser

**Síntoma:** Cualquier persona puede ver el Apify token con F12 → Sources.  
**Causa:** En HTML puro, todo el JS queda visible en el cliente.  
**Situación actual:** Este es un proyecto de uso interno. El token en el cliente es un riesgo aceptado.  
**Fix si se hace público:** Crear un Vercel Serverless Function como proxy:
```js
// /api/apify.js (Vercel Function)
export default async function handler(req, res) {
  const response = await fetch(APIFY_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...req.body, token: process.env.APIFY_TOKEN }),
  })
  const data = await response.json()
  res.json(data)
}
```

---

## BUG-009: JSON de Claude truncado (SyntaxError al parsear)

**Síntoma:** `JSON.parse()` falla con `SyntaxError: Unexpected end of JSON input`.  
**Causa:** Se usó `max_tokens: 2048` o `max_tokens: 4096`. Los carruseles de 7-10 slides necesitan más tokens.  
**Fix:** Siempre usar `max_tokens: 8000` en la llamada a OpenRouter.

---

## BUG-010: Claude devuelve objeto `{1: {...}, 2: {...}}` en vez de array en `slides`

**Síntoma:** La adaptación se procesa pero los slides no se muestran.  
**Causa:** Claude a veces retorna `"slides": {"1": {...}, "2": {...}}` en vez de un array.  
**Fix:** Normalizar siempre antes de usar:
```js
function normalizeSlides(slides) {
  if (!slides) return []
  const arr = Array.isArray(slides) ? slides : Object.values(slides)
  return arr.map((s, i) => ({
    numero: s.numero ?? i + 1,
    tipo: s.tipo || 'contenido',
    titulo: toText(s.titulo) || '',
    cuerpo: toText(s.cuerpo) || '',
  }))
}
```

---

## BUG-011: Notion devuelve 404 aunque el database_id sea correcto

**Síntoma:** `Notion 404: {"object":"error","status":404,"code":"object_not_found"}`  
**Causa:** La integration de Notion no tiene acceso a la base de datos.  
**Fix:** Notion DB → botón `···` → **Connections** → añadir la integration. Este paso es obligatorio y se olvida frecuentemente.

---

## BUG-012: URL de Notion devuelta por la API no abre la página

**Síntoma:** El link generado da 404 en Notion.  
**Causa:** `page.url` en la respuesta de la API tiene formato inconsistente.  
**Fix:** Construir la URL manualmente:
```js
const cleanId = page.id.replace(/-/g, '')
const notionUrl = `https://www.notion.so/${cleanId}`
```
