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
import React, { useState } from "react";
import AddIcon from "shared/assets/AddIcon";

interface ArchiveFamilyActionProps {}

const ArchiveFamily: React.FC<ArchiveFamilyActionProps> = ({}) => {
  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => {
    setIsOpen(false);
  };

  const applyChangesHandle = () => {
    setIsOpen(false);
  };

  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogTrigger asChild>
        <Button withIcon>
          <AddIcon />
          <span>Archive Family</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="flex items-center flex-col w-full max-w-sm">
        <DialogHeader>
          <DialogTitle>Add Family</DialogTitle>
        </DialogHeader>
        <DialogDescription className="text-center">
          You could add family
        </DialogDescription>
        <div className="flex gap-6">
          <Button
            rounded={"circle"}
            onClick={onClose}
            variant={"secondary"}
            size={"lg"}
          >
            Cancel
          </Button>
          <Button rounded={"circle"} onClick={applyChangesHandle} size={"lg"}>
            Add
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ArchiveFamily;
