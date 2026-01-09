"use client";

import { Project } from "./projectData";
import { useRef } from "react";
import Image from "next/image";
import SecureLink from "@/components/ui/SecureLink";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <SecureLink
      href={`/work/${project.id}`}
      className={`
        group relative overflow-hidden rounded-none border border-white/5 bg-black/40 backdrop-blur-md transition-all duration-500 hover:border-transparent cursor-pointer block
        ${project.colSpan} ${project.rowSpan}
        min-h-[300px] flex flex-col
      `}
    >
      <div ref={cardRef} className="h-full flex flex-col">
        {/* 1. CONIC GRADIENT BORDER (Hover State) */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div 
              className="absolute inset-[-2px] animate-spin-slow"
              style={{
                  background: `conic-gradient(from 0deg, transparent, ${project.color}, transparent 30%, transparent)`
              }}
          />
        </div>

        {/* Background Image Container */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <Image 
            src={project.image} 
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover opacity-30 grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
          />
          
          {/* 2. CRT SCANLINE OVERLAY */}
          <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] z-10" />
          
          {/* CRT Flickering Mask */}
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity animate-pulse pointer-events-none z-10" />
        </div>

        {/* Content Overlay */}
        <div className="relative z-20 flex flex-col h-full p-8 justify-between">
          {/* Header */}
          <div className="flex justify-between items-start">
              <span className="text-[10px] font-mono tracking-[0.4em] text-accent group-hover:text-white transition-colors uppercase">
                  {project.category}
              </span>
              <span className="text-[10px] font-mono text-gray-300">
                  [{project.id.toString().padStart(2, '0')}]
              </span>
          </div>

          {/* Footer Content */}
          <div>
              <h3 className="text-3xl font-bold text-white mb-2 leading-none tracking-tighter">
                  {project.title}
              </h3>
              <p className="text-xs text-gray-300 max-w-[80%] leading-relaxed group-hover:text-gray-200 transition-colors">
                  {project.description}
              </p>
          </div>
        </div>

        {/* Hover Glow Background */}
        <div 
          className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-10 transition-opacity duration-500"
          style={{
              background: `radial-gradient(circle at center, ${project.color}, transparent 80%)`
          }}
        />
            </div>
          </SecureLink>
        );
      }
      