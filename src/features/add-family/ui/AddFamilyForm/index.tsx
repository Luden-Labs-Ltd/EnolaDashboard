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
  caregiver_city: z.string().max(50),
  problem: z.string().max(50),
  // family - patient
  full_name: z.string().max(50).optional(),
  phone_number: z.string().max(50).optional(),
  address: z.string().max(50).optional(),
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
      problem: values.problem,
      patient: {
        fullName: values.full_name,
        phoneNumber: values.phone_number,
        city: values.address,
      },
      primaryCaregiver: {
        fullName: values.caregiver_full_name,
        phoneNumber: values.caregiver_phone_number,
        city: values.caregiver_city,
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
      name: "caregiver_city",
      type: "input",
      id: "caregiver_city",
      label: t("Common.city"),
      direction: "row",
      placeholder: t("Common.city"),
    },
    {
      name: "problem",
      type: "input",
      id: "problem",
      label: t("Common.problem"),
      direction: "row",
      placeholder: t("Common.problem"),
      separator: true,
    },
    {
      name: "full_name",
      type: "input",
      id: "first_name",
      label: `${t("Common.patient")}`,
      direction: "row",
      placeholder: t("Common.patient"),
      optional: true,
    },
    {
      name: "phone_number",
      type: "phone",
      id: "phone",
      label: `${t("Common.phone")}`,
      direction: "row",
      placeholder: "",
      optional: true,
    },
    {
      name: "address",
      type: "input",
      id: "address",
      label: t("Common.city"),
      direction: "row",
      placeholder: t("Common.city"),
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
        <div className="w-full">
          <div className="flex justify-between gap-6">
            <Button
              rounded={"circle"}
              onClick={togglePatient}
              variant={"outline"}
              size={"lg"}
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
