"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProjectCard from "./ProjectCard";
import { projects } from "./projectData";

gsap.registerPlugin(ScrollTrigger);

export default function WorkSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gridRef.current) return;

    const cards = gridRef.current.children;

    gsap.fromTo(
      cards,
      { 
        y: 100, 
        opacity: 0,
        scale: 0.95
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%", // Animation starts when top of section hits 80% of viewport height
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);

  return (
    <section id="work" ref={sectionRef} className="relative w-full py-24 px-4 md:px-10 bg-black border-t border-white/10">
      
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-900/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Header */}
      <div className="mb-16 md:mb-24 relative z-10">
        <h2 className="text-4xl md:text-7xl font-bold tracking-tighter text-white mb-6">
          SELECTED <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-500 to-gray-800">WORKS</span>
        </h2>
        <div className="h-[1px] w-full bg-white/10" />
        <div className="flex justify-between mt-4 text-xs md:text-sm text-gray-300 font-mono uppercase tracking-widest">
            <span>Archive 2020-2025</span>
            <span>15 Deployments</span>
        </div>
      </div>

      {/* Asymmetrical Bento Grid */}
      <div 
        ref={gridRef}
        className="grid grid-cols-1 md:grid-cols-4 auto-rows-[minmax(250px,auto)] gap-4"
      >
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
      
    </section>
  );
}
