"use client"

import Image from "next/image"
import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/app/components/ui/button"
import { VideoPlayer } from "@/app/components/video-player"

interface Project {
  id: number;
  documentId: string;
  ProjectName: string;
  Display: boolean;
  Description: string | null;
  ListOrder: number | null; // 允许为 null
  FeatureImage: {
    url: string;
  };
  Video: {
    url: string;
  };
}

export default function LiveAction() {
  const PROJECTS_PER_PAGE = 6; 
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[0] | null>(null)
  const [visibleProjects, setVisibleProjects] = useState(PROJECTS_PER_PAGE)
  const [isFadingOut, setIsFadingOut] = useState(false)
  const [previewStates, setPreviewStates] = useState<{ [id: number]: boolean }>({})

  // Add effect to hide/show navigation when video player is active
  useEffect(() => {
    const navDesktop = document.querySelector('div.desktop-nav');
    const rightStripe = document.querySelector('div.right-stripe');
    
    if (selectedProject) {
      // Hide only desktop navigation and right stripe when video is selected
      if (navDesktop) navDesktop.classList.add('hidden');
      if (rightStripe) rightStripe.classList.remove('lg:block');
    } else {
      // Show desktop navigation and right stripe when video is closed
      if (navDesktop) navDesktop.classList.remove('hidden');
      if (rightStripe) rightStripe.classList.add('lg:block');
    }
    
    // Cleanup function
    return () => {
      if (navDesktop) navDesktop.classList.remove('hidden');
      if (rightStripe) rightStripe.classList.add('lg:block');
    };
  }, [selectedProject]);

  const startPreview = (id: number) => {
    setPreviewStates((prev) => ({ ...prev, [id]: true }))
    setTimeout(() => {
      setPreviewStates((prev) => ({ ...prev, [id]: false }))
    }, 10000)
  }

  const stopPreview = (id: number) => {
    setPreviewStates((prev) => ({ ...prev, [id]: false }))
  }

  const handleThumbnailClick = (project: (typeof projects)[0]) => {
    const isPlaying = previewStates[project.id]
    if (!isPlaying) {
      startPreview(project.id)
    } else {
      setSelectedProject(project)
    }
  }

  const handleMouseEnter = (project: (typeof projects)[0]) => {
    startPreview(project.id)
  }

  const handleMouseLeave = (project: (typeof projects)[0]) => {
    stopPreview(project.id)
  }

  const handleProjectClick = (project: (typeof projects)[0]) => {
    setSelectedProject(project)
  }

  const handlePrevious = () => {
    if (!selectedProject) return
    setIsFadingOut(true)
    setTimeout(() => {
      const currentIndex = projects.findIndex((p) => p.id === selectedProject.id)
      const previousIndex = (currentIndex - 1 + projects.length) % projects.length
      setSelectedProject(projects[previousIndex])
      setIsFadingOut(false)
    }, 300)
  }

  const handleNext = () => {
    if (!selectedProject) return
    setIsFadingOut(true)
    setTimeout(() => {
      const currentIndex = projects.findIndex((p) => p.id === selectedProject.id)
      const nextIndex = (currentIndex + 1) % projects.length
      setSelectedProject(projects[nextIndex])
      setIsFadingOut(false)
    }, 300)
  }

  const handleViewMore = () => {
    setVisibleProjects((prev) => Math.min(prev + PROJECTS_PER_PAGE, projects.length))
  }

  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await fetch('https://smm-cms-bc62f0c8a130.herokuapp.com/api/live-actions?populate=*');
        if (!response.ok) {
          throw new Error('Failed to fetch projects');
        }
        const data = await response.json();
        const projectsData: Project[] = data.data || [];
        // 根据 listorder 排序，null 的排在最后
        projectsData.sort((a, b) => {
          const aValue = a.ListOrder === null ? Infinity : a.ListOrder;
          const bValue = b.ListOrder === null ? Infinity : b.ListOrder;
          return aValue - bValue;
        });
        setProjects(projectsData);
      } catch (error) {
        console.error('Error fetching projects:', error);
        setProjects([]);
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3 // Controls the delay between each item
      }
    }
  };

  const item = {
    hidden: { opacity: 0, x: -40 },
    show: { opacity: 1, x: 0 }
  };

  return (
    <>
      <section className="relative z-10 bg-black px-8 py-12 ">
        <div className="mb-8 flex justify-left">
          <div className="inline-flex flex-col items-center w-fit">
            <h2 className="mt-[80px] md:mt-[50px] text-4xl  px-4 md:text-[90px] font-['AvenirNextBold'] text-yellow-400 text-center uppercase ">
              Live Action
            </h2>
            <h2 className="absolute z-[-1] right-20 md:text-[200px] text-2xl font-['AvenirNextBold'] text-[#121212] text-center uppercase">
              Works
            </h2>
          </div>
        </div>

        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 gap-8 lg:grid-cols-3 md:grid-cols-2"
        >
          {projects.slice(0, visibleProjects).map((project, index) => {
            const isPreviewPlaying = previewStates[project.id] || false
            return (
              <motion.div
                key={project.id}
                variants={item}
                className="group relative cursor-pointer overflow-hidden"
                onClick={() => handleThumbnailClick(project)}
                onMouseEnter={() => handleMouseEnter(project)}
                onMouseLeave={() => handleMouseLeave(project)}
              >
                <div className="relative aspect-video overflow-hidden rounded-3xl group-hover:border-[3px] group-hover:border-yellow-400 ">
                  <Image
                    src={project.FeatureImage?.url || "/placeholder.svg"}
                    alt={project.ProjectName}
                    width={600}
                    height={338}
                    className="object-cover transition-all duration-300"
                  />
                </div>
                <div className="inset-0 bg-black/60 p-4 transition-opacity duration-300 group-hover:opacity-100">
                  <h3 className="text-l font-bold text-white">{project.ProjectName}</h3>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {visibleProjects < projects.length && (
          <div className="mt-3 flex justify-left">
            <Button className="bg-[url(/images/view-more-btn.png)] bg-no-repeat bg-contain w-[150px]" onClick={handleViewMore}>
             
            </Button>
          </div>
        )}
      </section>

      {selectedProject && (
        <section className="fixed inset-0 z-20 bg-black">
          <Button
            variant="ghost"
            size="lg"
            className="absolute left-0 md:top-0 top-40 z-10 md:p-8 p-4 text-black bg-yellow hover:text-black rounded-br-lg"
            onClick={() => setSelectedProject(null)}
          >
            <div className="flex md:flex-col items-center ">
              <X className="h-6 w-6" />
              <span className="md:text-lg text-sm md:mt-1 margin-0 font-bold font-[AvenirNextMedium]">BACK</span>
            </div>
          </Button>

          <div className={`transition-opacity duration-300 ${isFadingOut ? "opacity-0" : "opacity-100"}`}>
            <div className="fixed md:top-0 top-40 right-0 left-0 bottom-0 overflow-y-auto">
              <div className="w-5/6 mx-auto py-8">
                <VideoPlayer
                  key={selectedProject.Video?.url}
                  src={selectedProject.Video?.url}
                  poster={selectedProject.FeatureImage?.url}
                />
                <div className="relative bg-gradient-to-t from-black to-transparent md:p-4 p-2 text-left">
                  <h2 className="text-2xl md:text-3xl font-bold text-white">{selectedProject.ProjectName}</h2>
                  <div className="mt-0 grid grid-cols-1 gap-8 text-sm">
                    <div>
                      <p className="pt-4 pr-4 text-[#acacac]">
                        {selectedProject.Description || " "}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="text-left mt-6 pb-8">
                  <Button onClick={handlePrevious} className="bg-transparent">
                    <img src="/images/prev.png" width="100px" alt="" />
                  </Button>
                  <Button onClick={handleNext} className="bg-transparent">
                    <img src="/images/next.png" width="100px" alt="" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  )
}
