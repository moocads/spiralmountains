import { NextRequest, NextResponse } from "next/server"

function getStrapiBaseUrl(): string | undefined {
  const raw = process.env.STRAPI_API_URL ?? process.env.STRAPI_API_url
  return raw?.replace(/\/$/, "")
}

export async function GET(request: NextRequest) {
  const path = request.nextUrl.searchParams.get("path")
  if (!path) {
    return NextResponse.json({ error: "Missing path parameter" }, { status: 400 })
  }

  const baseUrl = getStrapiBaseUrl()
  const token = process.env.STRAPI_API_TOKEN
  if (!baseUrl) {
    return NextResponse.json({ error: "CMS not configured" }, { status: 500 })
  }

  const sanitizedPath = path.replace(/^\/+/, "").replace(/\/+$/, "")
  if (!/^[a-zA-Z0-9/_-]+$/.test(sanitizedPath)) {
    return NextResponse.json({ error: "Invalid path" }, { status: 400 })
  }

  const upstream = new URL(`${baseUrl}/api/${sanitizedPath}`)
  request.nextUrl.searchParams.forEach((value, key) => {
    if (key !== "path") upstream.searchParams.set(key, value)
  })

  const headers: HeadersInit = { Accept: "application/json" }
  if (token) headers.Authorization = `Bearer ${token}`

  try {
    const response = await fetch(upstream.toString(), { headers, cache: "no-store" })
    const data = await response.json()
    return NextResponse.json(data, { status: response.status })
  } catch {
    return NextResponse.json({ error: "Failed to fetch from CMS" }, { status: 502 })
  }
}
