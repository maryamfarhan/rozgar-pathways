export type CountryCode = "PK" | "NG";

export type GapLevel = "high" | "med" | "low";
export type RiskLevel = "low" | "med" | "high";

export interface SkillsGapRow {
  sector: string;
  demand: number; // 0-100
  supply: number; // 0-100
  gap: GapLevel;
  trend: "up" | "down" | "flat";
}

export interface OccupationRisk {
  name: string;
  risk: RiskLevel;
  // 0-100 share of youth currently employed in this occupation in this country
  share: number;
}

export interface EducationPoint {
  year: number;
  secondary: number; // % of youth with secondary completed
  tertiary: number; // % of youth with tertiary completed
}

export interface SectorBubble {
  sector: string;
  // 0-100 automation risk
  automationRisk: number;
  // % YoY employment growth
  growth: number;
  // youth employed (thousands) — drives bubble size
  youthEmployed: number;
}

export interface PolicyRecommendation {
  level: "critical" | "opportunity" | "priority";
  title: string;
  body: string;
  justification: string;
}

export interface RegionPath {
  id: string;
  name: string;
  // SVG path for region polygon (in 0-100 viewBox units)
  d: string;
  // 0-1 unemployment intensity for shading
  intensity: number;
  // display unemployment %
  unemployment: string;
}

export interface CountryData {
  code: CountryCode;
  name: string;
  flag: string;
  currency: string;

  // Headline stats
  unemploymentRate: string;
  informalShare: string;
  secondaryNow: string;
  secondary2035: string;

  signals: { text: string; source: string }[];

  // Legacy (kept for landing/about/youth pages that still reference these)
  sectorDemand: { sector: string; demand: string; supply: string; gap: GapLevel }[];
  hotspots: { city: string; x: number; y: number; intensity: number }[];
  interventions: string[];
  econPrimary: string;

  // Rich dashboard data
  skillsGap: SkillsGapRow[];
  occupations: OccupationRisk[];
  educationProjection: EducationPoint[];
  sectorBubbles: SectorBubble[];
  policies: PolicyRecommendation[];
  regions: RegionPath[];
  regionLabel: string; // e.g. "Pakistan provinces"
}

const PK_EDUCATION: EducationPoint[] = [
  { year: 2025, secondary: 52, tertiary: 12 },
  { year: 2027, secondary: 55, tertiary: 14 },
  { year: 2029, secondary: 58, tertiary: 16 },
  { year: 2031, secondary: 60, tertiary: 18 },
  { year: 2033, secondary: 62, tertiary: 20 },
  { year: 2035, secondary: 64, tertiary: 22 },
];

const NG_EDUCATION: EducationPoint[] = [
  { year: 2025, secondary: 45, tertiary: 10 },
  { year: 2027, secondary: 48, tertiary: 11 },
  { year: 2029, secondary: 51, tertiary: 13 },
  { year: 2031, secondary: 53, tertiary: 14 },
  { year: 2033, secondary: 56, tertiary: 16 },
  { year: 2035, secondary: 58, tertiary: 18 },
];

