"use client";

import { Button } from "@components/shadowCDN/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@components/shadowCDN/dialog";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import AddIcon from "shared/assets/AddIcon";
import { AddMemberForm } from "../AddMemberForm";
import { useMembershipsStore } from "entities/memberships";
import { useParams } from "next/navigation";

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
      <DialogContent className="flex items-center flex-col w-full max-w-lg">
        <DialogHeader>
          <DialogTitle>{t("Families.addMembers")}</DialogTitle>
        </DialogHeader>
        <DialogDescription className="text-center">
          {t("Families.AddMembers.description")}
        </DialogDescription>

        <AddMemberForm familyId={familyId} refresh={() => { refetchMembers(familyId)}} onClose={onClose} />
      </DialogContent>
    </Dialog>
  );
};

export default AddMemberModal;
