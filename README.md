# Carruseles StartLab

Scraper de Instagram enfocado exclusivamente en carruseles (`type: "Sidecar"`).  
Flujo completo: buscar por keywords o URLs directas → filtrar solo carruseles → adaptar con IA al contexto de StartLab → guardar en Notion.

**Stack:** HTML puro + JS vanilla — sin frameworks, sin build, sin Node local.  
**Deploy:** Vercel (auto-deploy en cada `git push` a `main`).

---

## Características

- **Modo Keywords** — busca carruseles por hashtags de Instagram (una llamada Apify por keyword, para early-stop)
- **Modo URLs directas** — scrapeea posts o perfiles específicos
- **Filtro Sidecar automático** — solo carruseles, desde el raw response de Apify (no después de normalizar)
- **Adaptación con Claude** — transforma el caption del carrusel en slides adaptados al ICP de StartLab
- **Preview de slides** — visualiza los slides antes de guardar
- **Guardar en Notion** — crea una página en la base de datos de Notion con los slides adaptados

---

## Setup — API Keys necesarias

Todas las keys se guardan en `localStorage` (solo tu browser, no se envían a ningún servidor nuestro).

| Key | Dónde obtenerla | Para qué |
|---|---|---|
| **Apify Token** | [console.apify.com/account/integrations](https://console.apify.com/account/integrations) | Scraping de Instagram |
| **OpenRouter API Key** | [openrouter.ai/keys](https://openrouter.ai/keys) | Adaptación con Claude |
| **Notion Token** | [notion.so/my-integrations](https://notion.so/my-integrations) → crear integration | Guardar en Notion |
| **Notion Database ID** | URL de la DB: `notion.so/{workspace}/{DATABASE_ID}?v=...` | ID de la base de datos destino |

### Configurar Notion (paso obligatorio)

1. Crear una integration en `notion.so/my-integrations` → copiar el token (`secret_...`)
2. Abrir la base de datos Notion → `···` → **Connections** → añadir la integration
   - **Si no se hace este paso, la API devuelve 404 aunque el database_id sea correcto**
3. Copiar el `database_id` de la URL de la base de datos

---

## Cómo usar

1. Ir a la URL de Vercel del proyecto
2. Abrir **Configuración** → ingresar las API keys → Guardar
3. Elegir modo de búsqueda:
   - **Keywords:** escribir una keyword por línea, definir el objetivo de carruseles
   - **URLs directas:** pegar URLs de Instagram (posts, perfiles)
4. Hacer clic en **Buscar carruseles**
5. Seleccionar los carruseles a adaptar
6. Hacer clic en **Adaptar seleccionados**
7. Revisar el preview de slides
8. Hacer clic en **Guardar en Notion** para crear la página

---

## Coste estimado por búsqueda

- **Apify:** $1.50 / 1,000 posts retornados (se cobra por post retornado, no por Sidecars)
- **OpenRouter → Claude Sonnet:** ~$0.015-0.03 por adaptación (8,000 tokens output)

Una búsqueda de 5 carruseles requiere ~20-40 posts de Apify ≈ $0.03-0.06 de Apify.

---

## Desarrollo

No hay setup local. Todo cambio va directo a producción:

```bash
git add index.html
git commit -m "descripción del cambio"
git push
```

Vercel detecta el push y despliega automáticamente en ~30 segundos.

---

## Repo

`https://github.com/startlabweb/carruseles-startlab` (cuenta `startlabweb`)
