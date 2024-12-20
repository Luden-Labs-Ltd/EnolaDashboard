import {
  BreadcrumbSeparator,
  BreadcrumbItem,
} from "@components/shadowCDN/breadcrumb";
import { Slash } from "lucide-react";
import React from "react";
import styles from "../breadcrumb.module.scss"

type AvailablePathValue = {
  key: string;
  value: string;
};

interface RenderPathsProps {
  paths: AvailablePathValue[];
}
export const RenderPaths: React.FC<RenderPathsProps> = ({ paths }) => {
  return (
    <>
      <BreadcrumbSeparator>
        <Slash className={styles.RouteName} />
      </BreadcrumbSeparator>
      {paths.map((item, index) => {
        const lastPage = paths.length - 1 === index;
        return (
          <>
            <BreadcrumbItem className={styles.RouteName} key={item.key}>
              {item.value}
            </BreadcrumbItem>
            {!lastPage ? (
              <BreadcrumbSeparator key={`${item.key}-separator`}>
                <Slash />
              </BreadcrumbSeparator>
            ) : null}
          </>
        );
      })}
    </>
  );
};
