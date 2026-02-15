// import React from "react";

const mainScreen = () => {
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
              width: "25vw",
              height: "100vh",
              backgroundColor: "#5e5b50",
              display: "flex",
              flexDirection: "column",
              gap: 10,
              paddingTop: "5px",
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
          <div id={"buy"} style={{ display: "flex", flexDirection: "column" }}>
            <button style={{ height: "12.5vh" }}>1</button>
            <button style={{ height: "12.5vh" }}>10</button>
            <button style={{ height: "12.5vh" }}>100</button>
            <button style={{ height: "12.5vh" }}>X</button>
          </div>
          <div id={"sell"} style={{ display: "flex", flexDirection: "column" }}>
            <button>1</button>
            <button>10</button>
            <button>100</button>
            <button>X</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default mainScreen;
