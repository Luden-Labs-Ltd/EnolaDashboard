import { Card, CardContent, CardHeader, CardTitle } from "@components/Card";
import React from "react";
import { ActionItem } from "./ui/ActionItem/Action";
import { useTranslations } from "next-intl";

export const LastActions = () => {
  const t = useTranslations();

  const actionItems = [
    {
      id: 1,
      date: Date.UTC(2000, 8, 12, 14, 0, 0, 0),
      message: "adding, taking, or completing a task",
    },
    {
      id: 2,
      date: Date.UTC(2001, 9, 30, 13, 0, 0, 0),
      message: "adding, taking, or completing a task",
    },
    {
      id: 3,
      date: Date.UTC(2000, 10, 13, 19, 0, 0, 0),
      message: "adding, taking, or completing a task",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("Common.lastActions")}</CardTitle>
      </CardHeader>
      <CardContent>
        {actionItems.map((action) => (
          <ActionItem
            key={action.id}
            date={action.date}
            message={action.message}
          />
        ))}
      </CardContent>
    </Card>
  );
};
