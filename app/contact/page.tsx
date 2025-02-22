"use client"

import Image from "next/image"
import { useState } from "react"
import { ChevronLeft, ChevronRight, X } from "lucide-react"

import { Button } from "@/app/components/ui/button"

const clients = [
  {
    id: 1,
    clientName: "Burt's bees",
    logo: "/images/clients/burtsbees.png",
  },
  {
    id: 2,
    clientName: "Audi",
    logo: "/images/clients/audi.png",
  },
  {
    id: 3,
    clientName: "Concord",
    logo: "/images/clients/concord.png",
  },
  {
    id: 4,
    clientName: "dodge",
    logo: "/images/clients/dodge.png",
  },
  {
    id: 5,
    clientName: "evergreen-collage",
    logo: "/images/clients/evergreen-collage.png",
  },
  {
    id: 6,
    clientName: "fullbright",
    logo: "/images/clients/fullbright.png",
  },
  {
    id: 7,
    clientName: "gotrain",
    logo: "/images/clients/gotrain.png",
  },
  {
    id: 8,
    clientName: "goubuli",
    logo: "/images/clients/goubuli.png",
  },
  {
    id: 9,
    clientName: "gyugyuya",
    logo: "/images/clients/gyugyuya.png",
  },
  {
    id: 10,
    clientName: "kingdom",
    logo: "/images/clients/kingdom.png",
  },
  {
    id: 11,
    clientName: "metrolinx",
    logo: "/images/clients/metrolinx.png",
  },
  {
    id: 12,
    clientName: "metrolinx",
    logo: "/images/clients/midea.png",
  },
  {
    id: 13,
    clientName: "remax",
    logo: "/images/clients/remax.png",
  },

  {
    id: 14,
    clientName: "sobeys",
    logo: "/images/clients/sobeys.png",
  },
  {
    id: 15,
    clientName: "metrolinx",
    logo: "/images/clients/uoft.png",
  }
]

const team =[
  {
    id:1,
    memberName:'',
    position:'',
    photoUrl:'/images/team/Smm_crew_photo-5789.jpg'
  },
  {
    id:2,
    memberName:'',
    position:'',
    photoUrl:'/images/team/Smm_crew_photo-5816.jpg'
  },
  {
    id:3,
    memberName:'',
    position:'',
    photoUrl:'/images/team/Smm_crew_photo-5842.jpg'
  }
]

