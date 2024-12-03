import PhoneField from "@components/PhoneField";
import Row from "@components/Row";
import { Button } from "@components/shadowCDN/button";
import { Checkbox } from "@components/shadowCDN/checkbox";
import { Input } from "@components/shadowCDN/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/shadowCDN/select";
import { ZodErrors } from "@components/ZodErrors/ZodErrors";
import { createMembers } from "entities/memberships/actions";
import { useTranslations } from "next-intl";
import React, { useEffect } from "react";
import { useFormState } from "react-dom";

interface AddMemberFormProps {
  familyId: string;
  onClose: () => void;
  refresh: () => void;
}

const INITIAL_STATE = {
  data: null,
};

export const AddMemberForm: React.FC<AddMemberFormProps> = ({ familyId, onClose, refresh }) => {
  const t = useTranslations();

  const [formState, formAction] = useFormState(createMembers, {
    ...INITIAL_STATE,
    familyId: familyId,
  });

  useEffect(() => {
    if (formState.data === "completed") {
      onClose();
      refresh();
    }
  }, [formState]);

  const apiError = formState?.apiError;

  return (
    <form action={formAction} className="w-full">
      <div className="flex w-full flex-col gap-[12px] px-5 mb-8">
        <div className="flex flex-col gap-2">
          <label className="whitespace-nowrap" htmlFor="first_name">
            firstName
          </label>
          <Input name="first_name" id="first_name" />
          <ZodErrors error={formState?.zodErrors?.firstName} />
        </div>

        <div className="flex flex-col gap-2">
          <label className="whitespace-nowrap" htmlFor="last_name">
            last Name
          </label>
          <Input name="last_name" id="last_name" />
          <ZodErrors error={formState?.zodErrors?.lastName} />
        </div>

        <div className="flex flex-col gap-2">
          <label className="whitespace-nowrap" htmlFor="phone_number">
            {t("Common.phone")}
          </label>
          <PhoneField name="phone_number" />
          <ZodErrors error={formState?.zodErrors?.phoneNumber} />
        </div>

        <div className="flex flex-col gap-2">
          <label className="whitespace-nowrap" htmlFor="age">
            Age
          </label>
          <Input name="age" id="age" />
          <ZodErrors error={formState?.zodErrors?.age} />
        </div>

        <div className="flex flex-col gap-2">
          <label className="whitespace-nowrap" htmlFor="gender">
            Gender
          </label>
          <Select name="gender">
            <SelectTrigger>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
          <ZodErrors error={formState?.zodErrors?.gender} />
        </div>

        <div className="flex flex-col gap-2">
          <label className="whitespace-nowrap" htmlFor="circle">
            Circle
          </label>
          <Select name="circle">
            <SelectTrigger>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="intimate">Intimate</SelectItem>
              <SelectItem value="public">Public</SelectItem>
              <SelectItem value="private">Private</SelectItem>
            </SelectContent>
          </Select>
          <ZodErrors error={formState?.zodErrors?.circle} />
        </div>

        <div className="flex flex-col gap-2">
          <Row alignItems="center">
            <label className="whitespace-nowrap" htmlFor="primary">
              Primary
            </label>
            <Checkbox name="primary" id="primary" />
          </Row>
          <ZodErrors error={formState?.zodErrors?.primary} />
        </div>
      </div>
      <div className="flex justify-between px-7 gap-6">
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
