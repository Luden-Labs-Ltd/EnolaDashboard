import { BreadcrumbLink } from "@components/shadowCDN/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@components/shadowCDN/dropdown-menu";
import { ChevronDown } from "lucide-react";
import React from "react";
import { AVAILABLE_PATHS_ALIAS, NAVIGATION_ITEMS } from "shared/constants/navbar";
import styles from "../breadcrumb.module.scss";
import { useTranslations } from "next-intl";

interface HomeMenuProps {
  firstPathKey: string;
  isFirstPathRoot: boolean;
}
export const HomeMenu: React.FC<HomeMenuProps> = ({
  isFirstPathRoot,
  firstPathKey,
}) => {
  const t = useTranslations("Paths");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={`flex items-center gap-1 ${styles.RouteName}`}
      >
        {isFirstPathRoot ? firstPathKey : t("home")}
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
                {t(item.translateKey as AVAILABLE_PATHS_ALIAS)}
              </BreadcrumbLink>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
