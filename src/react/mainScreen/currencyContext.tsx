import { createContext, type ReactNode, useContext, useState } from "react";
import type { Vec2 } from "../../main.tsx";
import { lastElement, origo, pointCount, random } from "../../diverse/basic.ts";

export type Point = {
  id: number;
  pos: Vec2;
  scale: number;
  color: string;
  value: number;
};

export type Currency = {
  type: string;
  id: number;
  label: string;
  owned: number;
  averageSpending: number;
  averageSpendingLine: Vec2;
  points: Point[];
  yValues: axisValue[];

  customBuyAmount: number;
  customSellAmount: number;
  autoBuyStatus: boolean;
  autoSellStatus: boolean;
  autoBuyThreshold: number;
  autoSellThreshold: number;
};
export type axisValue = {
  id: number;
  pos: Vec2;
  color: string;
  value: number;
  scale: number;
};

export const makeCurrency = (overrides: Partial<Currency> = {}): Currency => ({
  type: "",
  id: Math.random(),
  label: "",
  owned: 0,
  averageSpending: 0,
  averageSpendingLine: origo,
  points: [],
  yValues: [],
  customBuyAmount: 0,
  customSellAmount: 0,
  autoBuyStatus: false,
  autoSellStatus: false,
  autoBuyThreshold: 0,
  autoSellThreshold: 0,
  ...overrides,
});

interface CurrencyProviderProps {
  children: ReactNode;
}

export const CurrencyProvider = ({ children }: CurrencyProviderProps) => {
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [selectedCurrency, setSelectedCurrency] = useState<Currency | null>(
    null,
  );
  const [currencyType, setCurrencyType] = useState<string>("crypto");
  const [money, setMoney] = useState(10000);

  const createCurrency = (label: string, type: string) => {
    const newCurrency: Currency = makeCurrency({
      type,
      label,
      points: Array.from({ length: pointCount }, (_, i) => ({
        id: i,
        pos: { x: 50 * i, y: 50 * i },
        scale: 1,
        color: "yellow",
        value: random(0, 5000),
      })),
      yValues: Array.from({ length: 5 }, (_, i) => ({
        id: i,
        pos: { x: 50 * i, y: 50 * i },
        scale: 1,
        color: "yellow",
        value: random(0, 5000),
      })),

      customBuyAmount: 0,
      customSellAmount: 0,
      autoBuyStatus: false,
      autoSellStatus: false,
      autoBuyThreshold: 0,
      autoSellThreshold: 0,
    });

    // createLogger(label);

    console.log(newCurrency);
    setSelectedCurrency(newCurrency);
    setCurrencies((prev) => [...prev, newCurrency]);
  };

  const updateCurrency = (
    currency: Currency,
    attribute: string,
    replacement: string | number | boolean | Vec2,
  ) => {
    console.log(currency, attribute, replacement);
    setCurrencies((prev) =>
      prev.map((c) => {
        if (c.id === currency.id) {
          c = { ...c, [attribute]: replacement };
          setSelectedCurrency(c);
          return c;
        } else {
          return c;
        }
      }),
    );
  };

  const buyCurrency = (currency: Currency, amount: number) => {
    const valuation = lastElement(currency.points).value;

    setMoney((prevMoney) => {
      const purchaseAbleAmount = Math.min(
        Math.floor(prevMoney / valuation),
        amount,
      );
      if (!purchaseAbleAmount) return prevMoney;

      currency.averageSpending =
        (currency.averageSpending * currency.owned +
          valuation * purchaseAbleAmount) /
        (currency.owned + purchaseAbleAmount);

      updateCurrency(currency, "owned", currency.owned + purchaseAbleAmount);
      return prevMoney - valuation * purchaseAbleAmount;
    });
  };

  const sellCurrency = (currency: Currency, amount: number) => {
    const valuation = lastElement(currency.points).value;

    setMoney((prevMoney) => {
      const sellableAmount = Math.min(amount, currency.owned);
      if (!sellableAmount) return prevMoney;

      const newOwned = currency.owned - sellableAmount;
      currency.averageSpending = newOwned === 0 ? 0 : currency.averageSpending;

      updateCurrency(currency, "owned", newOwned);
      return prevMoney + valuation * sellableAmount;
    });
  };

  // Fix time pause when buying

  return (
    <CurrencyContext.Provider
      value={{
        currencies,
        updateCurrency,
        setCurrencies,
        createCurrency,
        selectedCurrency,
        setSelectedCurrency,
        currencyType,
        setCurrencyType,
        money,
        setMoney,
        buyCurrency,
        sellCurrency,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};
type CurrencyContextType = {
  currencies: Currency[];
  setCurrencies: React.Dispatch<React.SetStateAction<Currency[]>>;
  createCurrency: (label: string, type: string) => void;
  selectedCurrency: Currency | null;
  setSelectedCurrency: React.Dispatch<React.SetStateAction<Currency | null>>;
  currencyType: string;
  setCurrencyType: React.Dispatch<React.SetStateAction<string>>;
  money: number;
  setMoney: React.Dispatch<React.SetStateAction<number>>;
  buyCurrency: (currency: Currency, amount: number) => void;
  sellCurrency: (currency: Currency, amount: number) => void;
  updateCurrency: (
    currency: Currency,
    attribute: string,
    replacement: string | number | boolean | Vec2,
  ) => void;
};

export const CurrencyContext = createContext<CurrencyContextType | null>(null);
export const useCurrency = () => {
  const context = useContext(CurrencyContext);

  if (!context) {
    throw new Error("useCurrency must be used inside CurrencyProvider");
  }

  return context;
};
