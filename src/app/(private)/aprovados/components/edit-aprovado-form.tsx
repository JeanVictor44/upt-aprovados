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
import { EditAprovado } from "../types/edit-aprovado";
import { Domain } from "@/types/domain";
import { MyCombobox } from "@/components/ui/my-combobox";
import { InstituicaoEnsino } from "@/types/instituicao";
import { useDebouncedCallback } from "use-debounce";
import { editAprovadoAction } from "../actions/edit-aprovado-action";
import { Aprovado } from "../types/aprovado";

interface Props {
  onSave: () => void;
  polos: Polo[];
  selectedAprovado: Aprovado | null;
}

function isValidValue(value: unknown): value is string {
  return value !== null && value !== undefined && value !== "" && value !== "null";
}

export default function EditAprovadoForm({ onSave, polos, selectedAprovado}: Props) {
  const [extensoes, setExtensoes] = useState<Domain[]>([]);
  const [cursos, setCursos] = useState<Domain[]>([]);
  const [tiposSelecao, setTiposSelecao] = useState<Domain[]>([]);
  const [instituicoes, setInstituicoes] = useState<InstituicaoEnsino[]>([]);
  const [instituicaoQuery, setInstituicaoQuery] = useState(
    new URLSearchParams('?query=' + selectedAprovado?.institution.name)
  );
  const [disabled, setDisabled] = useState(false);

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(instituicaoQuery);

    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    setInstituicaoQuery(params);
  }, 500);

  const form = useForm<EditAprovado>({
    resolver: zodResolver(CreateAprovadoSchema),
    defaultValues: {
      courseId: selectedAprovado?.course.id.toString() || "",
      institutionId: selectedAprovado?.institution.id.toString() || "",
      institutionLocation: selectedAprovado?.institution_location || "",
      name: selectedAprovado?.name || "",
      phone: selectedAprovado?.phone || "",
      placing: selectedAprovado?.placing ? selectedAprovado.placing + 'º' : "",
      extensaoId: selectedAprovado?.extensao?.id.toString() || "",
      selectionTypeId: selectedAprovado?.selectionType.id.toString() || "",
      poloId: selectedAprovado?.polo.id.toString() || "",
      year: selectedAprovado?.year || "",
    }
  });
  
  const poloId = form.watch("poloId");

  function onSuccess() {
    onSave();
    toast({
      description: "Aprovado editado com sucesso!",
      variant: "success",
    });
    form.reset();
  }

  const [state, editAprovadoFormAction, pending] = useActionState(
    editAprovadoAction,
    createInitialState<EditAprovado>()
  );
  const [submitted, setSubmitted] = useState(false);
  useFormFeedback(state, submitted, onSuccess);

  function onSubmit(data: EditAprovado) {
    setSubmitted(true);
    const formData = new FormData();

    formData.append("name", data.name);
    if (data.phone) formData.append("phone", data.phone);
    formData.append("extensaoId", data.extensaoId);
    formData.append("institutionLocation", data.institutionLocation);
    formData.append("institutionId", data.institutionId);
    formData.append("courseId", data.courseId);
    formData.append("placing", data.placing);
    formData.append("selectionTypeId", data.selectionTypeId);
    formData.append("year", data.year);
    formData.append("poloId", data.poloId);
    formData.append("id", selectedAprovado?.id.toString() || "");

    startTransition(async () => {
      editAprovadoFormAction(formData);
    });
  }
  const fetchExtensoes = async () => {
    if (!poloId) return;

    const response = await fetch(`/polos/extensoes?polo_id=${poloId}`);
    const { data } = await response.json();
    setExtensoes(data);
  };

  const fetchTiposSelecao = async () => {
    const response = await fetch(`/tipos-selecao`);
    const { data } = await response.json();
    setTiposSelecao(data);
  };

  const fetchCursos = async () => {
    const response = await fetch(`/api/cursos`);
    const { data } = await response.json();
    setCursos(data);
  };

  const fetchInstituicoes = async () => {
    const response = await fetch(
      `/api/instituicoes` +
        (instituicaoQuery ? `?${instituicaoQuery.toString()}` : "")
    );
    const { data } = await response.json();

    setInstituicoes(data);
  };

  useEffect(() => {
    fetchInstituicoes();
  }, [instituicaoQuery]);

  useEffect(() => {
    form.resetField("extensaoId");
    fetchExtensoes();
  }, [poloId]);

  useEffect(() => {
    if (tiposSelecao.length > 0) return;
    fetchTiposSelecao();
  }, []);

  useEffect(() => {
    if (cursos.length > 0) return;
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
              placeholder="Ano"
              maxLength={4}
              mask={(value) => value.replace(/\D/g, "")}
            />
            <MyTextField
              control={form.control}
              name="name"
              placeholder="Nome"
              mask={(value) => value.replace(/\d/g, "")}
            />
            <MyTextField
              control={form.control}
              name="phone"
              placeholder="Telefone"
              mask={(value) => {
                let justNumber = value.replace(/\D/g, "");

                if (justNumber.length >= 11)
                  justNumber = justNumber.slice(0, 11);

                const formatted = justNumber
                  .replace(/^(\d{2})(\d)/, "($1) $2")
                  .replace(/(\d{5})(\d)/, "$1-$2");

                return formatted;
              }}
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
            modal={true}
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
            modal={true}
          />
          <MyCombobox
            onInputChange={handleSearch}
            onSelectValue={(value) => {
              const institutionSelected = instituicoes.find((i) => i.id == value);
              const {municipio, uf} = institutionSelected as InstituicaoEnsino;

              if(isValidValue(municipio) && isValidValue(uf)){
                setDisabled(true);
                form.setValue("institutionLocation", `${municipio} - ${uf}`);
                return 
              }

              form.setValue("institutionLocation",'');
              setDisabled(false);
            }}
            label={"Instuição"}
            control={form.control}
            name="institutionId"
            placeholder="Selecione a instituição"
            options={instituicoes.map(({ id, name }) => ({
              label: name,
              value: id.toString(),
            }))}
            modal={true}
          />
          <MyTextField
            control={form.control}
            name="institutionLocation"
            placeholder="Localização da instituição"
            disabled={disabled}
          />
          <MyCombobox
            control={form.control}
            name="courseId"
            label="Curso"
            placeholder="Selecione o curso"
            options={cursos.map(({ id, name }) => ({
              label: name,
              value: id.toString(),
            }))}
            modal={true}
          />
          <div className="w-full flex flex-col gap-4 md:flex-row">
            <MyTextField
              className="flex-1"
              control={form.control}
              name="placing"
              placeholder="Colocação do aprovado"
              maxLength={4}
              mask={(value) => {
                let newValue = value.replace(/\D/g, "").slice(0, 3);
                if (newValue.length > 0 && !newValue.endsWith("º")) {
                  newValue += "º";
                }
                return newValue;
              }}
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
        </div>
        <DialogFooter className="mt-4">
          {pending ? <ButtonLoading /> : <Button type="submit">Salvar</Button>}
        </DialogFooter>
      </form>
    </Form>
  );
}
