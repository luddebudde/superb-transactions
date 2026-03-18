import { useEffect, useRef, useState } from "react";
import { random, world } from "../basic.tsx";

export const StockGraph = () => {
  const pointCount = 21;

  const graphRef = useRef<HTMLDivElement | null>(null);
  const [graphSize, setGraphSize] = useState({ width: 0, height: 0 });
  const [points, setPoints] = useState(
    Array.from({ length: pointCount }, (_, i) => ({
      id: i,
      pos: {
        x: 50 * i,
        y: 50 * i,
      },
      scale: 1,
      color: "yellow",
<<<<<<< HEAD
      value: random(0, 50),
    })),
  );
  const [xValues, setXValues] = useState([]);
  const [yValues, setYValues] = useState([]);
=======
      value: Math.random() * 100,
    })),
  );
  console.log(points);
  const [xValues, setXValues] = useState([]);
>>>>>>> origin/main

  useEffect(() => {
    const interval = setInterval(() => {
      if (!graphRef.current) return;

      const rect = graphRef.current.getBoundingClientRect();

      setGraphSize({
        width: rect.width,
        height: rect.height,
      });

      setPoints((prevPoints) => {
        const spacing = rect.width / (pointCount - 1);

        const maxValue = Math.max(...prevPoints.map((p) => p.value));
        const newPoints = prevPoints.slice(1).map((p, i) => ({
          ...p,
          id: i,
          pos: {
            y: rect.height - rect.height * (p.value / maxValue),
            x: p.pos.x - spacing,
          },
          value: p.value,
        }));

        const previousValue: number = newPoints[newPoints.length - 1].value;
        const newValue = previousValue * random(0.6, 1.4, false);

        // Make maxValue dependent on the y-position formula even here
        console.log(rect.height - (newValue * 500) / maxValue, newValue);
        newPoints.push({
          id: pointCount - 1,
          pos: {
            x: rect.width,
            y: rect.height - rect.height * (newValue / maxValue),
          },
          scale: 1,
          color: "yellow",
          value: newValue,
        });

        return newPoints;
      });

      // Replace points.map with the actual array of points, so that the value on the x-axis is dynamic
      setYValues(() => {
        const spacing = rect.height / 5;
        const maxValue = Math.max(...points.map((p) => p.value));

        return Array.from({ length: 5 }, (_, i) => ({
          id: i,
          pos: {
            x: 0,
            y: spacing * i,
          },
          scale: 1,
          color: "black",
          value: maxValue * (1 / (i + 1)),
        }));
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [graphSize]);

  useEffect(() => {
    // const interval = setInterval(() => {
    if (!graphRef.current) return;

    const rect = graphRef.current.getBoundingClientRect();

    setGraphSize({
      width: rect.width,
      height: rect.height,
    });
<<<<<<< HEAD

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

  const linePoints = points.map((p) => `${p.pos.x},${p.pos.y}`).join(" ");

=======

    const spacing = graphSize.width / pointCount + 1;
    // const points = Array.from({ length: pointCount }, (_, i) => ({
    //   id: i,
    //   pos: {
    //     x: graphSize.width - spacing * i - 25,
    //     y: graphSize.height * 0.5 * (i / 10) + (Math.random() + 0.99) * 10,
    //   },
    //   scale: 1,
    //   color: "yellow",
    //   value: Math.random() * 100,
    // }));

    // const newPoints = points.map((point: GraphPoint) => {
    //   if (point.id === pointCount - 1) {
    //     points.shift();
    //     points.push({
    //       id: 0,
    //       pos: {
    //         x: 0,
    //         y: 0,
    //       },
    //       scale: 1,
    //       color: "yellow",
    //       value: Math.random() * 100,
    //     });
    //   }
    //   console.log(points[point.id].pos);
    //   point.id++;
    //   // point = points[point.id];
    //   point.pos.x = points[point.id].pos.x;
    //   point.pos.y = points[point.id].pos.y;
    //   point.value = points[point.id].value;
    // });
    //
    // setPoints(newPoints);
    const newPoints = points.slice(1).map((p, i) => ({
      ...p,
      id: i,
      pos: {
        ...p.pos,
        x: p.pos.x - spacing,
      },
    }));

    newPoints.push({
      id: pointCount - 1,
      pos: {
        x: graphSize.width,
        y: Math.random() * graphSize.height,
      },
      scale: 1,
      color: "yellow",
      value: Math.random() * 100,
    });

    setPoints(newPoints);

    const xValue = Array.from({ length: pointCount }, (_, i) => ({
      id: i,
      pos: {
        x: graphSize.width - spacing * i - 25,
        y: world.height * 0.33,
      },
      scale: 1,
      color: "black",
      value: i,
    }));
    setXValues(xValue);
  }, [graphSize]);

  const linePoints = points.map((p) => `${p.pos.x},${p.pos.y}`).join(" ");

>>>>>>> origin/main
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
      {points.map((p) => (
        <div
          key={p.id}
          style={{
            position: "absolute",
            top: p.pos.y,
            left: p.pos.x,
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
      {yValues.map((p) => (
        <div
          key={p.id}
          style={{
            // scale: p.scale,
            position: "absolute",
            top: p.pos.y,
            left: 0,
            color: "black",
            backgroundColor: "orange",
            width: "0.75vw",
            height: "2vh",
            fontSize: "100%",
            textAlign: "center",
          }}
          className="graphPoint"
        >
          {Math.round(p.value)}
        </div>
      ))}
    </div>
  );
};
