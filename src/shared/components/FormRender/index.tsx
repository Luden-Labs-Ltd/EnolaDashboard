"use client";

import PhoneField from "@components/PhoneField";
import { Checkbox } from "@components/shadowCDN/checkbox";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/shadowCDN/select";
import { InputHTMLAttributes, PropsWithChildren } from "react";
import { FieldValues, Path, PathValue, UseFormReturn } from "react-hook-form";

type fieldsType = "input" | "checkbox" | "phone" | "select";
type inputType = InputHTMLAttributes<HTMLInputElement>["type"];

export type FormRenderField<FieldsGeneric> = {
  name: Path<FieldsGeneric>;
  type: fieldsType;
  id: string;
  label: string;
  description?: string;
  inputType?: inputType;
  options?: Array<{
    value: PathValue<FieldsGeneric, Path<FieldsGeneric>>;
    name: string;
  }>;
  placeholder?: string;
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
      case "select":
        return (
          <FormField
            key={renderField.id}
            control={formObject.control}
            name={renderField.name}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{renderField.label}</FormLabel>
                <FormControl>
                  <Select {...field} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue
                        placeholder={
                          renderField.placeholder ??
                          renderField.label.toUpperCase()
                        }
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {renderField.options?.map((item) => {
                        return (
                          <SelectItem
                            key={`${renderField.id}-${item.value}`}
                            value={item.value}
                          >
                            {item.name}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
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
            render={({ field }) => {
              return (
                <FormItem className="flex gap-[10px] items-center">
                  <FormLabel className="mt-2">{renderField.label}</FormLabel>
                  <FormControl>
                    <Checkbox
                      defaultChecked={field.value}
                      checked={field.value}
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
              );
            }}
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
                    type={renderField.inputType}
                    placeholder={
                      renderField.placeholder ?? renderField.label.toUpperCase()
                    }
                    {...formObject.register(field.name, {
                      valueAsNumber:
                        renderField.inputType === "number" ? true : false,
                    })}
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