export default function Contact() {
  return (
    <>
          {/* Projects Grid */}
          <section className="z-10 bg-black px-8 py-16">
          <div className="mb-12 flex justify-center">
      <div className="inline-flex flex-col items-center w-fit">
        {/* 上方斜纹 */}
        <div className="h-3 w-full bg-[repeating-linear-gradient(45deg,white_0_5px,black_5px_12px)]" />
        
        {/* 中间文字 */}
        <h2 className="my-2 px-4 md:text-4xl text-2xl font-bold text-yellow-400 whitespace-nowrap w-full text-center uppercase">
          About Us
        </h2>
        
        {/* 下方斜纹 */}
        <div className="h-3 w-full bg-[repeating-linear-gradient(45deg,white_0_5px,black_5px_12px)]" />
      </div>
    </div>
<div className="relative text-white block m-auto md:w-[60vw] w-full mb-[80px] text-center">
    <p>Spiral Mountains Media is a video production and digital video marketing agency. We have a professional in-house production and marketing team. So, we can produce the right contents to fit your brand image and know how to stand out your brand.</p>
    <br />
      <p>
    We offer video marketing services for your brand starting or moving up. We help to build your audience by targeting media platforms or finding the right spots to promote your business. We do the analysis for your marketing campaigns and make your next placement more accurate.</p>
    </div>

    <div className="mb-12 flex justify-center">
      <div className="inline-flex flex-col items-center w-fit">
        {/* 上方斜纹 */}
        <div className="h-3 w-full bg-[repeating-linear-gradient(45deg,white_0_5px,black_5px_12px)]" />
        
        {/* 中间文字 */}
        <h2 className="my-2 px-4 md:text-4xl text-2xl font-bold text-yellow-400 whitespace-nowrap w-full text-center uppercase">
        Clients We Have Served
        </h2>
        
        {/* 下方斜纹 */}
        <div className="h-3 w-full bg-[repeating-linear-gradient(45deg,white_0_5px,black_5px_12px)]" />
      </div>
    </div>
<div className="relative text-white bg-white/70 block m-auto md:w-[60vw] w-full mb-[80px] rounded-lg">

<div className="grid md:grid-cols-4 grid-cols-3 gap-0 justify-items-center">
  {clients.map((client) => (
    <div key={client.id} className="justify-items-center border-x border-y border-white/10 rounded-lg">
      <Image
        src={client.logo || "/placeholder.svg"}
        alt={client.clientName}
        width={600}
        height={338}
        className="group-hover:scale-105 justify-items-center mix-blend-difference opacity-50"
      />
    </div>
  ))}
</div>
    </div>


    <div className="mb-12 flex justify-center">
      <div className="inline-flex flex-col items-center w-fit">
        {/* 上方斜纹 */}
        <div className="h-3 w-full bg-[repeating-linear-gradient(45deg,white_0_5px,black_5px_12px)]" />
        
        {/* 中间文字 */}
        <h2 className="my-2 px-4 md:text-4xl text-2xl font-bold text-yellow-400 whitespace-nowrap w-full text-center uppercase">
        Our Team
        </h2>
        
        {/* 下方斜纹 */}
        <div className="h-3 w-full bg-[repeating-linear-gradient(45deg,white_0_5px,black_5px_12px)]" />
      </div>
    </div>
<div className="relative text-white block m-auto md:w-[60vw] w-full mb-[80px] rounded-lg">

<div className="grid md:grid-cols-3 grid-cols-2 gap-4 justify-items-center">
  {team.map((team) => (
    <div key={team.id} className="justify-items-center border-x border-y border-white/10 rounded-lg">
      <Image
        src={team.photoUrl || "/placeholder.svg"}
        alt={team.memberName}
        width={600}
        height={338}
        className="group-hover:scale-105 justify-items-center rounded-lg"
      />
    </div>
  ))}
</div>
    </div>

    <div className="mb-6 flex justify-center">
      <div className="inline-flex flex-col items-center w-fit">
        {/* 上方斜纹 */}
        <div className="h-3 w-full bg-[repeating-linear-gradient(45deg,white_0_5px,black_5px_12px)]" />
        
        {/* 中间文字 */}
        <h2 className="my-2 px-4 md:text-4xl text-2xl font-bold text-yellow-400 whitespace-nowrap w-full text-center">
        WE'RE GREAT LISTENERS,<br/>SO WHY NOT HAVE A CHAT?
        </h2>
        
        {/* 下方斜纹 */}
        <div className="h-3 w-full bg-[repeating-linear-gradient(45deg,white_0_5px,black_5px_12px)]" />
      </div>
    </div>
<p className="relative text-white block m-auto w-[60vw] mb-[20px] text-center">Let's get introduced on a quick call to learn about your team's marketing objectives and how we can help!</p>
<div className="grid grid-cols-3 gap-4">
  {/* Google Map 区域，占 2 列 */}
  <div className="md:col-span-2 col-span-4">
  <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2878.079684189491!2d-79.3302568!3d43.8334457!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89d4d498250c3baf%3A0xbfea9faa70542c8c!2sSPIRAL%20MOUNTAINS%20MEDIA!5e0!3m2!1sen!2sca!4v1740121218244!5m2!1sen!2sca" width="100%" height="450"  loading="lazy" className="rounded-[30px]"></iframe>
  </div>
  {/* Contact Us 信息区域，占 1 列 */}
  <div className="flex flex-col md:col-span-1 col-span-4 justify-center p-4 text-white">
    <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
    <p className="mb-2">Address: 532 Hood Rd, Markham, ON L3R 3K9</p>
    <p className="mb-2">Phone: +1-647-886-7225</p>
    <p className="mb-2">Email: info@example.com</p>
  </div>
</div>


    </section>
    </>
  )
}

