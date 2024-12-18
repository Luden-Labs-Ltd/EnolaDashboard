import { Button } from "@components/shadowCDN/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@components/shadowCDN/dialog";
import { ZodErrors } from "@components/ZodErrors/ZodErrors";
import React, { PropsWithChildren } from "react";

interface InfoModalProps {
  isOpen: boolean;
  isDisabled: boolean;

  setIsOpen: (isOpen: boolean) => void;
  onClose: () => void;
  acceptHandler: () => void;

  title: React.ReactNode | string;
  error: string;
  description: React.ReactNode | string;
  cancelText: React.ReactNode | string;
  acceptText: React.ReactNode | string;
}

export const InfoModal: React.FC<PropsWithChildren<InfoModalProps>> = ({
  isOpen,
  isDisabled,
  setIsOpen,
  onClose,
  acceptHandler,
  title,
  error,
  description,
  cancelText,
  acceptText,
  children
}) => {
  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="flex items-center flex-col w-full max-w-sm">
        <DialogHeader>
          <DialogTitle>
            {title}
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="text-center">
            {description}
        </DialogDescription>
        {error ? <ZodErrors error={[error]} /> : null}
        <div className="flex gap-6">
          <Button
            rounded={"circle"}
            onClick={onClose}
            variant={"secondary"}
            size={"lg"}
          >
            {cancelText}
          </Button>
          <Button
            rounded={"circle"}
            disabled={isDisabled}
            onClick={acceptHandler}
            size={"lg"}
          >
            {acceptText}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
