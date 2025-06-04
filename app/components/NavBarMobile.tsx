"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { X } from "lucide-react"

export default function NavBarMobile() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="bg-black fixed w-full border-b border-gray-200 p-4 md:hidden rounded-b-[20px] border-b-[5px] z-10">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <Image
            src="/images/white-logo.png"
            alt="SMM Logo"
            width={80}
            height={80}
            className="h-auto w-[100px]"
          />
        </Link>

        {/* 菜单折叠按钮 */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="p-2 text-yellow-400 hover:border hover:border-yellow-400 rounded-md"
        >
          {menuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            // 三条横线图标
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="#facc15"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      {/* 这里不再用 {menuOpen && (...)} 条件渲染，而是用一个容器 + transition */}
      <div
        className={`
          overflow-hidden
          transition-all
          duration-300
          ${menuOpen ? "max-h-40" : "max-h-0"}
        `}
      >
        <div className="mt-2 space-y-2 ">
        <Link
            href="/live-action"
            onClick={() => setMenuOpen(false)} // 点击后收起
            className="block text-white hover:text-yellow-400"
          >
            Live Action
          </Link>
          <Link
            href="/motion-graphic"
            onClick={() => setMenuOpen(false)} // 点击后收起
            className="block text-white hover:text-yellow-400"
          >
            Motion Graphic
          </Link>

          <Link
            href="/about"
            onClick={() => setMenuOpen(false)}
            className="block text-white hover:text-yellow-400"
          >
            About
          </Link>
           <Link
            href="https://smmstudio.ca/"
            onClick={() => setMenuOpen(false)}
            className="block text-white relative hover:text-yellow-400"
          >
            Studio
            <span className="absolute text-[10px] text-black bg-[#FCC800] px-[2px] py-[2px] left-[10%] top-[-5px] leading-none shadow-[0px_0px_10px_3px_rgba(255,223,43,0.60)]" >NEW</span>
          </Link>
    
        </div>
      </div>

    </nav>
  )
}
