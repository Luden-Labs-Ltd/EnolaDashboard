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
    navigateTo: "/dashboard",
  },
  {
    icon: "hand",
    translateKey: "needs",
    disabled: false,
    navigateTo: "/needs",
  },
  {
    icon: "resources",
    translateKey: "resources",
    disabled: false,
    navigateTo: "/resources",
  },
  {
    icon: "family",
    translateKey: "families",
    disabled: false,
    navigateTo: "/families",
  },
  {
    icon: "heart",
    translateKey: "supporters",
    disabled: true,
    navigateTo: "/supporters",
  },
];
