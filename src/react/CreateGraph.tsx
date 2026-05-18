import { convertPrefix, largestElement } from "../diverse/basic.ts";
import type { Point } from "./mainScreen/currencyContext.tsx";

type CreateGraphProps = {
  array: Point[];
  graphSize: { width: number; height: number };
  spacing: number;
  bottom: number;
  ceiling: number;
  style: {
    color: string;
  };
};

export const CreateGraph = ({
  array,
  graphSize,
  spacing,
  bottom,
  ceiling,
  style,
}: CreateGraphProps) => {
  const xPosFunction = (point: Point, i) => spacing * (array.length - i - 1);

  const yPosFunction = (point: Point) =>
    graphSize.height - graphSize.height * (point.value / ceiling);

  const linePoints = array
    .map((p, i) => {
      const x = graphSize.width - xPosFunction(p, i);
      const y = yPosFunction(p);
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <>
      <svg width="100%" height="100%" style={{ position: "absolute" }}>
        <polyline
          points={linePoints}
          fill="none"
          stroke="green"
          strokeWidth={20}
        />
      </svg>
      {array.map((point, i) => (
        <div
          key={point.id}
          style={{
            position: "absolute",
            left: graphSize.width - xPosFunction(point, i),
            top: yPosFunction(point),
            color: style.color,
            textAlign: "center",
          }}
          className="graphPoint"
        >
          {convertPrefix(point.value)}
        </div>
      ))}
    </>
  );
};
