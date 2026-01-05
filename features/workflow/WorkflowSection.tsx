"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    id: "01",
    title: "DISCOVERY & STRATEGY",
    description: "Deep-dive analysis of business requirements, market constraints, and technical feasibility.",
    icon: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",
  },
  {
    id: "02",
    title: "ARCHITECTURE DESIGN",
    description: "Blueprint creation. Selecting the optimal tech stack (Next.js, AWS, K8s) for scalability.",
    icon: "M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z",
  },
  {
    id: "03",
    title: "INTERNATIONAL DEV",
    description: "Agile development sprints with a focus on i18n, performance optimization, and clean code.",
    icon: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4",
  },
  {
    id: "04",
    title: "GLOBAL DEPLOYMENT",
    description: "CI/CD pipelines, edge caching strategy, and automated testing for a flawless launch.",
    icon: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  },
];

export default function WorkflowSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !pathRef.current) return;

    // Calculate path length for drawing animation
    const pathLength = pathRef.current.getTotalLength();
    
    // Set initial state: path hidden
    gsap.set(pathRef.current, {
      strokeDasharray: pathLength,
      strokeDashoffset: pathLength,
    });

    // Animate Line
    gsap.to(pathRef.current, {
      strokeDashoffset: 0,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 60%",
        end: "bottom 80%",
        scrub: 1,
      },
    });

    // Animate Steps (Reveal)
    const steps = gsap.utils.toArray(".workflow-step");
    steps.forEach((step: unknown) => {
      const el = step as HTMLElement;
      gsap.fromTo(
        el,
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          scrollTrigger: {
            trigger: el,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });
  }, []);

  return (
    <section 
        ref={sectionRef} 
        className="relative w-full py-32 bg-[#050505] overflow-hidden text-white border-t border-white/10"
    >
      {/* Blueprint Grid Background */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
            backgroundImage: `
                linear-gradient(to right, #333 1px, transparent 1px),
                linear-gradient(to bottom, #333 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
        }}
      />

      <div className="container mx-auto px-4 md:px-10 relative z-10">
        <div className="mb-20 text-center">
             <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4">
                ENGINEERING <span className="text-accent text-glow">PROTOCOL</span>
            </h2>
            <p className="font-mono text-accent text-sm tracking-[0.3em] uppercase">
                System Workflow v2.0
            </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
            {/* SVG Circuit Line Layer */}
            <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-[4px] -translate-x-1/2 h-full z-0 hidden md:block">
                <svg 
                    ref={svgRef}
                    className="h-full w-[100px] -ml-[50px] overflow-visible"
                    preserveAspectRatio="none"
                >
                    <path 
                        ref={pathRef}
                        d="M50,0 V1200" // Simple vertical line, could be complex bezier
                        fill="none"
                        stroke="var(--accent)"
                        strokeWidth="2"
                        vectorEffect="non-scaling-stroke"
                        className="drop-shadow-[0_0_8px_rgba(0,240,255,0.8)]"
                    />
                </svg>
            </div>
            
            {/* Mobile Line */}
             <div className="absolute left-[19px] top-0 bottom-0 w-[2px] bg-white/10 md:hidden z-0"></div>


            {/* Steps */}
            <div className="space-y-24">
                {steps.map((step, index) => (
                    <div 
                        key={step.id} 
                        className={`workflow-step relative flex flex-col md:flex-row gap-8 items-start md:items-center ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                    >
                        {/* Content Side */}
                        <div className={`w-full md:w-1/2 pl-12 md:pl-0 ${index % 2 === 0 ? 'md:pl-12 text-left' : 'md:pr-12 md:text-right'}`}>
                            <div className="bg-black/40 backdrop-blur-md border border-white/10 p-8 hover:border-accent/50 transition-colors group">
                                <h3 className="text-4xl font-bold text-gray-700 mb-2 group-hover:text-white transition-colors">
                                    {step.id}
                                </h3>
                                <h4 className="text-xl font-bold text-white mb-3 tracking-wide">
                                    {step.title}
                                </h4>
                                <p className="text-gray-400 font-light leading-relaxed text-sm">
                                    {step.description}
                                </p>
                            </div>
                        </div>

                        {/* Center Node (Anchor) */}
                        <div className="absolute left-0 md:left-1/2 -translate-x-1/2 w-10 h-10 bg-black border-2 border-accent rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(0,240,255,0.5)] z-10">
                            <div className="w-3 h-3 bg-accent rounded-full animate-pulse" />
                        </div>
                        
                        {/* Empty Side for balance */}
                        <div className="w-full md:w-1/2 hidden md:block" />
                    </div>
                ))}
            </div>
        </div>
      </div>
    </section>
  );
}