export const countries: Record<CountryCode, CountryData> = {
  PK: {
    code: "PK",
    name: "Pakistan",
    flag: "🇵🇰",
    currency: "PKR",
    unemploymentRate: "8.9%",
    informalShare: "72%",
    secondaryNow: "52%",
    secondary2035: "64%",
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
    skillsGap: [
      { sector: "Technology", demand: 92, supply: 38, gap: "high", trend: "up" },
      { sector: "Healthcare", demand: 84, supply: 46, gap: "high", trend: "up" },
      { sector: "Construction", demand: 70, supply: 62, gap: "med", trend: "flat" },
      { sector: "Textile", demand: 58, supply: 78, gap: "low", trend: "down" },
      { sector: "Agriculture", demand: 64, supply: 70, gap: "low", trend: "flat" },
    ],
    occupations: [
      { name: "Data Entry Clerk", risk: "high", share: 6 },
      { name: "Phone Repair Technician", risk: "low", share: 9 },
      { name: "Textile Worker", risk: "high", share: 18 },
      { name: "Electrician", risk: "low", share: 7 },
      { name: "Healthcare Worker", risk: "low", share: 5 },
      { name: "Teacher", risk: "low", share: 8 },
      { name: "Cashier", risk: "med", share: 6 },
      { name: "Freelance Developer", risk: "med", share: 4 },
    ],
    educationProjection: PK_EDUCATION,
    sectorBubbles: [
      { sector: "IT", automationRisk: 28, growth: 8.2, youthEmployed: 320 },
      { sector: "Textile", automationRisk: 72, growth: -1.4, youthEmployed: 980 },
      { sector: "Construction", automationRisk: 38, growth: 3.1, youthEmployed: 720 },
      { sector: "Healthcare", automationRisk: 22, growth: 5.6, youthEmployed: 410 },
      { sector: "Agriculture", automationRisk: 48, growth: 1.8, youthEmployed: 1200 },
      { sector: "Retail", automationRisk: 60, growth: 2.4, youthEmployed: 540 },
    ],
    policies: [
      {
        level: "critical",
        title: "Reskill textile workers toward technical roles",
        body: "High automation risk (72%) combined with the largest youth employment share (~18%) creates systemic vulnerability. Bridge to electrician, IoT installation, and quality-control roles.",
        justification: "72% Frey-Osborne automation risk · 18% of youth employed in textiles (ILO 2024)",
      },
      {
        level: "opportunity",
        title: "IT sector growing 8% annually but talent pipeline underdeveloped",
        body: "Demand-supply gap is the widest of any sector. Mobile-first bootcamps with industry certification can absorb matric-educated youth in 9–12 months.",
        justification: "Demand index 92 vs supply index 38 — gap of +54 points (Rozgar.ai network · ILO)",
      },
      {
        level: "priority",
        title: "Expand vocational certification recognition",
        body: "72% informal economy means most credentials are invisible to employers. Recognition-of-prior-learning frameworks unlock formal income for existing skilled workers.",
        justification: "World Bank WDI 2023 — 72% of total employment is informal",
      },
    ],
    regionLabel: "Pakistan provinces · youth unemployment intensity",
    regions: [
      // Stylized Pakistan: 5 provinces in a 100×100 viewBox.
      { id: "GB", name: "Gilgit-Baltistan", d: "M62,8 L86,8 L88,26 L70,30 L60,22 Z", intensity: 0.35, unemployment: "5.1%" },
      { id: "KPK", name: "Khyber Pakhtunkhwa", d: "M40,12 L62,8 L60,22 L58,42 L40,46 L34,28 Z", intensity: 0.72, unemployment: "9.8%" },
      { id: "PB", name: "Punjab", d: "M58,42 L70,30 L88,26 L92,68 L70,72 L60,62 Z", intensity: 0.85, unemployment: "11.2%" },
      { id: "BL", name: "Balochistan", d: "M8,30 L40,46 L60,62 L70,72 L62,92 L20,94 L4,72 Z", intensity: 0.95, unemployment: "13.4%" },
      { id: "SD", name: "Sindh", d: "M62,92 L70,72 L92,68 L88,94 Z", intensity: 0.78, unemployment: "10.1%" },
    ],
  },
  NG: {
    code: "NG",
    name: "Nigeria",
    flag: "🇳🇬",
    currency: "NGN",
    unemploymentRate: "53.3%",
    informalShare: "80%",
    secondaryNow: "45%",
    secondary2035: "58%",
    econPrimary: "Nigeria",
    signals: [
      { text: "Tech sector growing 12% annually in Nigeria", source: "ILO" },
      { text: "80% of Nigeria's economy is informal", source: "World Bank" },
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
    skillsGap: [
      { sector: "Technology", demand: 95, supply: 30, gap: "high", trend: "up" },
      { sector: "Healthcare", demand: 88, supply: 34, gap: "high", trend: "up" },
      { sector: "Construction", demand: 76, supply: 54, gap: "med", trend: "up" },
      { sector: "Textile", demand: 50, supply: 62, gap: "low", trend: "flat" },
      { sector: "Agriculture", demand: 80, supply: 88, gap: "low", trend: "flat" },
    ],
    occupations: [
      { name: "Data Entry Clerk", risk: "high", share: 5 },
      { name: "Phone Repair Technician", risk: "low", share: 11 },
      { name: "Textile Worker", risk: "high", share: 9 },
      { name: "Electrician", risk: "low", share: 8 },
      { name: "Healthcare Worker", risk: "low", share: 4 },
      { name: "Teacher", risk: "low", share: 7 },
      { name: "Cashier", risk: "med", share: 8 },
      { name: "Freelance Developer", risk: "med", share: 5 },
    ],
    educationProjection: NG_EDUCATION,
    sectorBubbles: [
      { sector: "IT", automationRisk: 26, growth: 12.0, youthEmployed: 280 },
      { sector: "Textile", automationRisk: 70, growth: -0.5, youthEmployed: 540 },
      { sector: "Construction", automationRisk: 36, growth: 4.4, youthEmployed: 820 },
      { sector: "Healthcare", automationRisk: 20, growth: 6.8, youthEmployed: 360 },
      { sector: "Agriculture", automationRisk: 46, growth: 2.6, youthEmployed: 1850 },
      { sector: "Retail", automationRisk: 58, growth: 3.0, youthEmployed: 690 },
    ],
    policies: [
      {
        level: "critical",
        title: "Reskill textile workers toward technical roles",
        body: "High automation risk paired with shrinking employment makes textile a systemic risk for Nigerian youth. Pivot toward electrical and last-mile logistics roles.",
        justification: "70% Frey-Osborne automation risk · -0.5% YoY employment growth in textiles",
      },
      {
        level: "opportunity",
        title: "Tech sector growing 12% annually — fastest of any sector",
        body: "Demand outpaces supply by more than 3×. Lagos and Abuja fintech apprenticeships can absorb senior-secondary graduates within 12 months.",
        justification: "Demand index 95 vs supply index 30 — gap of +65 points (Rozgar.ai · ILO)",
      },
      {
        level: "priority",
        title: "Expand vocational certification recognition",
        body: "80% informal economy means most credentials are invisible to employers. Recognition-of-prior-learning frameworks unlock formal income for existing skilled workers.",
        justification: "World Bank WDI 2023 — 80% of total employment is informal",
      },
    ],
    regionLabel: "Nigeria geopolitical zones · youth unemployment intensity",
    regions: [
      // Stylized Nigeria: 6 geopolitical zones in a 100×100 viewBox.
      { id: "NW", name: "North West", d: "M10,12 L48,8 L52,32 L42,40 L18,40 L8,30 Z", intensity: 0.92, unemployment: "57.2%" },
      { id: "NE", name: "North East", d: "M48,8 L88,12 L92,38 L70,42 L52,32 Z", intensity: 0.88, unemployment: "55.6%" },
      { id: "NC", name: "North Central", d: "M18,40 L42,40 L52,32 L70,42 L62,62 L30,62 Z", intensity: 0.7, unemployment: "48.1%" },
      { id: "SW", name: "South West", d: "M8,62 L30,62 L34,86 L14,90 Z", intensity: 0.95, unemployment: "59.4%" },
      { id: "SS", name: "South South", d: "M30,62 L62,62 L66,86 L34,86 Z", intensity: 0.78, unemployment: "51.8%" },
      { id: "SE", name: "South East", d: "M62,62 L92,58 L88,86 L66,86 Z", intensity: 0.65, unemployment: "46.2%" },
    ],
  },
};
