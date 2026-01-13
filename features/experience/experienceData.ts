export type ExperienceType = "fulltime" | "parttime" | "internship" | "bootcamp";

export interface Experience {
  id: number;
  type: ExperienceType;
  company: string;
  position: string;
  location: string;
  startDate: string; // Format: "YYYY-MM"
  endDate: string | "present"; // "present" for current role
  techStack: string[];
  achievements: {
    en: string[];
    id: string[];
  };
  description?: {
    en: string;
    id: string;
  };
}

export const experiences: Experience[] = [
  {
    id: 1,
    type: "fulltime",
    company: "Dragonfortune.ai",
    position: "Web3 Analytics Engineer",
    location: "Surabaya, East Java, Indonesia",
    startDate: "2025-10",
    endDate: "2025-12",
    techStack: ["Web3", "Blockchain Analytics", "Python", "SQL", "Data Visualization"],
    achievements: {
      en: [
        "Developed analytics dashboards for blockchain transaction monitoring and insights",
        "Built data pipelines to process and analyze on-chain data from multiple blockchain networks",
        "Created automated reporting systems for Web3 metrics and KPIs",
      ],
      id: [
        "Mengembangkan dashboard analitik untuk monitoring dan insights transaksi blockchain",
        "Membangun data pipeline untuk memproses dan menganalisis data on-chain dari berbagai jaringan blockchain",
        "Membuat sistem pelaporan otomatis untuk metrik dan KPI Web3",
      ],
    },
    description: {
      en: "Full-time project-based role (remote) focusing on Web3 analytics, blockchain data analysis, and building insights dashboards for decentralized applications.",
      id: "Peran full-time berbasis proyek (remote) fokus pada analitik Web3, analisis data blockchain, dan membangun dashboard insights untuk aplikasi terdesentralisasi.",
    },
  },
  {
    id: 2,
    type: "fulltime",
    company: "PT MagerCoding Digital Indonesia",
    position: "Software Engineer",
    location: "Purwokerto, Central Java, Indonesia",
    startDate: "2024-07",
    endDate: "2026-01",
    techStack: ["Laravel", "Golang", "Python", "Tailwind CSS", "WordPress", "PostgreSQL", "RESTful API"],
    achievements: {
      en: [
        "Developed and maintained web profiles using WordPress, and architected backend systems for restaurant POS and UMKM platforms",
        "Built scalable RESTful APIs and led system design for international clients",
        "Led a development team to deliver high-quality, timely projects using Laravel, Golang, and Tailwind CSS",
        "Worked as fullstack/back-end developer using Laravel, Golang, and Python to deliver robust web solutions",
        "Collaborated with designers, marketers, and business owners to align solutions with business goals",
      ],
      id: [
        "Mengembangkan dan memelihara profil web menggunakan WordPress, serta merancang sistem backend untuk platform POS restoran dan UMKM",
        "Membangun RESTful API yang scalable dan memimpin desain sistem untuk klien internasional",
        "Memimpin tim pengembangan untuk menyelesaikan proyek berkualitas tinggi dan tepat waktu menggunakan Laravel, Golang, dan Tailwind CSS",
        "Bekerja sebagai fullstack/back-end developer menggunakan Laravel, Golang, dan Python untuk menghadirkan solusi web yang robust",
        "Berkolaborasi dengan designer, marketer, dan pemilik bisnis untuk menyelaraskan solusi dengan tujuan bisnis",
      ],
    },
    description: {
      en: "Full-stack and backend development focusing on scalable web applications, POS systems, and system architecture for international clients.",
      id: "Pengembangan full-stack dan backend fokus pada aplikasi web scalable, sistem POS, dan arsitektur sistem untuk klien internasional.",
    },
  },
  {
    id: 3,
    type: "bootcamp",
    company: "Bangkit led by Google, Goto, and Traveloka",
    position: "Machine Learning & Mobile Development Cohort",
    location: "Remote",
    startDate: "2023-08",
    endDate: "2024-12",
    techStack: ["Python", "TensorFlow", "Kotlin", "Jetpack Compose", "Computer Vision", "NLP", "Generative AI"],
    achievements: {
      en: [
        "Completed 900+ hours of intensive machine learning training with TensorFlow, focusing on real-world applications and collaborative development",
        "Gained hands-on experience in computer vision, NLP, and generative AI, including image classification and object detection",
        "Led ML division team to develop a CNN-based batik pattern classification model for Batikan, a batik recognition app",
        "Completed 900+ hours of intensive mobile development training using Kotlin and Jetpack Compose, with a focus on practical skills and teamwork",
        "Led Android team to develop InSightMate, an assistive app for visually impaired users with features like banknote detection, color recognition, and text scanning",
        "Integrated machine learning models for real-time on-device inference and seamless app performance",
        "Strengthened both technical and soft skills through project-based learning and team collaboration",
      ],
      id: [
        "Menyelesaikan 900+ jam pelatihan machine learning intensif dengan TensorFlow, fokus pada aplikasi dunia nyata dan pengembangan kolaboratif",
        "Mendapatkan pengalaman langsung dalam computer vision, NLP, dan generative AI, termasuk klasifikasi gambar dan deteksi objek",
        "Memimpin tim divisi ML untuk mengembangkan model klasifikasi pola batik berbasis CNN untuk Batikan, aplikasi pengenalan batik",
        "Menyelesaikan 900+ jam pelatihan mobile development intensif menggunakan Kotlin dan Jetpack Compose, fokus pada keterampilan praktis dan kerja tim",
        "Memimpin tim Android untuk mengembangkan InSightMate, aplikasi bantu untuk pengguna tunanetra dengan fitur deteksi uang kertas, pengenalan warna, dan pemindaian teks",
        "Mengintegrasikan model machine learning untuk inferensi real-time on-device dan performa aplikasi yang mulus",
        "Memperkuat keterampilan teknis dan soft skills melalui pembelajaran berbasis proyek dan kolaborasi tim",
      ],
    },
    description: {
      en: "Intensive apprenticeship program combining machine learning and mobile development tracks, focusing on real-world applications, team leadership, and collaborative project development.",
      id: "Program apprenticeship intensif yang menggabungkan track machine learning dan mobile development, fokus pada aplikasi dunia nyata, kepemimpinan tim, dan pengembangan proyek kolaboratif.",
    },
  },
  {
    id: 4,
    type: "internship",
    company: "PT ISMATA NUSANTARA ABADI",
    position: "Odoo Developer Intern",
    location: "Bekasi, West Java, Indonesia",
    startDate: "2019-12",
    endDate: "2020-03",
    techStack: ["Python", "Odoo", "HTML", "CSS"],
    achievements: {
      en: [
        "Completed HTML, CSS, and Python courses on codesaya.com and codecademy.com to enhance technical skills",
        "Developed web-based applications using Odoo, including laundry services, Odoo training, library management, and travel umrah as training projects",
      ],
      id: [
        "Menyelesaikan kursus HTML, CSS, dan Python di codesaya.com dan codecademy.com untuk meningkatkan keterampilan teknis",
        "Mengembangkan aplikasi berbasis web menggunakan Odoo, termasuk layanan laundry, pelatihan Odoo, manajemen perpustakaan, dan travel umrah sebagai proyek pelatihan",
      ],
    },
    description: {
      en: "Internship focused on learning Odoo framework and developing business management applications.",
      id: "Magang fokus pada pembelajaran framework Odoo dan pengembangan aplikasi manajemen bisnis.",
    },
  },
];

// Sort experiences by endDate descending (newest first)
export const sortedExperiences: Experience[] = [...experiences].sort((a, b) => {
  // Handle "present" as the most recent
  if (a.endDate === "present") return -1;
  if (b.endDate === "present") return 1;
  
  // Compare by endDate (when it ended)
  const endDateA = a.endDate;
  const endDateB = b.endDate;
  
  // Compare dates (YYYY-MM format) - descending order
  if (endDateA > endDateB) return -1;
  if (endDateA < endDateB) return 1;
  
  // If endDate is the same, sort by startDate descending as tiebreaker
  if (a.startDate > b.startDate) return -1;
  if (a.startDate < b.startDate) return 1;
  return 0;
});
