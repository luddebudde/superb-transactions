import { useRef } from "react";
import { largestElement, pointCount } from "../../diverse/basic.ts";
import { useCurrency } from "./currencyContext.tsx";
import { dayCount, useDayLoop } from "../../diverse/dayLoop/dayLoop.tsx";
import { CreateGraph } from "../CreateGraph.tsx";

export const StockGraph = () => {
  const graphRef = useRef<HTMLDivElement | null>(null);
  const { selectedCurrency, player } = useCurrency();
  const { graphSize, xValues } = useDayLoop(graphRef);

  const selectedPoints = selectedCurrency?.points ?? [];
  const selectedYValues = selectedCurrency?.yValues ?? [];
  const pc = selectedCurrency
    ? player.currencies[selectedCurrency.label as string]
    : null;

  // const linePoints = selectedPoints
  //   .map((p) => `${p.pos.x},${p.pos.y}`)
  //   .join(" ");
  // const linePoints = selectedPoints.map((p) => `${0},${0}`).join(" ");

  if (!selectedCurrency) return null;

  // console.log(selectedPoints);
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
      <CreateGraph
        array={selectedPoints}
        bottom={0}
        graphSize={graphSize}
        spacing={graphSize.width / pointCount}
        ceiling={largestElement(selectedPoints, "value")}
        style={{ color: "red" }}
      ></CreateGraph>
      {/*{selectedPoints.map((p) => (*/}
      {/*  <div*/}
      {/*    key={p.id}*/}
      {/*    style={{*/}
      {/*      position: "absolute",*/}
      {/*      top: p.pos.y,*/}
      {/*      left: p.pos.x,*/}
      {/*      color: "red",*/}
      {/*      textAlign: "center",*/}
      {/*    }}*/}
      {/*    className="graphPoint"*/}
      {/*  >*/}
      {/*    {convertPrefix(p.value)}*/}
      {/*  </div>*/}
      {/*))}*/}
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
            top: pc.averageSpendingLine.y,
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
          {Math.round(pc?.averageSpending ?? 0)}
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
            Money: {Math.round(player.money)}
          </div>
        </div>
      ))}
    </div>
  );
};
