"use client";

import { Control, FieldValues, Path } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface Options {
  label: string;
  value: string;
  disabled?: boolean;
}

interface MySelectFieldProps<ControlType extends FieldValues> {
  control: Control<ControlType>;
  name: Path<ControlType>;
  options: Options[];
  placeholder: string;
  label?: string;
  className?: string;
  formDescription?: string;
  disabled?: boolean;
}

export function MySelectField<ControlType extends FieldValues>({
  control,
  label,
  name,
  options,
  placeholder,
  className,
  formDescription,
  disabled,
}: MySelectFieldProps<ControlType>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        return (
          <FormItem className="flex-1">
            {label && <FormLabel>{label}</FormLabel>}
            <Select
              onValueChange={field.onChange}
              defaultValue={field.value}
              value={field.value} 
              disabled={disabled} 
            >
              <FormControl>
                <SelectTrigger {...field} className={cn(className)}>
                  <SelectValue placeholder={placeholder} />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {options.map((option: Options) => (
                  <SelectItem
                    key={option.value}
                    value={option.value}
                    className="cursor-pointer focus:bg-slate-100"
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {formDescription && (
              <FormDescription>{formDescription}</FormDescription>
            )}
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
