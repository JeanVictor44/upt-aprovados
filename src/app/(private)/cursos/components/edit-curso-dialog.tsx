import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import EditCursoForm from "./edit-curso-form";
import { CreateCurso } from "../types/create-curso";
import { Domain } from "@/types/domain";
  
  interface Props {
    open: boolean;
    tiposCurso: Domain[];
    setOpen: (open: boolean) => void
    revalidate: () => void;
    selectedCurso: CreateCurso | null;
  }
  export default function EditAprovadoDialog({ tiposCurso, open, setOpen, revalidate}: Props) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[900px]">
          <DialogHeader>
            <DialogTitle>Editar Aluno Aprovado</DialogTitle>
            <DialogDescription>
              Preencha os campos abaixo para editar um aprovado.
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
  