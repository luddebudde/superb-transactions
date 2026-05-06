import { makePlayerCurrency, useCurrency } from "./currencyContext.tsx";

export const TransactionArea = () => {
  const {
    updatePlayerCurrency,
    selectedCurrency,
    buyCurrency,
    sellCurrency,
    player,
  } = useCurrency();

  if (selectedCurrency === null) return;

  const pc = player.currencies[selectedCurrency.label] ?? makePlayerCurrency();

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
          onClick={() => {
            buyCurrency(selectedCurrency, 1, player);
          }}
        >
          Buy 1
        </button>
        {/*Buy 10*/}
        <button
          className={"transactionBuyButton"}
          onClick={() => buyCurrency(selectedCurrency, 10, player)}
        >
          Buy 10
        </button>
        {/*Buy 100*/}
        <button
          className={"transactionBuyButton"}
          onClick={() => buyCurrency(selectedCurrency, 100, player)}
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
              buyCurrency(selectedCurrency, pc.customBuyAmount, player);
            }}
            // Add custom buy
          >
            Buy amount
          </button>
          <input
            type={"number"}
            value={pc.customBuyAmount}
            onChange={(e) =>
              updatePlayerCurrency(
                selectedCurrency.label,
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
          onClick={() => sellCurrency(selectedCurrency, 1, player)}
        >
          Sell 1
        </button>
        {/*Sell 10*/}
        <button
          className={"transactionSellButton"}
          onClick={() => sellCurrency(selectedCurrency, 10, player)}
        >
          Sell 10
        </button>
        {/*Sell 100*/}
        <button
          className={"transactionSellButton"}
          onClick={() => sellCurrency(selectedCurrency, 100, player)}
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
              sellCurrency(selectedCurrency, pc.customSellAmount, player);
            }}
            // Add custom buy
          >
            Sell amount
          </button>
          <input
            type={"number"}
            value={pc.customSellAmount}
            onChange={(e) =>
              updatePlayerCurrency(
                selectedCurrency.label,
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
              backgroundColor: pc.autoBuyStatus ? "green" : "red",
              flex: 1,
            }}
            onClick={() => {
              updatePlayerCurrency(
                selectedCurrency.label,
                "autoBuyStatus",
                !pc.autoBuyStatus,
              );
            }}
          >
            Auto buy:
          </button>
          <button
            className={"activateAutoTransactionButton"}
            style={{
              backgroundColor: pc.autoSellStatus ? "green" : "red",
              flex: 1,
            }}
            onClick={() => {
              updatePlayerCurrency(
                selectedCurrency.label,
                "autoSellStatus",
                !pc.autoSellStatus,
              );
            }}
          >
            Auto sell:
          </button>
        </div>
        <div style={{ display: "flex", flexDirection: "row", flex: 1 }}>
          <div className={"autoTransactionThresholdButton"} style={{ flex: 1 }}>
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
              value={pc.autoBuyThreshold}
              onChange={(e) =>
                updatePlayerCurrency(
                  selectedCurrency.label,
                  "autoBuyThreshold",
                  Number(e.currentTarget.value) || 0,
                )
              }
            ></input>{" "}
          </div>

          <div className={"autoTransactionThresholdButton"} style={{ flex: 1 }}>
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
              value={pc.autoSellThreshold}
              onChange={(e) =>
                updatePlayerCurrency(
                  selectedCurrency.label,
                  "autoSellThreshold",
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
