/**
 * Apify Actors client — Instagram + TikTok
 * Actors:
 *   - TikTok:    clockworks/tiktok-scraper (search by keywords/hashtags)
 *   - Instagram: apify/instagram-scraper   (search by hashtags, scrape profiles)
 *
 * Uses the REST API directly (no SDK dependency for bundle size).
 * Flow: POST run-sync-get-dataset-items → wait for completion → get items.
 */

import { ScrapedItem, Platform } from '@/types'
import { shuffle } from '@/lib/defaults'

/**
 * Build a priority-first, shuffled account list for accounts-mode scraping.
 * Priority accounts are shuffled independently and placed before secondary accounts.
 * This ensures variety each run while always preferring priority handles.
 */
export function buildAccountSampleOrder(
  allHandles: string[],
  priorityHandles: string[],
): string[] {
  const prioritySet = new Set(priorityHandles.map(h => h.replace(/^@/, '').trim()))
  const shuffledPriority = shuffle(priorityHandles.map(h => h.replace(/^@/, '').trim()).filter(Boolean))
  const shuffledSecondary = shuffle(
    allHandles.map(h => h.replace(/^@/, '').trim()).filter(h => h && !prioritySet.has(h))
  )
  return [...shuffledPriority, ...shuffledSecondary]
}

const APIFY_API = 'https://api.apify.com/v2'
const APIFY_TIMEOUT = 120_000 // 2 min max wait for actor run

// ─── TikTok Actor ────────────────────────────────────────────────────────────

interface ApifyTikTokItem {
  id?: string
  text?: string
  createTimeISO?: string
  createTime?: number
  webVideoUrl?: string
  authorMeta?: {
    name?: string
    nickName?: string
    fans?: number
    avatar?: string
  }
  videoMeta?: {
    duration?: number
    coverUrl?: string
  }
  diggCount?: number
  shareCount?: number
  playCount?: number
  collectCount?: number
  commentCount?: number
  searchQuery?: string
  hashtags?: { name?: string }[]
}

function normalizeTikTokApify(item: ApifyTikTokItem, keyword?: string): ScrapedItem {
  const author = item.authorMeta || {}
  return {
    id: item.id || Math.random().toString(36).slice(2),
    platform: 'tiktok',
    account: author.name || author.nickName || '',
    url: item.webVideoUrl || '',
    video_url: item.webVideoUrl || '',
    thumbnail: item.videoMeta?.coverUrl || '',
    caption: item.text || '',
    views: item.playCount || 0,
    likes: item.diggCount || 0,
    comments: item.commentCount || 0,
    shares: item.shareCount || 0,
    saves: item.collectCount || 0,
    followers: author.fans || 0,
    posted_at: item.createTimeISO || (item.createTime ? new Date(item.createTime * 1000).toISOString() : undefined),
    keyword: keyword || item.searchQuery || '',
  }
}

/**
 * Search TikTok via Apify Actor (clockworks/tiktok-scraper).
 * Uses searchQueries for keyword-based search.
 */
export async function searchTikTokApify(
  keywords: string[],
  apiToken: string,
  maxResults: number,
): Promise<ScrapedItem[]> {
  const input = {
    searchQueries: keywords,
    resultsPerPage: Math.min(maxResults, 100),
    searchSection: '',
    excludePinnedPosts: true,
    shouldDownloadVideos: false,
    shouldDownloadCovers: false,
    shouldDownloadSlideshowImages: false,
    shouldDownloadAvatars: false,
    shouldDownloadMusicCovers: false,
    downloadSubtitlesOptions: 'NEVER_DOWNLOAD_SUBTITLES',
    proxyCountryCode: 'None',
  }

  console.log(`[Apify:TikTok] Searching: ${keywords.join(', ')} (max ${maxResults})`)
  const items = await runActorSync<ApifyTikTokItem>('clockworks/tiktok-scraper', input, apiToken)
  console.log(`[Apify:TikTok] Got ${items.length} raw items`)

  return items
    .map(item => normalizeTikTokApify(item))
    .filter(item => item.account && item.url)
    .slice(0, maxResults)
}

/**
 * Fetch TikTok video details by URLs via Apify Actor.
 */
