"use client";

import { Form, FormMessage } from "@components/shadowCDN/form";

import { InputHTMLAttributes, PropsWithChildren } from "react";
import { FieldValues, Path, PathValue, UseFormReturn } from "react-hook-form";
import { FormPhone } from "./Phone";
import { FormInput } from "./Input";
import { FormCheckbox } from "./Checkbox";
import { FormSelect } from "./Select";

type fieldsType = "input" | "checkbox" | "phone" | "select";
type inputType = InputHTMLAttributes<HTMLInputElement>["type"];

export type FormRenderField<FieldsGeneric> = {
  name: Path<FieldsGeneric>;
  type: fieldsType;
  id: string;
  label: string;
  direction?: "column" | "row";
  className?: string;
  description?: string;
  inputType?: inputType;
  options?: Array<{
    value: PathValue<FieldsGeneric, Path<FieldsGeneric>>;
    name: string | React.ReactNode;
  }>;
  placeholder?: string;
};

export type FormFieldProps<T extends FieldValues> = {
  formObject: UseFormReturn<T>;
  renderField: FormRenderField<T>;
  customErrorMessage?: string;
};

type FormRenderProps<T extends FieldValues> = {
  formObject: UseFormReturn<T>;
  onSubmitHandler: (values: T) => void;
  fields: FormRenderField<T>[];
  customErrorMessage?: string;
  fieldsClassName?: string;
  className?: string;
};

export default function FormRender<B extends FieldValues>(
  props: PropsWithChildren<FormRenderProps<B>>
) {
  const {
    formObject,
    onSubmitHandler,
    fields,
    customErrorMessage,
    children,
    className,
    fieldsClassName,
  } = props;

  const renderFields = (renderField: FormRenderField<B>) => {
    switch (renderField.type) {
      case "phone":
        return (
          <FormPhone
            key={`${renderField.name}-${renderField.id}-${renderField.type}`}
            formObject={formObject}
            renderField={renderField}
            customErrorMessage={customErrorMessage}
          />
        );
      case "select":
        return (
          <FormSelect
            key={`${renderField.name}-${renderField.id}-${renderField.type}`}
            formObject={formObject}
            renderField={renderField}
            customErrorMessage={customErrorMessage}
          />
        );
      case "checkbox":
        return (
          <FormCheckbox
            key={`${renderField.name}-${renderField.id}-${renderField.type}`}
            formObject={formObject}
            renderField={renderField}
            customErrorMessage={customErrorMessage}
          />
        );

      case "input":
      default:
        return (
          <FormInput
            key={`${renderField.name}-${renderField.id}-${renderField.type}`}
            formObject={formObject}
            renderField={renderField}
            customErrorMessage={customErrorMessage}
          />
        );
    }
  };

  return (
    <Form {...formObject}>
      <form
        onSubmit={formObject.handleSubmit(onSubmitHandler)}
        className={`${
          className ? className : "flex flex-col gap-[15px] w-full"
        }`}
      >
        <div
          className={`${
            fieldsClassName
              ? fieldsClassName
              : "flex flex-col gap-[15px] w-full"
          }`}
        >
          {fields.map(renderFields)}
          {customErrorMessage ? (
            <FormMessage>{customErrorMessage}</FormMessage>
          ) : null}
        </div>

        {children}
      </form>
    </Form>
  );
}
