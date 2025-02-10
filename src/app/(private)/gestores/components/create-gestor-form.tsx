"use client";

import { MyPasswordField } from "@/components/ui/my-password-field";
import { MySelectField } from "@/components/ui/my-select-field";
import { MyTextField } from "@/components/ui/my-text-field";
import { startTransition, useActionState, useState } from "react";
import { useForm } from "react-hook-form";
import { CreateGestor } from "../types/create-gestor";
import { createGestorAction } from "../actions/create-gestor-action";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateGestorSchema } from "../schemas/create-gestor-schema";
import { DialogFooter } from "@/components/ui/dialog";
import { ButtonLoading } from "@/components/ui/loading-button";
import { Button } from "@/components/ui/button";
import { createInitialState } from "@/types/form-state";
import { Form } from "@/components/ui/form";
import { useFormFeedback } from "@/hooks/use-form-feedback";
import { toast } from "@/hooks/use-toast";
import { Polo } from "@/types/polo";

interface Props {
  onSave: () => void;
  polos: Polo[];
}

export default function CreateGestorForm({ onSave, polos }: Props) {
  const form = useForm<CreateGestor>({
    resolver: zodResolver(CreateGestorSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      poloId: "",
    },
  });

  function onSuccess() {
    onSave();
    toast({
      title: "Sucesso!",
      description: "Gestor cadastrado com sucesso!",
      variant: "success",
    });
    form.reset();
  }

  const [state, createGestorFormAction, pending] = useActionState(
    createGestorAction,
    createInitialState<CreateGestor>()
  );
  const [submitted, setSubmitted] = useState(false);
  useFormFeedback(state, submitted, onSuccess);

  function onSubmit(data: CreateGestor) {
    setSubmitted(true);
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("poloId", data.poloId);

    startTransition(async () => {
      createGestorFormAction(formData);
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4">
          <MyTextField control={form.control} name="name" placeholder="Nome" />
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
          <MySelectField
            control={form.control}
            name="poloId"
            placeholder="Selecione o polo"
            options={polos.map(({ id, name }) => ({
              label: name,
              value: id.toString(),
            }))}
          />
        </div>
        <DialogFooter className="mt-4">
          {pending ? <ButtonLoading /> : <Button type="submit">Salvar</Button>}
        </DialogFooter>
      </form>
    </Form>
  );
}
