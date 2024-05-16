'use client';
import React, { useEffect, useState } from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import Link from 'next/link';
import ContainerLayout from '@/components/layouts/ContainerLayout';
import StoreSettingsTabs from '@/components/store/settings/StoreSettingsTabs';
import { Card } from '@/components/ui/card';
import { useAppStore } from '@/lib/store';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { PlusIcon } from 'lucide-react';
import { Button } from '../../ui/button';
import CreateStoreProductForm from '../forms/CreateStoreProductForm';
import { Separator } from '../../ui/separator';
import NoDataSection from '../../error/NoDataSection';
import { useParams } from 'next/navigation';
import StoreImagesUploader from './StoreImagesUploader';
import StoreImageRemover from './StoreImageRemover';
import { useShallow } from 'zustand/react/shallow';

function StoreSettingsSection() {
  const params = useParams();
  const [isUploading, setIsUploading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentStoreData, setCurrentStoreData] = useAppStore(
    useShallow((state) => [state.currentStoreData, state.setCurrentStoreData])
  );
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  if (!currentStoreData) {
    return (
      <NoDataSection
        title="Store data not found"
        href={`/store/${params.slug}`}
        linkText="Go back to store page"
      />
    );
  }

  return (
    <ContainerLayout>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href={`/`}>Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href={`/store/${currentStoreData.slug}`}>
                {currentStoreData.name}
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Settings</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Card className="p-5 mt-3">
        <div className="grid grid-cols-1 sm:flex justify-between gap-5">
          <div>
            <h4 className="text-2xl font-semibold">Settings</h4>
            <p className="text-sm text-neutral-500">
              Store Settings for {currentStoreData.name}
            </p>
          </div>
          <div className="grid grid-cols-2 md:flex gap-2 md:gap-3">
            <Button onClick={() => setIsDeleting(true)}>Archive Images</Button>
            <Button onClick={() => setIsUploading(true)}>Upload Images</Button>
            <Button
              className="flex space-x-2 "
              onClick={() => setIsAddingProduct(true)}
            >
              <PlusIcon className="h-[16px]" /> Add Product
            </Button>
          </div>
        </div>
        <Separator className="my-5" />
        <div>
          <StoreSettingsTabs />
        </div>
      </Card>

      <Dialog open={isAddingProduct} onOpenChange={setIsAddingProduct}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Creating new product</DialogTitle>
            <DialogDescription>
              This product will only be available on this store.
            </DialogDescription>
          </DialogHeader>
          <CreateStoreProductForm setClose={() => setIsAddingProduct(false)} />
        </DialogContent>
      </Dialog>

      <Dialog open={isUploading} onOpenChange={setIsUploading}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Image Uploader</DialogTitle>
            <DialogDescription>
              Upload all images that this store
            </DialogDescription>
          </DialogHeader>
          <div>
            <StoreImagesUploader setClose={() => setIsUploading(false)} />
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isDeleting} onOpenChange={setIsDeleting}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Archive Images</DialogTitle>
            <DialogDescription>
              These images will not show up on the list
            </DialogDescription>
          </DialogHeader>
          <div>
            <StoreImageRemover setClose={() => setIsDeleting(false)} />
          </div>
        </DialogContent>
      </Dialog>
    </ContainerLayout>
  );
}

export default StoreSettingsSection;
