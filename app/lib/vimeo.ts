const VIMEO_HOSTS = new Set(["vimeo.com", "www.vimeo.com", "player.vimeo.com"])

function extractVimeoId(rawUrl: string) {
  try {
    const parsed = new URL(rawUrl)
    if (!VIMEO_HOSTS.has(parsed.hostname)) return null

    const queryVideoId = parsed.searchParams.get("video")
    if (queryVideoId && /^\d+$/.test(queryVideoId)) return queryVideoId

    const pathMatch = parsed.pathname.match(/\/video\/(\d+)/)
    if (pathMatch?.[1]) return pathMatch[1]

    const genericMatch = parsed.pathname.match(/\/(\d+)(?:\/)?$/)
    if (genericMatch?.[1]) return genericMatch[1]
  } catch {
    return null
  }

  return null
}

export function toVimeoEmbedUrl(rawUrl: string, autoplay = false) {
  const id = extractVimeoId(rawUrl)
  if (!id) return rawUrl

  const query = new URLSearchParams({
    title: "0",
    byline: "0",
    portrait: "0",
  })

  if (autoplay) {
    query.set("autoplay", "1")
  }

  return `https://player.vimeo.com/video/${id}?${query.toString()}`
}
