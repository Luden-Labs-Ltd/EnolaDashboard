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
  AVAILABLE_PATHS_ALIAS,
  NAVIGATION_ITEMS,
} from "shared/constants/navbar";
import { BackButton } from "features/back-button";
import styles from "./breadcrumb.module.scss";
import { RenderPaths } from "./RenderPaths";
import { HomeMenu } from "./HomeMenu";

type AvailablePathValue = {
  key: string;
  value: string;
};
export const BreadcrumbBar = () => {
  const t = useTranslations("Paths");
  const pathname = usePathname();
  const rootRoutes = NAVIGATION_ITEMS.map((item) => item.translateKey);

  const availablePathsFromPathName = pathname
    .split("/")
    .reduce<AvailablePathValue[]>((acc, path) => {
      // @ts-ignore
      const isAvailablePath = AVAILABLE_PATHS.includes(path);
      if (isAvailablePath) {
        const currentKey = path as AVAILABLE_PATHS_ALIAS;
        acc.push({
          key: path,
          value: t(currentKey),
        });
      }
      return acc;
    }, []);

  const firstPathKey = availablePathsFromPathName[0].key;
  const isFirstPathRoot = rootRoutes.includes(firstPathKey);
  const severalPaths = availablePathsFromPathName.length > 1;
  const isRenderAvailablePaths = !isFirstPathRoot || severalPaths;

  const isHomeMenuEnabled = severalPaths || !isFirstPathRoot;
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {isRenderAvailablePaths ? <BackButton /> : null}

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
