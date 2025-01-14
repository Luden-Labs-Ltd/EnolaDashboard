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
import { Input } from "@components/shadowCDN/input";
import { getDirectionClassForField } from "../helper";

export function FormInput<F extends FieldValues>(props: FormFieldProps<F>) {
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
      render={({ field }) => (
        <FormItem className="w-full">
          <div className={`${fieldDirectionClassName} ${className} field-container`}>
            <FormLabel className="min-w-fit">{renderField.label}</FormLabel>
            <FormControl>
              <Input
                type={renderField.inputType}
                placeholder={renderField.placeholder}
                {...formObject.register(field.name, {
                  valueAsNumber:
                    renderField.inputType === "number" ? true : false,
                })}
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
      )}
    />
  );
}
