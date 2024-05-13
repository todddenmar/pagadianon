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
import { ScrollArea } from '@/components/ui/scroll-area';

function DeliveryServiceUsersTable({
  users,
  onEdit,
}: {
  users: any[];
  onEdit: (val: any) => void;
}) {
  return (
    <ScrollArea className="h-[300px] rounded-md border overflow-hidden">
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">No.</TableHead>
            <TableHead>User</TableHead>
            <TableHead>Role</TableHead>
            <TableHead className="text-right"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users?.map((item: any, idx: number) => {
            return (
              <TableRow>
                <TableCell className="font-medium">{idx + 1}</TableCell>
                <TableCell>
                  <div className="text-sm">
                    <div>{item.name}</div>
                    <div className="text-neutral-500">{item.email}</div>
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
    </ScrollArea>
  );
}

export default DeliveryServiceUsersTable;
