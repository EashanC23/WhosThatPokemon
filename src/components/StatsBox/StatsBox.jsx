import React, { Children } from "react";
import "./StatsBox.css";

function StatsBox(props) {
  var bgColor;
  const difference = props.referenceStat - props.guessedStat;
  if (props.referenceStat != 0) {
    if (difference == 0) {
      bgColor = "close";
    } else if (difference < 10) {
      bgColor = "medium";
    } else {
      bgColor = "far";
    }
  } else {
    bgColor = "#213547";
  }
  return (
    <div className="statsBox">
      <div className={bgColor}>
        {props.children}
      </div>
    </div>
  );
}

export default StatsBox;
