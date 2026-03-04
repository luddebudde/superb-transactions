import type { GraphPoint } from "../main.tsx";
import { useEffect, useRef, useState } from "react";
import { world } from "../basic.tsx";

export const StockGraph = () => {
  const graphRef = useRef<HTMLDivElement | null>(null);
  const [graphSize, setGraphSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (!graphRef.current) return;

    const rect = graphRef.current.getBoundingClientRect();

    setGraphSize({
      width: rect.width,
      height: rect.height,
    });
  }, []);

  const pointCount = 21;
  const spacing = (world.width * 0.33) / pointCount + 1;

  const [points, setPoints] = useState<GraphPoint[]>(
    Array.from({ length: pointCount }, (_, i) => ({
      id: i,
      pos: {
        x: spacing * i,
        y: Math.random() * world.height * 0.5,
      },
      scale: 1,
      color: "yellow",
      value: Math.random() * 100,
    })).reverse(),
  );
  const linePoints = points.map((p) => `${p.pos.x},${p.pos.y}`).join(" ");

  const [xValues, setxValues] = useState(
    Array.from({ length: pointCount }, (_, i) => ({
      id: i,
      pos: {
        x: i * spacing,
        y: world.height * 0.33,
      },
      scale: 1,
      color: "black",
      value: i,
    })),
  );

  return (
    <div
      id={"stockGraph"}
      ref={graphRef}
      style={{
        left: "50vw",
        top: 0,
        position: "absolute",
        height: "75vh",
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
      {points.map((p) => (
        <div
          key={p.id}
          style={{
            position: "absolute",
            top: p.pos.y,
            left: graphSize.width - p.pos.x,
            color: "red",
          }}
          className="graphPoint"
        >
          {p.id}
        </div>
      ))}
      {xValues.map((p) => (
        <div
          key={p.id}
          style={{
            // scale: p.scale,
            position: "absolute",
            top: graphSize.height * 0.99,
            left: graphSize.width - p.pos.x,
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
    </div>
  );
};
