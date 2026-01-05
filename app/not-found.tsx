"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl w-full text-center"
      >
        <div className="mb-8">
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="text-6xl md:text-8xl font-bold text-white mb-4 tracking-tighter"
          >
            404
          </motion.h1>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 128 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="h-[2px] bg-accent mx-auto mb-6"
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-gray-400 font-mono text-sm uppercase tracking-widest mb-2"
          >
            RESOURCE NOT FOUND
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-gray-500 font-mono text-xs"
          >
            The requested node does not exist in the system.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="bg-white/5 border border-white/10 p-8 backdrop-blur-sm mb-8"
        >
          <div className="text-left font-mono text-xs text-gray-400 space-y-2">
            <p>
              <span className="text-accent">{">"}</span> Status:{" "}
              <span className="text-white">404 NOT FOUND</span>
            </p>
            <p>
              <span className="text-accent">{">"}</span> Path:{" "}
              <span className="text-white">Invalid route detected</span>
            </p>
            <p className="pt-4 text-gray-500">
              <span className="text-accent">{">"}</span> Initiating redirect
              sequence...
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            href="/"
            className="px-6 py-3 bg-accent text-black font-mono text-sm uppercase tracking-wider hover:bg-white transition-colors border-2 border-accent"
          >
            RETURN HOME
          </Link>
          <Link
            href="/#work"
            className="px-6 py-3 border-2 border-white/20 text-white font-mono text-sm uppercase tracking-wider hover:border-accent hover:text-accent transition-colors"
          >
            VIEW PORTFOLIO
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}

