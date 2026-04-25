import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CountrySwitcher } from "@/components/CountrySwitcher";
import { useCountry } from "@/contexts/CountryContext";
import { Briefcase, Users, AlertCircle, Lightbulb, ArrowUpRight, Database } from "lucide-react";
import { cn } from "@/lib/utils";

const Dashboard = () => {
  const { country } = useCountry();

  const bigStats = [
    {
      label: "Youth unemployment rate",
      value: country.unemploymentRate,
      caption: `${country.name} · ages 15–24`,
      source: "ILO ILOSTAT 2024",
      tone: "accent" as const,
      icon: Users,
    },
    {
      label: "Informal economy share",
      value: country.informalShare,
      caption: "of total employment",
      source: "World Bank WDI",
      tone: "primary" as const,
      icon: Briefcase,
    },
  ];

  const microStats = [
    { label: "Skills mapped (demo network)", value: "12,400" },
    { label: "Sectors with wide gap", value: country.sectorDemand.filter(s => s.gap === "high").length.toString() },
    { label: "Active program partners", value: "38" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      {/* Header band */}
      <section className="relative border-b border-border bg-gradient-warm overflow-hidden">
        <div className="absolute -top-32 -right-20 w-96 h-96 rounded-full bg-accent/15 blur-3xl" />
        <div className="container max-w-6xl mx-auto px-4 md:px-6 py-12 md:py-16 relative">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent text-accent-foreground text-xs font-bold uppercase tracking-wider mb-5 shadow-warm">
                <Database size={12} /> For NGOs & Government Program Officers
              </div>
              <h1 className="font-display text-4xl md:text-6xl font-bold text-primary tracking-[-0.03em] leading-[1] mb-3">
                {country.name} skills landscape
              </h1>
              <p className="text-muted-foreground text-lg max-w-xl">
                Aggregate signal from Rozgar.ai's profile network — updated continuously.
              </p>
            </div>
            <CountrySwitcher variant="prominent" />
          </div>
        </div>
      </section>

      <section className="container max-w-6xl mx-auto px-4 md:px-6 py-12 md:py-16 flex-1 w-full">
        {/* Big bold stat cards */}
        <div className="grid md:grid-cols-2 gap-5 mb-6">
          {bigStats.map((s) => (
            <div
              key={s.label}
              className={cn(
                "relative rounded-3xl p-8 md:p-10 overflow-hidden border-2 shadow-card",
                s.tone === "accent"
                  ? "bg-accent text-accent-foreground border-accent"
                  : "bg-primary text-primary-foreground border-primary"
              )}
            >
              <div
                className="absolute inset-0 opacity-[0.08]"
                style={{
                  backgroundImage: "radial-gradient(currentColor 1px, transparent 1px)",
                  backgroundSize: "20px 20px",
                }}
              />
              <div className="relative">
                <div className="flex items-start justify-between mb-6">
                  <s.icon size={28} className="opacity-80" />
                  <span className="text-[10px] uppercase tracking-[0.18em] font-bold opacity-70">
                    {s.source}
                  </span>
                </div>
                <div className="font-display text-7xl md:text-8xl font-bold tracking-[-0.04em] leading-[0.9] mb-3">
                  {s.value}
                </div>
                <div className="font-display text-xl font-semibold mb-1">{s.label}</div>
                <div className="text-sm opacity-75">{s.caption}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Micro stats */}
        <div className="grid grid-cols-3 gap-3 mb-12">
          {microStats.map((s) => (
            <div key={s.label} className="bg-card rounded-2xl p-5 border border-border shadow-card">
              <div className="font-display text-2xl md:text-3xl font-bold text-primary tracking-tight">
                {s.value}
              </div>
              <div className="text-xs text-muted-foreground mt-1 leading-tight">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-5 gap-6 mb-6">
          {/* Sector demand TABLE */}
          <div className="lg:col-span-3 bg-card rounded-3xl p-6 md:p-8 border border-border shadow-card">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-primary tracking-tight">
                  Sector demand vs supply
                </h2>
                <p className="text-sm text-muted-foreground mt-1">Where the skills gaps are widest</p>
              </div>
              <ArrowUpRight className="text-muted-foreground" size={20} />
            </div>

            <div className="overflow-x-auto -mx-2">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-border">
                    <th className="text-left py-3 px-2 text-[10px] uppercase tracking-[0.15em] font-bold text-muted-foreground">Sector</th>
                    <th className="text-left py-3 px-2 text-[10px] uppercase tracking-[0.15em] font-bold text-muted-foreground">Demand</th>
                    <th className="text-left py-3 px-2 text-[10px] uppercase tracking-[0.15em] font-bold text-muted-foreground">Supply</th>
                    <th className="text-right py-3 px-2 text-[10px] uppercase tracking-[0.15em] font-bold text-muted-foreground">Gap</th>
                  </tr>
                </thead>
                <tbody>
                  {country.sectorDemand.map((s, i) => (
                    <tr
                      key={s.sector}
                      className={cn(
                        "border-b border-border/60 hover:bg-secondary/40 transition-smooth",
                        i === country.sectorDemand.length - 1 && "border-b-0"
                      )}
                    >
                      <td className="py-4 px-2 font-semibold text-foreground">{s.sector}</td>
                      <td className="py-4 px-2 text-muted-foreground">{s.demand}</td>
                      <td className="py-4 px-2 text-muted-foreground">{s.supply}</td>
                      <td className="py-4 px-2 text-right">
                        <span
                          className={cn(
                            "inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold",
                            s.gap === "high" && "bg-accent text-accent-foreground",
                            s.gap === "med" && "bg-warning/20 text-warning-foreground",
                            s.gap === "low" && "bg-success/15 text-success"
                          )}
                        >
                          {s.gap === "high" ? "Wide" : s.gap === "med" ? "Medium" : "Narrow"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Map */}
          <div className="lg:col-span-2 bg-card rounded-3xl p-6 md:p-8 border border-border shadow-card">
            <h2 className="font-display text-2xl font-bold text-primary tracking-tight mb-1">
              Skill density hotspots
            </h2>
            <p className="text-sm text-muted-foreground mb-5">Where unmapped skills cluster</p>
            <div className="relative aspect-[4/3] rounded-2xl bg-gradient-warm overflow-hidden border border-border">
              <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full opacity-15">
                <path
                  d={
                    country.code === "PK"
                      ? "M30,15 L55,12 L70,25 L72,45 L60,60 L52,75 L35,82 L20,70 L18,45 L25,30 Z"
                      : "M20,30 L65,28 L75,55 L70,80 L40,85 L20,75 L15,55 Z"
                  }
                  fill="hsl(var(--primary))"
                />
              </svg>
              {country.hotspots.map((h) => (
                <div
                  key={h.city}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${h.x}%`, top: `${h.y}%` }}
                >
                  <div
                    className="rounded-full bg-accent animate-pulse shadow-warm"
                    style={{
                      width: `${10 + h.intensity * 22}px`,
                      height: `${10 + h.intensity * 22}px`,
                      opacity: 0.55 + h.intensity * 0.45,
                    }}
                  />
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 text-[10px] font-bold text-primary whitespace-nowrap bg-card/90 px-1.5 py-0.5 rounded shadow-soft">
                    {h.city}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Interventions */}
        <div className="bg-card rounded-3xl p-6 md:p-10 border border-border shadow-card mb-6">
          <div className="flex items-start gap-3 mb-7">
            <div className="w-11 h-11 rounded-xl bg-accent flex items-center justify-center shadow-warm flex-shrink-0">
              <Lightbulb className="text-accent-foreground" size={20} />
            </div>
            <div>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-primary tracking-tight">
                Recommended interventions
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                Prioritized by gap size and feasibility in {country.name}
              </p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-3">
            {country.interventions.map((i, idx) => (
              <div
                key={i}
                className="flex gap-4 p-5 rounded-2xl bg-secondary/40 hover:bg-secondary transition-smooth border border-transparent hover:border-accent/20"
              >
                <div className="w-9 h-9 rounded-xl bg-card text-accent flex items-center justify-center font-display font-bold flex-shrink-0 text-sm border-2 border-accent/30">
                  {idx + 1}
                </div>
                <p className="text-foreground text-sm leading-relaxed pt-1">{i}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Sources */}
        <div className="bg-primary rounded-3xl p-6 md:p-8 text-primary-foreground">
          <div className="flex items-start gap-3 mb-4">
            <AlertCircle size={18} className="text-accent flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-display text-lg font-bold mb-1">Data sources</h3>
              <p className="text-sm text-primary-foreground/70">
                All figures sourced from public datasets and peer-reviewed research.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 pl-7">
            {["ILO ILOSTAT", "World Bank WDI", "Frey-Osborne (2017)", "Wittgenstein Centre"].map((s) => (
              <span
                key={s}
                className="px-3 py-1.5 rounded-full bg-primary-foreground/10 border border-primary-foreground/20 text-sm font-medium"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Dashboard;
