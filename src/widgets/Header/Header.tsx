"use client";

import React from "react";
import styles from "@styles/main.layout.module.scss";
import stylesHeader from "./header.module.scss";
import classNames from "classnames";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@components/shadowCDN/avatar";
import { BreadcrumbBar } from "./Breadcrumb";
import { LanguageSwitch } from "features/language-switch";

interface HeaderProps {
  userName: string;
}
export default function Header(props: HeaderProps) {
  return (
    <header className={classNames(styles.header, stylesHeader.headerInner)}>
      <BreadcrumbBar />
      <div className={stylesHeader.avatarWrapper}>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>

        <div className={stylesHeader.avatarName}>{props.userName}</div>

        <LanguageSwitch />
      </div>
    </header>
  );
}
