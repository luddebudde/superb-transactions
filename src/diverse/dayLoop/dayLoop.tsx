import { useEffect, useRef, useState } from "react";
import { lastElement, pointCount } from "../basic.ts";
import {
  type axisValue,
  useCurrency,
} from "../../react/mainScreen/currencyContext.tsx";
import { handleAutoTransaction } from "./handleAutoTransaction.ts";
import { calculateNewPoint } from "./calculateNewPoint.ts";
import { changeCryptoDrift } from "../priceDriver.ts";

export let dayCount = 1;

export const dayLoop = (
  graphRef: React.RefObject<HTMLDivElement | null>,
  intervalMs = 40,
): { graphSize: { width: number; height: number }; xValues: axisValue[] } => {
  const [graphSize, setGraphSize] = useState({ width: 0, height: 0 });
  const [xValues, setXValues] = useState<axisValue[]>([
    { id: 0, pos: { x: 0, y: 0 }, color: "", value: 0, scale: 0 },
  ]);
  const returnElements = { graphSize, xValues };

  const {
    setCurrencies,
    buyCurrency,
    sellCurrency,
    player,
    setPlayer,
    selectedCurrency,
  } = useCurrency();

  // Keep latest values in refs so the stable interval always sees current data
  const buyCurrencyRef = useRef(buyCurrency);
  const sellCurrencyRef = useRef(sellCurrency);
  const playerRef = useRef(player);
  useEffect(() => {
    buyCurrencyRef.current = buyCurrency;
    sellCurrencyRef.current = sellCurrency;
    playerRef.current = player;
  }, [buyCurrency, sellCurrency, player]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!graphRef.current) return;

      const rect = graphRef.current.getBoundingClientRect();
      setGraphSize({ width: rect.width, height: rect.height });

      const spacing = rect.width / pointCount;

      // Capture per-currency computed values to update player state after
      const lineData: Record<string, { newValue: number; maxValue: number }> =
        {};

      // buyCurrency(selectedCurrency, 1, people[0]);

      setCurrencies((prev) => {
        prev.forEach((currency) => {
          const maxValue = Math.max(...currency.points.map((p) => p.value));

          if (!(dayCount % 28)) {
            changeCryptoDrift();
          }

          // Create new points
          currency.points = calculateNewPoint(
            currency,
            rect,
            spacing,
            maxValue,
          );

          // Auto buying and selling
          const newValue = lastElement(currency.points).value;
          const pc = playerRef.current.currencies[currency.label];
          handleAutoTransaction(
            currency,
            pc,
            newValue,
            buyCurrencyRef,
            sellCurrencyRef,
          );

          // Store so setPlayer below can compute averageSpendingLine
          lineData[currency.label as string] = { newValue, maxValue };

          //Y spaces
          const ySpacing = rect.height / 5;
          currency.yValues = Array.from({ length: 5 }, (_, i) => ({
            id: i,
            pos: { x: 0, y: ySpacing * i },
            scale: 1,
            color: "black",
            value: (Math.max(maxValue, newValue) / 5) * (5 - i),
          }));
        });

        return [...prev];
      });

      // Immutably update averageSpendingLine in player for each currency
      setPlayer((prev) => {
        const updatedCurrencies = { ...prev.currencies };

        Object.entries(lineData).forEach(([idStr, { newValue, maxValue }]) => {
          const pc = updatedCurrencies[idStr];
          if (!pc) return;
          updatedCurrencies[idStr] = {
            ...pc,
            averageSpendingLine: {
              x: 0,
              y:
                rect.height -
                rect.height *
                  (pc.averageSpending / Math.max(newValue, maxValue)),
            },
          };
        });
        return { ...prev, currencies: updatedCurrencies };
      });

      setXValues(
        Array.from({ length: pointCount }, (_, i) => ({
          id: i,
          pos: { x: rect.width - spacing * i, y: 0 },
          scale: 1,
          color: "black",
          value: i,
        })),
      );
      dayCount += 0.25;
    }, intervalMs);

    return () => clearInterval(interval);
  }, []);

  return returnElements;
};
