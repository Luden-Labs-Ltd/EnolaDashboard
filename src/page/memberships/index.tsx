"use client";

import Row from "@components/Row";
import { useTranslations } from "next-intl";
import { MembershipTable } from "./ui/MembershipTable";
import { AddMember } from "features/add-membership";

export default function MembershipsPage() {
  const t = useTranslations();

  return (
    <div>
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
