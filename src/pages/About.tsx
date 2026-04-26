import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Github, Compass, Shield, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const About = () => {
  const modules = [
    { icon: Compass, name: "Skills Signal Engine", desc: "Maps informal, self-taught, and unrecognized work into ESCO-aligned skill profiles." },
    { icon: Shield, name: "AI Readiness Lens", desc: "Honest automation-exposure scoring grounded in Frey-Osborne and Wittgenstein research." },
    { icon: Sparkles, name: "Opportunity Matcher", desc: "Country-configurable matching to real income paths — jobs, freelance, microbusiness." },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <section className="container max-w-4xl mx-auto px-4 py-16 flex-1 w-full">
        <div className="mb-14">
          <h1 className="font-display text-4xl md:text-6xl font-bold text-primary leading-tight mb-6">
            We built Rozgar.ai because <span className="text-accent italic">we are the people this is for.</span>
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Rozgar means livelihood — work that lets you build a life.
            Across South Asia, Africa, and beyond, hundreds of millions of young people have skills
            their economies refuse to see. CV templates assume linear careers. Job boards assume formal credentials.
            Algorithms assume English. We grew up watching this gap. So we built infrastructure to close it.
          </p>
        </div>

        {/* Infrastructure layer */}
        <div className="relative bg-gradient-warm rounded-3xl p-8 md:p-12 border border-border mb-16 overflow-hidden shadow-card">
          <div
            className="absolute inset-0 opacity-[0.07] pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(hsl(var(--primary)) 1px, transparent 1px)",
              backgroundSize: "22px 22px",
              maskImage: "radial-gradient(ellipse 70% 60% at 80% 20%, black, transparent 70%)",
              WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 80% 20%, black, transparent 70%)",
            }}
          />
          <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-accent/15 blur-3xl" />
          <div className="relative">
            <div className="inline-block text-[10px] uppercase tracking-[0.2em] text-accent font-bold mb-3">
              The platform model
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary mb-4 tracking-tight leading-[1.1]">
              An infrastructure layer.
            </h2>
            <p className="text-foreground text-lg leading-relaxed max-w-2xl">
              Any NGO, government, or training provider can configure Rozgar.ai for their country —
              their languages, their economy, their currency, their data sources — <strong className="text-primary">no rebuilding from scratch</strong>.
              One platform, infinite local context.
            </p>
          </div>
        </div>

        {/* Modules */}
        <div className="mb-16">
          <div className="mb-7">
            <div className="inline-block text-[10px] uppercase tracking-[0.2em] text-accent font-bold mb-2">
              Architecture
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary tracking-tight">
              Three modules. One stack.
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {modules.map((m, i) => (
              <article
                key={m.name}
                className="group relative bg-card rounded-3xl p-7 border border-border shadow-card hover:shadow-warm transition-smooth hover:-translate-y-1.5 overflow-hidden"
              >
                <span
                  aria-hidden
                  className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-accent/[0.06] blur-2xl"
                />
                <div className="relative flex items-center justify-between mb-5">
                  <div className="relative">
                    <div className="absolute inset-0 bg-accent/20 blur-md rounded-2xl" />
                    <div className="relative w-12 h-12 rounded-2xl bg-card border border-border flex items-center justify-center shadow-soft group-hover:scale-110 transition-smooth">
                      <m.icon className="text-accent" size={22} strokeWidth={2.2} />
                    </div>
                  </div>
                  <span className="font-display text-3xl font-bold text-primary/[0.08] leading-none select-none">
                    0{i + 1}
                  </span>
                </div>
                <h3 className="relative font-display text-lg font-bold text-primary mb-2 tracking-tight">{m.name}</h3>
                <p className="relative text-muted-foreground text-sm leading-relaxed">{m.desc}</p>
                <div
                  className="relative mt-5 h-[3px] w-10 rounded-full bg-accent transition-smooth group-hover:w-20"
                  aria-hidden
                />
              </article>
            ))}
          </div>
        </div>

        {/* Hackathon credit */}
        <div className="relative bg-gradient-hero rounded-3xl p-10 md:p-12 text-primary-foreground overflow-hidden shadow-warm">
          <div
            className="absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage: "radial-gradient(hsl(39 38% 97%) 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }}
          />
          <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-accent/25 blur-3xl" />
          <div className="absolute -bottom-24 -right-16 w-80 h-80 rounded-full bg-accent/15 blur-3xl" />

          <div className="relative text-center max-w-xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/15 border border-accent/30 text-accent text-[10px] uppercase tracking-[0.2em] font-bold mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              Built for
            </div>
            <h3 className="font-display text-3xl md:text-4xl font-bold mb-2 tracking-tight leading-[1.1]">
              MIT Global Hackathon
            </h3>
            <p className="text-primary-foreground/75 mb-7 text-base">
              World Bank UNMAPPED Challenge
            </p>
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-full font-semibold shadow-warm h-12 px-7">
              <a href="https://github.com/maryamfarhan/rozgar-pathways" target="_blank" rel="noreferrer">
                <Github size={16} className="mr-2" /> View on GitHub
              </a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
