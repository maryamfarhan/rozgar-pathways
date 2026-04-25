import { useCountry } from "@/contexts/CountryContext";
import { CountryCode } from "@/lib/country-data";
import { cn } from "@/lib/utils";

export const CountrySwitcher = ({ className }: { className?: string }) => {
  const { country, setCountry } = useCountry();
  const options: { code: CountryCode; flag: string; name: string }[] = [
    { code: "PK", flag: "🇵🇰", name: "Pakistan" },
    { code: "NG", flag: "🇳🇬", name: "Nigeria" },
  ];

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
