import {
  BreadcrumbSeparator,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@components/shadowCDN/breadcrumb";
import { Slash } from "lucide-react";
import React from "react";
import styles from "../breadcrumb.module.scss";
import {
  AVAILABLE_PATHS_ALIAS,
  AvailablePathValue,
} from "shared/constants/navbar";
import { useTranslations } from "next-intl";

interface RenderPathsProps {
  paths: AvailablePathValue[];
}
export const RenderPaths: React.FC<RenderPathsProps> = ({ paths }) => {
  const t = useTranslations("Paths");
  return (
    <>
      <BreadcrumbSeparator>
        <Slash className={styles.RouteName} />
      </BreadcrumbSeparator>
      {paths.map((item, index) => {
        const lastPage = paths.length - 1 === index;
        return (
          <React.Fragment key={item.key}>
            <BreadcrumbItem className={styles.RouteName}>
              <BreadcrumbLink href={item.redirectTo}>
                {t(item.key as AVAILABLE_PATHS_ALIAS)}
              </BreadcrumbLink>
            </BreadcrumbItem>
            {!lastPage ? (
              <BreadcrumbSeparator key={`${item.key}-separator`}>
                <Slash />
              </BreadcrumbSeparator>
            ) : null}
          </React.Fragment>
        );
      })}
    </>
  );
};
