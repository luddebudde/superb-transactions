import { type BankContextType } from "./bankProvider.tsx";
import { random } from "../../diverse/basic.ts";
import type { Player } from "../mainScreen/currencyContext.tsx";

export const useBankCalculations = (
  bankContext: BankContextType,
  player: Player,
  setPlayer: React.Dispatch<React.SetStateAction<Player>>,
) => {
  const { yieldRate, setYieldRate, setYieldHistory, yieldHistory } =
    bankContext;

  setYieldRate(random(Math.max(yieldRate / 1.02, 1), yieldRate * 1.02));
  setYieldHistory((prev) => [...prev, yieldRate].slice(-14));

  setPlayer((prev) => ({
    ...prev,
    money: prev.money + prev.depositSize * yieldRate,
  }));
};
