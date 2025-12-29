import ProjectDetailView from "@/features/work/ProjectDetailView";
import { projects } from "@/features/work/projectData";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { use } from "react";

type Params = Promise<{ id: string }>;

// 1. Dynamic Metadata Generation
export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { id } = await params;
  const project = projects.find((p) => p.id === Number(id));

  if (!project) return {};

  const title = `${project.title} | Senior Creative Developer`;
  const description = project.description;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      images: [
        {
          url: project.image,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
      locale: "en_US",
      siteName: "Digital Architect Portfolio",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [project.image],
      creator: "@digital_architect",
    },
  };
}

export default async function PhotoPage({ params }: { params: Params }) {
  const { id } = await params;
  const project = projects.find((p) => p.id === Number(id));

  if (!project) notFound();

  // 2. JSON-LD Schema for SoftwareSourceCode
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    "name": project.title,
    "description": project.description,
    "programmingLanguage": ["TypeScript", "Next.js", "Three.js", "GLSL"],
    "runtimePlatform": "Browser",
    "applicationCategory": project.category,
    "author": {
      "@type": "Person",
      "name": "Digital Architect",
      "jobTitle": "Senior Creative Developer"
    },
    "image": project.image,
    "datePublished": "2024-01-01" // Placeholder or dynamic if available
  };

  return (
    <div className="container mx-auto py-24 px-4">
        {/* Inject Schema */}
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        
      <div className="border border-white/10 rounded-lg overflow-hidden">
        <ProjectDetailView id={id} />
      </div>
    </div>
  );
}
