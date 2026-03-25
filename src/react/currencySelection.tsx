import { type ReactNode, useEffect, useState } from "react";
import { random } from "../basic.tsx";
import { pointCount } from "./stockGraph.tsx";
import { CurrencyContext, useCurrency } from "./test.tsx";
import type { Vec2 } from "../main.tsx";

type Currency = {
  id: number;
  label: string;
  points: {
    id: number;
    pos: Vec2;
    scale: number;
    color: string;
    value: number;
  }[];
  yValues: yValue[];
};

type yValue = {
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
  const [selectedCurrency, setSelectedCurrency] = useState<Currency | null>([]);
  // const [points, setPoints] = useState(
  //
  // );

  const createCurrency = (label: string) => {
    const newCurrency: Currency = {
      id: label,
      label,
      points: Array.from({ length: pointCount }, (_, i) => ({
        id: i,
        pos: { x: 50 * i, y: 50 * i },
        scale: 1,
        color: "yellow",
        value: random(0, 5000),
      })),
      yValues: [],
    };

    // createLogger(label);

    setSelectedCurrency(newCurrency);
    setCurrencies((prev) => [...prev, newCurrency]);
  };

  return (
    <CurrencyContext.Provider
      value={{
        currencies,
        setCurrencies,
        createCurrency,
        selectedCurrency,
        setSelectedCurrency,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

export const CurrencySelection = () => {
  // const [selectedCurrency, setSelectedCurrency] = useState("firstCoin");
  const {
    currencies,
    createCurrency,
    setCurrencies,
    selectedCurrency,
    setSelectedCurrency,
  } = useCurrency();

  useEffect(() => {
    const initialCurrencies = ["first", "second"].map(
      (label: string): Currency => ({
        id: Math.random(),
        label,
        points: Array.from({ length: pointCount }, (_, i) => ({
          id: Math.random(),
          pos: { x: 50 * i, y: 50 * i },
          scale: 1,
          color: "yellow",
          value: random(0, 5000),
        })),
        yValues: [],
      }),

      // createCurrency(label),
    );

    // console.log(initialCurrencies);

    initialCurrencies.forEach((currency) => {
      // setCurrencies((prev) => [...prev, currency]);
      createCurrency(currency.label);
    });

    // if (currencies.length > 0 && !selectedCurrency) {
    //   setSelectedCurrency(currencies[0]);
    // }
  }, []);

  // console.log(currencies);

  return (
    <div id={"stockSide"}>
      <div id={"currencySelection"} className="currencySelectionBar">
        <button className={"currencySelection"}>STOCKS</button>
        <button className={"currencySelection"}>SHARES</button>
        <button className={"currencySelection"}>CRYPTO</button>
        <button className={"currencySelection"}>!</button>
      </div>
      <div
        id={"stockList"}
        style={{
          width: "25%",
          height: "100%",
          backgroundColor: "#5e5b50",
          display: "flex",
          flexDirection: "column",
          gap: 10,
          paddingTop: "5px",
          overflow: "auto",
        }}
      >
        {currencies.map((c) => (
          <button
            key={c.id}
            className={
              "currencyButton " + (selectedCurrency === c ? "active" : "")
            }
            onClick={() => {
              setSelectedCurrency(c);
            }}
          >
            {c.label}
          </button>
        ))}
      </div>
    </div>
  );
};
