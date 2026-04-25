import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CountrySwitcher } from "@/components/CountrySwitcher";
import { useCountry } from "@/contexts/CountryContext";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import {
  Briefcase,
  Users,
  GraduationCap,
  TrendingUp,
  AlertTriangle,
  Sparkles,
  Target,
  LogOut,
  ShieldCheck,
  ArrowUp,
  ArrowDown,
  Minus,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  ScatterChart,
  Scatter,
  ZAxis,
  ReferenceLine,
} from "recharts";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Dashboard = () => {
  const { country } = useCountry();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut();
    toast.success("Signed out");
    navigate("/", { replace: true });
  };

  const statCards = [
    {
      label: "Youth unemployment",
      value: country.unemploymentRate,
      caption: `${country.name} · ages 15–24`,
      source: "ILO ILOSTAT 2024",
      icon: Users,
      tone: "accent" as const,
    },
    {
      label: "Informal economy share",
      value: country.informalShare,
      caption: "of total employment",
      source: "World Bank WDI",
      icon: Briefcase,
      tone: "primary" as const,
    },
    {
      label: "Youth with secondary education",
      value: country.secondaryNow,
      caption: "Current — ages 20–24",
      source: "UNESCO UIS",
      icon: GraduationCap,
      tone: "soft" as const,
    },
    {
      label: "Projected secondary by 2035",
      value: country.secondary2035,
      caption: `+${parseInt(country.secondary2035) - parseInt(country.secondaryNow)} pts vs today`,
      source: "Wittgenstein Centre",
      icon: TrendingUp,
      tone: "soft" as const,
    },
  ];

  const trendIcon = (t: "up" | "down" | "flat") =>
    t === "up" ? ArrowUp : t === "down" ? ArrowDown : Minus;

  // Build heatmap groups: rows by risk
  const riskGroups: { label: string; key: "low" | "med" | "high"; tone: string }[] = [
    { label: "Low risk · durable", key: "low", tone: "bg-success/15 text-success border-success/30" },
    { label: "Medium risk · evolving", key: "med", tone: "bg-warning/20 text-warning-foreground border-warning/40" },
    { label: "High risk · automatable", key: "high", tone: "bg-accent/15 text-accent border-accent/40" },
  ];

  const policyMeta: Record<
    "critical" | "opportunity" | "priority",
    { label: string; tone: string; icon: typeof AlertTriangle }
  > = {
    critical: {
      label: "Critical",
      tone: "bg-destructive text-destructive-foreground",
      icon: AlertTriangle,
    },
    opportunity: {
      label: "Opportunity",
      tone: "bg-accent text-accent-foreground",
      icon: Sparkles,
    },
    priority: {
      label: "Priority",
      tone: "bg-primary text-primary-foreground",
      icon: Target,
    },
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      {/* Logged-in band */}
      {user && (
        <div className="border-b border-border bg-card/60 backdrop-blur-sm">
          <div className="container max-w-7xl mx-auto px-4 md:px-6 py-2.5 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <ShieldCheck size={14} className="text-accent" />
              <span>
                Logged in as: <span className="font-bold text-primary">{user.role}</span>
              </span>
            </div>
            <Button
              onClick={handleLogout}
              variant="ghost"
              size="sm"
              className="h-8 text-xs text-muted-foreground hover:text-foreground"
            >
              <LogOut size={13} className="mr-1.5" /> Logout
            </Button>
          </div>
        </div>
      )}

      {/* Header */}
      <section className="relative border-b border-border bg-gradient-warm overflow-hidden">
        <div className="absolute -top-32 -right-20 w-96 h-96 rounded-full bg-accent/15 blur-3xl" />
        <div className="container max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-14 relative">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent text-accent-foreground text-[10px] font-bold uppercase tracking-[0.18em] mb-5 shadow-warm">
                <ShieldCheck size={12} /> For NGOs & Government Program Officers
              </div>
              <h1 className="font-display text-4xl md:text-6xl font-bold text-primary tracking-[-0.03em] leading-[1] mb-3">
                Program Officer Dashboard
              </h1>
              <p className="text-muted-foreground text-lg max-w-xl">
                Aggregate signal from Rozgar.ai's profile network in {country.name} — updated continuously.
              </p>
            </div>
            <CountrySwitcher variant="prominent" />
          </div>
        </div>
      </section>

      <section className="container max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-14 flex-1 w-full space-y-8">
        {/* STAT CARDS */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map((s) => (
            <div
              key={s.label}
              className={cn(
                "relative rounded-3xl p-6 overflow-hidden border-2 shadow-card",
                s.tone === "accent" && "bg-accent text-accent-foreground border-accent",
                s.tone === "primary" && "bg-primary text-primary-foreground border-primary",
                s.tone === "soft" && "bg-card text-foreground border-border"
              )}
            >
              <div
                className="absolute inset-0 opacity-[0.07]"
                style={{
                  backgroundImage: "radial-gradient(currentColor 1px, transparent 1px)",
                  backgroundSize: "18px 18px",
                }}
              />
              <div className="relative">
                <div className="flex items-start justify-between mb-5">
                  <s.icon size={22} className={s.tone === "soft" ? "text-accent" : "opacity-80"} />
                  <span
                    className={cn(
                      "text-[9px] uppercase tracking-[0.16em] font-bold",
                      s.tone === "soft" ? "text-muted-foreground" : "opacity-70"
                    )}
                  >
                    {s.source}
                  </span>
                </div>
                <div
                  className={cn(
                    "font-display font-bold tracking-[-0.04em] leading-[0.9] mb-2",
                    "text-5xl md:text-6xl",
                    s.tone === "soft" && "text-primary"
                  )}
                >
                  {s.value}
                </div>
                <div className="font-display text-base font-semibold mb-1 leading-tight">
                  {s.label}
                </div>
                <div
                  className={cn(
                    "text-xs",
                    s.tone === "soft" ? "text-muted-foreground" : "opacity-75"
                  )}
                >
                  {s.caption}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* SKILLS GAP TABLE */}
        <div className="bg-card rounded-3xl p-6 md:p-8 border border-border shadow-card">
          <div className="flex items-start justify-between mb-6 flex-wrap gap-3">
            <div>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-primary tracking-tight">
                Skills gap by sector
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                Employer demand vs youth supply, indexed 0–100
              </p>
            </div>
            <span className="text-[10px] uppercase tracking-[0.16em] font-bold text-muted-foreground">
              Source: ILO + Rozgar.ai network
            </span>
          </div>

          <div className="overflow-x-auto -mx-2">
            <table className="w-full text-sm min-w-[640px]">
              <thead>
                <tr className="border-b-2 border-border">
                  <th className="text-left py-3 px-3 text-[10px] uppercase tracking-[0.15em] font-bold text-muted-foreground">
                    Sector
                  </th>
                  <th className="text-left py-3 px-3 text-[10px] uppercase tracking-[0.15em] font-bold text-muted-foreground">
                    Employer demand
                  </th>
                  <th className="text-left py-3 px-3 text-[10px] uppercase tracking-[0.15em] font-bold text-muted-foreground">
                    Youth supply
                  </th>
                  <th className="text-center py-3 px-3 text-[10px] uppercase tracking-[0.15em] font-bold text-muted-foreground">
                    Gap score
                  </th>
                  <th className="text-right py-3 px-3 text-[10px] uppercase tracking-[0.15em] font-bold text-muted-foreground">
                    Trend
                  </th>
                </tr>
              </thead>
              <tbody>
                {country.skillsGap.map((row, i) => {
                  const TrendIcon = trendIcon(row.trend);
                  const gapValue = row.demand - row.supply;
                  return (
                    <tr
                      key={row.sector}
                      className={cn(
                        "border-b border-border/60 hover:bg-secondary/40 transition-smooth",
                        i === country.skillsGap.length - 1 && "border-b-0"
                      )}
                    >
                      <td className="py-4 px-3 font-semibold text-foreground">{row.sector}</td>
                      <td className="py-4 px-3">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-2 max-w-[120px] bg-secondary rounded-full overflow-hidden">
                            <div
                              className="h-full bg-primary rounded-full"
                              style={{ width: `${row.demand}%` }}
                            />
                          </div>
                          <span className="text-xs font-mono text-muted-foreground tabular-nums w-8">
                            {row.demand}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-3">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-2 max-w-[120px] bg-secondary rounded-full overflow-hidden">
                            <div
                              className="h-full bg-accent/60 rounded-full"
                              style={{ width: `${row.supply}%` }}
                            />
                          </div>
                          <span className="text-xs font-mono text-muted-foreground tabular-nums w-8">
                            {row.supply}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-3 text-center">
                        <span
                          className={cn(
                            "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold",
                            row.gap === "high" && "bg-destructive/15 text-destructive border border-destructive/30",
                            row.gap === "med" && "bg-warning/20 text-warning-foreground border border-warning/40",
                            row.gap === "low" && "bg-success/15 text-success border border-success/30"
                          )}
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-current" />
                          {row.gap === "high" ? "Critical" : row.gap === "med" ? "Moderate" : "Sufficient"}
                          <span className="opacity-60 font-mono">
                            {gapValue > 0 ? `+${gapValue}` : gapValue}
                          </span>
                        </span>
                      </td>
                      <td className="py-4 px-3 text-right">
                        <TrendIcon
                          size={16}
                          className={cn(
                            "inline-block",
                            row.trend === "up" && "text-success",
                            row.trend === "down" && "text-destructive",
                            row.trend === "flat" && "text-muted-foreground"
                          )}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* AUTOMATION HEATMAP */}
        <div className="bg-card rounded-3xl p-6 md:p-8 border border-border shadow-card">
          <div className="flex items-start justify-between mb-6 flex-wrap gap-3">
            <div>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-primary tracking-tight">
                Automation risk by occupation
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                Frey-Osborne risk scores mapped to common youth occupations · bubble size = % of youth employed
              </p>
            </div>
            <span className="text-[10px] uppercase tracking-[0.16em] font-bold text-muted-foreground">
              Source: Frey-Osborne (2017)
            </span>
          </div>

          <div className="space-y-4">
            {riskGroups.map((g) => {
              const items = country.occupations.filter((o) => o.risk === g.key);
              return (
                <div key={g.key} className="grid md:grid-cols-[180px_1fr] gap-3 md:gap-5 items-start">
                  <div
                    className={cn(
                      "px-3 py-2 rounded-xl text-xs font-bold uppercase tracking-wider border text-center md:text-left",
                      g.tone
                    )}
                  >
                    {g.label}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {items.length === 0 ? (
                      <span className="text-xs text-muted-foreground italic py-2">
                        No occupations in this band
                      </span>
                    ) : (
                      items.map((o) => (
                        <div
                          key={o.name}
                          className={cn(
                            "inline-flex items-center gap-2.5 px-3.5 py-2 rounded-xl border transition-smooth hover:-translate-y-0.5",
                            g.key === "low" && "bg-success/5 border-success/20",
                            g.key === "med" && "bg-warning/5 border-warning/30",
                            g.key === "high" && "bg-accent/5 border-accent/30"
                          )}
                        >
                          <span
                            className={cn(
                              "rounded-full",
                              g.key === "low" && "bg-success",
                              g.key === "med" && "bg-warning",
                              g.key === "high" && "bg-accent"
                            )}
                            style={{
                              width: `${8 + o.share * 0.8}px`,
                              height: `${8 + o.share * 0.8}px`,
                            }}
                          />
                          <span className="text-sm font-semibold text-foreground">{o.name}</span>
                          <span className="text-[10px] font-mono text-muted-foreground">
                            {o.share}%
                          </span>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CHARTS — education + scatter */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Education projection */}
          <div className="bg-card rounded-3xl p-6 md:p-8 border border-border shadow-card">
            <div className="flex items-start justify-between mb-6 flex-wrap gap-2">
              <div>
                <h2 className="font-display text-xl md:text-2xl font-bold text-primary tracking-tight">
                  Education attainment 2025–2035
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Projected youth (ages 20–24) in {country.name}
                </p>
              </div>
              <span className="text-[10px] uppercase tracking-[0.16em] font-bold text-muted-foreground">
                Wittgenstein Centre
              </span>
            </div>

            <div className="h-[280px] -ml-3">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={country.educationProjection} margin={{ top: 10, right: 16, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis
                    dataKey="year"
                    stroke="hsl(var(--muted-foreground))"
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis
                    stroke="hsl(var(--muted-foreground))"
                    tick={{ fontSize: 12 }}
                    unit="%"
                    domain={[0, 80]}
                  />
                  <Tooltip
                    contentStyle={{
                      background: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "12px",
                      fontSize: "12px",
                    }}
                    formatter={(v: number) => `${v}%`}
                  />
                  <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "8px" }} />
                  <Line
                    type="monotone"
                    dataKey="secondary"
                    name="Secondary completed"
                    stroke="hsl(var(--primary))"
                    strokeWidth={3}
                    dot={{ r: 4, fill: "hsl(var(--primary))" }}
                    activeDot={{ r: 6 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="tertiary"
                    name="Tertiary completed"
                    stroke="hsl(var(--accent))"
                    strokeWidth={3}
                    dot={{ r: 4, fill: "hsl(var(--accent))" }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Scatter */}
          <div className="bg-card rounded-3xl p-6 md:p-8 border border-border shadow-card">
            <div className="flex items-start justify-between mb-6 flex-wrap gap-2">
              <div>
                <h2 className="font-display text-xl md:text-2xl font-bold text-primary tracking-tight">
                  Sector growth vs automation risk
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Bubble size = youth employed (thousands)
                </p>
              </div>
              <span className="text-[10px] uppercase tracking-[0.16em] font-bold text-muted-foreground">
                ILO + Frey-Osborne
              </span>
            </div>

            <div className="h-[280px] -ml-3">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart margin={{ top: 10, right: 16, left: 0, bottom: 12 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis
                    type="number"
                    dataKey="automationRisk"
                    name="Automation risk"
                    domain={[0, 100]}
                    stroke="hsl(var(--muted-foreground))"
                    tick={{ fontSize: 12 }}
                    label={{
                      value: "Automation risk (%)",
                      position: "bottom",
                      offset: -2,
                      style: { fontSize: 11, fill: "hsl(var(--muted-foreground))" },
                    }}
                  />
                  <YAxis
                    type="number"
                    dataKey="growth"
                    name="Growth"
                    stroke="hsl(var(--muted-foreground))"
                    tick={{ fontSize: 12 }}
                    unit="%"
                    label={{
                      value: "Growth (% YoY)",
                      angle: -90,
                      position: "insideLeft",
                      style: { fontSize: 11, fill: "hsl(var(--muted-foreground))", textAnchor: "middle" },
                    }}
                  />
                  <ZAxis type="number" dataKey="youthEmployed" range={[120, 900]} />
                  <ReferenceLine y={0} stroke="hsl(var(--border))" />
                  <Tooltip
                    cursor={{ strokeDasharray: "3 3" }}
                    contentStyle={{
                      background: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "12px",
                      fontSize: "12px",
                    }}
                    formatter={(value: number, name: string) => {
                      if (name === "Automation risk") return [`${value}%`, name];
                      if (name === "Growth") return [`${value}%`, name];
                      return [`${value}k`, "Youth employed"];
                    }}
                    labelFormatter={(_, payload) =>
                      payload?.[0]?.payload?.sector ?? ""
                    }
                  />
                  <Scatter
                    data={country.sectorBubbles}
                    fill="hsl(var(--accent))"
                    fillOpacity={0.7}
                    stroke="hsl(var(--accent))"
                    strokeWidth={1.5}
                  />
                </ScatterChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* POLICY RECOMMENDATIONS */}
        <div>
          <div className="flex items-end justify-between mb-5 flex-wrap gap-2">
            <div>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-primary tracking-tight">
                Policy recommendations
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                Generated from current {country.name} signal · prioritized by impact
              </p>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {country.policies.map((p) => {
              const meta = policyMeta[p.level];
              return (
                <div
                  key={p.title}
                  className="bg-card rounded-3xl p-6 border border-border shadow-card hover:shadow-warm transition-smooth hover:-translate-y-1 flex flex-col"
                >
                  <div className={cn("inline-flex w-fit items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.16em] mb-4", meta.tone)}>
                    <meta.icon size={11} /> {meta.label}
                  </div>
                  <h3 className="font-display text-lg font-bold text-primary leading-tight mb-2 tracking-tight">
                    {p.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                    {p.body}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* FOOTER SOURCES */}
        <div className="bg-primary rounded-3xl p-6 md:p-8 text-primary-foreground">
          <div className="flex items-start gap-3 mb-4">
            <ShieldCheck size={18} className="text-accent flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-display text-lg font-bold mb-1">Data sources</h3>
              <p className="text-sm text-primary-foreground/70">
                All figures sourced from public datasets and peer-reviewed research. Visualizations are illustrative — verify before use in published policy briefs.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 pl-7">
            {[
              "ILO ILOSTAT",
              "World Bank WDI",
              "Frey-Osborne Automation Scores (2017)",
              "Wittgenstein Centre 2025–2035",
              "UNESCO Institute for Statistics",
            ].map((s) => (
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
