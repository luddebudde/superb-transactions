import { useRef } from "react";
import { convertPrefix } from "../../diverse/basic.ts";
import { useCurrency } from "./currencyContext.tsx";
import { dayCount, useGameLoop } from "../../diverse/dayLoop/useGameLoop.tsx";

export const StockGraph = () => {
  const graphRef = useRef<HTMLDivElement | null>(null);
  const { selectedCurrency, money } = useCurrency();
  const { graphSize, xValues } = useGameLoop(graphRef);

  const selectedPoints = selectedCurrency?.points ?? [];
  const selectedYValues = selectedCurrency?.yValues ?? [];

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
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 50,
              fontSize: "200%",
              color: "black",
            }}
          >
            Day: {dayCount}
            Money: {Math.round(money)}
          </div>
        </div>
      ))}
    </div>
  );
};
