"use client";

import { cn } from "@/lib/utils"
import { Button } from "./button"
import { FormControl, FormField, FormItem, FormMessage } from "./form"
import { Popover, PopoverTrigger } from "./popover"
import { Check, ChevronsUpDown } from "lucide-react"
import { PopoverContent } from "@radix-ui/react-popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "./command"
import { Control, FieldValues, Path } from "react-hook-form"

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

export function MyCombobox<ControlType extends FieldValues>({
    control,
    label,
    name,
    options,
    placeholder,
}: MySelectFieldProps<ControlType>) {
    return (
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <Popover >
              <PopoverTrigger asChild className="w-full">
                <FormControl>
                  <Button
                    variant="outline"
                    role="combobox"
                    className={cn(
                      "w-full justify-between",
                      !field.value && "text-muted-foreground"
                    )}
                  >
                    {field.value
                      ? options.find(
                          (option) => option.value === field.value
                        )?.label
                      : label}
                    <ChevronsUpDown className="opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-[--radix-popover-trigger-width] max-h-[--radix-popover-content-available-height]">
                <Command className="w-max-[300px]">
                  <CommandInput
                    placeholder={placeholder}
                    className="h-9"
                  />
                  <CommandList className="w-max-[300px]">
                    <CommandEmpty>Sem resultados.</CommandEmpty>
                    <CommandGroup>
                      {options.map((option) => (
                        <CommandItem
                          value={option.label}
                          key={option.value}
                          onSelect={() => {
                            field.onChange(option.value)
                          }}
                        >
                          {option.label}
                          <Check
                            className={cn(
                              "ml-auto",
                              option.value === field.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            <FormMessage />
          </FormItem>
        )}
      />
    )
}