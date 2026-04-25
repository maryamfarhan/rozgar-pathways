import { Logo } from "./Logo";

export const Footer = () => (
  <footer className="border-t border-border bg-secondary/40 mt-24">
    <div className="container max-w-6xl mx-auto px-4 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
      <Logo />
      <p className="text-sm text-muted-foreground text-center md:text-right">
        Built for the MIT Global Hackathon · World Bank UNMAPPED Challenge
      </p>
    </div>
  </footer>
);
