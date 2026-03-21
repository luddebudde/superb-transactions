import { useEffect, useState } from "react";
import { random } from "../basic.tsx";
import { pointCount } from "./stockGraph.tsx";
import { CurrencyContext, useCurrency } from "./test.tsx";
import type { Vec2 } from "../main.tsx";

type Currency = {
  id: number;
  label: string;
  pos: Vec2;
  points: {
    id: number;
    pos: Vec2;
    scale: number;
    color: string;
    value: number;
  };
  yValues: yValue;
};

type yValue = {
  id: number;
  pos: Vec2;
  color: string;
  value: number;
  scale: number;
};

export const CurrencyProvider = ({ children }) => {
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [selectedCurrency, setSelectedCurrency] = useState({
    points: [],
    yValues: [],
  });
  const [yValues, setYValues] = useState<yValue[]>([]);
  const [points, setPoints] = useState(
    Array.from({ length: pointCount }, (_, i) => ({
      id: i,
      pos: { x: 50 * i, y: 50 * i },
      scale: 1,
      color: "yellow",
      value: random(0, 5000),
    })),
  );

  const createCurrency = (label: string) => {
    const newCurrency = {
      id: label,
      label,
      points,
      setPoints,
      yValues,
      setYValues,
    };

    setSelectedCurrency(newCurrency);
    setCurrencies((prev) => [...prev, newCurrency]);
  };

  return (
    <CurrencyContext.Provider
      value={{
        currencies,
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
  const { selectedCurrency, setSelectedCurrency } = useCurrency();
  const { currencies, createCurrency } = useCurrency();

  useEffect(() => {
    const initialCurrencies = ["first", "second"].map((label) => ({
      id: label,
      label,
      points: Array.from({ length: pointCount }, (_, i) => ({
        id: i,
        pos: { x: 50 * i, y: 50 * i },
        scale: 1,
        color: "yellow",
        value: random(0, 5000),
      })),
    }));

    ["first", "second"].forEach((label) => {
      createCurrency(label);
    });
  }, []);

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
