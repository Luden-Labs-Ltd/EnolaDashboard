"use client";

import { Button } from "@components/shadowCDN/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@components/shadowCDN/dialog";
import { ZodErrors } from "@components/ZodErrors/ZodErrors";
import { DragDropZoneInput } from "@components/DragDropZoneInput";
import { importResources } from "entities/resources";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import AddIcon from "shared/assets/AddIcon";
import { isActionError } from "shared/error/api";
import { useToast } from "@hooks/use-toast";
import { Separator } from "@components/shadowCDN/separator";

interface AddResourcesModalActionProps {
}

const ImportResourcesModal: React.FC<AddResourcesModalActionProps> = ({
}) => {
  const t = useTranslations();
  const toast = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const onClose = () => {
    setIsOpen(false);
    setFile(null);
    setError("");
  };

  const handleDownloadExample = () => {
    const link = document.createElement("a");
    link.href = "/example-files/example-file-resources.xlsx";
    link.download = "example-file-resources.xlsx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const onImport = async () => {
    if (!file) {
      toast.error(t("Resources.ImportResources.pleaseSelectFile"));
      return;
    }

    setIsLoading(true);
    const newFormData = new FormData();
    newFormData.append("file", file);

    try {
      const data = await importResources(newFormData);
      if (isActionError(data)) {
        toast.error(data.nextError);
        setError(data.nextError);
      } else {
        setError("");
        toast.success(t("Resources.ImportResources.success"));
        onClose();
      }
    } catch (err) {
      toast.error(t("Resources.ImportResources.error"));
      setError(t("Resources.ImportResources.error"));
    } finally {
      setIsLoading(false);
    }
  };

  const onFileChangeHandler = (file: File | null) => {
    setError("");
    setFile(file);
  };

  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogTrigger asChild>
        <Button withIcon size={"full"} rounded={"circle"}>
          <AddIcon />
          <span>{t("Resources.importResources")}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="min-w-[696px] sm:max-w-md bg-[#F5F8FF]">
        <DialogHeader >
          <DialogTitle className="text-center">
            {t("Resources.ImportResources.title")}
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-6">
          <DragDropZoneInput
            id="resource-file"
            variant="drag-drop"
            onFileChange={onFileChangeHandler}
            accept=".xls,.xlsx,.csv"
            className="w-full"
          />

          {error && (
            <>
              <ZodErrors error={[error]} />
            </>
          )}

          {
            !file && (
              <>
                  <Separator />
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-4">
                      {t("Resources.ImportResources.description")}
                    </p>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleDownloadExample}
                      className="w-full"
                    >
                      {t("Resources.ImportResources.downloadExample")}
                    </Button>
                  </div>
              </>
            )
          }

          {file && (
            <div className="flex justify-end gap-3">
              <Button
                variant="outline"
                onClick={onClose}
                disabled={isLoading}
              >
                {t("Common.cancel")}
              </Button>
              <Button
                onClick={onImport}
                disabled={isLoading}
                className="min-w-[80px]"
              >
                {isLoading ? (
                  <>
                    <svg className="w-4 h-4 mr-2 animate-spin" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                    </svg>
                    {t("Resources.ImportResources.import")}
                  </>
                ) : (
                  t("Resources.ImportResources.import")
                )}
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImportResourcesModal;
