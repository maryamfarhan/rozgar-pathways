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
        <div className="bg-gradient-warm rounded-2xl p-7 md:p-10 border border-border mb-14">
          <h2 className="font-display text-3xl font-bold text-primary mb-3">An infrastructure layer.</h2>
          <p className="text-foreground text-lg leading-relaxed">
            Any NGO, government, or training provider can configure Rozgar.ai for their country —
            their languages, their economy, their currency, their data sources — <strong>no rebuilding from scratch</strong>.
            One platform, infinite local context.
          </p>
        </div>

        {/* Modules */}
        <div className="mb-14">
          <h2 className="font-display text-3xl font-bold text-primary mb-6">Three modules. One stack.</h2>
          <div className="grid md:grid-cols-3 gap-5">
            {modules.map((m) => (
              <div key={m.name} className="bg-card rounded-2xl p-6 border border-border shadow-card">
                <div className="w-11 h-11 rounded-xl bg-accent-soft flex items-center justify-center mb-4">
                  <m.icon className="text-accent" size={20} />
                </div>
                <h3 className="font-display text-lg font-bold text-primary mb-2">{m.name}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Hackathon credit */}
        <div className="bg-gradient-hero rounded-2xl p-8 text-primary-foreground text-center">
          <p className="text-sm uppercase tracking-wider text-primary-foreground/70 mb-2 font-semibold">
            Built for
          </p>
          <h3 className="font-display text-2xl md:text-3xl font-bold mb-1">MIT Global Hackathon</h3>
          <p className="text-primary-foreground/80 mb-6">World Bank UNMAPPED Challenge</p>
          <Button asChild variant="outline" className="bg-card hover:bg-card/90 border-card text-primary">
            <a href="#" target="_blank" rel="noreferrer">
              <Github size={16} className="mr-2" /> View on GitHub
            </a>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
