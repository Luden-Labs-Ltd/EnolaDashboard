import { FormRenderField } from "@components/FormRender";
import { z } from "zod";

export const editMembershipFormScheme = z.object({
  first_name: z.string().max(50),
  last_name: z.string().max(50).optional(),
  circle: z.enum(["public", "private", "intimate"]),
  primary: z.boolean(),
});

export type EditMembershipForm = z.infer<typeof editMembershipFormScheme>;

export const getEditMembershipFormFields = (
  t: TFunction
): FormRenderField<EditMembershipForm>[] => {
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
      name: "primary",
      type: "checkbox",
      direction: "row",
      id: "primary",
      label: t("Common.primary"),
    },
  ];
};
