import { createContext, useContext, useEffect, useState, ReactNode } from "react";

const DEMO_EMAIL = "demo@rozgar.ai";
const DEMO_PASSWORD = "demo123";
const STORAGE_KEY = "rozgar.auth";

interface AuthUser {
  email: string;
  role: string;
}

interface AuthContextValue {
  user: AuthUser | null;
  signIn: (email: string, password: string) => { ok: true } | { ok: false; error: string };
  signInDemo: () => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setUser(JSON.parse(raw));
    } catch {
      // ignore
    }
  }, []);

  const persist = (u: AuthUser | null) => {
    setUser(u);
    if (u) localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
    else localStorage.removeItem(STORAGE_KEY);
  };

  const signIn = (email: string, password: string) => {
    if (email.trim().toLowerCase() === DEMO_EMAIL && password === DEMO_PASSWORD) {
      persist({ email: DEMO_EMAIL, role: "Program Officer (Demo)" });
      return { ok: true as const };
    }
    return { ok: false as const, error: "Invalid credentials. Try the demo button below." };
  };

  const signInDemo = () => {
    persist({ email: DEMO_EMAIL, role: "Program Officer (Demo)" });
  };

  const signOut = () => persist(null);

  return (
    <AuthContext.Provider value={{ user, signIn, signInDemo, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
