import { useAppStore } from '@/lib/store';
import React, { useEffect, useState } from 'react';
import LoadingComponent from '../admin/LoadingComponent.';
import { CollectionType, StoreType } from '@/typings';
import { Separator } from '../ui/separator';
import StoreCard from './StoreCard';
import { ScrollArea } from '../ui/scroll-area';
import { cn } from '@/lib/utils';
import { compareIncludesStrings } from '@/helpers/appHelpers';
import CustomPageHeader from '../CustomPageHeader';
import { Input } from '../ui/input';

function AllCollectionsSection() {
  const [currentSettings] = useAppStore((state) => [state.currentSettings]);
  const [selectedCollection, setSelectedCollection] =
    useState<CollectionType | null>(null);
  const [searchInput, setSearchInput] = useState('');
  const [filteredCollections, setFilteredCollections] = useState<
    CollectionType[]
  >([]);

  useEffect(() => {
    if (searchInput.length > 2) {
      let collectionResults: CollectionType[] = [];
      currentSettings?.collections.forEach((item: CollectionType) => {
        if (compareIncludesStrings(item.name, searchInput)) {
          collectionResults.push(item);
        }
      });
      setFilteredCollections(collectionResults);
    } else {
      setFilteredCollections(currentSettings?.collections);
    }
  }, [searchInput, currentSettings]);

  useEffect(() => {
    setSelectedCollection(currentSettings?.collections[0]);
  }, [currentSettings]);
  if (!currentSettings) return <LoadingComponent />;
  return (
    <div>
      <div className="mt-2 md:mt-5">
        <div className="flex flex-col md:flex-row justify-between gap-3 items-center">
          <CustomPageHeader
            title={'Collections'}
            description={'Showing categories for all services and stores.'}
          />
          <div>
            <Input
              placeholder="Search Category"
              value={searchInput}
              onChange={(val) => setSearchInput(val.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="rounded-xl border min-h-[600px] mt-5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:flex md:h-[600px] ">
          <div className="p-2 md:p-5 flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 xl:grid-cols-2 gap-3 md:gap-5 flex-1">
              {filteredCollections?.map((item: CollectionType, idx: number) => {
                return (
                  <button
                    onClick={() => setSelectedCollection(item)}
                    key={`collection-item-${idx}`}
                    className={cn(
                      'border rounded-xl flex p-3 gap-3 justify-start transition-all',
                      selectedCollection?.id === item.id &&
                        'bg-neutral-50 dark:bg-neutral-900'
                    )}
                  >
                    <div className="rounded-xl bg-neutral-100 dark:bg-neutral-700 w-[100px] h-full"></div>
                    <div className="flex flex-1 flex-col gap-5 justify-between h-full">
                      <div className="text-start">
                        <div className="text-sm lg:text-base">{item.name}</div>
                        <p className="text-xs lg:text-sm text-neutral-500 h-[32px] lg:h-[40px]">
                          {item.description}
                        </p>
                      </div>
                      <div className="flex justify-between">
                        <div className="text-xs  flex flex-col items-center">
                          <div className="font-semibold dark:text-neutral-500 uppercase">
                            Stores:
                          </div>
                          <div className="text-lg">{item.stores?.length}</div>
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
          <div className="max-w-lg w-full h-full hidden md:block md:border-l">
            <ScrollArea className="h-[600px] p-5">
              <div className="grid grid-cols-1 gap-3 md:gap-5">
                {selectedCollection?.stores?.map((item, idx) => {
                  return (
                    <StoreCard
                      key={`store-item-${idx}`}
                      store={currentSettings?.stores?.find(
                        (store: StoreType) => store.id === item
                      )}
                    />
                  );
                })}
              </div>
            </ScrollArea>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllCollectionsSection;
