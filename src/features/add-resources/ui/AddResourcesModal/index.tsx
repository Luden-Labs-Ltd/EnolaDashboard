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
import ResourceForm from "entities/resources";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import AddIcon from "shared/assets/AddIcon";

interface AddResourcesModalActionProps {}

const AddResourcesModal: React.FC<AddResourcesModalActionProps> = ({}) => {
  const t = useTranslations();

  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => {
    setIsOpen(false);
  };

  const onSubmitHandler = () => {
    setIsOpen(false);
  };

  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogTrigger asChild>
        <Button withIcon size={"full"} rounded={"circle"}>
          <AddIcon />
          <span>{t('Resources.newResources')}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="flex items-center flex-col w-full">
        <DialogHeader>
          <DialogTitle>Add Resources</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <ResourceForm onSubmit={onSubmitHandler} />
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default AddResourcesModal;
