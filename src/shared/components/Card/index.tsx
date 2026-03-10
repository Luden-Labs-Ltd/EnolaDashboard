import React, { PropsWithChildren } from "react";
import { cn } from "@utils";
import styles from "./Card.module.scss";

const CardHeader: React.FC<PropsWithChildren> = ({ children }) => {
  return <div className={styles.cardHeader}>{children}</div>;
};

const CardTitle: React.FC<PropsWithChildren> = ({ children }) => {
  return <h3 className={styles.headerTitle}>{children}</h3>;
};

interface CardContent {
  padding?: string;
  className?: string;
}

const CardContent: React.FC<PropsWithChildren<CardContent>> = ({
  children,
  padding,
  className,
}) => {
  return (
    <div
      className={cn(styles.mainContent, className)}
      style={padding ? { padding } : undefined}
    >
      {children}
    </div>
  );
};

interface CardProps {
  backgroundColor?: string;
}
const Card: React.FC<PropsWithChildren<CardProps>> = ({
  children,
  backgroundColor,
}) => {
  return (
    <div
      className={`${styles.card}`}
      style={{
        backgroundColor: backgroundColor,
        borderColor: backgroundColor,
      }}
    >
      {children}
    </div>
  );
};

export { Card, CardHeader, CardTitle, CardContent };
