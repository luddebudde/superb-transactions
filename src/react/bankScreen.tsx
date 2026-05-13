import type { MenuProp } from "./mainScreen/mainScreen.tsx";
import { useState } from "react";
import { useCurrency } from "./mainScreen/currencyContext.tsx";

export const BankScreen = ({ setCurrentMenu }: MenuProp) => {
  const [takeLoanAmount, setTakeLoanAmount] = useState(0);
  const [amortizeAmount, setAmortizeAmount] = useState(0);
  const [depositAmount, setDepositAmount] = useState(0);
  const [withdrawAmount, setWithdrawAmount] = useState(0);

  const [loanHistory, setLoanHistory] = useState(0);
  const [depositHistory, setDepositHistory] = useState(0);
  const [interestAmount, setInterestAmount] = useState(0);
  const [yieldAmount, setYieldAmount] = useState(0);

  const { player, setPlayer } = useCurrency();

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
            {player.money}
          </text>
        </text>

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
