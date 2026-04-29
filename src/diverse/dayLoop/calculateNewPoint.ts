import type {
  Currency,
  Point,
} from "../../react/mainScreen/currencyContext.tsx";
import { pointCount, random } from "../basic.ts";
import { cryptoDrift } from "../priceDriver.ts";

export const calculateNewPoint = (
  currency: Currency,
  rect: DOMRect,
  spacing: number,
  maxValue: number,
): Point[] => {
  const prevPoints: Point[] = currency.points;
  const previousValue = prevPoints[prevPoints.length - 1].value;
  const newValue =
    previousValue * random(cryptoDrift.min, cryptoDrift.max, false);

  const newPoint = {
    id: prevPoints[prevPoints.length - 1].id + 1,
    pos: {
      y:
        rect.height -
        rect.height * (previousValue / Math.max(newValue, maxValue)),
      x: rect.width,
    },
    color: "yellow",
    scale: 1,
    value: newValue,
  };

  const preArray = [...prevPoints, newPoint];

  return preArray.slice(1).map((p, i) => ({
    ...p,
    pos: {
      y: rect.height - rect.height * (p.value / Math.max(newValue, maxValue)),
      x: p.pos.x - spacing * Math.min(1, pointCount - i - 1),
    },
  }));
};
