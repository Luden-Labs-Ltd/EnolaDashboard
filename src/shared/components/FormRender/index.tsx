"use client";

import React, { PropsWithChildren } from "react";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/shadowCDN/form";
import { Input } from "@components/shadowCDN/input";
import { Checkbox } from "@components/shadowCDN/checkbox";
import PhoneField from "@components/PhoneField";

type fieldsType = "input" | "checkbox" | "phone";

export type FormRenderField<FieldsGeneric> = {
  name: Path<FieldsGeneric>;
  type: fieldsType;
  id: string;
  label: string;
  description?: string;
  placeholder?: string;
};

type FormRenderProps<T extends FieldValues> = {
  formObject: UseFormReturn<T>;
  onSubmitHandler: (values: T) => void;
  fields: FormRenderField<T>[];
  customErrorMessage?: string;
};

export default function FormRender<B extends FieldValues>(
  props: PropsWithChildren<FormRenderProps<B>>
) {
  const { formObject, onSubmitHandler, fields, customErrorMessage, children } =
    props;

  const renderFields = (renderField: FormRenderField<B>) => {
    switch (renderField.type) {
      case "phone":
        return (
          <FormField
            key={renderField.id}
            control={formObject.control}
            name={renderField.name}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{renderField.label}</FormLabel>
                <FormControl>
                  <PhoneField
                    placeholder={
                      renderField.placeholder ?? renderField.label.toUpperCase()
                    }
                    {...field}
                  />
                </FormControl>
                {renderField.description ? (
                  <FormDescription>{renderField.description}</FormDescription>
                ) : null}

                <FormMessage />
              </FormItem>
            )}
          />
        );
      case "checkbox":
        return (
          <FormField
            key={renderField.id}
            control={formObject.control}
            name={renderField.name}
            render={({ field }) => (
              <FormItem className="flex gap-[10px] items-center">
                <FormLabel className="mt-2">{renderField.label}</FormLabel>
                <FormControl>
                  <Checkbox
                    className="m-0 mt-0"
                    onCheckedChange={field.onChange}
                    {...field}
                  />
                </FormControl>
                {renderField.description ? (
                  <FormDescription>{renderField.description}</FormDescription>
                ) : null}

                <FormMessage />
              </FormItem>
            )}
          />
        );

      case "input":
      default:
        return (
          <FormField
            key={renderField.id}
            control={formObject.control}
            name={renderField.name}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{renderField.label}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={
                      renderField.placeholder ?? renderField.label.toUpperCase()
                    }
                    {...field}
                  />
                </FormControl>
                {renderField.description ? (
                  <FormDescription>{renderField.description}</FormDescription>
                ) : null}

                <FormMessage />
              </FormItem>
            )}
          />
        );
    }
  };

  return (
    <Form {...formObject}>
      <form
        onSubmit={formObject.handleSubmit(onSubmitHandler)}
        className="flex flex-col gap-[15px] w-full"
      >
        {fields.map(renderFields)}
        {customErrorMessage ? (
          <FormMessage>{customErrorMessage}</FormMessage>
        ) : null}

        {children}
      </form>
    </Form>
  );
}
