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
    thumbnail: "/images/layer1.png",
    videoUrl: "https://mooc-cms-new-mooc.s3.ca-central-1.amazonaws.com/burt_s_bee_15s_with_sub_b4bb85aab2.mp4",
    credits: {
      screenwriter: "John Smith",
      director: "John Smith",
      photography: "John Smith",
      creativeDirector: "John Smith",
      Actor: ["Vivian Hu", "Richard Will"],
    },
  },
  {
    id: 2,
    title: "OLG 2024 CNY Commercial",
    thumbnail: "/images/Layer2.png",
    videoUrl: "https://mooc-cms-new-mooc.s3.ca-central-1.amazonaws.com/2024_OLG_CNY_commercial_8de09cc156.mp4",
    credits: {
      screenwriter: "Sarah Johnson",
      director: "Michael Chen",
      photography: "David Wong",
      creativeDirector: "Emily Liu",
      Actor: ["Vivian Hu", "Richard Will"],
    },
  },
  {
    id: 3,
    title: "Bingz Commercial",
    thumbnail: "/images/Layer6.jpg",
    videoUrl: "https://mooc-cms-new-mooc.s3.ca-central-1.amazonaws.com/Bingz_2024_fries_commercial_33aaf9b530.mp4",
    credits: {
      screenwriter: "James Wilson",
      director: "Robert Davis",
      photography: "Thomas Brown",
      creativeDirector: "Anna Martinez",
      Actor: ["Vivian Hu", "Richard Will"],
    },
  },
  {
    id: 4,
    title: "OLG 2024 CNY Commercial - 2",
    thumbnail: "/images/Layer4.png",
    videoUrl: "https://example.com/video4.mp4",
    credits: {
      screenwriter: "Lisa Chen",
      director: "Kevin Wang",
      photography: "Chris Zhang",
      creativeDirector: "Michelle Lee",
      Actor: ["Vivian Hu"],
    },
  },
  {
    id: 5,
    title: "Nike Running Campaign",
    thumbnail: "/images/Layer5.png",
    videoUrl: "https://mooc-cms-new-mooc.s3.ca-central-1.amazonaws.com/Chalo_Fresh_Co_2024_Valuelicious_d66d3c23d7.mp4",
    credits: {
      screenwriter: "Mark Thompson",
      director: "Rachel Kim",
      photography: "Steven Park",
      creativeDirector: "Jessica Wu",
      Actor: ["Vivian Hu", "Richard Will"],
    },
  },
  {
    id: 6,
    title: "Apple Product Launch",
    thumbnail: "/images/Layer3.png",
    videoUrl: "https://example.com/video6.mp4",
    credits: {
      screenwriter: "Daniel Lee",
      director: "Sophie Anderson",
      photography: "Peter Chang",
      creativeDirector: "Grace Wang",
      Actor: ["Vivian Hu", "Richard Will"],
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
      Actor: ["Vivian Hu", "Richard Will", "Mike Dickson"],
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
      Actor: ["Vivian Hu", "Richard Will", "Mike Dickson"],
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
      Actor: ["Vivian Hu", "Richard Will"],
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
      Actor: ["Vivian Hu", "Richard Will"],
    },
  },
]

const PROJECTS_PER_PAGE = 6

