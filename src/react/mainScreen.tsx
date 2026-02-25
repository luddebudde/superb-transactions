import { useState } from "react";

export const MainScreen = () => {
  // const [isOpen, setIsOpen] = useState(false);
  // const [customBuyValue, setCustomBuyValue] = useState(0);
  // const [customSellValue, setCustomSellValue] = useState(0);

  const [autoBuyStatus, setAutoBuyStatus] = useState(false);
  const [autoSellStatus, setAutoSellStatus] = useState(false);

  // const [autoBuyValue, useAutoBuyValue] = useState(0)
  // const [autoSellValue , useAutoSellValue] = useState(0)

  return (
    <>
      <div
        id={"mainScreen"}
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          width: "100vw",
          height: "100vh",
          background: "grey",
          opacity: "80%",
          padding: "0px",
          overflow: "hidden",
        }}
      >
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
            <button className={"currencyButton"}>Fun coin</button>
            <button className={"currencyButton"}>Smart ocin</button>
            <button className={"currencyButton"}>Dumb dumb coin</button>
            <button className={"currencyButton"}>Silly coin</button>
            <button className={"currencyButton"}>Assbass ocin</button>
            <button className={"currencyButton"}>Spacy dumb coin</button>
            <button className={"currencyButton"}>Atom-tennis coin</button>
            <button className={"currencyButton"}>Brian ocin</button>
            <button className={"currencyButton"}>Me me me mine coin</button>
          </div>
        </div>

        <div
          id={"stockGraph"}
          style={{
            left: "50vw",
            top: 0,
            position: "absolute",
            height: "75vh",
            width: "50vw",
            backgroundColor: "#323036",
            transform: "translate(-50%)",
          }}
        ></div>

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
              width: "33%",
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
              width: "33%",
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
            style={{ display: "block", flexDirection: "column", width: "33%" }}
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
        <div
          id={"inter-diplomacy"}
          style={{
            left: "75%",
            top: "0%",
            position: "absolute",
            height: "100%",
            width: "25%",
            backgroundColor: "#02095e",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <button
            className={"rightTab"}
            style={{ backgroundColor: "rgba(100, 255, 5, 1)" }}
          >
            Calender
          </button>
          <button
            className={"rightTab"}
            style={{ backgroundColor: "rgba(255, 240, 5, 1)" }}
            onClick={() => {
              setCurrentMenu("bank");
            }}
          >
            Bank
          </button>
          <button className={"rightTab"} style={{ backgroundColor: "blue" }}>
            Government
          </button>
          <button className={"rightTab"} style={{ backgroundColor: "cyan" }}>
            Policies
          </button>
          <button className={"rightTab"} style={{ backgroundColor: "#6b6b51" }}>
            News
          </button>
          <button
            className={"rightTab"}
            style={{ backgroundColor: "honeydew" }}
          >
            Casino
          </button>
          <button
            className={"rightTab"}
            style={{ backgroundColor: "indianred" }}
          >
            Licenses
          </button>
          <button
            className={"rightTab"}
            style={{ backgroundColor: "rgba(255, 240, 5, 1)" }}
          >
            Income summary
          </button>
        </div>
      </div>
    </>
  );
};

export default MainScreen;
