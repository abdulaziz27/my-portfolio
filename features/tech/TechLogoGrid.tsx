"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface TechLogo {
  name: string;
  icon: string; // SVG path atau component
  category: "Frontend" | "Backend" | "Database" | "DevOps" | "Mobile";
}

// Tech stack dengan logo SVG paths (Simple Icons compatible)
const techStack: TechLogo[] = [
  // Frontend
  { name: "React.js", icon: "react", category: "Frontend" },
  { name: "Next.js", icon: "nextdotjs", category: "Frontend" },
  { name: "Tailwind CSS", icon: "tailwindcss", category: "Frontend" },
  // Backend
  { name: "Node.js", icon: "nodedotjs", category: "Backend" },
  { name: "Laravel", icon: "laravel", category: "Backend" },
  { name: "Python", icon: "python", category: "Backend" },
  // Database
  { name: "PostgreSQL", icon: "postgresql", category: "Database" },
  { name: "MySQL", icon: "mysql", category: "Database" },
  { name: "Redis", icon: "redis", category: "Database" },
  // DevOps
  { name: "Docker", icon: "docker", category: "DevOps" },
  { name: "GitHub Actions", icon: "githubactions", category: "DevOps" },
  { name: "Vercel", icon: "vercel", category: "DevOps" },
  { name: "Cloudflare", icon: "cloudflare", category: "DevOps" },
  // Mobile
  { name: "Flutter", icon: "flutter", category: "Mobile" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
  },
};

export default function TechLogoGrid() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-4 md:gap-6"
    >
      {techStack.map((tech, index) => (
        <motion.div
          key={tech.name}
          variants={itemVariants}
          className="group relative"
        >
          <div className="relative flex flex-col items-center justify-center p-4 md:p-6 bg-white/5 border border-white/10 hover:border-accent/50 hover:bg-white/10 transition-all duration-300 rounded-sm backdrop-blur-sm">
            {/* Logo Icon - Using Simple Icons via CDN */}
            <div className="w-10 h-10 md:w-12 md:h-12 mb-2 relative flex items-center justify-center">
              <img
                src={`https://cdn.simpleicons.org/${tech.icon}/ffffff`}
                alt={tech.name}
                className="w-full h-full object-contain opacity-70 group-hover:opacity-100 transition-all duration-300 filter group-hover:brightness-110 group-hover:drop-shadow-[0_0_12px_rgba(0,240,255,0.8)]"
                loading="lazy"
              />
              {/* Glow effect on hover */}
              <div className="absolute inset-0 bg-accent/30 rounded-full opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300 -z-10" />
            </div>
            
            {/* Tech Name */}
            <span className="text-[10px] md:text-xs font-mono text-gray-300 group-hover:text-accent group-hover:text-glow text-center transition-all duration-300 uppercase tracking-wider">
              {tech.name}
            </span>
            
            {/* Hover Border Glow */}
            <div className="absolute inset-0 border border-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-sm pointer-events-none" />
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
