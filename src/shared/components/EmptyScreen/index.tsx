import Image from "next/image";
import React from "react";
import familiesSource from "../../../../public/images/emptyScreens/families.png";
import resourcesSource from "../../../../public/images/emptyScreens/resources.png";
import { useTranslations } from "next-intl";

interface EmptyScreenProps {
  screenFor: "resource" | "families" | "supporters";
}

export const EmptyScreen: React.FC<EmptyScreenProps> = ({ screenFor }) => {
  const t = useTranslations();

  const getImageSource = () => {
    switch (screenFor) {
      case "resource":
        return familiesSource;
      case "families":
      case "supporters":
      default:
        return resourcesSource;
    }
  };

  const getEmptyText = () => {
    switch (screenFor) {
      case "resource":
        return t("Empty.resources");
      case "families":
        return t("Empty.families");
      case "supporters":
        return t("Empty.supporters");
      default:
        return t("Empty.default");
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-[10px]">
      <h4 className="text-[#4A709A] text-[20px]">{getEmptyText()}</h4>
      <Image src={getImageSource()} alt="Empty Screen Image" />
    </div>
  );
};
