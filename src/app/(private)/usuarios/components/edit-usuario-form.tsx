"use client";

import { MyPasswordField } from "@/components/ui/my-password-field";
import { MySelectField } from "@/components/ui/my-select-field";
import { MyTextField } from "@/components/ui/my-text-field";
import { startTransition, useActionState, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogFooter } from "@/components/ui/dialog";
import { ButtonLoading } from "@/components/ui/loading-button";
import { Button } from "@/components/ui/button";
import { createInitialState } from "@/types/form-state";
import { Form } from "@/components/ui/form";
import { useFormFeedback } from "@/hooks/use-form-feedback";
import { toast } from "@/hooks/use-toast";
import { Polo } from "@/types/polo";
import { MyCheckbox } from "@/components/ui/my-checkbox";
import { Usuario } from "../types/usuario";
import { EditUsuario } from "../types/edit-usuario";
import { EditUsuarioSchema } from "../schemas/edit-usuario-schema";
import { editUsuarioAction } from "../actions/edit-usuario-action";

interface Props {
  onSave: () => void;
  polos: Polo[];
  selectedUsuario: Usuario | null;
}

export default function EditUsuarioForm({
  onSave,
  polos,
  selectedUsuario,
}: Props) {
  const form = useForm<EditUsuario>({
    resolver: zodResolver(EditUsuarioSchema),
    defaultValues: {
      name: selectedUsuario?.name || "",
      email: selectedUsuario?.email || "",
      password: "",
      poloId: selectedUsuario?.polo.id.toString() || "",
      isAdmin: selectedUsuario?.is_admin || false,
      id: selectedUsuario?.id || "",
      isActive: selectedUsuario?.is_active,
    },
  });

  function onSuccess() {
    onSave();
    toast({
      description: "Usuário editado com sucesso!",
      variant: "success",
    });
    form.reset();
  }

  const [state, editUsuarioFormAction, pending] = useActionState(
    editUsuarioAction,
    createInitialState<EditUsuario>()
  );
  const [submitted, setSubmitted] = useState(false);
  useFormFeedback(state, submitted, onSuccess);

  function onSubmit(data: EditUsuario) {
    setSubmitted(true);
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("poloId", data.poloId);
    formData.append("isAdmin", data.isAdmin.toString());
    formData.append("isActive", data.isActive.toString());
    formData.append("id", data.id.toString());

    startTransition(async () => {
      editUsuarioFormAction(formData);
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
          <MyCheckbox
            control={form.control}
            name="isActive"
            label="Usuário Ativo"
            formDescription="Marque essa opção para ativar o usuário"
          />
        </div>
        <DialogFooter className="mt-4">
          {pending ? <ButtonLoading /> : <Button type="submit">Salvar</Button>}
        </DialogFooter>
      </form>
    </Form>
  );
}
