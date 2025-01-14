import { useFamilyStore } from "entities/families";
import { useTranslations } from "next-intl";
import React from "react";
import { ChangeableFieldItem } from "./ChangebleField";
import { RenderEditableInfo } from "./RenderEditableInfo";
import { RenderInfo } from "./RenderInfo";

interface FamilyInfoProps {
  isEditable: boolean;
  setIsEditable: (editable: boolean) => void;
}

export interface PersonInformation {
  title: string;
  id: number;
  isEditable: boolean;
  titleValue: string;
  infoBlock: InfoBlock[];
}

interface InfoBlock {
  label: string;
  value: string;
}

export const EditableFamilyInfo: React.FC<FamilyInfoProps> = ({
  isEditable,
  setIsEditable,
}) => {
  const { familyState } = useFamilyStore();
  const { family } = familyState;
  const t = useTranslations();

  const renderInfoItems: ChangeableFieldItem[] = [
    {
      type: "header",
      name: "familyName",
      label: t("Common.familyName"),
      value: family.name,
    },
    {
      type: "header",
      name: "patient_name",
      label: t("Common.patient"),
      value: `${family.firstName} ${family.lastName ?? ""}`,
    },
    {
      type: "info",
      name: "patient_city",
      label: t("Common.city"),
      value: family.patient.city ?? "-",
    },
    {
      type: "info",
      name: "patient_problem",
      label: t("Common.problem"),
      value: family.reason ?? "-",
    },
    {
      type: "info",
      name: "patient_phone_number",
      label: t("Common.phoneNumber"),
      value: family.patient.phoneNumber ?? "-",
      bottomSeparator: true,
    },
    {
      type: "header",
      name: "caregiver_name",
      label: t("Common.primaryCaregiver"),
      value: family.primaryCaregiver.fullName ?? "-",
      bottomSeparator: true,
    },
    {
      type: "info",
      name: "caregiver_relationship",
      label: t("Common.relationship"),
      value: family.primaryCaregiver.circle ?? "-",
    },
    {
      type: "info",
      name: "caregiver_city",
      label: t("Common.city"),
      value: family.primaryCaregiver.city ?? "-",
    },
    {
      type: "info",
      name: "caregiver_phone_number",
      label: t("Common.phoneNumber"),
      value: family.primaryCaregiver.phoneNumber ?? "-",
    },
  ];

  return (
    <>
      <div className="flex flex-col gap-4 ">
        {isEditable ? (
          <RenderEditableInfo
            onCloseHandler={() => {
              setIsEditable(false);
            }}
          />
        ) : (
          <RenderInfo renderItems={renderInfoItems} />
        )}
      </div>
    </>
  );
};
