import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog";
  import { Polo } from "@/types/polo";
import EditAprovadoForm from "./edit-aprovado-form";
import { Aprovado } from "../types/aprovado";
  
  interface Props {
    open: boolean;
    polos: Polo[];
    setOpen: (open: boolean) => void
    revalidate: () => void;
    selectedAprovado: Aprovado | null;
  }
  export default function EditAprovadoDialog({ polos, open, setOpen, revalidate, selectedAprovado }: Props) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[900px]">
          <DialogHeader>
            <DialogTitle>Editar Aluno Aprovado</DialogTitle>
            <DialogDescription>
              Preencha os campos abaixo para editar um aprovado.
            </DialogDescription>
          </DialogHeader>
          <EditAprovadoForm 
            polos={polos} 
            selectedAprovado={selectedAprovado} 
            onSave={() => {
              setOpen(false)
              revalidate()
            }}
          />
        </DialogContent>
      </Dialog>
    );
  }
  