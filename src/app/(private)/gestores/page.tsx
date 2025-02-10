'use client'
import { gestoresColumns } from "./gestores-columns";
import { DataTable } from "@/components/data-table/data-table";
import { Gestor } from "./types/gestor";
import SearchGestor from "./components/search-gestor";
import CreateGestorDialog from "./components/create-gestor-dialog";
import { useEffect, useState } from "react";
import { Polo } from "@/types/polo";
import { Button } from "@/components/ui/button";

export default function GestoresPage() {
const [isCreateGestorDialogOpen, setIsCreateGestorDialogOpen ] = useState(false)
const [polos, setPolos] = useState<Polo[]>([]);

 const gestores: Gestor[]= [
    {
      id: 1,
      name: "João",
      email: "joao@gmail.com",
      polo: {
        id: 1,
        name: "Polo 1",
      },
      password: '12345',
    },
 ]


  useEffect(() => {
    async function fetchPolosData() {
      const polos = await fetch('/polos').then((res) => res.json());
      setPolos(polos.data);
    }

    fetchPolosData();
  }, []);

  return (
    <div className="w-full">
      <header className="mb-8">
        <h1 className="text-2xl font-semibold mb-2">Gestores</h1>
        <p className="text-gray-600 mb-4 text-sm">
          Gerencie os gestores por aqui!
        </p>
      </header>
      <section className="flex mb-4 gap-4">
        <SearchGestor polos={polos} />
        <Button className="ml-auto" onClick={() => setIsCreateGestorDialogOpen(true)}>Cadastrar Gestor</Button>
        <CreateGestorDialog polos={polos}  open={isCreateGestorDialogOpen} setOpen={setIsCreateGestorDialogOpen}/>
      </section>
      <section>
        <DataTable
            columns={gestoresColumns()}
            data={gestores}
        />
      </section>
    </div>
  );
}
