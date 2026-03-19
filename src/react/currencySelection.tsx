import { useCurrency } from "./test.tsx";

export const currencies = [
  { id: "firstCoin", label: "First coin", graph: {} },
  { id: "secondCoin", label: "Second coin", graph: {} },
];

export const CurrencySelection = () => {
  // const [selectedCurrency, setSelectedCurrency] = useState("firstCoin");
  const { selectedCurrency, setSelectedCurrency } = useCurrency();

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
              "currencyButton " + (selectedCurrency === c.id ? "active" : "")
            }
            onClick={() => setSelectedCurrency(c.id)}
          >
            {c.label}
          </button>
        ))}
      </div>
    </div>
  );
};
