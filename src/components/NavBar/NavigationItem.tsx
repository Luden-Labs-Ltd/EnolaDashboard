"use client";

import Link from "next/link";
import React from "react";
import styles from "./navigation.module.scss";
import classNames from "classnames";
import {
  NavigationItemIconsType,
  NavigationItemType,
} from "shared/constants/navbar";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import Dashboard from "./NavBarIcons/Dashboard";
import Hand from "./NavBarIcons/Hand";
import Heart from "./NavBarIcons/Heart";
import Resources from "./NavBarIcons/Resources";
import Family from "./NavBarIcons/Family";
import Tasks from "./NavBarIcons/Tasks";


interface NavigationItemProps {
  item: NavigationItemType;
}

const NavigationItem: React.FC<NavigationItemProps> = ({ item }) => {
  const t = useTranslations("NavBar");
  const pathname = usePathname();
  const isActive = pathname.includes(item.navigateTo);

  const iconsObject: Record<NavigationItemIconsType, React.ReactNode> = {
    dashboard: <Dashboard />,
    family: <Family />,
    hand: <Hand />,
    heart: <Heart />,
    resources: <Resources />,
    tasks: <Tasks />,
  };

  return (
    <li>
      <Link
        className={classNames(styles.item, {
          [styles.disabled]: item?.disabled,
          [styles.active]: isActive,
        })}
        href={item.navigateTo}
      >
        <div className={styles.itemIcon}>{iconsObject[item.icon]}</div>
        <div className={styles.itemLabel}>{t(item.translateKey)}</div>
      </Link>
    </li>
  );
};

export default NavigationItem;
