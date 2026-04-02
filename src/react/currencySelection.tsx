import { useEffect } from "react";
import { useCurrency } from "./currencyContext.tsx";

export const CurrencySelection = () => {
  // const [selectedCurrency, setSelectedCurrency] = useState("firstCoin");
  const {
    currencies,
    createCurrency,
    selectedCurrency,
    setSelectedCurrency,
    currencyType,
    setCurrencyType,
  } = useCurrency();

  useEffect(() => {
    const initialCurrencies = ["first", "second"];

    initialCurrencies.forEach((currency) => {
      createCurrency(currency, "crypto");
    });
  }, []);

  const selectedCurrencies = currencies.filter((c) => {
    return c.type === currencyType;
  });

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
            {"          owned: "}
            {c.owned}
            {"          spent: "}
            {Math.round(c.averageSpending)}
          </button>
        ))}
      </div>
    </div>
  );
};
