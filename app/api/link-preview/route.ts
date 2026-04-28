import { NextRequest, NextResponse } from "next/server"

const META_PATTERNS = [
  /<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["'][^>]*>/i,
  /<meta[^>]+name=["']twitter:image["'][^>]+content=["']([^"']+)["'][^>]*>/i,
  /<meta[^>]+property=["']og:video:image["'][^>]+content=["']([^"']+)["'][^>]*>/i,
]

function extractMetaImage(html: string) {
  for (const pattern of META_PATTERNS) {
    const match = html.match(pattern)
    if (match?.[1]) {
      return match[1]
    }
  }
  return null
}

export async function GET(request: NextRequest) {
  const rawUrl = request.nextUrl.searchParams.get("url")
  if (!rawUrl) {
    return NextResponse.json({ error: "Missing url parameter" }, { status: 400 })
  }

  let parsedUrl: URL
  try {
    parsedUrl = new URL(rawUrl)
  } catch {
    return NextResponse.json({ error: "Invalid url parameter" }, { status: 400 })
  }

  if (!["http:", "https:"].includes(parsedUrl.protocol)) {
    return NextResponse.json({ error: "Unsupported protocol" }, { status: 400 })
  }

  try {
    const response = await fetch(parsedUrl.toString(), {
      redirect: "follow",
      headers: {
        "user-agent": "Mozilla/5.0 (compatible; SMMBot/1.0)",
      },
      cache: "no-store",
    })

    if (!response.ok) {
      return NextResponse.json({ image: null, finalUrl: response.url }, { status: 200 })
    }

    const html = await response.text()
    const image = extractMetaImage(html)
    return NextResponse.json({ image, finalUrl: response.url }, { status: 200 })
  } catch {
    return NextResponse.json({ image: null, finalUrl: parsedUrl.toString() }, { status: 200 })
  }
}
