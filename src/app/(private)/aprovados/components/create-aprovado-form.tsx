"use client";

import { MySelectField } from "@/components/ui/my-select-field";
import { MyTextField } from "@/components/ui/my-text-field";
import { startTransition, useActionState, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateAprovadoSchema } from "../schemas/create-aprovado-schema";
import { DialogFooter } from "@/components/ui/dialog";
import { ButtonLoading } from "@/components/ui/loading-button";
import { Button } from "@/components/ui/button";
import { createInitialState } from "@/types/form-state";
import { Form } from "@/components/ui/form";
import { useFormFeedback } from "@/hooks/use-form-feedback";
import { toast } from "@/hooks/use-toast";
import { Polo } from "@/types/polo";
import { CreateAprovado } from "../types/create-aprovado";
import { createAprovadoAction } from "../actions/create-aprovado-action";
import { Domain } from "@/types/domain";
import { MyCombobox } from "@/components/ui/my-combobox";

interface Props {
  onSave: () => void;
  polos: Polo[];
}

export default function CreateAprovadoForm({ onSave, polos }: Props) {
  const [extensoes, setExtensoes] = useState<Domain[]>([]);
  const [cursos, setCursos] = useState<Domain[]>([]);
  const [tiposSelecao, setTiposSelecao] = useState<Domain[]>([]);

  const form = useForm<CreateAprovado>({
    resolver: zodResolver(CreateAprovadoSchema),
  });

  const poloId = form.watch("poloId");

  function onSuccess() {
    onSave();
    toast({
      description: "Aprovado cadastrado com sucesso!",
      variant: "success",
    });
    form.reset();
  }

  const [state, createAprovadoFormAction, pending] = useActionState(
    createAprovadoAction,
    createInitialState<CreateAprovado>()
  );
  const [submitted, setSubmitted] = useState(false);
  useFormFeedback(state, submitted, onSuccess);

  function onSubmit(data: CreateAprovado) {
    setSubmitted(true);
    const formData = new FormData();

    formData.append("name", data.name);
    if (data.phone) formData.append("phone", data.phone);
    formData.append("extensaoId", data.extensaoId);
    formData.append("institutionLocation", data.institutionLocation);
    formData.append("institution", data.institution);
    formData.append("courseId", data.courseId);
    formData.append("placing", data.placing);
    formData.append("selectionTypeId", data.selectionTypeId);
    formData.append("year", data.year);
    formData.append("poloId", data.poloId);

    startTransition(async () => {
      createAprovadoFormAction(formData);
    });
  }

  useEffect(() => {
    const fetchExtensoes = async () => {
      if (!poloId) return;

      const response = await fetch(`/polos/extensoes?polo_id=${poloId}`);
      const { data } = await response.json();
      setExtensoes(data);
    };

    fetchExtensoes();
  }, [poloId]);
  
  useEffect(() => {
    const fetchTiposSelecao = async () => {
      const response = await fetch(`/tipos-selecao`);
      const { data } = await response.json();
      setTiposSelecao(data);
    };

    fetchTiposSelecao();
  }, []);

  useEffect(() => {
    const fetchCursos = async () => {
      const response = await fetch(`/cursos`);
      const { data } = await response.json();
      setCursos(data);
    };

    fetchCursos();
  }, []);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4">

          <div className="w-full flex flex-col gap-4 md:flex-row">
            <MyTextField             
              control={form.control} 
              name="year" 
              placeholder="Ano" />
            <MyTextField
              control={form.control}
              name="name"
              placeholder="Nome"
            />
            <MyTextField
              control={form.control}
              name="phone"
              placeholder="Telefone"
            />
 
          </div>
          <MyCombobox
              control={form.control}
              label={"Polo"}
              name="poloId"
              placeholder="Selecione o polo"
              options={polos.map(({ id, name }) => ({
                label: name,
                value: id.toString(),
              }))}
            />
          <MyCombobox
            label={"Extensão"}
            control={form.control}
            name="extensaoId"
            placeholder="Selecione a extensão"
            disabled={!poloId}
            options={extensoes.map(({ id, name }) => ({
              label: name,
              value: id.toString(),
            }))}
          />
          <div className="w-full flex flex-col gap-4 md:flex-row">
          <MyTextField
            control={form.control}
            name="placing"
            placeholder="Colocação do aprovado"
          />
          <MyTextField
            control={form.control}
            name="institution"
            placeholder="Nome da instituição"
          />
          <MyTextField
            control={form.control}
            name="institutionLocation"
            placeholder="Localização da instituição"
          />            
          </div>

          <MyCombobox
            control={form.control}
            name="courseId"
            label="Curso"
            placeholder="Selecione o curso"
            options={cursos.map(({ id, name }) => ({
              label: name,
              value: id.toString(),
            }))}
          />

          <MySelectField
            control={form.control}
            name="selectionTypeId"
            placeholder="Selecione o tipo de seleção"
            options={tiposSelecao.map(({ id, name }) => ({
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
