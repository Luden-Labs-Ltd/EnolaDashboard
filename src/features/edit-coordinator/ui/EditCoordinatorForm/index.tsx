"use client";
import FormRender, { FormRenderField } from "@components/FormRender";
import { Button } from "@components/shadowCDN/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateCoordinator } from "entities/users/actions";
import { CoordinatorType } from "entities/users";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { isActionError } from "shared/error/api";
import { RoleType } from "shared/types/role";
import {
  editCoordinatorScheme,
  EditCoordinatorValues,
} from "../../model";

interface EditCoordinatorFormProps {
  callback: () => void;
  coordinator: CoordinatorType;
}

interface RoleOption {
  value: RoleType;
  name: string;
}

export const EditCoordinatorForm: React.FC<EditCoordinatorFormProps> = ({
  callback,
  coordinator,
}) => {
  const t = useTranslations();
  const [apiError, setApiError] = useState("");
  const [disabled, setDisabled] = useState(false);

  const form = useForm<EditCoordinatorValues>({
    resolver: zodResolver(editCoordinatorScheme),
    defaultValues: {
      first_name: coordinator.first_name,
      last_name: coordinator.last_name,
      role: coordinator.role as "manager" | "admin",
    },
  });

  async function onSubmit(values: EditCoordinatorValues) {
    setDisabled(true);
    setApiError("");
    const res = await updateCoordinator(coordinator.id, values);
    if (isActionError(res)) {
      setApiError(res.nextError);
      setDisabled(false);
      return;
    }
    onClose();
    setDisabled(false);
  }

  const onClose = () => {
    form.reset({});
    callback?.();
  };

  const roleOptions: RoleOption[] = [
    { value: "manager", name: t("Common.manager") },
    { value: "admin", name: t("Common.admin") },
  ];

  const formFields: FormRenderField<EditCoordinatorValues>[] = [
    {
      name: "first_name",
      type: "input",
      id: "first_name",
      label: `${t("Common.firstName")}*`,
      placeholder: t("Common.firstName"),
      direction: "row",
      separator: true,
    },
    {
      name: "last_name",
      type: "input",
      id: "last_name",
      label: `${t("Common.lastName")}*`,
      placeholder: t("Common.lastName"),
      direction: "row",
    },
    {
      name: "role",
      type: "select",
      id: "role",
      label: t("Common.role"),
      direction: "row",
      options: roleOptions,
      required: true,
      placeholder: t("Common.role"),
    },
  ];

  return (
    <div className="w-full p-[16px] pb-[24px] bg-[#F5F8FF]">
      <FormRender
        formObject={form}
        onSubmitHandler={onSubmit}
        disabled={disabled}
        fields={formFields}
        customErrorMessage={apiError}
      >
        <div className="w-full">
          <div className="flex justify-end gap-6">
            <Button
              rounded={"circle"}
              onClick={onClose}
              variant={"secondary"}
              size={"lg"}
              disabled={disabled}
            >
              {t("Common.cancel")}
            </Button>
            <Button
              rounded={"circle"}
              disabled={disabled}
              type="submit"
              size={"lg"}
            >
              {t("Common.edit")}
            </Button>
          </div>
        </div>
      </FormRender>
    </div>
  );
};
