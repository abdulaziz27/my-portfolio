"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface TechItem {
  name: string;
  level: number;
  status: "ONLINE" | "STANDBY" | "LOADING";
}

const techStack: TechItem[] = [
  { name: "Next.js 16 (Canary)", level: 98, status: "ONLINE" },
  { name: "React 19 (RC)", level: 95, status: "ONLINE" },
  { name: "TypeScript (Strict)", level: 99, status: "ONLINE" },
  { name: "Three.js / R3F", level: 88, status: "LOADING" },
  { name: "Go / Golang", level: 85, status: "STANDBY" },
  { name: "PostgreSQL", level: 92, status: "ONLINE" },
  { name: "Docker / K8s", level: 80, status: "STANDBY" },
  { name: "AWS Serverless", level: 85, status: "ONLINE" },
];

export default function TechStatusBar() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if(!containerRef.current) return;
    
    gsap.fromTo(
        ".tech-bar-fill",
        { width: "0%" },
        { 
            width: "var(--target-width)", 
            duration: 1.5, 
            stagger: 0.1, 
            ease: "power2.out",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 80%",
                toggleActions: "play none none reverse",
            }
        }
    );
  }, []);

  return (
    <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 font-mono text-xs">
      {techStack.map((tech, i) => (
        <div key={i} className="group relative bg-white/5 border border-white/5 p-3 hover:bg-white/10 transition-colors">
            {/* Header */}
            <div className="flex justify-between items-center mb-2">
                <span className="text-gray-300 font-bold tracking-wider">{tech.name}</span>
                <span className={`
                    px-2 py-[2px] text-[10px] border 
                    ${tech.status === 'ONLINE' ? 'border-accent text-accent' : 
                      tech.status === 'LOADING' ? 'border-yellow-400 text-yellow-400' : 
                      'border-gray-400 text-gray-400'}
                `}>
                    {tech.status}
                </span>
            </div>
            
            {/* Progress Bar Container */}
            <div className="w-full h-2 bg-black/50 overflow-hidden relative">
                {/* Glowing Fill */}
                <div 
                    className="tech-bar-fill h-full bg-accent shadow-[0_0_10px_var(--accent)] relative"
                    style={{ "--target-width": `${tech.level}%` } as React.CSSProperties}
                >
                    {/* Scanline inside bar */}
                    <div className="absolute inset-0 bg-white/20 w-full h-full animate-scan" />
                </div>
            </div>
            
            {/* Level Label */}
            <div className="flex justify-end mt-1">
                <span className="text-[10px] text-gray-400">{tech.level}% CAPACITY</span>
            </div>
        </div>
      ))}
    </div>
  );
}
