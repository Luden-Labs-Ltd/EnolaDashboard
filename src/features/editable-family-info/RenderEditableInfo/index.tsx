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

interface RenderEditableInfoProps {
  onCloseHandler: () => void;
}

const editFormScheme = z.object({
  // family
  title: z.string().min(3).max(50),
  // family - patient
  full_name: z.string().min(3).max(50),
  phone_number: z.string().max(50),
  address: z.string().max(50),
  problem: z.string().max(50),

  // primary caregiver (primary membership)
  caregiver_full_name: z.string().min(3).max(50),
  caregiver_relation: z.string().min(3).max(50),
  caregiver_phone_number: z.string().max(50),
  caregiver_city: z.string().max(50),
});

type EditFamilyForm = z.infer<typeof editFormScheme>;

export const RenderEditableInfo: React.FC<RenderEditableInfoProps> = ({
  onCloseHandler
}) => {
  const { familyState } = useFamilyStore();
  const { family } = familyState;
  const t = useTranslations();

  const [apiError, setApiError] = useState("");
  const [disabled, setDisabled] = useState(false);

  const form = useForm<EditFamilyForm>({
    resolver: zodResolver(editFormScheme),
    defaultValues: {
      title: family.name,
      full_name: family.patient.fullName ?? "-",
      phone_number: family.patient.phoneNumber ?? "-",
      address: family.patient.city ?? "-",
      problem: family.reason,
      caregiver_city: family.primaryCaregiver.city ?? "-",
      caregiver_relation: family.primaryCaregiver.circle ?? "-",
      caregiver_full_name: family.primaryCaregiver.fullName ?? "-",
      caregiver_phone_number: family.primaryCaregiver.phoneNumber ?? "-",
    },
  });

  function onSubmit(values: EditFamilyForm) {
    const editFamilyDto: Omit<EditFamilyInfoDto, "program_id"> = {
      title: values.title,
      reason: [values.problem],
      patient: {
        city: values.address,
        first_name: values.full_name,
        phone_number: values.phone_number,
      },
      primary_caregiver: {
        first_name: values.caregiver_full_name,
        city: values.caregiver_city,
        phone_number: values.caregiver_phone_number,
      },
    };
    setDisabled(true);
    editFamily(family.id, editFamilyDto)
      .then((res) => {
        if (res?.nextError) {
          return setApiError(res?.nextError);
        }
        onCloseHandler();
      })
      .catch((err) => {
        setApiError(err.message);
      })
      .finally(() => {
        setDisabled(false);
      });
  }

  const createFormFields: FormRenderField<EditFamilyForm>[] = [
    {
      name: "title",
      type: "input",
      id: "title",
      label: <Header type="header">{t("Common.familyName")}</Header>,
      placeholder: "Enter family name",
      direction: "row",
    },
    {
      name: "full_name",
      type: "input",
      id: "first_name",
      label: <Header type="header">{t("Common.patient")}</Header>,
      direction: "row",
      placeholder: t("Common.patient"),
    },
    {
      name: "address",
      type: "input",
      id: "address",
      label: <Header type="info">{t("Common.city")}</Header>,
      direction: "row",
      placeholder: t("Common.city"),
    },
    {
      name: "problem",
      type: "input",
      id: "problem",
      label: <Header type="info">{t("Common.problem")}</Header>,
      direction: "row",
      placeholder: t("Common.problem"),
    },
    {
      name: "phone_number",
      type: "phone",
      id: "phone",
      label: <Header type="info">{t("Common.phone")}</Header>,
      direction: "row",
      placeholder: "",
    },
    {
      name: "caregiver_full_name",
      type: "input",
      id: "caregiver_full_name",
      label: <Header type="header">{t("Common.primaryCaregiver")}</Header>,
      direction: "row",
      placeholder: "Enter caregiver name",
    },
    {
      name: "caregiver_relation",
      type: "select",
      id: "caregiver_relation",
      label: <Header type="info">{t("Common.relationship")}</Header>,
      direction: "row",
      placeholder: t("Common.relationship"),
      options: [
        {
          value: "public",
          name: t("Common.public"),
        },
        {
          value: "private",
          name: t("Common.private"),
        },
        {
          value: "intimate",
          name: t("Common.intimate"),
        },
      ],
    },
    {
      name: "caregiver_city",
      type: "input",
      id: "caregiver_city",
      label: <Header type="info">{t("Common.city")}</Header>,
      direction: "row",
      placeholder: t("Common.city"),
    },
    {
      name: "caregiver_phone_number",
      type: "phone",
      id: "caregiver_phone_number",
      label: <Header type="info">{t("Common.phone")}</Header>,
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
          <div className="flex justify-center">
            <Button rounded={"circle"} type="submit" size={"lg"}>
              Save Changes
            </Button>
          </div>
        </div>
      </FormRender>
    </>
  );
};
