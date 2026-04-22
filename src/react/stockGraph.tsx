import { useEffect, useRef, useState } from "react";
import { convertPrefix, random, world } from "../basic.tsx";
import { type axisValue, useCurrency } from "./currencyContext.tsx";

export const pointCount = 21;

export const StockGraph = () => {
  const graphRef = useRef<HTMLDivElement | null>(null);
  const [graphSize, setGraphSize] = useState({ width: 0, height: 0 });
  const [xValues, setXValues] = useState<axisValue[]>([
    {
      id: 0,
      pos: { x: 0, y: 0 },
      color: "",
      value: 0,
      scale: 0,
    },
  ]);
  // const [yValues, setYValues] = useState([]);
  const { currencies, setCurrencies, selectedCurrency } = useCurrency();

  const selectedPoints = selectedCurrency?.points ?? [];
  const selectedYValues = selectedCurrency?.yValues ?? [];

  useEffect(() => {
    const interval = setInterval(() => {
      if (!graphRef.current) return;

      const rect = graphRef.current.getBoundingClientRect();

      setGraphSize({
        width: rect.width,
        height: rect.height,
      });

      setCurrencies(() => {
        currencies.forEach((currency) => {
          const maxValue = Math.max(...currency.points.map((p) => p.value));

          // currency.points.forEach((prevPoint) => {
          const spacing = graphSize.width / pointCount;
          const prevPoints = currency.points;

          const previousValue: number = prevPoints[prevPoints.length - 1].value;
          const newValue = previousValue * random(0.8, 1.2, false);

          const newPoint = {
            id: prevPoints[prevPoints.length - 1].id + 1,
            pos: {
              y:
                rect.height -
                rect.height * (previousValue / Math.max(newValue, maxValue)),
              x: graphSize.width,
            },
            color: "yellow",
            scale: 1,
            value: newValue,
          };

          prevPoints.push(newPoint);

          // Make maxValue dependent on the y-position formula even here
          currency.points = prevPoints.slice(1).map((p, i) => ({
            ...p,
            pos: {
              y:
                rect.height -
                rect.height * (p.value / Math.max(newValue, maxValue)),
              x: p.pos.x - spacing * Math.min(1, pointCount - i - 1),
            },
          }));

          // Update visuals to actually show when averageSpending is zero
          currency.averageSpending =
            currency.owned === 0 ? 0 : currency.averageSpending;
          console.log(currency.owned, currency.averageSpending);

          currency.averageSpendingLine = {
            x: 0,
            y:
              rect.height -
              rect.height *
                (currency.averageSpending / Math.max(newValue, maxValue)),
          };

          const ySpacing = rect.height / 5;
          currency.yValues = Array.from({ length: 5 }, (_, i) => ({
            id: i,
            pos: {
              x: 0,
              y: ySpacing * i,
            },
            scale: 1,
            color: "black",
            value: (Math.max(maxValue, newValue) / 5) * (5 - i),
          }));
        });

        return currencies;
      });
      const spacing = rect.width / pointCount;

      const newXValues: axisValue[] = Array.from(
        { length: pointCount },
        (_, i) => ({
          id: i,
          pos: {
            x: rect.width - spacing * i,
            y: 0,
          },
          scale: 1,
          color: "black",
          value: i,
        }),
      );

      setXValues(newXValues);
    }, 1000);

    return () => clearInterval(interval);
  }, [graphSize, selectedCurrency, currencies, setCurrencies]);

  useEffect(() => {
    if (!graphRef.current) return;

    const rect = graphRef.current.getBoundingClientRect();

    setGraphSize({
      width: rect.width,
      height: rect.height,
    });
  }, []);

  const linePoints = selectedPoints
    .map((p) => `${p.pos.x},${p.pos.y}`)
    .join(" ");

  if (!selectedCurrency) return null;

  return (
    <div
      id={"stockGraph"}
      ref={graphRef}
      style={{
        left: "50vw",
        top: 0,
        position: "absolute",
        height: "75%",
        width: "50vw",
        transform: "translate(-50%)",
        display: "flex",
      }}
    >
      width: {world.width} height: {world.height}
      <svg width="100%" height="100%" style={{ position: "absolute" }}>
        <polyline
          points={linePoints}
          fill="none"
          stroke="green"
          strokeWidth={20}
        />
      </svg>
      {selectedPoints.map((p) => (
        <div
          key={p.id}
          style={{
            position: "absolute",
            top: p.pos.y,
            left: p.pos.x,
            color: "red",
            textAlign: "center",
          }}
          className="graphPoint"
        >
          {convertPrefix(p.value)}
        </div>
      ))}
      {xValues.map((p) => (
        <div
          key={p.id}
          style={{
            // scale: p.scale,
            position: "absolute",
            top: graphSize.height * 0.99,
            left: p.pos.x,
            color: "black",
            backgroundColor: "lime",
            width: "0.75vw",
            height: "2vh",
            fontSize: "100%",
            textAlign: "center",
          }}
          className="graphPoint"
        >
          {p.id}
        </div>
      ))}
      <div>
        <div
          key={"averageSpendingLine"}
          style={{
            position: "absolute",
            top: selectedCurrency.averageSpendingLine.y,
            left: 0,
            color: "black",
            backgroundColor: "brown",
            width: "100%",
            height: "1.5vh",
            fontSize: "150%",
            textAlign: "center",
            opacity: 0.9,
            transform: "translate(0%, 100%)",
          }}
          className="graphPoint"
        >
          {Math.round(selectedCurrency?.averageSpending)}
        </div>
      </div>
      {selectedYValues.map((p) => (
        <div>
          <div
            key={p.id + 150}
            style={{
              // scale: p.scale,
              position: "absolute",
              top: p.pos.y,
              left: 0,
              color: "black",
              backgroundColor: "orangered",
              width: "100%",
              height: "0.5vh",
              fontSize: "100%",
              textAlign: "center",
              opacity: 0.5,
              transform: "translate(0%, 100%)",
            }}
            className="graphPoint"
          ></div>
          <div
            key={p.id}
            style={{
              // scale: p.scale,
              position: "absolute",
              top: p.pos.y,
              left: 0,
              color: "black",
              backgroundColor: "orange",
              width: "1.5vw",
              height: "2vh",
              fontSize: "100%",
              textAlign: "center",
              transform: "translate(-15%, 0%)",
            }}
            className="graphPoint"
          >
            {Math.round(p.value)}
          </div>
        </div>
      ))}
    </div>
  );
};
