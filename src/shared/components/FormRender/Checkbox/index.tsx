import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@components/shadowCDN/form";
import React from "react";
import { FieldValues } from "react-hook-form";
import { FormFieldProps } from "..";
import { Checkbox } from "@components/shadowCDN/checkbox";
import { getDirectionClassForField } from "../helper";

export function FormCheckbox<F extends FieldValues>(props: FormFieldProps<F>) {
  const { renderField, formObject, disabled } = props;
  const className = renderField.className ?? "";
  const fieldDirectionClassName = getDirectionClassForField(
    renderField.direction
  );
  return (
    <FormField
      key={renderField.id}
      control={formObject.control}
      // @ts-ignore
      name={renderField.name}
      disabled={disabled}
      render={({ field }) => {
        return (
          <FormItem className="flex gap-[10px] items-center">
            <div className={`${fieldDirectionClassName} ${className} field-container`}>
              <FormLabel className="mt-2">{renderField.label}</FormLabel>
              <FormControl>
                <Checkbox
                  defaultChecked={field.value}
                  checked={field.value}
                  className="m-0 mt-2"
                  onCheckedChange={field.onChange}
                  {...field}
                />
              </FormControl>
            </div>
            {renderField.description ? (
              <FormDescription>{renderField.description}</FormDescription>
            ) : null}

            <FormMessage
              className={
                renderField.direction === "row" ? "text-end" : "text-start"
              }
            />
          </FormItem>
        );
      }}
    />
  );
}
