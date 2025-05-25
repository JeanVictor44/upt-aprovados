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
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
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
import { Curso } from "@/types/curso";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Props {
  onSave: () => void;
  polos: Polo[];
  selectedAprovado: Aprovado | null;
}


const genderOptions = {
  cis: [
    { label: "Masculino", value: "masculino-cis" },
    { label: "Feminino", value: "feminino-cis" },
    { label: "Outros", value: "outros-cis" },
  ],
  trans: [
    { label: "Masculino", value: "masculino-trans" },
    { label: "Feminino", value: "feminino-trans" },
    { label: "Binário", value: "binario-trans" },  
    { label: "Não binário", value: "nao-binario" },
  ]
}


export default function EditAprovadoForm({ onSave, polos, selectedAprovado}: Props) {
  const [extensoes, setExtensoes] = useState<Domain[]>([]);
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [tiposSelecao, setTiposSelecao] = useState<Domain[]>([]);
  const [instituicoes, setInstituicoes] = useState<InstituicaoEnsino[]>([]);
  const [instituicaoQuery, setInstituicaoQuery] = useState(
    new URLSearchParams('?query=' + selectedAprovado?.institution.name)
  );
  const [municipios, setMunicipios] = useState<{id: number, name: string}[]>([]);
  const [municipioQuery, setMunicipioQuery] = useState(
    new URLSearchParams('?query=' + selectedAprovado?.institution_location)
  );
  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(instituicaoQuery);

    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    setInstituicaoQuery(params);
  }, 500);

  const handleSearchMunicipio = useDebouncedCallback(async(term: string) => {
    const params = new URLSearchParams(municipioQuery);

    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    setMunicipioQuery(params);
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
      gender: selectedAprovado?.gender || "",
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
    if(data.placing) formData.append("placing", data.placing);
    formData.append("selectionTypeId", data.selectionTypeId);
    formData.append("year", data.year);
    formData.append("poloId", data.poloId);
    formData.append("id", selectedAprovado?.id.toString() || "");
    formData.append("gender", data.gender);

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

  const fetchMunicpios = async () => {
    const response = await fetch(
      `/api/municipios` +
        (municipioQuery ? `?${municipioQuery.toString()}` : "")
    );
    const { data } = await response.json();

    setMunicipios(data);
  };

  useEffect(() => {
    fetchInstituicoes();
  }, [instituicaoQuery]);

  useEffect(() => {
    fetchMunicpios();
  }, [municipioQuery]);
  
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
              placeholder="Edição"
              maxLength={4}
              mask={(value) => value?.replace(/\D/g, "")}
            />
            <MyTextField
              control={form.control}
              name="name"
              placeholder="Nome"
              mask={(value) => value?.replace(/\d/g, "")}
            />
            <MyTextField
              control={form.control}
              name="phone"
              placeholder="Telefone"
              mask={(value) => {
                let justNumber = value?.replace(/\D/g, "");

                if (justNumber.length >= 11)
                  justNumber = justNumber?.slice(0, 11);

                const formatted = justNumber
                  ?.replace(/^(\d{2})(\d)/, "($1) $2")
                  ?.replace(/(\d{5})(\d)/, "$1-$2");

                return formatted;
              }}
            />
          </div>


          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem className="space-y-3">
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Identidade de gênero" />
                      </SelectTrigger>
                    </FormControl>
                  <SelectContent >
                    <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide border-b">
                      Cisgênero
                    </div>
                    {
                      genderOptions.cis.map((option) => (
                        <SelectItem className="cursor-pointer" key={option.value} value={option.value}>
                          <span className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground">Cis</span>
                            <span>{option.label}</span>
                          </span>
                        </SelectItem>
                      ))
                    }
                    <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide border-b mt-2">
                      Transgênero
                    </div>
                    {
                      genderOptions.trans.map((option) => (

                        <SelectItem className="cursor-pointer" key={option.value} value={option.value}>
                          <span className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground">Trans</span>
                            <span>{option.label}</span>
                          </span>
                        </SelectItem>
                      ))
                    }
                    <div className="border-t mt-2 pt-2">
                      <SelectItem value='nao-informado'>Não informado</SelectItem>
                    </div>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
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
            label={"Instuição"}
            control={form.control}
            name="institutionId"
            placeholder="Selecione a instituição"
            options={instituicoes?.map(({ id, name }) => ({
              label: name,
              value: id.toString(),
            }))}
            modal={true}
          />
            <MyCombobox
            onInputChange={handleSearchMunicipio}
            label={"Local da instituição"}
            control={form.control}
            name="institutionLocation"
            placeholder="Selecione o local da instituição"
            options={municipios.map((municipio) => ({
              label: municipio.name,
              value: municipio.name.toString(),
            }))}
            modal={true}
          />
          <MyCombobox
            control={form.control}
            name="courseId"
            label="Curso"
            placeholder="Selecione o curso"
            options={cursos.map(({ id, name, tipo_curso }) => ({
              label: `${tipo_curso.name} em ${name}`,
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
