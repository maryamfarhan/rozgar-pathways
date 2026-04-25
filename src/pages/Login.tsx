import { useState, FormEvent } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Lock, Mail, KeyRound, ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from "@/components/Logo";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn, signInDemo } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const redirectTo = (location.state as { from?: string })?.from || "/dashboard";

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const result = signIn(email, password);
    setLoading(false);
    if (result.ok === true) {
      toast.success("Welcome back, Program Officer");
      navigate(redirectTo, { replace: true });
      return;
    }
    setError(result.error);
  };

  const handleDemo = () => {
    signInDemo();
    toast.success("Demo session started");
    navigate(redirectTo, { replace: true });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background relative overflow-hidden">
      {/* Warm gradient backdrop */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(180deg, hsl(39 50% 97%) 0%, hsl(28 60% 94%) 50%, hsl(16 70% 92%) 100%)",
        }}
      />
      <div
        className="absolute inset-0 -z-10 opacity-[0.15]"
        style={{
          backgroundImage: "radial-gradient(hsl(215 59% 26%) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage: "radial-gradient(ellipse 70% 50% at 50% 40%, black, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse 70% 50% at 50% 40%, black, transparent 75%)",
        }}
      />
      <div className="absolute -top-32 -right-24 w-[420px] h-[420px] rounded-full bg-accent/20 blur-[100px] -z-10" />

      {/* Top bar with logo */}
      <header className="container max-w-6xl mx-auto px-4 md:px-6 py-6 flex items-center justify-between">
        <Logo />
        <Link
          to="/"
          className="text-sm text-muted-foreground hover:text-foreground transition-smooth"
        >
          ← Back to home
        </Link>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-md">
          {/* Lock badge */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-accent/20 blur-2xl rounded-full" />
              <div className="relative w-16 h-16 rounded-2xl bg-card border-2 border-border shadow-warm flex items-center justify-center">
                <Lock className="text-accent" size={26} strokeWidth={2.2} />
              </div>
            </div>
          </div>

          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent-soft text-accent text-[10px] font-bold uppercase tracking-[0.18em] mb-4">
              <ShieldCheck size={11} /> Protected Access
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-primary tracking-[-0.03em] leading-[1.05] mb-3">
              Organization Portal
            </h1>
            <p className="text-muted-foreground leading-relaxed">
              For NGOs, government program officers, and training providers
            </p>
          </div>

          <div className="bg-card/90 backdrop-blur-xl rounded-3xl p-8 border border-border shadow-card">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-xs uppercase tracking-[0.12em] font-bold text-primary/80">
                  Email
                </Label>
                <div className="relative">
                  <Mail
                    size={16}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"
                  />
                  <Input
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@organization.org"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 h-12 bg-background/60 border-border focus-visible:ring-accent"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-xs uppercase tracking-[0.12em] font-bold text-primary/80">
                  Password
                </Label>
                <div className="relative">
                  <KeyRound
                    size={16}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"
                  />
                  <Input
                    id="password"
                    type="password"
                    autoComplete="current-password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 h-12 bg-background/60 border-border focus-visible:ring-accent"
                    required
                  />
                </div>
              </div>

              {error && (
                <p className="text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-lg px-3 py-2">
                  {error}
                </p>
              )}

              <Button
                type="submit"
                disabled={loading}
                className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl"
              >
                {loading ? "Signing in…" : "Sign In"}
                <ArrowRight size={16} className="ml-1" />
              </Button>
            </form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-card px-3 text-[10px] uppercase tracking-[0.18em] text-muted-foreground font-bold">
                  Or
                </span>
              </div>
            </div>

            <Button
              type="button"
              onClick={handleDemo}
              className="w-full h-12 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold rounded-xl shadow-warm"
            >
              <ShieldCheck size={16} className="mr-1.5" />
              Demo Access — Try Instantly
            </Button>

            <div className="mt-5 p-3 rounded-xl bg-secondary/60 border border-border/60">
              <p className="text-xs text-muted-foreground text-center leading-relaxed">
                <span className="font-bold text-primary">Demo credentials:</span>{" "}
                <code className="font-mono text-foreground">demo@rozgar.ai</code> /{" "}
                <code className="font-mono text-foreground">demo123</code>
              </p>
            </div>
          </div>

          <p className="text-center text-xs text-muted-foreground mt-6">
            Built for the MIT Global Hackathon · World Bank UNMAPPED Challenge
          </p>
        </div>
      </main>
    </div>
  );
};

export default Login;
