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
import StoreSettingsTabs from '@/components/store/StoreSettingsTabs';
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
import { Button } from '../ui/button';
import CreateStoreProductForm from './forms/CreateStoreProductForm';
import { Separator } from '../ui/separator';
import NoDataSection from '../error/NoDataSection';

function StoreSettingsSection() {
  const [currentStoreData] = useAppStore((state) => [state.currentStoreData]);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  if (!currentStoreData) {
    return <NoDataSection title="Store data not found" />;
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
        <div className="flex justify-between space-x-5">
          <div>
            <h4 className="text-2xl font-semibold">Settings</h4>
            <p className="text-sm text-neutral-500">
              Store Settings for {currentStoreData.name}
            </p>
          </div>
          <Button
            className="flex space-x-2"
            onClick={() => setIsAddingProduct(true)}
          >
            <PlusIcon className="h-[16px]" /> Add Product
          </Button>
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
    </ContainerLayout>
  );
}

export default StoreSettingsSection;
