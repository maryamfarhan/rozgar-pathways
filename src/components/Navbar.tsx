import { NavLink, Link } from "react-router-dom";
import { Logo } from "./Logo";
import { Menu, X, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const links = [
  { to: "/", label: "Home" },
  { to: "/youth", label: "For Youth" },
  { to: "/dashboard", label: "Dashboard" },
  { to: "/about", label: "About" },
];

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full transition-smooth",
        scrolled
          ? "backdrop-blur-xl bg-background/85 border-b border-border shadow-soft"
          : "bg-transparent border-b border-transparent"
      )}
    >
      <nav className="container max-w-6xl mx-auto flex items-center justify-between h-18 py-3 px-4 md:px-6">
        <Logo />

        <div className="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              className={({ isActive }) =>
                cn(
                  "relative px-4 py-2 text-sm font-medium transition-smooth",
                  isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                )
              }
            >
              {({ isActive }) => (
                <>
                  {l.label}
                  {isActive && (
                    <span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-1.5 h-1.5 rounded-full bg-accent" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/youth"
            className="hidden md:inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-accent hover:bg-accent/90 text-accent-foreground text-sm font-semibold shadow-warm transition-smooth hover:scale-[1.03]"
          >
            Get Started <ArrowRight size={14} />
          </Link>
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 rounded-lg hover:bg-secondary"
            aria-label="Toggle menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="md:hidden border-t border-border bg-background animate-fade-in">
          <div className="container max-w-6xl mx-auto px-4 py-3 flex flex-col gap-1">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  cn(
                    "px-3 py-3 text-sm font-medium rounded-lg",
                    isActive ? "text-accent bg-accent-soft" : "text-foreground"
                  )
                }
              >
                {l.label}
              </NavLink>
            ))}
            <Link
              to="/youth"
              onClick={() => setOpen(false)}
              className="mt-2 px-3 py-3 text-sm font-semibold rounded-lg bg-accent text-accent-foreground text-center"
            >
              Get Started →
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
