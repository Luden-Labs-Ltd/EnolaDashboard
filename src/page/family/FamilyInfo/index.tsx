import Row from "@components/Row";
import { useFamilyStore } from "entities/families";
import { useTranslations } from "next-intl";
import React from "react";
import { Separator } from "components/ui/separator";

interface FamilyInfoProps {}

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

export const FamilyInfo: React.FC<FamilyInfoProps> = () => {
  const { familyState } = useFamilyStore();
  const { family, familyApi } = familyState;

  console.log(familyApi);
  
  const t = useTranslations();

  const personBlocks: PersonInformation[] = [
    {
      title: "Primary caregiver",
      id: family.primaryCaregiver.id,
      titleValue: family.primaryCaregiver.fullName ?? "-",
      isEditable: true,
      infoBlock: [
        {
          label: "Birthdate",
          value: "-",
        },
        {
          label: "City",
          value: "-",
        },
        {
          label: "Phone number",
          value: family.primaryCaregiver.phoneNumber,
        },
        {
          label: "Problem",
          value: "-",
        },
      ],
    },
    {
      title: "Main coordinator",
      id: family.coordinator.id,
      titleValue: family.coordinator.fullName  ?? "-",
      isEditable: false,
      infoBlock: [
        {
          label: "Birthdate",
          value: "-",
        },
        {
          label: "City",
          value: "-",
        },
        {
          label: "Phone number",
          value: family.coordinator.phoneNumber,
        },
        {
          label: "Problem",
          value: "-",
        },
      ],
    },
    {
      title: "Patient",
      id: family.patient.id,
      titleValue: family.patient.fullName ?? family.name,
      isEditable: false,
      infoBlock: [
        {
          label: "Birthdate",
          value: "-",
        },
        {
          label: "City",
          value: "-",
        },
        {
          label: "Phone number",
          value: family.coordinator.phoneNumber,
        },
        {
          label: "Problem",
          value: "-",
        },
      ],
    },
  ];

  return (
    <>
      {personBlocks.map((block, blockIndex, blockArray) => {
        const isLastBlock = blockIndex === blockArray.length - 1;
        return (
          <div key={block.id} className="flex flex-col gap-4">
            <Row alignItems="center">
              <h3 className="text-[#313E44] font-[565] text-[20px]">
                {block.title}
              </h3>
              <p className="text-[#313E44] text-[18px]">{block.titleValue}</p>
            </Row>
            {block.infoBlock.map((info, index) => {
              return (
                <Row key={`${block.id}-${index}`} alignItems="center">
                  <p>{info.label}</p>
                  <p>{info.value}</p>
                </Row>
              );
            })}
            {isLastBlock ? null : <Separator />}
          </div>
        );
      })}
    </>
  );
};
