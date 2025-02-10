'use client'

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Login } from "../types/Login";
import { LoginSchema } from "../schemas/login-schema";
import { MyTextField } from "@/components/ui/my-text-field";
import { MyPasswordField } from "@/components/ui/my-password-field";
import { ButtonLoading } from "@/components/ui/loading-button";
import { useFormFeedback } from "@/hooks/use-form-feedback";
import { startTransition, useActionState, useState } from "react";
import { loginAction } from "../actions/login-action";
import { createInitialState } from "@/types/form-state";
import { redirect } from "next/navigation";
import { Form } from "@/components/ui/form";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  const form = useForm<Login>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [state, loginFormAction, pending] = useActionState(loginAction, createInitialState<Login>());
  const [submitted, setSubmitted] = useState(false);
  
  useFormFeedback(state, submitted, () => redirect('/gestores'));

  function onSubmit(data: Login) {
      const formData = new FormData();
  
      formData.append("email", data.email);
      formData.append("password", data.password);
  
      startTransition(async() => {
          loginFormAction(formData);
      })

      setSubmitted(true)
    }

  return (
    <Form {...form}>
      <form
        className={cn("flex flex-col gap-6", className)}
        onSubmit={form.handleSubmit(onSubmit)}
        {...props}
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Acesse sua conta</h1>
          <p className="text-balance text-sm text-muted-foreground">
            Digite seu e-mail e senha para acessar sua conta
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <MyTextField
            control={form.control}
            name="email"
            placeholder="E-mail"
          />
          <MyPasswordField
            control={form.control}
            name="password"
            placeholder="Senha"
          />
        </div>
        {pending ? (
          <ButtonLoading  />
        ) : (
          <Button className="w-full" type="submit">
            Entrar
          </Button>
        )}
      </form>
    </Form>
  );
}
