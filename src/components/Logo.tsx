import { Link } from "react-router-dom";

export const Logo = ({ light = false }: { light?: boolean }) => (
  <Link to="/" className="flex items-center gap-2.5 group">
    <div className="relative">
      <div className="w-9 h-9 rounded-lg bg-gradient-accent flex items-center justify-center shadow-warm transition-smooth group-hover:scale-105">
        <span className="font-display font-bold text-accent-foreground text-lg leading-none">R</span>
      </div>
    </div>
    <div className="flex flex-col leading-none">
      <span className={`font-display font-bold text-lg ${light ? "text-primary-foreground" : "text-primary"}`}>
        Rozgar<span className="text-accent">.ai</span>
      </span>
      <span className={`font-urdu text-xs mt-0.5 ${light ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
        روزگار
      </span>
    </div>
  </Link>
);
