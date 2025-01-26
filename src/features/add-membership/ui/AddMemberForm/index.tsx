import FormRender from "@components/FormRender";
import { Button } from "@components/shadowCDN/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { createMembers } from "entities/memberships/actions";
import {
  AddMembershipForm,
  AddMembershipFormScheme,
  getAddMembershipFormFields,
} from "features/add-membership/model";
import { useTranslations } from "next-intl";
import React, { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { isActionError } from "shared/error/api";

interface AddMemberFormProps {
  familyId: string;
  onClose: () => void;
  refresh: () => void;
}

export const AddMemberForm: React.FC<AddMemberFormProps> = ({
  familyId,
  onClose,
  refresh,
}) => {
  const t = useTranslations();

  const [apiError, setApiError] = useState("");
  const [disabled, setDisabled] = useState(false);

  const form = useForm<AddMembershipForm>({
    resolver: zodResolver(AddMembershipFormScheme),
    defaultValues: {
      primary: false,
    },
  });

  const onCloseHandler = () => {
    onClose();
    form.reset({});
  };
  function onSubmit(values: AddMembershipForm) {
    setDisabled(true);
    createMembers(familyId, values)
      .then((res) => {
        if (isActionError(res)) {
          return setApiError(res.nextError);
        }
        onCloseHandler();
        refresh();
      })
      .catch((err) => {
        setApiError(err.message);
      })
      .finally(() => {
        setDisabled(false);
      });
  }

  const ADD_MEMBERSHIP_FORM_FIELDS = useMemo(
    () => getAddMembershipFormFields(t),
    [t]
  );

  return (
    <FormRender
      formObject={form}
      onSubmitHandler={onSubmit}
      disabled={disabled}
      fields={ADD_MEMBERSHIP_FORM_FIELDS}
      customErrorMessage={apiError}
    >
      <div className="w-full">
        <div className="flex justify-between gap-6">
          <Button
            rounded={"circle"}
            onClick={onCloseHandler}
            variant={"secondary"}
            size={"lg"}
          >
            {t("Common.cancel")}
          </Button>
          <Button
            disabled={disabled}
            rounded={"circle"}
            type="submit"
            size={"lg"}
          >
            {t("Common.add")}
          </Button>
        </div>
      </div>
    </FormRender>
  );
};
