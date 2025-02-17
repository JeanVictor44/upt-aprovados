import {DataTableColumnHeader} from '@/components/data-table/column-header';
import {ColumnDef} from '@tanstack/react-table';
import {CheckCircle, Pencil, Trash, XCircle} from 'lucide-react';
import {Badge} from '@/components/ui/badge';
import { Usuario } from './types/usuario';
import { Button } from '@/components/ui/button';
import { MyAlertDialog } from '@/components/ui/my-alert-dialog';

interface Props {
  deleteUsuario: (id: string) => void;
  onEdit: (usuario: Usuario) => void;
}

export const gestoresColumns: ({}: Props) => ColumnDef<Usuario>[] = ({deleteUsuario, onEdit}: Props) => [
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
    accessorKey: 'is_admin',
    header: ({column}) => (
      <DataTableColumnHeader column={column} title="Admin" />
    ),
    cell(props) {
      const {row} = props;
      return (
        <span>
          <Badge>{row.original.is_admin ? 'Sim' : 'Não'}</Badge>
        </span>
      );
    },
  },
  {
    accessorKey: 'is_active',
    header: ({column}) => (
      <DataTableColumnHeader column={column} title="Ativo" />
    ),
    cell(props) {
      const {row} = props;
      return (
        <span>
          <Badge variant='outline'>{row.original.is_active ? <CheckCircle className='mr-2 text-sm' fontSize="10px" color='green'/> : <XCircle className='mr-2' color='red'/>}{row.original.is_active ? 'Ativo' : 'Inativo'}</Badge>
        </span>
      )
    }
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

          <MyAlertDialog title='Deletar Usuário' description='Tem certeza que deseja deletar este usuário?' onConfirm={() => deleteUsuario(row.original.id)}>
            <Button variant="outline" size="icon">
              <Trash size={18} />
            </Button>
          </MyAlertDialog>
        </div>
      );
    },
  },
];