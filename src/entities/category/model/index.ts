export type CategoryType = {
  id: string;
  icon: CategoryIconType;
  active?: boolean;
  count?: number;
  title: string;
};


export type CategoryTypeApi = {
  id: number;
  name: string;
  svg_icon: CategoryIconType;
};


export type CategoryIconType = "general" | "medical" | "home" | "emotional" | "childcare" | "legal_rights"