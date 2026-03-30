export type NavigationItemIconsType =
  | "dashboard"
  | "hand"
  | "resources"
  | "tasks"
  | "family"
  | "tasks"
  | "heart";

export type NavigationItemType = {
  icon: NavigationItemIconsType;
  translateKey: string;
  disabled: boolean;
  isForAdmin: boolean;
  navigateTo: string;
};

export type AVAILABLE_PATHS_ALIAS =
  | "dashboard"
  | "needs"
  | "resources"
  | "tasks"
  | "supporters"
  | "coordinators"
  | "families"
  | "family";

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
  "tasks": {
    key: "tasks",
    keyTo: "/tasks",
    dynamicParamsCount: 0,
  },
  "supporters": {
    key: "supporters",
    keyTo: "/supporters",
    dynamicParamsCount: 0,
  },
  "coordinators": {
    key: "coordinators",
    keyTo: "/coordinators",
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
  }
}

export const NAVIGATION_ITEMS: Array<NavigationItemType> = [
  {
    icon: "dashboard",
    translateKey: "dashboard",
    disabled: false,
    isForAdmin: false,
    navigateTo: "/dashboard",
  },
  {
    icon: "hand",
    translateKey: "needs",
    disabled: false,
    isForAdmin: false,
    navigateTo: "/needs",
  },
  {
    icon: "resources",
    translateKey: "resources",
    disabled: false,
    isForAdmin: false,
    navigateTo: "/resources",
  },
  {
    icon: "family",
    translateKey: "families",
    disabled: false,
    isForAdmin: false,
    navigateTo: "/families",
  },
  {
    icon: "family",
    translateKey: "coordinators",
    disabled: false,
    isForAdmin: true,
    navigateTo: "/coordinators",
  },
];
