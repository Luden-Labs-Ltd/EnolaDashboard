import React, { PropsWithChildren } from "react";
import styles from "./Card.module.scss";

const CardHeader: React.FC<PropsWithChildren> = ({ children }) => {
  return <div className={styles.cardHeader}>{children}</div>;
};

const CardTitle: React.FC<PropsWithChildren> = ({ children }) => {
  return <h3 className={styles.headerTitle}>{children}</h3>;
};

const CardContent: React.FC<PropsWithChildren> = ({ children }) => {
  return <div className={styles.mainContent}>{children}</div>
};



const Card: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className={styles.card}>
      {children}
    </div>
  );
};

export {Card, CardHeader, CardTitle, CardContent};
