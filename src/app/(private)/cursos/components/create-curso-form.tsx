"use client";

import { MySelectField } from "@/components/ui/my-select-field";
import { MyTextField } from "@/components/ui/my-text-field";
import { useActionState, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogFooter } from "@/components/ui/dialog";
import { ButtonLoading } from "@/components/ui/loading-button";
import { Button } from "@/components/ui/button";
import { createInitialState } from "@/types/form-state";
import { Form } from "@/components/ui/form";
import { useFormFeedback } from "@/hooks/use-form-feedback";
import { toast } from "@/hooks/use-toast";
import { Domain } from "@/types/domain";
import { CreateCursoSchema } from "../schema/create-curso-schema";
import { CreateCurso } from "../types/create-curso";
import { createCursoAction } from "../actions/create-curso-action";

interface Props {
  tiposCurso: Domain[];
  onSave: () => void;
}

export default function CreateCursoForm({ onSave, tiposCurso}: Props) {
  const [areasConhecimento, setAreasConhecimento] = useState<Domain[]>([]);

  const form = useForm<CreateCurso>({
    resolver: zodResolver(CreateCursoSchema),
  });

  function onSuccess() {
    onSave();
    toast({
      description: "Curso cadastrado com sucesso!",
      variant: "success",
    });
    form.reset();
  }

  const [state, createCurso, pending] = useActionState(
    createCursoAction,
    createInitialState<CreateCurso>()
  );
  const [submitted, setSubmitted] = useState(false);
  useFormFeedback(state, submitted, onSuccess);

  function onSubmit(data: CreateCurso) {
    setSubmitted(true);
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("tipo_curso_id", String(data.tipo_curso_id));
    formData.append("area_conhecimento_id", String(data.area_conhecimento_id));

    createCurso(formData);
  }

  const fetchAreasConhecimento = async () => {
    const response = await fetch(`/api/areas-conhecimento`);
    const { data } = await response.json();
    setAreasConhecimento(data);
  };

  useEffect(() => {
    fetchAreasConhecimento();
  }, []);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4">
          <div className="w-full flex flex-col gap-4">
            <MyTextField
              control={form.control}
              name="name"
              placeholder="Nome do curso"
            />
            <MySelectField
              control={form.control}
              name="tipo_curso_id"
              placeholder="Selecione o tipo de curso"
              options={tiposCurso.map(({ id, name }) => ({
                label: name,
                value: id.toString(),
              }))}
            />
            <MySelectField
              control={form.control}
              name="area_conhecimento_id"
              placeholder="Selecione a área de conhecimento"
              options={areasConhecimento.map(({ id, name }) => ({
                label: name,
                value: id.toString(),
              }))}
            />
          </div>
        </div>
        <DialogFooter className="mt-4">
          {pending ? <ButtonLoading /> : <Button type="submit">Salvar</Button>}
        </DialogFooter>
      </form>
    </Form>
  );
}
