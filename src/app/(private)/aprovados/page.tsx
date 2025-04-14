"use client";

import { aprovadosColumns } from "./aprovados-columns";
import { DataTable } from "@/components/data-table/data-table";
import CreateAprovadoDialog from "./components/create-aprovado-dialog";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Polo } from "@/types/polo";
import { Aprovado } from "./types/aprovado";
import generateStudentsExcel from "@/utils/generate-students-excel";
import EditAprovadoDialog from "./components/edit-aprovado-dialog";
import { toast } from "@/hooks/use-toast";
import SearchAprovado from "./components/search-aprovado";

export default function AprovadosPage() {
  const [isCreateAprovadoDialogOpen, setIsCreateGestorDialogOpen] = useState(false);
  const [isEditAprovadoDialogOpen, setIsEditAprovadoDialogOpen] = useState(false);
  const [polos, setPolos] = useState<Polo[]>([]);
  const [aprovados, setAprovados] = useState<Aprovado[]>([]);
  const [selectedAprovado, setSelectedAprovado] = useState<Aprovado | null>(null);

  useEffect(() => {
    async function fetchPolosData() {
      const polos = await fetch("/polos").then((res) => res.json());
      setPolos(polos.data);
    }

    fetchPolosData();
  }, []);
  
  function deleteAprovado(id: number) {
    fetch(`/aprovados/api/${id}`, {
      method: 'DELETE',
    }).then((res) => {
      if (res.status === 200) {  
        toast({
          description: "Aprovado deletado com sucesso!",
          variant: "success",
        });
        fetchAprovadosByUserPolo();
      }else {
        toast({
          description: "Erro ao deletar usuário!",
          variant: "destructive",
        });
      }
    })
  }

  const fetchAprovadosByUserPolo = async (params?: URLSearchParams) => {
    const response = await fetch(`/polos/usuario/aprovados`  + (params ? `?${params.toString()}` : ""));
    const { data } = await response.json();
    console.log(data)
    setAprovados(data);
  };


  useEffect(() => {
    fetchAprovadosByUserPolo();
  }, []);

  function handleSelectAprovado(aprovado: Aprovado) {
    setSelectedAprovado(aprovado);
    setIsEditAprovadoDialogOpen(true);
  }

  return (
    <div className="w-full">
      <header className="mb-8">
        <h1 className="text-2xl font-semibold mb-2">Alunos Aprovados</h1>
        <p className="text-gray-600 mb-'4 text-sm">
          Gerencie os Alunos por aqui!
        </p>
      </header>
      <section className="flex mb-4 gap-4">
        <SearchAprovado fetchAprovados={fetchAprovadosByUserPolo} />              
        <Button
          className="ml-auto"
          onClick={() => setIsCreateGestorDialogOpen(true)}
        >
          Cadastrar Aluno
        </Button>
        <Button
          onClick={generateStudentsExcel}
        >
          Exportar CSV
        </Button>
        <CreateAprovadoDialog
          open={isCreateAprovadoDialogOpen}
          setOpen={(isOpen) => setIsCreateGestorDialogOpen(isOpen)}
          polos={polos}
          revalidate={fetchAprovadosByUserPolo}
        />
        <EditAprovadoDialog
          open={isEditAprovadoDialogOpen}
          setOpen={(isOpen) => setIsEditAprovadoDialogOpen(isOpen)}
          polos={polos}
          revalidate={fetchAprovadosByUserPolo}
          selectedAprovado={selectedAprovado}
        />
      </section>
      <section>
        <DataTable columns={aprovadosColumns({
          deleteAprovado,
          onEdit: (aprovado) => {
              handleSelectAprovado(aprovado);
            }
          })} 
          data={aprovados} 
        />
      </section>
    </div>
  );
}
