import { useEffect, useRef, useState } from "react";
import { convertPrefix, random, world } from "../basic.tsx";
import { useCurrency } from "./test.tsx";

export const pointCount = 21;

export const StockGraph = () => {
  const graphRef = useRef<HTMLDivElement | null>(null);
  const [graphSize, setGraphSize] = useState({ width: 0, height: 0 });
  // const [points, setPoints] = useState(
  //   Array.from({ length: pointCount }, (_, i) => ({
  //     id: i,
  //     pos: {
  //       x: 50 * i,
  //       y: 50 * i,
  //     },
  //     scale: 1,
  //     color: "yellow",
  //     value: random(0, 5000),
  //   })),
  // );
  const [xValues, setXValues] = useState([]);
  // const [yValues, setYValues] = useState([]);
  const { currencies, setCurrencies } = useCurrency();
  const { selectedCurrency } = useCurrency();

  const selectedPoints = selectedCurrency.points ?? [];
  const selectedYValues = selectedCurrency.yValues ?? [];

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

          currency.setPoints((prevPoints) => {
            const spacing = rect.width / (pointCount - 1);

            const previousValue: number =
              prevPoints[prevPoints.length - 1].value;
            const newValue = previousValue * random(0.6, 1.4, false);

            const newPoints = prevPoints.slice(1).map((p, i) => ({
              ...p,
              id: i,
              pos: {
                y:
                  rect.height -
                  rect.height * (p.value / Math.max(newValue, maxValue)),
                x: p.pos.x - spacing,
              },
              value: p.value,
            }));

            // Make maxValue dependent on the y-position formula even here
            // newPoints.push({
            //   id: pointCount - 1,
            //   pos: {
            //     x: rect.width,
            //     y:
            //       rect.height -
            //       rect.height * (newValue / Math.max(newValue, maxValue)),
            //   },
            //   scale: 1,
            //   color: "yellow",
            //   value: newValue,
            // });

            return newPoints;
          });

          // console.log(currency.points[1].value);

          // Replace points.map with the actual array of points, so that the value on the x-axis is dynamic
          currency.setYValues(() => {
            const spacing = rect.height / 5;
            return Array.from({ length: 5 }, (_, i) => ({
              id: i,
              pos: {
                x: 0,
                y: spacing * i,
              },
              scale: 1,
              color: "black",
              value: maxValue / (i + 1),
            }));
          });
        });
      });

      // Fix that maxValue is determined on the *existing* points, and not the last one which will be removed
    }, 1000);
    return () => clearInterval(interval);
  }, [graphSize, selectedCurrency, currencies]);

  useEffect(() => {
    // const interval = setInterval(() => {
    if (!graphRef.current) return;

    const rect = graphRef.current.getBoundingClientRect();

    setGraphSize({
      width: rect.width,
      height: rect.height,
    });

    setXValues(() => {
      const spacing = rect.width / (pointCount - 1);

      return Array.from({ length: pointCount }, (_, i) => ({
        id: i,
        pos: {
          x: rect.width - spacing * i,
          y: 0,
        },
        scale: 1,
        color: "black",
        value: i,
      }));
    });
  }, []);

  const linePoints = selectedPoints
    .map((p) => `${p.pos.x},${p.pos.y}`)
    .join(" ");

  console.log(selectedCurrency);

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
