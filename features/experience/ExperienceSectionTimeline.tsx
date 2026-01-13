"use client";

// ============================================
// TIMELINE LAYOUT - Uncomment import di ExperienceSection.tsx untuk menggunakan
// ============================================

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

export default function ExperienceSectionTimeline() {
  const tExp = useTranslations("experience");
  const { locale } = useLocale();
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !timelineRef.current) return;

    const cards = timelineRef.current.querySelectorAll(".experience-card");
    
    cards.forEach((card) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
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

        {/* Timeline */}
        <div ref={timelineRef} className="relative max-w-4xl mx-auto">
          {/* Vertical Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-white/10 md:-translate-x-1/2 z-0" />

          {/* Experience Cards */}
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div
                key={exp.id}
                className="experience-card relative flex flex-col md:flex-row items-start md:items-stretch gap-6 md:gap-8"
              >
                {(() => {
                  const isEven = index % 2 === 0;
                  return (
                    <>
                      {/* Date Badge */}
                      <div
                        className={`hidden md:flex md:w-1/2 ${isEven ? "md:justify-end md:pr-8" : "md:justify-start md:pl-8 order-3 md:order-1"}`}
                      >
                        <div className={`${isEven ? "text-right" : "text-left"}`}>
                          <div className="inline-block px-4 py-2 bg-black/40 border border-white/10 rounded-sm backdrop-blur-sm">
                            <p className="text-xs font-mono text-accent uppercase tracking-wider">
                              {formatDate(exp.startDate, locale)} - {formatDate(exp.endDate, locale)}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Center Dot */}
                      <div className="absolute left-4 md:left-1/2 -translate-x-1/2 top-4 w-4 h-4 bg-accent rounded-full border-2 border-black z-10 shadow-[0_0_12px_rgba(0,240,255,0.6)]" />

                      {/* Content Card */}
                      <div
                        className={`w-full md:w-1/2 ${isEven ? "md:pl-8 order-2" : "md:pr-8 order-2"}`}
                      >
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          className="bg-black/40 backdrop-blur-md border border-white/10 p-6 hover:border-accent/50 transition-all duration-300 group"
                        >
                          {/* Type Badge */}
                          <div className="flex items-center gap-3 mb-3">
                            <span className="px-2 py-1 text-[9px] font-mono uppercase tracking-wider bg-accent/20 text-accent border border-accent/30">
                              {getTypeLabel(exp.type, locale)}
                            </span>
                            {exp.type === "fulltime" && (
                              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                            )}
                          </div>

                          {/* Position & Company */}
                          <h3 className="text-xl font-bold text-white mb-1 group-hover:text-accent transition-colors">
                            {exp.position}
                          </h3>
                          <p className="text-sm text-gray-300 font-mono mb-2">{exp.company}</p>
                          <p className="text-xs text-gray-400 mb-4">{exp.location}</p>

                          {/* Mobile Date */}
                          <div className="md:hidden mb-4">
                            <p className="text-xs font-mono text-accent">
                              {formatDate(exp.startDate, locale)} - {formatDate(exp.endDate, locale)}
                            </p>
                          </div>

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
                                <span className="text-accent mt-1.5">▸</span>
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
                        </motion.div>
                      </div>
                    </>
                  );
                })()}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
