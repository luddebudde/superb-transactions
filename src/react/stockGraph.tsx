import type { GraphPoint } from "../main.tsx";
import { useState } from "react";

export const StockGraph = () => {
  let previousValue = 0;
  const [points, setPoints] = useState<GraphPoint[]>(
    Array.from({ length: 21 }, (_, i) => ({
      id: i,
      pos: {
        x: screen.width * (i / 21) * 0.35,
        y: Math.random() * 500,
      },
      scale: 1,
      color: "yellow",
      value: Math.random() * 100,
    })),
  );
  // points.forEach((point, i) => {
  //   point.id--;
  // });
  // points.shift();
  // points.push({
  //   id: 21,
  //   // pos: {
  //   //   x: i,
  //   //   y: 0,
  //   // },
  //   color: "yellow",
  //   value: Math.random(),
  // });

  // setPoints(points);

  const linePoints = points.map((p) => `${p.pos.x},${p.pos.y}`).join(" ");

  return (
    <div
      id={"stockGraph"}
      style={{
        left: "50vw",
        top: 0,
        position: "absolute",
        height: "75vh",
        width: "50vw",
        // backgroundColor: "#323036",
        transform: "translate(-50%)",
        display: "flex",
        justifyContent: "space-evenly",
      }}
    >
      <svg width="100%" height="100%" style={{ position: "absolute" }}>
        <polyline
          points={linePoints}
          fill="none"
          stroke="white"
          strokeWidth={20}
        />
      </svg>
      {points.map((p) => (
        <div
          key={p.id}
          style={{
            scale: p.scale,
            position: "absolute",
            top: p.pos.y,
            left: p.pos.x,
          }}
          className="graphPoint"
        />
      ))}
    </div>
  );
};
