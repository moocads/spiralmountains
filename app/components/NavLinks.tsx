"use client" // 声明这是一个客户端组件

import Link from "next/link"
import { usePathname } from "next/navigation"

export default function NavLinks() {
  const pathname = usePathname()
  const isLiveAction = pathname.startsWith("/works")
  return (
    <div className="space-y-4 text-xl md:text-[20px] font-bold uppercase">
      {/* Live Action / Works */}
      <Link
  href="/works"
  className={`group flex items-center text-[40px] font-['AvenirNextBold'] transition-all delay-150 duration-300 ease-in-out hover:text-yellow-400 pt-[15px] ${
    pathname === "/works" ? "text-yellow-400 text-[50px] font-['AvenirNextBold']" : "text-[#979797] hover:text-yellow-40 hover:text-[50px] hover:font-['AvenirNextBold']"
  }`}
>
  {/* 用三角形替换短线 */}
  {/* <svg
    viewBox="0 0 30 36"
    fill="currentColor"
    // 默认隐藏，hover 或 active 时显示
    className={`
      mr-4 h-[30px] w-[16px] transition-all
      ${pathname === "/live-action" ? "text-yellow-400" : "opacity-0 group-hover:opacity-100 text-yellow-400"}
    `}
  >
   <path d="M25.5 13.4019C27.5 14.5566 27.5 17.4434 25.5 18.5981L4.5 30.7224C2.5 31.8771 -1.50515e-06 30.4338 -1.4042e-06 28.1244L-3.44255e-07 3.87564C-2.43308e-07 1.56624 2.5 0.122865 4.5 1.27757L25.5 13.4019Z" fill="#FCC800"/>
  </svg> */}
  Works
</Link>


      {/* Contact */}
      <Link
  href="/about"
  className={`group flex items-center text-[40px] font-['AvenirNextBold'] transition-all delay-150 duration-300 ease-in-out hover:text-yellow-400 pt-[15px] ${
    pathname === "/about" ? "text-yellow-400 text-[50px] font-['AvenirNextBold']" : "text-[#979797] hover:text-yellow-40 hover:text-[50px] hover:font-['AvenirNextBold']"
  }`}
>
  {/* <svg
    viewBox="0 0 30 36"
    fill="currentColor"
    // 默认隐藏，hover 或 active 时显示
    className={`
      mr-4 h-[30px] w-[16px] transition-all
      ${pathname === "/contact" ? "text-yellow-400" : "opacity-0 group-hover:opacity-100 text-yellow-400"}
    `}
  >
   <path d="M25.5 13.4019C27.5 14.5566 27.5 17.4434 25.5 18.5981L4.5 30.7224C2.5 31.8771 -1.50515e-06 30.4338 -1.4042e-06 28.1244L-3.44255e-07 3.87564C-2.43308e-07 1.56624 2.5 0.122865 4.5 1.27757L25.5 13.4019Z" fill="#FCC800"/>
  </svg> */}
  About
</Link>


    </div>
  )
}
