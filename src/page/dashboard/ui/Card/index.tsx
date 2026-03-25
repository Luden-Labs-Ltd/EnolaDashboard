import React from "react";
import styles from "./card.module.scss";
import RangeView from "@components/RangeView";
import { Card, CardContent, CardHeader, CardTitle } from "@components/Card";
import { useTranslations } from "next-intl";

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
  const t = useTranslations()
  const total = firstValue + secondValue;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <h3 className={styles.headerCount}>
          {t('Common.total')}: <span>{total}</span>
        </h3>
      </CardHeader>
      <CardContent>
        <div className={`${styles.indicatorContent} text-[20px]`}>
          <div className={styles.infoWrapper}>
            <div className={styles.indicatorWrapper}>
              <div
                className={styles.indicator}
                style={{ backgroundColor: firstColor }}
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
            secondColor={secondColor}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardCard;
