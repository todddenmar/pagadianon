'use client';
import React, { useContext, useState } from 'react';
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
import { CheckIcon, MoreHorizontalIcon, XIcon } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { StoreType } from '@/typings';
import UpdateStoreForm from '../forms/UpdateStoreForm';
import { Badge } from '@/components/ui/badge';
import UpdateStoreLogoForm from '../forms/UpdateStoreLogoForm';

import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import LoadingComponent from '../LoadingComponent.';
import Link from 'next/link';

function StoresTable() {
  const [currentStores, currentSettings, setCurrentSettings, setCurrentStores] =
    useAppStore((state) => [
      state.currentStores,
      state.currentSettings,
      state.setCurrentSettings,
      state.setCurrentStores,
    ]);

  const [selectedStore, setSelectedStore] = useState<StoreType | null>(null);
  const [isEditingStore, setIsEditingStore] = useState(false);
  const [isEditingStoreLogo, setIsEditingStoreLogo] = useState(false);

  if (!currentSettings) return <LoadingComponent />;
  if (!currentStores) return <LoadingComponent />;
  const onEditStore = (data: StoreType) => {
    setSelectedStore(data);
    setIsEditingStore(true);
  };
  const onEditStoreLogo = (data: StoreType) => {
    setSelectedStore(data);
    setIsEditingStoreLogo(true);
  };

  const onUpdatePublish = async (store: StoreType, isPublished: boolean) => {
    const updatedSettingsStores = currentSettings?.stores?.map(
      (item: StoreType) =>
        item.id === store.id ? { ...item, isPublished: isPublished } : item
    );
    const updatedSettings = {
      ...currentSettings,
      stores: updatedSettingsStores,
      isPublished: false,
    };
    setCurrentSettings(updatedSettings);
    toast.success(
      isPublished
        ? 'Store published successfully'
        : 'Store unpublished successfully',
      {
        description: 'Publish settings to save updates',
      }
    );
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
            <TableHead className="text-center">Is Published</TableHead>
            <TableHead className="text-right"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentSettings.stores?.map((item: StoreType, idx: number) => {
            const saas = kSaasTypes.find(
              (item2) => item2.slug === item.saasTypeSlug
            );
            const tags = item.tags?.split(',');
            return (
              <TableRow key={`store-item-${idx}`}>
                <TableCell className="font-medium">{idx + 1}</TableCell>
                <TableCell>
                  <Link href={`/store/${item.slug}`}>{item.name}</Link>
                </TableCell>
                <TableCell>{item.slug}</TableCell>
                <TableCell className="capitalize inline-flex flex-wrap gap-2">
                  {tags?.map((tag: string, tagIdx: number) => (
                    <Badge key={`tag-${idx}-${tagIdx}`}>{tag}</Badge>
                  ))}
                </TableCell>
                <TableCell>{saas?.title}</TableCell>

                <TableCell className="flex justify-center">
                  {item.isPublished ? (
                    <div className="flex space-x-2 items-center">
                      <CheckIcon className="h-5 text-green-500" />
                    </div>
                  ) : (
                    <div className={cn('flex space-x-2 items-center')}>
                      <XIcon className="h-5 text-red-500" />
                    </div>
                  )}
                </TableCell>
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
                      <DropdownMenuItem onClick={() => onEditStoreLogo(item)}>
                        Select Logo
                      </DropdownMenuItem>
                      {item.isPublished ? (
                        <DropdownMenuItem
                          onClick={() => onUpdatePublish(item, false)}
                        >
                          Unpublish
                        </DropdownMenuItem>
                      ) : (
                        <DropdownMenuItem
                          onClick={() => onUpdatePublish(item, true)}
                        >
                          Publish
                        </DropdownMenuItem>
                      )}
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
      <Dialog open={isEditingStoreLogo} onOpenChange={setIsEditingStoreLogo}>
        {selectedStore && (
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Store: {`${selectedStore.name}`}</DialogTitle>
              <DialogDescription>Please fill in the blank.</DialogDescription>
            </DialogHeader>
            <UpdateStoreLogoForm
              store={selectedStore}
              setClose={() => setIsEditingStoreLogo(false)}
            />
          </DialogContent>
        )}
      </Dialog>
    </Card>
  );
}

export default StoresTable;
