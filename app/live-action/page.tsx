"use client"

import Image from "next/image"
import { useState } from "react"
import { ChevronLeft, ChevronRight, X } from "lucide-react"

import { Button } from "@/app/components/ui/button"
import { VideoPlayer } from "@/app/components/video-player"

const projects = [
  {
    id: 1,
    title: "Burt's bees",
    thumbnail:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-21%20at%202.40.17%E2%80%AFAM-3YvLGrWcSK28m2qklDlEQPu2ZxAmYB.png",
    videoUrl: "https://mooc-cms-new-mooc.s3.ca-central-1.amazonaws.com/burt%E2%80%98s+bee+15s_with+sub.mp4",
    credits: {
      screenwriter: "John Smith",
      director: "John Smith",
      photography: "John Smith",
      creativeDirector: "John Smith",
    },
  },
  {
    id: 2,
    title: "OLG 2024 CNY Commercial",
    thumbnail: "/placeholder.svg?height=338&width=600",
    videoUrl: "https://example.com/video2.mp4",
    credits: {
      screenwriter: "Sarah Johnson",
      director: "Michael Chen",
      photography: "David Wong",
      creativeDirector: "Emily Liu",
    },
  },
  {
    id: 3,
    title: "Audi Event Opening",
    thumbnail: "/placeholder.svg?height=338&width=600",
    videoUrl: "https://example.com/video3.mp4",
    credits: {
      screenwriter: "James Wilson",
      director: "Robert Davis",
      photography: "Thomas Brown",
      creativeDirector: "Anna Martinez",
    },
  },
  {
    id: 4,
    title: "OLG 2024 CNY Commercial - 2",
    thumbnail: "/placeholder.svg?height=338&width=600",
    videoUrl: "https://example.com/video4.mp4",
    credits: {
      screenwriter: "Lisa Chen",
      director: "Kevin Wang",
      photography: "Chris Zhang",
      creativeDirector: "Michelle Lee",
    },
  },
  {
    id: 5,
    title: "Nike Running Campaign",
    thumbnail: "/placeholder.svg?height=338&width=600",
    videoUrl: "https://example.com/video5.mp4",
    credits: {
      screenwriter: "Mark Thompson",
      director: "Rachel Kim",
      photography: "Steven Park",
      creativeDirector: "Jessica Wu",
    },
  },
  {
    id: 6,
    title: "Apple Product Launch",
    thumbnail: "/placeholder.svg?height=338&width=600",
    videoUrl: "https://example.com/video6.mp4",
    credits: {
      screenwriter: "Daniel Lee",
      director: "Sophie Anderson",
      photography: "Peter Chang",
      creativeDirector: "Grace Wang",
    },
  },
  {
    id: 7,
    title: "BMW Innovation Series",
    thumbnail: "/placeholder.svg?height=338&width=600",
    videoUrl: "https://example.com/video7.mp4",
    credits: {
      screenwriter: "Alex Turner",
      director: "William Chen",
      photography: "Jennifer Liu",
      creativeDirector: "Michael Zhang",
    },
  },
  {
    id: 8,
    title: "Coca-Cola Summer Campaign",
    thumbnail: "/placeholder.svg?height=338&width=600",
    videoUrl: "https://example.com/video8.mp4",
    credits: {
      screenwriter: "Emma Davis",
      director: "David Kim",
      photography: "Andrew Lee",
      creativeDirector: "Sarah Chen",
    },
  },
  {
    id: 9,
    title: "Samsung Galaxy Launch",
    thumbnail: "/placeholder.svg?height=338&width=600",
    videoUrl: "https://example.com/video9.mp4",
    credits: {
      screenwriter: "Ryan Wilson",
      director: "Linda Wang",
      photography: "Tony Zhang",
      creativeDirector: "Helen Liu",
    },
  },
  {
    id: 10,
    title: "Adidas Sports Collection",
    thumbnail: "/placeholder.svg?height=338&width=600",
    videoUrl: "https://example.com/video10.mp4",
    credits: {
      screenwriter: "Paul Anderson",
      director: "Karen Chen",
      photography: "Mike Johnson",
      creativeDirector: "Lucy Zhang",
    },
  },
]

const PROJECTS_PER_PAGE = 4

export default function LiveAction() {
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[0] | null>(null)
  const [visibleProjects, setVisibleProjects] = useState(PROJECTS_PER_PAGE)

  const handleProjectClick = (project: (typeof projects)[0]) => {
    setSelectedProject(project)
  }

  const handlePrevious = () => {
    if (!selectedProject) return
    const currentIndex = projects.findIndex((p) => p.id === selectedProject.id)
    const previousIndex = (currentIndex - 1 + projects.length) % projects.length
    setSelectedProject(projects[previousIndex])
  }

  const handleNext = () => {
    if (!selectedProject) return
    const currentIndex = projects.findIndex((p) => p.id === selectedProject.id)
    const nextIndex = (currentIndex + 1) % projects.length
    setSelectedProject(projects[nextIndex])
  }

  const handleViewMore = () => {
    setVisibleProjects((prev) => Math.min(prev + PROJECTS_PER_PAGE, projects.length))
  }

  return (
    <>
      {/* Projects Grid */}
      <section className="relative z-10 bg-black px-8 py-16">
        <div className="mb-12 flex items-center">
          <div className="h-8 w-2 bg-yellow-400" />
          <h2 className="ml-4 text-2xl font-bold text-white">Live Action</h2>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {projects.slice(0, visibleProjects).map((project) => (
            <div
              key={project.id}
              className="group relative cursor-pointer overflow-hidden"
              onClick={() => handleProjectClick(project)}
            >
              <div className="aspect-video overflow-hidden">
                <Image
                  src={project.thumbnail || "/placeholder.svg"}
                  alt={project.title}
                  width={600}
                  height={338}
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-black/60 p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <h3 className="text-xl font-bold text-white">{project.title}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* View More Button */}
        {visibleProjects < projects.length && (
          <div className="mt-12 flex justify-center">
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/20" onClick={handleViewMore}>
              View More
            </Button>
          </div>
        )}
      </section>

      {/* Project Viewer */}
      {selectedProject && (
        <section className="fixed inset-0 z-50 bg-black">
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4 z-10 text-white/70 hover:text-white"
            onClick={() => setSelectedProject(null)}
          >
            <X className="h-6 w-6" />
          </Button>

          <VideoPlayer src={selectedProject.videoUrl} poster={selectedProject.thumbnail} />

          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-8">
            <h2 className="text-2xl font-bold text-white">{selectedProject.title}</h2>
            <div className="mt-4 grid grid-cols-2 gap-8 text-sm text-white/70 md:grid-cols-4">
              <div>
                <p className="font-medium">Screenwriter</p>
                <p>{selectedProject.credits.screenwriter}</p>
              </div>
              <div>
                <p className="font-medium">Director</p>
                <p>{selectedProject.credits.director}</p>
              </div>
              <div>
                <p className="font-medium">Photography</p>
                <p>{selectedProject.credits.photography}</p>
              </div>
              <div>
                <p className="font-medium">Creative Director</p>
                <p>{selectedProject.credits.creativeDirector}</p>
              </div>
            </div>
          </div>

          <div className="absolute bottom-8 right-8 flex gap-4">
            <Button
              size="icon"
              variant="outline"
              className="h-12 w-12 rounded-full border-white/20 text-white/70 hover:bg-white/20"
              onClick={handlePrevious}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button
              size="icon"
              variant="outline"
              className="h-12 w-12 rounded-full border-white/20 text-white/70 hover:bg-white/20"
              onClick={handleNext}
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>
        </section>
      )}
    </>
  )
}