export async function fetchTikTokByUrlApify(
  urls: string[],
  apiToken: string,
): Promise<ScrapedItem[]> {
  const input = {
    postURLs: urls,
    resultsPerPage: urls.length,
    shouldDownloadVideos: false,
    shouldDownloadCovers: false,
    shouldDownloadSlideshowImages: false,
    shouldDownloadAvatars: false,
    shouldDownloadMusicCovers: false,
    downloadSubtitlesOptions: 'NEVER_DOWNLOAD_SUBTITLES',
    proxyCountryCode: 'None',
  }

  console.log(`[Apify:TikTok] Fetching ${urls.length} URLs`)
  const items = await runActorSync<ApifyTikTokItem>('clockworks/tiktok-scraper', input, apiToken)

  return items
    .map(item => normalizeTikTokApify(item))
    .filter(item => item.account && item.url)
}

// ─── Instagram Actor ─────────────────────────────────────────────────────────

interface ApifyInstagramItem {
  shortCode?: string
  url?: string
  caption?: string
  commentsCount?: number
  likesCount?: number
  videoViewCount?: number
  videoPlayCount?: number
  timestamp?: string
  ownerUsername?: string
  ownerFullName?: string
  ownerId?: string
  displayUrl?: string
  type?: string
  hashtags?: string[]
  mentions?: string[]
}

function normalizeInstagramApify(item: ApifyInstagramItem, keyword?: string): ScrapedItem {
  const shortCode = item.shortCode || ''
  return {
    id: shortCode || item.ownerId || Math.random().toString(36).slice(2),
    platform: 'instagram',
    account: item.ownerUsername || '',
    url: item.url || `https://www.instagram.com/p/${shortCode}/`,
    video_url: '',
    thumbnail: item.displayUrl || '',
    caption: item.caption || '',
    views: item.videoViewCount || item.videoPlayCount || 0,
    likes: item.likesCount || 0,
    comments: item.commentsCount || 0,
    shares: 0,
    saves: 0,
    followers: 0,
    posted_at: item.timestamp || undefined,
    keyword: keyword || '',
  }
}

/**
 * Search Instagram via Apify Actor (apify/instagram-scraper).
 * Uses hashtag search — each keyword becomes a hashtag search.
 */
export async function searchInstagramApify(
  keywords: string[],
  apiToken: string,
  maxResults: number,
): Promise<ScrapedItem[]> {
  const allItems: ScrapedItem[] = []
  const perKeyword = Math.max(5, Math.ceil(maxResults / Math.max(keywords.length, 1)))

  // Instagram scraper doesn't support multiple search queries in one run,
  // so we run one per keyword (but they're fast since they're hashtag searches)
  for (const keyword of keywords) {
    if (allItems.length >= maxResults) break

    const input = {
      search: keyword,
      searchType: 'hashtag',
      searchLimit: 1,
      resultsType: 'posts',
      resultsLimit: perKeyword,
      addParentData: false,
    }

    console.log(`[Apify:Instagram] Searching hashtag: ${keyword} (max ${perKeyword})`)
    try {
      const items = await runActorSync<ApifyInstagramItem>('apify/instagram-scraper', input, apiToken)
      const normalized = items
        .map(item => normalizeInstagramApify(item, keyword))
        .filter(item => item.account && item.url)
      allItems.push(...normalized)
    } catch (err) {
      console.error(`[Apify:Instagram] Error for keyword "${keyword}":`, err)
    }
  }

  return allItems.slice(0, maxResults)
}

/**
 * Fetch Instagram post details by URLs via Apify Actor.
 */
export async function fetchInstagramByUrlApify(
  urls: string[],
  apiToken: string,
): Promise<ScrapedItem[]> {
  const input = {
    directUrls: urls,
    resultsType: 'posts',
    resultsLimit: urls.length,
    addParentData: false,
  }

  console.log(`[Apify:Instagram] Fetching ${urls.length} URLs`)
  const items = await runActorSync<ApifyInstagramItem>('apify/instagram-scraper', input, apiToken)

  return items
    .map(item => normalizeInstagramApify(item))
    .filter(item => item.account && item.url)
}

// ─── Generic Apify runner ────────────────────────────────────────────────────

/**
 * Run an Apify Actor synchronously and return dataset items.
 * Uses the run-sync-get-dataset-items endpoint (waits for completion).
 */
