'use client';
import { useAppStore } from '@/lib/store';
import { CollectionType, StoreType } from '@/typings';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import LoadingComponent from '../admin/LoadingComponent.';
import ContainerLayout from '../layouts/ContainerLayout';
import CustomTagsSlider from '../CustomComponents/CustomTagsSlider';
import {
  compareEqualStrings,
  compareIncludesStrings,
  getAllUniqueTagsFromItems,
} from '@/helpers/appHelpers';
import StoreCard from './StoreCard';
import CustomPageHeader from '../CustomPageHeader';
import { Input } from '../ui/input';

function CollectionsSection() {
  const { slug } = useParams();
  const [currentSettings] = useAppStore((state) => [state.currentSettings]);
  const [filteredStores, setFilteredStores] = useState<StoreType[] | null>(
    null
  );
  const [tagSelected, setTagSelected] = useState('all');
  const [searchInput, setSearchInput] = useState('');

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

  useEffect(() => {
    if (searchInput.length > 2) {
      let productResults: StoreType[] = [];
      stores.forEach((item) => {
        console.log({ item });
        if (compareIncludesStrings(item.name, searchInput)) {
          productResults.push(item);
        }
      });
      setFilteredStores(productResults);
    } else {
      setFilteredStores(stores);
    }
  }, [searchInput]);

  useEffect(() => {
    if (tagSelected === 'all') {
      setFilteredStores(stores);
    } else {
      let productResults: StoreType[] = [];
      stores.forEach((item) => {
        item.tags?.split(',').forEach((tag: string) => {
          if (compareEqualStrings(tag, tagSelected)) {
            productResults.push(item);
          }
        });
      });
      setFilteredStores(productResults);
    }
  }, [tagSelected]);
  if (!currentSettings) return <LoadingComponent />;

  const tags = getAllUniqueTagsFromItems(stores);
  return (
    <div>
      <ContainerLayout>
        <div className="mt-2 md:mt-5">
          <div className="flex flex-col md:flex-row justify-between gap-3 items-center">
            <CustomPageHeader
              title={collection.name}
              description={collection.description}
            />
            <div>
              <Input
                placeholder="Search Store"
                value={searchInput}
                onChange={(val) => setSearchInput(val.target.value)}
              />
            </div>
          </div>
          <div className="py-5">
            <CustomTagsSlider
              tags={tags}
              value={tagSelected}
              onChange={(val: string) => setTagSelected(val)}
            />
          </div>
        </div>
        <div className="p-2 md:p-5 rounded-xl border min-h-[600px]">
          <div className="grid grid-cols-1 gap-2 md:gap-5 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 ">
            {filteredStores?.map((store: StoreType, idx: number) => {
              return <StoreCard key={`store-item-${idx}`} store={store} />;
            })}
          </div>
        </div>
      </ContainerLayout>
    </div>
  );
}

export default CollectionsSection;
