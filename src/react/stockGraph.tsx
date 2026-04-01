import { useEffect, useRef, useState } from "react";
import { convertPrefix, random, world } from "../basic.tsx";
import { useCurrency } from "./currencyContext.tsx";
import type { axisValue } from "./currencySelection.tsx";

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
  const { currencies, setCurrencies } = useCurrency();
  const { selectedCurrency } = useCurrency();

  const selectedPoints = selectedCurrency!.points;
  const selectedYValues = selectedCurrency!.yValues;

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
          // prevPoints.slice(0);
          currency.points = prevPoints.slice(1).map((p, i) => ({
            ...p,
            pos: {
              y:
                rect.height -
                rect.height * (p.value / Math.max(newValue, maxValue)),
              x: p.pos.x - spacing * Math.min(1, pointCount - i - 1),
            },
          }));

          // currency.points.push(newPoint);
          // });

          // console.log(currency.id, currency.points);

          // console.log(currency.yValues);
          // currency.yValues.forEach((yValue, i) => {

          const ySpacing = rect.height / 5;
          currency.yValues = Array.from({ length: 5 }, (_, i) => ({
            id: i,
            pos: {
              x: 0,
              y: ySpacing * i,
            },
            scale: 1,
            color: "black",
            value: Math.max(maxValue, newValue) / (i + 1),
          }));
          // });
        });

        return currencies;
      });
      const spacing = rect.width / (pointCount - 1);

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
      // Fix that maxValue is determined on the *existing* points, and not the last one which will be removed
    }, 1000);

    return () => clearInterval(interval);
  }, [graphSize, selectedCurrency, currencies, setCurrencies]);

  useEffect(() => {
    // const interval = setInterval(() => {
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
