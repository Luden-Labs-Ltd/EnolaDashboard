import { Button } from "@components/shadowCDN/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { createCoordinator } from "entities/users/actions";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import FormRender, { FormRenderField } from "@components/FormRender";
import styles from "./addFamilyForm.module.scss";
import { isActionError } from "shared/error/api";
import { RoleType } from "shared/types/role";

interface AddCoordinatorFormProps {
  onClose: () => void;
}

const createCoordinatorScheme = z.object({
  phone_number: z.string().min(5).max(50),
  first_name: z.string().min(2).max(50),
  last_name: z.string().min(2).max(50),
  role: z.enum(["manager", "member"]),
});

type CreateCoordinatorForm = z.infer<typeof createCoordinatorScheme>;

interface RoleOption {
  value: RoleType;
  name: string;
}

export const AddCoordinatorForm: React.FC<AddCoordinatorFormProps> = ({ onClose }) => {
  const t = useTranslations();
  const [apiError, setApiError] = useState("");
  const [disabled, setDisabled] = useState(false);

  const form = useForm<CreateCoordinatorForm>({
    resolver: zodResolver(createCoordinatorScheme),
    defaultValues: { role: "manager" },
  });

  async function onSubmit(values: CreateCoordinatorForm) {
    setDisabled(true);
    setApiError("");
    const res = await createCoordinator(values);
    if (isActionError(res)) {
      setApiError(res.nextError);
      setDisabled(false);
      return;
    }
    onCloseHandler();
    setDisabled(false);
  }

  function onCloseHandler() {
    onClose();
    form.reset({ phone_number: "", first_name: "", last_name: "", role: "manager" });
  }

  const roleOptions: RoleOption[] = [
    { value: "manager", name: t("Common.manager") },
    { value: "member", name: t("Common.member") },
  ];

  const formFields: FormRenderField<CreateCoordinatorForm>[] = [
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
      name: "phone_number",
      type: "phone",
      id: "phone_number",
      label: `${t("Common.phone")}*`,
      placeholder: t("Common.phone"),
      direction: "row",
      separator: true,
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
    <div className={`${styles.wrapper} w-full p-[16px] pb-[24px] bg-[#F5F8FF]`}>
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
              disabled={disabled}
              type="submit"
              size={"lg"}
            >
              {t("Common.add")}
            </Button>
          </div>
        </div>
      </FormRender>
    </div>
  );
};
