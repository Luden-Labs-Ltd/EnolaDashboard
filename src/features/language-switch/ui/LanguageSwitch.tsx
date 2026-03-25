"use client";

import { useLocale, useTranslations } from "next-intl";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/shadowCDN/select";
import { changeLanguage } from "entities/language/action";
import { languageOptions } from "../model/config";

interface LanguageSwitchProps {
  className?: string;
  showLabel?: boolean;
}

export function LanguageSwitch(props: LanguageSwitchProps) {
  const locale = useLocale();
  const t = useTranslations();

  function onSelectChange(value: string) {
    const formData = new FormData();
    formData.append("language", value);
    changeLanguage(formData);
  }

  return (
    <div className={props.className}>
      {props.showLabel && (
        <span className="mr-2 text-sm">{t("Common.language")}:</span>
      )}
      <Select
        name="language"
        defaultValue={locale}
        onValueChange={onSelectChange}
      >
        <SelectTrigger className="w-[80px]">
          <SelectValue placeholder={t("Common.language")} />
        </SelectTrigger>
        <SelectContent className="border-0">
          {languageOptions.map((option) => (
            <SelectItem key={option.code} value={option.code}>
              {t(option.labelKey)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

