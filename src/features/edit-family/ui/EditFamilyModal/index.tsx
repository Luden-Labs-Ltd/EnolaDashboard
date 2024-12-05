"use client";

import FormRender, { FormRenderField } from "@components/FormRender";
import { Button } from "@components/shadowCDN/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@components/shadowCDN/dialog";
import TooltipWrapper from "@components/TooltipWrapper";
import { useTranslations } from "next-intl";
import React, { PropsWithChildren, useState } from "react";
import { useForm } from "react-hook-form";
import EditIcon from "shared/assets/EditIcon";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFamilyStore } from "entities/families";
import { editFamily } from "entities/families/actions";

interface DeleteFamilyActionProps {
  callback?: () => void;
  familyId?: number;
}

const editFormScheme = z.object({
  title: z.string().min(3).max(50),
  phone_number: z.string().min(6).max(50).optional(),
  archived: z.boolean(),
});

type EditFamilyForm = z.infer<typeof editFormScheme>;

const EditFamilyModal: React.FC<PropsWithChildren<DeleteFamilyActionProps>> = ({
  callback,
}) => {
  const { familyState, refetchFamily } = useFamilyStore();
  const { family } = familyState;

  const t = useTranslations();
  const [isOpen, setIsOpen] = useState(false);
  const [apiError, setApiError] = useState("");

  const form = useForm<EditFamilyForm>({
    resolver: zodResolver(editFormScheme),
    defaultValues: {
      title: family.name,
      phone_number: family.primaryCaregiver.phoneNumber,
      archived: false,
    },
  });

  function onSubmit(values: EditFamilyForm) {
    editFamily(family.id, values)
      .then(() => {
        onClose();
      })
      .catch((err) => {
        setApiError(err.message);
      });
  }

  const editFormFields: FormRenderField<EditFamilyForm>[] = [
    {
      name: "title",
      type: "input",
      id: "title",
      label: "Title",
      placeholder: "",
    },
    {
      name: "phone_number",
      type: "phone",
      id: "phone",
      label: "Phone",
      placeholder: "",
    },
    {
      name: "archived",
      type: "checkbox",
      id: "archived",
      label: "Archived",
    },
  ];

  const onClose = () => {
    refetchFamily(family.id).then((res) => {
      setIsOpen(false);
      form.reset({
        title: res?.family.name,
        archived: false,
      });
    });
  };

  const applyChangesHandle = () => {
    callback?.();
  };

  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogTrigger asChild>
        <div>
          <TooltipWrapper text={t("Common.edit")}>
            <Button size={"icon"} variant={"ghost"}>
              <EditIcon />
            </Button>
          </TooltipWrapper>
        </div>
      </DialogTrigger>
      <DialogContent
        onInteractOutside={onClose}
        className="flex items-center flex-col w-full max-w-lg"
      >
        <DialogHeader>
          <DialogTitle>{t("Common.edit")}</DialogTitle>
        </DialogHeader>

        <FormRender
          formObject={form}
          onSubmitHandler={onSubmit}
          fields={editFormFields}
          customErrorMessage={apiError}
        >
          <div className="w-full">
            <div className="flex justify-between gap-6">
              <Button
                rounded={"circle"}
                onClick={onClose}
                variant={"secondary"}
                size={"lg"}
              >
                {t("Common.cancel")}
              </Button>
              <Button
                rounded={"circle"}
                type="submit"
                onClick={applyChangesHandle}
                size={"lg"}
              >
                {t("Common.delete")}
              </Button>
            </div>
          </div>
        </FormRender>
      </DialogContent>
    </Dialog>
  );
};

export default EditFamilyModal;
