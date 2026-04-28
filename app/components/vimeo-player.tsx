"use client"

interface VimeoPlayerProps {
  url: string
  title?: string
  autoplay?: boolean
  className?: string
}

import { toVimeoEmbedUrl } from "@/app/lib/vimeo"

export function VimeoPlayer({ url, title, autoplay = false, className }: VimeoPlayerProps) {
  return (
    <iframe
      src={toVimeoEmbedUrl(url, autoplay)}
      title={title || "Vimeo video"}
      allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
      allowFullScreen
      className={className || "h-full w-full"}
    />
  )
}