async function runActorSync<T>(
  actorId: string,
  input: Record<string, unknown>,
  token: string,
): Promise<T[]> {
  const actorSlug = actorId.replace('/', '~')
  const url = `${APIFY_API}/acts/${actorSlug}/run-sync-get-dataset-items?token=${encodeURIComponent(token)}`

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
    signal: AbortSignal.timeout(APIFY_TIMEOUT),
  })

  if (!res.ok) {
    const errText = await res.text().catch(() => '')
    // Parse Apify error JSON for clearer messages
    let message = `Apify ${actorId} HTTP ${res.status}`
    try {
      const errJson = JSON.parse(errText) as { error?: { type?: string; message?: string } }
      if (errJson.error?.type === 'not-enough-usage-to-run-paid-actor') {
        message = `Apify sin créditos suficientes. Recarga en console.apify.com/billing`
      } else if (errJson.error?.message) {
        message = `Apify: ${errJson.error.message}`
      }
    } catch { /* not JSON, use raw */ }
    throw new Error(message)
  }

  const data = await res.json() as T[] | T
  // run-sync-get-dataset-items returns an array directly
  return Array.isArray(data) ? data : [data]
}

// ─── Account-based scraping ───────────────────────────────────────────────────

/**
 * Scrape recent videos from TikTok accounts via Apify (clockworks/tiktok-scraper).
 * handles = already-sliced list (caller controls how many accounts).
 * videosPerAccount = fixed number of videos to fetch per account.
 */
export async function scrapeAccountsTikTokApify(
  handles: string[],      // without @, already sliced to desired account count
  apiToken: string,
  videosPerAccount = 3,
): Promise<ScrapedItem[]> {
  const input = {
    profiles: handles,
    profileScrapeSections: ['videos'],
    profileSorting: 'latest',
    maxVideos: handles.length * videosPerAccount,
    oldestPostDateUnified: '10 days',  // only videos from the last 10 days (charged filter)
    shouldDownloadVideos: false,
    shouldDownloadCovers: false,
    shouldDownloadSlideshowImages: false,
    shouldDownloadAvatars: false,
    shouldDownloadMusicCovers: false,
    downloadSubtitlesOptions: 'NEVER_DOWNLOAD_SUBTITLES',
    proxyCountryCode: 'None',
  }

  console.log(`[Apify:TikTok] Accounts: ${handles.length} handles, ${videosPerAccount}/account`)
  const items = await runActorSync<ApifyTikTokItem>('clockworks/tiktok-scraper', input, apiToken)
  console.log(`[Apify:TikTok] Got ${items.length} account items`)

  return items
    .map(item => normalizeTikTokApify(item))
    .filter(item => item.account && item.url)
}

/**
 * Scrape recent posts from Instagram accounts via Apify (apify/instagram-scraper).
 * handles = already-sliced list (caller controls how many accounts).
 * videosPerAccount = fixed number of posts to fetch per account (last ~10 days).
 */
export async function scrapeAccountsInstagramApify(
  handles: string[],      // without @, already sliced to desired account count
  apiToken: string,
  videosPerAccount = 3,
): Promise<ScrapedItem[]> {
  const cutoffDate = new Date(Date.now() - 10 * 24 * 3600 * 1000).toISOString().split('T')[0]
  const input = {
    directUrls: handles.map(h => `https://www.instagram.com/${h}/`),
    resultsType: 'posts',
    resultsLimit: videosPerAccount,
    onlyPostsNewerThan: cutoffDate,
    addParentData: false,
  }

  console.log(`[Apify:Instagram] Accounts: ${handles.length} handles, ${videosPerAccount}/account, since ${cutoffDate}`)
  const items = await runActorSync<ApifyInstagramItem>('apify/instagram-scraper', input, apiToken)
  console.log(`[Apify:Instagram] Got ${items.length} account items`)

  return items
    .map(item => normalizeInstagramApify(item))
    .filter(item => item.account && item.url)
}

// ─── YouTube Actor ────────────────────────────────────────────────────────────

interface ApifyYouTubeItem {
  id?: string
  title?: string
  url?: string
  thumbnailUrl?: string
  viewCount?: number
  likes?: number
  commentsCount?: number
  duration?: string  // "HH:MM:SS" or "MM:SS"
  channelName?: string
  channelUrl?: string
  numberOfSubscribers?: number
  date?: string
  text?: string
}

