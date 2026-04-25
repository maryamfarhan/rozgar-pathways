import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CountrySwitcher } from "@/components/CountrySwitcher";
import { Button } from "@/components/ui/button";
import { useCountry } from "@/contexts/CountryContext";
import { ArrowRight, Compass, Shield, Sparkles } from "lucide-react";

const Landing = () => {
  const { country } = useCountry();

  // Bilingual labels shift based on country context (Urdu for PK, Hausa for NG)
  const localLabels =
    country.code === "PK"
      ? { a: "ہنر", b: "حفاظت", c: "موقع", script: "urdu" as const }
      : { a: "Sana'a", b: "Kāriya", c: "Dāmā", script: "latin" as const };

  const pillars = [
    {
      icon: Compass,
      title: "Maps your skills",
      local: localLabels.a,
      localMeaning: "skill · craft",
      desc: "Including the ones you taught yourself, the work no one paid you for, the languages you switch between.",
      // Warm sand → terracotta
      tint: "from-[hsl(28_60%_94%)] to-[hsl(16_70%_88%)]",
      ring: "hsl(16 70% 55%)",
      pattern: "weave",
    },
    {
      icon: Shield,
      title: "Shows your automation risk",
      local: localLabels.b,
      localMeaning: "protection · care",
      desc: "Honest signals about which of your skills are durable, and which are at risk — so you can plan.",
      // Soft sky → deep blue tint
      tint: "from-[hsl(210_50%_96%)] to-[hsl(215_50%_88%)]",
      ring: "hsl(215 59% 26%)",
      pattern: "arches",
    },
    {
      icon: Sparkles,
      title: "Matches you to real opportunities",
      local: localLabels.c,
      localMeaning: "opportunity · path",
      desc: "Not theoretical jobs. Actual income paths, with timelines, in your city, in your currency.",
      // Warm marigold → amber
      tint: "from-[hsl(42_80%_94%)] to-[hsl(32_80%_86%)]",
      ring: "hsl(32 80% 50%)",
      pattern: "sun",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden -mt-[72px] pt-[72px]">
        {/* Layered warm gradient */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, hsl(39 50% 97%) 0%, hsl(28 60% 94%) 45%, hsl(16 70% 90%) 100%)",
          }}
        />
        {/* Subtle dot grid texture */}
        <div
          className="absolute inset-0 opacity-[0.18]"
          style={{
            backgroundImage:
              "radial-gradient(hsl(215 59% 26%) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
            maskImage:
              "radial-gradient(ellipse 80% 60% at 50% 40%, black, transparent 75%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 80% 60% at 50% 40%, black, transparent 75%)",
          }}
        />
        {/* Soft color blobs */}
        <div className="absolute -top-40 -right-32 w-[500px] h-[500px] rounded-full bg-accent/25 blur-[100px]" />
        <div className="absolute top-32 -left-32 w-[400px] h-[400px] rounded-full bg-primary/10 blur-[100px]" />

        <div className="container max-w-6xl mx-auto px-4 md:px-6 pt-16 md:pt-24 pb-32 md:pb-40 relative">
          <div className="max-w-4xl animate-fade-in">
            {/* Status pill */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-card/70 backdrop-blur-sm border border-border shadow-soft text-xs font-semibold mb-8">
              <span className="relative flex w-1.5 h-1.5">
                <span className="absolute inline-flex w-full h-full rounded-full bg-accent opacity-75 animate-ping" />
                <span className="relative inline-flex w-1.5 h-1.5 rounded-full bg-accent" />
              </span>
              <span className="text-primary">Now demonstrating in</span>
              <span>{country.flag} {country.name}</span>
            </div>

            <h1 className="font-display font-bold text-primary leading-[0.95] mb-8 tracking-[-0.035em] text-[3.25rem] sm:text-7xl md:text-8xl lg:text-[7.5rem]">
              Making skills
              <br />
              <span className="relative inline-block">
                <span className="relative z-10">visible.</span>
                <span
                  className="absolute left-0 right-0 bottom-1 md:bottom-2 h-3 md:h-5 -z-0 bg-accent/30 rounded-sm"
                  aria-hidden
                />
              </span>
              <br />
              <span className="text-accent italic font-display">
                Making opportunity real.
              </span>
            </h1>

            <p className="text-lg md:text-2xl text-foreground/70 max-w-2xl mb-12 leading-[1.55] font-medium">
              Rozgar.ai turns the work, learning, and hustle the formal economy ignores into a verified profile —
              and matches it to income that actually pays.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-14">
              <Button
                asChild
                size="lg"
                className="group bg-accent hover:bg-accent/90 text-accent-foreground shadow-warm h-14 px-8 text-base font-semibold rounded-full hover:scale-[1.03] transition-smooth"
              >
                <Link to="/youth">
                  Get Started
                  <ArrowRight className="ml-1 transition-smooth group-hover:translate-x-1" size={18} />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-14 px-8 text-base font-semibold rounded-full border-2 border-primary/15 bg-card/60 backdrop-blur-sm hover:bg-card hover:border-primary/30"
              >
                <Link to="/login">For Organizations →</Link>
              </Button>
            </div>

            <CountrySwitcher variant="prominent" />
          </div>
        </div>

        {/* Soft transition into next section */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-background pointer-events-none" />
      </section>

      {/* Big stat */}
      <section className="container max-w-6xl mx-auto px-4 md:px-6 py-24">
        <div className="bg-gradient-hero rounded-[2rem] p-10 md:p-20 text-primary-foreground shadow-warm relative overflow-hidden">
          {/* Decorative pattern */}
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "radial-gradient(hsl(39 38% 97%) 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />
          <div className="absolute -right-32 -bottom-32 w-[500px] h-[500px] rounded-full bg-accent/30 blur-3xl" />
          <div className="absolute -left-20 -top-20 w-72 h-72 rounded-full bg-accent/10 blur-3xl" />

          <div className="relative max-w-3xl">
            <div className="text-[10px] uppercase tracking-[0.2em] text-accent font-bold mb-6">
              The Unmapped Reality
            </div>
            <div className="font-display font-bold text-accent mb-6 leading-[0.85] tracking-[-0.04em] text-[5rem] sm:text-8xl md:text-[10rem]">
              600M
            </div>
            <p className="text-2xl md:text-4xl font-display font-medium leading-[1.15] text-primary-foreground">
              young people have skills the formal economy <span className="italic text-accent">cannot see.</span>
            </p>
            <p className="mt-8 text-primary-foreground/60 text-sm font-medium">
              Source: ILO World Employment & Social Outlook · World Bank WDI
            </p>
          </div>
        </div>
      </section>

      {/* Three things */}
      <section className="container max-w-6xl mx-auto px-4 md:px-6 py-20">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-block text-[10px] uppercase tracking-[0.2em] text-accent font-bold mb-4">
            What it does · {country.code === "PK" ? "تین کام" : "Abubuwa Uku"}
          </div>
          <h2 className="font-display text-4xl md:text-6xl font-bold text-primary mb-5 tracking-[-0.03em] leading-[1]">
            Three things,<br />done well.
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl leading-relaxed">
            Built as infrastructure — so any organization can configure it for their country.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {pillars.map((p, i) => (
            <article
              key={p.title}
              className={`group relative overflow-hidden rounded-[2rem] p-8 md:p-9 border border-border/60 shadow-card hover:shadow-warm transition-smooth hover:-translate-y-2 bg-gradient-to-br ${p.tint}`}
            >
              {/* Cultural pattern motif (top-right corner) */}
              <svg
                className="absolute -top-6 -right-6 w-40 h-40 opacity-[0.12] text-primary pointer-events-none"
                viewBox="0 0 120 120"
                fill="none"
                aria-hidden
              >
                {p.pattern === "weave" && (
                  // South-Asian inspired interwoven diamonds (truck-art / ajrak)
                  <g stroke="currentColor" strokeWidth="1.4">
                    {[0, 1, 2, 3, 4].map((r) =>
                      [0, 1, 2, 3, 4].map((c) => (
                        <g key={`${r}-${c}`} transform={`translate(${c * 24} ${r * 24})`}>
                          <path d="M12 0 L24 12 L12 24 L0 12 Z" />
                          <circle cx="12" cy="12" r="3" />
                        </g>
                      ))
                    )}
                  </g>
                )}
                {p.pattern === "arches" && (
                  // Mughal / Hausa arch repetition
                  <g stroke="currentColor" strokeWidth="1.4" fill="none">
                    {[0, 1, 2, 3].map((r) =>
                      [0, 1, 2, 3].map((c) => (
                        <path
                          key={`${r}-${c}`}
                          d={`M${c * 30} ${r * 30 + 28} Q${c * 30 + 15} ${r * 30 - 2} ${c * 30 + 30} ${r * 30 + 28}`}
                        />
                      ))
                    )}
                  </g>
                )}
                {p.pattern === "sun" && (
                  // Radiating sun-burst (universal warmth — adinkra/marigold)
                  <g stroke="currentColor" strokeWidth="1.4" fill="none">
                    <circle cx="60" cy="60" r="14" />
                    <circle cx="60" cy="60" r="26" strokeDasharray="2 6" />
                    {Array.from({ length: 16 }).map((_, k) => {
                      const a = (k * Math.PI * 2) / 16;
                      const x1 = 60 + Math.cos(a) * 30;
                      const y1 = 60 + Math.sin(a) * 30;
                      const x2 = 60 + Math.cos(a) * 50;
                      const y2 = 60 + Math.sin(a) * 50;
                      return <line key={k} x1={x1} y1={y1} x2={x2} y2={y2} />;
                    })}
                  </g>
                )}
              </svg>

              {/* Hand-drawn step number (bottom-left watermark) */}
              <div className="absolute bottom-4 right-6 font-display text-[5rem] leading-none font-bold text-primary/[0.06] select-none">
                0{i + 1}
              </div>

              {/* Icon — circular medallion with cultural ring */}
              <div className="relative mb-7">
                <div
                  className="absolute inset-0 w-16 h-16 rounded-full opacity-30"
                  style={{
                    background: `repeating-conic-gradient(${p.ring} 0deg 12deg, transparent 12deg 24deg)`,
                  }}
                  aria-hidden
                />
                <div className="relative w-16 h-16 rounded-full bg-card flex items-center justify-center shadow-soft border border-border/50 transition-smooth group-hover:scale-110 group-hover:rotate-[-6deg]">
                  <p.icon style={{ color: p.ring }} size={26} strokeWidth={2.2} />
                </div>
              </div>

              {/* Bilingual title block */}
              <div className="mb-4">
                <div className="flex items-baseline gap-3 flex-wrap mb-1.5">
                  <h3 className="font-display text-2xl md:text-[1.7rem] font-bold text-primary tracking-tight leading-[1.1]">
                    {p.title}
                  </h3>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span
                    className={`text-primary/80 font-semibold ${
                      localLabels.script === "urdu" ? "font-urdu text-xl leading-none" : "italic"
                    }`}
                  >
                    {p.local}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-primary/30" />
                  <span className="text-xs text-muted-foreground uppercase tracking-wider">
                    {p.localMeaning}
                  </span>
                </div>
              </div>

              <p className="text-foreground/75 leading-relaxed relative z-10">{p.desc}</p>

              {/* Bottom hairline accent */}
              <div
                className="mt-7 h-[3px] w-12 rounded-full transition-smooth group-hover:w-24"
                style={{ background: p.ring }}
              />
            </article>
          ))}
        </div>

        {/* Inclusivity note */}
        <p className="text-center text-xs text-muted-foreground mt-10 italic">
          Labels shown in {country.code === "PK" ? "Urdu (اردو)" : "Hausa"} — Rozgar.ai adapts to local language and context wherever it's deployed.
        </p>
      </section>


      <Footer />
    </div>
  );
};

export default Landing;
