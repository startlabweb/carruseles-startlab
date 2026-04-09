/**
 * Vercel Serverless Function — Proxy para Notion API
 * Resuelve el problema de CORS: el browser no puede llamar directamente a Notion.
 *
 * Endpoints:
 *   GET  /api/notion?action=users       → lista personas del workspace
 *   POST /api/notion?action=createPage  → crea una página en una DB
 */

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-notion-token')

  if (req.method === 'OPTIONS') return res.status(200).end()

  const notionToken = req.headers['x-notion-token']
  if (!notionToken) {
    return res.status(400).json({ error: 'Missing x-notion-token header' })
  }

  const notionHeaders = {
    'Authorization': `Bearer ${notionToken}`,
    'Content-Type': 'application/json',
    'Notion-Version': '2022-06-28',
  }

  const { action } = req.query

  try {
    // ── GET /users ───────────────────────────────────────────────────────────
    if (action === 'users' && req.method === 'GET') {
      const r = await fetch('https://api.notion.com/v1/users', {
        headers: notionHeaders,
      })
      const data = await r.json()
      return res.status(r.status).json(data)
    }

    // ── POST /pages ──────────────────────────────────────────────────────────
    if (action === 'createPage' && req.method === 'POST') {
      const r = await fetch('https://api.notion.com/v1/pages', {
        method: 'POST',
        headers: notionHeaders,
        body: JSON.stringify(req.body),
      })
      const data = await r.json()
      return res.status(r.status).json(data)
    }

    res.status(400).json({ error: `Unknown action "${action}" or method "${req.method}"` })
  } catch (err) {
    console.error('[notion proxy]', err)
    res.status(500).json({ error: err.message })
  }
}
