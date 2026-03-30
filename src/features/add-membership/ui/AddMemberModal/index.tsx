"use client";

import { Button } from "@components/shadowCDN/button";
import {
  Dialog,
  DialogTrigger,
} from "@components/shadowCDN/dialog";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import AddIcon from "shared/assets/AddIcon";
import { AddMemberForm } from "../AddMemberForm";
import { useMembershipsStore } from "entities/memberships";
import { useParams } from "next/navigation";
import { MembershipDialogContent } from "features/membership-form/ui/MembershipDialogContent";

interface AddMemberModalActionProps {}

const AddMemberModal: React.FC<AddMemberModalActionProps> = ({}) => {
  const t = useTranslations();
  const params = useParams();
  const familyId = params.familyId as string;
  const {refetchMembers} = useMembershipsStore()
  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogTrigger asChild>
        <Button withIcon>
          <AddIcon />
          <span>{t("Families.addMembers")}</span>
        </Button>
      </DialogTrigger>
      <MembershipDialogContent
        title={t("Families.addMembers")}
      >
        <AddMemberForm familyId={familyId} refresh={() => { refetchMembers(familyId)}} onClose={onClose} />
      </MembershipDialogContent>
    </Dialog>
  );
};

export default AddMemberModal;
