import React, { PropsWithChildren } from "react";
import styles from "./needsTable.module.scss";
import Categories from "./ui/Catigories";
import HeaderPanel from "./ui/HeaderPanel";

interface NeedsLayoutProps {}


const NeedsTable: React.FC<PropsWithChildren<NeedsLayoutProps>> = ({
  children,
}) => {
  return (
    <>
      <div className={`flex ${styles.wrapper}`}>
        <Categories />
        <div className="flex flex-col flex-1">
          <HeaderPanel />
          <div className={styles.content}>{children}</div>
        </div>
      </div>
    </>
  );
};

export default NeedsTable;
