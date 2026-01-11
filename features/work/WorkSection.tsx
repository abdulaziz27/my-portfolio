"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProjectCard from "./ProjectCard";
import { projects, Project } from "./projectData";

gsap.registerPlugin(ScrollTrigger);

const INITIAL_DISPLAY = 12;
const LOAD_MORE_COUNT = 12;

// Extract unique categories
const categories = Array.from(new Set(projects.map(p => p.category))).sort();

export default function WorkSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [visibleCount, setVisibleCount] = useState(INITIAL_DISPLAY);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const previousCountRef = useRef(0);
  const isInitialMount = useRef(true);

  // Filter projects based on selected filters
  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      return !selectedCategory || project.category === selectedCategory;
    });
  }, [selectedCategory]);

  // Reset visible count when filters change
  useEffect(() => {
    setVisibleCount(INITIAL_DISPLAY);
    previousCountRef.current = 0;
    isInitialMount.current = true;
  }, [selectedCategory]);

  // Display projects based on visible count
  const displayedProjects = filteredProjects.slice(0, visibleCount);
  const hasMore = filteredProjects.length > visibleCount;

  // GSAP Animation - Initial load with ScrollTrigger, load more without
  useEffect(() => {
    if (!gridRef.current || !sectionRef.current || displayedProjects.length === 0) return;

    const cards = Array.from(gridRef.current.children) as HTMLElement[];
    if (cards.length === 0) return;

    // Initial mount: use ScrollTrigger
    if (isInitialMount.current && displayedProjects.length <= INITIAL_DISPLAY) {
      gsap.fromTo(
        cards,
        { 
          y: 100, 
          opacity: 0,
          scale: 0.95
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
      previousCountRef.current = displayedProjects.length;
      isInitialMount.current = false;
    } else if (!isInitialMount.current && displayedProjects.length > previousCountRef.current) {
      // Load more: animate only new cards directly without ScrollTrigger
      const newCards = cards.slice(previousCountRef.current);
      
      if (newCards.length > 0) {
        gsap.fromTo(
          newCards,
          {
            y: 50,
            opacity: 0,
            scale: 0.98
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.6,
            stagger: 0.05,
            ease: "power2.out",
          }
        );
      }
      previousCountRef.current = displayedProjects.length;
    }
  }, [displayedProjects]);

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + LOAD_MORE_COUNT);
  };

  const handleCategoryFilter = (category: string | null) => {
    setSelectedCategory(category === selectedCategory ? null : category);
    isInitialMount.current = true; // Reset for new filter
  };

  return (
    <section id="work" ref={sectionRef} className="relative w-full py-24 px-4 md:px-10 bg-black border-t border-white/10">
      
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-900/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Header */}
      <div className="mb-16 md:mb-24 relative z-10">
        <h2 className="text-4xl md:text-7xl font-bold tracking-tighter text-white mb-6">
          SELECTED <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-500 to-gray-800">WORKS</span>
        </h2>
        <div className="h-[1px] w-full bg-white/10" />
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mt-4">
          <div className="text-xs md:text-sm text-gray-300 font-mono uppercase tracking-widest">
            <span>Archive 2020-2025</span>
            <span className="mx-2">•</span>
            <span>{projects.length} Projects</span>
            {selectedCategory && filteredProjects.length !== projects.length && (
              <>
                <span className="mx-2">•</span>
                <span className="text-accent">
                  {filteredProjects.length} filtered
                </span>
              </>
            )}
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="mt-8 space-y-4">
          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleCategoryFilter(null)}
              className={`px-4 py-2 text-xs font-mono uppercase tracking-wider border transition-all duration-300 ${
                !selectedCategory
                  ? 'bg-accent text-black border-accent'
                  : 'bg-black/40 text-gray-300 border-white/10 hover:border-accent/50 hover:text-white'
              }`}
            >
              All Categories
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryFilter(category)}
                className={`px-4 py-2 text-xs font-mono uppercase tracking-wider border transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-accent text-black border-accent'
                    : 'bg-black/40 text-gray-300 border-white/10 hover:border-accent/50 hover:text-white'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

        </div>
      </div>

      {/* Asymmetrical Bento Grid */}
      {displayedProjects.length > 0 ? (
        <>
          <div 
            ref={gridRef}
            className="grid grid-cols-1 md:grid-cols-4 auto-rows-[minmax(250px,auto)] gap-4"
          >
            {displayedProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>

          {/* Load More Button */}
          {hasMore && (
            <div className="mt-12 flex justify-center">
              <button
                onClick={handleLoadMore}
                className="px-8 py-4 font-mono text-sm uppercase tracking-widest border-2 border-accent/40 text-accent hover:bg-accent hover:text-black transition-all duration-300 group"
              >
                LOAD MORE
                <span className="ml-2 inline-block group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-16">
          <p className="text-gray-400 font-mono text-sm uppercase tracking-widest">
            No projects found with selected filters
          </p>
        </div>
      )}
      
    </section>
  );
}
