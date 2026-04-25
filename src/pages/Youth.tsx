import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCountry } from "@/contexts/CountryContext";
import { ArrowRight, ArrowLeft, Check, MapPin, TrendingDown, TrendingUp, Sparkles, Clock, Target } from "lucide-react";
import { cn } from "@/lib/utils";

const LANGUAGES = ["Urdu", "English", "Sindhi", "Punjabi", "Pashto"];

const Youth = () => {
  const { country } = useCountry();
  const [step, setStep] = useState(1);
  const [langs, setLangs] = useState<string[]>(["Urdu", "English"]);

  const toggleLang = (l: string) =>
    setLangs((prev) => (prev.includes(l) ? prev.filter((x) => x !== l) : [...prev, l]));

  const isPK = country.code === "PK";

  // Demo data for Zara from Karachi
  const profile = {
    name: "Zara Ahmed",
    location: isPK ? "Karachi, Pakistan" : "Lagos, Nigeria",
    skills: [
      { name: "Mobile device repair", confidence: "High", esco: "Electronics technician", risk: "low" },
      { name: "Customer communication", confidence: "High", esco: "Service interaction", risk: "low" },
      { name: "Bilingual translation (Urdu↔English)", confidence: "High", esco: "Language services", risk: "med" },
      { name: "Basic bookkeeping", confidence: "Medium", esco: "Accounting support", risk: "high" },
      { name: "Social media marketing", confidence: "Medium", esco: "Digital marketing", risk: "med" },
      { name: "Soldering & micro-electronics", confidence: "High", esco: "Electronics technician", risk: "low" },
    ],
    transferable: ["Problem diagnosis", "Customer trust", "Working with hands", "Patience under pressure"],
    summary:
      "Zara has spent three years repairing phones in her uncle's shop in Karachi. She's never had a contract, but she diagnoses faults faster than most certified technicians, handles customers in two languages, and has taught herself basic Instagram marketing for the shop. Her hands-on electronics skills are exactly what the IoT and renewable-energy sectors need next.",
    automationRisk: "Low-Medium",
    durableSkills: ["Mobile device repair", "Customer communication", "Soldering"],
    atRiskSkills: ["Basic bookkeeping", "Routine cataloguing"],
  };

  const opportunities = isPK
    ? [
        {
          tag: "Freelance · Remote-friendly",
          title: "Junior IoT Hardware Tester",
          access: "Apply via local fintech-hardware accelerators in Karachi (NIC, 10Pearls)",
          income: "PKR 45,000 – 80,000 / month",
          time: "4–8 weeks to first income",
        },
        {
          tag: "Local employment",
          title: "Solar Installation Technician",
          access: "Pakistan Solar Association vocational bridge program (3 weeks)",
          income: "PKR 35,000 – 65,000 / month",
          time: "3–5 weeks",
        },
        {
          tag: "Microbusiness · Platform",
          title: "Verified Phone Repair on Daraz / Bykea",
          access: "Verified-vendor onboarding with Rozgar credential",
          income: "PKR 25,000 – 60,000 / month",
          time: "1–2 weeks",
        },
      ]
    : [
        {
          tag: "Freelance · Platform",
          title: "Junior Hardware QA Tester",
          access: "Lagos hardware hubs (CcHub, Wennovation)",
          income: "NGN 180,000 – 320,000 / month",
          time: "4–8 weeks",
        },
        {
          tag: "Local employment",
          title: "Solar Installation Technician",
          access: "REA-backed vocational bridge program",
          income: "NGN 140,000 – 260,000 / month",
          time: "3–5 weeks",
        },
        {
          tag: "Microbusiness",
          title: "Verified Phone Repair on Jumia / Jiji",
          access: "Verified-vendor onboarding with Rozgar credential",
          income: "NGN 100,000 – 240,000 / month",
          time: "1–2 weeks",
        },
      ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <section className="container max-w-4xl mx-auto px-4 py-10 flex-1 w-full">
        {/* Stepper */}
        <div className="flex items-center justify-center gap-2 mb-10">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div
                className={cn(
                  "w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold transition-smooth",
                  step >= s ? "bg-accent text-accent-foreground" : "bg-secondary text-muted-foreground"
                )}
              >
                {step > s ? <Check size={16} /> : s}
              </div>
              {s < 3 && <div className={cn("w-12 h-0.5 transition-smooth", step > s ? "bg-accent" : "bg-border")} />}
            </div>
          ))}
        </div>

        {/* Step 1: Form */}
        {step === 1 && (
          <div className="animate-fade-in">
            <div className="text-center mb-8">
              <h1 className="font-display text-4xl md:text-5xl font-bold text-primary mb-3">Tell us about you</h1>
              <p className="text-muted-foreground text-lg">
                Your experience matters, even if no one has recognized it yet.
              </p>
            </div>

            <div className="bg-card rounded-2xl p-6 md:p-8 border border-border shadow-card space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" defaultValue="Zara Ahmed" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" defaultValue={isPK ? "Karachi" : "Lagos"} />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Education level</Label>
                <Select defaultValue="matric">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">No formal education</SelectItem>
                    <SelectItem value="matric">Matric</SelectItem>
                    <SelectItem value="inter">Intermediate</SelectItem>
                    <SelectItem value="bachelors">Bachelor's</SelectItem>
                    <SelectItem value="vocational">Vocational</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="work">Tell us what you've done — paid, unpaid, informal, all counts</Label>
                <Textarea
                  id="work"
                  rows={4}
                  defaultValue="Worked at my uncle's phone repair shop for 3 years. Fixed screens, batteries, charging ports. Handled customers in Urdu and English. Started running the shop's Instagram last year."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="self">What have you learned on your own?</Label>
                <Textarea
                  id="self"
                  rows={3}
                  defaultValue="YouTube tutorials for soldering and motherboard repair. Basic bookkeeping for the shop. Instagram marketing and editing reels."
                />
              </div>

              <div className="space-y-2">
                <Label>Languages spoken</Label>
                <div className="flex flex-wrap gap-2 pt-1">
                  {LANGUAGES.map((l) => (
                    <button
                      key={l}
                      type="button"
                      onClick={() => toggleLang(l)}
                      className={cn(
                        "px-4 py-2 rounded-full text-sm font-medium border transition-smooth",
                        langs.includes(l)
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-card text-muted-foreground border-border hover:border-primary/40"
                      )}
                    >
                      {l}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <Button onClick={() => setStep(2)} size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-warm">
                  See my profile <ArrowRight size={18} className="ml-1" />
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Skills profile */}
        {step === 2 && (
          <div className="animate-fade-in space-y-6">
            <div className="text-center mb-2">
              <h1 className="font-display text-4xl md:text-5xl font-bold text-primary mb-3">
                Your skills, made visible
              </h1>
              <p className="text-muted-foreground">Mapped to ESCO standards · Reviewed by AI + human signal</p>
            </div>

            {/* Profile card */}
            <div className="bg-gradient-hero rounded-2xl p-7 md:p-9 text-primary-foreground shadow-warm">
              <div className="flex items-start gap-4 mb-2">
                <div className="w-14 h-14 rounded-full bg-accent flex items-center justify-center font-display font-bold text-xl text-accent-foreground">
                  ZA
                </div>
                <div>
                  <h2 className="font-display text-2xl font-bold">{profile.name}</h2>
                  <div className="flex items-center gap-1.5 text-primary-foreground/80 text-sm mt-1">
                    <MapPin size={14} /> {profile.location}
                  </div>
                </div>
              </div>
            </div>

            {/* Summary */}
            <div className="bg-card rounded-2xl p-6 md:p-7 border border-border shadow-card">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="text-accent" size={18} />
                <h3 className="font-display text-xl font-bold text-primary">In plain language</h3>
              </div>
              <p className="text-foreground leading-relaxed">{profile.summary}</p>
            </div>

            {/* Skills list */}
            <div className="bg-card rounded-2xl p-6 md:p-7 border border-border shadow-card">
              <h3 className="font-display text-xl font-bold text-primary mb-4">Mapped skills</h3>
              <div className="space-y-3">
                {profile.skills.map((s) => (
                  <div key={s.name} className="flex items-center justify-between gap-3 p-3 rounded-lg hover:bg-secondary/50 transition-smooth">
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-foreground">{s.name}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">ESCO · {s.esco}</div>
                    </div>
                    <ConfidenceBadge level={s.confidence} />
                  </div>
                ))}
              </div>
            </div>

            {/* Transferable */}
            <div className="bg-card rounded-2xl p-6 md:p-7 border border-border shadow-card">
              <h3 className="font-display text-xl font-bold text-primary mb-4">Transferable strengths</h3>
              <div className="flex flex-wrap gap-2">
                {profile.transferable.map((t) => (
                  <span key={t} className="px-3 py-1.5 rounded-full bg-primary-soft text-primary text-sm font-medium">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Automation risk */}
            <div className="bg-card rounded-2xl p-6 md:p-7 border border-border shadow-card">
              <h3 className="font-display text-xl font-bold text-primary mb-2">Automation risk</h3>
              <div className="flex items-center gap-3 mb-4">
                <div className="flex-1 h-2.5 rounded-full bg-secondary overflow-hidden">
                  <div className="h-full w-[35%] bg-gradient-to-r from-success to-warning rounded-full" />
                </div>
                <span className="font-semibold text-success">{profile.automationRisk}</span>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed mb-5">
                Most of Zara's skills involve hands-on physical work and human judgment that AI cannot replace soon.
                Her bookkeeping and routine cataloguing tasks are more exposed.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center gap-2 text-success font-semibold text-sm mb-2">
                    <TrendingUp size={16} /> Durable
                  </div>
                  <ul className="space-y-1 text-sm text-foreground">
                    {profile.durableSkills.map((s) => <li key={s}>· {s}</li>)}
                  </ul>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-warning font-semibold text-sm mb-2">
                    <TrendingDown size={16} /> At risk
                  </div>
                  <ul className="space-y-1 text-sm text-foreground">
                    {profile.atRiskSkills.map((s) => <li key={s}>· {s}</li>)}
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex justify-between pt-2">
              <Button variant="outline" onClick={() => setStep(1)}>
                <ArrowLeft size={16} className="mr-1" /> Back
              </Button>
              <Button onClick={() => setStep(3)} size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-warm">
                See opportunities <ArrowRight size={18} className="ml-1" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Opportunities */}
        {step === 3 && (
          <div className="animate-fade-in space-y-6">
            <div className="text-center mb-2">
              <h1 className="font-display text-4xl md:text-5xl font-bold text-primary mb-3">
                Real opportunities, ranked.
              </h1>
              <p className="text-muted-foreground">Income paths in {country.flag} {country.name} · {country.currency}</p>
            </div>

            <div className="space-y-4">
              {opportunities.map((o, i) => (
                <article
                  key={o.title}
                  className="group relative bg-card rounded-3xl p-6 md:p-7 border border-border shadow-card hover:shadow-warm transition-smooth hover:-translate-y-1 overflow-hidden"
                >
                  <span
                    aria-hidden
                    className="absolute left-0 top-6 bottom-6 w-1 rounded-r-full bg-accent transition-smooth group-hover:top-2 group-hover:bottom-2"
                  />
                  <span
                    aria-hidden
                    className="absolute -top-16 -right-16 w-40 h-40 rounded-full bg-accent/[0.07] blur-2xl"
                  />
                  <div className="relative flex items-start gap-5">
                    <div className="relative flex-shrink-0">
                      <div className="absolute inset-0 bg-accent/30 blur-md rounded-full" />
                      <div className="relative w-12 h-12 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-display font-bold text-lg shadow-warm">
                        {i + 1}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-3 mb-2 flex-wrap">
                        <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-accent bg-accent-soft px-2.5 py-1 rounded-full">
                          <span className="w-1 h-1 rounded-full bg-accent" />
                          {o.tag}
                        </span>
                        <span className="text-[10px] uppercase tracking-[0.16em] font-bold text-muted-foreground">
                          Match #{i + 1}
                        </span>
                      </div>
                      <h3 className="font-display text-xl md:text-2xl font-bold text-primary mb-4 tracking-tight leading-tight">
                        {o.title}
                      </h3>
                      <div className="space-y-2.5 text-sm">
                        <div className="flex items-start gap-2.5">
                          <Target size={15} className="text-accent mt-0.5 flex-shrink-0" />
                          <span className="text-foreground/85">{o.access}</span>
                        </div>
                        <div className="flex items-start gap-2.5">
                          <Clock size={15} className="text-accent mt-0.5 flex-shrink-0" />
                          <span className="text-foreground/85">{o.time}</span>
                        </div>
                      </div>
                      <div className="mt-5 pt-4 border-t border-border/60 flex items-end justify-between gap-3 flex-wrap">
                        <div>
                          <div className="text-[10px] uppercase tracking-[0.16em] font-bold text-muted-foreground mb-0.5">
                            Expected income
                          </div>
                          <span className="font-display text-xl md:text-2xl font-bold text-primary tracking-tight">
                            {o.income}
                          </span>
                        </div>
                        <span className="text-[10px] uppercase tracking-[0.14em] font-bold text-accent bg-accent-soft px-2.5 py-1 rounded-full">
                          {country.currency}
                        </span>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* 12-month pathway */}
            <div className="relative bg-gradient-warm rounded-3xl p-7 md:p-9 border border-border overflow-hidden shadow-card">
              <div
                className="absolute inset-0 opacity-[0.07] pointer-events-none"
                style={{
                  backgroundImage: "radial-gradient(hsl(var(--primary)) 1px, transparent 1px)",
                  backgroundSize: "20px 20px",
                  maskImage: "radial-gradient(ellipse 60% 50% at 90% 20%, black, transparent 70%)",
                  WebkitMaskImage: "radial-gradient(ellipse 60% 50% at 90% 20%, black, transparent 70%)",
                }}
              />
              <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-accent/15 blur-3xl" />
              <div className="relative">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-2xl bg-accent text-accent-foreground flex items-center justify-center shadow-warm">
                    <Clock size={18} />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.2em] text-accent font-bold">
                      Your roadmap
                    </div>
                    <h3 className="font-display text-xl md:text-2xl font-bold text-primary tracking-tight">
                      A 12-month pathway
                    </h3>
                  </div>
                </div>
                <p className="text-foreground/85 leading-relaxed">
                  Start with verified phone repair on Daraz this month — that's reliable income. In months 2–3, complete the
                  solar installation bridge program. By month 6, you'll be doing solar+IoT installations alongside repair.
                  By month 12, your verified Rozgar credential plus hands-on portfolio puts you in range of junior hardware
                  QA roles paying <strong className="text-primary">{isPK ? "PKR 80k+" : "NGN 320k+"}</strong> — a 3× increase from where you start today.
                </p>
              </div>
            </div>

            {/* Econometric signals */}
            <div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-accent font-bold mb-3">
                Why this matters · macro signals
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {country.signals.map((s) => (
                  <div
                    key={s.text}
                    className="group relative bg-card rounded-2xl p-5 border border-border shadow-card hover:shadow-warm transition-smooth hover:-translate-y-0.5 overflow-hidden"
                  >
                    <span
                      aria-hidden
                      className="absolute -top-10 -right-10 w-28 h-28 rounded-full bg-accent/[0.06] blur-2xl"
                    />
                    <div className="relative flex items-start gap-3">
                      <div className="w-9 h-9 rounded-xl bg-accent-soft border border-accent/20 flex items-center justify-center flex-shrink-0">
                        <TrendingUp className="text-accent" size={16} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground text-sm leading-snug">{s.text}</p>
                        <div className="mt-3 pt-3 border-t border-border/60 flex items-center gap-1.5 text-[10px] uppercase tracking-[0.14em] font-bold text-muted-foreground">
                          <span className="w-1 h-1 rounded-full bg-accent" />
                          Source · {s.source}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-between pt-2">
              <Button variant="outline" onClick={() => setStep(2)}>
                <ArrowLeft size={16} className="mr-1" /> Back
              </Button>
              <Button onClick={() => setStep(1)} variant="ghost">
                Start over
              </Button>
            </div>
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
};

const ConfidenceBadge = ({ level }: { level: string }) => {
  const styles =
    level === "High"
      ? "bg-success/15 text-success"
      : level === "Medium"
      ? "bg-warning/20 text-warning-foreground"
      : "bg-muted text-muted-foreground";
  return (
    <span className={cn("px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap", styles)}>
      {level}
    </span>
  );
};

export default Youth;
