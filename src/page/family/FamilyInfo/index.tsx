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
  const { family } = familyState;

  const t = useTranslations();

  const personBlocks: PersonInformation[] = [
    {
      title: t('Common.familyInfo'),
      id: family.id,
      titleValue: "",
      isEditable: false,
      infoBlock: [
        {
          label: t('Common.taskCount'),
          value: String(family.taskCount),
        },
        {
          label: t('Common.eventCount'),
          value: String(family.eventCount),
        },
        {
          label: t('Common.membershipCount'),
          value: String(family.membershipCount),
        },
        {
          label: t('Common.isArchived'),
          value: String(family.isArchived),
        },
        {
          label: t('Common.firstName'),
          value: family.firstName ?? "-",
        },
        {
          label: t('Common.lastName'),
          value: family.lastName ?? "-",
        },
      ],
    },
    {
      title: t('Common.primaryCaregiver'),
      id: family.primaryCaregiver.id,
      titleValue: family.primaryCaregiver.fullName ?? "-",
      isEditable: true,
      infoBlock: [
        {
          label: t('Common.birthdate'),
          value: "-",
        },
        {
          label: t('Common.city'),
          value: "-",
        },
        {
          label: t('Common.phoneNumber'),
          value: family.primaryCaregiver.phoneNumber,
        },
        {
          label: t('Common.problem'),
          value: "-",
        },
      ],
    },
    {
      title: t('Common.mainCoordinator'),
      id: family.coordinator.id,
      titleValue: family.coordinator.fullName  ?? "-",
      isEditable: false,
      infoBlock: [
        {
          label: t('Common.birthdate'),
          value: "-",
        },
        {
          label: t('Common.city'),
          value: "-",
        },
        {
          label: t('Common.phoneNumber'),
          value: family.coordinator.phoneNumber,
        },
        {
          label: t('Common.problem'),
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
