"use client"

import Link from "next/link"
import Image from "next/image"
import NavLinks from "@/app/components/NavLinks" // 你自己的链接组件

export default function NavBarDesktop() {
  return (
    <nav className="hidden md:flex md:flex-col fixed left-0 top-0 bottom-0 w-64 bg-white p-8 z-50">
      {/* Logo */}
      <Link href="/">
        <Image
          src="/images/smm-logo.png"
          alt="SMM Logo"
          width={80}
          height={80}
          className="h-auto w-[100px] md:w-[160px]"
        />
      </Link>

      {/* 导航链接 */}
      <div className="mt-20">
        <NavLinks />
      </div>
    </nav>
  )
}