export default function LiveAction() {
  // 当前点击后弹窗显示的项目
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[0] | null>(null)
  const [visibleProjects, setVisibleProjects] = useState(PROJECTS_PER_PAGE)

  // 淡出淡入控制
  const [isFadingOut, setIsFadingOut] = useState(false)

  // 预览状态记录：key=项目id，value=是否在预览中
  const [previewStates, setPreviewStates] = useState<{ [id: number]: boolean }>({})

  // 开始预览：视频播放5秒后自动恢复到缩略图
  const startPreview = (id: number) => {
    setPreviewStates((prev) => ({ ...prev, [id]: true }))
    setTimeout(() => {
      setPreviewStates((prev) => ({ ...prev, [id]: false }))
    }, 10000)
  }

  // 停止预览
  const stopPreview = (id: number) => {
    setPreviewStates((prev) => ({ ...prev, [id]: false }))
  }

  // 点击缩略图的逻辑：
  // 如果当前没在预览，则开始预览；
  // 如果已经在预览，则打开弹窗。
  const handleThumbnailClick = (project: (typeof projects)[0]) => {
    const isPlaying = previewStates[project.id]
    if (!isPlaying) {
      startPreview(project.id)
    } else {
      // 第二次点击：打开弹窗
      setSelectedProject(project)
    }
  }

  const handleMouseEnter = (project: (typeof projects)[0]) => {
    // 桌面 hover 时自动预览
    startPreview(project.id)
  }

  const handleMouseLeave = (project: (typeof projects)[0]) => {
    stopPreview(project.id)
  }

  // 弹窗里上下切换项目
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

  return (
    <>
      {/* Projects Grid */}
      <section className="relative z-10 bg-black px-8 py-12">
      <div className="mb-8 flex justify-left">
  <div className="inline-flex flex-col items-center w-fit">

  <h2 className="my-8 px-4 md:text-[120px] text-2xl font-['AvenirNextBold'] text-yellow-400 text-center uppercase mb-[-20px]">
           Works
          </h2>
          <h2 className="absolute z-[-1] right-20 md:text-[200px] text-2xl font-['AvenirNextBold'] text-[#121212] text-center uppercase">
           Works
          </h2>
  </div>
</div>



        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 md:grid-cols-2">
          {projects.slice(0, visibleProjects).map((project) => {
            const isPreviewPlaying = previewStates[project.id] || false
            return (
              <div
                key={project.id}
                className="group relative cursor-pointer overflow-hidden"
                // 移动端第一次点击 => 开始预览，第二次点击 => 打开详情
                onClick={() => handleThumbnailClick(project)}
                // 桌面端悬停 => 自动预览
                onMouseEnter={() => handleMouseEnter(project)}
                onMouseLeave={() => handleMouseLeave(project)}
              >
             <div className="relative aspect-video overflow-hidden rounded-3xl group-hover:border-[3px] group-hover:border-yellow-400 ">
  {/* 缩略图始终作为背景显示 */}
  <Image
    src={project.thumbnail || "/placeholder.svg"}
    alt={project.title}
    width={600}
    height={338}
    className="object-cover transition-all duration-300"
  />
  {/* 视频层：绝对定位覆盖，带透明度过渡 */}
  {project.videoUrl && (
    <div
      className={`absolute inset-0 transition-opacity duration-300 ${
        isPreviewPlaying ? "opacity-100" : "opacity-0"
      }`}
    >
      <video
        src={project.videoUrl}
        muted
        autoPlay
        playsInline
        className="object-cover transition-transform duration-300 group-hover:scale-105"
      />
    </div>
  )}
</div>

                <div className="inset-0 bg-black/60 p-4 transition-opacity duration-300 group-hover:opacity-100">
                  <h3 className="text-l font-bold text-white">{project.title}</h3>
                </div>
              </div>
            )
          })}
        </div>

        {/* View More Button */}
        {visibleProjects < projects.length && (
          <div className="mt-3 flex justify-left">
            <Button variant="outline" className="border-[#ffffff] bg-transparent rounded-[30px] text-[20px] text-[#ffffff]" onClick={handleViewMore}>
              View More
              <svg
            className="w-6 h-6 animate-bounce ring-1 ring-gray-900/5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="#ffffff"
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
            </Button>
          </div>
        )}
      </section>

      {/* Project Viewer (弹窗) */}
      {selectedProject && (
        <section className="fixed inset-0 z-50 bg-black">
          {/* 左上角 BACK 按钮 */}
          <Button
            variant="ghost"
            size="lg"

            className="absolute left-0 top-0 z-10 p-8 text-black bg-yellow hover:text-black rounded-br-lg"
            onClick={() => setSelectedProject(null)}
          >
            <div className="flex flex-col items-center ">
              <X className="h-6 w-6" />
              <span className="text-lg mt-1 font-bold font-[AvenirNextMedium]">BACK</span>
            </div>
          </Button>

          {/* 视频淡入淡出 */}
          <div
            className={`transition-opacity duration-300 ${
              isFadingOut ? "opacity-0" : "opacity-100"
            }`}
          >
            <div className="absolute md:top-0 top-20 right-0 md:w-5/6 w-full">
              <VideoPlayer
                key={selectedProject.videoUrl}
                src={selectedProject.videoUrl}
                poster={selectedProject.thumbnail}
              />
                {/* 底部文字信息 */}
          <div className="relative bottom-0 left-0 bg-gradient-to-t from-black to-transparent md:p-0 p-8 text-left">
            <h2 className="text-3xl font-bold text-white">{selectedProject.title}</h2>
            <div className="mt-4 grid grid-cols-2 gap-8 text-lg text-white/70 md:grid-cols-3">
              <div>
                <p className="font-normal text-white">
                  <span className="font-bold">Screenwriter:</span>{" "}
                  {selectedProject.credits.screenwriter}
                </p>
                <p className="font-medium text-white">
                  Director: {selectedProject.credits.director}
                </p>
              </div>
              <div>
                <p className="font-medium text-white">
                  Photography: {selectedProject.credits.photography}
                </p>
                <p className="font-medium text-white">
                  Creative Director: {selectedProject.credits.creativeDirector}
                </p>
              </div>
              <div>
                <p className="font-medium text-white">
                  Actors: {selectedProject.credits.Actor?.join(", ")}
                </p>
              </div>
            </div>
          </div>

                 {/* 右下角 Prev / Next 按钮 */}
                 <div className="md:relative flex gap-4 fixed justify-evenly bottom-0 right-0 left-0">
            <Button
              onClick={handlePrevious}
              className="h-12 w-36 rounded-[10px] bg-yellow-500 text-black flex text-lg items-center justify-center gap-2 hover:bg-yellow-400 font-[AvenirNextMedium]"
            >
              <ChevronLeft className="h-3 w-3" />
              Previous
            </Button>
            <Button
              onClick={handleNext}
              className="h-12 w-36 rounded-[10px] bg-yellow-500 text-black flex text-lg items-center justify-center gap-2 hover:bg-yellow-400 font-[AvenirNextMedium]"
            >
              Next
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
            </div>
          </div>

        

   
        </section>
      )}
    </>
  )
}