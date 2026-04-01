import { type ReactNode, useEffect, useState } from "react";
import { random } from "../basic.tsx";
import { pointCount } from "./stockGraph.tsx";
import { CurrencyContext, useCurrency } from "./currencyContext.tsx";
import type { Vec2 } from "../main.tsx";

export type Currency = {
  type: string;
  id: number;
  label: string;
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
    points: [],
    yValues: [],
  });

  // const [points, setPoints] = useState(
  //
  // );

  const createCurrency = (label: string, type: string) => {
    const newCurrency: Currency = {
      type: type,
      id: Math.random(),
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
  const { currencies, createCurrency, selectedCurrency, setSelectedCurrency } =
    useCurrency();

  const [currencyType, setCurrencyType] = useState("crypto");

  useEffect(() => {
    const initialCurrencies = ["first", "second"];
    //     .map(
    //   (label: string): Currency => ({
    //     type: "crypto",
    //     id: Math.random(),
    //     label,
    //     points: Array.from({ length: pointCount }, (_, i) => ({
    //       id: Math.random(),
    //       pos: { x: 50 * i, y: 50 * i },
    //       scale: 1,
    //       color: "yellow",
    //       value: random(0, 5000),
    //     })),
    //     yValues: [],
    //   }),
    //
    //   // createCurrency(label),
    // );

    initialCurrencies.forEach((currency) => {
      // setCurrencies((prev) => [...prev, currency]);
      createCurrency(currency, "crypto");
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const selectedCurrencies = currencies.filter((c) => {
    return c.type === currencyType;
  });

  // console.log(currencies);

  return (
    <div id={"stockSide"}>
      <div id={"currencySelection"} className="currencySelectionBar">
        <button
          className={"currencySelection"}
          onClick={() => {
            setCurrencyType("stocks");
          }}
        >
          STOCKS
        </button>
        <button
          className={"currencySelection"}
          onClick={() => {
            setCurrencyType("shares");
          }}
        >
          SHARES
        </button>
        <button
          className={"currencySelection"}
          onClick={() => {
            setCurrencyType("crypto");
          }}
        >
          CRYPTO
        </button>
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
        {selectedCurrencies.map((c) => (
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
