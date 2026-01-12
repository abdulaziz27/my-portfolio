"use client";

import TechLogoGrid from "./TechLogoGrid";
import { useTranslations } from "@/context/LocaleContext";

export default function TechSection() {
  const tTech = useTranslations("tech");

  return (
    <section id="status" className="relative w-full py-24 bg-black border-t border-white/10 overflow-hidden">
      {/* HUD Background Grid */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
            backgroundImage: `radial-gradient(#00f0ff 1px, transparent 1px)`,
            backgroundSize: '30px 30px'
        }}
      />
      
      <div className="container mx-auto px-4 md:px-10 relative z-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-16">
            <div>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-2 tracking-tighter">
                    {tTech("heading").split(" ")[0]} <span className="text-accent text-glow">{tTech("heading").split(" ").slice(1).join(" ")}</span>
                </h2>
                <p className="text-gray-300 font-mono text-sm tracking-widest uppercase">
                    {tTech("subheading")}
                </p>
            </div>
            
            {/* Decorative HUD Element */}
            <div className="hidden md:block text-right font-mono text-xs text-accent/50">
                <p>CPU: 32%</p>
                <p>MEM: 12GB</p>
                <p>NET: 1Gbps</p>
            </div>
        </div>

        {/* Logo Grid */}
        <div className="bg-white/5 border border-white/10 p-8 md:p-12 backdrop-blur-sm">
            <TechLogoGrid />
        </div>

        {/* Terminal / Logs Placeholder */}
        <div className="mt-8 p-4 bg-black border border-white/10 font-mono text-xs text-green-500 opacity-70 h-32 overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black pointer-events-none" />
            <p>{tTech("terminal1")}</p>
            <p>{tTech("terminal2")}</p>
            <p>{tTech("terminal3")}</p>
            <p>{tTech("terminal4")}</p>
            <p className="animate-pulse">{tTech("terminal5")}</p>
        </div>
      </div>
    </section>
  );
}
