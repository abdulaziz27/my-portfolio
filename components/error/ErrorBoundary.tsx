"use client";

import React, { Component, ReactNode } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen flex items-center justify-center bg-black px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl w-full text-center"
          >
            <div className="mb-8">
              <h1 className="text-6xl md:text-8xl font-bold text-white mb-4 tracking-tighter">
                SYSTEM <span className="text-accent">ERROR</span>
              </h1>
              <div className="h-[2px] w-32 bg-accent mx-auto mb-6" />
              <p className="text-gray-400 font-mono text-sm uppercase tracking-widest mb-2">
                CRITICAL FAILURE DETECTED
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 p-8 backdrop-blur-sm mb-8">
              <div className="text-left font-mono text-xs text-gray-400 space-y-2">
                <p>
                  <span className="text-accent">{">"}</span> Error Code:{" "}
                  <span className="text-white">
                    {this.state.error?.name || "UNKNOWN"}
                  </span>
                </p>
                <p>
                  <span className="text-accent">{">"}</span> Message:{" "}
                  <span className="text-white">
                    {this.state.error?.message || "An unexpected error occurred"}
                  </span>
                </p>
                <p className="pt-4 text-gray-500">
                  <span className="text-accent">{">"}</span> Attempting recovery...
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => {
                  this.setState({ hasError: false, error: null });
                  window.location.reload();
                }}
                className="px-6 py-3 bg-accent text-black font-mono text-sm uppercase tracking-wider hover:bg-white transition-colors border-2 border-accent"
              >
                RELOAD SYSTEM
              </button>
              <Link
                href="/"
                className="px-6 py-3 bg-white text-black font-mono font-bold uppercase tracking-widest hover:bg-accent transition-colors border-2 border-white"
              >
                Reboot System
              </Link>
            </div>
          </motion.div>
        </div>
      );
    }

    return this.props.children;
  }
}