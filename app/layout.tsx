import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import MagneticCursor from "@/components/ui/MagneticCursor";
import Preloader from "@/components/loader/Preloader";
import Navbar from "@/components/ui/Navbar";
import ErrorBoundary from "@/components/error/ErrorBoundary";
import ToastProvider from "@/components/ui/ToastProvider";
import { projects } from "@/features/work/projectData";
import { TransitionProvider } from "@/context/TransitionContext";
import PageTransitionOverlay from "@/components/ui/PageTransitionOverlay";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Software Engineer | Creative Developer",
  description: "Portfolio for Web Solutions. Specializing in ERP, POS, and E-commerce development.",
  keywords: ["Software Engineer", "Creative Developer", "Next.js", "Three.js", "Indonesia", "Singapore", "Japan"],
  metadataBase: new URL('https://abdulazizz.com'),
  openGraph: {
    title: "Software Engineer | Creative Developer",
    description: "Portfolio for Web Solutions. Specializing in ERP, POS, and E-commerce development.",
    type: "profile",
    locale: "en_US",
    url: "https://abdulazizz.com",
    siteName: "Software Engineer Portfolio",
    images: [
        {
            url: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&h=630", // Placeholder OG
            width: 1200,
            height: 630,
            alt: "Software Engineer Portfolio",
        }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Software Engineer | Creative Developer",
    description: "Portfolio for Web Solutions. Specializing in ERP, POS, and E-commerce development.",
    creator: "@itsabdulaziz",
    images: ["https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&h=630"],
  },
};

export function generateViewport() {
  return {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    themeColor: [
      { media: '(prefers-color-scheme: light)', color: '#050505' },
      { media: '(prefers-color-scheme: dark)', color: '#00f0ff' },
    ],
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  // Construct Global JSON-LD
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Software Engineer",
    "image": "https://images.unsplash.com/photo-1550751827-4bd374c3f58b", // Branding Image
    "url": "https://abdulazizz.com",
    "jobTitle": "Software Engineer & Creative Developer",
    "description": "Specializing in Web Development, ERP Systems, and E-commerce Solutions.",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "ID",
      "addressRegion": "Jakarta"
    },
    "areaServed": ["Indonesia", "Singapore", "Japan", "Vietnam", "Malaysia"],
    "priceRange": "$$",
    "knowsAbout": ["Next.js", "React", "Three.js", "Web Development", "ERP Systems"],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Software Development Services",
      "itemListElement": projects.map((project) => ({
        "@type": "Offer",
        "itemOffered": {
            "@type": "Service",
            "name": project.title,
            "description": project.description
        }
      }))
    }
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <a
          href="#work"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[10000] focus:px-4 focus:py-2 focus:bg-accent focus:text-black focus:font-mono focus:text-sm focus:uppercase focus:tracking-wider focus:outline-none focus:ring-2 focus:ring-white"
        >
          Skip to content
        </a>
        <Preloader />
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
        
        <ErrorBoundary>
          <ToastProvider>
            <TransitionProvider>
              <PageTransitionOverlay />
              <Navbar />
              <MagneticCursor />
              <div className="bg-grain" />
              {children}
            </TransitionProvider>
          </ToastProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
