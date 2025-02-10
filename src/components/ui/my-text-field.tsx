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
}

export function MyTextField<ControlType extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  className,
  maxLength,
  type,
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
              type={type || "text"}
              placeholder={placeholder}
              maxLength={maxLength}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    ></FormField>
  );
}
