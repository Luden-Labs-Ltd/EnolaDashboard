import styles from "../../needsTable.module.scss";
import AddIcon from "shared/assets/AddIcon";
import { PropsWithChildren } from "react";

interface CategoriesProps {

}

const Categories: React.FC<PropsWithChildren<CategoriesProps>> = () => {
    return (
      <div className={`${styles.category}`}>
        <h3 className={`${styles.title} mb-4`}>Categories</h3>
        <div>
          <button
            color="clear"
            // startIcon={<AddIcon />}
          >
            <span className="font-grotesk">Add category</span>
          </button>
        </div>
      </div>
    );
  };

export default Categories;