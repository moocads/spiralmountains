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
          className="p-2 text-gray-500 hover:bg-gray-100 rounded-md"
        >
          {menuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            // 三条横线图标
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
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
        <div className="mt-2 space-y-2">
          <Link
            href="/works"
            onClick={() => setMenuOpen(false)} // 点击后收起
            className="block text-white hover:text-yellow-400"
          >
            Works
          </Link>
          <Link
            href="/about"
            onClick={() => setMenuOpen(false)}
            className="block text-white hover:text-yellow-400"
          >
            About
          </Link>
        </div>
      </div>
      <div className="bg-yellow p-[0px] fixed bottom-0 w-full left-0 grid grid-cols-3 gap-0 text-center rounded-t-[30px]">
        <div className="bg-yellow border border-black vertical-middle p-6 text-[18px] rounded-tl-[15px]">
          <a href="mailto:contact@spiralmountains.media">Contact</a></div>
        <div className="bg-yellow border border-black p-6 text-[18px]">Works</div>
        <div className="bg-yellow border border-black p-6 text-[18px] rounded-tr-[15px]">About</div>
      </div>
    </nav>
  )
}
