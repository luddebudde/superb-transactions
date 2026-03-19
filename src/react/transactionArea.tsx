import { useEffect, useRef, useState } from "react";

export const TransactionArea = () => {
  const graphRef = useRef<HTMLDivElement | null>(null);
  const [areaSize, setAreaSize] = useState({ width: 0, height: 0 });
  const [autoBuyStatus, setAutoBuyStatus] = useState(false);
  const [autoSellStatus, setAutoSellStatus] = useState(false);

  useEffect(() => {
    if (!graphRef.current) return;

    const rect = graphRef.current.getBoundingClientRect();

    setAreaSize({
      width: rect.width,
      height: rect.height,
    });
  });
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
        <button className={"transactionBuyButton"}>Buy 1</button>
        <button className={"transactionBuyButton"}>Buy 10</button>
        <button className={"transactionBuyButton"}>Buy 100</button>
        <button className={"transactionBuyButton"}>
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
        <button className={"transactionSellButton"}>Sell 1</button>
        <button className={"transactionSellButton"}>Sell 10</button>
        <button className={"transactionSellButton"}>Sell 100</button>
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
