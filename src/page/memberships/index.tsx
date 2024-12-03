"use client";

import Row from "@components/Row";
import { Button } from "@components/shadowCDN/button";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { MembershipTable } from "./ui/MembershipTable";
import { AddMember } from "features/add-membership";

export default function MembershipsPage() {
  const router = useRouter();
  const t = useTranslations();

  return (
    <div>
      <Button
        variant={"ghost"}
        onClick={() => {
          router.back();
        }}
      >
        <Row alignItems="center" className="gap-[10px]">
          <ArrowLeftIcon />
          Go back
        </Row>
      </Button>
      <div className="mt-8 flex flex-col flex-1 gap-[20px]">
        <Row alignItems="center" className="justify-between">
          <h3 className="font-bold text-[20px]">{t("Common.memberships")}</h3>

          <AddMember/>
        </Row>
        <MembershipTable />
      </div>
    </div>
  );
}
