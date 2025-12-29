import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import MagneticCursor from "@/components/ui/MagneticCursor";
import Preloader from "@/components/loader/Preloader";
import Navbar from "@/components/ui/Navbar";
import { projects } from "@/features/work/projectData";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Architect | Senior Creative Developer",
  description: "Elite-Tier Portfolio for High-End Web Solutions. Specializing in ERP, POS, and E-commerce for International Markets.",
  keywords: ["Software Engineer", "Creative Developer", "Next.js", "Three.js", "Indonesia", "Singapore", "Japan"],
  openGraph: {
    title: "Digital Architect | Senior Creative Developer",
    description: "Elite-Tier Portfolio for High-End Web Solutions. Specializing in ERP, POS, and E-commerce for International Markets.",
    type: "profile",
    locale: "en_US",
    images: [
        {
            url: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&h=630", // Placeholder OG
            width: 1200,
            height: 630,
            alt: "Digital Architect Portfolio",
        }
    ]
  }
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  
  // Construct Global JSON-LD
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Digital Architect",
    "image": "https://images.unsplash.com/photo-1550751827-4bd374c3f58b", // Branding Image
    "url": "https://portfolio.com",
    "jobTitle": "Senior Creative Developer",
    "description": "Specializing in High-Performance WebGL, ERP Systems, and International Commerce Solutions.",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "ID",
      "addressRegion": "Jakarta"
    },
    "areaServed": ["Indonesia", "Singapore", "Japan", "Vietnam", "Malaysia"],
    "priceRange": "$$$",
    "knowsAbout": ["Next.js", "React Three Fiber", "System Architecture", "Cloud Infrastructure"],
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
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <Preloader />
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
        
        <Navbar />
        <MagneticCursor />
        <div className="bg-grain" />
        {children}
        {modal}
      </body>
    </html>
  );
}
