import type { MenuProp } from "../mainScreen/mainScreen.tsx";
import { useState } from "react";
import { useCurrency } from "../mainScreen/currencyContext.tsx";
import { useBank } from "./bankProvider.tsx";
import { largestElement } from "../../diverse/basic.ts";

export const BankScreen = ({ setCurrentMenu }: MenuProp) => {
  const [takeLoanAmount, setTakeLoanAmount] = useState(0);
  const [amortizeAmount, setAmortizeAmount] = useState(0);
  // const [depositAmount, setDepositAmount] = useState(0);
  const [withdrawAmount, setWithdrawAmount] = useState(0);

  // const [loanHistory, setLoanHistory] = useState(0);
  // const [depositHistory, setDepositHistory] = useState(0);
  // const [interestAmount, setInterestAmount] = useState(0);
  // const [yieldAmount, setYieldAmount] = useState(0);

  const { player, setPlayer } = useCurrency();
  const { depositAmount, setDepositAmount, yieldHistory } = useBank();

  const largestYieldRate = largestElement(yieldHistory);

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
          id={"yield interest"}
          className={"bankGraph"}
          style={{ color: "lime", position: "relative" }}
        >
          <div
            style={{
              position: "absolute",
              top: 10,
              left: 10,
              fontSize: "20px",
              fontWeight: "bold",
            }}
          >
            Positive Interest
          </div>
          {yieldHistory.map((value, i) => {
            const graphHeight = 100;
            const maxRate = Math.max(2, largestYieldRate);
            const x = (i / (yieldHistory.length - 1 || 1)) * 100;
            const y = graphHeight - (value / maxRate) * graphHeight;
            return (
              <div
                key={i}
                style={{
                  width: "2vh",
                  height: "2vh",
                  borderRadius: "50%",
                  fontSize: "0.9vw",
                  position: "absolute",
                  backgroundColor: "yellow",
                  border: "2px solid lime",
                  top: `${y}%`,
                  left: `${x}%`,
                  transform: "translate(-50%, -50%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "black",
                  fontWeight: "bold",
                }}
              >
                {Math.round((value - 1) * 100)}%
              </div>
            );
          })}
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
        <div style={{ textAlign: "center", fontSize: "300%" }}>
          <div>
            Bank Balance:{" "}
            <span style={{ color: "yellow" }}>{Math.round(player.money)}</span>
          </div>
          <div style={{ fontSize: "50%" }}>
            Loan:{" "}
            <span style={{ color: "red" }}>{Math.round(player.loanSize)}</span>
            {" | "}
            Deposit:{" "}
            <span style={{ color: "lime" }}>
              {Math.round(player.depositSize)}
            </span>
          </div>
        </div>

        {/*// TAKE LOAN*/}
        <div id={"loan"} className={"bankActions"}>
          <button
            className={"bankButton"}
            onClick={() => {
              setPlayer((p) => ({
                ...p,
                money: p.money + takeLoanAmount,
                loanSize: p.loanSize + takeLoanAmount,
              }));
              setTakeLoanAmount(0);
            }}
          >
            Take loan{" "}
          </button>
          <input
            className={"bankInput"}
            style={{ width: "15%", margin: "1%" }}
            type={"number"}
            value={takeLoanAmount}
            onInput={(e) =>
              setTakeLoanAmount(
                Math.max(
                  Math.min(
                    Number(e.currentTarget.value),
                    player.money - player.loanSize * 2,
                  ),
                  0,
                ),
              )
            }
          ></input>{" "}
        </div>

        {/*// MAKE AMORTIZATION*/}
        <div id={"amortization"} className={"bankActions"}>
          <button
            className={"bankButton"}
            onClick={() => {
              const realAmortizeAmount = Math.min(amortizeAmount, player.money);
              setPlayer((p) => ({
                ...p,
                money: p.money - realAmortizeAmount,
                loanSize: p.loanSize - realAmortizeAmount,
              }));
              setAmortizeAmount(0);
            }}
          >
            Amortize{" "}
          </button>
          <input
            className={"bankInput"}
            style={{ width: "15%", margin: "1%" }}
            type={"number"}
            value={amortizeAmount}
            onInput={(e) =>
              setAmortizeAmount(
                Math.min(
                  Math.min(
                    Math.max(Number(e.currentTarget.value), 0),
                    player.loanSize,
                  ),
                  player.money,
                ),
              )
            }
          ></input>{" "}
        </div>

        {/*// MAKE DEPOSIT*/}
        <div id={"deposit"} className={"bankActions"}>
          <button
            className={"bankButton"}
            onClick={() => {
              setPlayer((p) => ({
                ...p,
                money: p.money - depositAmount,
                depositSize: p.depositSize + depositAmount,
              }));
              setDepositAmount(0);
            }}
          >
            Deposit{" "}
          </button>
          <input
            className={"bankInput"}
            style={{ width: "15%", margin: "1%" }}
            type={"number"}
            value={depositAmount}
            onInput={(e) =>
              setDepositAmount(
                Math.min(
                  Math.max(Number(e.currentTarget.value), 0),
                  player.money,
                ),
              )
            }
          ></input>{" "}
        </div>

        {/*// TAKE WITHDRAWAL*/}
        <div id={"withdraw"} className={"bankActions"}>
          <button
            className={"bankButton"}
            onClick={() => {
              setPlayer((p) => ({
                ...p,
                money: p.money + withdrawAmount,
                depositSize: Math.max(p.depositSize - withdrawAmount, 0),
              }));
              setWithdrawAmount(0);
            }}
          >
            Withdraw{" "}
          </button>
          <input
            className={"bankInput"}
            style={{ width: "15%", margin: "1%" }}
            type={"number"}
            value={withdrawAmount}
            onInput={(e) =>
              setWithdrawAmount(
                Math.min(
                  Math.max(Number(e.currentTarget.value), 0),
                  player.depositSize,
                ),
              )
            }
          ></input>{" "}
        </div>

        <button
          style={{
            color: "purple",
            fontSize: "250%",
            height: "10%",
            width: "25%",
            bottom: "5%",
            position: "absolute",
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
