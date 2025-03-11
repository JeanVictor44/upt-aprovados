"use client";

import { DataTable } from "@/components/data-table/data-table";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { createClient } from "@/utils/supabase/client";
import { redirect } from "next/navigation";
import { Curso } from "./types/Curso";
import CreateCursoDialog from "./components/create-curso-dialog";
import { Domain } from "@/types/domain";
import EditCursoDialog from "./components/edit-curso-dialog";
import { cursoColummns } from "./curso-columns";
import SearchCurso from "./components/search-curso";

export default function UsuariosPage() {
  const [isCreateCursoOpen, setIsCreateCursoOpen] = useState(false);
  const [tiposCurso, setTiposCurso] = useState<Domain[]>([]);
  const [isEditCursoOpen, setIsEditCursoOpen] = useState(false);
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [selectedCurso, setSelectedCurso] = useState<Curso | null>(null);

  const supabase = createClient();

  useEffect(() => {
    (async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user?.user_metadata.is_admin) {
        toast({
          description:
            "Você não tem permissão para acessar a página de cursos!",
          variant: "destructive",
        });
        redirect("/aprovados");
      }
    })();
  }, []);

  async function fetchCursos(params?: URLSearchParams) {
    const cursos = await fetch(
      "/api/cursos" + (params ? `?${params.toString()}` : "")
    ).then((res) => res.json());
    setCursos(cursos.data);
  }

  async function fetchTiposCurso() {
    const tiposCurso = await fetch("/api/tipos-curso").then((res) => res.json());
    setTiposCurso(tiposCurso.data);
  }

  function deleteCurso(id: number) {
    fetch(`/api/curso/${id}`, {
      method: "DELETE",
    }).then((res) => {
      if (res.status === 200) {
        toast({
          description: "Curso deletado com sucesso!",
          variant: "success",
        });
        fetchCursos();
      } else {
        toast({
          description: "Erro ao deletar curso!",
          variant: "destructive",
        });
      }
    });
  }

  function handleSelectCurso(curso: Curso) {
    setSelectedCurso(curso);
    setIsEditCursoOpen(true);
  }

  useEffect(() => {
    fetchCursos();
  }, []);

  useEffect(() => {
    fetchTiposCurso();
  }, []);

  return (
    <div className="w-full">
      <header className="mb-8">
        <h1 className="text-2xl font-semibold mb-2">Cursos</h1>
        <p className="text-gray-600 mb-4 text-sm">
          Gerencie os cursos por aqui!
        </p>
      </header>
      <section className="flex mb-4 gap-4">
        <SearchCurso tiposCurso={tiposCurso} fetchCursos={fetchCursos} />
        <Button className="ml-auto" onClick={() => setIsCreateCursoOpen(true)}>
          Cadastrar Curso
        </Button>
      </section>
      <section>
        <DataTable
          columns={cursoColummns({
            deleteCurso,
            onEdit: handleSelectCurso,
          })}
          data={cursos}
        />
      </section>

      <CreateCursoDialog
        tiposCurso={tiposCurso}
        open={isCreateCursoOpen}
        setOpen={(isOpen) => setIsCreateCursoOpen(isOpen)}
        revalidate={fetchCursos}
      />
      <EditCursoDialog
        tiposCurso={tiposCurso}
        open={isEditCursoOpen}
        selectedCurso={selectedCurso}
        setOpen={(isOpen) => setIsEditCursoOpen(isOpen)}
        revalidate={fetchCursos}
      />
    </div>
  );
}
