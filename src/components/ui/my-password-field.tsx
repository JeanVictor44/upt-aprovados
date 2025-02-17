"use client"

import { Control, FieldValues, Path } from "react-hook-form"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "./form"
import { Eye } from 'lucide-react';
import { EyeOff } from 'lucide-react';
import { Input } from "./input"
import { useState } from "react";
import { Button } from "./button";

interface MyPasswordField<ControlType extends FieldValues> {
    control: Control<ControlType>
    name: Path<ControlType>
    label?: string
    placeholder: string
}


export function MyPasswordField<ControlType extends FieldValues>({
    control,
    name,
    label,
    placeholder
}: MyPasswordField<ControlType>){
  const [showPassword, setShowPassword] = useState(false)
  
  const eyeIcon = showPassword ? <EyeOff size={20}/> : <Eye size={20}/>

  return (
    <FormField
    control={control}
    name={name}
    render={({field}) => (
      <FormItem>
        {label && <FormLabel>{label}</FormLabel>}
        <FormControl>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              {...field} 
              placeholder={placeholder}
              className="pr-10"
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {eyeIcon}
            </Button>
          </div>
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  >
  </FormField>
  )
}