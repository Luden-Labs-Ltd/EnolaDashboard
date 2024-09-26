import React from "react";
import styles from "./card.module.scss";
import RangeView from "../RangeView";


interface DashboardCardProps {
    title: string;
    firstTitle: string;
    secondTitle: string;
    firstValue: number;
    secondValue: number;
    firstColor: string;
    secondColor: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({
    title,
    firstValue,
    secondValue,
    firstColor,
    secondColor,
    firstTitle,
    secondTitle,
}) => {

  const total = firstValue + secondValue

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <h3 className={styles.headerTitle}>{title}</h3>
        <h3 className={styles.headerCount}>
          Total: <span>{total}</span>
        </h3>
      </div>
      <div className={styles.mainContent}>
        <div className={styles.indicatorContent}>
          <div className={styles.infoWrapper}>
            <div className={styles.indicatorWrapper}>
              <div
                className={styles.indicator}
                style={{ backgroundColor: firstColor}}
              ></div>
              <span>{firstTitle}</span>
            </div>
            <p className={styles.indicatorCounter}>{firstValue}</p>
          </div>
          <div className={styles.infoWrapper}>
            <div className={styles.indicatorWrapper}>
              <div
                className={styles.indicator}
                style={{ backgroundColor: secondColor }}
              ></div>
              <span>{secondTitle}</span>
            </div>
            <p className={styles.indicatorCounter}>{secondValue}</p>
          </div>
        </div>
        <div className={styles.rangeWrapper}>
          <RangeView
                firstColor={firstColor}
                firstValue={firstValue}
                secondValue={secondValue}
                secondColor={secondColor}/>
        </div>
      </div>
    </div>
  );
}

export default DashboardCard