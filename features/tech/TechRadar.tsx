"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const skills = [
  { name: "FRONTEND", value: 100 },
  { name: "BACKEND", value: 90 },
  { name: "CLOUD/INFRA", value: 85 },
  { name: "ERP LOGIC", value: 95 },
  { name: "MOBILE", value: 80 },
];

export default function TechRadar() {
  const svgRef = useRef<SVGSVGElement>(null);
  const polygonRef = useRef<SVGPolygonElement>(null);

  // Helper to calculate polygon points
  const getPoints = (values: number[], radius: number, center: number) => {
    const angleStep = (Math.PI * 2) / 5;
    return values.map((val, i) => {
      const angle = i * angleStep - Math.PI / 2; // Start from top
      const x = center + Math.cos(angle) * (radius * (val / 100));
      const y = center + Math.sin(angle) * (radius * (val / 100));
      return `${x},${y}`;
    }).join(" ");
  };

  useEffect(() => {
    if (!polygonRef.current) return;

    // Animate the polygon growing
    gsap.fromTo(
      polygonRef.current,
      { opacity: 0, scale: 0, transformOrigin: "center" },
      { opacity: 0.6, scale: 1, duration: 1.5, ease: "elastic.out(1, 0.5)", delay: 0.5 }
    );
  }, []);

  const size = 300;
  const center = size / 2;
  const radius = 120;
  
  // Background Grids (Concentric Pentagons)
  const gridLevels = [100, 75, 50, 25];

  return (
    <div className="relative flex flex-col items-center justify-center p-4">
       {/* Scanner Line Animation */}
      <div className="absolute inset-0 w-full h-full animate-spin-slow opacity-20 pointer-events-none">
          <div className="w-full h-1/2 bg-gradient-to-b from-transparent to-accent/20 border-b border-accent/50" />
      </div>

      <svg 
        ref={svgRef} 
        width={size} 
        height={size} 
        viewBox={`0 0 ${size} ${size}`}
        className="drop-shadow-[0_0_15px_rgba(0,240,255,0.3)]"
      >
        {/* Grid Lines */}
        {gridLevels.map((level) => (
          <polygon
            key={level}
            points={getPoints(Array(5).fill(level), radius, center)}
            fill="none"
            stroke="#333"
            strokeWidth="1"
            className="opacity-50"
          />
        ))}

        {/* Axis Lines */}
        {skills.map((_, i) => {
            const angle = i * ((Math.PI * 2) / 5) - Math.PI / 2;
            const x = center + Math.cos(angle) * radius;
            const y = center + Math.sin(angle) * radius;
            return (
                <line 
                    key={i} 
                    x1={center} 
                    y1={center} 
                    x2={x} 
                    y2={y} 
                    stroke="#222" 
                    strokeWidth="1" 
                />
            );
        })}

        {/* Data Polygon */}
        <polygon
          ref={polygonRef}
          points={getPoints(skills.map(s => s.value), radius, center)}
          fill="rgba(0, 240, 255, 0.2)"
          stroke="var(--accent)"
          strokeWidth="2"
        />
        
        {/* Labels */}
        {skills.map((skill, i) => {
            const angle = i * ((Math.PI * 2) / 5) - Math.PI / 2;
            // Push labels out a bit further
            const labelRadius = radius + 30; 
            const x = center + Math.cos(angle) * labelRadius;
            const y = center + Math.sin(angle) * labelRadius;
            
            return (
                <text
                    key={i}
                    x={x}
                    y={y}
                    fill="white"
                    fontSize="10"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="font-mono tracking-widest opacity-80"
                >
                    {skill.name}
                </text>
            );
        })}
      </svg>
      
      <div className="absolute bottom-4 font-mono text-xs text-accent animate-pulse">
        SYSTEM ANALYSIS: OPTIMAL
      </div>
    </div>
  );
}
