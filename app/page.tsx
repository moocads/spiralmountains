"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Ensure video plays automatically
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.log("Video autoplay failed:", error);
      });
    }
  }, []);

  return (
    <main className="relative flex flex-col items-center h-screen overflow-hidden w-full">
      {/* Video Background */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-0 left-0 w-full h-full object-none z-0"
        style={{ filter: 'brightness(0.8)' }}
      >
        <source src="/videos/smm-home-bg-video.mp4" type="video/mp4" />
      </video>

       <div
    className="absolute top-0 left-0 w-full h-full pointer-events-none z-10"
    style={{
      backgroundImage: "url('/images/noise.png')", // 噪音图，最好是一个平铺的小图案
      backgroundRepeat: 'repeat',
      opacity: 0.15, // 根据需要调节强度
      mixBlendMode: 'overlay' // 试试其他混合模式如 "multiply" 看效果
    }}
  ></div>

<div className="md:hidden  p-[0px] fixed bottom-0 w-full left-0 grid grid-cols-3 gap-0 text-center rounded-t-[30px]">

<div className="bg-yellow border border-black p-3 py-6 text-[18px] rounded-tl-[15px]"> <Link href="/live-action">Live Action</Link></div>
  <div className="bg-yellow border border-black p-3 py-6 text-[16px]"> <Link href="/motion-graphic">Motion Graphic</Link></div>
        <div className="bg-yellow border border-black vertical-middle p-3 py-6 text-[18px] rounded-tr-[15px]">
        <Link href="/about">About</Link></div>

      </div>

  {/* Content overlay */}
  <div className="relative z-20 h-full flex flex-col items-center justify-center">
    {/* 这里放你的页面内容 */}
  </div>
  
    </main>
  );
}

