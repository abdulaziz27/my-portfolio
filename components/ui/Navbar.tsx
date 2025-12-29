"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import Link from "next/link";

const navLinks = [
  { name: "WORK", href: "#work" },
  { name: "PROCESS", href: "#process" },
  { name: "STATUS", href: "#status" },
  { name: "CONTACT", href: "#contact" },
];

export default function Navbar() {
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [reduceMotion, setReduceMotion] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Body Scroll Lock when Menu is Open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  // Smart Hide Logic
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Always show if at the very top or if menu is open
      if (currentScrollY < 10 || mobileMenuOpen) {
        setVisible(true);
        setLastScrollY(currentScrollY);
        return;
      }

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, mobileMenuOpen]);

  // Active Section Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    const sections = ["hero", "work", "process", "status", "contact"];
    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const toggleReduceMotion = () => {
    setReduceMotion(!reduceMotion);
    document.body.classList.toggle("reduce-motion");
  };

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const barVariants = {
    top: { closed: { rotate: 0, y: 0 }, open: { rotate: 45, y: 6 } },
    middle: { closed: { opacity: 1 }, open: { opacity: 0 } },
    bottom: { closed: { rotate: 0, y: 0 }, open: { rotate: -45, y: -6 } }
  };

  return (
    <>
    <AnimatePresence mode="wait">
      {(visible || mobileMenuOpen) && (
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="fixed top-6 left-1/2 -translate-x-1/2 z-[5000] w-[90%] max-w-2xl"
        >
          <div className="bg-glass-bg border border-white/10 backdrop-blur-xl px-6 py-3 flex items-center justify-between rounded-sm relative shadow-2xl w-full">
            
            {/* Brand */}
            <Link href="/" className="text-white font-bold tracking-tighter text-lg group z-20 flex-shrink-0">
                A<span className="text-accent group-hover:text-white transition-colors">.</span>
            </Link>

            {/* Desktop Menu - Hidden on Mobile & Tablet (lg) */}
            <div className="hidden lg:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
                {navLinks.map((link) => (
                    <a 
                        key={link.name} 
                        href={link.href}
                        onClick={(e) => handleSmoothScroll(e, link.href)}
                        className={`text-[10px] font-mono tracking-widest transition-all cursor-pointer relative py-2
                            ${activeSection === link.href.substring(1) ? 'text-accent font-bold' : 'text-gray-400 hover:text-white'}
                        `}
                    >
                        {link.name}
                        {activeSection === link.href.substring(1) && (
                            <motion.div layoutId="active-dot" className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-accent rounded-full shadow-[0_0_5px_var(--accent)]" />
                        )}
                    </a>
                ))}
            </div>

            {/* Actions (Desktop) - Hidden on Mobile & Tablet (lg) */}
            <div className="hidden lg:flex items-center gap-4 z-20">
                <button 
                    onClick={toggleReduceMotion}
                    className={`border px-2 py-1 text-[8px] font-mono transition-all ${reduceMotion ? 'bg-accent text-black border-accent' : 'text-gray-500 border-white/10 hover:border-gray-400'}`}
                >
                    {reduceMotion ? 'MOTION_OFF' : 'MOTION_ON'}
                </button>

                <div className="relative">
                    <a 
                        href="/cv.pdf" 
                        download
                        onMouseEnter={() => setShowTooltip(true)}
                        onMouseLeave={() => setShowTooltip(false)}
                        className="flex items-center gap-2 border border-accent/30 px-3 py-1 text-[10px] font-mono text-accent hover:bg-accent hover:text-black transition-all group"
                    >
                        <span>SYSTEM_EXPORT</span>
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:translate-y-0.5 transition-transform">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
                        </svg>
                    </a>
                    
                    {/* Tooltip */}
                    <AnimatePresence>
                        {showTooltip && (
                            <motion.div 
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                className="absolute top-full mt-4 right-0 bg-accent text-black text-[9px] font-mono font-bold py-1 px-3 whitespace-nowrap pointer-events-none"
                            >
                                <div className="absolute top-[-4px] right-6 w-2 h-2 bg-accent rotate-45" />
                                COMPILING_RESUME_DATA...
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
                
            {/* Mobile/Tablet Toggle (VISIBLE on LG and below) */}
            <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden flex flex-col justify-center items-center gap-1.5 w-10 h-10 border border-white/10 rounded-full bg-white/5 active:bg-white/10 transition-colors focus:outline-none z-50 ml-auto"
                aria-label="Toggle Menu"
            >
                <motion.div 
                    initial="closed"
                    animate={mobileMenuOpen ? "open" : "closed"}
                    variants={barVariants.top} 
                    className="w-4 h-[1.5px] bg-white origin-center" 
                />
                <motion.div 
                    initial="closed"
                    animate={mobileMenuOpen ? "open" : "closed"}
                    variants={barVariants.middle} 
                    className="w-4 h-[1.5px] bg-white" 
                />
                <motion.div 
                    initial="closed"
                    animate={mobileMenuOpen ? "open" : "closed"}
                    variants={barVariants.bottom} 
                    className="w-4 h-[1.5px] bg-white origin-center" 
                />
            </button>

            <motion.div className="absolute bottom-0 left-0 h-[2px] bg-accent shadow-[0_0_10px_var(--accent)] origin-left z-0" style={{ scaleX }} />
          </div>
        </motion.nav>
      )}
    </AnimatePresence>

    {/* Mobile Menu Overlay */}
    <AnimatePresence>
        {mobileMenuOpen && (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 z-[4999] bg-black/80 backdrop-blur-2xl flex flex-col items-center justify-center space-y-8 lg:hidden"
            >
                {navLinks.map((link, i) => (
                    <motion.a 
                        key={link.name} 
                        href={link.href}
                        onClick={(e) => handleSmoothScroll(e, link.href)}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 + 0.2 }}
                        className={`text-3xl font-mono tracking-widest transition-colors ${activeSection === link.href.substring(1) ? 'text-accent' : 'text-gray-500 hover:text-white'}`}
                    >
                        {link.name}
                    </motion.a>
                ))}
                
                 {/* Mobile Actions */}
                 <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="flex flex-col gap-4 mt-8"
                >
                    <a 
                        href="/cv.pdf" 
                        download
                        className="border border-accent/30 px-6 py-3 text-sm font-mono text-accent hover:bg-accent hover:text-black transition-all flex items-center gap-2 justify-center"
                    >
                        <span>SYSTEM_EXPORT</span>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
                        </svg>
                    </a>

                    <button 
                        onClick={toggleReduceMotion} 
                        className={`border px-6 py-3 text-sm font-mono transition-all ${reduceMotion ? 'bg-accent text-black border-accent' : 'text-gray-500 border-white/10 hover:border-gray-400'}`}
                    >
                        {reduceMotion ? 'MOTION: OFF' : 'MOTION: ON'}
                    </button>
                </motion.div>

            </motion.div>
        )}
    </AnimatePresence>
    </>
  );
}