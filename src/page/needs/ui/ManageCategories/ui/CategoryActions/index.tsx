import { CategoryType } from "entities/category";
import { DeleteCategory } from "features/delete-category";
import React from "react";

interface CategoryActionsProps {
  category: CategoryType
}
export const CategoryActions: React.FC<CategoryActionsProps> = ({category}) => {
  return (
    <div >
      <DeleteCategory category={category}/>
    </div>
  );
};
