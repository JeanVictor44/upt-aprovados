import { DataTableColumnHeader } from "@/components/data-table/column-header";
import { ColumnDef } from "@tanstack/react-table";
import { Pencil, Trash } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Aprovado } from "./types/aprovado";
import { MyAlertDialog } from "@/components/ui/my-alert-dialog";

interface Props {
  onEdit: (usuario:Aprovado) => void;
  deleteAprovado: (id: number) => void;
}

export const aprovadosColumns: ({}: Props) => ColumnDef<Aprovado>[] = ({onEdit, deleteAprovado}) => [
  {
    accessorKey: "year",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Ano" />
    ),
  },
  {
    accessorKey: "selectionType",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tipo de seleção" />
    ),
    cell(props) {
      const { row } = props;
      return (
        <span>
          {row.original.selectionType.name}
        </span>
      );
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nome" />
    ),
  },
  {
    accessorKey: "phone",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Telefone" />
    ),
  },
  {
    accessorKey: "polo",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Polo" />
    ),
    cell(props) {
      const { row } = props;
      return (
        <span>
          {row.original.polo.name}
        </span>
      );
    },
  },
  {
    accessorKey: "extensao",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Extensão" />
    ),
    cell(props) {
      const { row } = props;
      return (
        <span>
          {row.original.extensao.name}
        </span>
      );
    },
  },
  {
    accessorKey: "course",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Curso" />
    ),
    cell(props) {
      const { row } = props;
      return (
        <span>
          {row.original.course.name}
        </span>
      );
    },
  },
  {
    accessorKey: "institution",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Instituição" />
    ),
    cell(props) {
      const { row } = props;
      return (
        <span>
          {row.original.institution.name}
        </span>
      );
    },
  },
  {
    accessorKey: "placing",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Colocação" />
    ),
    cell(props) {
      const { row } = props;
      return (
        <span>
          <Badge>{row.original.placing}̣°</Badge>
        </span>
      );
    },
  },
  {
    accessorKey: "actions",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Ações" />
    ),
    cell(props) {
      const { row } = props;
      return (
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => {
              onEdit(row.original);
            }}
          >
            <Pencil size={18} />
          </Button>
          <MyAlertDialog title='Deletar Aprovado' description='Tem certeza que deseja deletar este aprovado?' onConfirm={() => deleteAprovado(row.original.id)}>
            <Button variant="outline" size="icon">
              <Trash size={18} />
            </Button>
          </MyAlertDialog>
        </div>
      );
    },
  },
];
