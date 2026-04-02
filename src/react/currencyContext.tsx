import { createContext, type ReactNode, useContext, useState } from "react";
import type { Vec2 } from "../main.tsx";
import { pointCount } from "./stockGraph.tsx";
import { lastElement, origo, random } from "../basic.tsx";

export type Currency = {
  type: string;
  id: number;
  label: string;
  owned: number;
  averageSpending: number;
  averageSpendingLine: Vec2;
  points: {
    id: number;
    pos: Vec2;
    scale: number;
    color: string;
    value: number;
  }[];
  yValues: axisValue[];
};
export type axisValue = {
  id: number;
  pos: Vec2;
  color: string;
  value: number;
  scale: number;
};

interface CurrencyProviderProps {
  children: ReactNode;
}

export const CurrencyProvider = ({ children }: CurrencyProviderProps) => {
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [selectedCurrency, setSelectedCurrency] = useState<Currency | null>({
    type: "",
    id: 0,
    label: "",
    owned: 0,
    averageSpending: 0,
    averageSpendingLine: origo,
    points: [],
    yValues: [],
  });
  const [currencyType, setCurrencyType] = useState<string>("crypto");
  const [money, setMoney] = useState(10000);

  const createCurrency = (label: string, type: string) => {
    const newCurrency: Currency = {
      type: type,
      id: Math.random(),
      label,
      owned: 0,
      averageSpending: 0,
      averageSpendingLine: origo,
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
    };

    // createLogger(label);

    setSelectedCurrency(newCurrency);
    setCurrencies((prev) => [...prev, newCurrency]);
  };

  const buyCurrency = (currency: Currency, amount: number) => {
    const valuation = lastElement(currency.points).value;
    const purchaseAbleAmount = Math.min(Math.floor(money / valuation), amount);

    // Add average value
    const [newMoney, newAmount] = [
      money - valuation * purchaseAbleAmount,
      purchaseAbleAmount,
    ];

    currency.averageSpending =
      (currency.averageSpending * currency.owned +
        valuation * purchaseAbleAmount) /
      (currency.owned + purchaseAbleAmount);

    setMoney(newMoney);
    setCurrencies((prev) =>
      prev.map((c) => {
        if (c.id === selectedCurrency.id) {
          c = { ...c, owned: c.owned + newAmount };
          setSelectedCurrency(c);
          return c;
        } else {
          return c;
        }
      }),
    );
  };

  const sellCurrency = (currency: Currency, amount: number) => {
    const valuation = lastElement(currency.points).value;
    const sellableAmount = Math.min(amount, currency.owned);

    // Add tax depending on: sold money - average value
    setMoney(money + valuation * sellableAmount);
    setCurrencies((prev) =>
      prev.map((c) => {
        if (c.id === selectedCurrency.id) {
          c = { ...c, owned: c.owned - sellableAmount };
          setSelectedCurrency(c);
          return c;
        } else {
          return c;
        }
      }),
    );
  };

  // Fix time pause when buying

  return (
    <CurrencyContext.Provider
      value={{
        currencies,
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
};

export const CurrencyContext = createContext<CurrencyContextType | null>(null);
export const useCurrency = () => {
  const context = useContext(CurrencyContext);

  if (!context) {
    throw new Error("useCurrency must be used inside CurrencyProvider");
  }

  return context;
};
