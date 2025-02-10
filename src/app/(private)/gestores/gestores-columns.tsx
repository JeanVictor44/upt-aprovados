import {DataTableColumnHeader} from '@/components/data-table/column-header';
import {ColumnDef} from '@tanstack/react-table';
import {Pencil, Trash} from 'lucide-react';
import {Badge} from '@/components/ui/badge';
import { Gestor } from './types/gestor';
import { Button } from '@/components/ui/button';


export const gestoresColumns: () => ColumnDef<Gestor>[] = () => [
  {
    accessorKey: 'name',
    header: ({column}) => (
      <DataTableColumnHeader column={column} title="Nome" />
    ),
  },
  {
    accessorKey: 'email',
    header: ({column}) => (
      <DataTableColumnHeader column={column} title="E-mail" />
    ),
  },
  {
    accessorKey: 'polo',
    header: ({column}) => (
      <DataTableColumnHeader column={column} title="Polo" />
    ),
    cell(props) {
      const {row} = props;
      return (
        <span>
          <Badge>{row.original.polo.name}</Badge>
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
              console.log('editar', row.original);
            }}>
            <Pencil size={18} />
          </Button>
          <Button variant="outline" size="icon">
            <Trash size={18} />
          </Button>
        </div>
      );
    },
  },
];