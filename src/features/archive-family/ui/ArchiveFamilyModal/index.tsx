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
import React, { PropsWithChildren, useState } from "react";

interface AddFamilyActionProps {
  callback?: () => void;
}

const AddFamily: React.FC<PropsWithChildren<AddFamilyActionProps>> = ({
  callback,
  children
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => {
    setIsOpen(false);
    callback?.()
  };

  const applyChangesHandle = () => {
    setIsOpen(false);
    callback?.()
  };

  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent onInteractOutside={onClose} className="flex items-center flex-col w-full max-w-sm">
        <DialogHeader>
          <DialogTitle>Archive Family</DialogTitle>
        </DialogHeader>
        <DialogDescription className="text-center">
          You could archive Family
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
            Archive
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddFamily;
