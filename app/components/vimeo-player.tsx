"use client"

interface VimeoPlayerProps {
  url: string
  title?: string
  autoplay?: boolean
  className?: string
}

import { toVimeoEmbedUrl } from "@/app/lib/vimeo"

const YOUTUBE_HOSTS = new Set([
  "youtube.com",
  "www.youtube.com",
  "m.youtube.com",
  "youtu.be",
  "www.youtu.be",
  "youtube-nocookie.com",
  "www.youtube-nocookie.com",
])

function parseTimeToSeconds(raw: string | null) {
  if (!raw) return null
  if (/^\d+$/.test(raw)) return Number(raw)

  const match = raw.match(/^(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?$/)
  if (!match) return null

  const hours = Number(match[1] || 0)
  const minutes = Number(match[2] || 0)
  const seconds = Number(match[3] || 0)
  const total = hours * 3600 + minutes * 60 + seconds
  return total > 0 ? total : null
}

function toYoutubeEmbedUrl(rawUrl: string, autoplay = false) {
  try {
    const parsed = new URL(rawUrl)
    if (!YOUTUBE_HOSTS.has(parsed.hostname)) return rawUrl

    let videoId: string | null = null

    if (parsed.hostname.includes("youtu.be")) {
      videoId = parsed.pathname.split("/").filter(Boolean)[0] || null
    } else if (parsed.pathname.startsWith("/embed/")) {
      videoId = parsed.pathname.split("/")[2] || null
    } else if (parsed.pathname.startsWith("/shorts/")) {
      videoId = parsed.pathname.split("/")[2] || null
    } else {
      videoId = parsed.searchParams.get("v")
    }

    if (!videoId) return rawUrl

    const query = new URLSearchParams()
    const start = parseTimeToSeconds(parsed.searchParams.get("t") || parsed.searchParams.get("start"))
    if (start) query.set("start", String(start))
    if (autoplay) query.set("autoplay", "1")

    const queryString = query.toString()
    return `https://www.youtube.com/embed/${videoId}${queryString ? `?${queryString}` : ""}`
  } catch {
    return rawUrl
  }
}

function toEmbedUrl(rawUrl: string, autoplay = false) {
  const vimeoUrl = toVimeoEmbedUrl(rawUrl, autoplay)
  if (vimeoUrl !== rawUrl) return vimeoUrl
  return toYoutubeEmbedUrl(rawUrl, autoplay)
}

export function VimeoPlayer({ url, title, autoplay = false, className }: VimeoPlayerProps) {
  return (
    <iframe
      src={toEmbedUrl(url, autoplay)}
      title={title || "Video player"}
      allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
      allowFullScreen
      className={className || "h-full w-full"}
    />
  )
}
