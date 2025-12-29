export interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  colSpan: string; 
  rowSpan: string; 
  color: string; 
  image: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "NEXUS ERP",
    category: "Enterprise System",
    description: "Cloud-native manufacturing ERP for a Japanese automotive giant.",
    colSpan: "md:col-span-2",
    rowSpan: "md:row-span-2",
    color: "#00f0ff",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1000&auto=format&fit=crop", // Chip/Tech
  },
  {
    id: 2,
    title: "VANGUARD POS",
    category: "Retail Tech",
    description: "Omnichannel POS solution for 500+ retail stores in Jakarta.",
    colSpan: "md:col-span-1",
    rowSpan: "md:row-span-1",
    color: "#50c878",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?q=80&w=1000&auto=format&fit=crop", // Payment
  },
  {
    id: 3,
    title: "AURA COMMERCE",
    category: "E-Commerce",
    description: "Headless Shopify Plus architecture for a Singaporean fashion brand.",
    colSpan: "md:col-span-1",
    rowSpan: "md:row-span-2",
    color: "#ff0055",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop", // Analytics/Graph
  },
  {
    id: 4,
    title: "KAIZEN FLOW",
    category: "SaaS",
    description: "Project management tool focused on Toyota Production System principles.",
    colSpan: "md:col-span-2",
    rowSpan: "md:row-span-1",
    color: "#ffd700",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1000&auto=format&fit=crop", // Team/Planning
  },
  {
    id: 5,
    title: "ECHO FINANCE",
    category: "Fintech",
    description: "Real-time crypto trading dashboard with WebGL data visualization.",
    colSpan: "md:col-span-1",
    rowSpan: "md:row-span-1",
    color: "#00f0ff",
    image: "https://images.unsplash.com/photo-1611974765270-ca1258634369?q=80&w=1000&auto=format&fit=crop", // Trading/Graph
  },
  {
    id: 6,
    title: "HYPERION LOGISTICS",
    category: "Supply Chain",
    description: "AI-driven route optimization for a Vietnamese logistics fleet.",
    colSpan: "md:col-span-1",
    rowSpan: "md:row-span-1",
    color: "#50c878",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1000&auto=format&fit=crop", // Logistics
  },
  {
    id: 7,
    title: "ZENITH HEALTH",
    category: "MedTech",
    description: "Telemedicine platform connecting patients in rural Malaysia.",
    colSpan: "md:col-span-2",
    rowSpan: "md:row-span-1",
    color: "#ff0055",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1000&auto=format&fit=crop", // Medical/Tech
  },
  {
    id: 8,
    title: "QUANTUM REALTY",
    category: "Real Estate",
    description: "Virtual tour platform using Three.js for luxury properties in Bali.",
    colSpan: "md:col-span-2",
    rowSpan: "md:row-span-2",
    color: "#00f0ff",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1000&auto=format&fit=crop", // Modern Architecture
  },
  {
    id: 9,
    title: "CYBER SECURITY",
    category: "Security",
    description: "Penetration testing dashboard for banking clients.",
    colSpan: "md:col-span-1",
    rowSpan: "md:row-span-1",
    color: "#ffd700",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000&auto=format&fit=crop", // Cyber Lock
  },
  {
    id: 10,
    title: "URBAN FARM",
    category: "AgriTech",
    description: "IoT monitoring system for vertical farming in Singapore.",
    colSpan: "md:col-span-1",
    rowSpan: "md:row-span-2",
    color: "#50c878",
    image: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?q=80&w=1000&auto=format&fit=crop", // Plant/Tech
  },
  {
    id: 11,
    title: "NOMAD TRAVEL",
    category: "Travel",
    description: "AI itinerary generator for digital nomads in SEA.",
    colSpan: "md:col-span-1",
    rowSpan: "md:row-span-1",
    color: "#ff0055",
    image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=1000&auto=format&fit=crop", // Travel/Nomad
  },
  {
    id: 12,
    title: "PIXEL ART",
    category: "Creative",
    description: "Generative NFT art collection platform.",
    colSpan: "md:col-span-2",
    rowSpan: "md:row-span-1",
    color: "#00f0ff",
    image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1000&auto=format&fit=crop", // Abstract Gradient
  },
  {
    id: 13,
    title: "ALPHA EDU",
    category: "EdTech",
    description: "LMS for coding bootcamps in Vietnam.",
    colSpan: "md:col-span-1",
    rowSpan: "md:row-span-1",
    color: "#ffd700",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1000&auto=format&fit=crop", // Code screen
  },
  {
    id: 14,
    title: "BETA BANK",
    category: "Banking",
    description: "Mobile banking app redesign for a Malaysian bank.",
    colSpan: "md:col-span-1",
    rowSpan: "md:row-span-1",
    color: "#50c878",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1000&auto=format&fit=crop", // Finance/App
  },
  {
    id: 15,
    title: "OMEGA GAMING",
    category: "Gaming",
    description: "Esports tournament management platform.",
    colSpan: "md:col-span-2",
    rowSpan: "md:row-span-1",
    color: "#ff0055",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1000&auto=format&fit=crop", // Gaming/Esports
  },
];
