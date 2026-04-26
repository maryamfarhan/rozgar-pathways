import { useEffect, useState } from "react";
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
import {
  ArrowRight,
  ArrowLeft,
  Check,
  MapPin,
  TrendingDown,
  TrendingUp,
  Sparkles,
  Clock,
  Target,
  Download,
} from "lucide-react";
import { cn } from "@/lib/utils";

const LANGUAGES = ["Urdu", "English", "Sindhi", "Punjabi", "Pashto"];

const ASSESSMENT_STEPS = [
  "Reading your story…",
  "Mapping to global skill standards…",
  "Assessing automation exposure…",
  "Calibrating for Karachi's economy…",
  "Finding real opportunities…",
  "Your profile is ready.",
];

const Youth = () => {
  const { country } = useCountry();
  const [step, setStep] = useState(1);
  const [langs, setLangs] = useState<string[]>(["Urdu", "Sindhi", "English"]);

  const toggleLang = (l: string) =>
    setLangs((prev) => (prev.includes(l) ? prev.filter((x) => x !== l) : [...prev, l]));

  const isPK = country.code === "PK";

  // Demo data for Zara — content creator from Karachi
  const profile = {
    name: "Zara Ahmed",
    age: 21,
    location: isPK ? "Karachi, Pakistan" : "Lagos, Nigeria",
    skills: [
      { name: "Social Media Management", confidence: "High", esco: "Digital marketing specialist", risk: "low" },
      { name: "Video Editing (Mobile)", confidence: "High", esco: "Multimedia content creator", risk: "low" },
      { name: "Digital Marketing", confidence: "Medium", esco: "Marketing assistant", risk: "med" },
      { name: "Client Communication", confidence: "High", esco: "Customer relationship", risk: "low" },
      { name: "Basic Graphic Design", confidence: "Medium", esco: "Graphic designer (entry)", risk: "med" },
    ],
    transferable: ["Creative storytelling", "Trend awareness", "Multilingual outreach", "Self-directed learning"],
    summary:
      "Zara has spent two years running content for a clothing boutique on Tariq Road in Karachi — growing their Instagram from 400 to 4,000 followers entirely from her phone. She edits reels in CapCut, designs in Canva, and taught herself SEO and hashtag strategy from YouTube. Her work blends creative judgment, client trust, and platform fluency — the exact mix Pakistan's fast-growing digital economy is short on.",
    automationRisk: "Low",
    durableSkills: ["Creative Content Production", "Client Relationship Management"],
    atRiskSkills: ["Manual Scheduling — tools are automating this"],
  };

  // Karachi-specific opportunities for content creator
  const opportunities = isPK
    ? [
        {
          tag: "Freelance · Remote-friendly",
          title: "Freelance Social Media Manager",
          access: "Fiverr, Upwork, local referrals",
          income: "PKR 40,000 – 80,000 / month",
          time: "Start in 1–2 weeks",
        },
        {
          tag: "Local employment",
          title: "Digital Marketing Assistant",
          access: "Growing demand in Karachi's e-commerce sector",
          income: "PKR 35,000 – 55,000 / month",
          time: "2–4 weeks",
        },
        {
          tag: "Direct outreach",
          title: "Content Lead for a Local Brand",
          access: "Direct outreach to businesses in your area",
          income: "PKR 45,000 – 70,000 / month",
          time: "4–6 weeks",
        },
      ]
    : [
        {
          tag: "Freelance · Platform",
          title: "Freelance Social Media Manager",
          access: "Fiverr, Upwork, Lagos creator agencies",
          income: "NGN 180,000 – 360,000 / month",
          time: "Start in 1–2 weeks",
        },
        {
          tag: "Local employment",
          title: "Digital Marketing Assistant",
          access: "Lagos & Abuja e-commerce + fintech brands",
          income: "NGN 160,000 – 260,000 / month",
          time: "2–4 weeks",
        },
        {
          tag: "Direct outreach",
          title: "Content Lead for a Local Brand",
          access: "Direct outreach to growing Lagos SMBs",
          income: "NGN 200,000 – 320,000 / month",
          time: "4–6 weeks",
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
              <div className="grid md:grid-cols-3 gap-5">
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" defaultValue="Zara Ahmed" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="age">Age</Label>
                  <Input id="age" type="number" defaultValue={21} />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" defaultValue={isPK ? "Karachi" : "Lagos"} />
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
              </div>

              <div className="space-y-2">
                <Label htmlFor="work">Tell us what you've done — paid, unpaid, informal, all counts</Label>
                <Textarea
                  id="work"
                  rows={5}
                  defaultValue="Been doing content creation for local businesses in Karachi for 2 years. Edit reels on my phone, run Instagram and WhatsApp marketing for a clothing boutique in Tariq Road. Helped grow their followers from 400 to 4,000."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="self">What have you learned on your own?</Label>
                <Textarea
                  id="self"
                  rows={4}
                  defaultValue="CapCut for video editing, Canva for graphics, learned basic SEO and hashtag strategy from YouTube. Some English from watching content online."
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
                <Button
                  onClick={() => setStep(2)}
                  size="lg"
                  className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-warm"
                >
                  See my profile <ArrowRight size={18} className="ml-1" />
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: AI Assessment full-screen experience */}
        {step === 2 && <AssessmentScreen onComplete={() => setStep(3)} city={isPK ? "Karachi" : "Lagos"} />}

        {/* Step 3: Profile + Opportunities (combined results) */}
        {step === 3 && (
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
                  <h2 className="font-display text-2xl font-bold">
                    {profile.name}, {profile.age}
                  </h2>
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
                  <div
                    key={s.name}
                    className="flex items-center justify-between gap-3 p-3 rounded-lg hover:bg-secondary/50 transition-smooth"
                  >
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
                  <div className="h-full w-[18%] bg-success rounded-full" />
                </div>
                <span className="font-semibold text-success">{profile.automationRisk} overall</span>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed mb-5">
                Content creation requires human creativity, taste, and trust — the parts AI tools support but can't replace.
                A small slice of Zara's workflow (manual scheduling) is being automated by tools she can adopt.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center gap-2 text-success font-semibold text-sm mb-2">
                    <TrendingUp size={16} /> Durable
                  </div>
                  <ul className="space-y-1 text-sm text-foreground">
                    {profile.durableSkills.map((s) => (
                      <li key={s}>· {s}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-warning font-semibold text-sm mb-2">
                    <TrendingDown size={16} /> Evolving
                  </div>
                  <ul className="space-y-1 text-sm text-foreground">
                    {profile.atRiskSkills.map((s) => (
                      <li key={s}>· {s}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Opportunities */}
            <div className="pt-4">
              <div className="text-center mb-5">
                <h2 className="font-display text-3xl md:text-4xl font-bold text-primary mb-2">
                  Real opportunities, ranked.
                </h2>
                <p className="text-muted-foreground">
                  Income paths in {country.flag} {country.name} · {country.currency}
                </p>
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
                    <div className="text-[10px] uppercase tracking-[0.2em] text-accent font-bold">Your roadmap</div>
                    <h3 className="font-display text-xl md:text-2xl font-bold text-primary tracking-tight">
                      A 12-month pathway
                    </h3>
                  </div>
                </div>
                <p className="text-foreground/85 leading-relaxed">
                  With your current skills and a basic digital marketing certification, you could move from{" "}
                  <strong className="text-primary">{isPK ? "PKR 40,000" : "NGN 180,000"}</strong> to{" "}
                  <strong className="text-primary">{isPK ? "PKR 90,000+" : "NGN 380,000+"}</strong> monthly within 12
                  months by building a client portfolio on Fiverr and LinkedIn — starting with one local boutique brief
                  and expanding to retainers across two or three Karachi-based brands.
                </p>
              </div>
            </div>

            {/* Econometric signals */}
            <div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-accent font-bold mb-3">
                Why this matters · macro signals
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  {
                    text: isPK
                      ? "Pakistan digital economy growing 25% annually"
                      : "Nigeria digital economy growing 28% annually",
                    source: "ILO",
                  },
                  {
                    text: isPK
                      ? "72% of Pakistan's economy is informal"
                      : "80% of Nigeria's economy is informal",
                    source: "World Bank WDI",
                  },
                ].map((s) => (
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

            {/* Download CTA */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
              <Button variant="outline" onClick={() => setStep(1)}>
                <ArrowLeft size={16} className="mr-1" /> Start over
              </Button>
              <Button
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-warm"
                onClick={() => window.print()}
              >
                <Download size={18} className="mr-2" /> Download My Skills Profile
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
    <span className={cn("px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap", styles)}>{level}</span>
  );
};

// Full-screen AI assessment loading experience
const AssessmentScreen = ({ onComplete, city }: { onComplete: () => void; city: string }) => {
  const [idx, setIdx] = useState(0);
  const [progress, setProgress] = useState(0);
  const totalMs = 5500;
  const stepDuration = totalMs / ASSESSMENT_STEPS.length;

  useEffect(() => {
    const stepTimer = setInterval(() => {
      setIdx((i) => Math.min(i + 1, ASSESSMENT_STEPS.length - 1));
    }, stepDuration);

    const start = Date.now();
    const progressTimer = setInterval(() => {
      const elapsed = Date.now() - start;
      setProgress(Math.min(100, (elapsed / totalMs) * 100));
    }, 40);

    const done = setTimeout(onComplete, totalMs + 400);
    return () => {
      clearInterval(stepTimer);
      clearInterval(progressTimer);
      clearTimeout(done);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Replace city in 4th line
  const displayLine = ASSESSMENT_STEPS[idx].replace("Karachi", city);

  return (
    <div className="fixed inset-0 z-[100] bg-primary text-primary-foreground flex flex-col items-center justify-center px-6 overflow-hidden">
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: "radial-gradient(hsl(var(--accent)) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      <div className="absolute -top-40 -right-32 w-[520px] h-[520px] rounded-full bg-accent/20 blur-[120px]" />
      <div className="absolute -bottom-40 -left-32 w-[420px] h-[420px] rounded-full bg-accent/10 blur-[120px]" />

      <div className="relative z-10 w-full max-w-3xl flex flex-col items-center text-center">
        {/* Pulsing orb */}
        <div className="relative mb-12">
          <div className="absolute inset-0 w-24 h-24 rounded-full bg-accent/30 blur-xl animate-pulse" />
          <div className="relative w-24 h-24 rounded-full bg-accent/15 border border-accent/40 flex items-center justify-center">
            <Sparkles size={36} className="text-accent animate-pulse" />
          </div>
        </div>

        <div className="text-[10px] uppercase tracking-[0.3em] text-accent font-bold mb-6">
          AI Assessment in progress
        </div>

        {/* Cycling line */}
        <div className="min-h-[120px] md:min-h-[160px] flex items-center justify-center mb-12">
          <h1
            key={idx}
            className="font-display text-3xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-[-0.03em] animate-fade-in"
          >
            {displayLine}
          </h1>
        </div>

        {/* Step dots */}
        <div className="flex items-center gap-2 mb-8">
          {ASSESSMENT_STEPS.map((_, i) => (
            <span
              key={i}
              className={cn(
                "h-1.5 rounded-full transition-all duration-500",
                i <= idx ? "bg-accent w-8" : "bg-primary-foreground/15 w-4"
              )}
            />
          ))}
        </div>

        {/* Progress bar */}
        <div className="w-full max-w-md h-1 bg-primary-foreground/10 rounded-full overflow-hidden mb-6">
          <div
            className="h-full bg-gradient-to-r from-accent to-accent/70 rounded-full transition-all duration-100 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="text-xs md:text-sm text-primary-foreground/55 max-w-md leading-relaxed">
          Powered by ESCO taxonomy · ILO data · Frey-Osborne automation research
        </p>
      </div>
    </div>
  );
};

export default Youth;
