"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
} from "@components/shadowCDN/breadcrumb";
import React from "react";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import {
  AVAILABLE_PATHS,
  NAVIGATION_ITEMS,
} from "shared/constants/navbar";
// import { BackButton } from "features/back-button";
import styles from "./breadcrumb.module.scss";
import { RenderPaths } from "./RenderPaths";
import { HomeMenu } from "./HomeMenu";
import { generateLinkedAvailablePaths } from "./lib";

export const BreadcrumbBar = () => {
  const t = useTranslations("Paths");
  const pathname = usePathname();
  const rootRoutes = NAVIGATION_ITEMS.map((item) => item.translateKey);

  let routes = pathname.split("/");
  let availablePathsFromPathName = generateLinkedAvailablePaths(
    routes,
    AVAILABLE_PATHS
  );

  const firstPathKey = availablePathsFromPathName[0].key;
  const isFirstPathRoot = rootRoutes.includes(firstPathKey);
  const severalPaths = availablePathsFromPathName.length > 1;
  const isRenderAvailablePaths = !isFirstPathRoot || severalPaths;

  const isHomeMenuEnabled = severalPaths || !isFirstPathRoot;
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {/* {isRenderAvailablePaths ? <BackButton /> : null} */}
        {isHomeMenuEnabled ? (
          <BreadcrumbItem>
            <HomeMenu
              isFirstPathRoot={isFirstPathRoot}
              firstPathKey={firstPathKey}
            />
          </BreadcrumbItem>
        ) : (
          <BreadcrumbItem className={styles.RouteName}>
            {/*@ts-ignore */}
            {t(firstPathKey)}
          </BreadcrumbItem>
        )}

        {isRenderAvailablePaths ? (
          <RenderPaths paths={availablePathsFromPathName} />
        ) : null}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
