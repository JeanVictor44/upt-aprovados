import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog";
import CreateCursoForm from "./create-curso-form";
import { Domain } from "@/types/domain";
  
interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  revalidate: () => void;
  tiposCurso: Domain[];
}

export default function CreateCursoDialog({ open, setOpen, revalidate, tiposCurso}: Props) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[900px]">
          <DialogHeader>
            <DialogTitle>Cadastrar Curso</DialogTitle>
            <DialogDescription>
              Preencha os campos abaixo para cadastrar um novo curso.
            </DialogDescription>
          </DialogHeader>
          <CreateCursoForm tiposCurso={tiposCurso} onSave={() => {
              setOpen(false)
              revalidate()
            }}
          />
        </DialogContent>
      </Dialog>
    );
  }
  