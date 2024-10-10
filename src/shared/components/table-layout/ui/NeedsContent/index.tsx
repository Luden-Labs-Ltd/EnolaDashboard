import { PropsWithChildren } from "react";
import styles from "../../needsTable.module.scss";

interface NeedsLayoutProps {}

const NeedsContent: React.FC<PropsWithChildren<NeedsLayoutProps>> = ({
  children,
}) => {
  return (
    <>
      <div className={`${styles.content} flex flex-col flex-1`}>{children}</div>
    </>
  );
};

export default NeedsContent;
