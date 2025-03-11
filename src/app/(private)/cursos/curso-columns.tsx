import {DataTableColumnHeader} from '@/components/data-table/column-header';
import {ColumnDef} from '@tanstack/react-table';
import {Pencil} from 'lucide-react';
import {Badge} from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Curso } from './types/Curso';

interface Props {
  onEdit: (curso: Curso) => void;
}

export const cursoColummns: ({}: Props) => ColumnDef<Curso>[] = ({onEdit}: Props) => [
  {
    accessorKey: 'name',
    header: ({column}) => (
      <DataTableColumnHeader column={column} title="Nome" />
    ),
  },
  {
    accessorKey: 'tipo_curso',
    header: ({column}) => (
        <DataTableColumnHeader column={column} title="Modalidade da graduação" />
      ),
      cell(props) {
        const {row} = props;
        return (
          <span>
            <Badge>{row.original?.tipo_curso?.name}</Badge>
          </span>
        );
      },
  },
  {
    accessorKey: 'area_conhecimento',
    header: ({column}) => (
      <DataTableColumnHeader column={column} title="Área do conhecimento" />
    ),
    cell(props) {
      const {row} = props;
      return (
        <span>
          <Badge>{row.original?.area_conhecimento?.name}</Badge>
        </span>
      );
    },
  },
  {
    accessorKey: 'actions',
    header: ({column}) => (
      <DataTableColumnHeader column={column} title="Ações" />
    ),
    cell(props) {
      const {row} = props;
      return (
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            size="icon"
            onClick={() => {
              onEdit(row.original);
            }}>
            <Pencil size={18} />
          </Button>
        </div>
      );
    },
  },
];