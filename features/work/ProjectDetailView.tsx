"use client";

import { useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { projects } from "@/features/work/projectData";
import { notFound, useRouter } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ProjectDetailView({ id }: { id: string }) {
  const router = useRouter();
  const project = projects.find((p) => p.id === Number(id));
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);

  const countryFlags: Record<string, string> = {
    "Japan": "🇯🇵",
    "Indonesia": "🇮🇩",
    "Singapore": "🇸🇬",
    "Vietnam": "🇻🇳",
    "Malaysia": "🇲🇾"
  };

  const playExitAnimation = useCallback(() => {
    const ctx = gsap.context(() => {
        const tl = gsap.timeline({
            onComplete: () => {
                router.back();
            }
        });

        tl.to(".transition-curtain", {
            yPercent: 0,
            duration: 0.6,
            ease: "power4.inOut"
        });
    }, containerRef);
  }, [router]);

  useEffect(() => {
    if (!project) return;
    
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      
      tl.to(".transition-curtain", {
        yPercent: -100,
        duration: 0.8,
        ease: "power4.inOut"
      })
      .fromTo(".hero-image", 
        { scale: 1.2, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.5, ease: "power4.out" },
        "-=0.4"
      )
      .fromTo(".hero-title", 
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power4.out" },
        "-=1"
      )
      .fromTo(".meta-item", 
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: "power2.out" },
        "-=0.5"
      );

      gsap.from(".narrative-section", {
        scrollTrigger: {
          trigger: ".narrative-section",
          start: "top 80%",
        },
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.3,
        ease: "power3.out"
      });

      gsap.from(".gallery-item", {
        scrollTrigger: {
          trigger: ".gallery-grid",
          start: "top 80%",
        },
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out"
      });
    }, containerRef);

    return () => ctx.revert();
  }, [project]);

  if (!project) return notFound();

  return (
    <div ref={containerRef} className="bg-black min-h-screen text-white overflow-x-hidden">
      <div className="transition-curtain fixed inset-0 z-[100] bg-accent" />

      {/* 1. HERO SECTION (THE HOOK) */}
      <section ref={heroRef} className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <div className="hero-image absolute inset-0 z-0">
          <Image
            src={project.image}
            alt={project.title}
            fill
            priority
            className="object-cover opacity-40 blur-[2px] scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black" />
        </div>

        <div className="relative z-10 text-center px-4">
          <button 
            onClick={playExitAnimation}
            className="mb-12 group relative px-8 py-3 overflow-hidden border border-white/10 rounded-full hover:border-accent transition-all duration-500"
          >
            <span className="relative z-10 flex items-center gap-3 text-[10px] font-mono uppercase tracking-[0.3em] text-gray-400 group-hover:text-accent">
              <span className="group-hover:-translate-x-1 transition-transform">←</span> Back to Dashboard
            </span>
          </button>
          
          <h1 className="hero-title text-[14vw] md:text-[12vw] font-black leading-[0.75] tracking-tighter uppercase italic drop-shadow-2xl">
            {project.title.split(' ').map((word, i) => (
              <span key={i} className={i % 2 === 0 ? "text-white block" : "text-transparent stroke-text block"}>
                {word}
              </span>
            ))}
          </h1>
          
          {project.liveUrl && (
             <div className="mt-12">
                 <a 
                    href={project.liveUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-8 py-3 bg-white text-black font-mono text-xs uppercase tracking-widest hover:bg-accent transition-colors"
                 >
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    Visit Live Site ↗
                 </a>
             </div>
          )}
        </div>
      </section>

      {/* 2. CONTEXT GRID (HUD STYLE) */}
      <div ref={metaRef} className="sticky top-0 z-50 bg-black/90 backdrop-blur-2xl border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            <div className="meta-item border-l border-accent/30 pl-4">
              <span className="block text-[9px] font-mono text-gray-500 uppercase tracking-[0.4em] mb-2">Location</span>
              <span className="text-sm font-bold tracking-tight flex items-center gap-2">
                {countryFlags[project.country] || "🌐"} {project.country}
              </span>
            </div>
            <div className="meta-item border-l border-white/10 pl-4">
              <span className="block text-[9px] font-mono text-gray-500 uppercase tracking-[0.4em] mb-2">Service</span>
              <span className="text-sm font-bold tracking-tight">{project.category}</span>
            </div>
            <div className="meta-item border-l border-white/10 pl-4">
              <span className="block text-[9px] font-mono text-gray-500 uppercase tracking-[0.4em] mb-2">Tech Stack</span>
              <div className="flex flex-wrap gap-2 mt-1">
                {project.techStack.slice(0, 2).map((tech) => (
                  <span key={tech} className="text-[8px] bg-white/5 border border-white/10 px-2 py-0.5 rounded-sm uppercase font-mono">
                    {tech}
                  </span>
                ))}
                {project.techStack.length > 2 && (
                    <span className="text-[8px] text-gray-500 px-1 py-0.5 font-mono">
                        +{project.techStack.length - 2} more
                    </span>
                )}
              </div>
            </div>
            <div className="meta-item border-l border-white/10 pl-4">
              <span className="block text-[9px] font-mono text-gray-500 uppercase tracking-[0.4em] mb-2">Status</span>
              <span className="text-sm font-bold tracking-tight flex items-center gap-2">
                <span className={`w-1.5 h-1.5 rounded-full ${project.status === 'LIVE' ? 'bg-green-500 animate-pulse' : 'bg-blue-500'}`} />
                {project.status}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. THE NARRATIVE */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-32 md:py-48">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-20 items-start">
          <div className="narrative-section md:col-span-5">
            <h2 className="text-[10px] font-mono text-accent uppercase tracking-[0.6em] mb-10 flex items-center gap-6">
              <span className="h-[1px] w-16 bg-accent"></span> The Challenge
            </h2>
            <p className="text-3xl md:text-4xl font-light leading-tight tracking-tight text-white italic">
              &quot;{project.challenges}&quot;
            </p>
          </div>
          <div className="narrative-section md:col-span-7">
            <h2 className="text-[10px] font-mono text-gray-500 uppercase tracking-[0.6em] mb-10 flex items-center gap-6">
              <span className="h-[1px] w-16 bg-gray-700"></span> The Results
            </h2>
            <div className="space-y-8 text-xl text-gray-400 font-light leading-relaxed">
              <p className="text-white border-l-2 border-accent/20 pl-8 py-2">
                {project.longDescription}
              </p>
              <p>{project.results}</p>
              
              {/* Full Tech Stack List */}
              <div className="pt-8">
                  <h3 className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-4">Complete Tech Stack</h3>
                  <div className="flex flex-wrap gap-3">
                      {project.techStack.map(tech => (
                          <span key={tech} className="px-3 py-1 border border-white/10 rounded-full text-xs text-gray-300 hover:border-accent hover:text-accent transition-colors cursor-default">
                              {tech}
                          </span>
                      ))}
                  </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. THE VISUAL FEAST (PREMIUM GALLERY) */}
      <section className="gallery-grid max-w-[1400px] mx-auto px-6 pb-48">
        <div className="space-y-32">
          {project.screenshotUrls.map((img, index) => (
            <div 
              key={index} 
              className={`gallery-item relative group ${index % 2 === 0 ? 'md:pr-24' : 'md:pl-24'}`}
            >
              {/* Premium Browser Mockup Wrapper */}
              <div className="relative overflow-hidden rounded-2xl md:rounded-[2rem] border border-white/10 bg-[#0A0A0A] shadow-2xl backdrop-blur-sm">
                
                {/* Browser Traffic Lights */}
                <div className="h-8 md:h-10 border-b border-white/5 bg-white/[0.02] flex items-center px-6 gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
                    
                    {/* Fake URL Bar (Subtle) */}
                    <div className="ml-4 h-4 md:h-5 w-32 md:w-64 bg-white/5 rounded-full" />
                </div>

                <div className="relative overflow-hidden">
                    <Image
                        src={img}
                        alt={`${project.title} visualization ${index + 1}`}
                        width={1920}
                        height={1080}
                        className="w-full h-auto object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-[1.02]"
                    />
                    
                    {/* HUD Label for Screenshots */}
                    <div className="absolute bottom-6 right-6 flex flex-col items-end gap-2">
                        <span className="text-[8px] font-mono bg-black/90 px-3 py-1 border border-accent/30 text-accent uppercase tracking-widest backdrop-blur-md">
                            {index === 2 ? "System Architecture" : "Interface Reveal"}
                        </span>
                    </div>
                </div>
              </div>
              
              {/* Decorative Glow */}
              <div className="absolute -inset-4 -z-10 bg-accent/5 blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            </div>
          ))}
        </div>
      </section>

      {/* 5. CTA */}
      <section className="py-48 bg-white text-black text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none bg-[url('/noise.png')] animate-grain" />
        <h2 className="text-[10px] font-mono uppercase tracking-[1.5em] mb-12 text-gray-400">Next Phase</h2>
        <p className="text-5xl md:text-8xl font-black uppercase tracking-tighter mb-16 leading-[0.85]">
          Let&apos;s build <br /> your vision.
        </p>
        <button className="group relative px-16 py-6 bg-black text-white rounded-none overflow-hidden transition-transform active:scale-95">
          <span className="relative z-10 font-bold uppercase tracking-[0.5em] text-xs">Initiate Project</span>
          <div className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-expo" />
        </button>
      </section>

      <style jsx global>{`
        .stroke-text {
          -webkit-text-stroke: 1.5px rgba(255,255,255,0.25);
        }
        .ease-expo {
            transition-timing-function: cubic-bezier(0.19, 1, 0.22, 1);
        }
      `}</style>
    </div>
  );
}
