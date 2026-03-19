import { createContext, useContext, useState } from "react";

// 1. Skapa context
const CurrencyContext = createContext(null);

// 2. Provider (håller state)
export const CurrencyProvider = ({ children }) => {
  const [selectedCurrency, setSelectedCurrency] = useState("firstCoin");

  return (
    <CurrencyContext.Provider value={{ selectedCurrency, setSelectedCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
};

// 3. Custom hook (valfri men clean)
export const useCurrency = () => {
  const context = useContext(CurrencyContext);

  if (!context) {
    throw new Error("useCurrency must be used inside CurrencyProvider");
  }

  return context;
};
