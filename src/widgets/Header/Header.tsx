"use client";

import React from "react";
import styles from "@styles/main.layout.module.scss";
import stylesHeader from "./header.module.scss";
import classNames from "classnames";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { Avatar, AvatarFallback, AvatarImage } from "@components/shadowCDN/avatar";

export default function Header() {
  const t = useTranslations("NavBar")
  const pathname = usePathname();
  const currentPath = pathname.replace("/", "");
  const currentRouteName = t(currentPath)

  return (
    <header className={classNames(styles.header, stylesHeader.headerInner)}>
      <span className={stylesHeader.RouteName}>{currentRouteName}</span>

      <div className={stylesHeader.avatarWrapper}>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>

        <div className={stylesHeader.avatarName}>userName</div>
      </div>
    </header>
  );
}
