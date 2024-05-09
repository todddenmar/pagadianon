'use client';
import { useAppStore } from '@/lib/store';
import { CollectionType, StoreType } from '@/typings';
import { useParams } from 'next/navigation';
import React from 'react';
import LoadingComponent from '../admin/LoadingComponent.';
import ContainerLayout from '../layouts/ContainerLayout';
import Image from 'next/image';
import { ImageIcon } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '../ui/badge';
import { cn } from '@/lib/utils';
import { Separator } from '../ui/separator';
import CollectionTagsSlider from './CollectionTagsSlider';
import { getAllUniqueTagsFromItems } from '@/helpers/appHelpers';

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
            const tags = store.tags?.split(',');
            return (
              <div
                key={`store-item-${idx}`}
                className="border rounded-lg overflow-hidden group  flex"
              >
                <div className="p-3 w-full flex-1">
                  <div className="flex gap-3 relative">
                    <div className="flex flex-col items-center justify-center relative h-[100px] sm:h-[150px] md:h-[120px] lg:h-[150px] xl:h-[150px] 2xl:h-[150px] aspect-square ">
                      {store.logoURL ? (
                        <Image
                          src={store.logoURL}
                          alt={store.name}
                          width={200}
                          height={200}
                          className="object-contain group-hover:scale-105 transition-all"
                        />
                      ) : (
                        <ImageIcon />
                      )}
                    </div>
                    <div className="flex flex-col flex-1 w-full border-l px-3">
                      <div
                        className={cn('text-sm sm:text-lg   font-semibold ')}
                      >
                        {store.name}
                      </div>
                      <div className="text-sm text-neutral-500 line-clamp-2 md:line-clamp-3">
                        {store.description}
                      </div>
                      <div className="inline-flex gap-2 mt-5 bottom-0 absolute">
                        {tags.map((tag, idx) => (
                          <Badge
                            key={`${store.slug}-tag-${idx}`}
                            className="capitalize"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex w-[40px] border-l bg-neutral-900 text-white flex-col justify-center items-center hover:dark:bg-neutral-400 dark:bg-neutral-300 dark:text-neutral-900 font-bold ">
                  <Link
                    href={`/store/${store.slug}`}
                    className="[writing-mode:vertical-lr] rotate-180 text-center block"
                  >
                    View Store
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </ContainerLayout>
    </div>
  );
}

export default CollectionsSection;