function normalizeYouTubeApify(
  item: ApifyYouTubeItem,
  platform: 'youtube_long' | 'youtube_short',
  keyword?: string
): ScrapedItem {
  return {
    id: item.id || Math.random().toString(36).slice(2),
    platform,
    account: item.channelName || '',
    url: item.url || '',
    video_url: item.url || '',
    thumbnail: item.thumbnailUrl || '',
    caption: item.title || '',
    views: item.viewCount || 0,
    likes: item.likes || 0,
    comments: item.commentsCount || 0,
    shares: 0,
    saves: 0,
    followers: item.numberOfSubscribers || 0,
    posted_at: item.date || undefined,
    keyword: keyword || '',
  }
}

/**
 * Search YouTube via Apify Actor (streamers/youtube-scraper) by keywords.
 * videoType 'long' → maxResults (regular videos), 'short' → maxResultsShorts.
 */
export async function searchYouTubeApify(
  keywords: string[],
  apiToken: string,
  videoType: 'long' | 'short',
  maxResults: number,
): Promise<ScrapedItem[]> {
  const platform = videoType === 'long' ? 'youtube_long' as const : 'youtube_short' as const

  // maxResults in streamers/youtube-scraper is per query (per keyword), not total.
  // Divide the total target by number of keywords to stay close to the requested count.
  const perKeyword = Math.max(1, Math.ceil(maxResults / Math.max(keywords.length, 1)))

  // Limit the keywords sent to Apify so total Apify events ≈ maxResults.
  // Without this, e.g. 9 keywords × perKeyword=1 still fires 9 queries and Apify
  // returns its internal minimum per query (~3), burning credits for unwanted results.
  const keywordsToUse = keywords.slice(0, Math.max(1, Math.ceil(maxResults / Math.max(perKeyword, 1))))

  const input = videoType === 'long'
    ? {
        searchQueries: keywordsToUse,
        maxResults: Math.min(perKeyword, 50),
        maxResultsShorts: 0,
        maxResultStreams: 0,
        dateFilter: 'month',
      }
    : {
        searchQueries: keywordsToUse,
        maxResults: 0,
        maxResultsShorts: Math.min(perKeyword, 50),
        maxResultStreams: 0,
        dateFilter: 'month',
      }

  console.log(`[Apify:YouTube] Searching ${videoType}: ${keywordsToUse.length}/${keywords.length} keywords, perKeyword=${perKeyword} (target ${maxResults}), dateFilter=month`)
  const items = await runActorSync<ApifyYouTubeItem>('streamers/youtube-scraper', input, apiToken)
  console.log(`[Apify:YouTube] Got ${items.length} raw items`)

  return items
    .map(item => normalizeYouTubeApify(item, platform))
    .filter(item => item.account && item.url)
    .slice(0, maxResults)
}

/**
 * Fetch YouTube video details by direct URLs via Apify Actor (streamers/youtube-scraper).
 */
export async function fetchYouTubeByUrlApify(
  urls: string[],
  apiToken: string,
  videoType: 'long' | 'short',
): Promise<ScrapedItem[]> {
  const platform = videoType === 'long' ? 'youtube_long' as const : 'youtube_short' as const

  const input = {
    startUrls: urls.map(url => ({ url })),
    maxResults: urls.length,
    maxResultsShorts: urls.length,
    maxResultStreams: 0,
  }

  console.log(`[Apify:YouTube] Fetching ${urls.length} URLs (${videoType})`)
  const items = await runActorSync<ApifyYouTubeItem>('streamers/youtube-scraper', input, apiToken)

  return items
    .map(item => normalizeYouTubeApify(item, platform))
    .filter(item => item.account && item.url)
}

// ─── Connection test ─────────────────────────────────────────────────────────

/**
 * Test Apify API token by calling the user info endpoint.
 */
export async function testApifyConnection(token: string): Promise<{ ok: boolean; message: string }> {
  try {
    const res = await fetch(`${APIFY_API}/users/me?token=${encodeURIComponent(token)}`, {
      signal: AbortSignal.timeout(10_000),
    })
    if (!res.ok) {
      return { ok: false, message: `HTTP ${res.status} — token inválido o expirado` }
    }
    const data = await res.json() as { data?: { username?: string } }
    return { ok: true, message: `Conectado como: ${data.data?.username || 'OK'}` }
  } catch (err) {
    return { ok: false, message: `Error: ${(err as Error).message}` }
  }
}
