import { BreadcrumbLink } from "@components/shadowCDN/breadcrumb";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@components/shadowCDN/dropdown-menu";
import { ChevronDown } from "lucide-react";
import React from "react";
import { NAVIGATION_ITEMS } from "shared/constants/navbar";
import styles from "../breadcrumb.module.scss"

interface HomeMenuProps {
    firstPathKey: string
    isFirstPathRoot: boolean;
}
export const HomeMenu: React.FC<HomeMenuProps> = ({isFirstPathRoot, firstPathKey}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={`flex items-center gap-1 ${styles.RouteName}`}
      >
        {isFirstPathRoot ? firstPathKey : "Home"}
        <ChevronDown className="h-4 w-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        {NAVIGATION_ITEMS.map((item) => {
          if (item.disabled) {
            return null;
          }
          const active = item.translateKey === firstPathKey;
          const activeClass = active ? "underline" : "";

          return (
            <DropdownMenuItem
              key={item.translateKey}
              className={`${activeClass}`}
            >
              <BreadcrumbLink href={item.navigateTo}>
                {item.translateKey}
              </BreadcrumbLink>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
