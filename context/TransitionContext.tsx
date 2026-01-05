"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface TransitionContextType {
  navigate: (href: string) => void;
  isTransitioning: boolean;
  targetHref: string | null;
  resetTransition: () => void;
}

const TransitionContext = createContext<TransitionContextType | undefined>(undefined);

export function TransitionProvider({ children }: { children: ReactNode }) {
  const [isTransitioning, setTransitioning] = useState(false);
  const [targetHref, setTargetHref] = useState<string | null>(null);

  const navigate = (href: string) => {
    if (isTransitioning) return;
    setTargetHref(href);
    setTransitioning(true);
  };

  const resetTransition = () => {
    setTransitioning(false);
    setTargetHref(null);
  };

  return (
    <TransitionContext.Provider value={{ navigate, isTransitioning, targetHref, resetTransition }}>
      {children}
    </TransitionContext.Provider>
  );
}

export function useTransition() {
  const context = useContext(TransitionContext);
  if (context === undefined) {
    throw new Error("useTransition must be used within a TransitionProvider");
  }
  return context;
}