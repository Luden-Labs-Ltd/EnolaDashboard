import React from "react";
import DashboardCard from "../Card";
import { useTranslations } from "next-intl";

export default function CardList() {
  const t = useTranslations();

  return (
    <div className="flex gap-10 flex-wrap">
      <DashboardCard
        title={t('Common.families')}
        firstValue={100}
        secondValue={32}
        firstColor={"#F7DACB"}
        secondColor={"#87BCCC"}
        firstTitle={t('Common.active')}
        secondTitle={t('Common.inactive')}
      />
      <DashboardCard
        title={t('Common.tasks')}
        firstValue={23}
        secondValue={108}
        firstColor={"#EEA884"}
        secondColor={"#8671A2"}
        firstTitle={t('Common.opened')}
        secondTitle={t('Common.closed')}
      />
      <DashboardCard
        title={t('Common.supporters')}
        firstValue={100}
        secondValue={32}
        firstColor={"#DCE5FF"}
        secondColor={"#B4407F"}
        firstTitle={t('Common.active')}
        secondTitle={t('Common.inactive')}
      />
    </div>
  );
}
