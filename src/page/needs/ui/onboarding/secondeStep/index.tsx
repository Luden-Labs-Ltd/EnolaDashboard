import React from "react";
import InfoCard from "@components/InfoCard";
import AddIcon from "shared/assets/AddIcon";
import { Button } from "@components/shadowCDN/button";
import {
  Categories,
  HeaderPanel,
  NeedsContent,
  TableLayout,
} from "@components/table-layout";
import { useTranslations } from "next-intl";

interface SecondeStepProps {
  onClick: () => void;
}

const SecondeStep: React.FC<SecondeStepProps> = ({ onClick }) => {
  const t = useTranslations();
  return (
    <TableLayout>
      <Categories></Categories>
      <NeedsContent>
        <HeaderPanel>
          <h3>{t("Common.tasks")}</h3>
        </HeaderPanel>
        <div className="p-8 flex flex-col gap-8">
          <InfoCard step={2} maxWidth={500}>
            <p>{t("NeedsPageOnboarding.SecondStep.infoCard1.paragraph1")}</p>
            <p>{t("NeedsPageOnboarding.SecondStep.infoCard1.paragraph2")}</p>

            <div className="w-full flex gap-4 items-center">
              <p>
                <b className="dark">
                  {t("NeedsPageOnboarding.SecondStep.infoCard1.buttonPrompt")}
                </b>
              </p>
              <Button withIcon onClick={onClick} variant="secondary">
                <AddIcon />
                <span className="font-grotesk">{t("Common.addCategory")}</span>
              </Button>
            </div>
          </InfoCard>
          <InfoCard step={3} maxWidth={500}>
          <p>{t("NeedsPageOnboarding.SecondStep.infoCard2.paragraph1")}</p>
          <p>{t("NeedsPageOnboarding.SecondStep.infoCard2.paragraph2")}</p>

            <div className="w-full flex gap-4 items-center">
              <p>
                <b className="dark">
                  {t("NeedsPageOnboarding.SecondStep.infoCard2.buttonPrompt")}
                </b>
              </p>
              <Button withIcon onClick={onClick} variant="secondary">
                <AddIcon />
                <span className="font-grotesk">{t("Common.addTask")}</span>
              </Button>
            </div>
          </InfoCard>
        </div>
      </NeedsContent>
    </TableLayout>
  );
};
export default SecondeStep;
