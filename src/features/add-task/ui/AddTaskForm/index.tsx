import FormRender, { FormRenderField } from "@components/FormRender";
import { Button } from "@components/shadowCDN/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { CategoryType } from "entities/category";
import { createTaskApi, useTasksStore } from "entities/task";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const createTasksScheme = z.object({
  title: z.string().min(3).max(50),
  description: z.string().min(3).max(50),
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
      label: "Title",
      placeholder: "",
    },
    {
      name: "description",
      type: "input",
      id: "description",
      label: "Description",
      placeholder: "",
    },
  ];

  const onClose = () => {
    form.reset({
      title: "",
      description: "",
    });
    callback?.()
  };

  function onSubmit(values: CreateTasksValues) {
    const programId = tasksState.programId;
    if (!programId) {
      return;
    }
    createTaskApi(
      {
        ...values,
        category_id: currentCategory.id,
        schedule: "* * * * *",
      },
      programId
    )
      .then(() => {
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
      fields={createTasksFields}
      customErrorMessage={apiError}
    >
      <Button  type="submit" size={"lg"}>
        {t("Common.add")}
      </Button>
    </FormRender>
  );
};
