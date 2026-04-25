export type CountryCode = "PK" | "NG";

export interface CountryData {
  code: CountryCode;
  name: string;
  flag: string;
  currency: string;
  unemploymentRate: string;
  informalShare: string;
  signals: { text: string; source: string }[];
  sectorDemand: { sector: string; demand: string; supply: string; gap: "high" | "med" | "low" }[];
  hotspots: { city: string; x: number; y: number; intensity: number }[];
  interventions: string[];
  econPrimary: string;
}

export const countries: Record<CountryCode, CountryData> = {
  PK: {
    code: "PK",
    name: "Pakistan",
    flag: "🇵🇰",
    currency: "PKR",
    unemploymentRate: "8.9%",
    informalShare: "72%",
    econPrimary: "Pakistan",
    signals: [
      { text: "IT sector growing 8% annually in Pakistan", source: "ILO" },
      { text: "72% of Pakistan's economy is informal", source: "World Bank" },
    ],
    sectorDemand: [
      { sector: "Digital Services", demand: "Very High", supply: "Low", gap: "high" },
      { sector: "Skilled Trades", demand: "High", supply: "Medium", gap: "med" },
      { sector: "Care Work", demand: "High", supply: "Low", gap: "high" },
      { sector: "Agri-tech", demand: "Medium", supply: "Low", gap: "med" },
      { sector: "Manufacturing", demand: "Medium", supply: "High", gap: "low" },
    ],
    hotspots: [
      { city: "Karachi", x: 30, y: 78, intensity: 0.95 },
      { city: "Lahore", x: 62, y: 45, intensity: 0.85 },
      { city: "Islamabad", x: 58, y: 25, intensity: 0.7 },
      { city: "Peshawar", x: 48, y: 22, intensity: 0.55 },
      { city: "Quetta", x: 22, y: 50, intensity: 0.4 },
      { city: "Multan", x: 48, y: 58, intensity: 0.6 },
    ],
    interventions: [
      "Mobile-first digital skills bootcamps in Karachi & Lahore peri-urban zones",
      "Recognition-of-prior-learning credentials for informal trades workers",
      "Freelance onboarding partnerships with Payoneer & local fintech",
      "Vocational-to-tech bridge programs (electrician → IoT installer)",
    ],
  },
  NG: {
    code: "NG",
    name: "Nigeria",
    flag: "🇳🇬",
    currency: "NGN",
    unemploymentRate: "5.0%",
    informalShare: "92%",
    econPrimary: "Nigeria",
    signals: [
      { text: "Tech sector growing 12% annually in Nigeria", source: "ILO" },
      { text: "92% of Nigeria's economy is informal", source: "World Bank" },
    ],
    sectorDemand: [
      { sector: "Digital Services", demand: "Very High", supply: "Low", gap: "high" },
      { sector: "Logistics", demand: "Very High", supply: "Medium", gap: "high" },
      { sector: "Care Work", demand: "High", supply: "Low", gap: "high" },
      { sector: "Agri-tech", demand: "High", supply: "Low", gap: "high" },
      { sector: "Manufacturing", demand: "Medium", supply: "Medium", gap: "med" },
    ],
    hotspots: [
      { city: "Lagos", x: 25, y: 78, intensity: 0.98 },
      { city: "Abuja", x: 50, y: 48, intensity: 0.8 },
      { city: "Kano", x: 55, y: 22, intensity: 0.75 },
      { city: "Port Harcourt", x: 48, y: 82, intensity: 0.7 },
      { city: "Ibadan", x: 30, y: 70, intensity: 0.6 },
      { city: "Kaduna", x: 50, y: 32, intensity: 0.55 },
    ],
    interventions: [
      "Lagos & Abuja fintech apprenticeship pipelines for matric-educated youth",
      "Recognition credentials for informal market traders & artisans",
      "Last-mile logistics training partnerships with platform operators",
      "Agritech extension programs for northern states",
    ],
  },
};
