import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CountrySwitcher } from "@/components/CountrySwitcher";
import { Button } from "@/components/ui/button";
import { useCountry } from "@/contexts/CountryContext";
import { ArrowRight, Compass, Shield, Sparkles } from "lucide-react";

const Landing = () => {
  const { country } = useCountry();

  const pillars = [
    {
      icon: Compass,
      title: "Maps your skills",
      desc: "Including the ones you taught yourself, the work no one paid you for, the languages you switch between.",
    },
    {
      icon: Shield,
      title: "Shows your automation risk",
      desc: "Honest signals about which of your skills are durable, and which are at risk — so you can plan.",
    },
    {
      icon: Sparkles,
      title: "Matches you to real opportunities",
      desc: "Not theoretical jobs. Actual income paths, with timelines, in your city, in your currency.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-warm opacity-60" />
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />

        <div className="container max-w-6xl mx-auto px-4 pt-20 pb-24 relative">
          <div className="max-w-3xl animate-fade-in">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-soft text-accent text-xs font-semibold mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              Now demonstrating in {country.flag} {country.name}
            </div>

            <h1 className="font-display text-5xl md:text-7xl font-bold text-primary leading-[1.05] mb-6">
              Making skills visible.
              <br />
              <span className="text-accent italic">Making opportunity real.</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 leading-relaxed">
              Rozgar.ai turns the work, learning, and hustle that the formal economy
              ignores into a verified profile — and matches it to income that pays.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-10">
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-warm h-12 px-7 text-base">
                <Link to="/youth">
                  Get Started <ArrowRight className="ml-1" size={18} />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-12 px-7 text-base border-primary/20 hover:bg-primary/5">
                <Link to="/dashboard">For Organizations</Link>
              </Button>
            </div>

            <div className="flex flex-col gap-3">
              <span className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                Switch context
              </span>
              <CountrySwitcher />
            </div>
          </div>
        </div>
      </section>

      {/* Big stat */}
      <section className="container max-w-6xl mx-auto px-4 py-20">
        <div className="bg-gradient-hero rounded-3xl p-10 md:p-16 text-primary-foreground shadow-warm relative overflow-hidden">
          <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-accent/20 blur-3xl" />
          <div className="relative max-w-3xl">
            <div className="font-display text-6xl md:text-8xl font-bold text-accent mb-4 leading-none">
              600M
            </div>
            <p className="text-xl md:text-2xl font-display leading-snug">
              young people have skills the formal economy cannot see.
            </p>
            <p className="mt-4 text-primary-foreground/70 text-sm">
              Source: ILO World Employment & Social Outlook · World Bank WDI
            </p>
          </div>
        </div>
      </section>

      {/* Three things */}
      <section className="container max-w-6xl mx-auto px-4 py-12">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="font-display text-3xl md:text-5xl font-bold text-primary mb-4">
            Three things, done well.
          </h2>
          <p className="text-muted-foreground text-lg">
            Built as infrastructure — so any organization can configure it for their country.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {pillars.map((p, i) => (
            <div
              key={p.title}
              className="bg-card rounded-2xl p-7 border border-border shadow-card hover:shadow-warm transition-smooth hover:-translate-y-1"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="w-12 h-12 rounded-xl bg-accent-soft flex items-center justify-center mb-5">
                <p.icon className="text-accent" size={22} />
              </div>
              <h3 className="font-display text-xl font-bold text-primary mb-2">{p.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Landing;
