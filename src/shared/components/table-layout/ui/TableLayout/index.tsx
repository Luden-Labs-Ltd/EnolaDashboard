import styles from "../../needsTable.module.scss";
import { PropsWithChildren } from "react";

interface TableLayoutProps {}

const TableLayout: React.FC<PropsWithChildren<TableLayoutProps>> = ({
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
export default TableLayout;
