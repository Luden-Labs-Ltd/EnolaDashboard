import { CategoryType, DefaultCategoryIconTypesArray } from "entities/category";
import { DeleteCategory } from "features/delete-category";
import React from "react";

interface CategoryActionsProps {
  category: CategoryType;
}
export const CategoryActions: React.FC<CategoryActionsProps> = ({
  category,
}) => {
  // @ts-ignore
  if (DefaultCategoryIconTypesArray.includes(category.id)) {
    return null;
  }
  return (
    <div>
      <DeleteCategory category={category} />
    </div>
  );
};
