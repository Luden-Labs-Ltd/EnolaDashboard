import FormRender, { FormRenderField } from "@components/FormRender";
import { Button } from "@components/shadowCDN/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { createFamily, useFamiliesStore } from "entities/families";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface AddFamilyFormProps {
  onClose: () => void;
}

const createFormScheme = z.object({
  title: z.string().min(3).max(50),
  first_name: z.string().max(50),
  last_name: z.string().max(50),
  phone_number: z.string().max(50),
  program_id: z.string().max(50),
  address: z.string().max(50),
});

type CreateFamilyForm = z.infer<typeof createFormScheme>;

export const AddFamilyForm: React.FC<AddFamilyFormProps> = ({ onClose }) => {
  const t = useTranslations();
  const [apiError, setApiError] = useState("");
  const [disabled, setDisabled] = useState(false);
  const { familiesState } = useFamiliesStore();
  const { programId } = familiesState;

  const form = useForm<CreateFamilyForm>({
    resolver: zodResolver(createFormScheme),
    defaultValues: {
      program_id: programId,
    },
  });

  function onSubmit(values: CreateFamilyForm) {
    setDisabled(true);
    createFamily(values)
      .then(() => {
        onCloseHandler();
      })
      .catch((err) => {
        setApiError(err.message);
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
      label: t("Common.title"),
      placeholder: "",
    },
    {
      name: "first_name",
      type: "input",
      id: "first_name",
      label: t("Common.firstName"),
      placeholder: "",
    },
    {
      name: "last_name",
      type: "input",
      id: "last_name",
      label: t("Common.lastName"),
      placeholder: "",
    },
    {
      name: "phone_number",
      type: "phone",
      id: "phone",
      label: t("Common.phone"),
      placeholder: "",
    },
    {
      name: "address",
      type: "input",
      id: "address",
      label: t("Common.address"),
      placeholder: "",
    },
    {
      name: "program_id",
      type: "input",
      id: "program_id",
      label: t("Common.programName"),
      placeholder: "",
    },
  ];

  return (
    <FormRender
      formObject={form}
      onSubmitHandler={onSubmit}
      disabled={disabled}
      fields={createFormFields}
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
          <Button rounded={"circle"} disabled={disabled} type="submit" size={"lg"}>
            {t("Common.add")}
          </Button>
        </div>
      </div>
    </FormRender>
  );
};
