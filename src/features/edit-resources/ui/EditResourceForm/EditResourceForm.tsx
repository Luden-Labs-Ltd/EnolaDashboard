"use client";
import FormRender, { FormRenderField } from "@components/FormRender";
import Row from "@components/Row";
import { Button } from "@components/shadowCDN/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { RenderCategoryIcon, useCategoryStore } from "entities/category";
import { ResourcesType, editResource } from "entities/resources";
import {
  editResourceScheme,
  EditResourceValues,
} from "features/edit-resources/model";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { isActionError } from "shared/error/api";

type EditResourceFormProps = {
  callback: () => void;
  resource: ResourcesType;
};

export const EditResourceForm: React.FC<EditResourceFormProps> = ({
  callback,
  resource,
}) => {
  const t = useTranslations();
  const [apiError, setApiError] = useState("");
  const { categoryState } = useCategoryStore();
  const { categories } = categoryState;

  const form = useForm<EditResourceValues>({
    resolver: zodResolver(editResourceScheme),
    defaultValues: {
      name: resource.serviceName,
      provider: resource.organization,
      contact_name: resource.contactPerson,
      phone_number: resource.phone,
      terms_of_service: resource.termsOfService,
      email: resource.email,
      link: resource.site,
      category_id: String(resource.category),
    },
  });

  const editResourceFields: FormRenderField<EditResourceValues>[] = [
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
      label: t("Resources.serviceNature"),
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
              <RenderCategoryIcon icon={category.icon} />
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

  function onSubmit(values: EditResourceValues) {
    editResource(resource.id, values)
      .then((res) => {
        if (isActionError(res)) {
          return setApiError(res.nextError);
        }
        onClose();
      })
      .catch((err) => {
        setApiError(err.message);
      });
  }

  return (
    <FormRender
      formObject={form}
      onSubmitHandler={onSubmit}
      fields={editResourceFields}
      customErrorMessage={apiError}
    >
      <Button type="submit" size={"lg"}>
        {t("Common.add")}
      </Button>
    </FormRender>
  );
};
