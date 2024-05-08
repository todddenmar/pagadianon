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
        <div className="grid grid-cols-2 gap-2 md:gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {stores?.map((store: StoreType, idx: number) => {
            const tags = store.tags?.split(',');
            return (
              <Link
                href={`/store/${store.slug}`}
                key={`store-item-${idx}`}
                className="border rounded-lg overflow-hidden group"
              >
                <div className="flex flex-col items-center justify-center relative w-full aspect-square">
                  {store.logoURL ? (
                    <Image
                      src={store.logoURL}
                      alt={store.name}
                      width={200}
                      height={200}
                      className="object-cover h-full w-full group-hover:scale-105 transition-all"
                    />
                  ) : (
                    <ImageIcon />
                  )}
                </div>
                <div>
                  <div
                    className={cn(
                      'text-sm xl:text-base font-semibold h-[40px] flex flex-col items-center justify-center'
                    )}
                  >
                    {store.name}
                  </div>
                  <Separator />
                  <div className="p-3">
                    <div className="line-clamp-1 text-sm text-neutral-500 h-[20px] ">
                      {store.description}
                    </div>
                    <div className="inline-flex gap-2 mt-2">
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
              </Link>
            );
          })}
        </div>
      </ContainerLayout>
    </div>
  );
}

export default CollectionsSection;
