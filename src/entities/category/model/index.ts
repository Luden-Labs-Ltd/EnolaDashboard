export type CategoryType = {
  id: string;
  icon: CategoryIconType;
  active?: boolean;
  taskCount: number;
  resourceCount: number;
  title: string;
};

export type CategoryTypeApi = {
  id: number;
  slug: string;
  name: string;
  resource_count: number;
  task_template_count: number;
  svg_icon: CategoryIconType;
};

export type CategoryIconType =
  | "general"
  | "medical"
  | "home"
  | "emotional"
  | "childcare"
  | "legal";

export const DefaultCategoryIconTypesArray: CategoryIconType[] = [
  "childcare",
  "emotional",
  "general",
  "home",
  "legal",
  "medical",
];
