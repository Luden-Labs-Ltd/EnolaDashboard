"use client";
import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { CategoryType } from ".";

type CategoryContextState = {
  categories: CategoryType[];
  activeCategories: CategoryType[];
  currentCategory: CategoryType;
};

type CategoryProviderValue = {
  categories: CategoryType[];
  currentCategory: CategoryType;
};

const CategoryContext = createContext<{
  categoryState: CategoryContextState;
  setData: Dispatch<SetStateAction<CategoryContextState>>;
} | null>(null);

export const CategoryStoreProvider: React.FC<
  PropsWithChildren<CategoryProviderValue>
> = ({ categories, currentCategory, children }) => {

  const activeCategories = categories.filter((category) => category.active);
  const [categoryState, setCategoryState] = useState<CategoryContextState>({
    categories: categories,
    activeCategories: activeCategories,
    currentCategory,
  });

  return (
    <CategoryContext.Provider
      value={{
        categoryState: categoryState,
        setData: setCategoryState,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategoryStore = () => {
  const categoryContext = useContext(CategoryContext);

  if (!categoryContext) {
    throw new Error(
      "categoryContext has to be used within <CategoryStoreProvider>"
    );
  }
  const { categoryState, setData } = categoryContext;

  const setCurrentCategory = (newCategory: CategoryType) => {
    setData((prev) => ({ ...prev, currentCategory: newCategory }));
  };

  const toggleActiveCategory = (id: string, active: boolean) => {
    const currentCategoryId = id;
    const isActive = active;

    const newCategory = categoryState.categories.map((category) => {
        const isUpdatedCategory = category.id === currentCategoryId;
        if (isUpdatedCategory) {
            return {...category, active: isActive}
        }
        return category
    })

    setData((prev) => ({ ...prev, categories: newCategory }));
  };

  const revalidateActiveCategories = () => {
    const activeCategories = categoryState.categories.filter((category) => category.active);
    setData((prev) => ({ ...prev, activeCategories: activeCategories }));
  };


  return {
    categoryState,
    setCurrentCategory,
    toggleActiveCategory,
    revalidateActiveCategories
  };
};
