import type {
  Currency,
  Player,
  PlayerCurrency,
} from "../../react/mainScreen/currencyContext.tsx";
import type { RefObject } from "react";

export const handleAutoTransaction = (
  player: Player,
  currency: Currency,
  playerCurrency: PlayerCurrency | undefined,
  newValue: number,
  buyRef: RefObject<
    RefObject<
      (currency: Currency, amount: number, buyer?: Player | undefined) => void
    >
  >,
  sellRef: RefObject<(currency: Currency, amount: number) => void>,
) => {
  if (!playerCurrency) return;

  if (
    playerCurrency.autoBuyStatus &&
    newValue < playerCurrency.autoBuyThreshold
  ) {
    buyRef.current(currency, 9999999, player);
  }

  if (
    playerCurrency.autoSellStatus &&
    newValue < playerCurrency.autoSellThreshold
  ) {
    sellRef.current(currency, 9999999);
  }
};
