import { CategoryType, CategoryTypeApi } from "../model";

type ConvertCategoryDataReturnType = {
  categoriesData: CategoryType[];
  maxResourceCount: number;
  maxTaskCount: number;
}

export const convertCategoryData = (
  categoriesData: CategoryTypeApi[]
): ConvertCategoryDataReturnType => {
  let maxResourceCount = 0;
  let maxTaskCount = 0;

  const mappedCategories = categoriesData.map((category) => {
    maxResourceCount = maxResourceCount + category.resource_count
    maxTaskCount = maxTaskCount + category.task_template_count

    return {
      id: category.slug,
      icon: category.svg_icon,
      taskCount: category.task_template_count,
      resourceCount: category.resource_count,
      active: true,
      title: category.name,
    };
  });

  return {
    categoriesData: mappedCategories,
    maxResourceCount,
    maxTaskCount,
  };
};
