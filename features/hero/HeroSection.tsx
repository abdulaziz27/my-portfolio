import MeshGradientBackground from "@/components/backgrounds/MeshGradientBackground";
import KineticText from "./KineticText";

export default function HeroSection() {
  return (
    <section id="hero" className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* 1. Interactive 3D Background */}
      <MeshGradientBackground />

      {/* 2. Content Layer */}
      <div className="z-10 text-center px-4 mix-blend-difference">
        {/* Intro Tag */}
        <p className="text-sm md:text-base text-accent uppercase tracking-[0.3em] mb-4 opacity-80">
          Software Engineer &bull; Creative Developer
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
          Crafting <span className="text-white font-medium">Elite-Tier</span> digital solutions for the global market. 
          Specialized in ERP, High-Performance Commerce, and Interactive WebGL Experiences.
        </p>
      </div>

      {/* 3. Decorative Elements */}
      <div className="absolute bottom-10 left-10 hidden md:block">
         <div className="h-[1px] w-24 bg-accent opacity-50 mb-2"></div>
         <p className="text-xs text-gray-400 font-mono">ID / SG / JP / MY / VN</p>
      </div>
      
      <div className="absolute bottom-10 right-10 animate-bounce">
        <svg 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2"
            className="text-gray-400"
        >
            <path d="M7 13l5 5 5-5M7 6l5 5 5-5"/>
        </svg>
      </div>
    </section>
  );
}
