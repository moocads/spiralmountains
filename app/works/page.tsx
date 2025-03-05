"use client"

import Image from "next/image"
import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, X } from "lucide-react"

import { Button } from "@/app/components/ui/button"
import { VideoPlayer } from "@/app/components/video-player"

interface Project {
  id: number;
  documentId: string;
  ProjectName: string;
  Display: boolean;
  description: string | null;
  FeatureImage: {
    url: string;
  };
  Video: {
    url: string;
  };
}


export default function Works() {
  const PROJECTS_PER_PAGE = 6; 
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

  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await fetch('https://smm-cms-bc62f0c8a130.herokuapp.com/api/smm-works-plural?populate=*');
        if (!response.ok) {
          throw new Error('Failed to fetch projects');
        }
        const data = await response.json();
        setProjects(data.data || []);
      } catch (error) {
        console.error('Error fetching projects:', error);
        setProjects([]);
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

  return (
    <>
      {/* Projects Grid */}
      <section className="relative z-10 bg-black px-8 py-12 ">
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
    src={project.FeatureImage?.url || "/placeholder.svg"}
    alt={project.ProjectName}
    width={600}
    height={338}
    className="object-cover transition-all duration-300"
  />
  {/* 视频层：绝对定位覆盖，带透明度过渡 */}
  {project.Video?.url && (
    <div
      className={`absolute inset-0 transition-opacity duration-300 ${
        isPreviewPlaying ? "opacity-100" : "opacity-0"
      }`}
    >
      <video
        src={project.Video.url}
        muted
        autoPlay
        playsInline
        className="object-cover transition-transform duration-300 group-hover:scale-105"
      />
    </div>
  )}
</div>

                <div className="inset-0 bg-black/60 p-4 transition-opacity duration-300 group-hover:opacity-100">
                  <h3 className="text-l font-bold text-white">{project.ProjectName}</h3>
                </div>
              </div>
            )
          })}
        </div>

        {/* View More Button */}
        {visibleProjects < projects.length && (
          <div className="mt-3 flex justify-left">
            <Button  className="bg-[url(/images/view-more-btn.png)] bg-no-repeat bg-contain w-[150px]" onClick={handleViewMore}>
              {/* View More
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
          </svg> */}
          {/* <img src="/images/view-more-btn.png" width={150} /> */}
            </Button>
          </div>
        )}
      </section>

      {/* Project Viewer (弹窗) */}
      {selectedProject && (
        <section className="fixed inset-0 z-20 bg-black">
          {/* 左上角 BACK 按钮 */}
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

          {/* 视频淡入淡出 */}
          <div
            className={`transition-opacity duration-300 ${
              isFadingOut ? "opacity-0" : "opacity-100"
            }`}
          >
            <div className="absolute md:top-0 md:top-40 top-60 right-0 md:w-5/6 w-full">
              <VideoPlayer
                key={selectedProject.Video?.url}
                src={selectedProject.Video?.url}
                poster={selectedProject.FeatureImage?.url}
              />
                {/* 底部文字信息 */}
          <div className="relative bottom-0 left-0 bg-gradient-to-t from-black to-transparent md:p-0 p-8 text-left">
            <h2 className="text-3xl font-bold pt-4 text-white">{selectedProject.ProjectName}</h2>
            <div className="mt-4 grid grid-cols-2 gap-8 text-lg text-white/70 md:grid-cols-3">
              <div>
                <p className="font-normal text-white">
                  {selectedProject.description || " "}
                </p>
              </div>
            </div>
          </div>

                 {/* 右下角 Prev / Next 按钮 */}
                 <div className="md:relative mt-[20px] flex gap-4 fixed bottom-[10px] right-0 left-0">
            <Button
              onClick={handlePrevious}
              className="bg-[url(/images/prev.png)] bg-no-repeat md:bg-contain  bg-cover h-[82px] md:w-[100px] flex-1"
            >
              {/* <ChevronLeft className="h-3 w-3" />
              Previous */}
            </Button>
            <Button
              onClick={handleNext}
              className="bg-[url(/images/next.png)] bg-no-repeat md:bg-contain bg-cover h-[82px] md:w-[100px] flex-1"
            >
              {/* Next
              <ChevronRight className="h-5 w-5" /> */}
            </Button>
          </div>
            </div>
          </div>

        

   
        </section>
      )}
    </>
  )
}