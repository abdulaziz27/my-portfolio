"use client";

import MeshGradientBackground from "@/components/backgrounds/MeshGradientBackground";
import KineticText from "./KineticText";
import { useTranslations } from "@/context/LocaleContext";

export default function HeroSection() {
  const tHero = useTranslations("hero");

  return (
    <section id="hero" className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* 1. Interactive 3D Background */}
      <MeshGradientBackground />

      {/* 2. Content Layer */}
      <div className="z-10 text-center px-4 mix-blend-difference">
        {/* Intro Tag */}
        <p className="text-sm md:text-base text-accent uppercase tracking-[0.3em] mb-4 opacity-80">
          {tHero("intro")}
        </p>

        {/* Main Kinetic Title */}
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter mb-6">
            <div className="block">
                <KineticText text="DIGITAL" />
            </div>
            <div className="block mt-[-10px] md:mt-[-20px]">
                <KineticText text="ARCHITECT" />
            </div>
        </h1>

        {/* Sub-headline */}
        <p className="max-w-2xl mx-auto text-gray-300 text-lg md:text-xl font-light leading-relaxed">
          {tHero("sub")}
        </p>
      </div>

      {/* 3. Decorative Elements */}
      <div className="absolute bottom-10 right-10 animate-bounce">
        <svg 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2"
            className="text-gray-300"
        >
            <path d="M7 13l5 5 5-5M7 6l5 5 5-5"/>
        </svg>
      </div>
    </section>
  );
}
