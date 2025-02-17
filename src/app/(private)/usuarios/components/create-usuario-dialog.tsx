'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import CreateUsuarioForm from "./create-usuario-form";
import { Polo } from "@/types/polo";

interface Props {
  open: boolean;
  polos: Polo[];
  setOpen: (open: boolean) => void
  revalidate: () => void;
}
export default function CreateUsuarioDialog({ polos, open, setOpen, revalidate}: Props) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>Cadastrar Usuário</DialogTitle>
          <DialogDescription>
            Preencha os campos abaixo para cadastrar um novo usuário.
          </DialogDescription>
        </DialogHeader>
        <CreateUsuarioForm polos={polos} onSave={() => {
          setOpen(false)
          revalidate()  
        }}/>
      </DialogContent>
    </Dialog>
  );
}
