"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";

interface KineticTextProps {
  text: string;
  className?: string;
}

export default function KineticText({ text, className = "" }: KineticTextProps) {
  const container = useRef<HTMLDivElement>(null);
  const lettersRef = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!container.current) return;
      
      const rect = container.current.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      lettersRef.current.forEach((letter, i) => {
        if (!letter) return;
        
        const letterRect = letter.getBoundingClientRect();
        // Calculate center of the letter relative to the container
        const letterCenterX = (letterRect.left - rect.left) + letterRect.width / 2;
        const letterCenterY = (letterRect.top - rect.top) + letterRect.height / 2;

        const dist = Math.sqrt(
            Math.pow(mouseX - letterCenterX, 2) + 
            Math.pow(mouseY - letterCenterY, 2)
        );

        const maxDist = 300; // Interaction radius
        
        if (dist < maxDist) {
          // Calculate force/distortion based on distance
          // Closer = Stronger effect
          const force = (maxDist - dist) / maxDist;
          
          // Direction vector from mouse to letter
          const dirX = (letterCenterX - mouseX) / dist || 0;
          const dirY = (letterCenterY - mouseY) / dist || 0;

          // "Magnetic" repulsion or distortion
          const moveX = dirX * force * 40; 
          const moveY = dirY * force * 40;
          const scale = 1 + force * 0.5; // Grow slightly

          gsap.to(letter, {
            x: moveX,
            y: moveY,
            scale: scale,
            fontWeight: 100 + (force * 800), // Variable font weight interpolation if supported
            color: `rgba(0, 240, 255, ${0.5 + force * 0.5})`, // Glow up
            duration: 0.4,
            ease: "power2.out",
          });
        } else {
            // Reset
          gsap.to(letter, {
            x: 0,
            y: 0,
            scale: 1,
            fontWeight: 400, // Back to normal weight
            color: "#ededed",
            duration: 0.6,
            ease: "elastic.out(1, 0.3)",
          });
        }
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div ref={container} className={`relative inline-block select-none ${className}`}>
      {text.split("").map((char, i) => (
        <span
          key={i}
          ref={(el) => { lettersRef.current[i] = el; }}
          className="inline-block transition-colors duration-100 will-change-transform"
          style={{ 
             fontVariationSettings: "'wght' 400", // Start weight
          }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </div>
  );
}
