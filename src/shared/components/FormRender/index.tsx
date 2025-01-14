"use client";

import { Form, FormLabel, FormMessage } from "@components/shadowCDN/form";

import { InputHTMLAttributes, PropsWithChildren } from "react";
import { FieldValues, Path, PathValue, UseFormReturn } from "react-hook-form";
import { FormPhone } from "./Phone";
import { FormInput } from "./Input";
import { FormCheckbox } from "./Checkbox";
import { FormSelect } from "./Select";
import { Separator } from "@components/shadowCDN/separator";

type fieldsType = "input" | "checkbox" | "phone" | "select" | "title";
type inputType = InputHTMLAttributes<HTMLInputElement>["type"];

export type FormRenderField<FieldsGeneric> = {
  name: Path<FieldsGeneric> | "customComponent";
  type: fieldsType;
  id: string;
  label: string | React.ReactNode;
  separator?: boolean;
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
  disabled?: boolean;
};

type FormRenderProps<T extends FieldValues> = {
  formObject: UseFormReturn<T>;
  onSubmitHandler: (values: T) => void;
  fields: FormRenderField<T>[];
  customErrorMessage?: string;
  fieldsClassName?: string;
  className?: string;
  disabled?: boolean;
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
    disabled,
  } = props;

  const renderField = (renderField: FormRenderField<B>) => {
    switch (renderField.type) {
      case "phone":
        return (
          <FormPhone
            key={`${renderField.name}-${renderField.id}-${renderField.type}`}
            formObject={formObject}
            renderField={renderField}
            customErrorMessage={customErrorMessage}
            disabled={disabled}
          />
        );
      case "select":
        return (
          <FormSelect
            key={`${renderField.name}-${renderField.id}-${renderField.type}`}
            formObject={formObject}
            renderField={renderField}
            customErrorMessage={customErrorMessage}
            disabled={disabled}
          />
        );
      case "checkbox":
        return (
          <FormCheckbox
            key={`${renderField.name}-${renderField.id}-${renderField.type}`}
            formObject={formObject}
            renderField={renderField}
            customErrorMessage={customErrorMessage}
            disabled={disabled}
          />
        );
      case "title":
        return  <FormLabel className="min-w-fit">{renderField.label}</FormLabel>
      case "input":
      default:
        return (
          <FormInput
            key={`${renderField.name}-${renderField.id}-${renderField.type}`}
            formObject={formObject}
            renderField={renderField}
            customErrorMessage={customErrorMessage}
            disabled={disabled}
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
          {fields.map((field) => {
            return (
              <>
                {renderField(field)}
                {field.separator ? <Separator /> : null}
              </>
            );
          })}
          {customErrorMessage ? (
            <FormMessage>{customErrorMessage}</FormMessage>
          ) : null}
        </div>

        {children}
      </form>
    </Form>
  );
}
