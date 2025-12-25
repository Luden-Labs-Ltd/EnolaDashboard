"use client";
import FormRender, { FormRenderField } from "@components/FormRender";
import { Button } from "@components/shadowCDN/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateCoordinator } from "entities/users/actions";
import { CoordinatorType } from "entities/users";
import { Program } from "entities/auth/api/types";
import { useTranslations } from "next-intl";
import React, { useState, useEffect } from "react";
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
  programs: Program[];
}

interface RoleOption {
  value: RoleType;
  name: string;
}

interface ProgramOption {
  value: string;
  name: string;
}

export const EditCoordinatorForm: React.FC<EditCoordinatorFormProps> = ({
  callback,
  coordinator,
  programs,
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
      program_id: (coordinator as any).program_ids?.[0] || "",
    },
  });

  async function onSubmit(values: EditCoordinatorValues) {
    setDisabled(true);
    setApiError("");
    const submitData = {
      first_name: values.first_name,
      last_name: values.last_name,
      role: values.role,
      program_ids: values.program_id ? [values.program_id] : [],
    };
    const res = await updateCoordinator(coordinator.id, submitData);
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

  const programOptions: ProgramOption[] = [
    ...programs.map((program) => ({ value: program.id, name: program.name })),
  ];

  const role = form.watch("role");

  useEffect(() => {
    if (role === "admin") {
      form.setValue("program_id", "");
    }
  }, [role, form]);

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
    ...(role === "manager"
      ? [
          {
            name: "program_id" as const,
            type: "select" as const,
            id: "program_id",
            label: t("Common.program"),
            direction: "row" as const,
            options: programOptions,
            placeholder: t("Common.selectProgram"),
          } as FormRenderField<EditCoordinatorValues>,
        ]
      : []),
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
