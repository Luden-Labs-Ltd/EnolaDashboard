export type NavigationItemIconsType =
  | "dashboard"
  | "hand"
  | "resources"
  | "family"
  | "tasks"
  | "heart";

export type NavigationItemType = {
  icon: NavigationItemIconsType;
  translateKey: string;
  disabled: boolean;
  navigateTo: string;
};

export const NAVIGATION_ITEMS: Array<NavigationItemType> = [
  {
    icon: "dashboard",
    translateKey: "dashboard",
    disabled: false,
    navigateTo: "dashboard",
  },
  {
    icon: "hand",
    translateKey: "needs",
    disabled: true,
    navigateTo: "needs",
  },
  {
    icon: "resources",
    translateKey: "resources",
    disabled: true,
    navigateTo: "resources",
  },
  {
    icon: "family",
    translateKey: "families",
    disabled: false,
    navigateTo: "families",
  },
  {
    icon: "tasks",
    translateKey: "tasks",
    disabled: true,
    navigateTo: "tasks",
  },
  {
    icon: "heart",
    translateKey: "supporters",
    disabled: true,
    navigateTo: "supporters",
  },
];
