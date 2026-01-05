"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import Toast, { ToastProps } from "./Toast";

interface ToastContextType {
  showToast: (message: string, type: "success" | "error" | "info") => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return context;
}

export default function ToastProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<Omit<ToastProps, "onClose"> | null>(
    null
  );

  const showToast = (
    message: string,
    type: "success" | "error" | "info" = "info"
  ) => {
    setToast({ message, type, isVisible: true });
  };

  const closeToast = () => {
    setToast(null);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && (
        <Toast
          {...toast}
          onClose={closeToast}
          duration={toast.type === "error" ? 7000 : 5000}
        />
      )}
    </ToastContext.Provider>
  );
}

