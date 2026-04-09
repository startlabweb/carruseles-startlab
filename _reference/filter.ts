/**
 * Viral filter — reescrito desde analyzer/viral_filter.py
 * Calcula viral_score (0-5) basado en 5 criterios de engagement.
 */

import { ScrapedItem, FilteredItem } from '@/types'

interface FilterConfig {
  minViews: number
}

export function calculateViralScore(item: ScrapedItem, config: FilterConfig): FilteredItem {
  const views = item.views || 0
  const likes = item.likes || 0
  const comments = item.comments || 0
  const shares = item.shares
  const saves = item.saves

  // Engagement rate = (likes + comments) / views
  const engagement_rate = views > 0 ? (likes + comments) / views : 0

  // Like rate = likes / views
  const like_rate = views > 0 ? likes / views : 0

  // Share rate (only if available)
  const share_rate = shares !== undefined && views > 0 ? shares / views : undefined

  // Save rate (only if available)
  const save_rate = saves !== undefined && views > 0 ? saves / views : undefined

  // ─── 5 criteria ──────────────────────────────────────────────────────────────
  // 1. Minimum views threshold
  const passes_views = views >= config.minViews

  // 2. Engagement rate > 3%
  const passes_engagement = engagement_rate > 0.03

  // 3. Like rate > 2%
  const passes_likes = like_rate > 0.02

  // 4. Share rate > 0.5% (skip if not available)
  const passes_shares = share_rate !== undefined ? share_rate > 0.005 : null

  // 5. Save rate > 0.3% (skip if not available)
  const passes_saves = save_rate !== undefined ? save_rate > 0.003 : null

  // Score over available criteria
  const criteria = [
    passes_views,
    passes_engagement,
    passes_likes,
    passes_shares !== null ? passes_shares : null,
    passes_saves !== null ? passes_saves : null,
  ]

  const available = criteria.filter(c => c !== null)
  const passed = available.filter(c => c === true)

  // Score 0-5, normalized to available criteria
  const raw_score = available.length > 0 ? (passed.length / available.length) * 5 : 0
  const viral_score = Math.round(raw_score)

  // Pass filter: viral_score >= 3 AND minimum views
  const passes_filter = passes_views && viral_score >= 3

  return {
    ...item,
    viral_score,
    engagement_rate: Math.round(engagement_rate * 10000) / 100,  // as percentage
    like_rate: Math.round(like_rate * 10000) / 100,
    share_rate: share_rate !== undefined ? Math.round(share_rate * 10000) / 100 : undefined,
    save_rate: save_rate !== undefined ? Math.round(save_rate * 10000) / 100 : undefined,
    passes_filter,
  }
}

export function filterViralItems(
  items: ScrapedItem[],
  config: FilterConfig
): { passed: FilteredItem[]; rejected: FilteredItem[] } {
  const scored = items.map(item => calculateViralScore(item, config))
  const passed = scored.filter(item => item.passes_filter)
  const rejected = scored.filter(item => !item.passes_filter)

  // Sort by viral_score desc, then views desc
  passed.sort((a, b) => b.viral_score - a.viral_score || b.views - a.views)
  rejected.sort((a, b) => b.viral_score - a.viral_score || b.views - a.views)

  return { passed, rejected }
}

// Deduplicate by URL across keywords
export function deduplicateItems(items: ScrapedItem[]): ScrapedItem[] {
  const seen = new Set<string>()
  return items.filter(item => {
    if (seen.has(item.url)) return false
    seen.add(item.url)
    return true
  })
}
