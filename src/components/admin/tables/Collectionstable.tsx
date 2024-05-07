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
} from '@/components/ui/dialog';
import { CollectionType, StoreType } from '@/typings';
import UpdateCollectionForm from '../forms/UpdateCollectionForm';
import AddStoresForCollectionForm from '../forms/AddStoresForCollectionForm';

function CollectionsTable() {
  const [currentSettings] = useAppStore((state) => [state.currentSettings]);
  const [selectedCollection, setSelectedCollection] =
    useState<CollectionType | null>(null);
  const [isEditingCollection, setIsEditingCollection] = useState(false);
  const [isEditingCollectionStores, setIsEditingCollectionStores] =
    useState(false);

  const onEditCollection = (data: CollectionType) => {
    setSelectedCollection(data);
    setIsEditingCollection(true);
  };
  const onShowStores = (data: CollectionType) => {
    setSelectedCollection(data);
    setIsEditingCollectionStores(true);
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
            <TableHead className="text-right"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentSettings?.collections?.map(
            (item: CollectionType, idx: string) => {
              return (
                <TableRow key={`store-item-${idx}`}>
                  <TableCell className="font-medium">{idx + 1}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.slug}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <MoreHorizontalIcon />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => onShowStores(item)}>
                          Stores
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => onEditCollection(item)}
                        >
                          Edit
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            }
          )}
        </TableBody>
      </Table>
      <Dialog open={isEditingCollection} onOpenChange={setIsEditingCollection}>
        {selectedCollection && (
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                Edit Collection: {`${selectedCollection.name}`}
              </DialogTitle>
              <DialogDescription>Please fill in the blank.</DialogDescription>
            </DialogHeader>
            <UpdateCollectionForm
              collection={selectedCollection}
              setClose={() => setIsEditingCollection(false)}
            />
          </DialogContent>
        )}
      </Dialog>
      <Dialog
        open={isEditingCollectionStores}
        onOpenChange={setIsEditingCollectionStores}
      >
        {selectedCollection && (
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                Collection Stores: {`${selectedCollection.name}`}
              </DialogTitle>
              <DialogDescription>
                Choose the stores for this collection.
              </DialogDescription>
            </DialogHeader>
            <AddStoresForCollectionForm
              collection={selectedCollection}
              setClose={() => setIsEditingCollectionStores(false)}
            />
          </DialogContent>
        )}
      </Dialog>
    </Card>
  );
}

export default CollectionsTable;
