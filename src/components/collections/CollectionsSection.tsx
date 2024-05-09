'use client';
import { useAppStore } from '@/lib/store';
import { CollectionType, StoreType } from '@/typings';
import { useParams } from 'next/navigation';
import React from 'react';
import LoadingComponent from '../admin/LoadingComponent.';
import ContainerLayout from '../layouts/ContainerLayout';
import CollectionTagsSlider from './CollectionTagsSlider';
import { getAllUniqueTagsFromItems } from '@/helpers/appHelpers';
import StoreCard from './StoreCard';

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
  const tags = getAllUniqueTagsFromItems(stores);
  return (
    <div>
      <ContainerLayout>
        <CollectionTagsSlider tags={tags} />
        <div className="grid grid-cols-1 gap-2 md:gap-5 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
          {stores?.map((store: StoreType, idx: number) => {
            return <StoreCard key={`store-item-${idx}`} store={store} />;
          })}
        </div>
      </ContainerLayout>
    </div>
  );
}

export default CollectionsSection;
