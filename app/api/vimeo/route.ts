import { NextRequest, NextResponse } from "next/server"
import { toVimeoEmbedUrl } from "@/app/lib/vimeo"

const YOUTUBE_HOSTS = new Set(["youtube.com", "www.youtube.com", "m.youtube.com", "youtu.be", "www.youtu.be"])

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get("url")
  if (!url) {
    return NextResponse.json({ error: "Missing url parameter" }, { status: 400 })
  }

  let parsed: URL
  try {
    parsed = new URL(url)
  } catch {
    return NextResponse.json({ error: "Invalid url parameter" }, { status: 400 })
  }

  const isVimeo = parsed.hostname.includes("vimeo.com")
  const isYoutube = YOUTUBE_HOSTS.has(parsed.hostname)

  if (!isVimeo && !isYoutube) {
    return NextResponse.json({ error: "Only Vimeo or YouTube URLs are supported" }, { status: 400 })
  }

  try {
    const oEmbedUrl = isVimeo
      ? `https://vimeo.com/api/oembed.json?url=${encodeURIComponent(parsed.toString())}`
      : `https://www.youtube.com/oembed?url=${encodeURIComponent(parsed.toString())}&format=json`
    const response = await fetch(oEmbedUrl, { cache: "no-store" })
    const fallbackEmbedUrl = isVimeo ? toVimeoEmbedUrl(url) : url

    if (!response.ok) {
      return NextResponse.json({ thumbnailUrl: null, title: null, embedUrl: fallbackEmbedUrl }, { status: 200 })
    }

    const data = await response.json()
    const normalizedEmbedUrl = isVimeo ? toVimeoEmbedUrl(url) : url
    return NextResponse.json(
      {
        title: data.title || null,
        thumbnailUrl: data.thumbnail_url || null,
        embedUrl: normalizedEmbedUrl,
      },
      { status: 200 },
    )
  } catch {
    const fallbackEmbedUrl = isVimeo ? toVimeoEmbedUrl(url) : url
    return NextResponse.json({ thumbnailUrl: null, title: null, embedUrl: fallbackEmbedUrl }, { status: 200 })
  }
}
