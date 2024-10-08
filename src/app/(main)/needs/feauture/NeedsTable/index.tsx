import React, { PropsWithChildren } from "react";
import styles from "./needsTable.module.scss";
import Categories from "./ui/Catigories";
import HeaderPanel from "./ui/HeaderPanel";

interface NeedsLayoutProps {
}


const NeedsTable: React.FC<PropsWithChildren<NeedsLayoutProps>> = ({
  children,
}) => {
  return (
    <>
      <div className={`flex ${styles.wrapper}`}>
        {children}
      </div>
    </>
  );
};

const Content: React.FC<PropsWithChildren<NeedsLayoutProps>> = ({
  children,
}) => {
  return (
    <>
      <div className={`${styles.content} flex flex-col flex-1`}>
        {children}
      </div>
    </>
  );
};

export {NeedsTable, Content, HeaderPanel, Categories};
