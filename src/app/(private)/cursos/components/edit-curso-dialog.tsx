import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import EditCursoForm from "./edit-curso-form";
import { Domain } from "@/types/domain";
import { Curso } from "../types/Curso";
  
  interface Props {
    open: boolean;
    tiposCurso: Domain[];
    setOpen: (open: boolean) => void
    revalidate: () => void;
    selectedCurso: Curso | null;
  }
  export default function EditCursoDialog({ tiposCurso, open, setOpen, revalidate, selectedCurso}: Props) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[900px]">
          <DialogHeader>
            <DialogTitle>Editar Curso</DialogTitle>
            <DialogDescription>
              Preencha os campos abaixo para editar um curso.
            </DialogDescription>
          </DialogHeader>
          <EditCursoForm 
            tiposCurso={tiposCurso}    
            selectedCurso={selectedCurso} 
            onSave={() => {
              setOpen(false)
              revalidate()
            }}
          />
        </DialogContent>
      </Dialog>
    );
  }
  