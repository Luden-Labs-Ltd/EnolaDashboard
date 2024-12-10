import FormRender, { FormRenderField } from "@components/FormRender";
import Row from "@components/Row";
import { Button } from "@components/shadowCDN/button";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CategoryIconType,
  createCategoriesApi,
  ICON_MAP,
  useCategoryStore,
} from "entities/category";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useForm } from "react-hook-form";
import AddIcon from "shared/assets/AddIcon";
import { z } from "zod";

const createCategoryScheme = z.object({
  name: z.string().min(3).max(50),
  svg_icon: z.enum([
    "childcare",
    "emotional",
    "general",
    "home",
    "legal_rights",
    "medical",
  ]),
});

type CreateCategoryValues = z.infer<typeof createCategoryScheme>;

interface CreateCategoryFormProps {
    callback?: () => void
}

export const CreateCategoryForm: React.FC<CreateCategoryFormProps> = ({callback}) => {
  const t = useTranslations();
  const selectIconArray: CategoryIconType[] = [
    "childcare",
    "emotional",
    "general",
    "home",
    "legal_rights",
    "medical",
  ];

  const { categoryState } = useCategoryStore();
  const [apiError, setApiError] = useState("");

  const form = useForm<CreateCategoryValues>({
    resolver: zodResolver(createCategoryScheme),
    defaultValues: {
      name: "",
      svg_icon: "childcare",
    },
  });

  const createCategoryFields: FormRenderField<CreateCategoryValues>[] = [
    {
      name: "name",
      type: "input",
      id: "name",
      label: "Category name",
      placeholder: "",
    },
    {
      name: "svg_icon",
      type: "select",
      id: "icon_id",
      label: "Icon",
      options: selectIconArray.map((iconName) => {
        return {
          value: iconName,
          name: (
            <Row alignItems="center" className="w-[120px]">
              {ICON_MAP[iconName]}
              {iconName}
            </Row>
          ),
        };
      }),
      placeholder: "",
    },
  ];

  const onClose = () => {
    form.reset({
      name: "",
      svg_icon: "childcare",
    });
    callback?.()
  };

  function onSubmit(values: CreateCategoryValues) {
    if (!categoryState.programId) {
      return;
    }
    createCategoriesApi(values, categoryState.programId)
      .then(() => {
        onClose();
      })
      .catch((err) => {
        setApiError(err.message);
      });
  }

  return (
    <div className="flex flex-col gap-[20px]">
      <FormRender
        formObject={form}
        onSubmitHandler={onSubmit}
        fields={createCategoryFields}
        className="flex flex-col gap-3"
        fieldsClassName="flex flex-row gap-[20px] justify-between"
        customErrorMessage={apiError}
      >
        <div className="w-full">
          <Button withIcon type="submit" size={"full"} variant={"secondary"}>
            <AddIcon />
            {t("Common.addCategory")}
          </Button>
        </div>
      </FormRender>
    </div>
  );
};
