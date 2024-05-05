'use client';
import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useAppStore } from '@/lib/store';
import { kSaasTypes } from '@/constants';
import { Card } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontalIcon } from 'lucide-react';
import { StoreType, UserType } from '@/typings';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import LoadingComponent from '../LoadingComponent.';
import UpdateStoreUserForm from '../forms/UpdateStoreUserForm';
import AddStoresForUserForm from '../forms/AddStoresForUserForm';

function UsersTable() {
  const [isEditing, setIsEditing] = useState(false);
  const [isShowingStores, setIsShowingStores] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
  const [currentUsers, currentStores] = useAppStore((state) => [
    state.currentUsers,
    state.currentStores,
  ]);
  if (!currentStores || !currentUsers) {
    return <LoadingComponent />;
  }

  const onEdit = (data: UserType) => {
    setIsEditing(true);
    setSelectedUser(data);
  };
  const onShowStores = (data: UserType) => {
    setIsShowingStores(true);
    setSelectedUser(data);
  };

  return (
    <Card>
      <Table>
        <TableCaption className="pb-5">
          A list of your recent invoices.
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">No.</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead className="text-right"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentUsers?.map((item: UserType, idx: number) => {
            return (
              <TableRow key={`user-item-${idx}`}>
                <TableCell className="font-medium">{idx + 1}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell className="capitalize">{item.roleType}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <MoreHorizontalIcon />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => onShowStores(item)}>
                        Show Stores
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onEdit(item)}>
                        Edit
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>Please fill up all fields</DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <UpdateStoreUserForm
              user={selectedUser}
              setClose={() => setIsEditing(false)}
            />
          )}
        </DialogContent>
      </Dialog>
      <Dialog open={isShowingStores} onOpenChange={setIsShowingStores}>
        {selectedUser && (
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{`${selectedUser.email}`}</DialogTitle>
              <DialogDescription>Assign stores for this user</DialogDescription>
            </DialogHeader>
            <AddStoresForUserForm
              user={selectedUser}
              setClose={() => {
                setIsShowingStores(false);
              }}
            />
          </DialogContent>
        )}
      </Dialog>
    </Card>
  );
}

export default UsersTable;
