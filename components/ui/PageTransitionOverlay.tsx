"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useTransition } from "@/context/TransitionContext";
import { useRouter } from "next/navigation";
import gsap from "gsap";

const statusMessages = [
  "INITIALIZING SECURE HANDSHAKE...",
  "BYPASSING PROXY SERVER...",
  "DECRYPTING PAYLOAD...",
  "ESTABLISHING UPLINK...",
  "ACCESS GRANTED."
];

export default function PageTransitionOverlay() {
  const { isTransitioning, targetHref, resetTransition } = useTransition();
  const router = useRouter();
  const overlayRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const scanlineRef = useRef<HTMLDivElement>(null);
  const [currentMessage, setCurrentMessage] = useState(statusMessages[0]);

  const playExitAnimation = useCallback(() => {
    const ctx = gsap.context(() => {
        const tl = gsap.timeline({
            onComplete: () => {
                gsap.set(overlayRef.current, { display: "none" });
                resetTransition();
            }
        });

        // "Curtain Up" or "Dissolve"
        tl.to(overlayRef.current, {
            opacity: 0,
            duration: 0.5,
            ease: "power2.inOut"
        });
    }, overlayRef);
  }, [resetTransition]);

  useEffect(() => {
    if (!isTransitioning || !targetHref) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          // Perform Navigation
          router.push(targetHref);
          
          // Wait a bit for Next.js to mount new page (simulated via small delay or just proceed)
          // Then play Exit animation
          setTimeout(() => {
            playExitAnimation();
          }, 500); // 500ms artificial delay for the "processing" feel
        }
      });

      // 1. Reveal Overlay
      tl.set(overlayRef.current, { display: "flex", opacity: 1 });
      
      // 2. Scanline & Glitch Effect
      tl.fromTo(scanlineRef.current, 
        { top: "-10%" },
        { top: "110%", duration: 1.5, ease: "power1.inOut", repeat: 1 }
      , 0);

      // 3. Text Scramble / Status Updates
      statusMessages.forEach((msg, index) => {
        tl.call(() => setCurrentMessage(msg), [], index * 0.25);
      });

      // 4. Glitch Overlay Appearance
      tl.fromTo(".glitch-layer",
        { opacity: 0 },
        { opacity: 0.5, duration: 0.1, yoyo: true, repeat: 5, ease: "steps(1)" },
        0
      );

    }, overlayRef);

    return () => ctx.revert();
  }, [isTransitioning, targetHref, router, playExitAnimation]);

  return (
    <div 
      ref={overlayRef} 
      className="fixed inset-0 z-[9999] bg-black hidden flex-col items-center justify-center font-mono text-accent overflow-hidden"
    >
      {/* Scanline */}
      <div 
        ref={scanlineRef}
        className="absolute left-0 right-0 h-[2px] bg-accent shadow-[0_0_20px_var(--accent)] z-10"
      />

      {/* Noise/Glitch Layers */}
      <div className="glitch-layer absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay pointer-events-none" />
      <div className="absolute inset-0 bg-accent/5 pointer-events-none" />

      {/* Central Status Text */}
      <div ref={textRef} className="relative z-20 text-center">
        <div className="text-4xl md:text-6xl font-black tracking-tighter mb-4 animate-pulse">
            ACCESSING SERVER
        </div>
        <div className="text-xs md:text-sm tracking-[0.5em] text-white/70">
            {currentMessage}
        </div>
        
        {/* Loading Bar */}
        <div className="w-64 h-1 bg-white/20 mt-8 mx-auto overflow-hidden">
            <div className="h-full bg-accent animate-progress" />
        </div>
      </div>

      <style jsx>{`
        @keyframes progress {
            0% { width: 0%; }
            100% { width: 100%; }
        }
        .animate-progress {
            animation: progress 1.2s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
      `}</style>
    </div>
  );
}