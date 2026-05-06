import type { Currency, PlayerCurrency } from "../../react/mainScreen/currencyContext.tsx";
import type { RefObject } from "react";

export const handleAutoTransaction = (
  currency: Currency,
  playerCurrency: PlayerCurrency | undefined,
  newValue: number,
  buyRef: RefObject<(currency: Currency, amount: number) => void>,
  sellRef: RefObject<(currency: Currency, amount: number) => void>,
) => {
  if (!playerCurrency) return;

  if (playerCurrency.autoBuyStatus && newValue < playerCurrency.autoBuyThreshold) {
    buyRef.current(currency, 9999999);
  }

  if (playerCurrency.autoSellStatus && newValue < playerCurrency.autoSellThreshold) {
    sellRef.current(currency, 9999999);
  }
};
