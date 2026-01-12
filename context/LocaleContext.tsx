"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { Locale, Namespaces, translations } from "@/utils/translations";

type LocaleContextType = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (namespace: Namespaces, key: string) => string;
};

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>("en");
  const [hydrated, setHydrated] = useState(false);

  // Hydrate locale from localStorage (client-only)
  useEffect(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem("locale") : null;
    if (stored === "id" || stored === "en") {
      setLocale(stored);
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated && typeof window !== "undefined") {
      localStorage.setItem("locale", locale);
    }
  }, [locale, hydrated]);

  const value = useMemo<LocaleContextType>(() => {
    const t = (namespace: Namespaces, key: string) => {
      const localized = translations[locale]?.[namespace]?.[key];
      if (localized) return localized;
      // Fallback to English
      return translations.en[namespace]?.[key] ?? key;
    };

    return { locale, setLocale, t };
  }, [locale]);

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used within LocaleProvider");
  return ctx;
}

export function useTranslations(namespace: Namespaces) {
  const { t } = useLocale();
  return (key: string) => t(namespace, key);
}
