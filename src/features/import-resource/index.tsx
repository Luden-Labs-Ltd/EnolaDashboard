"use client";

import { InputFile } from "@components/InputFile";
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
import { importResources } from "entities/resources";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import AddIcon from "shared/assets/AddIcon";
import { isActionError } from "shared/error/api";

interface AddResourcesModalActionProps {
}

const ImportResourcesModal: React.FC<AddResourcesModalActionProps> = ({
}) => {
  const t = useTranslations();

  const [isOpen, setIsOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string>("");

  const onClose = () => {
    setIsOpen(false);
  };

  const handleDownloadExample = () => {
    const link = document.createElement("a");
    link.href = "/example-files/example-file-resources.xlsx"; // Public URL path
    link.download = "example-file-resources.xlsx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const onDownload = () => {
    if (!file) {
        return
    }
    const newFormData = new FormData()
    newFormData.append("file", file)
    importResources(newFormData).then((data) => {
        if (isActionError(data)) {
            setError(data.nextError)
            return
        }else {
            setError("")
        }
    })
  }

  const onFileChangeHandler = (file: File | null) => {
    setError("")
    setFile(file)
  }

  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogTrigger asChild>
        <Button withIcon size={"full"} rounded={"circle"}>
          <AddIcon />
          <span>{t("Resources.importResources")}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="flex items-center flex-col w-full">
        <DialogHeader>
          <DialogTitle>{t("Resources.ImportResources.title")}</DialogTitle>
        </DialogHeader>
        <DialogDescription className="w-full p-[30px]">
          <div className="flex flex-col gap-[12px]">
            <InputFile id="resource-file" multiType={false} onFileChange={onFileChangeHandler} name={t('Common.resourcesFile')} accept=".xls,.xlsx,.csv" />
            {
                file ? <Button
                    variant="outline"
                    size="sm"
                    onClick={onDownload}
                    className="w-full sm:w-auto"
                    >
                        {t("Resources.ImportResources.import")}
                    </Button> : null
            }

            <ZodErrors error={[error]} />
            <p>{t("Resources.ImportResources.description")}</p>

            <Button
                variant="outline"
                size="sm"
                onClick={handleDownloadExample}
                className="w-full sm:w-auto"
              >
                {t("Resources.ImportResources.downloadExample")}
            </Button>

          </div>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default ImportResourcesModal;
