"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslations, useLocale } from "@/context/LocaleContext";
import { sortedExperiences as experiences, Experience } from "./experienceData";

gsap.registerPlugin(ScrollTrigger);

const getTypeLabel = (type: Experience["type"], locale: "en" | "id") => {
  const labels = {
    en: {
      fulltime: "Full-time",
      parttime: "Part-time",
      internship: "Internship",
      bootcamp: "Bootcamp",
    },
    id: {
      fulltime: "Penuh Waktu",
      parttime: "Paruh Waktu",
      internship: "Magang",
      bootcamp: "Pelatihan",
    },
  };
  return labels[locale][type];
};

const formatDate = (date: string, locale: "en" | "id") => {
  if (date === "present") {
    return locale === "en" ? "Present" : "Sekarang";
  }
  const [year, month] = date.split("-");
  const monthNames = {
    en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    id: ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"],
  };
  return `${monthNames[locale][parseInt(month) - 1]} ${year}`;
};


export default function ExperienceSectionGrid() {
  const tExp = useTranslations("experience");
  const { locale } = useLocale();
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !gridRef.current) return;

    const cards = gridRef.current.querySelectorAll(".experience-grid-card");
    
    cards.forEach((card, index) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          delay: index * 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        const triggerElement = trigger.vars.trigger;
        if (triggerElement && typeof triggerElement !== 'string' && 'closest' in triggerElement) {
          if ((triggerElement as Element).closest("#experience") === sectionRef.current) {
            trigger.kill();
          }
        }
      });
    };
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative w-full py-24 bg-[#0a0a0a] border-t border-white/10 overflow-hidden"
    >
      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, #333 1px, transparent 1px), linear-gradient(to bottom, #333 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="container mx-auto px-4 md:px-10 relative z-10">
        {/* Header */}
        <div className="mb-16 text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tighter">
            {tExp("headingPrimary")}{" "}
            <span className="text-accent text-glow">{tExp("headingAccent")}</span>
          </h2>
          <p className="text-gray-300 font-mono text-sm tracking-widest uppercase">
            {tExp("subheading")}
          </p>
        </div>

        {/* Grid Cards */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto"
        >
          {experiences.map((exp) => (
            <motion.div
              key={exp.id}
              className="experience-grid-card"
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
            >
              <div className="h-full bg-black/40 backdrop-blur-md border border-white/10 hover:border-accent/50 transition-all duration-300 group flex flex-col">
                {/* Header */}
                <div className="p-6 pb-4 border-b border-white/5">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-1 text-[9px] font-mono uppercase tracking-wider bg-accent/20 text-accent border border-accent/30">
                        {getTypeLabel(exp.type, locale)}
                      </span>
                      {exp.type === "fulltime" && (
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      )}
                    </div>
                    <span className="text-xs font-mono text-gray-400">
                      {formatDate(exp.startDate, locale)} - {formatDate(exp.endDate, locale)}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-bold text-white mb-1 group-hover:text-accent transition-colors line-clamp-2">
                    {exp.position}
                  </h3>
                  <p className="text-sm text-gray-300 font-mono mb-1">{exp.company}</p>
                  <p className="text-xs text-gray-400">{exp.location}</p>
                </div>

                {/* Body - Scrollable if content is long */}
                <div className="flex-1 p-6 pt-4 overflow-y-auto">
                  {/* Description */}
                  {exp.description && (
                    <p className="text-sm text-gray-300 mb-4 leading-relaxed line-clamp-2">
                      {exp.description[locale]}
                    </p>
                  )}

                  {/* Achievements - Show first 3 */}
                  <ul className="space-y-2 mb-4">
                    {exp.achievements[locale].slice(0, 3).map((achievement, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                        <span className="text-accent mt-1.5 flex-shrink-0">▸</span>
                        <span className="line-clamp-2">{achievement}</span>
                      </li>
                    ))}
                    {exp.achievements[locale].length > 3 && (
                      <li className="text-xs text-gray-400 font-mono">
                        +{exp.achievements[locale].length - 3} more achievements
                      </li>
                    )}
                  </ul>
                </div>

                {/* Footer - Tech Stack */}
                <div className="p-6 pt-4 border-t border-white/5">
                  <div className="flex flex-wrap gap-2">
                    {exp.techStack.slice(0, 5).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 text-[10px] font-mono text-gray-400 bg-white/5 border border-white/10 rounded-sm"
                      >
                        {tech}
                      </span>
                    ))}
                    {exp.techStack.length > 5 && (
                      <span className="px-2 py-1 text-[10px] font-mono text-gray-500">
                        +{exp.techStack.length - 5}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
