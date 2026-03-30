"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@components/Card";
import React, { useEffect, useState } from "react";
import { ActionItem } from "./ui/ActionItem/Action";
import { useLocale, useTranslations } from "next-intl";
import { getRecentActionsByFamilyId, RecentAction } from "entities/recent-actions";

interface LastActionsProps {
  familyId: number | string;
}

export const LastActions: React.FC<LastActionsProps> = ({ familyId }) => {
  const t = useTranslations();
  const locale = useLocale();
  const [actionItems, setActionItems] = useState<RecentAction[] | null>(null);

  useEffect(() => {
    const load = async () => {
      const recentActions = await getRecentActionsByFamilyId(familyId);
      setActionItems(recentActions);
    };

    load();
  }, [familyId]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("Common.lastActions")}</CardTitle>
      </CardHeader>
      <CardContent>
        {actionItems === null ? (
          <div className="text-sm text-[#A3ABC3]">{t("Common.loading")}</div>
        ) : actionItems.length === 0 ? (
          <div className="text-sm text-[#A3ABC3]">{t("LastActions.empty")}</div>
        ) : (
          actionItems.map((action, index) => (
            <ActionItem
              key={`${action.action_key}-${action.created_at}-${index}`}
              date={action.created_at}
              locale={locale}
              message={`${t(`LastActions.sources.${action.actor_source}`)}: ${t(`LastActions.actions.${action.action_key}`)}`}
            />
          ))
        )}
      </CardContent>
    </Card>
  );
};
