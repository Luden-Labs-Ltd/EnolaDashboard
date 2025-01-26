import FormRender, { FormRenderField } from "@components/FormRender";
import Row from "@components/Row";
import { Button } from "@components/shadowCDN/button";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  DefaultCategoryIconTypesArray,
  createCategoriesApi,
  RenderCategoryIcon,
  useCategoryStore,
  ICON_MAP,
} from "entities/category";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useForm } from "react-hook-form";
import AddIcon from "shared/assets/AddIcon";
import { z } from "zod";
import ReactDOMServer from 'react-dom/server';
import { isActionError } from "shared/error/api";
import { ZodErrors } from "@components/ZodErrors/ZodErrors";

const createCategoryScheme = z.object({
  name: z.string().min(3).max(50),
  svg_icon: z.enum([
    "childcare",
    "emotional",
    "general",
    "home",
    "legal",
    "medical",
  ]),
});

type CreateCategoryValues = z.infer<typeof createCategoryScheme>;

interface CreateCategoryFormProps {
  callback?: () => void;
}

export const CreateCategoryForm: React.FC<CreateCategoryFormProps> = ({
  callback,
}) => {
  const t = useTranslations();
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
      label: t("Common.categoryName"),
      placeholder: "",
    },
    {
      name: "svg_icon",
      type: "select",
      id: "icon_id",
      label: t("Common.icon"),
      options: DefaultCategoryIconTypesArray.map((iconName) => {
        return {
          value: iconName,
          name: (
            <Row alignItems="center" className="w-[120px]">
              <RenderCategoryIcon icon={iconName} />
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
    callback?.();
  };

  function onSubmit(values: CreateCategoryValues) {
    const svgCategoryIcon = ICON_MAP[values.svg_icon]
    const currentStringSvgIcon =  ReactDOMServer.renderToString(svgCategoryIcon)

    createCategoriesApi({
      ...values,
      svg_icon: currentStringSvgIcon
    })
      .then((res) => {
        if (isActionError(res)) {
          return setApiError(res?.nextError);
        }
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
      >
        <div className="w-full">
          <Button withIcon type="submit" size={"full"} variant={"secondary"}>
            <AddIcon />
            {t("Common.addCategory")}
          </Button>
          <ZodErrors error={[apiError]}/>
        </div>
      </FormRender>
    </div>
  );
};
