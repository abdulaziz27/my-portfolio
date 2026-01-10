export interface Project {
  id: number;
  title: string;
  category: string;
  description: string; 
  longDescription: string; 
  colSpan: string; 
  rowSpan: string; 
  color: string; 
  image: string;
  country: string;
  year: string;
  status: "LIVE" | "COMPLETED";
  liveUrl?: string; // New Optional Field
  techStack: string[];
  challenges: string;
  results: string;
  screenshotUrls: string[]; 
}

export const projects: Project[] = [
  {
    id: 1,
    title: "NEXUS ERP",
    category: "Enterprise System",
    description: "Cloud-based manufacturing ERP system for Japanese automotive company.",
    longDescription: "A cloud-based Enterprise Resource Planning system designed for automotive manufacturing operations.",
    colSpan: "md:col-span-2",
    rowSpan: "md:row-span-2",
    color: "#00f0ff",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1000&auto=format&fit=crop",
    country: "Japan",
    year: "2024",
    status: "LIVE",
    liveUrl: "https://nexus-erp-demo.com",
    techStack: ["Next.js 15", "PostgreSQL", "Kafka", "Docker"],
    challenges: "The client needed to synchronize real-time production data across multiple locations efficiently.",
    results: "Built a system that streamlined data synchronization and improved operational efficiency.",
    screenshotUrls: [
        "https://images.unsplash.com/photo-1518770660439-4636190af475",
        "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
        "https://images.unsplash.com/photo-1558494949-ef010cbdcc4b"
    ]
  },
  {
    id: 2,
    title: "VANGUARD POS",
    category: "Retail Tech",
    description: "Omnichannel POS solution for 500+ retail stores in Jakarta.",
    longDescription: "A robust, offline-first Point of Sale solution built to handle the complex demands of a large-scale retail chain.",
    colSpan: "md:col-span-1",
    rowSpan: "md:row-span-1",
    color: "#50c878",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?q=80&w=1000&auto=format&fit=crop",
    country: "Indonesia",
    year: "2023",
    status: "LIVE",
    liveUrl: "https://magercoding.com",
    techStack: ["React Native", "Node.js", "Redis", "AWS"],
    challenges: "Legacy systems were causing frequent downtime during peak hours, leading to significant revenue loss.",
    results: "Developed an offline-first POS system that ensures 100% operational uptime.",
    screenshotUrls: [
        "https://images.unsplash.com/photo-1556742049-0cfed4f7a07d",
        "https://images.unsplash.com/photo-1556740734-792835264581",
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f"
    ]
  },
  {
    id: 3,
    title: "BATIK GUMELEM", // Updated Title based on your input example
    category: "E-Commerce",
    description: "Headless Shopify Plus architecture for a heritage batik brand.",
    longDescription: "A bespoke headless e-commerce experience designed for a heritage batik label, focusing on preserving culture through digital storytelling.",
    colSpan: "md:col-span-1",
    rowSpan: "md:row-span-2",
    color: "#ff0055",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop",
    country: "Indonesia",
    year: "2024",
    status: "LIVE",
    liveUrl: "https://batikgumelem.com",
    techStack: ["Next.js", "Shopify Hydrogen", "Sanity CMS", "Vercel"],
    challenges: "The brand required a highly customized shopping experience that traditional templates couldn't provide.",
    results: "Built a headless commerce platform with optimized performance and improved user experience.",
    screenshotUrls: [
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
        "https://images.unsplash.com/photo-1523381210434-271e8be1f52b",
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c"
    ]
  },
  // ... Keeping other projects but assuming they can have liveUrl too
  {
    id: 4,
    title: "SIDIK PENSI",
    category: "SaaS",
    description: "Student management system for Indonesian schools.",
    longDescription: "A comprehensive academic information system handling grades, attendance, and financial records for multiple schools.",
    colSpan: "md:col-span-2",
    rowSpan: "md:row-span-1",
    color: "#ffd700",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1000&auto=format&fit=crop",
    country: "Indonesia",
    year: "2023",
    status: "LIVE",
    liveUrl: "https://sidikpensi.com",
    techStack: ["React", "Laravel", "MySQL", "Redis"],
    challenges: "Schools needed a unified platform to manage student data securely and efficiently.",
    results: "Built a multi-tenant SaaS platform serving multiple schools with secure data management.",
    screenshotUrls: [
        "https://images.unsplash.com/photo-1552664730-d307ca884978",
        "https://images.unsplash.com/photo-1531403001884-24adadad1861",
        "https://images.unsplash.com/photo-1542744173-8e7e53415bb0"
    ]
  },
  {
    id: 5,
    title: "ECHO FINANCE",
    category: "Fintech",
    description: "Real-time crypto trading dashboard with WebGL data visualization.",
    longDescription: "An advanced financial dashboard providing real-time visualization of cryptocurrency market trends.",
    colSpan: "md:col-span-1",
    rowSpan: "md:row-span-1",
    color: "#00f0ff",
    image: "https://images.unsplash.com/photo-1611974765270-ca1258634369?q=80&w=1000&auto=format&fit=crop",
    country: "Vietnam",
    year: "2024",
    status: "LIVE",
    techStack: ["Three.js", "React", "Rust", "WebAssembly"],
    challenges: "Visualizing thousands of concurrent market data points in 3D without crashing the browser.",
    results: "Utilized WebGL and Rust/Wasm to enable smooth 60fps rendering of complex datasets.",
    screenshotUrls: [
        "https://images.unsplash.com/photo-1611974765270-ca1258634369",
        "https://images.unsplash.com/photo-1639762681485-074b7f938ba0",
        "https://images.unsplash.com/photo-1642104704074-907c0698cbd9"
    ]
  },
  {
    id: 6,
    title: "HYPERION LOGISTICS",
    category: "Supply Chain",
    description: "AI-driven route optimization for a Vietnamese logistics fleet.",
    longDescription: "An intelligent logistics platform leveraging machine learning to optimize delivery routes.",
    colSpan: "md:col-span-1",
    rowSpan: "md:row-span-1",
    color: "#50c878",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1000&auto=format&fit=crop",
    country: "Vietnam",
    year: "2023",
    status: "LIVE",
    techStack: ["Python", "TensorFlow", "Node.js", "Google Maps API"],
    challenges: "Inefficient routing was causing high fuel costs and delayed deliveries.",
    results: "Implemented an AI model that predicts traffic patterns, resulting in a 20% reduction in fuel consumption.",
    screenshotUrls: [
        "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d",
        "https://images.unsplash.com/photo-1580674285054-bed31e145f59",
        "https://images.unsplash.com/photo-1590496793929-36417d3127de"
    ]
  },
  {
    id: 7,
    title: "ZENITH HEALTH",
    category: "MedTech",
    description: "Telemedicine platform connecting patients in rural Malaysia.",
    longDescription: "A telemedicine solution designed to bridge the healthcare gap in rural areas.",
    colSpan: "md:col-span-2",
    rowSpan: "md:row-span-1",
    color: "#ff0055",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1000&auto=format&fit=crop",
    country: "Malaysia",
    year: "2022",
    status: "LIVE",
    techStack: ["WebRTC", "React", "Firebase", "Twilio"],
    challenges: "Providing reliable video consultations in areas with low-bandwidth internet connectivity.",
    results: "Customized WebRTC protocols ensuring stable consultations on 3G networks.",
    screenshotUrls: [
        "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d",
        "https://images.unsplash.com/photo-1584981224119-67139b89787a",
        "https://images.unsplash.com/photo-1551076805-e1869033e561"
    ]
  },
  {
    id: 8,
    title: "QUANTUM REALTY",
    category: "Real Estate",
    description: "Virtual tour platform using Three.js for luxury properties in Bali.",
    longDescription: "An interactive real estate showcase platform allowing potential buyers to explore properties in 3D.",
    colSpan: "md:col-span-2",
    rowSpan: "md:row-span-2",
    color: "#00f0ff",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1000&auto=format&fit=crop",
    country: "Indonesia",
    year: "2024",
    status: "LIVE",
    techStack: ["Three.js", "Next.js", "GSAP", "Blender"],
    challenges: "Real estate clients needed a way to showcase properties in 3D for better visualization.",
    results: "Created an interactive 3D platform that improved customer engagement and property visualization.",
    screenshotUrls: [
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
        "https://images.unsplash.com/photo-1600566753190-17f0bb2a6c3e",
        "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0"
    ]
  },
  {
    id: 9,
    title: "CYBER SECURITY",
    category: "Security",
    description: "Penetration testing dashboard for banking clients.",
    longDescription: "A comprehensive security dashboard for monitoring threats and managing penetration tests.",
    colSpan: "md:col-span-1",
    rowSpan: "md:row-span-1",
    color: "#ffd700",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000&auto=format&fit=crop",
    country: "Singapore",
    year: "2023",
    status: "LIVE",
    techStack: ["Python", "React", "Elasticsearch", "Docker"],
    challenges: "Security teams needed a way to visualize attack surfaces and prioritize threats.",
    results: "Built a centralized dashboard that uses ML to highlight anomalies, reducing threat response time by 60%.",
    screenshotUrls: [
        "https://images.unsplash.com/photo-1550751827-4bd374c3f58b",
        "https://images.unsplash.com/photo-1558494949-ef010cbdcc4b",
        "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f"
    ]
  },
  {
    id: 10,
    title: "URBAN FARM",
    category: "AgriTech",
    description: "IoT monitoring system for vertical farming in Singapore.",
    longDescription: "An IoT-enabled platform for managing vertical farms with precision control.",
    colSpan: "md:col-span-1",
    rowSpan: "md:row-span-2",
    color: "#50c878",
    image: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?q=80&w=1000&auto=format&fit=crop",
    country: "Singapore",
    year: "2024",
    status: "LIVE",
    techStack: ["C++", "MQTT", "Node.js", "InfluxDB"],
    challenges: "Maintaining optimal growing conditions in vertical farms requires precise real-time control.",
    results: "Deployed an automated control system that optimized resource usage and increased crop yields by 15%.",
    screenshotUrls: [
        "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8",
        "https://images.unsplash.com/photo-1558449028-b53a39d100fc",
        "https://images.unsplash.com/photo-1581092921461-39b9d08a9b21"
    ]
  },
  {
    id: 11,
    title: "NOMAD TRAVEL",
    category: "Travel",
    description: "AI itinerary generator for digital nomads in SEA.",
    longDescription: "A smart travel planning tool specifically for digital nomads suggesting SEA destinations.",
    colSpan: "md:col-span-1",
    rowSpan: "md:row-span-1",
    color: "#ff0055",
    image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=1000&auto=format&fit=crop",
    country: "Malaysia",
    year: "2023",
    status: "LIVE",
    techStack: ["Next.js", "OpenAI API", "PostgreSQL", "Tailwind CSS"],
    challenges: "Digital nomads spend hours researching visas, internet speeds, and co-working spaces.",
    results: "Created an AI-powered assistant that generates personalized itineraries, cutting travel planning time by 70%.",
    screenshotUrls: [
        "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800",
        "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1",
        "https://images.unsplash.com/photo-1501785888041-af3ef285b470"
    ]
  },
  {
    id: 12,
    title: "PIXEL ART",
    category: "Creative",
    description: "Generative NFT art collection platform.",
    longDescription: "A robust Web3 platform for minting and managing generative NFT art collections.",
    colSpan: "md:col-span-2",
    rowSpan: "md:row-span-1",
    color: "#00f0ff",
    image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1000&auto=format&fit=crop",
    country: "Vietnam",
    year: "2022",
    status: "COMPLETED",
    techStack: ["Solidity", "Hardhat", "React", "IPFS"],
    challenges: "Launching high-volume NFT collections without astronomical gas fees.",
    results: "Built an optimized smart contract system that efficiently handles large volumes of NFT transactions.",
    screenshotUrls: [
        "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e",
        "https://images.unsplash.com/photo-1643101809754-43a91784611a",
        "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe"
    ]
  },
  {
    id: 13,
    title: "ALPHA EDU",
    category: "EdTech",
    description: "LMS for coding bootcamps in Vietnam.",
    longDescription: "A modern Learning Management System tailored for coding education with sandboxes.",
    colSpan: "md:col-span-1",
    rowSpan: "md:row-span-1",
    color: "#ffd700",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1000&auto=format&fit=crop",
    country: "Vietnam",
    year: "2023",
    status: "LIVE",
    techStack: ["Next.js", "Prisma", "AWS S3", "Mux"],
    challenges: "Existing LMS platforms lacked the interactive features needed for effective remote coding education.",
    results: "Built a custom platform with integrated code playgrounds and peer review workflows.",
    screenshotUrls: [
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
        "https://images.unsplash.com/photo-1517694712202-14dd9538aa97",
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
    ]
  },
  {
    id: 14,
    title: "BETA BANK",
    category: "Banking",
    description: "Mobile banking app redesign for a Malaysian bank.",
    longDescription: "A complete redesign of a mobile banking application focusing on intuitive journeys.",
    colSpan: "md:col-span-1",
    rowSpan: "md:row-span-1",
    color: "#50c878",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1000&auto=format&fit=crop",
    country: "Malaysia",
    year: "2024",
    status: "LIVE",
    techStack: ["Flutter", "Dart", "Firebase", "gRPC"],
    challenges: "The bank's legacy mobile app had poor UX and slow performance.",
    results: "Redesigned the app with a focus on performance, achieving a 40% increase in mobile transactions.",
    screenshotUrls: [
        "https://images.unsplash.com/photo-1563986768609-322da13575f3",
        "https://images.unsplash.com/photo-1556742560-60a058221e44",
        "https://images.unsplash.com/photo-1620714223084-8fcacc6df38d"
    ]
  },
  {
    id: 15,
    title: "OMEGA GAMING",
    category: "Gaming",
    description: "Esports tournament management platform.",
    longDescription: "A specialized platform for organizing and managing large-scale esports tournaments.",
    colSpan: "md:col-span-2",
    rowSpan: "md:row-span-1",
    color: "#ff0055",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1000&auto=format&fit=crop",
    country: "Singapore",
    year: "2023",
    status: "LIVE",
    techStack: ["Next.js", "Pusher", "Go", "Redis"],
    challenges: "Coordinating real-time tournament brackets for thousands of simultaneous players.",
    results: "Developed a real-time event engine using WebSockets and Go, ensuring sub-100ms updates.",
    screenshotUrls: [
        "https://images.unsplash.com/photo-1542751371-adc38448a05e",
        "https://images.unsplash.com/photo-1511512578047-dfb367046420",
        "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8"
    ]
  },
];
