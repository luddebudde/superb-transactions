import type { Props } from "./mainScreen/mainScreen.tsx";

export const BankScreen = ({ setCurrentMenu }: Props) => {
  return (
    <div
      id="bankScreen"
      style={{
        position: "absolute",
        inset: 0,
        width: "100vw",
        height: "100vh",
        background: "orange",
        display: "flex",
        flexDirection: "row",
      }}
    >
      <div
        id={"graphs"}
        style={{
          height: "100%",
          width: "60%",
          backgroundColor: "green",
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        <div id={"deposit"} className={"bankGraph"} style={{ color: "lime" }}>
          Deposited Money
        </div>
        <div
          id={"positive interest"}
          className={"bankGraph"}
          style={{ color: "lime" }}
        >
          Positive Interest
        </div>
        <div id={"debt"} className={"bankGraph"} style={{ color: "red" }}>
          Loaned Money
        </div>
        <div
          id={"negative interest"}
          className={"bankGraph"}
          style={{ color: "red" }}
        >
          Negative Interest
        </div>
      </div>
      <div
        id={"decisions"}
        style={{
          height: "90%",
          width: "40%",
          backgroundColor: "darkgreen",
          display: "flex",
          flexDirection: "column",
          paddingTop: "5%",
          alignItems: "center",
        }}
      >
        <text style={{ textAlign: "center", fontSize: "500%" }}>
          Bank Balance:{" "}
          <text
            style={{ textAlign: "center", fontSize: "100%", color: "yellow" }}
          >
            MONEY
          </text>
        </text>
        <button id={"loan"} className={"bankActions"}>
          Take loan{" "}
          <input className={"bankInput"} onInput={() => {}}></input>{" "}
        </button>
        <button id={"amortization"} className={"bankActions"}>
          Amortize{" "}
          <input className={"bankInput"} onInput={() => {}}></input>{" "}
        </button>
        <button id={"deposit"} className={"bankActions"}>
          Deposit{" "}
          <input className={"bankInput"} onInput={() => {}}></input>{" "}
        </button>
        <button id={"deposit"} className={"bankActions"}>
          Withdraw{" "}
          <input className={"bankInput"} onInput={() => {}}></input>{" "}
        </button>
        <button
          style={{
            color: "purple",
            fontSize: "250%",
            height: "10%",
            width: "25%",
            bottom: "5%",
            position: "absolute",

            // transform: "translate(-50%, -50%)",
          }}
          onClick={() => {
            setCurrentMenu("main");
          }}
        >
          RETURN
        </button>
      </div>
    </div>
  );
};
