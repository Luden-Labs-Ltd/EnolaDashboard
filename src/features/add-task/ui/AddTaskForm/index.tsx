import FormRender, { FormRenderField } from "@components/FormRender";
import { Button } from "@components/shadowCDN/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { CategoryType } from "entities/category";
import { createTaskApi, useTasksStore } from "entities/task";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { isActionError } from "shared/error/api";
import { z } from "zod";

const createTasksScheme = z.object({
  title: z.string().min(3).max(50),
  description: z.string().min(3).max(50),
  circle: z.enum(["public", "private", "intimate"]),
});

type CreateTasksValues = z.infer<typeof createTasksScheme>;

interface AddTaskFormProps {
  currentCategory: CategoryType;
  callback?: () => void;
}
export const AddTaskForm: React.FC<AddTaskFormProps> = ({
  currentCategory,
  callback,
}) => {
  const t = useTranslations();
  const [apiError, setApiError] = useState("");
  const { tasksState } = useTasksStore();
  const [disabled, setDisabled] = useState(false);
  const form = useForm<CreateTasksValues>({
    resolver: zodResolver(createTasksScheme),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const createTasksFields: FormRenderField<CreateTasksValues>[] = [
    {
      name: "title",
      type: "input",
      id: "name",
      label: t("Common.title"),
      placeholder: "",
    },
    {
      name: "description",
      type: "input",
      id: "description",
      label: t("Common.description"),
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
  ];

  const onClose = () => {
    form.reset({
      title: "",
      description: "",
    });
    callback?.();
  };

  function onSubmit(values: CreateTasksValues) {
    setDisabled(true);
    createTaskApi({
      ...values,
      category_id: currentCategory.id,
      schedule: "* * * * *",
    })
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
      <Button type="submit" disabled={disabled} size={"lg"}>
        {t("Common.add")}
      </Button>
    </FormRender>
  );
};
