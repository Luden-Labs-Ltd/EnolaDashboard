"use client";

import React from "react";
import styles from "@styles/main.layout.module.scss";
import stylesHeader from "./header.module.scss";
import classNames from "classnames";
import { usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@components/shadowCDN/avatar";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/shadowCDN/select";
import { changeLanguage } from "entities/languaage/action";

export default function Header() {
  const t = useTranslations("Header");
  const locale = useLocale()
  const pathname = usePathname();

  const pathItems = pathname.split("/").filter((part) => part !== "");
  const mainRoute = pathItems[0];
  //@ts-ignore
  const currentRouteName = t(mainRoute);

  const onSelectChange = (value: string) => {
    const formData = new FormData();
    formData.append("language", value);
    changeLanguage(formData);
  };

  return (
    <header className={classNames(styles.header, stylesHeader.headerInner)}>
      <span className={stylesHeader.RouteName}>{currentRouteName}</span>

      <div className={stylesHeader.avatarWrapper}>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>

        <div className={stylesHeader.avatarName}>userName</div>

        <Select name="language" defaultValue={locale} onValueChange={onSelectChange}>
          <SelectTrigger className="w-[60px]">
            <SelectValue placeholder="Language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="en">En</SelectItem>
            <SelectItem value="he">He</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </header>
  );
}
