"use client"

import * as React from "react"
import { Pause, Play } from "lucide-react"

import { Button } from "@/app/components/ui/button"
import { Slider } from "@/app/components/ui/slider"

interface VideoPlayerProps {
  src: string
  poster?: string
}

export function VideoPlayer({ src, poster }: VideoPlayerProps) {
  const videoRef = React.useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = React.useState(false)
  const [progress, setProgress] = React.useState(0)
  const [duration, setDuration] = React.useState(0)

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const progress = (videoRef.current.currentTime / videoRef.current.duration) * 100
      setProgress(progress)
    }
  }

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration)
    }
  }

  const handleProgressChange = (value: number[]) => {
    if (videoRef.current) {
      const newTime = (value[0] / 100) * videoRef.current.duration
      videoRef.current.currentTime = newTime
      setProgress(value[0])
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  return (
    <div className="group relative aspect-video bg-black" onClick={togglePlay}>
      <video
        ref={videoRef}
        className="h-full w-full"
        poster={poster}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setIsPlaying(false)}
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center">
          <button
            onClick={(e) => {
              e.stopPropagation() // 阻止点击按钮后触发外层 onClick
              togglePlay()
            }}
            className="flex items-center justify-center bg-black/50 p-4 rounded-full hover:bg-black/70"
          >
            <Play className="h-12 w-12 text-white" />
          </button>
        </div>
      )}

      {/* Video Controls */}
      <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="space-y-3 p-4">
          {/* Progress Bar */}
          <Slider
            value={[progress]}
            onValueChange={handleProgressChange}
            max={100}
            step={0.1}
            className="cursor-pointer"
          />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {/* Play/Pause Button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={togglePlay}
                className="h-8 w-8 rounded-full bg-white/10 text-white hover:bg-white/20"
              >
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </Button>

              {/* Time Display */}
              <div className="text-sm text-white">
                {formatTime(videoRef.current?.currentTime || 0)} / {formatTime(duration)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

