import type { CategoryType } from "entities/category";
import type { FamilyTask } from "entities/family-task";
import type { FamilyEventApi } from "entities/family-task";
import { translateCategoryTitle } from "shared/utils/categoryTranslation";

type CategoryLike = Pick<FamilyTask, "category" | "categorySlug" | "categoryName" | "categoryIcon"> & {
  categoryId?: string | null;
};

type EventTaskLike = Pick<FamilyEventApi["task"], "category" | "category_slug" | "category_name" | "category_icon"> & {
  category_id?: string | null;
};

export const buildCategoryMap = (categories: CategoryType[]) =>
  new Map(categories.map((category) => [category.id, category]));

export const getTaskCategoryId = (task?: CategoryLike | null) =>
  task?.categoryId ?? task?.categorySlug ?? null;

export const getEventCategoryId = (task?: EventTaskLike | null) =>
  task?.category_id ?? task?.category_slug ?? null;

export const getCategoryIconKey = (
  categoryId: string | null | undefined,
  categoriesById: Map<string, CategoryType>,
  fallbackIcon?: string | null,
  fallbackSlug?: string | null,
  fallbackCategory?: string | null
) => {
  if (categoryId) {
    const category = categoriesById.get(categoryId);
    if (category?.icon) return category.icon;
  }
  if (fallbackIcon) return fallbackIcon;
  if (fallbackSlug) return fallbackSlug;
  if (fallbackCategory) return fallbackCategory;
  return "general";
};

export const getCategoryLabel = ({
  t,
  categoryId,
  categoriesById,
  fallbackSlug,
  fallbackName,
}: {
  t: Parameters<typeof translateCategoryTitle>[0];
  categoryId: string | null | undefined;
  categoriesById: Map<string, CategoryType>;
  fallbackSlug?: string | null;
  fallbackName?: string | null;
}) => {
  if (categoryId) {
    const category = categoriesById.get(categoryId);
    if (category) {
      return translateCategoryTitle(t, category.id, category.title);
    }
  }
  if (fallbackSlug) {
    return translateCategoryTitle(t, fallbackSlug, fallbackName ?? fallbackSlug);
  }
  return fallbackName ?? "";
};
