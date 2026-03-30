import FormRender, { FormRenderField } from "@components/FormRender";
import { Button } from "@components/shadowCDN/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Header } from "../ChangebleField/Header/Header";
import "./renderInfoForm.css";
import { useFamilyStore } from "entities/families";
import { EditFamilyInfoDto } from "entities/families/api/types";
import { editFamily } from "entities/families/actions";
import { buildFamilyPayload } from "entities/families/lib/payload";

interface RenderEditableInfoProps {
  onCloseHandler: () => void;
}

const editFormScheme = z.object({
  // family
  title: z.string().min(3).max(50),
  // family - patient
  full_name: z.string().max(50).optional(),
  phone_number: z.string().max(50).optional(),

  // primary caregiver (primary membership)
  caregiver_full_name: z.string().min(3).max(50),
  caregiver_phone_number: z.string().max(50),
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

type EditFamilyForm = z.infer<typeof editFormScheme>;

export const RenderEditableInfo: React.FC<RenderEditableInfoProps> = ({
  onCloseHandler
}) => {
  const { familyState, refetchFamily } = useFamilyStore();
  const { family } = familyState;
  const t = useTranslations();

  const [apiError, setApiError] = useState("");
  const [disabled, setDisabled] = useState(false);

  const form = useForm<EditFamilyForm>({
    resolver: zodResolver(editFormScheme),
    defaultValues: {
      title: family.name,
      full_name: family.patient.fullName ?? "",
      phone_number: family.patient.phoneNumber === "-" ? "" : family.patient.phoneNumber,
      caregiver_full_name: family.primaryCaregiver.fullName ?? "",
      caregiver_phone_number: family.primaryCaregiver.phoneNumber === "-" ? "" : family.primaryCaregiver.phoneNumber,
    },
  });

  async function onSubmit(values: EditFamilyForm) {
    const editFamilyDto: Omit<EditFamilyInfoDto, "program_id"> = buildFamilyPayload({
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
    try {
      const res = await editFamily(family.id, editFamilyDto);
      if (res?.nextError) {
        setApiError(res.nextError);
        return;
      }

      await refetchFamily(family.id);
      onCloseHandler();
    } catch (err: any) {
      setApiError(err.message);
    } finally {
      setDisabled(false);
    }
  }

  const createFormFields: FormRenderField<EditFamilyForm>[] = [
    {
      name: "title",
      type: "input",
      id: "title",
      label: <Header type="header">{`${t("Common.familyName")}*`}</Header>,
      placeholder: "Enter family name",
      direction: "row",
    },
    {
      name: "full_name",
      type: "input",
      id: "first_name",
      label: <Header type="header">{`${t("Common.patient")}*`}</Header>,
      direction: "row",
      placeholder: t("Common.patient"),
    },
    {
      name: "phone_number",
      type: "phone",
      id: "phone",
      label: <Header type="info">{`${t("Common.phone")}*`}</Header>,
      direction: "row",
      placeholder: "",
    },
    {
      name: "caregiver_full_name",
      type: "input",
      id: "caregiver_full_name",
      label: <Header type="header">{`${t("Common.primaryCaregiver")}*`}</Header>,
      direction: "row",
      placeholder: "Enter caregiver name",
    },
    {
      name: "caregiver_phone_number",
      type: "phone",
      id: "caregiver_phone_number",
      label: <Header type="info">{`${t("Common.phone")}*`}</Header>,
      direction: "row",
      placeholder: t("Common.phone"),
    },
  ];

  return (
    <>
      <FormRender
        formObject={form}
        onSubmitHandler={onSubmit}
        fields={createFormFields}
        className={"formWrapper"}
        disabled={disabled}
        customErrorMessage={apiError}
      >
        <div className="w-full mt-[30px]">
          <div className="flex justify-end gap-6">
            <Button
              rounded={"circle"}
              onClick={onCloseHandler}
              variant={"secondary"}
              size={"lg"}
              type="button"
              disabled={disabled}
            >
              {t("Common.cancel")}
            </Button>
            <Button rounded={"circle"} type="submit" size={"lg"} disabled={disabled}>
              {t("Common.edit")}
            </Button>
          </div>
        </div>
      </FormRender>
    </>
  );
};
