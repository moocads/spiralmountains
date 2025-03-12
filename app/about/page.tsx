"use client";

import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

// Add this interface for type safety
interface TeamMember {
  id: number;
  Name: string;
  Position: string;
  Photo_01: {
    url: string;
  };
  Photo_02: {  // Add second photo
    url: string;
  };
}

interface ClientData {
  id: number;
  name: string;
  logo: string;
}

export default function About() {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [client, setClient] = useState<ClientData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [teamRes, clientRes] = await Promise.all([
          fetch('https://smm-cms-bc62f0c8a130.herokuapp.com/api/smm-teams-plural?populate=*'),
          fetch('https://smm-cms-bc62f0c8a130.herokuapp.com/api/smm-clients-plural?populate=*')
        ]);

        if (!teamRes.ok || !clientRes.ok) {
          throw new Error('Failed to fetch data');
        }

        const teamResponse = await teamRes.json();
        const clientResponse = await clientRes.json();

        // Access the data property from the API response
        setTeam(teamResponse.data || []);
        setClient(clientResponse.data || []);
      } catch (error) {
        console.error('Error fetching data:', error);
        // Initialize with empty arrays on error
        setTeam([]);
        setClient([]);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    // 监听窗口大小变化（可选）
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  // 这里我们只需要 4 个 section，就直接手动写 4 个 ref 即可
  const sectionRefs = useRef<HTMLDivElement[]>([]);
  // 当前所在 section 的索引
  const [currentSection, setCurrentSection] = useState(0);
  // 防止滚动过快的标识
  const [scrolling, setScrolling] = useState(false);

  // 滚动到指定的 section（平滑滚动）
  const scrollToSection = (index: number) => {
    sectionRefs.current[index]?.scrollIntoView({ behavior: "smooth" });
  };

  // 向下滚动
  const handleNext = () => {
    if (currentSection < 3) {
      const next = currentSection + 1;
      scrollToSection(next);
      setCurrentSection(next);
    }
  };

  // 向上滚动
  const handlePrev = () => {
    if (currentSection > 0) {
      const prev = currentSection - 1;
      scrollToSection(prev);
      setCurrentSection(prev);
    }
  };

  // 监听鼠标滚轮事件，做简单的防抖处理
  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (scrolling) return;
    setScrolling(true);
    setTimeout(() => setScrolling(false), 800); // 0.8 秒防抖

    if (e.deltaY > 0) {
      handleNext();
    } else if (e.deltaY < 0) {
      handlePrev();
    }
  };

  // Add state to track hover state for each team member
  const [hoveredMember, setHoveredMember] = useState<number | null>(null);

  // Add these animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        bounce: 0.3
      }
    }
  };

  return (
    <div onWheel={handleWheel}>
      {loading ? (
        <div className="h-screen flex items-center justify-center">
          <p>Loading...</p>
        </div>
      ) : (
        <>
          {/* Section 1 */}
          <motion.div
            ref={(el) => (sectionRefs.current[0] = el)}
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="h-screen flex flex-col items-center justify-center"
          >
            <motion.div variants={itemVariants} className="md:mb-12 md:max-w-[60vw] w-full p-2">
              <h2 className="my-2 px-4 md:text-8xl text-6xl font-['AvenirNextBold'] text-yellow-400 text-center uppercase">
                About Us
              </h2>
            </motion.div>
            <motion.div variants={itemVariants} className="relative text-white md:max-w-[60vw] w-full p-2 mb-[80px] text-center">
              <p>
                Spiral Mountains Media is a video production and digital video marketing agency. We have a professional in-house production and marketing team. So, we can produce the right contents to fit your brand image and know how to stand out your brand.
              </p>
              <br />
              <p>
                We offer video marketing services for your brand starting or moving up. We help to build your audience by targeting media platforms or finding the right spots to promote your business. We do the analysis for your marketing campaigns and make your next placement more accurate.
              </p>
            </motion.div>
          </motion.div>

          {/* Section 2 */}
          <div
            ref={(el) => (sectionRefs.current[1] = el)}
            className="h-screen flex flex-col items-center justify-center p-2"
          >
            <div className="flex-col items-center w-fit">
              <div className="h-3 w-full bg-[repeating-linear-gradient(45deg,white_0_5px,black_5px_12px)]" />
              <h2 className="my-2 px-4 md:text-4xl text-2xl font-bold text-yellow-400 whitespace-nowrap text-center uppercase">
                Clients We Have Served
              </h2>
              <div className="h-3 w-full bg-[repeating-linear-gradient(45deg,white_0_5px,black_5px_12px)]" />
            </div>
            <div className="relative text-white bg-white/70 block mt-12 md:w-[60vw] w-full rounded-lg">
              <div className="grid md:grid-cols-4 grid-cols-3 gap-0 justify-items-center">
                {client.map((client) => (
                  <div
                    key={client.id}
                    className="border-x border-y border-white/10 rounded-lg transition delay-50 duration-500 hover:bg-[#d4b435]"
                  >
                    <Image
                      src={client.Logo.url || "/placeholder.svg"}
                      alt={client.ClientName || 'Spiral Mountain Media'}
                      width={600}
                      height={338}
                      className="mix-blend-difference transition delay-50 duration-500 hover:mix-blend-normal"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Section 3 */}
          <motion.div
            ref={(el) => (sectionRefs.current[2] = el)}
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="h-screen flex items-center justify-center"
          >
            <motion.section
              variants={containerVariants}
              className="snap-start h-screen flex flex-col justify-center items-center"
            >
              <div className="mb-12 flex justify-center">
                <div className="inline-flex flex-col items-center w-fit">
                  <div className="h-3 w-full bg-[repeating-linear-gradient(45deg,white_0_5px,black_5px_12px)]" />
                  <h2 className="my-2 px-4 md:text-4xl text-2xl font-bold text-yellow-400 whitespace-nowrap text-center uppercase">
                    Our Team
                  </h2>
                  <div className="h-3 w-full bg-[repeating-linear-gradient(45deg,white_0_5px,black_5px_12px)]" />
                </div>
              </div>
              <div className="relative text-white block md:w-[60vw] w-full mb-[80px] p-2 rounded-lg">
                <div className="grid md:grid-cols-4 grid-cols-2 gap-4 justify-items-center">
                  {team.map((teamMember) => (
                    <div 
                      key={teamMember.id} 
                      className="relative rounded-lg group "
                      onMouseEnter={() => setHoveredMember(teamMember.id)}
                      onMouseLeave={() => setHoveredMember(null)}
                    >
                      <Image
                        src={hoveredMember === teamMember.id && teamMember.Photo_02?.url 
                          ? teamMember.Photo_02.url 
                          : teamMember.Photo_01?.url || "/placeholder.svg"}
                        alt={teamMember.Name || 'Team Member'}
                        width={600}
                        height={338}
                        className="rounded-lg transition-all transform border-yellow-400 group-hover:scale-105 group-hover:border-yellow-400"
                      />
                      <div
                        className="absolute bottom-0 rounded-lg mix-blend-multiply transition-all p-[15px] group-hover:scale-105 hover:border-yellow-400 "
                        style={{
                          background: "linear-gradient(202deg, #FFF 27.95%, #A0A0A0 53.47%, #353535 88.48%)",
                          width: "100%",
                          height: "100%",
                        }}
                      ></div>
                      <div className="absolute bottom-[20px] mx-auto w-fit text-center left-0 right-0">
                        <p className="font-[AvenirNextMedium]">{teamMember.Position || ' '}</p>
                        <p>{teamMember.Name || ' '}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.section>
          </motion.div>

          {/* Section 4 */}
          <motion.div
            ref={(el) => (sectionRefs.current[3] = el)}
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="h-screen flex flex-col items-center justify-center"
          >
            <div className="mb-6 flex justify-center">
              <div className="inline-flex flex-col items-center w-fit">
                <div className="h-3 w-full bg-[repeating-linear-gradient(45deg,white_0_5px,black_5px_12px)]" />
                <h2 className="my-2 px-4 md:text-4xl text-2xl font-bold text-yellow-400 whitespace-nowrap text-center uppercase">
                  WE'RE GREAT LISTENERS,<br />SO WHY NOT HAVE A CHAT?
                </h2>
                <div className="h-3 w-full bg-[repeating-linear-gradient(45deg,white_0_5px,black_5px_12px)]" />
              </div>
            </div>
            <p className="relative text-white block  w-[60vw] mb-[20px] text-center">
              Let's get introduced on a quick call to learn about your team's marketing objectives and how we can help!
            </p>
          
              <div className="md:w-[60vw] w-full p-2">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2878.079684189491!2d-79.3302568!3d43.8334457!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89d4d498250c3baf%3A0xbfea9faa70542c8c!2sSPIRAL%20MOUNTAINS%20MEDIA!5e0!3m2!1sen!2sca!4v1740121218244!5m2!1sen!2sca"
                  width="100%"
                  height="450"
                  loading="lazy"
                  className="rounded-[30px]"
                ></iframe>
              </div>
              {/* <div className="inline-flex flex flex justify-center p-4 text-white">
                <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
                <p className="mb-2">Address: 532 Hood Rd, Markham, ON L3R 3K9</p>
                <p className="mb-2">Phone: +1-647-886-7225</p>
                <p className="mb-2">Email: info@example.com</p>
              </div> */}
          
          </motion.div>

          {/* 固定在右下角的按钮，点击后滚动到下一个 Section */}
   
          <button onClick={handleNext} className="cursor-pointer fixed bottom-10 right-10 focus:outline-none mt-4">
              <svg
                className="w-6 h-6 text-yellow-400 animate-bounce ring-1 ring-gray-900/5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="#facc15"
              >
                <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
              </svg>
            </button>
            <div className="md:hidden bg-yellow p-[0px] fixed bottom-0 w-full left-0 grid grid-cols-2 gap-0 text-center rounded-t-[30px]">
        <div className="bg-yellow border border-black vertical-middle p-6 text-[18px] rounded-tl-[15px]">
          <a href="mailto:contact@spiralmountains.media">Contact</a></div>
        <div className="bg-yellow border border-black p-6 text-[18px] rounded-tr-[15px]"> <Link href="/works">Works</Link></div>
      </div>
        </>
      )}
    </div>
  );
}
