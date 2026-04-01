import { createContext, useContext } from "react";
import type { Currency } from "./currencySelection.tsx";

type CurrencyContextType = {
  currencies: Currency[];
  setCurrencies: React.Dispatch<React.SetStateAction<Currency[]>>;
  createCurrency: (label: string, type: string) => void;
  selectedCurrency: Currency | null;
  setSelectedCurrency: React.Dispatch<React.SetStateAction<Currency | null>>;
};

export const CurrencyContext = createContext<CurrencyContextType | null>(null);
export const useCurrency = () => {
  const context = useContext(CurrencyContext);

  if (!context) {
    throw new Error("useCurrency must be used inside CurrencyProvider");
  }

  return context;
};
