export type CountryCode = "PK" | "NG" | "BD" | "ET";

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

const BD_EDUCATION: EducationPoint[] = [
  { year: 2025, secondary: 54, tertiary: 14 },
  { year: 2027, secondary: 57, tertiary: 16 },
  { year: 2029, secondary: 60, tertiary: 18 },
  { year: 2031, secondary: 63, tertiary: 20 },
  { year: 2033, secondary: 66, tertiary: 22 },
  { year: 2035, secondary: 69, tertiary: 25 },
];

const ET_EDUCATION: EducationPoint[] = [
  { year: 2025, secondary: 35, tertiary: 10 },
  { year: 2027, secondary: 38, tertiary: 11 },
  { year: 2029, secondary: 41, tertiary: 12 },
  { year: 2031, secondary: 44, tertiary: 14 },
  { year: 2033, secondary: 48, tertiary: 16 },
  { year: 2035, secondary: 52, tertiary: 18 },
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
  BD: {
    code: "BD",
    name: "Bangladesh",
    flag: "🇧🇩",
    currency: "BDT",
    unemploymentRate: "15.3%",
    informalShare: "85%",
    secondaryNow: "54%",
    secondary2035: "69%",
    econPrimary: "Bangladesh",
    signals: [
      { text: "IT sector growing 20% annually in Bangladesh", source: "ILO" },
      { text: "85% of Bangladesh's economy is informal", source: "World Bank" },
    ],
    sectorDemand: [
      { sector: "Digital Services", demand: "Very High", supply: "Low", gap: "high" },
      { sector: "Textile & Garments", demand: "High", supply: "Medium", gap: "med" },
      { sector: "Care Work", demand: "High", supply: "Low", gap: "high" },
      { sector: "Agri-tech", demand: "Medium", supply: "Low", gap: "med" },
      { sector: "Logistics", demand: "High", supply: "Medium", gap: "high" },
    ],
    hotspots: [
      { city: "Dhaka", x: 55, y: 48, intensity: 0.98 },
      { city: "Chittagong", x: 75, y: 62, intensity: 0.82 },
      { city: "Khulna", x: 35, y: 68, intensity: 0.65 },
      { city: "Sylhet", x: 72, y: 32, intensity: 0.58 },
      { city: "Rajshahi", x: 32, y: 35, intensity: 0.52 },
      { city: "Barisal", x: 48, y: 75, intensity: 0.48 },
    ],
    interventions: [
      "Mobile-first digital skills bootcamps in Dhaka and Chittagong garment zones",
      "Recognition-of-prior-learning for informal garment and tailoring workers",
      "Freelance onboarding partnerships with local fintech and global platforms",
      "Garment-to-tech bridge programs (machine operator → quality assurance → data roles)",
    ],
    skillsGap: [
      { sector: "Technology", demand: 90, supply: 32, gap: "high", trend: "up" },
      { sector: "Healthcare", demand: 85, supply: 40, gap: "high", trend: "up" },
      { sector: "Construction", demand: 72, supply: 60, gap: "med", trend: "up" },
      { sector: "Textile", demand: 50, supply: 85, gap: "low", trend: "flat" },
      { sector: "Agriculture", demand: 62, supply: 75, gap: "low", trend: "flat" },
    ],
    occupations: [
      { name: "Data Entry Clerk", risk: "high", share: 5 },
      { name: "Phone Repair Technician", risk: "low", share: 10 },
      { name: "Textile Worker", risk: "high", share: 22 },
      { name: "Electrician", risk: "low", share: 8 },
      { name: "Healthcare Worker", risk: "low", share: 6 },
      { name: "Teacher", risk: "low", share: 9 },
      { name: "Cashier", risk: "med", share: 7 },
      { name: "Freelance Developer", risk: "med", share: 4 },
    ],
    educationProjection: BD_EDUCATION,
    sectorBubbles: [
      { sector: "IT", automationRisk: 25, growth: 7.5, youthEmployed: 450 },
      { sector: "Textile", automationRisk: 68, growth: 2.1, youthEmployed: 2100 },
      { sector: "Construction", automationRisk: 40, growth: 4.2, youthEmployed: 950 },
      { sector: "Healthcare", automationRisk: 20, growth: 6.5, youthEmployed: 580 },
      { sector: "Agriculture", automationRisk: 50, growth: 1.5, youthEmployed: 3200 },
      { sector: "Retail", automationRisk: 62, growth: 3.0, youthEmployed: 1200 },
    ],
    policies: [
      {
        level: "critical",
        title: "Reskill textile workers toward technical roles",
        body: "High automation risk (68%) combined with the largest youth employment share (~22%) creates systemic vulnerability. Bridge to quality assurance, digital inventory, and e-commerce roles.",
        justification: "68% Frey-Osborne automation risk · 22% of youth employed in textiles (ILO 2024)",
      },
      {
        level: "opportunity",
        title: "IT sector growing 20% annually but talent pipeline underdeveloped",
        body: "Demand-supply gap is the widest of any sector. Mobile-first bootcamps with industry certification can absorb secondary-educated youth in 9–12 months.",
        justification: "Demand index 90 vs supply index 32 — gap of +58 points (Rozgar.ai network · ILO)",
      },
      {
        level: "priority",
        title: "Expand vocational certification recognition",
        body: "85% informal economy means most credentials are invisible to employers. Recognition-of-prior-learning frameworks unlock formal income for existing skilled workers.",
        justification: "World Bank WDI 2023 — 85% of total employment is informal",
      },
    ],
    regionLabel: "Bangladesh divisions · youth unemployment intensity",
    regions: [
      { id: "BA", name: "Barisal", d: "M42,68 L58,68 L55,85 L40,85 Z", intensity: 0.48, unemployment: "12.1%" },
      { id: "CG", name: "Chittagong", d: "M58,52 L88,48 L92,75 L65,78 L58,68 Z", intensity: 0.82, unemployment: "16.8%" },
      { id: "DH", name: "Dhaka", d: "M38,38 L58,38 L58,52 L55,68 L42,68 L38,52 Z", intensity: 0.95, unemployment: "19.2%" },
      { id: "KH", name: "Khulna", d: "M12,55 L38,55 L38,68 L40,85 L15,82 Z", intensity: 0.65, unemployment: "14.5%" },
      { id: "RJ", name: "Rajshahi", d: "M12,15 L38,15 L38,38 L12,38 Z", intensity: 0.52, unemployment: "11.8%" },
      { id: "RP", name: "Rangpur", d: "M38,5 L58,5 L58,15 L58,38 L38,38 L38,15 Z", intensity: 0.45, unemployment: "10.5%" },
      { id: "SY", name: "Sylhet", d: "M58,15 L75,10 L72,38 L58,52 L58,38 Z", intensity: 0.58, unemployment: "13.2%" },
    ],
  },
  ET: {
    code: "ET",
    name: "Ethiopia",
    flag: "🇪🇹",
    currency: "ETB",
    unemploymentRate: "25.1%",
    informalShare: "90%",
    secondaryNow: "35%",
    secondary2035: "52%",
    econPrimary: "Ethiopia",
    signals: [
      { text: "Tech sector growing 18% annually in Ethiopia", source: "ILO" },
      { text: "90% of Ethiopia's economy is informal", source: "World Bank" },
    ],
    sectorDemand: [
      { sector: "Digital Services", demand: "Very High", supply: "Low", gap: "high" },
      { sector: "Agriculture & Agri-tech", demand: "High", supply: "High", gap: "med" },
      { sector: "Care Work", demand: "High", supply: "Low", gap: "high" },
      { sector: "Manufacturing", demand: "Medium", supply: "Low", gap: "med" },
      { sector: "Construction", demand: "High", supply: "Medium", gap: "high" },
    ],
    hotspots: [
      { city: "Addis Ababa", x: 48, y: 52, intensity: 0.98 },
      { city: "Dire Dawa", x: 72, y: 48, intensity: 0.72 },
      { city: "Hawassa", x: 42, y: 78, intensity: 0.65 },
      { city: "Bahir Dar", x: 32, y: 28, intensity: 0.58 },
      { city: "Mekelle", x: 52, y: 18, intensity: 0.55 },
      { city: "Adama", x: 55, y: 58, intensity: 0.62 },
    ],
    interventions: [
      "Addis Ababa tech hub apprenticeships for secondary graduates",
      "Recognition credentials for informal market traders and artisans",
      "Agri-tech extension programs for Oromia and Amhara regions",
      "Construction-to-technical bridge programs (mason → site supervisor → project coordinator)",
    ],
    skillsGap: [
      { sector: "Technology", demand: 88, supply: 26, gap: "high", trend: "up" },
      { sector: "Healthcare", demand: 82, supply: 34, gap: "high", trend: "up" },
      { sector: "Construction", demand: 75, supply: 52, gap: "med", trend: "up" },
      { sector: "Agriculture", demand: 70, supply: 78, gap: "low", trend: "flat" },
      { sector: "Textile", demand: 45, supply: 58, gap: "low", trend: "flat" },
    ],
    occupations: [
      { name: "Data Entry Clerk", risk: "high", share: 4 },
      { name: "Phone Repair Technician", risk: "low", share: 12 },
      { name: "Textile Worker", risk: "high", share: 10 },
      { name: "Electrician", risk: "low", share: 9 },
      { name: "Healthcare Worker", risk: "low", share: 5 },
      { name: "Teacher", risk: "low", share: 8 },
      { name: "Cashier", risk: "med", share: 8 },
      { name: "Freelance Developer", risk: "med", share: 3 },
    ],
    educationProjection: ET_EDUCATION,
    sectorBubbles: [
      { sector: "IT", automationRisk: 30, growth: 6.8, youthEmployed: 180 },
      { sector: "Textile", automationRisk: 65, growth: 3.5, youthEmployed: 420 },
      { sector: "Construction", automationRisk: 42, growth: 5.2, youthEmployed: 680 },
      { sector: "Healthcare", automationRisk: 24, growth: 7.0, youthEmployed: 320 },
      { sector: "Agriculture", automationRisk: 55, growth: 2.2, youthEmployed: 4200 },
      { sector: "Retail", automationRisk: 58, growth: 3.5, youthEmployed: 850 },
    ],
    policies: [
      {
        level: "critical",
        title: "Reskill textile workers toward technical and service roles",
        body: "High automation risk (65%) in a sector employing 10% of youth requires pivoting toward construction supervision, agri-tech, and digital service roles.",
        justification: "65% Frey-Osborne automation risk · 10% of youth employed in textiles (ILO 2024)",
      },
      {
        level: "opportunity",
        title: "Tech sector growing 18% annually — talent gap is widest",
        body: "Demand outpaces supply by more than 3×. Addis Ababa tech hub apprenticeships can absorb secondary graduates within 12 months.",
        justification: "Demand index 88 vs supply index 26 — gap of +62 points (Rozgar.ai · ILO)",
      },
      {
        level: "priority",
        title: "Expand vocational certification recognition",
        body: "90% informal economy means most credentials are invisible to employers. Recognition-of-prior-learning frameworks unlock formal income for existing skilled workers.",
        justification: "World Bank WDI 2023 — 90% of total employment is informal",
      },
    ],
    regionLabel: "Ethiopia regions · youth unemployment intensity",
    regions: [
      { id: "AF", name: "Afar", d: "M52,5 L75,5 L72,28 L48,28 Z", intensity: 0.75, unemployment: "28.5%" },
      { id: "AM", name: "Amhara", d: "M25,22 L48,22 L48,42 L28,42 L22,32 Z", intensity: 0.72, unemployment: "27.2%" },
      { id: "BN", name: "Benishangul-Gumuz", d: "M5,25 L25,22 L22,32 L28,42 L15,42 L8,35 Z", intensity: 0.68, unemployment: "26.1%" },
      { id: "GA", name: "Gambela", d: "M8,42 L28,42 L25,62 L12,58 Z", intensity: 0.55, unemployment: "22.4%" },
      { id: "HA", name: "Harari", d: "M72,45 L78,45 L76,52 L70,52 Z", intensity: 0.78, unemployment: "29.1%" },
      { id: "OR", name: "Oromia", d: "M28,42 L48,42 L55,62 L42,78 L25,62 Z", intensity: 0.85, unemployment: "31.2%" },
      { id: "SO", name: "Somali", d: "M75,5 L92,8 L95,55 L72,52 L72,28 Z", intensity: 0.72, unemployment: "27.8%" },
      { id: "SN", name: "SNNPR", d: "M25,62 L42,78 L48,88 L28,92 L18,72 Z", intensity: 0.68, unemployment: "25.5%" },
      { id: "TI", name: "Tigray", d: "M35,5 L52,5 L48,28 L38,28 Z", intensity: 0.78, unemployment: "29.5%" },
      { id: "AA", name: "Addis Ababa", d: "M38,45 L44,45 L44,52 L38,52 Z", intensity: 0.95, unemployment: "32.1%" },
    ],
  },
};
