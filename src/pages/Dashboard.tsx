import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CountrySwitcher } from "@/components/CountrySwitcher";
import { useCountry } from "@/contexts/CountryContext";
import { Briefcase, Users, TrendingDown, AlertCircle, Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";

const Dashboard = () => {
  const { country } = useCountry();

  const stats = [
    { label: "Youth unemployment", value: country.unemploymentRate, icon: Users, tone: "warning" },
    { label: "Informal economy", value: country.informalShare, icon: Briefcase, tone: "accent" },
    { label: "Skills mapped (demo)", value: "12,400", icon: TrendingDown, tone: "primary" },
    { label: "Sectors with high gap", value: country.sectorDemand.filter(s => s.gap === "high").length.toString(), icon: AlertCircle, tone: "destructive" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <section className="container max-w-6xl mx-auto px-4 py-10 flex-1 w-full">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
          <div>
            <p className="text-accent font-semibold text-sm uppercase tracking-wider mb-2">For Organizations & Program Officers</p>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-primary">
              {country.name} skills landscape
            </h1>
            <p className="text-muted-foreground mt-2">Aggregate signal from Rozgar.ai's profile network</p>
          </div>
          <CountrySwitcher />
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {stats.map((s) => (
            <div key={s.label} className="bg-card rounded-2xl p-5 border border-border shadow-card">
              <s.icon className={cn(
                "mb-3",
                s.tone === "warning" && "text-warning",
                s.tone === "accent" && "text-accent",
                s.tone === "primary" && "text-primary",
                s.tone === "destructive" && "text-destructive",
              )} size={22} />
              <div className="font-display text-3xl font-bold text-primary">{s.value}</div>
              <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          {/* Sector demand */}
          <div className="bg-card rounded-2xl p-6 border border-border shadow-card">
            <h2 className="font-display text-2xl font-bold text-primary mb-1">Sector demand vs supply</h2>
            <p className="text-sm text-muted-foreground mb-5">Where the gaps are widest</p>
            <div className="space-y-3">
              {country.sectorDemand.map((s) => (
                <div key={s.sector} className="grid grid-cols-12 items-center gap-3 text-sm">
                  <div className="col-span-4 font-medium text-foreground">{s.sector}</div>
                  <div className="col-span-3 text-muted-foreground">D: {s.demand}</div>
                  <div className="col-span-3 text-muted-foreground">S: {s.supply}</div>
                  <div className="col-span-2">
                    <span className={cn(
                      "px-2 py-0.5 rounded-full text-xs font-semibold",
                      s.gap === "high" && "bg-destructive/15 text-destructive",
                      s.gap === "med" && "bg-warning/20 text-warning-foreground",
                      s.gap === "low" && "bg-success/15 text-success",
                    )}>
                      {s.gap === "high" ? "Wide" : s.gap === "med" ? "Med" : "Narrow"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Map */}
          <div className="bg-card rounded-2xl p-6 border border-border shadow-card">
            <h2 className="font-display text-2xl font-bold text-primary mb-1">Skill density hotspots</h2>
            <p className="text-sm text-muted-foreground mb-5">Where unmapped skills cluster</p>
            <div className="relative aspect-[4/3] rounded-xl bg-gradient-warm overflow-hidden border border-border">
              {/* Stylized country shape */}
              <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full opacity-20">
                <path
                  d={country.code === "PK"
                    ? "M30,15 L55,12 L70,25 L72,45 L60,60 L52,75 L35,82 L20,70 L18,45 L25,30 Z"
                    : "M20,30 L65,28 L75,55 L70,80 L40,85 L20,75 L15,55 Z"}
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
                      width: `${12 + h.intensity * 24}px`,
                      height: `${12 + h.intensity * 24}px`,
                      opacity: 0.5 + h.intensity * 0.5,
                    }}
                  />
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 text-[10px] font-semibold text-primary whitespace-nowrap bg-card/80 px-1.5 py-0.5 rounded">
                    {h.city}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Interventions */}
        <div className="bg-card rounded-2xl p-6 md:p-8 border border-border shadow-card mb-6">
          <div className="flex items-center gap-2 mb-5">
            <Lightbulb className="text-accent" size={22} />
            <h2 className="font-display text-2xl font-bold text-primary">Recommended program interventions</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {country.interventions.map((i, idx) => (
              <div key={i} className="flex gap-3 p-4 rounded-xl bg-secondary/50">
                <div className="w-7 h-7 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-display font-bold flex-shrink-0 text-sm">
                  {idx + 1}
                </div>
                <p className="text-foreground text-sm leading-relaxed">{i}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Sources */}
        <div className="bg-primary-soft rounded-2xl p-6 border border-border">
          <h3 className="font-display text-lg font-bold text-primary mb-3">Data sources</h3>
          <div className="flex flex-wrap gap-2">
            {["ILO ILOSTAT", "World Bank WDI", "Frey-Osborne (2017)", "Wittgenstein Centre"].map((s) => (
              <span key={s} className="px-3 py-1.5 rounded-full bg-card border border-border text-sm text-foreground font-medium">
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
