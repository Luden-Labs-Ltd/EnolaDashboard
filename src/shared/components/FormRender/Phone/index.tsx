import PhoneField from "@components/PhoneField";
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
import { getDirectionClassForField } from "../helper";

export function FormPhone<F extends FieldValues>(props: FormFieldProps<F>) {
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
      render={({ field }) => (
        <FormItem>
          <div
            className={`${fieldDirectionClassName} ${className} field-container`}
          >
            <FormLabel className="min-w-fit">{renderField.label} {renderField?.required ? '*' : null}</FormLabel>
            <FormControl>
              <PhoneField
                size="sm"
                disabled={disabled}
                placeholder={renderField.placeholder}
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
      )}
    />
  );
}
