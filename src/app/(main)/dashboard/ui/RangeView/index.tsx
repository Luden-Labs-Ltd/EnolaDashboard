import React from "react";
import styles from "./range.module.scss";

interface RangeViewProps {
  firstValue: number;
  secondValue: number;
  firstColor: string;
  secondColor: string;
}

const RangeView: React.FC<RangeViewProps> = ({
  firstColor,
  firstValue,
  secondValue,
  secondColor,
}) => {
  const fullValue = firstValue + secondValue;
  const firstValuePercent = (firstValue / fullValue) * 100;

  return (
    <div
      className={styles.mainWrapper}
      style={{ backgroundColor: secondColor }}
    >
      <div
        className={styles.additionalView}
        style={{
          width: `${firstValuePercent}%`,
          backgroundColor: firstColor,
        }}
      ></div>
    </div>
  );
};

export default RangeView;
