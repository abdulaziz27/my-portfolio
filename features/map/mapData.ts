export interface LocationData {
  id: string;
  country: string;
  city: string;
  lat: number;
  lng: number;
  projects: number;
  description: string;
}

export const locations: LocationData[] = [
  {
    id: "id",
    country: "INDONESIA",
    city: "Jakarta",
    lat: -6.2088,
    lng: 106.8456,
    projects: 6,
    description: "ERP Systems for Manufacturing & Local SME E-commerce.",
  },
  {
    id: "sg",
    country: "SINGAPORE",
    city: "Singapore",
    lat: 1.3521,
    lng: 103.8198,
    projects: 4,
    description: "High-Frequency Trading Dashboards & Fintech UI.",
  },
  {
    id: "jp",
    country: "JAPAN",
    city: "Tokyo",
    lat: 35.6762,
    lng: 139.6503,
    projects: 2,
    description: "Cross-border E-commerce & Localization Platforms.",
  },
  {
    id: "vn",
    country: "VIETNAM",
    city: "Ho Chi Minh",
    lat: 10.8231,
    lng: 106.6297,
    projects: 2,
    description: "Offshore Development Center Management Tools.",
  },
  {
    id: "my",
    country: "MALAYSIA",
    city: "Kuala Lumpur",
    lat: 3.1390,
    lng: 101.6869,
    projects: 1,
    description: "POS Solutions for Retail Chains.",
  },
];
