// components/NavBar.tsx
"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { X } from "lucide-react"

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="bg-black border-b border-gray-200 p-4">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <Image
            src="/images/smm-logo.png"
            alt="SMM Logo"
            width={80}
            height={80}
            className="h-auto w-[100px] md:w-[200px]"
          />
        </Link>

        {/* 桌面菜单 */}
        <div className="hidden md:flex space-x-8">
          <Link
            href="/live-action"
            className="text-black transition-colors hover:text-yellow-400"
          >
            Works
          </Link>
          <Link
            href="/contact"
            className="text-black transition-colors hover:text-yellow-400"
          >
            Contact
          </Link>
        </div>

        {/* 移动端菜单切换按钮 */}
        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          className="inline-flex items-center p-2 text-gray-500 rounded-md md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          )}
        </button>
      </div>

      {/* 移动端菜单内容 */}
      {menuOpen && (
        <div className="mt-2 space-y-2 md:hidden">
          <Link
            href="/live-action"
            className="block text-black transition-colors hover:text-yellow-400"
            onClick={() => setMenuOpen(false)}
          >
            Works
          </Link>
          <Link
            href="/contact"
            className="block text-black transition-colors hover:text-yellow-400"
            onClick={() => setMenuOpen(false)}
          >
            Contact
          </Link>
        </div>
      )}
    </nav>
  )
}
