import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog";
  import { Polo } from "@/types/polo";
import CreateAprovadoForm from "./create-aprovado-form";
  
  interface Props {
    open: boolean;
    polos: Polo[];
    setOpen: (open: boolean) => void
  }
  export default function CreateAprovadoDialog({ polos, open, setOpen }: Props) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[900px]">
          <DialogHeader>
            <DialogTitle>Cadastrar Aluno Aprovado</DialogTitle>
            <DialogDescription>
              Preencha os campos abaixo para cadastrar um novo aprovado.
            </DialogDescription>
          </DialogHeader>
          <CreateAprovadoForm polos={polos} onSave={() => setOpen(false)}/>
        </DialogContent>
      </Dialog>
    );
  }
  