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
import { editCursoAction } from "../actions/edit-curso-action";
import { CreateCurso } from "../types/create-curso";
import { CreateCursoSchema } from "../schema/create-curso-schema";
import { Curso } from "../types/Curso";
import { EditCurso } from "../types/edit-curso";

interface Props {
  onSave: () => void;
  tiposCurso: Domain[];
  selectedCurso: Curso | null;
}

export default function EditCursoForm({ onSave, tiposCurso, selectedCurso}: Props) {
  const [areasConhecimento, setAreasConhecimento] = useState<Domain[]>([]);

  const form = useForm<CreateCurso>({
    resolver: zodResolver(CreateCursoSchema),
    defaultValues: {
      area_conhecimento_id: selectedCurso?.area_conhecimento.id.toString() || "",
      tipo_curso_id: selectedCurso?.tipo_curso.id.toString() || "",  
      name: selectedCurso?.name || "",
    }
  });
  
  function onSuccess() {
    onSave();
    toast({
      description: "Curso editado com sucesso!",
      variant: "success",
    });
    form.reset();
  }

  const [state, editCursoFormAction, pending] = useActionState(
    editCursoAction,
    createInitialState<EditCurso>()
  );
  const [submitted, setSubmitted] = useState(false);
  useFormFeedback(state, submitted, onSuccess);

  function onSubmit(data: EditCurso) {
    setSubmitted(true);
    const formData = new FormData();

    formData.append("area_conhecimento_id", data.area_conhecimento_id.toString());
    formData.append("tipo_curso_id", data.tipo_curso_id.toString());
    formData.append("name", data.name);
    formData.append("id", selectedCurso?.id?.toString() || "");

    editCursoFormAction(formData);
  }

  const fetchAreasConhecimento = async () => {
    const areasConhecimento = await fetch("/api/areas-conhecimento").then((res) => res.json());
    setAreasConhecimento(areasConhecimento.data);
  };

  useEffect(() => {
    if (areasConhecimento.length > 0) return;
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
