"use client";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@components/shadowCDN/select";
import SingInPage from "page/singin";
import { useLocale, useTranslations } from "next-intl";
import { changeLanguage } from "entities/language/action";
import { Label } from "@components/shadowCDN/label";

export default function SignInPage() {
  const locale = useLocale();
  const t = useTranslations("Auth");
  const onSelectChange = (value: string) => {
    const formData = new FormData();
    formData.append("language", value);
    changeLanguage(formData);
  };

  return (
    <main className="gap-5 flex flex-col items-center w-full max-w-[500px]">
      <div className="flex flex-row items-center justify-start w-full gap-4">
        <Label>{t("language")}</Label>
        <Select
          name="language"
          defaultValue={locale}
          onValueChange={onSelectChange}
        >
          <SelectTrigger className="w-[60px]">
            <SelectValue placeholder="Language" />
          </SelectTrigger>
          <SelectContent className="border-0">
            <SelectItem value="en">En</SelectItem>
            <SelectItem value="he">He</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <SingInPage />
    </main>
  );
}
