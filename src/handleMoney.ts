import type { Currency } from "./react/currencySelection.tsx";
import { lastElement } from "./basic.tsx";

export const buy = (money: number, currency: Currency, amount: number) => {
  const valuation = lastElement(currency.points).value;
  const purchaseAbleAmount = Math.min(Math.floor(money / valuation), amount);

  return [money - valuation * purchaseAbleAmount, purchaseAbleAmount];
};

export const sell = (money: number, currency: Currency, amount: number) => {
  const valuation = lastElement(currency.points);

  console.log(money + valuation * amount, -amount);
  return [money + valuation * amount, -amount];
};

export const buyCurrency = (
  money: number,
  setMoney,
  selectedCurrency: Currency,
  setSelectedCurrency,
  setCurrencies,
  amount: number,
) => {
  const [newMoney, newAmount] = buy(money, selectedCurrency, amount);

  setMoney(newMoney);

  setSelectedCurrency((currency) => ({
    ...currency,
    owned: currency.owned + newAmount,
  }));

  // Uppdatera currencies-arrayen också
  setCurrencies((prev) =>
    prev.map((c) =>
      c.id === selectedCurrency.id ? { ...c, owned: c.owned + newAmount } : c,
    ),
  );
};
