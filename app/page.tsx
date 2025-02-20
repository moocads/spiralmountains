import Image from "next/image"

export default function Home() {
  return (
    <div className="relative h-screen">
      <Image
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/home-bg%201-5ORiMLbrFIpeZdO4JSwQpJx5YBDhjo.png"
        alt="Behind the scenes"
        fill
        className="object-cover opacity-50"
      />
    </div>
  )
}

