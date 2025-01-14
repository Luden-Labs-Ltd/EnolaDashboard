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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/shadowCDN/select";
import { getDirectionClassForField } from "../helper";

export function FormSelect<F extends FieldValues>(props: FormFieldProps<F>) {
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
          <div className={`${fieldDirectionClassName} ${className} field-container`}>
            <FormLabel>{renderField.label}</FormLabel>
            <FormControl>
              <Select {...field} onValueChange={field.onChange}>
                <SelectTrigger disabled={disabled} className="select">
                  <SelectValue placeholder={renderField.placeholder} />
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
