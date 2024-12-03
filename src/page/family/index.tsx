import { Card, CardContent, CardHeader, CardTitle } from "@components/Card";
import Row from "@components/Row";
import { Button } from "@components/shadowCDN/button";
import TooltipWrapper from "@components/TooltipWrapper";
import ChartCard from "@widgets/ChartCard";
import { LastActions } from "@widgets/LastActions";
import { Notes } from "@widgets/Notes";
import { Separator } from "components/ui/separator";
import { useFamilyStore } from "entities/families";
import { useTranslations } from "next-intl";
import Link from "next/link";
import React from "react";
import EditIcon from "shared/assets/EditIcon";
import ViewIcon from "shared/assets/ViewIcon";

interface FamilyProps {
  familyId: string;
}

export const Family: React.FC<FamilyProps> = () => {
  const { familyState } = useFamilyStore();
  const { family } = familyState;

  const t = useTranslations()

  const infoBlocks = {
    1: {
      title: "Main caregiver",
      id: family.primaryCaregiver.id,
      titleValue: family.primaryCaregiver.fullName,
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
    2: {
      title: "Main coordinator",
      id: family.coordinator.id,
      titleValue: family.coordinator.fullName,
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
  };

  const supportersDataSet = [
    {
      value: 2,
      label: "family",
      color: "#F7DACB",
    },
    {
      value: 3,
      label: "friends",
      color: "#87BCCC",
    },
    {
      value: 8,
      label: "coworkers",
      color: "#CCCCCC",
    },
  ];

  const tasksDataSet = [
    {
      value: 2,
      label: "family",
      color: "#EFB825",
    },
    {
      value: 3,
      label: "friends",
      color: "#269ACF",
    },
    {
      value: 8,
      label: "coworkers",
      color: "#B4407F",
    },
  ];

  return (
    <div className="flex gap-[24px]">
      <div className="flex-1">
        <Card>
          <CardHeader>
            <CardTitle>{familyState.family.name}</CardTitle>

            <Row alignItems="center">
              <TooltipWrapper text={`${t('Common.view')} ${t('Common.memberships')}`}>
                <Button size={"icon"} variant={"ghost"}>
                  <Link href={`/family/${family.id}/memberships`}>
                    <ViewIcon height={24} width={24} />
                  </Link>
                </Button>
              </TooltipWrapper>

              <TooltipWrapper text={t('Common.edit')}>
                <Button size={"icon"} variant={"ghost"}>
                  <EditIcon />
                </Button>
              </TooltipWrapper>
            </Row>
          </CardHeader>
          <CardContent>
            {Object.values(infoBlocks).map((block, blockIndex, blockArray) => {
              const isLastBlock = blockIndex === blockArray.length - 1;
              return (
                <div key={block.id} className="flex flex-col gap-4">
                  <Row alignItems="center">
                    <h3 className="text-[#313E44] font-[565] text-[20px]">
                      {block.title}
                    </h3>
                    <p className="text-[#313E44] text-[18px]">
                      {block.titleValue}
                    </p>
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
          </CardContent>
        </Card>
      </div>
      <div className="flex flex-col gap-[24px]">
        <div className="flex gap-[24px]">
          <ChartCard dataSet={supportersDataSet} title="Supporters" />
          <ChartCard dataSet={tasksDataSet} title="Tasks" />
        </div>

        <div>
          <LastActions />
        </div>
        <div>
          <Notes />
        </div>
      </div>
    </div>
  );
};
