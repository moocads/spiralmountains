"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

interface DirectorWork {
  id: number
  title: string | null
  source_link: string
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

const toDirectorRouteName = (name: string) => encodeURIComponent(name.trim().toLowerCase())

export default function DirectorsPage() {
  const [directors, setDirectors] = useState<Director[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchDirectors() {
      try {
        const response = await fetch("https://smm-cms-bc62f0c8a130.herokuapp.com/api/director?populate=*")
        if (!response.ok) {
          throw new Error("Failed to fetch directors")
        }
        const data = await response.json()
        setDirectors(data.data || [])
      } catch (error) {
        console.error("Error fetching directors:", error)
        setDirectors([])
      } finally {
        setLoading(false)
      }
    }

    fetchDirectors()
  }, [])

  return (
    <section className="relative z-10 min-h-screen bg-black px-8 py-12">
      <div className="mb-8 flex justify-left">
        <div className="inline-flex flex-col items-center w-fit">
          <h2 className="mt-[80px] md:mt-[50px] px-4 text-4xl md:text-[90px] font-['AvenirNextBold'] text-yellow-400 text-center uppercase">
            Directors
          </h2>
          <h2 className="absolute z-[-1] right-20 text-2xl md:text-[200px] font-['AvenirNextBold'] text-[#121212] text-center uppercase">
            Team
          </h2>
        </div>
      </div>

      {loading ? (
        <p className="text-[#9a9a9a]">Loading directors...</p>
      ) : (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-5xl">
          {directors.map((director) => (
            <Link key={director.id} href={`/directors/${toDirectorRouteName(director.Name)}`} className="group block">
              <div className="relative aspect-[3/4] overflow-hidden bg-[#111111] rounded-3xl">
                <Image
                  src={director.director_photo?.url || "/placeholder-user.jpg"}
                  alt={director.Name}
                  fill
                  className="object-cover transition duration-300 group-hover:scale-105"
                />
              </div>
              <h3 className="mt-3 text-[34px] leading-none font-['AvenirNextBold'] text-white">{director.Name}</h3>
              <p className="mt-1 text-[20px] text-yellow-400 underline underline-offset-2">view more</p>
            </Link>
          ))}
        </div>
      )}
    </section>
  )
}
