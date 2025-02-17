'use client'

import { Control, FieldValues, Path } from "react-hook-form";
import { FormControl, FormDescription, FormField, FormItem, FormLabel } from "./form";
import { Checkbox } from "./checkbox";

interface MySelectFieldProps<ControlType extends FieldValues> {
  control: Control<ControlType>;
  name: Path<ControlType>;
  label?: string;
  className?: string;
  formDescription?: string;
  disabled?: boolean;
}

export function MyCheckbox<ControlType extends FieldValues> ({ control, name, label, formDescription }: MySelectFieldProps<ControlType>) {
    return (
        <FormField
          control={control}
          name={name}
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  {label}
                </FormLabel>
                <FormDescription>
                    {formDescription}
                </FormDescription>
              </div>
            </FormItem>
          )}
        />
    )
}