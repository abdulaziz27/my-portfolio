"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "@/context/LocaleContext";

export default function AboutSection() {
  const tAbout = useTranslations("about");

  return (
    <section id="about" className="relative w-full py-24 bg-[#050505] overflow-hidden border-t border-white/10">
      <div className="container mx-auto px-4 md:px-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Visual: Glitch Portrait */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative aspect-[12/16] max-w-sm mx-auto lg:mx-0 group"
          >
            <div className="relative w-full h-full overflow-hidden border border-white/10 rounded-sm bg-white/5 backdrop-blur-sm shadow-lg">
              <Image 
                src="/profile.jpg" 
                alt="Abdul Aziz Profile"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
                className="object-cover grayscale contrast-125 transition-transform duration-700 group-hover:scale-105 group-hover:grayscale-0"
              />
              
              {/* Glitch Overlay Effect */}
              <div className="absolute inset-0 bg-accent/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none mix-blend-screen" />
              
              {/* Border Glow on Hover */}
              <div className="absolute inset-0 border-2 border-accent/0 group-hover:border-accent/50 transition-all duration-300 rounded-sm pointer-events-none" />
            </div>
            
            {/* Decorative Corner Elements */}
            <div className="absolute -top-1 -left-1 w-8 h-8 border-t-2 border-l-2 border-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute -bottom-1 -right-1 w-8 h-8 border-b-2 border-r-2 border-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.div>

          {/* Content: Bio */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
                <p className="text-accent font-mono text-sm tracking-[0.3em] uppercase mb-2">{tAbout("tag")}</p>
                <p className="text-gray-400 font-mono text-xs tracking-[0.2em] uppercase mb-4">{tAbout("role")}</p>
                <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tighter leading-tight">
                    {tAbout("titleLine1")} <br/> 
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-400">{tAbout("titleLine2")}</span>
                </h2>
            </div>

            <div className="space-y-4 text-gray-300 font-light text-lg leading-relaxed">
                <p>
                    {tAbout("para1")}
                </p>
                <p>
                    {tAbout("para2")}
                </p>
            </div>

            <div className="grid grid-cols-2 gap-8 pt-8 border-t border-white/5 font-mono text-xs uppercase tracking-widest">
                <div>
                    <span className="text-gray-300 block mb-2">{tAbout("education")}</span>
                    <span className="text-white">{tAbout("educationValue")}</span>
                </div>
                <div>
                    <span className="text-gray-300 block mb-2">{tAbout("specialization")}</span>
                    <span className="text-white">{tAbout("specializationValue")}</span>
                </div>
                <div>
                    <span className="text-gray-300 block mb-2">{tAbout("stack")}</span>
                    <span className="text-white">{tAbout("stackValue")}</span>
                </div>
                <div>
                    <span className="text-gray-300 block mb-2">{tAbout("infra")}</span>
                    <span className="text-white">{tAbout("infraValue")}</span>
                </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
