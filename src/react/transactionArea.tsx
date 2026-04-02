import { useState } from "react";
import { useCurrency } from "./currencyContext.tsx";

export const TransactionArea = () => {
  const {
    currencies,
    setCurrencies,
    selectedCurrency,
    setSelectedCurrency,
    money,
    setMoney,
    buyCurrency,
    sellCurrency,
  } = useCurrency();

  const [customBuyAmount, setCustomBuyAmount] = useState(0);
  const [customSellAmount, setCustomSellAmount] = useState(0);

  const [autoBuyStatus, setAutoBuyStatus] = useState(false);
  const [autoSellStatus, setAutoSellStatus] = useState(false);
  const [autoBuyValue, useAutoBuyValue] = useState(5);
  const [autoSellValue, useAutoSellValue] = useState(0);

  // const buyCurrency = (selectedCurrency: Currency, amount) => {
  //
  // };
  return (
    <div
      id={"transaction"}
      style={{
        display: "flex",
        flexDirection: "row",
        left: "25vw",
        top: "75vh",
        width: "50vw",
        height: "25vh",
        position: "absolute",
        backgroundColor: "#3b3a36",
      }}
    >
      <div>{Math.round(money)}</div>
      <div
        id={"buy"}
        style={{
          display: "flex",
          flexDirection: "column",
          flexWrap: "wrap",
          width: "33.33%",
          height: "100%",
        }}
      >
        <button
          id={"1"}
          className={"transactionBuyButton"}
          onClick={() => buyCurrency(selectedCurrency, 1)}
        >
          Buy 1
        </button>
        <button
          className={"transactionBuyButton"}
          onClick={() => buyCurrency(selectedCurrency, 10)}
        >
          Buy 10
        </button>
        <button
          className={"transactionBuyButton"}
          onClick={() => buyCurrency(selectedCurrency, 100)}
        >
          Buy 100
        </button>
        <button
          className={"transactionBuyButton"}
          // Add custom buy
        >
          Buy{" "}
          <input
            type={"number"}
            style={{
              width: "30%",
              height: "15%",
              fontSize: "80%",
              outline: "none",
            }}
          ></input>{" "}
          amount
        </button>
      </div>
      <div
        id={"sell"}
        style={{
          display: "flex",
          flexDirection: "column",
          flexWrap: "wrap",
          width: "33.33%",
          height: "100%",
        }}
      >
        <button
          className={"transactionSellButton"}
          onClick={() => sellCurrency(selectedCurrency, 1)}
        >
          Sell 1
        </button>
        <button
          className={"transactionSellButton"}
          onClick={() => sellCurrency(selectedCurrency, 10)}
        >
          Sell 10
        </button>
        <button
          className={"transactionSellButton"}
          onClick={() => sellCurrency(selectedCurrency, 100)}
        >
          Sell 100
        </button>
        <button className={"transactionSellButton"}>
          Sell{" "}
          <input
            type={"number"}
            style={{
              width: "40%",
              height: "15%",
              fontSize: "80%",
              outline: "none",
              scale: "1",
            }}
            onInput={() => {}}
            // Add custom buy
          ></input>{" "}
          amount
        </button>
      </div>
      <div
        id={"sell"}
        style={{
          display: "block",
          flexDirection: "column",
          width: "33.33%",
        }}
      >
        <button
          className={"activateAutoTransactionButton"}
          style={{ backgroundColor: autoBuyStatus ? "green" : "red" }}
          onClick={() => {
            setAutoBuyStatus(!autoBuyStatus);
          }}
        >
          Auto buy:
        </button>
        <button
          className={"activateAutoTransactionButton"}
          style={{ backgroundColor: autoSellStatus ? "green" : "red" }}
          onClick={() => {
            setAutoSellStatus(!autoSellStatus);
          }}
        >
          Auto sell:
        </button>

        <button className={"autoTransactionAmountButton"}>
          Buy at:{" "}
          <input
            type={"number"}
            style={{ width: "30%", outline: "none", scale: "1" }}
            onInput={() => {}}
          ></input>{" "}
        </button>

        <button className={"autoTransactionAmountButton"}>
          Sell at:{" "}
          <input
            type={"number"}
            style={{ width: "30%", outline: "none", scale: "1" }}
            onInput={() => {}}
          ></input>{" "}
        </button>
      </div>
    </div>
  );
};
