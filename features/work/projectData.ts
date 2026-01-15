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
    title: "Bank BPR — Sistem Informasi Manajemen Terpadu (PRIMA)",
    category: "Internal Enterprise Web App",
    description: "Portal internal untuk modul HRIS, Debitur, Analisis Kredit, dan Arsip Dokumen dengan dashboard, workflow, dan RBAC.",
    longDescription: "Aplikasi full-stack internal untuk Bank BPR yang menyatukan beberapa domain operasional ke dalam satu portal: HRIS (pegawai, departemen, jabatan, absensi, cuti, lembur, KPI, payroll, rekrutmen, pengembangan, punishment), modul Debitur & dokumen, modul Analisis Kredit (submission, status tracking, scoring model, approval), serta Arsip/DMS terintegrasi untuk validasi dokumen. Frontend dibangun sebagai SPA React dengan Tailwind dan animasi, terhubung ke REST API Express/TypeScript dengan PostgreSQL dan autentikasi JWT serta manajemen hak akses berbasis role/permission.",
    colSpan: "md:col-span-1",
    rowSpan: "md:row-span-1",
    color: "#00f0ff",
    image: "/projects/prima/cover.png",
    country: "Indonesia (Jogja)",
    year: "2025",
    status: "COMPLETED",
    techStack: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "React Router",
      "Recharts",
      "Node.js",
      "Express",
      "PostgreSQL",
      "JWT",
      "bcrypt"
    ],
    challenges: "Mengintegrasikan banyak modul (HRIS, credit, debtor, archive) dalam satu portal dengan navigasi konsisten, sekaligus menjaga kontrol akses (RBAC) yang fleksibel dan aman. Menjembatani kebutuhan dashboard (agregasi data) dengan skema database yang rapi lewat migrasi SQL agar data tetap konsisten.",
    results: "Portal terpadu yang memudahkan monitoring (dashboard & chart), mempercepat alur kerja lintas modul (quick actions, recent items), dan menyediakan kontrol akses berbasis role/permission untuk memisahkan kewenangan tiap peran.",
    screenshotUrls: []
  },
  {
    id: 2,
    title: "Bank BPR API (Backend Service)",
    category: "REST API",
    description: "Backend Express + TypeScript untuk HRIS, Debitur, Kredit, Arsip, Notifikasi, dan RBAC berbasis PostgreSQL.",
    longDescription: "REST API berbasis Express/TypeScript yang melayani kebutuhan portal internal: autentikasi (login/register/verify/forgot password) dengan JWT + bcrypt, modul HRIS (employee/attendance/leave/overtime/KPI/payroll/organization/recruitment/development/punishments), modul Debitur & dokumen, modul Kredit (applications/submissions/scoring), Notifikasi, serta endpoint RBAC untuk modul/feature (permission) dan pengaturan akses per role. Database menggunakan PostgreSQL dengan migrasi SQL terstruktur.",
    colSpan: "md:col-span-1",
    rowSpan: "md:row-span-1",
    color: "#50c878",
    image: "/projects/prima-api/cover.png",
    country: "Indonesia (Jogja)",
    year: "2025",
    status: "COMPLETED",
    techStack: [
      "Node.js",
      "Express",
      "TypeScript",
      "PostgreSQL",
      "JWT",
      "bcrypt",
      "dotenv",
      "CORS"
    ],
    challenges: "Mendesain endpoint yang jelas untuk berbagai domain bisnis, sekaligus mengelola permission/feature yang dapat dikonfigurasi per role dan menjaga keamanan autentikasi (token lifecycle, password hashing).",
    results: "Satu API service yang konsisten untuk multi-modul, mendukung dashboard agregasi dan manajemen hak akses, dengan skema database yang terdokumentasi lewat migrasi.",
    screenshotUrls: []
  },
  {
    id: 3,
    title: "SNC HRIS Attendance Backend (Laravel)",
    category: "Backend / HRIS",
    description: "Backend HRIS absensi untuk mobile (Flutter) dan admin dashboard (Filament): GPS geofence + QR attendance, leave/permission/overtime workflow, notifikasi FCM, report export.",
    longDescription: "Sistem backend HRIS absensi berbasis Laravel yang menyediakan REST API untuk aplikasi mobile dan web admin dashboard (Filament). Fitur utama meliputi autentikasi token (Sanctum), manajemen karyawan/departemen/jabatan/shift, attendance GPS dengan validasi radius (Haversine) serta opsi QR code, pengajuan izin/cuti/lembur dengan approval workflow dan notifikasi (FCM + email), serta reporting/export (PDF/Excel). Terdokumentasi lengkap termasuk arsitektur flow, skema database, dan Postman collection. Implementasi multi-location menambahkan entitas lokasi (kebun) dengan geofence masing-masing serta assignment user per lokasi.",
    colSpan: "md:col-span-1",
    rowSpan: "md:row-span-1",
    color: "#00f0ff",
    // Placeholder: drop your cover image into /public/projects/hris-backend/cover.png (or change this path)
    image: "/projects/hris-backend/cover.png",
    country: "Indonesia",
    year: "2025",
    status: "LIVE",
    liveUrl: "https://absensi.ppksmarihat.com",
    techStack: [
      "Laravel 12",
      "PHP 8.3",
      "MySQL/MariaDB",
      "Filament v4",
      "Livewire v3",
      "Laravel Sanctum",
      "Laravel Fortify",
      "Firebase Cloud Messaging (kreait/laravel-firebase)",
      "Vite",
      "Axios",
      "DomPDF (barryvdh/laravel-dompdf)",
      "Maatwebsite Excel",
      "Endroid QR Code"
    ],
    challenges: "Menjaga konsistensi validasi lokasi antara client (UX) dan server (source of truth), serta mendesain multi-location yang tetap backward compatible (fallback ke company GPS) tanpa mematahkan client lama. Selain itu, workflow lembur/cuti butuh status tracking yang jelas untuk UI dan audit trail.",
    results: "Backend production-ready dengan dokumentasi API + flow + schema, Postman collection untuk testing, dan fitur multi-location (per-location geofence & attendance type) yang bisa dipakai lintas user/lokasi.",
    // Keep empty until you add real screenshots under /public/projects/hris-backend/
    screenshotUrls: []
  },
  {
    id: 4,
    title: "SNC HRIS Attendance Mobile App (Flutter)",
    category: "Mobile App / HRIS",
    description: "Aplikasi absensi karyawan (Flutter) terintegrasi API: login token, check-in/out berbasis GPS geofence atau QR, overtime/leave/permission, upload dokumen, peta & face recognition support.",
    longDescription: "Aplikasi mobile Flutter untuk absensi HRIS yang mengonsumsi API Laravel. Fitur mencakup autentikasi dan penyimpanan sesi, validasi geofence per lokasi kerja user (multi-location), check-in/check-out, riwayat absensi, pengajuan izin & cuti (dengan attachment), overtime flow (start/end), serta fitur pendukung seperti peta (Google Maps), QR scanning, dan pipeline face recognition (ML Kit + TFLite) untuk skenario tertentu. Konfigurasi endpoint menunjuk ke environment live backend.",
    colSpan: "md:col-span-1",
    rowSpan: "md:row-span-1",
    color: "#00f0ff",
    // Placeholder: drop your cover image into /public/projects/hris-mobile/cover.png (or change this path)
    image: "/projects/hris-mobile/cover.png",
    country: "Indonesia",
    year: "2025",
    status: "LIVE",
    liveUrl: "https://absensi.ppksmarihat.com",
    techStack: [
      "Flutter",
      "Dart",
      "flutter_bloc",
      "HTTP",
      "shared_preferences",
      "Geolocator",
      "Google Maps Flutter",
      "Mobile Scanner (QR)",
      "Camera",
      "Google ML Kit Face Detection",
      "TFLite (tflite_flutter)",
      "Flutter Local Notifications",
      "Firebase (config present via firebase.json)"
    ],
    challenges: "Sinkronisasi model auth/user/location dengan backend (multi-location) sambil menjaga backward compatibility. Validasi lokasi harus akurat namun tidak mengganggu UX; client-side dipakai untuk feedback cepat, server-side tetap final. Ada juga dependensi fitur lembur yang membutuhkan payload/ID konsisten antara endpoint status dan UI.",
    results: "Integrasi multi-location Phase 1 terdokumentasi dan base URL sudah mengarah ke environment live. App siap testing end-to-end (login, geofence per lokasi, check-in/out) dengan test accounts yang disebutkan di dokumentasi integrasi.",
    // Keep empty until you add real screenshots under /public/projects/hris-mobile/
    screenshotUrls: []
  },
  {
    id: 5,
    title: "Stock Analysis AI – Telegram Bot",
    category: "AI Telegram Bot & Backend API",
    description: "AI-powered Telegram bot for analyzing Indonesian stocks using OHLCV data, technical indicators, and LLM-generated reports.",
    longDescription: "Stock Analysis AI adalah sistem analisa saham berbasis AI untuk pasar Indonesia yang terdiri dari backend FastAPI dan bot Telegram. Backend mengambil data OHLCV dari Yahoo Finance, menghitung indikator teknikal utama (EMA20/50, RSI, MACD, support/resistance), menghasilkan chart dengan matplotlib, lalu mengirim ringkasan ke Google Gemini untuk membuat laporan analisis profesional dalam bahasa Indonesia. Bot Telegram menjadi antarmuka utama pengguna, mengelola kuota per user, mengirim ringkasan singkat, chart, dan opsi untuk mendapatkan full report sebagai file teks, dengan rencana integrasi pembayaran Midtrans untuk upgrade kuota.",
    colSpan: "md:col-span-1",
    rowSpan: "md:row-span-1",
    color: "#00f0ff",
    // Placeholder: drop your cover image into /public/projects/stock-analysis-ai/cover.png (or change this path)
    image: "/projects/stock-analysis-ai/cover.png",
    country: "Indonesia",
    // Assumed year; adjust if needed
    year: "2025",
    status: "LIVE",
    techStack: [
      "Python",
      "FastAPI",
      "Uvicorn",
      "Pydantic",
      "yfinance",
      "pandas",
      "numpy",
      "Google Gemini (google-genai)",
      "PostgreSQL",
      "SQLAlchemy",
      "Alembic",
      "Midtrans",
      "Matplotlib",
      "python-telegram-bot",
      "Mangum",
      "httpx",
      "python-dotenv",
      "python-multipart",
      "Vercel"
    ],
    challenges: "Mendesain arsitektur yang ringan namun andal untuk menggabungkan fetch data pasar real-time, perhitungan indikator teknikal, dan generasi laporan LLM dalam satu alur yang cukup cepat untuk pengalaman Telegram bot. Menangani limitasi kuota user, panjang pesan Telegram, dan integrasi antara backend serverless (Vercel) dengan worker bot yang berjalan di VPS atau server terpisah.",
    results: "Menciptakan MVP fungsional yang memungkinkan user Telegram menganalisa saham Indonesia hanya dengan mengirim perintah /analisa, mendapatkan ringkasan teknikal yang terstruktur, chart harga dengan overlay EMA, serta sistem kuota yang siap dihubungkan ke payment gateway Midtrans untuk monetisasi. Arsitektur backend siap scaling di Vercel dan dapat dioperasikan sebagai layanan jangka panjang.",
    // Keep empty until you add real screenshots under /public/projects/stock-analysis-ai/
    screenshotUrls: []
  },
  {
    id: 6,
    title: "XpressPOS Backend",
    category: "SaaS / Backend Platform",
    description: "Modern multi-tenant Point of Sale backend platform for high-growth retailers in Indonesia",
    longDescription: "XpressPOS is a comprehensive POS backend system built with Laravel 12 and Filament 4, designed for multi-outlet retail operations. The platform features advanced inventory tracking with hybrid FIFO costing, real-time analytics powered by Google Gemini AI, subscription-based SaaS architecture, and offline-first sync capabilities. It supports multiple stores per tenant, role-based access control (RBAC), automated COGS calculation, and comprehensive reporting. The system handles complex business scenarios including multi-tenant data isolation, cross-store inventory transfers, member loyalty programs, and integration with payment gateways like Xendit.",
    colSpan: "md:col-span-2",
    rowSpan: "md:row-span-2",
    color: "#2563eb",
    // Placeholder: drop your cover image into /public/projects/xpresspos/cover.png (or change this path)
    image: "/projects/xpresspos/cover.png",
    country: "Indonesia",
    year: "2024",
    status: "LIVE",
    liveUrl: "https://dashboard.xpresspos.id",
    techStack: [
      "PHP 8.2",
      "Laravel 12",
      "Filament 4",
      "Livewire 3",
      "MySQL",
      "Tailwind CSS 4",
      "Vite",
      "Laravel Octane",
      "RoadRunner",
      "Laravel Sanctum",
      "Google Gemini AI",
      "AWS S3",
      "Xendit",
      "DomPDF",
      "Spatie Permissions",
      "Docker"
    ],
    challenges: "Built a complex multi-tenant architecture requiring careful data isolation between tenants while supporting cross-store operations. Implemented hybrid FIFO inventory costing system with real-time COGS calculation. Solved race conditions in Filament panel access middleware and RBAC permission checks. Designed offline-first sync system for POS devices with conflict resolution. Managed complex store-vs-tenant scope decisions for business entities like products, members, and inventory.",
    results: "Successfully deployed to production serving multiple retail partners including Harmony Mart, Nakama, Orion Coffee, Trek Coffee, Los In Between, and Workop Sinar Bintang. Implemented AI-powered analytics assistant for business insights. Achieved scalable architecture supporting multiple tenants with isolated data and shared infrastructure. Built comprehensive admin panels for both system administrators and business owners with granular permission controls.",
    // Keep empty until you add real screenshots under /public/projects/xpresspos/
    screenshotUrls: []
  },
  {
    id: 7,
    title: "SIMPEDAS - Sistem Informasi Pangkalan Data Pendidikan Siswa Kota Pematang Siantar",
    category: "Education Management System",
    description: "Comprehensive student data management system for Pematang Siantar city education department, managing schools, students, teachers, and non-teaching staff with advanced Excel import/export capabilities.",
    longDescription: "SIMPEDAS is a full-featured education data management platform built for the Pematang Siantar city education department. The system provides centralized management of educational institutions, student records, teacher profiles, and administrative staff. Key features include bulk Excel data import with validation and error handling, public search functionality for students and teachers, comprehensive statistics dashboard with Chart.js visualizations, role-based access control (admin_dinas, admin_sekolah, guru), PDF certificate and report generation, article and gallery management, and detailed analytics by education level (TK, SD, SMP, KB, PKBM). The system supports multiple import strategies including optimized batch processing and queue-based imports for handling large datasets efficiently.",
    colSpan: "md:col-span-2",
    rowSpan: "md:row-span-2",
    color: "#0d524a",
    // Placeholder: drop your cover image into /public/projects/simpedas/cover.png (or change this path)
    image: "/projects/simpedas/cover.png",
    country: "Indonesia",
    year: "2025",
    status: "COMPLETED",
    techStack: [
      "Laravel 11",
      "PHP 8.2",
      "MySQL",
      "Tailwind CSS",
      "Alpine.js",
      "Vite",
      "Chart.js",
      "Maatwebsite Excel",
      "Spatie Permissions",
      "DomPDF",
      "Intervention Image"
    ],
    challenges: "Handling large-scale Excel imports (thousands of rows) with data validation, normalization, and duplicate detection while maintaining performance. Implementing role-based access control across multiple user types (city admin, school admin, teachers) with different data visibility scopes. Managing complex relationships between schools, students, teachers, and non-teaching staff with proper data integrity.",
    results: "Successfully implemented a production-ready education data management system with optimized import processes capable of handling bulk data operations. The system provides comprehensive search and analytics capabilities, enabling data-driven decision making for the education department. Role-based access ensures data security while allowing appropriate access levels for different stakeholders.",
    // Keep empty until you add real screenshots under /public/projects/simpedas/
    screenshotUrls: []
  },
  {
    id: 8,
    title: "Seblak Sulthane Web & POS App",
    category: "Food & Beverage",
    description: "Digitize cashier, inventory, and performance monitoring for Seblak Sulthane.",
    longDescription: "Seblak Sulthane is a local culinary brand serving contemporary seblak with a variety of flavors and toppings. With the increasing number of daily transactions and branches, Seblak Sulthane needed a system that could help them record transactions, manage inventory, and monitor business performance in real time. Magercoding offers a practical, responsive Point of Sales (POS) solution tailored to the needs of F&B businesses like Seblak Sulthane.",
    colSpan: "md:col-span-1",
    rowSpan: "md:row-span-1",
    color: "#00f0ff",
    // Placeholder: drop your cover image into /public/projects/seblak-sulthane-web/cover.png (or change this path)
    image: "/projects/seblak-sulthane-web/cover.png",
    country: "Indonesia",
    year: "2023",
    status: "LIVE",
    techStack: [
      "Flutter",
      "Laravel",
      "Tailwind CSS",
      "MySQL"
    ],
    challenges: "Manual transactions and input errors, inventory monitoring difficulties, no automated daily sales reporting, decentralized branch management",
    results: "70% faster transactions, real-time inventory visibility, automated daily sales data, remote branch monitoring",
    // Keep empty until you add real screenshots under /public/projects/seblak-sulthane-web/
    screenshotUrls: []
  },
  {
    id: 9,
    title: "Koupii English Learning Management System",
    category: "Education",
    description: "Build a centralized, teacher‑centric LMS with analytics, assessments, and AI assistance to streamline English teaching.",
    longDescription: "Koupii is a Vietnam based Learning Management System (LMS) developed specifically to support English language learning in a fully digital environment. Unlike many other platforms that primarily focus on the student experience, Koupii places its main emphasis on the teacher side, providing tools and workflows that make teaching more effective, structured, and efficient. The platform goes beyond simply delivering learning materials and exercises it is equipped with advanced analytics, comprehensive assessment tools, and AI powered features designed to help teachers track student progress, create customized exercises, and streamline the grading process.",
    colSpan: "md:col-span-1",
    rowSpan: "md:row-span-1",
    color: "#00f0ff",
    // Placeholder: drop your cover image into /public/projects/koupii-english/cover.png (or change this path)
    image: "/projects/koupii-english/cover.png",
    country: "Vietnam",
    year: "2024",
    status: "LIVE",
    techStack: [
      "Laravel",
      "Next.js",
      "React",
      "Tailwind CSS",
      "MySQL",
      "Docker",
      "AI",
      "OCR"
    ],
    challenges: "Teacher workflows overlooked in most platforms, need to assess reading, listening, writing, speaking across classes, manual repetitive grading and transcription tasks, fragmented tools leading to inefficiency",
    results: "50% reduction in grading & exercise preparation time, higher assessment consistency via AI‑assisted tools, better teacher‑student engagement through faster feedback, streamlined multi‑class management without quality loss",
    // Keep empty until you add real screenshots under /public/projects/koupii-english/
    screenshotUrls: []
  },
  {
    id: 10,
    title: "Batik Gumelem E-Commerce",
    category: "E-commerce",
    description: "Local MSME digital storefront",
    longDescription: "Batik Gumelem is a local MSME specializing in traditional batik crafts from Gumelem, Banjarnegara. To reach a wider market and improve sales efficiency, Batik Gumelem collaborated with Magercoding to build an integrated e-commerce platform. This website is designed with the following features: Digital payment system (payment gateway), AI Assistant to automatically answer customer questions, Business profile page that introduces the history and cultural values of batik, Interactive and easily accessible product catalog",
    colSpan: "md:col-span-1",
    rowSpan: "md:row-span-1",
    color: "#00f0ff",
    // Placeholder: drop your cover image into /public/projects/batik-gumelem-ecommerce/cover.png (or change this path)
    image: "/projects/batik-gumelem-ecommerce/cover.png",
    country: "Indonesia",
    year: "2024",
    status: "LIVE",
    techStack: [
      "Laravel",
      "Inertia",
      "React",
      "Tailwind CSS",
      "MySQL",
      "AI Chatbot"
    ],
    challenges: "Limited market access due to relying solely on offline sales, transaction processes are still carried out manually, lack of media to introduce the story and philosophy of batik to potential customers, limited time and resources to promptly respond to consumer inquiries",
    results: "Sales increased by 100% within two months, products reached consumers outside the city and abroad, more efficient transactions and customer service, greater awareness of batik cultural value via digital storytelling",
    // Keep empty until you add real screenshots under /public/projects/batik-gumelem-ecommerce/
    screenshotUrls: []
  },
  {
    id: 11,
    title: "Colosagu Company Profile & Donations",
    category: "Non‑profit",
    description: "Profile, donations, blog, and gallery",
    longDescription: "Colosagu is a company profile website for the Colosagu social community in Papua, which focuses on improving the community's brand image, reaching more target audiences, building trust, and increasing community participation in social movements.",
    colSpan: "md:col-span-1",
    rowSpan: "md:row-span-1",
    color: "#00f0ff",
    // Placeholder: drop your cover image into /public/projects/colosagu/cover.png (or change this path)
    image: "/projects/colosagu/cover.png",
    country: "Indonesia",
    year: "2024",
    status: "LIVE",
    techStack: [
      "Node.js",
      "React.js",
      "Tailwind CSS",
      "MySQL"
    ],
    challenges: "Needs a medium to disseminate campaigns effectively, strengthen promotion of local food MSMEs, provide an integrated, easy‑to‑monitor donation platform",
    results: "Enhanced credibility and reputation, expanded reach and engagement, facilitated communication with target audiences, transparent donation management increasing public trust",
    // Keep empty until you add real screenshots under /public/projects/colosagu/
    screenshotUrls: []
  },
  {
    id: 12,
    title: "DragonFortune Trading Dashboard",
    category: "Web Application",
    description: "Comprehensive cryptocurrency trading analytics dashboard with real-time derivatives metrics, on-chain data, and market sentiment analysis",
    longDescription: "DragonFortune Trading Dashboard is a sophisticated Laravel-based web application designed for cryptocurrency traders and analysts. The platform provides comprehensive real-time analytics across multiple dimensions: derivatives (funding rates, open interest, liquidations, long-short ratios, basis term structure), on-chain metrics (exchange reserves, Ethereum network data, mining indicators), ETF institutional flows, volatility regime analysis, sentiment & flow tracking, spot microstructure, and macro overlay integration. Built with a focus on performance using cache-first patterns, parallel API fetching, and instant load optimizations. The dashboard integrates with Coinglass and CryptoQuant APIs to provide traders with actionable insights through interactive charts, heatmaps, and real-time data visualization.",
    colSpan: "md:col-span-2",
    rowSpan: "md:row-span-2",
    color: "#00f0ff",
    // Placeholder: drop your cover image into /public/projects/dragonfortune-dashboard/cover.png (or change this path)
    image: "/projects/dragonfortune-dashboard/cover.png",
    country: "Indonesia",
    year: "2024",
    status: "LIVE",
    liveUrl: "https://test.dragonfortune.ai",
    techStack: [
      "Laravel",
      "PHP",
      "Livewire",
      "Bootstrap",
      "Alpine.js",
      "Chart.js",
      "jQuery",
      "Vite",
      "MySQL",
      "REST API",
      "Coinglass API",
      "CryptoQuant API"
    ],
    challenges: "Building a high-performance dashboard that aggregates data from multiple external APIs (Coinglass, CryptoQuant) while maintaining instant load times. Implemented cache-first patterns with parallel API fetching to ensure summary cards populate immediately from cache while fresh data loads in the background. Managing complex state across multiple dashboard modules (derivatives, on-chain, ETF, sentiment) with real-time auto-refresh capabilities without overwhelming the UI or API rate limits.",
    results: "Successfully delivered a production-ready trading analytics platform with 10+ specialized dashboard modules. Implemented instant load patterns reducing initial render time to ~5ms via cache, with background data updates. The modular architecture allows for easy extension of new analytics modules while maintaining consistent UX patterns across all dashboards.",
    // Keep empty until you add real screenshots under /public/projects/dragonfortune-dashboard/
    screenshotUrls: []
  },
  {
    id: 13,
    title: "DragonFortune Backend API v2",
    category: "Backend API",
    description: "Flask-based REST API for cryptocurrency derivatives data aggregation and analytics",
    longDescription: "A high-performance Flask REST API that serves as the backend data layer for the DragonFortune Trading Dashboard. The API aggregates and processes cryptocurrency derivatives data from multiple sources including Coinglass and CryptoQuant APIs. Features include modular blueprint architecture, Swagger/OpenAPI documentation, CORS support, and comprehensive endpoints for funding rates, open interest, liquidations, long-short ratios, basis analytics, perpetual-quarterly spreads, ETF flows, volatility metrics, on-chain data, and spot microstructure analysis. Deployed with Gunicorn WSGI server for production scalability with health checks and error handling.",
    colSpan: "md:col-span-1",
    rowSpan: "md:row-span-1",
    color: "#3776ab",
    // Placeholder: drop your cover image into /public/projects/dragonfortune-api/cover.png (or change this path)
    image: "/projects/dragonfortune-api/cover.png",
    country: "Indonesia",
    year: "2024",
    status: "LIVE",
    liveUrl: "https://test.dragonfortune.ai",
    techStack: [
      "Python",
      "Flask",
      "Gunicorn",
      "PyMySQL",
      "Flask-CORS",
      "Flasgger",
      "Marshmallow",
      "Docker",
      "REST API",
      "Swagger",
      "MySQL"
    ],
    challenges: "Designing a scalable API architecture that can handle multiple concurrent requests from the frontend dashboard while aggregating data from external APIs. Implementing efficient database query patterns and caching strategies to minimize response times. Ensuring API reliability with proper error handling, validation, and health check endpoints for production deployment.",
    results: "Delivered a production-ready REST API with comprehensive Swagger documentation. The modular blueprint architecture enables easy extension of new endpoints. Successfully handles real-time data aggregation from multiple sources with optimized query performance. Integrated with Docker for containerized deployment and Gunicorn for production-grade WSGI serving.",
    // Keep empty until you add real screenshots under /public/projects/dragonfortune-api/
    screenshotUrls: []
  },
];
