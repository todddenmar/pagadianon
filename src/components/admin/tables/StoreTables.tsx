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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { StoreType } from '@/typings';
import UpdateStoreForm from '../forms/UpdateStoreForm';
import { Badge } from '@/components/ui/badge';

function StoresTable() {
  const [currentStores] = useAppStore((state) => [state.currentStores]);
  const [selectedStore, setSelectedStore] = useState<StoreType | null>(null);
  const [isEditingStore, setIsEditingStore] = useState(false);

  const onEditStore = (data: StoreType) => {
    setSelectedStore(data);
    setIsEditingStore(true);
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
            <TableHead>Name</TableHead>
            <TableHead>Slug</TableHead>
            <TableHead>Tags</TableHead>
            <TableHead>SaaS Type</TableHead>
            <TableHead className="text-right"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentStores?.map((item, idx) => {
            const saas = kSaasTypes.find(
              (item2) => item2.slug === item.saasTypeSlug
            );
            const tags = item.tags?.split(',');
            return (
              <TableRow key={`store-item-${idx}`}>
                <TableCell className="font-medium">{idx + 1}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.slug}</TableCell>
                <TableCell className="capitalize inline-flex flex-wrap gap-2">
                  {tags?.map((tag: string, tagIdx: number) => (
                    <Badge key={`tag-${idx}-${tagIdx}`}>{tag}</Badge>
                  ))}
                </TableCell>
                <TableCell>{saas?.title}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <MoreHorizontalIcon />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => onEditStore(item)}>
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
      <Dialog open={isEditingStore} onOpenChange={setIsEditingStore}>
        {selectedStore && (
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Store: {`${selectedStore.name}`}</DialogTitle>
              <DialogDescription>Please fill in the blank.</DialogDescription>
            </DialogHeader>
            <UpdateStoreForm
              store={selectedStore}
              setClose={() => setIsEditingStore(false)}
            />
          </DialogContent>
        )}
      </Dialog>
    </Card>
  );
}

export default StoresTable;
