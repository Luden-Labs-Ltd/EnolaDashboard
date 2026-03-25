"use client";

import Row from "@components/Row";
import { Switch } from "@components/shadowCDN/switch";
import TooltipWrapper from "@components/TooltipWrapper";
import { createQueryString } from "@lib/url";
import { useTranslations } from "next-intl";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import CheckIcon from "shared/assets/CheckIcon";

export const ShowMyFamily = () => {
  const t = useTranslations();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const is_my_families = searchParams.get("is_my_families") ?? "true"
  const isMyFamilies = is_my_families === "true"
  const [showMyFamily, setShowMyFamily] = useState(isMyFamilies)

  const showMyFamilyFilter = (showMyFamily: boolean) => {
    router.push(
      pathname +
        "?" +
        createQueryString("is_my_families", String(showMyFamily), searchParams)
    );
  };

  const changeFilter = () => {
    const newFilter = !showMyFamily
    showMyFamilyFilter(newFilter)
    setShowMyFamily(newFilter)
  }
  
  return (
    <TooltipWrapper text={t('Common.showMyFamilyDescription')}>
      <Row alignItems="center">
        <span>{t('Common.showMyFamily')}</span>
        <Switch
          onCheckedChange={changeFilter}
          checked={showMyFamily}
          disabled={false}
          variant={"secondary"}
          icon={<CheckIcon />}
        />
      </Row>
    </TooltipWrapper>
  );
};

ShowMyFamily.displayName = "ShowMyFamily";
