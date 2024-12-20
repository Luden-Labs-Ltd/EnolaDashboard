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

export type AVAILABLE_PATHS_ALIAS =
  | "dashboard"
  | "needs"
  | "resources"
  | "supporters"
  | "families"
  | "family"
  | "memberships";

export type PathInfo = {
  dynamicParamsCount: number,
  key: string,
  keyTo: string,
  searchParams?: any,
}

export type AvailablePathValue = {
  key: string;
  redirectTo: string;
};

export type AVAILABLE_PATHS_TYPE = Record<AVAILABLE_PATHS_ALIAS, PathInfo>;

export const AVAILABLE_PATHS: AVAILABLE_PATHS_TYPE = {
  "dashboard": {
    key: "dashboard",
    keyTo: "/dashboard",
    dynamicParamsCount: 0,
  },
  "needs": {
    key: "needs",
    keyTo: "/needs",
    dynamicParamsCount: 0,
  },
  "resources": {
    key: "resources",
    keyTo: "/resources",
    dynamicParamsCount: 0,
  },
  "supporters": {
    key: "supporters",
    keyTo: "/supporters",
    dynamicParamsCount: 0,
  },
  "families": {
    key: "families",
    keyTo: "/families",
    dynamicParamsCount: 0,
  },
  "family": {
    key: "family",
    keyTo: "/family/{{id}}",
    dynamicParamsCount: 1,
  },
  "memberships": {
    key: "memberships",
    keyTo: "/memberships",
    dynamicParamsCount: 0,
  }
}

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
