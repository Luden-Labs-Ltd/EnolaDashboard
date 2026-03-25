import {
  AVAILABLE_PATHS_TYPE,
  AvailablePathValue,
  PathInfo,
} from "shared/constants/navbar";

export const generateLinkedAvailablePaths = (
  routes: string[],
  availablePaths: AVAILABLE_PATHS_TYPE
) => {
  let availablePathsFromPathName: AvailablePathValue[] = [];

  for (let index = 0; index < routes.length; index += 1) {
    let currentPath = routes[index];
    // @ts-ignore
    let currentRoute = availablePaths?.[currentPath] as PathInfo;

    if (currentRoute) {
      const lastPath = availablePathsFromPathName.at(-1);
      let redirectTo = lastPath
        ? lastPath.redirectTo + currentRoute.keyTo
        : currentRoute.keyTo;

      for (
        let paramIndex = 1;
        paramIndex <= currentRoute.dynamicParamsCount;
        paramIndex += 1
      ) {
        const currentParameter = routes[index + paramIndex];
        redirectTo = redirectTo.replace("{{id}}", currentParameter);
      }

      availablePathsFromPathName.push({
        key: currentRoute.key,
        redirectTo: redirectTo,
      });
    }
  }

  return availablePathsFromPathName;
};
