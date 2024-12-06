import { FormRenderField } from "@components/FormRender";
import { z } from "zod";

export const editMembershipFormScheme = z.object({
  first_name: z.string().max(50),
  last_name: z.string().max(50),
  age: z.number().max(150),
  gender: z.enum(["female", "male", "other"]),
  circle: z.enum(["public", "private", "intimate"]),
  primary: z.boolean(),
});

export type EditMembershipForm = z.infer<typeof editMembershipFormScheme>;

export const Edit_MEMBERSHIP_FORM_FIELDS: FormRenderField<EditMembershipForm>[] =
  [
    {
      name: "first_name",
      type: "input",
      id: "first_name",
      label: "First name",
      placeholder: "",
    },
    {
      name: "last_name",
      type: "input",
      id: "last_name",
      label: "Last name",
      placeholder: "",
    },
    {
      name: "age",
      type: "input",
      inputType: "number",
      id: "age",
      label: "Age",
      placeholder: "",
    },
    {
      name: "circle",
      type: "select",
      id: "circle",
      options: [
        {
          value: "public",
          name: "Public",
        },
        {
          value: "private",
          name: "Private",
        },
        {
          value: "intimate",
          name: "Intimate",
        },
      ],
      label: "Circle",
      placeholder: "",
    },
    {
      name: "gender",
      type: "select",
      id: "gender",
      options: [
        {
          value: "Female",
          name: "Female",
        },
        {
          value: "male",
          name: "Male",
        },
        {
          value: "other",
          name: "Other",
        },
      ],
      label: "Gender",
      placeholder: "",
    },
    {
      name: "primary",
      type: "checkbox",
      id: "primary",
      label: "Primary",
    },
  ];
