"use client";
import { aprovadosColumns } from "./aprovados-columns";
import { DataTable } from "@/components/data-table/data-table";
import CreateAprovadoDialog from "./components/create-aprovado-dialog";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Polo } from "@/types/polo";
import { Aprovado } from "./types/aprovado";
import generateStudentsExcel from "@/utils/generate-students-excel";

export default function AprovadosPage() {
  const [isCreateAprovadoDialogOpen, setIsCreateGestorDialogOpen] =
    useState(false);
  const [polos, setPolos] = useState<Polo[]>([]);
  const [aprovados, setAprovados] = useState<Aprovado[]>([]);

  useEffect(() => {
    async function fetchPolosData() {
      const polos = await fetch("/polos").then((res) => res.json());
      setPolos(polos.data);
    }

    fetchPolosData();
  }, []);

  useEffect(() => {
    const fetchAlunosByUserPolo = async () => {
      const response = await fetch(`/polos/usuario/aprovados`);
      const { data } = await response.json();
      setAprovados(data);
    };

    fetchAlunosByUserPolo();
  }, []);

  return (
    <div className="w-full">
      <header className="mb-8">
        <h1 className="text-2xl font-semibold mb-2">Alunos Aprovados</h1>
        <p className="text-gray-600 mb-4 text-sm">
          Gerencie os Alunos por aqui!
        </p>
      </header>
      <section className="flex mb-4 gap-4">
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
        />
      </section>
      <section>
        <DataTable columns={aprovadosColumns()} data={aprovados} />
      </section>
    </div>
  );
}
