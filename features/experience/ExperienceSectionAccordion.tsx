"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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


export default function ExperienceSectionAccordion() {
  const tExp = useTranslations("experience");
  const { locale } = useLocale();
  const sectionRef = useRef<HTMLElement>(null);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const cards = sectionRef.current.querySelectorAll(".experience-accordion-card");
    
    cards.forEach((card) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
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

  const toggleExpanded = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

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

        {/* Accordion Cards */}
        <div className="max-w-4xl mx-auto space-y-4">
          {experiences.map((exp) => {
            const isExpanded = expandedId === exp.id;
            
            return (
              <motion.div
                key={exp.id}
                className="experience-accordion-card"
                initial={false}
              >
                <div
                  className="bg-black/40 backdrop-blur-md border border-white/10 hover:border-accent/30 transition-all duration-300 cursor-pointer group"
                  onClick={() => toggleExpanded(exp.id)}
                >
                  {/* Header - Always Visible */}
                  <div className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="px-2 py-1 text-[9px] font-mono uppercase tracking-wider bg-accent/20 text-accent border border-accent/30">
                            {getTypeLabel(exp.type, locale)}
                          </span>
                          {exp.type === "fulltime" && (
                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                          )}
                          <span className="text-xs font-mono text-gray-400">
                            {formatDate(exp.startDate, locale)} - {formatDate(exp.endDate, locale)}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-1 group-hover:text-accent transition-colors">
                          {exp.position}
                        </h3>
                        <p className="text-sm text-gray-300 font-mono mb-1">{exp.company}</p>
                        <p className="text-xs text-gray-400">{exp.location}</p>
                      </div>
                      
                      {/* Expand/Collapse Icon */}
                      <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex-shrink-0"
                      >
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          className="text-accent"
                        >
                          <path d="M6 9l6 6 6-6" />
                        </svg>
                      </motion.div>
                    </div>
                  </div>

                  {/* Expandable Content */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 border-t border-white/5 pt-4">
                          {/* Description */}
                          {exp.description && (
                            <p className="text-sm text-gray-300 mb-4 leading-relaxed">
                              {exp.description[locale]}
                            </p>
                          )}

                          {/* Achievements */}
                          <ul className="space-y-2 mb-4">
                            {exp.achievements[locale].map((achievement, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                                <span className="text-accent mt-1.5 flex-shrink-0">▸</span>
                                <span>{achievement}</span>
                              </li>
                            ))}
                          </ul>

                          {/* Tech Stack */}
                          <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                            {exp.techStack.map((tech) => (
                              <span
                                key={tech}
                                className="px-2 py-1 text-[10px] font-mono text-gray-400 bg-white/5 border border-white/10 rounded-sm"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
