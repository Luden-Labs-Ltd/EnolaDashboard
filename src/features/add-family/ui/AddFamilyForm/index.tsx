import FormRender, { FormRenderField } from "@components/FormRender";
import { Button } from "@components/shadowCDN/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { createFamily } from "entities/families";
import { CreateFamilyDto } from "entities/families/api/types";
import { buildFamilyPayload } from "entities/families/lib/payload";
import { useTranslations } from "next-intl";
import React, { MouseEventHandler, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import styles from "./addFamilyForm.module.scss";
import { isActionError } from "shared/error/api";

interface AddFamilyFormProps {
  onClose: () => void;
}

const createFormScheme = z.object({
  // family
  title: z.string().min(3).max(50),
  // primary caregiver (primary membership)
  caregiver_full_name: z.string().min(3).max(50),
  caregiver_phone_number: z.string().max(50),
  // family - patient
  full_name: z.string().max(50).optional(),
  phone_number: z.string().max(50).optional(),
}).superRefine((data, ctx) => {
  const hasPatientData = Boolean(
    data.full_name?.trim() || data.phone_number?.trim()
  );

  if (!hasPatientData) return;

  if (!data.full_name?.trim()) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["full_name"],
      message: "Patient name is required",
    });
  }

  if (!data.phone_number?.trim()) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["phone_number"],
      message: "Patient phone is required",
    });
  }
});

type CreateFamilyForm = z.infer<typeof createFormScheme>;

export const AddFamilyForm: React.FC<AddFamilyFormProps> = ({ onClose }) => {

  const t = useTranslations();
  const [apiError, setApiError] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [showOptionalFields, setShowOptionalFields] = useState(false);

  const form = useForm<CreateFamilyForm>({
    resolver: zodResolver(createFormScheme),
  });

  function onSubmit(values: CreateFamilyForm) {
    const createFamilyDto: Omit<CreateFamilyDto, "program_id"> = buildFamilyPayload({
      title: values.title,
      patient: {
        fullName: values.full_name,
        phoneNumber: values.phone_number,
      },
      primaryCaregiver: {
        fullName: values.caregiver_full_name,
        phoneNumber: values.caregiver_phone_number,
      },
    });
    setDisabled(true);
    createFamily(createFamilyDto)
      .then((res) => {
        if (isActionError(res)) {
          return setApiError(res.nextError);
        }
        onCloseHandler();
      })
      .catch((err) => {
        setApiError(err.nextError);
      })
      .finally(() => {
        setDisabled(false);
      });
  }

  const onCloseHandler = () => {
    onClose();
    form.reset({
      title: "",
    });
  };

  const createFormFields: FormRenderField<CreateFamilyForm>[] = [
    {
      name: "title",
      type: "input",
      id: "title",
      label: `${t("Common.familyName")}*`,
      placeholder: t("Common.familyName"),
      direction: "row",
      separator: true,
    },
    {
      name: "caregiver_full_name",
      type: "input",
      id: "caregiver_full_name",
      label: `${t("Common.primaryCaregiver")}*`,
      direction: "row",
      placeholder: t("Common.primaryCaregiver"),
    },
    {
      name: "caregiver_phone_number",
      type: "phone",
      id: "caregiver_phone_number",
      label: `${t("Common.phone")}*`,
      direction: "row",
      placeholder: t("Common.phone"),
    },
    {
      name: "full_name",
      type: "input",
      id: "first_name",
      label: `${t("Common.patient")}*`,
      direction: "row",
      placeholder: t("Common.patient"),
      optional: true,
    },
    {
      name: "phone_number",
      type: "phone",
      id: "phone",
      label: `${t("Common.phone")}*`,
      direction: "row",
      placeholder: "",
      optional: true,
    },
  ];

  const togglePatient: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault()
    event.stopPropagation()
    setShowOptionalFields((prev) => !prev)
  }

  return (
    <div className={`${styles.wrapper} w-full p-[16px] pb-[24px] bg-[#F5F8FF]`}>
      <FormRender
        formObject={form}
        onSubmitHandler={onSubmit}
        disabled={disabled}
        fields={createFormFields}
        customErrorMessage={apiError}
        showOptionalFields={showOptionalFields}
      >
        <div className="w-full pt-6">
          <div className="flex justify-end gap-4">
            <Button
              rounded={"circle"}
              onClick={togglePatient}
              variant={"outline"}
              size={"lg"}
              type="button"
              disabled={disabled}
            >
              {
                showOptionalFields ? t('Common.hiddenPatient') : t('Common.addPatient')
              }
            </Button>
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
