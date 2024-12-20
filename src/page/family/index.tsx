import { Card, CardContent, CardHeader, CardTitle } from "@components/Card";
import Row from "@components/Row";
import { Button } from "@components/shadowCDN/button";
import TooltipWrapper from "@components/TooltipWrapper";
import ChartCard from "@widgets/ChartCard";
import { LastActions } from "@widgets/LastActions";
import { Notes } from "@widgets/Notes";
import { useFamilyStore } from "entities/families";
import { useTranslations } from "next-intl";
import Link from "next/link";
import React, { useState } from "react";
import ViewIcon from "shared/assets/ViewIcon";
import { FamilyInfo } from "./FamilyInfo";
import { EditFamily } from "features/edit-family";

interface FamilyProps {
  familyId: string;
}

export const Family: React.FC<FamilyProps> = () => {
  const { familyState } = useFamilyStore();
  const { family } = familyState;

  const t = useTranslations();
  const supportersDataSet = [
    {
      value: family.supportersChart.family,
      label: t("Common.family"),
      color: "#F7DACB",
    },
    {
      value: family.supportersChart.friends,
      label: t("Common.friends"),
      color: "#87BCCC",
    },
    {
      value: family.supportersChart.coworkers,
      label: t("Common.coworkers"),
      color: "#CCCCCC",
    },
  ];

  const tasksDataSet = [
    {
      value: family.tasksChart.completed,
      label: t("Common.completed"),
      color: "#EFB825",
    },
    {
      value: family.tasksChart.inProgress,
      label: t("Common.inProgress"),
      color: "#269ACF",
    },
    {
      value: family.tasksChart.initial,
      label: t("Common.initial"),
      color: "#B4407F",
    },
  ];

  return (
    <div className="flex gap-[24px]">
      <div className="flex-1">
        <Card>
          <CardHeader>
            <CardTitle>{familyState.family.name}</CardTitle>

            <Row alignItems="center">
              <TooltipWrapper
                text={`${t("Common.view")} ${t("Common.memberships")}`}
              >
                <Button size={"icon"} variant={"ghost"}>
                  <Link href={`/family/${family.id}/memberships`}>
                    <ViewIcon height={24} width={24} />
                  </Link>
                </Button>
              </TooltipWrapper>

              <EditFamily />
            </Row>
          </CardHeader>
          <CardContent>
            <FamilyInfo />
          </CardContent>
        </Card>
      </div>
      <div className="flex flex-col gap-[24px]">
        <div className="flex gap-[24px]">
          <ChartCard
            dataSet={supportersDataSet}
            title={t("Common.supporters")}
          />
          <ChartCard dataSet={tasksDataSet} title={t("Common.tasks")} />
        </div>

        <div>
          <LastActions />
        </div>
        <div>
          <Notes />
        </div>
      </div>
    </div>
  );
};
