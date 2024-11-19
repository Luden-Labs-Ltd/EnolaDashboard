import PhoneField from "@components/PhoneField";
import { Button } from "@components/shadowCDN/button";
import { Input } from "@components/shadowCDN/input";
import { ZodErrors } from "@components/ZodErrors/ZodErrors";
import { createFamily } from "entities/families";
import { useTranslations } from "next-intl";
import React, { useEffect } from "react";
import { useFormState } from "react-dom";

interface AddFamilyFormProps {
  onClose: () => void;
}

const INITIAL_STATE = {
  data: null,
};

export const AddFamilyForm: React.FC<AddFamilyFormProps> = ({ onClose }) => {
  const t = useTranslations();

  const [formState, formAction] = useFormState(createFamily, INITIAL_STATE);

  useEffect(() => {
    if (formState.data === "completed") {
      onClose();
    }
  }, [formState]);

  const apiError = formState?.apiError;

  return (
    <form action={formAction}>
      <div className="flex flex-col gap-[10px] mb-8">
        <div className="flex flex-col gap-2">
          <label className="whitespace-nowrap" htmlFor="title">
            {t("Common.name")}
          </label>
          <Input name="title" id="title" />
          <ZodErrors error={formState?.zodErrors?.title} />
        </div>
        <div className="flex flex-col gap-2">
          <label className="whitespace-nowrap" htmlFor="phone_number">
            {t("Common.phone")}
          </label>
          <PhoneField name="phone_number" />
          <ZodErrors error={formState?.zodErrors?.phoneNumber} />
        </div>
      </div>
      <div className="flex gap-6">
        <Button
          rounded={"circle"}
          onClick={onClose}
          variant={"secondary"}
          size={"lg"}
        >
          {t("Common.cancel")}
        </Button>
        <Button rounded={"circle"} type="submit" size={"lg"}>
          {t("Common.add")}
        </Button>
      </div>
      {apiError ? <ZodErrors error={[apiError]} /> : null}
    </form>
  );
};
