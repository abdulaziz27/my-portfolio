"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const bootSequences = [
  "INITIALIZING CROSS-BORDER ARCHITECT PROTOCOL...",
  "LOADING NEURAL ENGINE [v16.1.1]...",
  "DECODING ASSETS [THREE.JS, GSAP, REACT 19]...",
  "OPTIMIZING SHADERS...",
  "SYSTEM STATUS: OPTIMAL.",
  "WELCOME, ARCHITECT."
];

export default function Preloader() {
  const [index, setIndex] = useState(0);
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    if (index < bootSequences.length) {
      const timer = setTimeout(() => {
        setIndex(prev => prev + 1);
      }, Math.random() * 300 + 100);
      return () => clearTimeout(timer);
    } else {
      setTimeout(() => setComplete(true), 1000);
    }
  }, [index]);

  return (
    <AnimatePresence>
      {!complete && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[10000] bg-black flex flex-col items-center justify-center p-6 font-mono"
        >
          <div className="w-full max-w-xl">
            <div className="text-accent text-xs md:text-sm mb-4">
              {bootSequences.slice(0, index).map((line, i) => (
                <div key={i} className="mb-1">
                  <span className="opacity-50 mr-2">{">"}</span>
                  {line}
                </div>
              ))}
              {index < bootSequences.length && (
                <div className="animate-pulse flex items-center">
                  <span className="opacity-50 mr-2">{">"}</span>
                  <div className="w-2 h-4 bg-accent" />
                </div>
              )}
            </div>
            
            <div className="w-full h-[2px] bg-white/5 overflow-hidden mt-8">
                <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${(index / bootSequences.length) * 100}%` }}
                    className="h-full bg-accent shadow-[0_0_10px_var(--accent)]"
                />
            </div>
            
            <div className="mt-2 flex justify-between text-[10px] text-gray-400 tracking-widest">
                <span>SYSTEM_BOOT_SEQUENCE</span>
                <span>{Math.round((index / bootSequences.length) * 100)}%</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
