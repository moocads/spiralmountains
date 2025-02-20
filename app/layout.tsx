import Link from "next/link"
import Image from "next/image"
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'SMM',
  description: 'SMM Portfolio',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-black">
          {/* Navigation */}
          <nav className="fixed left-0 top-0 z-50 flex h-screen w-64 flex-col bg-white p-8">
            <div className="mb-16">
              <Link href="/">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/smm-logo-H3mW0CW6nG10s7ejbV5lt89oykizzN.png"
                  alt="SMM Logo"
                  width={80}
                  height={80}
                  className="h-auto w-auto"
                />
              </Link>
            </div>
            <NavLinks />
          </nav>

          {/* Main Content */}
          <main className="ml-64">{children}</main>

          {/* Hazard Stripes Border */}
          <div className="fixed inset-y-0 right-0 w-8 bg-[repeating-linear-gradient(45deg,#000000,#000000_10px,#FFD700_10px,#FFD700_20px)]" />
        </div>
      </body>
    </html>
  )
}

function NavLinks() {
  return (
    <div className="space-y-4">
      <Link
        href="/live-action"
        className="group flex items-center text-black/70 transition-colors hover:text-yellow-400"
      >
        <div className="mr-2 h-1 w-0 bg-yellow-400 transition-all group-hover:w-4" />
        Live Action
      </Link>
      <Link
        href="/motion-graphic"
        className="group flex items-center text-black/70 transition-colors hover:text-yellow-400"
      >
        <div className="mr-2 h-1 w-0 bg-yellow-400 transition-all group-hover:w-4" />
        Motion Graphic
      </Link>
      <Link
        href="/video-editing"
        className="group flex items-center text-black/70 transition-colors hover:text-yellow-400"
      >
        <div className="mr-2 h-1 w-0 bg-yellow-400 transition-all group-hover:w-4" />
        Video Editing
      </Link>
      <Link 
        href="/contact" 
        className="group flex items-center text-black/70 transition-colors hover:text-yellow-400"
      >
        <div className="mr-2 h-1 w-0 bg-yellow-400 transition-all group-hover:w-4" />
        Contact
      </Link>
    </div>
  )
}