import { useCountry } from "@/contexts/CountryContext";
import { CountryCode } from "@/lib/country-data";
import { cn } from "@/lib/utils";

interface Props {
  className?: string;
  variant?: "default" | "prominent" | "solid";
}

export const CountrySwitcher = ({ className, variant = "default" }: Props) => {
  const { country, setCountry } = useCountry();
  const options: { code: CountryCode; flag: string; name: string }[] = [
    { code: "PK", flag: "🇵🇰", name: "Pakistan" },
    { code: "NG", flag: "🇳🇬", name: "Nigeria" },
  ];

  if (variant === "prominent") {
    return (
      <div className={cn("inline-flex flex-col gap-2", className)}>
        <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground font-bold">
          Showing data for
        </span>
        <div className="inline-flex items-center gap-1.5 p-1.5 rounded-2xl bg-card border-2 border-border shadow-soft">
          {options.map((opt) => {
            const active = country.code === opt.code;
            return (
              <button
                key={opt.code}
                onClick={() => setCountry(opt.code)}
                className={cn(
                  "flex items-center gap-2.5 px-5 py-2.5 rounded-xl text-sm font-semibold transition-smooth",
                  active
                    ? "bg-primary text-primary-foreground shadow-soft scale-[1.02]"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                )}
              >
                <span className="text-xl leading-none">{opt.flag}</span>
                <span>{opt.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  if (variant === "solid") {
    return (
      <div className={cn("inline-flex items-center gap-2 p-1.5 rounded-2xl bg-primary border-2 border-primary shadow-warm", className)}>
        {options.map((opt) => {
          const active = country.code === opt.code;
          return (
            <button
              key={opt.code}
              onClick={() => setCountry(opt.code)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-smooth",
                active
                  ? "bg-accent text-accent-foreground shadow-warm"
                  : "text-primary-foreground/70 hover:text-primary-foreground"
              )}
            >
              <span className="text-base leading-none">{opt.flag}</span>
              <span>{opt.name}</span>
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div className={cn("inline-flex items-center gap-1 p-1 rounded-full bg-secondary border border-border", className)}>
      {options.map((opt) => {
        const active = country.code === opt.code;
        return (
          <button
            key={opt.code}
            onClick={() => setCountry(opt.code)}
            className={cn(
              "flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium transition-smooth",
              active
                ? "bg-card text-primary shadow-soft"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <span className="text-base leading-none">{opt.flag}</span>
            <span>{opt.name}</span>
          </button>
        );
      })}
    </div>
  );
};
