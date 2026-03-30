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
import { CategoryType, convertCategoryData, getCategoriesApi } from "entities/category";
import {
  convertDataForTable,
  getMembershipsFromApi,
  MembershipApi,
  MembershipStoreProvider,
} from "entities/memberships";
import { useFamilyStore } from "entities/families";
import { FamilyTaskList, AddTaskDialog, MultiAddTasksDialog } from "features/family-tasks";
import { AddMember } from "features/add-membership";
import { useLocale, useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import EditIcon from "shared/assets/EditIcon";
import { EditableFamilyInfo } from "features/editable-family-info";
import { MembershipTable } from "page/memberships/ui/MembershipTable";

interface FamilyProps {
  familyId: string;
}

export const Family: React.FC<FamilyProps> = () => {
  const { familyState } = useFamilyStore();
  const { family } = familyState;
  const [isEditable, setIsEditable] = useState(false);
  const [taskRefreshKey, setTaskRefreshKey] = useState(0);
  const [memberships, setMemberships] = useState<MembershipApi[] | null>(null);
  const [categories, setCategories] = useState<CategoryType[]>([]);

  useEffect(() => {
    const load = async () => {
      const [membershipsData, categoriesApi] = await Promise.all([
        getMembershipsFromApi(family.id),
        getCategoriesApi(),
      ]);

      if (membershipsData) setMemberships(membershipsData);
      setCategories(convertCategoryData(categoriesApi).categoriesData);
    };
    load();
  }, [family.id]);

  const t = useTranslations();
  const locale = useLocale();
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
    <Tabs defaultValue="overview" dir={locale === "he" ? "rtl" : "ltr"}>
      <h1 className="mb-5 text-2xl font-semibold text-[#313A56]">
        {family?.name ?? t("Common.family")}
      </h1>
      <TabsList className="mb-5 h-11 gap-1 rounded-xl bg-[#F5F8FF] p-1.5 justify-start">
        <TabsTrigger
          value="overview"
          className="rounded-lg px-5 py-2 text-sm font-semibold text-[#A3ABC3] data-[state=active]:bg-white data-[state=active]:text-[#313A56] data-[state=active]:shadow-sm"
        >
          {t("FamilyTasks.info")}
        </TabsTrigger>
        <TabsTrigger
          value="tasks"
          className="rounded-lg px-5 py-2 text-sm font-semibold text-[#A3ABC3] data-[state=active]:bg-white data-[state=active]:text-[#313A56] data-[state=active]:shadow-sm"
        >
          {t("FamilyTasks.tasks")}
        </TabsTrigger>
        <TabsTrigger
          value="members"
          className="rounded-lg px-5 py-2 text-sm font-semibold text-[#A3ABC3] data-[state=active]:bg-white data-[state=active]:text-[#313A56] data-[state=active]:shadow-sm"
        >
          {t("FamilyTasks.members")}
        </TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="mt-0">
        <div className="flex gap-[24px]">
          <div className="min-w-0 flex-1">
            <Card>
              <CardHeader>
                <CardTitle>{family?.name ?? t("Common.family")}</CardTitle>

                <Row alignItems="center">
                  <TooltipWrapper text={t("Common.edit")}>
                    <Button onClick={() => {setIsEditable((prev)=> !prev)}} size={"icon"} variant={"ghost"}>
                      <EditIcon color={isEditable ? "#269ACF" : "#313E44"} />
                    </Button>
                  </TooltipWrapper>
                </Row>
              </CardHeader>
              <CardContent>
                <EditableFamilyInfo isEditable={isEditable} setIsEditable={setIsEditable} />
              </CardContent>
            </Card>
          </div>
          <div className="flex min-w-0 max-w-[420px] flex-1 flex-col gap-[24px]">
            <div className="flex gap-[24px] [&>*]:min-w-0 [&>*]:flex-1">
              <ChartCard
                dataSet={supportersDataSet}
                title={t("Common.supporters")}
              />
              <ChartCard dataSet={tasksDataSet} title={t("Common.tasks")} />
            </div>

            <div>
              <LastActions familyId={family.id} />
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
            <div className="flex flex-wrap gap-2 rtl:flex-row-reverse">
              <AddTaskDialog
                familyId={family.id}
                categories={categories}
                onCreated={() => setTaskRefreshKey((k) => k + 1)}
              />
              <MultiAddTasksDialog
                familyId={family.id}
                categories={categories}
                onCreated={() => setTaskRefreshKey((k) => k + 1)}
              />
            </div>
          </CardHeader>
          <CardContent>
            <FamilyTaskList key={taskRefreshKey} familyId={family.id} categories={categories} />
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="members" className="mt-0">
        {memberships === null ? (
          <Card>
            <CardContent className="pt-6">
              <div className="py-8 text-center text-muted-foreground">
                {t("Common.loading")}
              </div>
            </CardContent>
          </Card>
        ) : (
          <MembershipStoreProvider memberships={convertDataForTable(memberships)}>
            <Card>
              <CardHeader>
                <CardTitle>{t("Common.memberships")}</CardTitle>
                <AddMember />
              </CardHeader>
              <CardContent className="pt-6">
                <MembershipTable />
              </CardContent>
            </Card>
          </MembershipStoreProvider>
        )}
      </TabsContent>
    </Tabs>
  );
};
