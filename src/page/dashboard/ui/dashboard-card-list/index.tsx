import React from "react";
import DashboardCard from "../Card";
import { useTranslations } from "next-intl";
import { useAnalyticsStore } from "entities/analitycs";

export default function CardList() {
  const t = useTranslations();
  const { analyticsState } = useAnalyticsStore();

  // Get data from the new structure
  const familiesData = analyticsState.analyticsData?.families
    ? {
      active: analyticsState.analyticsData.families.active,
      inactive: analyticsState.analyticsData.families.inactive
    }
    : { active: 0, inactive: 0 };

  const tasksData = analyticsState.analyticsData?.tasks
    ? {
      opened: analyticsState.analyticsData.tasks.opened,
      closed: analyticsState.analyticsData.tasks.closed
    }
    : { opened: 0, closed: 0 };

  const supportersData = analyticsState.analyticsData?.supporters
    ? {
      active: analyticsState.analyticsData.supporters.active,
      inactive: analyticsState.analyticsData.supporters.inactive
    }
    : { active: 0, inactive: 0 };

  return (
    <div className="flex gap-10 flex-wrap">
      <DashboardCard
        title={t('Common.families')}
        firstValue={familiesData.active}
        secondValue={familiesData.inactive}
        firstColor={"#F7DACB"}
        secondColor={"#87BCCC"}
        firstTitle={t('Common.active')}
        secondTitle={t('Common.inactive')}
      />
      <DashboardCard
        title={t('Common.tasks')}
        firstValue={tasksData.opened}
        secondValue={tasksData.closed}
        firstColor={"#EEA884"}
        secondColor={"#8671A2"}
        firstTitle={t('Common.opened')}
        secondTitle={t('Common.closed')}
      />
      <DashboardCard
        title={t('Common.supporters')}
        firstValue={supportersData.active}
        secondValue={supportersData.inactive}
        firstColor={"#DCE5FF"}
        secondColor={"#B4407F"}
        firstTitle={t('Common.active')}
        secondTitle={t('Common.inactive')}
      />
    </div>
  );
}
