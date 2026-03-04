import { Card, CardContent, CardHeader, CardTitle } from "@components/Card";
import Row from "@components/Row";
import { Button } from "@components/shadowCDN/button";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@components/shadowCDN/tabs";
import TooltipWrapper from "@components/TooltipWrapper";
import ChartCard from "@widgets/ChartCard";
import { LastActions } from "@widgets/LastActions";
import { Notes } from "@widgets/Notes";
import { useFamilyStore } from "entities/families";
import { FamilyTaskList } from "features/family-tasks";
import { useTranslations } from "next-intl";
import Link from "next/link";
import React, { useState } from "react";
import EditIcon from "shared/assets/EditIcon";
import { EditableFamilyInfo } from "features/editable-family-info";

interface FamilyProps {
  familyId: string;
}

export const Family: React.FC<FamilyProps> = () => {
  const { familyState } = useFamilyStore();
  const { family } = familyState;
  const [isEditable, setIsEditable] = useState(false);

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
    <Tabs defaultValue="overview">
      <TabsList className="mb-4">
        <TabsTrigger value="overview">
          {t("FamilyTasks.info")}
        </TabsTrigger>
        <TabsTrigger value="tasks">
          {t("FamilyTasks.tasks")}
        </TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="mt-0">
        <div className="flex gap-[24px]">
          <div className="flex-1">
            <Card>
              <CardHeader>
                <CardTitle>Family</CardTitle>

                <Row alignItems="center">
                  <TooltipWrapper text={t("Common.edit")}>
                    <Button onClick={() => {setIsEditable((prev)=> !prev)}} size={"icon"} variant={"ghost"}>
                      <EditIcon color={isEditable ? "#269ACF" : "#313E44"} />
                    </Button>
                  </TooltipWrapper>

                  <TooltipWrapper
                    text={`${t("Common.view")} ${t("Common.memberships")}`}
                  >
                    <Button variant={"secondary"}>
                      <Link href={`/family/${family.id}/memberships`}>
                        {t("Families.viewMembers")}
                      </Link>
                    </Button>
                  </TooltipWrapper>
                </Row>
              </CardHeader>
              <CardContent>
                <EditableFamilyInfo isEditable={isEditable} setIsEditable={setIsEditable} />
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
              <Notes familyId={family.id} />
            </div>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="tasks" className="mt-0">
        <Card>
          <CardHeader>
            <CardTitle>{t("Common.tasks")}</CardTitle>
          </CardHeader>
          <CardContent>
            <FamilyTaskList familyId={family.id} />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};
