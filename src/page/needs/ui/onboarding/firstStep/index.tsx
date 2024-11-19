import React from "react";
import InfoCard from "@components/InfoCard";
import AddIcon from "shared/assets/AddIcon";
import { Button } from "@components/shadowCDN/button";
import { useTranslations } from "next-intl";

interface FirstStepProps {
  onClick: () => void;
}

const FirstStep: React.FC<FirstStepProps> = ({ onClick }) => {
  const t = useTranslations("NeedsPageOnboarding");
  return (
    <div className="h-full w-full flex justify-center items-center">
      <InfoCard step={1} maxWidth={500}>
        <p>{t("FirstStep.description1")}</p>
        <p>{t("FirstStep.description2")}</p>

        <div className="max-w-80 w-full">
          <Button
            withIcon
            variant="default"
            size="full"
            rounded={"circle"}
            onClick={onClick}
          >
            <AddIcon />
            <span>{t("FirstStep.createTemplate")}</span>
          </Button>
        </div>
      </InfoCard>
    </div>
  );
};
export default FirstStep;
