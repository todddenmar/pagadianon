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
import { CheckIcon, LoaderIcon, MoreHorizontalIcon, XIcon } from 'lucide-react';
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
import { AdminStoreContext } from '@/components/providers/AdminStoreContextProvider';
import { getImageURLsFromSanityStoreBySlug } from '@/helpers/appHelpers';
import { dbUpdateProductImages } from '@/helpers/firebaseHelpers';
import { toast } from 'sonner';
import moment from 'moment';
import { cn } from '@/lib/utils';

function StoresTable() {
  const [currentStores, setCurrentStores] = useAppStore((state) => [
    state.currentStores,
    state.setCurrentStores,
  ]);
  const [selectedStore, setSelectedStore] = useState<StoreType | null>(null);
  const [isEditingStore, setIsEditingStore] = useState(false);
  const [isEditingStoreLogo, setIsEditingStoreLogo] = useState(false);
  const sanityStores = useContext(AdminStoreContext);
  const [isSynching, setIsSynching] = useState(false);
  const onEditStore = (data: StoreType) => {
    setSelectedStore(data);
    setIsEditingStore(true);
  };
  const onEditStoreLogo = (data: StoreType) => {
    setSelectedStore(data);
    setIsEditingStoreLogo(true);
  };
  const checkIfImagesSynced = (store: StoreType) => {
    const images = getImageURLsFromSanityStoreBySlug({
      sanityStores: sanityStores,
      slug: store.slug,
    });
    let isNotEqual = true;
    images.forEach((item) => {
      if (!store.images?.includes(item)) {
        isNotEqual = false;
      }
    });
    return isNotEqual;
  };
  const onSyncImages = async (store: StoreType) => {
    setIsSynching(true);
    const images = getImageURLsFromSanityStoreBySlug({
      sanityStores: sanityStores,
      slug: store.slug,
    });
    const res = await dbUpdateProductImages({
      storeID: store.id,
      images: images,
    });
    if (res.status === 'error') {
      console.log(res.error);
      return;
    }
    const updatedStore = { ...store, images: images };
    const updatedStores = currentStores?.map((item) =>
      item.id === store.id ? updatedStore : item
    );
    setCurrentStores(updatedStores);
    toast.success('Stores images synced successfully', {
      description: moment(new Date()).format('LLL'),
    });
    setIsSynching(false);
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
            <TableHead>Sanity Images</TableHead>
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
                <TableCell>
                  {checkIfImagesSynced(item) ? (
                    <div className="flex space-x-2 items-center">
                      <span>Synced</span>
                      <CheckIcon className="h-5 text-green-500" />
                    </div>
                  ) : isSynching ? (
                    <div
                      className={cn(
                        'flex animate-pulse space-x-2 items-center'
                      )}
                    >
                      <span>Synching Images</span>
                      <LoaderIcon className="h-5 animate-spin" />
                    </div>
                  ) : (
                    <div className={cn('flex space-x-2 items-center')}>
                      <span>Not Synced</span>
                      <XIcon className="h-5 text-destructive" />
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
                      {!checkIfImagesSynced(item) && (
                        <DropdownMenuItem
                          onClick={() => onSyncImages(item)}
                          className="flex items-center gap-1"
                        >
                          Sync Images
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
