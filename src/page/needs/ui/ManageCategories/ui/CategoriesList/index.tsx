import {
  useCategoryStore,
  CategoryPressCallbackArguments,
  Category,
} from "entities/category";
import React from "react";
import { CategoryActions } from "../CategoryActions";

export const CategoriesList = () => {
  const { categoryState, toggleActiveCategory } = useCategoryStore();
  const { categories } = categoryState;

  const pressCallbackHandler = (payload: CategoryPressCallbackArguments) => {
    toggleActiveCategory(payload.id, payload.isActive);
  };

  return (
    <div className="flex flex-1 w-full flex-col min-w-72 gap-2 mb-3">
      {categories.map((category) => {
        return (
          <Category
            isPresseble
            className="justify-between"
            iconType={category.icon}
            pressCallback={pressCallbackHandler}
            key={category.id}
            title={category.title}
            id={category.id}
            active={category.active}
            actions={<CategoryActions category={category} />}
          />
        );
      })}
    </div>
  );
};
