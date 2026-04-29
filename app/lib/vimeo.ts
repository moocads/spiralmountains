const VIMEO_HOSTS = new Set(["vimeo.com", "www.vimeo.com", "player.vimeo.com"])

interface ParsedVimeoUrl {
  id: string
  hash: string | null
}

export function isVimeoUrl(rawUrl: string) {
  try {
    const parsed = new URL(rawUrl)
    return VIMEO_HOSTS.has(parsed.hostname)
  } catch {
    return false
  }
}

function extractVimeoInfo(rawUrl: string): ParsedVimeoUrl | null {
  try {
    const parsed = new URL(rawUrl)
    if (!VIMEO_HOSTS.has(parsed.hostname)) return null

    const queryVideoId = parsed.searchParams.get("video")
    if (queryVideoId && /^\d+$/.test(queryVideoId)) {
      return { id: queryVideoId, hash: parsed.searchParams.get("h") }
    }

    const pathMatch = parsed.pathname.match(/\/video\/(\d+)/)
    if (pathMatch?.[1]) {
      return { id: pathMatch[1], hash: parsed.searchParams.get("h") }
    }

    // Supports links like https://vimeo.com/{videoId}/{hash}
    const pathWithHashMatch = parsed.pathname.match(/^\/(\d+)\/([a-zA-Z0-9]+)\/?$/)
    if (pathWithHashMatch?.[1]) {
      return { id: pathWithHashMatch[1], hash: pathWithHashMatch[2] }
    }

    const genericMatch = parsed.pathname.match(/\/(\d+)(?:\/)?$/)
    if (genericMatch?.[1]) {
      return { id: genericMatch[1], hash: parsed.searchParams.get("h") }
    }
  } catch {
    return null
  }

  return null
}

export function toVimeoEmbedUrl(rawUrl: string, autoplay = false) {
  const info = extractVimeoInfo(rawUrl)
  if (!info) return rawUrl

  const query = new URLSearchParams({
    title: "0",
    byline: "0",
    portrait: "0",
  })

  if (info.hash) {
    query.set("h", info.hash)
  }

  if (autoplay) {
    query.set("autoplay", "1")
  }

  return `https://player.vimeo.com/video/${info.id}?${query.toString()}`
}
