import { createContext, useContext, useState, ReactNode } from "react";
import { CountryCode, countries, CountryData } from "@/lib/country-data";

interface CountryContextValue {
  country: CountryData;
  setCountry: (code: CountryCode) => void;
}

const CountryContext = createContext<CountryContextValue | undefined>(undefined);

export const CountryProvider = ({ children }: { children: ReactNode }) => {
  const [code, setCode] = useState<CountryCode>("PK");
  return (
    <CountryContext.Provider value={{ country: countries[code], setCountry: setCode }}>
      {children}
    </CountryContext.Provider>
  );
};

export const useCountry = () => {
  const ctx = useContext(CountryContext);
  if (!ctx) throw new Error("useCountry must be used within CountryProvider");
  return ctx;
};
