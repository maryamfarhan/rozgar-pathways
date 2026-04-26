import { useEffect, useState } from "react";
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
  Download,
  Share2,
  FileSpreadsheet,
  Activity,
  MapPin,
  Lock,
  ExternalLink,
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

  const lastUpdated = new Date().toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const exportCSV = () => {
    const header = "Sector,Employer Demand,Youth Supply,Gap,Trend\n";
    const rows = country.skillsGap
      .map((r) => `${r.sector},${r.demand},${r.supply},${r.gap},${r.trend}`)
      .join("\n");
    const blob = new Blob([header + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `rozgar-skills-gap-${country.code.toLowerCase()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Skills gap CSV exported");
  };

  const handleShare = async () => {
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
      toast.success("Dashboard link copied to clipboard");
    } catch {
      toast.error("Could not copy link");
    }
  };

  const handleDownloadReport = () => {
    toast.success("Preparing PDF report…", { description: "Demo: report would download here." });
  };

  type Trend = "up" | "down" | "flat";
  const statCards: {
    label: string;
    value: string;
    caption: string;
    source: string;
    year: string;
    icon: typeof Users;
    tone: "accent" | "primary" | "soft";
    trend: Trend;
    trendDelta: string;
  }[] = [
    {
      label: "Youth unemployment",
      value: country.unemploymentRate,
      caption: `${country.name} · ages 15–24`,
      source: "ILO ILOSTAT",
      year: "2024",
      icon: Users,
      tone: "accent",
      trend: "up",
      trendDelta: country.code === "PK" ? "+0.4 pts YoY" : "+1.2 pts YoY",
    },
    {
      label: "Informal economy share",
      value: country.informalShare,
      caption: "of total employment",
      source: "World Bank WDI",
      year: "2023",
      icon: Briefcase,
      tone: "primary",
      trend: "flat",
      trendDelta: "stable",
    },
    {
      label: "Youth with secondary education",
      value: country.secondaryNow,
      caption: "Current — ages 20–24",
      source: "UNESCO UIS",
      year: "2023",
      icon: GraduationCap,
      tone: "soft",
      trend: "up",
      trendDelta: country.code === "PK" ? "+1.8 pts YoY" : "+1.4 pts YoY",
    },
    {
      label: "Projected secondary by 2035",
      value: country.secondary2035,
      caption: `+${parseInt(country.secondary2035) - parseInt(country.secondaryNow)} pts vs today`,
      source: "Wittgenstein Centre",
      year: "Proj. 2035",
      icon: TrendingUp,
      tone: "soft",
      trend: "up",
      trendDelta: "projected",
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

      {/* Institutional top banner */}
      <div className="bg-primary text-primary-foreground border-b border-primary/40">
        <div className="container max-w-7xl mx-auto px-4 md:px-6 py-2 flex items-center justify-center gap-2 text-[10px] md:text-[11px] font-bold uppercase tracking-[0.18em] text-center">
          <Lock size={11} className="text-accent flex-shrink-0" />
          <span className="text-primary-foreground/90">
            Rozgar.ai Program Intelligence Platform
          </span>
          <span className="hidden sm:inline text-primary-foreground/40">·</span>
          <span className="hidden sm:inline text-accent">For Verified Organizations Only</span>
        </div>
      </div>

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
            <div className="flex flex-col gap-4 lg:items-end">
              <CountrySwitcher variant="prominent" />
              <div className="flex items-center gap-2 flex-wrap">
                <Button
                  onClick={handleDownloadReport}
                  size="sm"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 h-9 rounded-full px-4 text-xs font-semibold"
                >
                  <Download size={14} className="mr-1.5" /> Download Report
                </Button>
                <Button
                  onClick={handleShare}
                  size="sm"
                  variant="outline"
                  className="h-9 rounded-full px-4 text-xs font-semibold border-primary/20 bg-card hover:bg-secondary"
                >
                  <Share2 size={14} className="mr-1.5" /> Share Dashboard
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-14 flex-1 w-full space-y-8">
        {/* STAT CARDS */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map((s) => {
            const TrendArrow = trendIcon(s.trend);
            const trendColor =
              s.trend === "up"
                ? s.tone === "soft"
                  ? "text-accent"
                  : "text-accent-foreground"
                : s.trend === "down"
                  ? "text-destructive"
                  : "text-muted-foreground";
            return (
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
                    <div
                      className={cn(
                        "flex flex-col items-end gap-0.5 text-right",
                        s.tone === "soft" ? "text-muted-foreground" : "opacity-80"
                      )}
                    >
                      <span className="text-[9px] uppercase tracking-[0.16em] font-bold">
                        {s.source}
                      </span>
                      <span className="text-[9px] uppercase tracking-[0.14em] font-bold opacity-70">
                        {s.year}
                      </span>
                    </div>
                  </div>
                  <div
                    className={cn(
                      "font-display font-bold tracking-[-0.04em] leading-[0.9] mb-2 flex items-end gap-2",
                      "text-5xl md:text-6xl",
                      s.tone === "soft" && "text-primary"
                    )}
                  >
                    <span>{s.value}</span>
                    <TrendArrow
                      size={18}
                      className={cn("mb-2", trendColor, s.tone !== "soft" && "opacity-90")}
                    />
                  </div>
                  <div className="font-display text-base font-semibold mb-1 leading-tight">
                    {s.label}
                  </div>
                  <div
                    className={cn(
                      "text-xs flex items-center gap-1.5",
                      s.tone === "soft" ? "text-muted-foreground" : "opacity-75"
                    )}
                  >
                    <span>{s.caption}</span>
                    <span className="opacity-50">·</span>
                    <span className="font-semibold">{s.trendDelta}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* LIVE ACTIVITY PANEL */}
        <LiveActivityPanel countryCode={country.code} />

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
            <div className="flex items-center gap-3 flex-wrap">
              <div className="text-right">
                <div className="text-[10px] uppercase tracking-[0.16em] font-bold text-muted-foreground">
                  Last updated
                </div>
                <div className="text-xs font-mono text-foreground/80">{lastUpdated}</div>
              </div>
              <Button
                onClick={exportCSV}
                size="sm"
                variant="outline"
                className="h-8 rounded-full px-3 text-xs font-semibold border-primary/20 hover:bg-secondary"
              >
                <FileSpreadsheet size={13} className="mr-1.5" /> Export CSV
              </Button>
            </div>
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

        {/* REGION HEATMAP */}
        <RegionHeatmap
          regions={country.regions}
          regionLabel={country.regionLabel}
          countryName={country.name}
        />

        {/* POLICY RECOMMENDATIONS */}
        <div>
          <div className="flex items-end justify-between mb-6 flex-wrap gap-2">
            <div>
              <div className="inline-block text-[10px] uppercase tracking-[0.2em] text-accent font-bold mb-2">
                Recommended actions · Official briefs
              </div>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-primary tracking-tight">
                Policy recommendations
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                Generated from current {country.name} signal · prioritized by impact
              </p>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {country.policies.map((p, i) => {
              const meta = policyMeta[p.level];
              const accentBar =
                p.level === "critical"
                  ? "hsl(var(--destructive))"
                  : p.level === "opportunity"
                    ? "hsl(var(--accent))"
                    : "hsl(var(--primary))";
              return (
                <article
                  key={p.title}
                  className="group relative bg-card rounded-3xl p-7 border border-border shadow-card hover:shadow-warm transition-smooth hover:-translate-y-1.5 flex flex-col overflow-hidden"
                >
                  {/* Left accent rail */}
                  <span
                    aria-hidden
                    className="absolute left-0 top-6 bottom-6 w-1 rounded-r-full transition-smooth group-hover:top-2 group-hover:bottom-2"
                    style={{ background: accentBar }}
                  />
                  {/* Soft tint corner */}
                  <span
                    aria-hidden
                    className="absolute -top-16 -right-16 w-40 h-40 rounded-full opacity-[0.08] blur-2xl"
                    style={{ background: accentBar }}
                  />

                  <div className="relative flex items-center justify-between mb-5">
                    <div
                      className={cn(
                        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.16em]",
                        meta.tone
                      )}
                    >
                      <meta.icon size={11} /> {meta.label}
                    </div>
                    <span className="font-display text-3xl font-bold text-primary/[0.08] leading-none select-none">
                      0{i + 1}
                    </span>
                  </div>

                  <h3 className="relative font-display text-lg font-bold text-primary leading-[1.2] mb-3 tracking-tight">
                    {p.title}
                  </h3>
                  <p className="relative text-sm text-muted-foreground leading-relaxed mb-4">
                    {p.body}
                  </p>

                  {/* Data justification line */}
                  <div className="relative mb-5 p-3 rounded-xl bg-secondary/50 border border-border/60">
                    <div className="text-[9px] uppercase tracking-[0.16em] font-bold text-muted-foreground mb-1">
                      Data justification
                    </div>
                    <p className="text-[11px] leading-snug text-foreground/80 font-mono">
                      {p.justification}
                    </p>
                  </div>

                  <div className="relative mt-auto flex items-center justify-between gap-2 pt-4 border-t border-border/60">
                    <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.14em] font-bold text-muted-foreground">
                      <span className="w-1 h-1 rounded-full bg-accent" />
                      {country.name} · 2024
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-7 px-2.5 text-[11px] font-semibold text-primary hover:bg-primary/5"
                      onClick={() =>
                        toast.info("Full brief coming soon", {
                          description: "Demo: opens detailed PDF brief.",
                        })
                      }
                    >
                      View Full Brief <ExternalLink size={11} className="ml-1" />
                    </Button>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* FOOTER SOURCES */}
        <div className="relative bg-primary rounded-3xl p-7 md:p-10 text-primary-foreground overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage: "radial-gradient(hsl(39 38% 97%) 1px, transparent 1px)",
              backgroundSize: "22px 22px",
            }}
          />
          <div className="absolute -right-24 -bottom-24 w-72 h-72 rounded-full bg-accent/20 blur-3xl" />

          <div className="relative grid md:grid-cols-[1fr_auto] gap-6 items-start">
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-2xl bg-accent/15 border border-accent/30 flex items-center justify-center flex-shrink-0">
                <ShieldCheck size={20} className="text-accent" />
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-accent font-bold mb-2">
                  Verified · Peer-reviewed
                </div>
                <h3 className="font-display text-2xl font-bold mb-2 leading-tight">Data sources</h3>
                <p className="text-sm text-primary-foreground/70 leading-relaxed max-w-lg">
                  All figures sourced from public datasets and peer-reviewed research. Visualizations are illustrative — verify before use in published policy briefs.
                </p>
              </div>
            </div>
            <div className="text-right md:pt-1">
              <div className="font-display text-5xl font-bold text-accent leading-none">5</div>
              <div className="text-[10px] uppercase tracking-[0.18em] text-primary-foreground/60 font-bold mt-1">
                Datasets cited
              </div>
            </div>
          </div>

          <div className="relative mt-7 pt-6 border-t border-primary-foreground/15 grid sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {[
              { name: "ILO ILOSTAT", scope: "Employment & labor force" },
              { name: "World Bank WDI", scope: "Informal economy share" },
              { name: "Frey-Osborne (2017)", scope: "Automation risk scores" },
              { name: "Wittgenstein Centre", scope: "Education projections 2025–2035" },
              { name: "UNESCO UIS", scope: "Educational attainment" },
            ].map((s) => (
              <div
                key={s.name}
                className="flex items-start gap-2.5 px-3.5 py-2.5 rounded-xl bg-primary-foreground/[0.06] border border-primary-foreground/15 hover:bg-primary-foreground/[0.1] transition-smooth"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 flex-shrink-0" />
                <div className="min-w-0">
                  <div className="text-sm font-semibold leading-tight">{s.name}</div>
                  <div className="text-[11px] text-primary-foreground/55 mt-0.5 leading-tight">
                    {s.scope}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Dashboard;
