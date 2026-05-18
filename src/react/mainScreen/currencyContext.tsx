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

// Market data only — no player-specific fields
export type Currency = {
  type: string;
  label: string;
  points: Point[];
  yValues: axisValue[];
};

// Per-currency ownership data for a player
export type PlayerCurrency = {
  owned: number;
  averageSpending: number;
  averageSpendingLine: Vec2;
  customBuyAmount: number;
  customSellAmount: number;
  autoBuyStatus: boolean;
  autoSellStatus: boolean;
  autoBuyThreshold: number;
  autoSellThreshold: number;
};

// A player object holding money and all per-currency data
export type Player = {
  money: number;
  loanSize: number;
  depositSize: number;
  currencies: Record<string, PlayerCurrency>;
};

export type axisValue = {
  id: number;
  pos: Vec2;
  color: string;
  value: number;
  scale: number;
};

export const makePlayerCurrency = (): PlayerCurrency => ({
  owned: 0,
  averageSpending: 0,
  averageSpendingLine: origo,
  customBuyAmount: 0,
  customSellAmount: 0,
  autoBuyStatus: false,
  autoSellStatus: false,
  autoBuyThreshold: 55555,
  autoSellThreshold: 0,
});

const makeCurrency = (overrides: Partial<Currency> = {}): Currency => ({
  type: "",
  label: "",
  points: [],
  yValues: [],
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
  const [player, setPlayer] = useState<Player>({
    money: 1000,
    loanSize: 0,
    depositSize: 0,
    currencies: {},
  });

  // Migration: ensure all currencies have player entries

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
    });

    setSelectedCurrency(newCurrency);
    setCurrencies((prev) => [...prev, newCurrency]);
    // Create a fresh PlayerCurrency entry for this currency
    setPlayer((prev) => ({
      ...prev,
      currencies: {
        ...prev.currencies,
        [newCurrency.label]: makePlayerCurrency(),
      },
    }));
  };

  const updateCurrency = (
    currency: Currency,
    attribute: keyof Currency,
    replacement: string | number | boolean | Vec2,
  ) => {
    setCurrencies((prev) =>
      prev.map((c) => {
        if (c.label === currency.label) {
          c = { ...c, [attribute]: replacement };
          setSelectedCurrency(c);
          return c;
        }
        return c;
      }),
    );
  };

  // Update a player-owned field (owned, averageSpending, autoBuy*, etc.)
  const updatePlayerCurrency = (
    currencyLabel: string,
    attribute: keyof PlayerCurrency,
    replacement: PlayerCurrency[keyof PlayerCurrency],
  ) => {
    setPlayer((prev) => ({
      ...prev,
      currencies: {
        ...prev.currencies,
        [currencyLabel]: {
          ...prev.currencies[currencyLabel],
          [attribute]: replacement,
        },
      },
    }));
  };

  const buyCurrency = (currency: Currency, amount: number, buyer) => {
    const valuation = lastElement(currency.points).value;
    if (buyer !== player) {
      const purchasableAmount = Math.min(
        Math.floor(buyer.money / valuation),
        amount,
      );
      if (purchasableAmount < 0) {
        throw reportError("Buyer cannot afford any amount of this currency");
      }

      const buyerCurrency = buyer.currencies[currency.label];
      buyer.money -= valuation * purchasableAmount;
      buyerCurrency.owned += purchasableAmount;

      return;
    }
    setPlayer(() => {
      const pc = buyer.currencies[currency.label];
      if (!pc) return buyer;
      const purchasableAmount = Math.min(
        Math.floor(buyer.money / valuation),
        amount,
      );

      if (!purchasableAmount) return buyer;
      const newAverageSpending =
        (pc.averageSpending * pc.owned + valuation * purchasableAmount) /
        (pc.owned + purchasableAmount);
      return {
        ...buyer,
        money: buyer.money - valuation * purchasableAmount,
        currencies: {
          ...buyer.currencies,
          [currency.label]: {
            ...pc,
            owned: pc.owned + purchasableAmount,
            averageSpending: newAverageSpending,
          },
        },
      };
    });
  };

  const sellCurrency = (currency: Currency, amount: number, buyer) => {
    const valuation = lastElement(currency.points).value;
    setPlayer((prev) => {
      const pc = prev.currencies[currency.label];
      if (!pc) return prev;
      const sellableAmount = Math.min(amount, pc.owned);
      if (!sellableAmount) return prev;
      const newOwned = pc.owned - sellableAmount;
      return {
        ...prev,
        money: prev.money + valuation * sellableAmount,
        currencies: {
          ...prev.currencies,
          [currency.label]: {
            ...pc,
            owned: newOwned,
            averageSpending: newOwned === 0 ? 0 : pc.averageSpending,
          },
        },
      };
    });
  };

  return (
    <CurrencyContext.Provider
      value={{
        currencies,
        updateCurrency,
        updatePlayerCurrency,
        setCurrencies,
        createCurrency,
        selectedCurrency,
        setSelectedCurrency,
        currencyType,
        setCurrencyType,
        player,
        setPlayer,
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
  player: Player;
  setPlayer: React.Dispatch<React.SetStateAction<Player>>;
  buyCurrency: (currency: Currency, amount: number, buyer?: Player) => void;
  sellCurrency: (currency: Currency, amount: number, seller?: Player) => void;
  updateCurrency: (
    currency: Currency,
    attribute: keyof Currency,
    replacement: string | number | boolean | Vec2,
  ) => void;
  updatePlayerCurrency: (
    currencyLabel: string,
    attribute: keyof PlayerCurrency,
    replacement: PlayerCurrency[keyof PlayerCurrency],
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
