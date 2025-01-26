"use client";
import FormRender, { FormRenderField } from "@components/FormRender";
import { Button } from "@components/shadowCDN/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { CategoryType, RenderCategoryIcon } from "entities/category";
import { createResource } from "entities/resources/actions";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Row from "@components/Row";
import {
  createResourceScheme,
  CreateResourceValues,
} from "features/add-resources/model";
import { isActionError } from "shared/error/api";

type ResourceFormProps = {
  callback: () => void;
  categories: CategoryType[];
};

export const ResourceForm: React.FC<ResourceFormProps> = ({
  callback,
  categories,
}) => {
  const t = useTranslations();
  const [apiError, setApiError] = useState("");
  const [disabled, setDisabled] = useState(false);

  const form = useForm<CreateResourceValues>({
    resolver: zodResolver(createResourceScheme),
    defaultValues: {},
  });

  const createTasksFields: FormRenderField<CreateResourceValues>[] = [
    {
      name: "name",
      type: "input",
      id: "name",
      label: t("Resources.serviceName"),
      direction: "row",
      placeholder: "",
    },
    {
      name: "provider",
      type: "input",
      id: "provider",
      direction: "row",
      label: t("Common.organization"),
      placeholder: "",
    },
    {
      name: "contact_name",
      type: "input",
      id: "contact_name",
      direction: "row",
      label: t("Resources.contactPerson"),
      placeholder: "",
    },
    {
      name: "terms_of_service",
      type: "input",
      id: "terms_of_service",
      direction: "row",
      label: t("Resources.termOfService"),
      placeholder: "",
    },
    {
      name: "phone_number",
      type: "phone",
      id: "phone",
      label: t("Common.phone"),
      direction: "row",
      placeholder: "",
    },
    {
      name: "email",
      type: "input",
      id: "email",
      label: t("Common.email"),
      direction: "row",
      placeholder: "e-mail",
    },
    {
      name: "link",
      type: "input",
      id: "link",
      label: t("Common.url"),
      direction: "row",
      placeholder: "https://",
    },
    {
      name: "category_id",
      type: "select",
      id: "category_id",
      direction: "row",
      label: t("Common.category"),
      options: categories.map((category) => {
        return {
          value: category.id,
          name: (
            <Row alignItems="center" className="w-[120px]">
              <RenderCategoryIcon icon={category.icon}/>
              {category.title}
            </Row>
          ),
        };
      }),
      placeholder: "",
    },
  ];

  const onClose = () => {
    form.reset({});
    callback?.();
  };

  function onSubmit(values: CreateResourceValues) {
    setDisabled(true);
    createResource(values)
      .then((res) => {
        if (isActionError(res)) {
          return setApiError(res.nextError);
        }
        onClose();
      })
      .catch((err) => {
        setApiError(err.message);
      })
      .finally(() => {
        setDisabled(false);
      });
  }

  return (
    <FormRender
      formObject={form}
      onSubmitHandler={onSubmit}
      fields={createTasksFields}
      disabled={disabled}
      customErrorMessage={apiError}
    >
      <Button disabled={disabled} type="submit" size={"lg"}>
        {t("Common.add")}
      </Button>
    </FormRender>
  );
};
