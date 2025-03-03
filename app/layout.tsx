// app/layout.tsx
import type { Metadata } from "next"
import "./globals.css"
import NavBarDesktop from "@/app/components/NavBarDesktop"
import NavBarMobile from "@/app/components/NavBarMobile"

export const metadata: Metadata = {
  title: "SMM",
  description: "SMM Portfolio",
  icons:{
    icon: '/favicon.ico'
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-black min-h-screen">
        {/* 移动端顶部导航 */}
        <div className="md:hidden">
          <NavBarMobile />
        </div>

        {/* 桌面端左侧固定导航 */}
        <NavBarDesktop />

        {/* 主体内容区：如果左侧是 64px 宽，可留出对应的 margin/padding */}
        <main className="relative ml-64 p-4">
          {children}
        </main>

        {/* 右侧斜纹条：仅在 lg 屏幕显示 */}
        <div className="hidden lg:block fixed inset-y-0 z-10 right-0 w-4 bg-[repeating-linear-gradient(45deg,#000000,#000000_10px,#FFD700_10px,#FFD700_20px)]" />
      </body>
    </html>
  )
}
