import React from "react";
import DashboardCard from "../Card";
import { useTranslations } from "next-intl";
import { useAnalyticsStore } from "entities/analitycs";

export default function CardList() {
  const t = useTranslations();
  const { analyticsState } = useAnalyticsStore();

  // Get the latest data from analytics (last date in the record)
  const getLatestData = (data: Record<string, any> | null | undefined) => {
    if (!data || typeof data !== 'object') {
      return { active: 0, inactive: 0, opened: 0, closed: 0 };
    }

    const dates = Object.keys(data).sort();
    return dates.length > 0 ? data[dates[dates.length - 1]] : { active: 0, inactive: 0, opened: 0, closed: 0 };
  };

  const familiesData = analyticsState.analyticsData ? getLatestData(analyticsState.analyticsData.families) : { active: 0, inactive: 0 };
  const tasksData = analyticsState.analyticsData ? getLatestData(analyticsState.analyticsData.tasks) : { opened: 0, closed: 0 };
  const supportersData = analyticsState.analyticsData ? getLatestData(analyticsState.analyticsData.supporters) : { active: 0, inactive: 0 };

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
