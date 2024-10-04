import styles from "../../needsTable.module.scss";
import AddIcon from "shared/assets/AddIcon";
import { PropsWithChildren } from "react";

interface HeaderPanelProps {

}

const HeaderPanel: React.FC<PropsWithChildren<HeaderPanelProps>> = () => {
    return (
      <div className={styles.headerPanel}>
        <h3 className={styles.title}>Tasks</h3>
      </div>
    );
  };
export default HeaderPanel;