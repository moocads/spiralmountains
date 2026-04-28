"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
import { X } from "lucide-react"
import { VimeoPlayer } from "@/app/components/vimeo-player"

interface DirectorWork {
  id: number
  title: string | null
  source_link: string
}

interface VimeoMeta {
  title: string | null
  thumbnailUrl: string | null
  embedUrl: string | null
}

interface Director {
  id: number
  documentId: string
  Name: string
  Description: string | null
  director_photo?: {
    url: string
  }
  works: DirectorWork[]
}

const normalizeDirectorName = (name: string) => decodeURIComponent(name).trim().toLowerCase()

export default function DirectorDetailPage({ params }: { params: { director_name: string } }) {
  const [director, setDirector] = useState<Director | null>(null)
  const [loading, setLoading] = useState(true)
  const [vimeoByWorkId, setVimeoByWorkId] = useState<Record<number, VimeoMeta>>({})
  const [selectedWorkIndex, setSelectedWorkIndex] = useState<number | null>(null)

  const routeName = useMemo(() => normalizeDirectorName(params.director_name), [params.director_name])

  useEffect(() => {
    async function fetchDirector() {
      try {
        const response = await fetch("https://smm-cms-bc62f0c8a130.herokuapp.com/api/director?populate=*")
        if (!response.ok) {
          throw new Error("Failed to fetch director details")
        }
        const data = await response.json()
        const matchedDirector = (data.data || []).find(
          (item: Director) => normalizeDirectorName(item.Name) === routeName,
        )
        setDirector(matchedDirector || null)
      } catch (error) {
        console.error("Error fetching director details:", error)
        setDirector(null)
      } finally {
        setLoading(false)
      }
    }

    fetchDirector()
  }, [routeName])

  useEffect(() => {
    if (!director?.works?.length) return

    let isCancelled = false
    const currentDirector = director

    async function fetchVimeoMeta() {
      const entries = await Promise.all(
        currentDirector.works.map(async (work) => {
          try {
            const response = await fetch(`/api/vimeo?url=${encodeURIComponent(work.source_link)}`)
            const data = await response.json()
            const fallbackMeta: VimeoMeta = {
              title: work.title || null,
              thumbnailUrl: currentDirector.director_photo?.url || "/placeholder.jpg",
              embedUrl: work.source_link,
            }
            return [
              work.id,
              {
                title: data.title || fallbackMeta.title,
                thumbnailUrl: data.thumbnailUrl || fallbackMeta.thumbnailUrl,
                embedUrl: data.embedUrl || fallbackMeta.embedUrl,
              },
            ] as const
          } catch {
            return [
              work.id,
              {
                title: work.title || null,
                thumbnailUrl: currentDirector.director_photo?.url || "/placeholder.jpg",
                embedUrl: work.source_link,
              },
            ] as const
          }
        }),
      )

      if (!isCancelled) {
        setVimeoByWorkId(Object.fromEntries(entries))
      }
    }

    fetchVimeoMeta()

    return () => {
      isCancelled = true
    }
  }, [director])

  useEffect(() => {
    const desktopNav = document.querySelector("div.desktop-nav")
    const mobileNav = document.querySelector("body > div.md\\:hidden")
    const rightStripe = document.querySelector("div.right-stripe")

    if (selectedWorkIndex !== null) {
      desktopNav?.classList.add("hidden")
      mobileNav?.classList.add("hidden")
      rightStripe?.classList.remove("lg:block")
    } else {
      desktopNav?.classList.remove("hidden")
      mobileNav?.classList.remove("hidden")
      rightStripe?.classList.add("lg:block")
    }

    return () => {
      desktopNav?.classList.remove("hidden")
      mobileNav?.classList.remove("hidden")
      rightStripe?.classList.add("lg:block")
    }
  }, [selectedWorkIndex])

  if (loading) {
    return (
      <section className="min-h-screen bg-black px-8 py-12">
        <p className="mt-24 text-[#9a9a9a]">Loading director...</p>
      </section>
    )
  }

  if (!director) {
    return (
      <section className="min-h-screen bg-black px-8 py-12">
        <Link
          href="/directors"
          className="mt-24 inline-flex items-center gap-2 bg-yellow px-4 py-2 text-black font-['AvenirNextBold']"
        >
          BACK TO DIRECTORS LIST
        </Link>
        <p className="mt-8 text-white">Director not found.</p>
      </section>
    )
  }

  const selectedWork = selectedWorkIndex !== null ? director.works[selectedWorkIndex] : null
  const selectedWorkLabel = `Work ${(selectedWorkIndex ?? 0) + 1}`
  const selectedWorkMeta = selectedWork ? vimeoByWorkId[selectedWork.id] : null

  return (
    <section className="min-h-screen bg-black px-8 py-12">
      <Link
        href="/directors"
        className="mt-24 inline-flex items-center gap-2 bg-yellow px-4 py-2 text-black font-['AvenirNextMedium']"
      >
        BACK TO DIRECTORS LIST
      </Link>

      <div className="mt-8 grid max-w-6xl gap-10 lg:grid-cols-[360px_1fr]">
        <div className="sticky top-0 aspect-[3/4] w-full max-w-[360px] overflow-hidden bg-[#111111] rounded-3xl">
          <Image
            src={director.director_photo?.url || "/placeholder-user.jpg"}
            alt={director.Name}
            fill
            className="object-cover"
          />
        </div>

        <div>
          <h1 className="text-5xl font-['AvenirNextBold'] text-yellow-400 md:text-7xl">{director.Name}</h1>
          <div className="mt-6 max-w-2xl space-y-5 text-[16px] leading-7 text-[#e0e0e0]">
            {(director.Description || "")
              .split(/\n\s*\n/)
              .map((paragraph) => paragraph.trim())
              .filter(Boolean)
              .map((paragraph, index) => (
                <p key={`${director.id}-paragraph-${index}`} className="whitespace-pre-line">
                  {paragraph}
                </p>
              ))}
          </div>
        </div>
      </div>

      <div className="mt-20 max-w-6xl">
        <h2 className="mb-5 text-4xl font-['AvenirNextBold'] text-white">{director.Name.split(' ')[0]}'s Works</h2>
        {director.works?.length ? (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {director.works.map((work, index) => (
              <button
                key={work.id}
                type="button"
                onClick={() => setSelectedWorkIndex(index)}
                className="group block text-left"
              >
                <div className="relative aspect-video overflow-hidden rounded-3xl bg-[#1b1b1b] group-hover:border-[3px] group-hover:border-yellow-400">
                  <Image
                    src={vimeoByWorkId[work.id]?.thumbnailUrl || director.director_photo?.url || "/placeholder.jpg"}
                    alt={vimeoByWorkId[work.id]?.title || work.title || `Work ${index + 1}`}
                    fill
                    className="object-cover transition-all duration-300 group-hover:scale-105"
                  />
                </div>
                <p className="mt-2 text-lg text-white">{vimeoByWorkId[work.id]?.title || work.title || `Work ${index + 1}`}</p>
              </button>
            ))}
          </div>
        ) : (
          <p className="text-[#9a9a9a]">No works available yet.</p>
        )}
      </div>

      {selectedWork && (
        <section className="fixed inset-0 z-[120] bg-black">
          <button
            type="button"
            className="absolute left-0 top-0 z-10 rounded-br-lg bg-yellow p-4 text-black md:p-8"
            onClick={() => setSelectedWorkIndex(null)}
          >
            <div className="flex items-center md:flex-col">
              <X className="h-6 w-6" />
              <span className="ml-1 text-sm font-bold md:ml-0 md:mt-1 md:text-lg">BACK</span>
            </div>
          </button>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="mx-auto w-5/6 py-8">
              <div className="relative aspect-video overflow-hidden rounded-2xl bg-black">
                <VimeoPlayer
                  url={selectedWorkMeta?.embedUrl || selectedWork.source_link}
                  title={selectedWorkMeta?.title || selectedWork.title || selectedWorkLabel}
                  autoplay
                  className="h-full w-full"
                />
              </div>
              <div className="mt-4">
                <h3 className="text-2xl font-bold text-white">
                  {selectedWorkMeta?.title || selectedWork.title || selectedWorkLabel}
                </h3>
              </div>

              <div className="mt-6 pb-8 flex justify-between items-center gap-4">
                <button
                  type="button"
                  onClick={() =>
                    setSelectedWorkIndex((prev) =>
                      prev === null ? 0 : (prev - 1 + director.works.length) % director.works.length,
                    )
                  }
                  className="bg-transparent"
                >
                  <img src="/images/prev.png" width="100" alt="Previous work" />
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setSelectedWorkIndex((prev) =>
                      prev === null ? 0 : (prev + 1) % director.works.length,
                    )
                  }
                  className="bg-transparent"
                >
                  <img src="/images/next.png" width="100" alt="Next work" />
                </button>
              </div>
            </div>
          </div>
        </section>
      )}
    </section>
  )
}
