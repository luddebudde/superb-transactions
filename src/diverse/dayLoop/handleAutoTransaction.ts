import type { Currency } from "../../react/mainScreen/currencyContext.tsx";
import type { RefObject } from "react";

export const handleAutoTransaction = (
  currency: Currency,
  newValue: number,
  buyRef: RefObject<(currency: Currency, amount: number) => void>,
  sellRef: RefObject<(currency: Currency, amount: number) => void>,
) => {
  if (currency.autoBuyStatus && newValue < currency.autoBuyThreshold) {
    buyRef.current(currency, 9999999);
  }

  if (currency.autoSellStatus && newValue < currency.autoSellThreshold) {
    sellRef.current(currency, 9999999);
  }
};
