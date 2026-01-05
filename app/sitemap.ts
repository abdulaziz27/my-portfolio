import { MetadataRoute } from 'next';
import { projects } from '@/features/work/projectData';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://abdulazizz.com';
  
  // Home page
  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ];

  // Project detail pages
  const projectRoutes: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${baseUrl}/work/${project.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [...routes, ...projectRoutes];
}

