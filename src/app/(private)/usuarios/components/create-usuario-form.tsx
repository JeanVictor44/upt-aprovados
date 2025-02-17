"use client";

import { MyPasswordField } from "@/components/ui/my-password-field";
import { MySelectField } from "@/components/ui/my-select-field";
import { MyTextField } from "@/components/ui/my-text-field";
import { startTransition, useActionState, useState } from "react";
import { useForm } from "react-hook-form";
import { CreateUsuario } from "../types/create-usuario";
import { createUsuarioAction } from "../actions/create-usuario-action";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateUsuarioSchema } from "../schemas/create-usuario-schema";
import { DialogFooter } from "@/components/ui/dialog";
import { ButtonLoading } from "@/components/ui/loading-button";
import { Button } from "@/components/ui/button";
import { createInitialState } from "@/types/form-state";
import { Form } from "@/components/ui/form";
import { useFormFeedback } from "@/hooks/use-form-feedback";
import { toast } from "@/hooks/use-toast";
import { Polo } from "@/types/polo";
import { MyCheckbox } from "@/components/ui/my-checkbox";

interface Props {
  onSave: () => void;
  polos: Polo[];
}

export default function CreateUsuarioForm({ onSave, polos }: Props) {
  const form = useForm<CreateUsuario>({
    resolver: zodResolver(CreateUsuarioSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      poloId: "",
      isAdmin: false,
    },
  });

  function onSuccess() {
    onSave();
    toast({
      description: "Usuário cadastrado com sucesso!",
      variant: "success",
    });
    form.reset();
  }

  const [state, createUsuarioFormAction, pending] = useActionState(
    createUsuarioAction,
    createInitialState<CreateUsuario>()
  );
  const [submitted, setSubmitted] = useState(false);
  useFormFeedback(state, submitted, onSuccess);

  function onSubmit(data: CreateUsuario) {
    setSubmitted(true);
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("poloId", data.poloId);
    formData.append("isAdmin", data.isAdmin.toString());

    startTransition(async () => {
      createUsuarioFormAction(formData);
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4">
          <MyTextField control={form.control} name="name" placeholder="Nome" />
          <MySelectField
            control={form.control}
            name="poloId"
            placeholder="Selecione o polo"
            options={polos.map(({ id, name }) => ({
              label: name,
              value: id.toString(),
            }))}
          />
          <MyTextField
            control={form.control}
            type="email"
            name="email"
            placeholder="E-mail"
          />
          <MyPasswordField
            control={form.control}
            name="password"
            placeholder="Senha"
          />
          <MyCheckbox
            control={form.control}
            name="isAdmin"
            label="Administrador"
            formDescription="Marque essa opção para dar permissão de administrador ao usuário."
          />
        </div>
        <DialogFooter className="mt-4">
          {pending ? <ButtonLoading /> : <Button type="submit">Salvar</Button>}
        </DialogFooter>
      </form>
    </Form>
  );
}
