"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function AboutSection() {
  return (
    <section id="about" className="relative w-full py-24 bg-[#050505] overflow-hidden border-t border-white/10">
      <div className="container mx-auto px-4 md:px-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Visual: Glitch Portrait */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative aspect-square max-w-md mx-auto lg:mx-0 overflow-hidden group border border-white/10"
          >
            <Image 
              src="/profile.jpg" 
              alt="Architect Profile"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
              className="object-cover grayscale contrast-125 transition-transform duration-700 group-hover:scale-105 group-hover:grayscale-0"
            />
            
            {/* Glitch Overlay Effect */}
            <div className="absolute inset-0 bg-accent/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none mix-blend-screen" />
          </motion.div>

          {/* Content: Bio */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
                <p className="text-accent font-mono text-sm tracking-[0.3em] uppercase mb-4">The Architect</p>
                <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tighter leading-tight">
                    BRIDGING BUSINESS <br/> 
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-400">WITH ENGINEERING.</span>
                </h2>
            </div>

            <div className="space-y-4 text-gray-300 font-light text-lg leading-relaxed">
                <p>
                    <span className="text-white font-medium">Bachelor of Computer Science</span> with a focus on scalable systems and high-performance UI. 
                    I build solutions that address real-world business needs for SMEs across Southeast Asia and Japan.
                </p>
                <p>
                    From <span className="text-accent font-mono text-base">ERP SYSTEMS</span> to <span className="text-accent font-mono text-base">E-COMMERCE PLATFORMS</span>, 
                    I focus on delivering quality digital products that help businesses grow and operate more efficiently.
                </p>
            </div>

            <div className="grid grid-cols-2 gap-8 pt-8 border-t border-white/5 font-mono text-xs uppercase tracking-widest">
                <div>
                    <span className="text-gray-300 block mb-2">Education</span>
                    <span className="text-white">B.Comp.Sc (Computer Science)</span>
                </div>
                <div>
                    <span className="text-gray-300 block mb-2">Specialization</span>
                    <span className="text-white">Full-stack & Interactive Design</span>
                </div>
                <div>
                    <span className="text-gray-300 block mb-2">Global Experience</span>
                    <span className="text-white">ID / VN / JP / MY / SG</span>
                </div>
                <div>
                    <span className="text-gray-300 block mb-2">Frameworks</span>
                    <span className="text-white">React 19 / Next 16 / Three.js</span>
                </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
