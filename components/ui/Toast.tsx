"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";

export interface ToastProps {
  message: string;
  type: "success" | "error" | "info";
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
}

export default function Toast({
  message,
  type,
  isVisible,
  onClose,
  duration = 5000,
}: ToastProps) {
  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  const typeStyles = {
    success: "bg-accent text-black border-accent",
    error: "bg-red-500 text-white border-red-500",
    info: "bg-blue-500 text-white border-blue-500",
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className={`fixed top-20 right-4 z-[10000] px-6 py-4 border-2 ${typeStyles[type]} font-mono text-sm uppercase tracking-wider shadow-lg backdrop-blur-sm max-w-md`}
        >
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-xs opacity-75">{">"}</span>
              <span>{message}</span>
            </div>
            <button
              onClick={onClose}
              className="opacity-75 hover:opacity-100 transition-opacity text-lg leading-none"
              aria-label="Close notification"
            >
              ×
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

