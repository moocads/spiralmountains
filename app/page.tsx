import Image from "next/image"

export default function Home() {
  return (
    <div className="relative h-screen">
      <Image
        src="/images/smm-home-bg.jpg"
        alt="Behind the scenes"
        fill
        className="object-cover opacity-50"
      />
    </div>
  )
}

