"use client";

import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import Link from "next/link";
import { useTranslations, useLocale } from "@/context/LocaleContext";

export default function Navbar() {
  const tNav = useTranslations("nav");
  const { locale, setLocale } = useLocale();
  const [visible, setVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [reduceMotion, setReduceMotion] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const navLinks = useMemo(
    () => [
      { name: tNav("work"), href: "#work", id: "work" },
      { name: tNav("process"), href: "#process", id: "process" },
      { name: tNav("status"), href: "#status", id: "status" },
      { name: tNav("contact"), href: "#contact", id: "contact" },
    ],
    [tNav]
  );

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

  // Smart Hide Logic - Optimized with throttling
  useEffect(() => {
    let ticking = false;
    const lastScrollYRef = { value: 0 };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          
          if (currentScrollY < 10 || mobileMenuOpen) {
            setVisible(true);
            lastScrollYRef.value = currentScrollY;
            ticking = false;
            return;
          }

          if (currentScrollY > lastScrollYRef.value && currentScrollY > 100) {
            setVisible(false);
          } else {
            setVisible(true);
          }
          lastScrollYRef.value = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [mobileMenuOpen]);

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

  const toggleLocale = () => {
    setLocale(locale === "en" ? "id" : "en");
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

  const hamburgerVariants = {
    top: { 
      closed: { rotate: 0, y: 0 }, 
      open: { rotate: 45, y: 6 } 
    },
    middle: { 
      closed: { opacity: 1 }, 
      open: { opacity: 0 } 
    },
    bottom: { 
      closed: { rotate: 0, y: 0 }, 
      open: { rotate: -45, y: -6 } 
    }
  };

  return (
    <>
      {/* Main Navbar */}
      <AnimatePresence mode="wait">
        {(visible || mobileMenuOpen) && (
          <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed top-0 left-0 right-0 z-[5000] px-4 sm:px-6 lg:px-8 py-4"
          >
            <div className="max-w-7xl mx-auto">
              <div className="relative bg-[rgba(5,5,5,0.85)] backdrop-blur-2xl border border-accent/20 rounded-lg shadow-[0_0_30px_rgba(0,240,255,0.1)] px-4 sm:px-6 py-3">
                {/* Glow Effect */}
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-accent/0 via-accent/5 to-accent/0 blur-xl opacity-50" />
                
                {/* Content Container */}
                <div className="relative flex items-center justify-between gap-4">
                  
                  {/* Brand Logo */}
                  <Link 
                    href="/" 
                    className="flex items-center gap-1.5 group z-20 flex-shrink-0"
                  >
                    <span className="text-2xl sm:text-3xl font-bold text-white tracking-tighter group-hover:text-accent transition-colors duration-300">
                      A
                    </span>
                    <span className="text-accent text-xl sm:text-2xl font-bold group-hover:text-white transition-colors duration-300">
                      .
                    </span>
                  </Link>

                  {/* Desktop Navigation - Only visible on lg+ */}
                  <nav className="hidden lg:flex items-center gap-1 xl:gap-2 flex-1 justify-center">
                    {navLinks.map((link) => (
                      <a 
                        key={link.id} 
                        href={link.href}
                        onClick={(e) => handleSmoothScroll(e, link.href)}
                        className={`relative px-4 py-2 text-[11px] xl:text-xs font-mono tracking-[0.15em] uppercase transition-all duration-300
                          ${activeSection === link.id 
                            ? 'text-accent' 
                            : 'text-gray-300 hover:text-white'
                          }
                        `}
                      >
                        {link.name}
                        {activeSection === link.id && (
                          <>
                            <motion.div 
                              layoutId="active-indicator"
                              className="absolute inset-0 border border-accent/30 rounded bg-accent/5"
                              initial={false}
                            />
                            <motion.div 
                              layoutId="active-dot"
                              className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-accent rounded-full shadow-[0_0_8px_var(--accent)]"
                              initial={false}
                            />
                          </>
                        )}
                        <span className="absolute inset-0 border border-transparent hover:border-accent/20 rounded transition-colors duration-300" />
                      </a>
                    ))}
                  </nav>

                  {/* Desktop Actions - Only visible on lg+ */}
                  <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
                    {/* Locale toggle - segmented pill */}
                    <div
                      className="relative flex items-center rounded-full border border-white/15 bg-black/40 overflow-hidden"
                      aria-label="Language selector"
                    >
                      <button
                        type="button"
                        onClick={() => setLocale("en")}
                        className={`relative px-3 py-1 text-[9px] font-mono uppercase tracking-wider transition-colors duration-200 ${
                          locale === "en"
                            ? "text-black"
                            : "text-gray-400 hover:text-white"
                        }`}
                      >
                        EN
                        {locale === "en" && (
                          <span className="absolute inset-0 -z-10 bg-accent" />
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={() => setLocale("id")}
                        className={`relative px-3 py-1 text-[9px] font-mono uppercase tracking-wider transition-colors duration-200 border-l border-white/10 ${
                          locale === "id"
                            ? "text-black"
                            : "text-gray-400 hover:text-white"
                        }`}
                      >
                        ID
                        {locale === "id" && (
                          <span className="absolute inset-0 -z-10 bg-accent" />
                        )}
                      </button>
                    </div>

                    <button 
                      onClick={toggleReduceMotion}
                    aria-label={reduceMotion ? "Enable animations" : "Disable animations"}
                      className={`px-3 py-1.5 text-[9px] font-mono tracking-wider uppercase border transition-all duration-300
                        ${reduceMotion 
                          ? 'bg-accent text-black border-accent shadow-[0_0_15px_rgba(0,240,255,0.4)]' 
                          : 'text-gray-400 border-white/10 hover:border-gray-300 hover:text-white'
                        }
                      `}
                    >
                      {reduceMotion ? 'MOTION_OFF' : 'MOTION_ON'}
                    </button>

                    <div className="relative">
                      <a 
                        href="/cv.pdf" 
                        download
                        aria-label={tNav("downloadCv")}
                        onMouseEnter={() => setShowTooltip(true)}
                        onMouseLeave={() => setShowTooltip(false)}
                        className="flex items-center gap-2 px-4 py-1.5 text-[10px] font-mono tracking-wider uppercase border border-accent/40 text-accent hover:bg-accent hover:text-black transition-all duration-300 group"
                      >
                        <span>{tNav("export")}</span>
                        <svg 
                          width="12" 
                          height="12" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth="2.5"
                          className="group-hover:translate-y-0.5 transition-transform duration-300"
                        >
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                          <polyline points="7 10 12 15 17 10" />
                          <line x1="12" y1="15" x2="12" y2="3" />
                        </svg>
                      </a>
                      
                      {/* Tooltip */}
                      <AnimatePresence>
                        {showTooltip && (
                          <motion.div 
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            className="absolute top-full mt-2 right-0 bg-accent text-black text-[9px] font-mono font-bold py-1.5 px-3 whitespace-nowrap pointer-events-none shadow-lg"
                          >
                            <div className="absolute top-[-4px] right-4 w-2 h-2 bg-accent rotate-45" />
                            COMPILING_RESUME_DATA...
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* Mobile Hamburger Button - Visible on mobile/tablet */}
                  <button 
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="lg:hidden flex flex-col justify-center items-center gap-1.5 w-12 h-12 min-w-[48px] border-2 border-accent/40 rounded-lg bg-accent/5 hover:bg-accent/10 active:bg-accent/15 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent/50 z-50 flex-shrink-0 group"
                    aria-label={tNav("toggleMenu")}
                    aria-expanded={mobileMenuOpen}
                  >
                    <motion.div 
                      variants={hamburgerVariants.top}
                      initial="closed"
                      animate={mobileMenuOpen ? "open" : "closed"}
                      className="w-5 h-[2px] bg-accent origin-center group-hover:bg-white transition-colors duration-300"
                    />
                    <motion.div 
                      variants={hamburgerVariants.middle}
                      initial="closed"
                      animate={mobileMenuOpen ? "open" : "closed"}
                      className="w-5 h-[2px] bg-accent group-hover:bg-white transition-colors duration-300"
                    />
                    <motion.div 
                      variants={hamburgerVariants.bottom}
                      initial="closed"
                      animate={mobileMenuOpen ? "open" : "closed"}
                      className="w-5 h-[2px] bg-accent origin-center group-hover:bg-white transition-colors duration-300"
                    />
                  </button>
                </div>

                {/* Scroll Progress Bar */}
                <motion.div 
                  className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-accent via-accent to-transparent shadow-[0_0_10px_var(--accent)] origin-left"
                  style={{ scaleX }}
                />
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 z-[4998] bg-black/90 backdrop-blur-xl lg:hidden"
            />

            {/* Slide-in Menu */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-[85%] max-w-sm z-[4999] bg-[rgba(5,5,5,0.98)] backdrop-blur-2xl border-l border-accent/30 shadow-[0_0_50px_rgba(0,240,255,0.2)] lg:hidden overflow-y-auto"
            >
              {/* Menu Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <span className="text-accent font-mono text-xs tracking-widest uppercase">{tNav("navLabel")}</span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-10 h-10 flex items-center justify-center border border-white/20 rounded-lg hover:bg-accent/10 hover:border-accent/40 transition-all duration-300"
                  aria-label={tNav("closeMenu")}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>

              {/* Menu Links */}
              <nav className="flex flex-col p-6 gap-2">
                {navLinks.map((link, i) => (
                  <motion.a 
                    key={link.id} 
                    href={link.href}
                    onClick={(e) => handleSmoothScroll(e, link.href)}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 + 0.1, type: "spring", stiffness: 200 }}
                    className={`relative px-6 py-4 text-lg font-mono tracking-widest uppercase border border-transparent hover:border-accent/30 hover:bg-accent/5 transition-all duration-300 rounded-lg group
                      ${activeSection === link.id 
                        ? 'text-accent border-accent/40 bg-accent/10' 
                        : 'text-gray-300 hover:text-white'
                      }
                    `}
                  >
                    {link.name}
                    {activeSection === link.id && (
                      <motion.div 
                        layoutId="mobile-active"
                        className="absolute left-0 top-0 bottom-0 w-1 bg-accent shadow-[0_0_10px_var(--accent)]"
                        initial={false}
                      />
                    )}
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/0 to-transparent group-hover:via-accent/5 transition-all duration-500" />
                  </motion.a>
                ))}
              </nav>

              {/* Mobile Actions */}
              <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-white/10 space-y-3 bg-[rgba(5,5,5,0.95)]">
                <motion.a 
                  href="/cv.pdf" 
                  download
                  aria-label={tNav("downloadCv")}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                  className="flex items-center justify-center gap-3 px-6 py-4 text-sm font-mono tracking-wider uppercase border-2 border-accent/40 text-accent hover:bg-accent hover:text-black transition-all duration-300 group"
                >
                  <span>{tNav("systemExport")}</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="group-hover:translate-y-0.5 transition-transform duration-300">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                </motion.a>

                <motion.button 
                  onClick={toggleReduceMotion}
                  aria-label={reduceMotion ? "Enable animations" : "Disable animations"}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
                  className={`w-full px-6 py-4 text-sm font-mono tracking-wider uppercase border-2 transition-all duration-300
                    ${reduceMotion 
                      ? 'bg-accent text-black border-accent shadow-[0_0_20px_rgba(0,240,255,0.4)]' 
                      : 'text-gray-400 border-white/10 hover:border-gray-300 hover:text-white'
                    }
                  `}
                >
                  {reduceMotion ? 'MOTION: OFF' : 'MOTION: ON'}
                </motion.button>

                {/* Mobile language toggle - pill */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.65, type: "spring", stiffness: 200 }}
                  className="w-full flex items-center justify-center"
                  aria-label="Language selector"
                >
                  <div className="inline-flex items-center rounded-full border-2 border-white/10 bg-black/40 overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setLocale("en")}
                      className={`relative px-5 py-3 text-xs font-mono uppercase tracking-wider transition-colors duration-200 ${
                        locale === "en"
                          ? "text-black"
                          : "text-gray-300 hover:text-white"
                      }`}
                    >
                      EN
                      {locale === "en" && (
                        <span className="absolute inset-0 -z-10 bg-accent" />
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => setLocale("id")}
                      className={`relative px-5 py-3 text-xs font-mono uppercase tracking-wider border-l border-white/10 transition-colors duration-200 ${
                        locale === "id"
                          ? "text-black"
                          : "text-gray-300 hover:text-white"
                      }`}
                    >
                      ID
                      {locale === "id" && (
                        <span className="absolute inset-0 -z-10 bg-accent" />
                      )}
                    </button>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
