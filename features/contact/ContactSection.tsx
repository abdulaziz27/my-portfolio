"use client";

import { useState } from "react";
import ContactForm from "./ContactForm";
import WorldClock from "./WorldClock";
import { useTranslations } from "@/context/LocaleContext";

export default function ContactSection() {
  const tContact = useTranslations("contact");
  const [copied, setCopied] = useState(false);
  const email = "abdulazizz.dev@gmail.com";

  const handleCopyEmail = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Silently fail - user can still copy manually
      if (process.env.NODE_ENV === 'development') {
        console.error("Failed to copy email:", err);
      }
    }
  };

  return (
    <section id="contact" className="relative w-full py-24 bg-[#0a0a0a] border-t border-white/10 overflow-hidden">
        {/* Background Grid */}
        <div 
            className="absolute inset-0 opacity-5 pointer-events-none"
            style={{
                backgroundImage: `linear-gradient(to right, #333 1px, transparent 1px), linear-gradient(to bottom, #333 1px, transparent 1px)`,
                backgroundSize: '50px 50px'
            }}
        />

      <div className="container mx-auto px-4 md:px-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            
            {/* Left: Terminals & Info */}
            <div className="flex flex-col space-y-12">
                <div>
                    <h2 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tighter">
                        {tContact("heading").split(" ")[0]} <span className="text-accent text-glow">{tContact("heading").split(" ").slice(1).join(" ")}</span>
                    </h2>
                    <p className="text-gray-300 font-light leading-relaxed max-w-md">
                        {tContact("intro")}
                    </p>
                </div>

                {/* Comm Channels */}
                <div className="space-y-4">
                    <h3 className="text-xs font-mono text-gray-300 uppercase tracking-widest">{tContact("contactLabel")}</h3>
                    <div className="flex flex-col gap-2">
                        <div className="group flex items-center gap-4 p-4 border border-white/10 hover:border-accent hover:bg-white/5 transition-all">
                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                            <a 
                                href={`mailto:${email}`}
                                className="font-mono text-sm text-gray-300 group-hover:text-white select-text flex-1"
                            >
                                {email}
                            </a>
                            <button
                                onClick={handleCopyEmail}
                                className="ml-auto px-3 py-1.5 text-[10px] font-mono uppercase border border-white/20 hover:border-accent hover:bg-accent/10 transition-all text-gray-300 hover:text-accent"
                                title="Copy email"
                            >
                                {copied ? tContact("copied") : tContact("copy")}
                            </button>
                        </div>
                        <a href="https://www.linkedin.com/in/itsabdulaziz" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 p-4 border border-white/10 hover:border-accent hover:bg-white/5 transition-all">
                            <span className="w-2 h-2 bg-blue-500 rounded-full" />
                            <span className="font-mono text-sm text-gray-300 group-hover:text-white">LinkedIn</span>
                        </a>
                        <a href="https://github.com/abdulaziz27" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 p-4 border border-white/10 hover:border-accent hover:bg-white/5 transition-all">
                            <span className="w-2 h-2 bg-gray-400 rounded-full" />
                            <span className="font-mono text-sm text-gray-300 group-hover:text-white">GitHub</span>
                        </a>
                    </div>
                </div>

                {/* World Clock Widget */}
                <div>
                    <h3 className="text-xs font-mono text-gray-300 uppercase tracking-widest mb-4">{tContact("timezones")}</h3>
                    <WorldClock />
                </div>
            </div>

            {/* Right: Contact Form */}
            <div className="bg-white/5 border border-white/5 p-8 backdrop-blur-sm shadow-2xl relative">
                <ContactForm />
            </div>

        </div>
      </div>
    </section>
  );
}
