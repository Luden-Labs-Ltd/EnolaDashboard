import { FormRenderField } from "@components/FormRender";
import { z } from "zod";

export const AddMembershipFormScheme = z.object({
  first_name: z.string().min(1).max(50),
  last_name: z.string().min(1).max(50),
  age: z.number().max(150),
  phone_number: z.string(),
  gender: z.enum(["female", "male", "other"]),
  circle: z.enum(["public", "private", "intimate"]),
  primary: z.boolean(),
});

export type AddMembershipForm = z.infer<typeof AddMembershipFormScheme>;

export const getAddMembershipFormFields = (
  t: TFunction
): FormRenderField<AddMembershipForm>[] => {
  return [
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
      inputType: "text",
      id: "phone_number",
      label: t("Common.phone"),
      placeholder: "",
    },
    {
      name: "age",
      type: "input",
      inputType: "number",
      id: "age",
      label: t("Common.age"),
      placeholder: "",
    },
    {
      name: "circle",
      type: "select",
      id: "circle",
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
      label: t("Common.circle"),
      placeholder: "",
    },
    {
      name: "gender",
      type: "select",
      id: "gender",
      options: [
        {
          value: "female",
          name: t("Common.female"),
        },
        {
          value: "male",
          name: t("Common.male"),
        },
        {
          value: "other",
          name: t("Common.other"),
        },
      ],
      label: t("Common.gender"),
      placeholder: "",
    },
    {
      name: "primary",
      type: "checkbox",
      direction: "row",
      id: "primary",
      label: t("Common.primary"),
    },
  ];
};
