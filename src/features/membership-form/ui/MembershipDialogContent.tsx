"use client";

import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@components/shadowCDN/dialog";
import React, { PropsWithChildren } from "react";

interface MembershipDialogContentProps {
  title: string;
  description?: string;
  onInteractOutside?: (event: Event) => void;
}

export const MembershipDialogContent: React.FC<
  PropsWithChildren<MembershipDialogContentProps>
> = ({ title, description, onInteractOutside, children }) => {
  return (
    <DialogContent
      aria-describedby={undefined}
      onInteractOutside={onInteractOutside}
      className="flex flex-col w-full max-w-lg"
    >
      <DialogHeader className="pb-2">
        <DialogTitle>{title}</DialogTitle>
      </DialogHeader>
      {description ? (
        <DialogDescription className="text-center">
          {description}
        </DialogDescription>
      ) : null}
      {children}
    </DialogContent>
  );
};
