'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Polo } from "@/types/polo";
import EditUsuarioForm from "./edit-usuario-form";
import { Usuario } from "../types/usuario";

interface Props {
  open: boolean;
  polos: Polo[];
  setOpen: (open: boolean) => void
  revalidate: () => void;
  selectedUsuario: Usuario | null;
}

export default function EditUsuarioDialog({ polos, open, setOpen, revalidate, selectedUsuario}: Props) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>Editar Usuário</DialogTitle>
          <DialogDescription>
            Preencha os campos abaixo para editar o usuário.
          </DialogDescription>
        </DialogHeader>
        <EditUsuarioForm 
            selectedUsuario={selectedUsuario} 
            polos={polos} 
            onSave={() => {
                setOpen(false)
                revalidate()  
            }}
        />
      </DialogContent>
    </Dialog>
  );
}
