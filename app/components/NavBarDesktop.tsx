"use client"

import Link from "next/link"
import Image from "next/image"
import NavLinks from "@/app/components/NavLinks" // 你自己的链接组件

export default function NavBarDesktop() {
  return (
    <nav className="hidden md:flex md:flex-col fixed left-0 top-0 bottom-0 w-[250px] bg-black p-8 border-r border-r-[#414141] z-50">
      {/* Logo */}
      <Link href="/">
        <Image
          src="/images/white-logo.png"
          alt="SMM Logo"
          width={80}
          height={80}
          className="h-auto w-[100px] md:w-[160px]"
        />
      </Link>

      {/* 导航链接 */}
      <div className="mt-[100%] h-[100vh] align-middle">
        <NavLinks />
      </div>

      <div className="absolute border p-[15px] bottom-20 left-0 border-[#414141] w-full">
        <ul className="text-[14px] text-[#8f8f8f]">
          <li>Address: Unit 11, 2800 john st Markham</li>
<li>Phone: +1-647-886-7225</li>
<li>Email: contact@spiralmountains.media</li>
        </ul>
      </div>
    </nav>
  )
}
