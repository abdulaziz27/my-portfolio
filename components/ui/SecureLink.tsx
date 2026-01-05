"use client";

import { useTransition } from "@/context/TransitionContext";
import React, { ReactNode } from "react";
import Link from "next/link";

interface SecureLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
}

export default function SecureLink({ href, children, className }: SecureLinkProps) {
  const { navigate } = useTransition();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate(href);
  };

  return (
    <Link 
      href={href} 
      onClick={handleClick} 
      className={className}
      scroll={false} // Prevent Next.js scroll handling since we do it manually or via overlay
    >
      {children}
    </Link>
  );
}