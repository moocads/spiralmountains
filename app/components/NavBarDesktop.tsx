"use client"

import Link from "next/link"
import Image from "next/image"
import NavLinks from "@/app/components/NavLinks" // 你自己的链接组件

export default function NavBarDesktop() {
  return (
    <nav className="hidden md:flex md:flex-col fixed left-0 top-0 bottom-0 w-[250px] bg-black p-8   z-50">
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
      <div className="mt-[50%] h-[100vh] align-middle">
        <NavLinks />
      </div>

      <div className="absolute  p-[15px] bottom-20 left-0  w-full">
        <ul className="text-[13px] text-[#8f8f8f]">
          <li><span className="text-yellow">Address</span> Unit 11, 2800 john st Markham</li>
<li><span className="text-yellow">Phone</span> +1-647-886-7225</li>
<li><span className="text-yellow">Email</span><a href="mailto:info@spiralmountains.media">info@spiralmountains.media</a> </li>
        </ul>
       
      </div>
      <div className="absolute text-[#8f8f8f] bottom-5 p-[15px] left-0 text-[10px] p-0"> © {new Date().getFullYear()} Spiral Mountain Media. All rights reserved.</div>
    </nav>
  )
}
