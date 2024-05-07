'use client';
import { useAppStore } from '@/lib/store';
import { CollectionType, StoreType } from '@/typings';
import { useParams } from 'next/navigation';
import React from 'react';
import LoadingComponent from '../admin/LoadingComponent.';
import ContainerLayout from '../layouts/ContainerLayout';

function CollectionsSection() {
  const { slug } = useParams();
  const [currentSettings] = useAppStore((state) => [state.currentSettings]);
  if (!currentSettings) return <LoadingComponent />;
  const collection = currentSettings?.collections.find(
    (item: CollectionType) => item.slug === slug
  );
  const stores: StoreType[] = [];
  collection?.stores.forEach((item: string) => {
    const res = currentSettings.stores.find(
      (storeItem: StoreType) => storeItem.id === item
    );
    stores.push(res);
  });
  return (
    <div>
      <ContainerLayout>
        <div className="grid grid-cols-2 gap-2 md:gap-5 sm:grid-cols-4 md:grid-cols-6">
          {stores?.map((store: StoreType, idx: number) => {
            return (
              <a href={`/store/${store.slug}`} key={`store-item-${idx}`}>
                <div className="border rounded-lg p-5">{store.name}</div>
              </a>
            );
          })}
        </div>
      </ContainerLayout>
    </div>
  );
}

export default CollectionsSection;
