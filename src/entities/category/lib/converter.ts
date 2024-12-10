import { CategoryType, CategoryTypeApi } from "../model";

const DEFAULT_CATEGORIES: CategoryType[] = [
  // {
  //   id: "general",
  //   icon: "MessageIcon",
  //   active: true,
  //   count: 2,
  //   title: "General",
  // },
  // {
  //   id: "medical",
  //   icon: "MedicalIcon",
  //   active: true,
  //   count: 2,
  //   title: "Medical",
  // },
  // {
  //   id: "home",
  //   icon: "HomeIcon",
  //   count: 2,
  //   active: true,
  //   title: "Home",
  // },
  // {
  //   id: "emotional",
  //   icon: "EmotionalIcon",
  //   count: 2,
  //   active: true,
  //   title: "Emotional",
  // },
];

export const convertCategoryData = (
  categoriesData: CategoryTypeApi[]
): CategoryType[] => {
  const mappedCategories = categoriesData.map((category) => {
    return {
      id: String(category.id),
      icon: category.svg_icon,
      active: true,
      title: category.name,
    };
  });

  return [...DEFAULT_CATEGORIES, ...mappedCategories];
};
