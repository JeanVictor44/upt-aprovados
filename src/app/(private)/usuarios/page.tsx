"use client";

import { gestoresColumns } from "./usuarios-columns";
import { DataTable } from "@/components/data-table/data-table";
import { Usuario } from "./types/usuario";
import SearchUsuario from "./components/search-usuario";
import CreateUsuarioDialog from "./components/create-usuario-dialog";
import EditUsuarioDialog from "./components/edit-usuario-dialog";
import { useEffect, useState } from "react";
import { Polo } from "@/types/polo";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { createClient } from "@/utils/supabase/client";
import { redirect } from "next/navigation";

export default function UsuariosPage() {
  const [isCreateUsuarioDialog, setIsCreateUsuarioDialog] = useState(false);
  const [isEditUsuarioDialog, setIsEditUsuarioDialog] = useState(false);
  const [polos, setPolos] = useState<Polo[]>([]);
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [selectedUsuario, setSelectedUsuario] = useState<Usuario | null>(null);

  const supabase = createClient();

  useEffect(() => {
    (async() => {
      const {data: {user}} = await supabase.auth.getUser()
      if (!user?.user_metadata.is_admin) {
        toast({
          description: "Você não tem permissão para acessar a página de usuários!",
          variant: "destructive",
        })
        redirect('/aprovados')
      }
    })()
  },[])

  async function fetchUsuarios(params?: URLSearchParams) {
    const usuarios = await fetch("/usuarios/api" + (params ? `?${params.toString()}` : "")).then((res) => res.json());
    setUsuarios(usuarios.data);
  }
  async function fetchPolosData() {
    const polos = await fetch("/polos").then((res) => res.json());
    setPolos(polos.data);
  }

  function deleteUsuario(id: string) {
    fetch(`/usuarios/api/${id}`, {
      method: 'DELETE',
    }).then((res) => {
      if (res.status === 200) {  
        toast({
          description: "Usuário deletado com sucesso!",
          variant: "success",
        });
        fetchUsuarios();
      }else {
        toast({
          description: "Erro ao deletar usuário!",
          variant: "destructive",
        });
      }
    })
  }

  function handleSelectUsuario(usuario: Usuario) {
    setSelectedUsuario(usuario);
    setIsEditUsuarioDialog(true);
  }

  useEffect(() => {
    fetchUsuarios();
    fetchPolosData();
  }, []);

  return (
    <div className="w-full">
      <header className="mb-8">
        <h1 className="text-2xl font-semibold mb-2">Usuarios</h1>
        <p className="text-gray-600 mb-4 text-sm">
          Gerencie os usuários por aqui!
        </p>
      </header>
      <section className="flex mb-4 gap-4">
        <SearchUsuario polos={polos} fetchUsuarios={fetchUsuarios} />
        <Button
          className="ml-auto"
          onClick={() => setIsCreateUsuarioDialog(true)}
        >
          Cadastrar Usuário
        </Button>
      </section>
      <section>
        <DataTable 
          columns={gestoresColumns({
            deleteUsuario,
            onEdit: handleSelectUsuario,     
          })} 
          data={usuarios} 
        />
      </section>
        
      <CreateUsuarioDialog
          polos={polos}
          open={isCreateUsuarioDialog}
          setOpen={setIsCreateUsuarioDialog}
          revalidate={fetchUsuarios}
        />
        <EditUsuarioDialog
          polos={polos}
          open={isEditUsuarioDialog}
          setOpen={setIsEditUsuarioDialog}
          revalidate={fetchUsuarios}
          selectedUsuario={selectedUsuario}
        />
    </div>
  );
}
