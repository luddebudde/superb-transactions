import {
  convertPrefix,
  getArrayAverage,
  random,
  sum,
} from "../diverse/basic.ts";
import { useState } from "react";

type Person = {
  name: string;
  money: number;
  income: number;
  crypto: {
    first: number;
    second: number;
  };
};

const ThresholdSlider = ({
  label,
  value,
  onChange,
  min,
  max,
}: {
  label: string;
  value: number;
  onChange: (val: number) => void;
  min: number;
  max: number;
}) => (
  <div style={{ width: "100%", color: "white" }}>
    <label style={{ fontSize: "18px", fontWeight: "bold" }}>
      {label}: ${Math.round(value)}
    </label>
    <input
      type="range"
      className="wealthThresholdSlider"
      min={min}
      max={max}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      style={{ width: "100%", marginTop: "10px" }}
    />
  </div>
);

const styles = {
  container: {
    width: "100%",
    marginBottom: "20px",
  },

  title: {
    fontSize: "40px",
    fontWeight: "bold",
    marginBottom: "10px",
  },

  subtitle: {
    fontSize: "28px",
    fontWeight: "bold",
    marginTop: "15px",
    marginBottom: "5px",
  },

  info: {
    fontSize: "20px",
    fontWeight: "normal",
    marginLeft: "10px",
  },
};

export const WealthDistributionScreen = ({
  setCurrentMenu,
}: {
  setCurrentMenu: (menu: string) => void;
}) => {
  const peopleAmount = 100;

  const [people, setPeople] = useState<Person[]>(
    Array.from({ length: peopleAmount }, (_, i) => {
      const money = random(1000, 50000);
      return {
        name: `Item ${i}`,
        money: money,
        income: random(1000, 10000),
        crypto: {
          first: 0,
          second: 0,
        },
      };
    }).sort((a, b) => a.money - b.money),
  );

  const totalMoney = people.reduce((sum, p) => sum + p.money, 0);
  const moneyPerCapita = totalMoney / peopleAmount;

  const [povertyThreshold, setPovertyThreshold] = useState(
    moneyPerCapita * 0.5,
  );
  const [middleClassThreshold, setMiddleClassThreshold] = useState(
    moneyPerCapita * 1.5,
  );
  const [richThreshold, setRichThreshold] = useState(moneyPerCapita * 2);

  const classThresholds = [
    povertyThreshold,
    middleClassThreshold,
    richThreshold,
  ];

  const fourthPercentile: Person[] = [];
  const thirdPercentile: Person[] = [];
  const secondPercentile: Person[] = [];
  const firstPercentile: Person[] = [];
  const percentiles = [
    fourthPercentile,
    thirdPercentile,
    secondPercentile,
    firstPercentile,
  ];

  people.forEach((person) => {
    // console.log(classThresholds, person.money);
    const classIndex = classThresholds.findIndex(
      (threshold) => person.money < threshold,
    );
    percentiles[classIndex === -1 ? percentiles.length - 1 : classIndex].push(
      person,
    );
  });

  console.log(
    fourthPercentile,
    thirdPercentile,
    secondPercentile,
    firstPercentile,
  );

  percentiles.reverse();

  const classData = [
    { name: "POOR CLASS", percentile: fourthPercentile, color: "#8B0000" },
    { name: "MIDDLE CLASS", percentile: thirdPercentile, color: "#FF4500" },
    { name: "UPPER CLASS", percentile: secondPercentile, color: "#FFD700" },
    { name: "RICH CLASS", percentile: firstPercentile, color: "#32CD32" },
  ];

  return (
    <div
      style={{
        backgroundColor: "gray",
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "row",
      }}
    >
      <div
        style={{
          backgroundColor: "lightgrey",
          width: "40%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        {percentiles.map((percentile, index) => {
          const totalMoneyInClass = percentile.reduce(
            (sum, p) => sum + p.money,
            0,
          );
          const widthPercent = (totalMoneyInClass / totalMoney) * 100;

          return (
            <div
              key={index}
              style={{
                width: `${widthPercent * 10}px`,
                height: "25%",
                backgroundColor: ["#32CD32", "#FFD700", "#FF4500", "#8B0000"][
                  index
                ],

                // Comment away either one of these (not both, not neither)
                clipPath: `polygon(${50 - widthPercent / 3}% 0%, ${50 + widthPercent / 3}% 0%, 100% 100%, 0% 100%)`,
                // border: "2px solid black",

                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "20px",
                fontWeight: "bold",
                color: "white",
              }}
            >
              {percentile.length} people - $
              {Math.round(totalMoneyInClass / percentile.length)}
            </div>
          );
        })}
      </div>

      <div
        style={{
          backgroundColor: "#2a2a2a",
          width: "30%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "left",
          // justifyContent: "center",
          padding: "20px",
          // gap: "40px",
          marginLeft: "0px",
        }}
      >
        <ThresholdSlider
          label="Poverty Threshold"
          value={povertyThreshold}
          onChange={setPovertyThreshold}
          min={0}
          max={moneyPerCapita * 3}
        />

        <ThresholdSlider
          label="Middle Threshold"
          value={middleClassThreshold}
          onChange={setMiddleClassThreshold}
          min={povertyThreshold}
          max={richThreshold}
        />
        <ThresholdSlider
          label="Rich Threshold"
          value={richThreshold}
          onChange={setRichThreshold}
          min={middleClassThreshold}
          max={people[people.length - 1].money}
        />

        <div
          style={{
            width: "100%",
            color: "white",
            textAlign: "center",
            marginTop: "20px",
            lineHeight: "1.8",
          }}
        >
          {/* Money Section */}
          <div style={styles.container}>
            <div style={{ ...styles.title, color: "yellow" }}>MONEY</div>
            <div style={{ ...styles.info, color: "gold" }}>
              Money in system: {convertPrefix(totalMoney)}
            </div>
            <div style={{ ...styles.info, color: "gold" }}>
              Money per capita: {convertPrefix(moneyPerCapita)}
            </div>
          </div>

          {/* Classes Section */}
          <div style={styles.container}>
            <div style={{ ...styles.title, color: "lightblue" }}>CLASSES</div>

            {classData.map((classInfo, index) => (
              <div key={index}>
                <div style={{ ...styles.subtitle, color: classInfo.color }}>
                  {classInfo.name}
                </div>
                <div style={{ ...styles.info, color: "white" }}>
                  Count: {classInfo.percentile.length}
                </div>
                <div style={{ ...styles.info, color: "white" }}>
                  Average capital:{" "}
                  {convertPrefix(
                    Number(getArrayAverage(classInfo.percentile, "money")),
                  )}
                </div>
                <div style={{ ...styles.info, color: "white" }}>
                  Total wealth:{" "}
                  {convertPrefix(sum(classInfo.percentile, "money"))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <button
        style={{
          width: "33%",
          height: "100%",
        }}
        onClick={() => {
          setCurrentMenu("main");
        }}
      >
        RETURN
      </button>
    </div>
  );
};
