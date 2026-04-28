import { NextRequest, NextResponse } from "next/server"
import { toVimeoEmbedUrl } from "@/app/lib/vimeo"

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

  if (!parsed.hostname.includes("vimeo.com")) {
    return NextResponse.json({ error: "Only Vimeo URLs are supported" }, { status: 400 })
  }

  try {
    const oEmbedUrl = `https://vimeo.com/api/oembed.json?url=${encodeURIComponent(parsed.toString())}`
    const response = await fetch(oEmbedUrl, { cache: "no-store" })

    if (!response.ok) {
      return NextResponse.json({ thumbnailUrl: null, title: null, embedUrl: toVimeoEmbedUrl(url) }, { status: 200 })
    }

    const data = await response.json()
    return NextResponse.json(
      {
        title: data.title || null,
        thumbnailUrl: data.thumbnail_url || null,
        embedUrl: data.video_id ? `https://player.vimeo.com/video/${data.video_id}` : toVimeoEmbedUrl(url),
      },
      { status: 200 },
    )
  } catch {
    return NextResponse.json({ thumbnailUrl: null, title: null, embedUrl: toVimeoEmbedUrl(url) }, { status: 200 })
  }
}
