import { Button } from "@components/shadowCDN/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocale, useTranslations } from "next-intl";
import React, { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import FormRender, { FormRenderField } from "@components/FormRender";
import { isActionError } from "shared/error/api";
import { createProgram } from "entities/program/action";
import { Program } from "entities/auth/api/types";
import { languageOptions } from "features/language-switch/model/config";

interface CreateProgramFormProps {
  onClose: () => void;
  onCreated?: (program: Program) => void;
}

type CreateProgramFormValues = {
  name: string;
  language: string;
};

export const CreateProgramForm: React.FC<CreateProgramFormProps> = ({
  onClose,
  onCreated,
}) => {
  const t = useTranslations();
  const locale = useLocale();
  const [apiError, setApiError] = useState("");
  const [disabled, setDisabled] = useState(false);

  const invalidMessage =
    locale === "he" ? "קלט לא תקין" : "Invalid input";

  const createProgramScheme = useMemo(
    () =>
      z.object({
        name: z.string().min(2, { message: invalidMessage }).max(100),
        language: z.string().min(2, { message: invalidMessage }).max(5),
      }),
    [invalidMessage]
  );

  const form = useForm<CreateProgramFormValues>({
    resolver: zodResolver(createProgramScheme),
    mode: "onBlur",
    reValidateMode: "onBlur",
    defaultValues: { name: "", language: languageOptions[0]?.code ?? "en" },
  });

  const onSubmit = async (values: CreateProgramFormValues) => {
    setDisabled(true);
    setApiError("");

    const res = await createProgram({
      name: values.name,
      language: values.language,
    });

    if (isActionError(res)) {
      setApiError(res.nextError);
      setDisabled(false);
      return;
    }

    const createdProgram = res as Program;
    onCreated?.(createdProgram);

    onCloseHandler();
    setDisabled(false);
  };

  const onCloseHandler = () => {
    onClose();
    form.reset({ name: "", language: languageOptions[0]?.code ?? "en" });
  };

  const languageFieldOptions = languageOptions.map((option) => ({
    value: option.code,
    name: t(option.labelKey),
  }));

  const formFields: FormRenderField<CreateProgramFormValues>[] = [
    {
      name: "name",
      type: "input",
      id: "name",
      label: t("Common.title"),
      placeholder: t("Common.title"),
      direction: "row",
      separator: true,
      autoComplete: "off",
    },
    {
      name: "language",
      type: "select",
      id: "language",
      label: t("Common.language"),
      direction: "row",
      options: languageFieldOptions,
      required: true,
      placeholder: t("Common.language"),
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
              rounded="circle"
              disabled={disabled}
              type="submit"
              size="lg"
            >
              {t("Common.add")}
            </Button>
          </div>
        </div>
      </FormRender>
    </div>
  );
};

