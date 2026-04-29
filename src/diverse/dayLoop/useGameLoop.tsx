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

export const useGameLoop = (
  graphRef: React.RefObject<HTMLDivElement | null>,
  intervalMs = 750,
): { graphSize: { width: number; height: number }; xValues: axisValue[] } => {
  const [graphSize, setGraphSize] = useState({ width: 0, height: 0 });
  const [xValues, setXValues] = useState<axisValue[]>([
    { id: 0, pos: { x: 0, y: 0 }, color: "", value: 0, scale: 0 },
  ]);

  const { setCurrencies, buyCurrency, sellCurrency } = useCurrency();

  // Keep buyCurrency in a ref so the stable interval always calls the latest version
  const buyCurrencyRef = useRef(buyCurrency);
  const sellCurrencyRef = useRef(sellCurrency);
  useEffect(() => {
    buyCurrencyRef.current = buyCurrency;
    sellCurrencyRef.current = sellCurrency;
  }, [buyCurrency, sellCurrency]);

  // Stable interval — never recreated because:
  //   • setCurrencies (useState setter) is guaranteed stable by React
  //   • setGraphSize / setXValues are also stable setters
  //   • we use functional update (prev =>) so we never read stale state
  //   • graphRef is a ref, so always has the latest DOM node
  useEffect(() => {
    const interval = setInterval(() => {
      if (!graphRef.current) return;

      const rect = graphRef.current.getBoundingClientRect();
      setGraphSize({ width: rect.width, height: rect.height });

      const spacing = rect.width / pointCount;

      setCurrencies((prev) => {
        prev.forEach((currency) => {
          const maxValue = Math.max(...currency.points.map((p) => p.value));

          if (!(dayCount % 21)) {
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
          handleAutoTransaction(
            currency,
            newValue,
            buyCurrencyRef,
            sellCurrencyRef,
          );

          // Showing average spending
          currency.averageSpendingLine = {
            x: 0,
            y:
              rect.height -
              rect.height *
                (currency.averageSpending / Math.max(newValue, maxValue)),
          };

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

        // Returning points to update
        return [...prev];
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
      dayCount++;
    }, intervalMs);

    return () => clearInterval(interval);
  }, []);

  return { graphSize, xValues };
};
