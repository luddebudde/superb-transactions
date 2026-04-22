import { useCurrency } from "./currencyContext.tsx";
import { useState } from "react";

export const TransactionArea = () => {
  const {
    currencies,
    updateCurrency,
    setCurrencies,
    selectedCurrency,
    setSelectedCurrency,
    money,
    setMoney,
    buyCurrency,
    sellCurrency,
  } = useCurrency();

  if (selectedCurrency === null) return;
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
      {/*<div>{Math.round(money)}</div>*/}
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
        {/*Buy 1*/}
        <button
          id={"1"}
          className={"transactionBuyButton"}
          onClick={() => buyCurrency(selectedCurrency, 1)}
        >
          Buy 1
        </button>
        {/*Buy 10*/}
        <button
          className={"transactionBuyButton"}
          onClick={() => buyCurrency(selectedCurrency, 10)}
        >
          Buy 10
        </button>
        {/*Buy 100*/}
        <button
          className={"transactionBuyButton"}
          onClick={() => buyCurrency(selectedCurrency, 100)}
        >
          Buy 100
        </button>
        {/*Buy custom*/}
        <div className={"transactionBuyButton"}>
          <button
            style={{
              width: "100%",
              height: "50%",
              backgroundColor: "#1322ab",
              borderRadius: "20%",
            }}
            onClick={() => {
              buyCurrency(selectedCurrency, selectedCurrency.customBuyAmount);
            }}
            // Add custom buy
          >
            Buy amount
          </button>
          <input
            type={"number"}
            value={selectedCurrency.customBuyAmount}
            onChange={(e) =>
              updateCurrency(
                selectedCurrency,
                "customBuyAmount",
                Number(e.currentTarget.value) || 0,
              )
            }
            style={{
              width: "30%",
              height: "15%",
              fontSize: "80%",
              outline: "none",
            }}
          ></input>
        </div>
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
        {/*Sell 1*/}
        <button
          className={"transactionSellButton"}
          onClick={() => sellCurrency(selectedCurrency, 1)}
        >
          Sell 1
        </button>
        {/*Sell 10*/}
        <button
          className={"transactionSellButton"}
          onClick={() => sellCurrency(selectedCurrency, 10)}
        >
          Sell 10
        </button>
        {/*Sell 100*/}
        <button
          className={"transactionSellButton"}
          onClick={() => sellCurrency(selectedCurrency, 100)}
        >
          Sell 100
        </button>

        {/*Sell custom*/}
        <div className={"transactionBuyButton"}>
          <button
            style={{
              width: "100%",
              height: "50%",
              backgroundColor: "#1322ab",
              borderRadius: "20%",
            }}
            onClick={() => {
              sellCurrency(selectedCurrency, selectedCurrency.customSellAmount);
            }}
            // Add custom buy
          >
            Sell amount
          </button>
          <input
            type={"number"}
            value={selectedCurrency.customSellAmount}
            onChange={(e) =>
              updateCurrency(
                selectedCurrency,
                "customSellAmount",
                Number(e.currentTarget.value) || 0,
              )
            }
            style={{
              width: "30%",
              height: "15%",
              fontSize: "80%",
              outline: "none",
            }}
          ></input>
        </div>
      </div>
      <div
        id={"auto"}
        style={{
          display: "flex",
          flexDirection: "column",
          width: "33.33%",
          height: "100%",
        }}
      >
        <div style={{ display: "flex", flexDirection: "row", flex: 1 }}>
          <button
            className={"activateAutoTransactionButton"}
            style={{
              backgroundColor: selectedCurrency.autoBuyStatus ? "green" : "red",
              flex: 1,
            }}
            onClick={() => {
              updateCurrency(
                selectedCurrency,
                "autoBuyStatus",
                !selectedCurrency?.autoBuyStatus,
              );
            }}
          >
            Auto buy:
          </button>
          <button
            className={"activateAutoTransactionButton"}
            style={{
              backgroundColor: selectedCurrency.autoSellStatus
                ? "green"
                : "red",
              flex: 1,
            }}
            onClick={() => {
              updateCurrency(
                selectedCurrency,
                "autoSellStatus",
                !selectedCurrency?.autoSellStatus,
              );
            }}
          >
            Auto sell:
          </button>
        </div>
        <div style={{ display: "flex", flexDirection: "row", flex: 1 }}>
          <div className={"autoTransactionAmountButton"} style={{ flex: 1 }}>
            <button
              style={{
                width: "100%",
                height: "60%",
                backgroundColor: "#6c06d1",
                fontSize: "150%",
              }}
            >
              Buy at:{" "}
            </button>
            <input
              type={"number"}
              style={{ width: "30%", outline: "none", scale: "1.25" }}
              onChange={(e) =>
                updateCurrency(
                  selectedCurrency,
                  "autoBuyAmount",
                  Number(e.currentTarget.value) || 0,
                )
              }
            ></input>{" "}
          </div>

          <div className={"autoTransactionAmountButton"} style={{ flex: 1 }}>
            <button
              style={{
                width: "100%",
                height: "60%",
                backgroundColor: "#6c06d1",
                fontSize: "150%",
              }}
            >
              Sell at:{" "}
            </button>
            <input
              type={"number"}
              style={{ width: "30%", outline: "none", scale: "1.25" }}
              onChange={(e) =>
                updateCurrency(
                  selectedCurrency,
                  "autoSellAmount",
                  Number(e.currentTarget.value) || 0,
                )
              }
            ></input>{" "}
          </div>
        </div>
      </div>
    </div>
  );
};
