import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import CreateGestorForm from "./create-gestor-form";
import { Polo } from "@/types/polo";

interface Props {
  open: boolean;
  polos: Polo[];
  setOpen: (open: boolean) => void
}
export default function CreateGestorDialog({ polos, open, setOpen }: Props) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Cadastrar Gestor</DialogTitle>
          <DialogDescription>
            Preencha os campos abaixo para cadastrar um novo gestor.
          </DialogDescription>
        </DialogHeader>
        <CreateGestorForm polos={polos} onSave={() => setOpen(false)}/>
      </DialogContent>
    </Dialog>
  );
}
