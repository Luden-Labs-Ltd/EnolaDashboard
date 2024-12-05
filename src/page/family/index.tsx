import { Card, CardContent, CardHeader, CardTitle } from "@components/Card";
import Row from "@components/Row";
import { Button } from "@components/shadowCDN/button";
import TooltipWrapper from "@components/TooltipWrapper";
import ChartCard from "@widgets/ChartCard";
import { LastActions } from "@widgets/LastActions";
import { Notes } from "@widgets/Notes";
import { useFamilyStore } from "entities/families";
import { BackButton } from "features/back-button";
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
      value: 2,
      label: "family",
      color: "#F7DACB",
    },
    {
      value: 3,
      label: "friends",
      color: "#87BCCC",
    },
    {
      value: 8,
      label: "coworkers",
      color: "#CCCCCC",
    },
  ];

  const tasksDataSet = [
    {
      value: 2,
      label: "family",
      color: "#EFB825",
    },
    {
      value: 3,
      label: "friends",
      color: "#269ACF",
    },
    {
      value: 8,
      label: "coworkers",
      color: "#B4407F",
    },
  ];

  return (
    <div className="flex gap-[24px]">
      <div className="flex-1">
        <BackButton className="my-4" />
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
          <ChartCard dataSet={supportersDataSet} title="Supporters" />
          <ChartCard dataSet={tasksDataSet} title="Tasks" />
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
