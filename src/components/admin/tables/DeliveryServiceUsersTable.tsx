import React from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { EditIcon } from 'lucide-react';

function DeliveryServiceUsersTable({
  users,
  onEdit,
}: {
  users: any[];
  onEdit: (val: any) => void;
}) {
  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>User</TableHead>
          <TableHead>Role</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users?.map((item: any, idx: number) => {
          return (
            <TableRow key={`delivery-user-item-${idx}`}>
              <TableCell>
                <div className="text-sm">
                  <div>{item.name}</div>
                  <div className="text-neutral-500">{item.email}</div>
                  {item.mobileNumber && (
                    <div className="text-neutral-500">
                      <a
                        className="text-highlight"
                        href={`tel:+63${item.mobileNumber}`}
                      >
                        +63{item.mobileNumber}
                      </a>
                    </div>
                  )}
                </div>
              </TableCell>
              <TableCell className="capitalize">{item.roleType}</TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" onClick={() => onEdit(item)}>
                  <EditIcon className="h-5" />
                </Button>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}

export default DeliveryServiceUsersTable;
