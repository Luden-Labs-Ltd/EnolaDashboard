import styles from "../../needsTable.module.scss";
import AddIcon from "shared/assets/AddIcon";
import { PropsWithChildren } from "react";

interface HeaderPanelProps {}

const HeaderPanel: React.FC<PropsWithChildren<HeaderPanelProps>> = ({
  children
}) => {
  return (
    <div className={styles.headerPanel}>
      {children}
    </div>
  );
};
export default HeaderPanel;
