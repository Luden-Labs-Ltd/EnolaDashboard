import { useTranslations } from "next-intl";
import styles from "../../needsTable.module.scss";
import { PropsWithChildren } from "react";

export interface CategoriesProps {}

const Categories: React.FC<PropsWithChildren<CategoriesProps>> = ({
  children,
}) => {
  const t = useTranslations();
  return (
    <div className={`${styles.category}`}>
      <h3 className={`${styles.title}`}>{t('Common.categories')}</h3>
      <div>{children}</div>
    </div>
  );
};

export default Categories;
