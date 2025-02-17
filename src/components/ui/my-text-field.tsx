"use client";

import { Control, FieldValues, Path } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";
import { Input } from "./input";
import { cn } from "@/lib/utils";
import { HTMLInputTypeAttribute } from "react";

interface MyTextFieldProps<ControlType extends FieldValues> {
  control: Control<ControlType>;
  name: Path<ControlType>;
  label?: string;
  placeholder: string;
  className?: string;
  maxLength?: number;
  type?: HTMLInputTypeAttribute;
  mask?: (value: string) => string;
  disabled?: boolean;
}

export function MyTextField<ControlType extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  className,
  maxLength,
  type,
  mask,
  disabled,
}: MyTextFieldProps<ControlType>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn(className, "w-full")}>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Input
            className="w-full m-0"
              {...field}
              onChange={(e) => {
                field.onChange(mask ? mask(e.target.value) : e.target.value);
              }}
              type={type || "text"}
              placeholder={placeholder}
              maxLength={maxLength}
              disabled={disabled}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    ></FormField>
  );
}
