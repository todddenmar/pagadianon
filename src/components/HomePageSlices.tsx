'use client';
import React from 'react';
import StoresCarousel from './sections/StoresCarousel';
import { useAppStore } from '@/lib/store';
import { StoreType } from '@/typings';
import { Skeleton } from '@/components/ui/skeleton';
import ContainerLayout from './layouts/ContainerLayout';
function HomePageSlices() {
  const [currentSettings] = useAppStore((state) => [state.currentSettings]);
  if (!currentSettings)
    return (
      <div className="py-5">
        <ContainerLayout>
          <div>
            <Skeleton className="w-[200px] h-[28px] md:h-[32px] rounded-full" />
            <Skeleton className="w-[300px] h-[20px] rounded-full mt-3" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-5 gap-2">
            <Skeleton className="w-full h-[126px] md:h-[174px] rounded-xl" />
            <Skeleton className="w-full h-[126px] md:h-[174px] rounded-xl" />
            <Skeleton className="w-full h-[126px] md:h-[174px] rounded-xl" />
          </div>
        </ContainerLayout>
      </div>
    );

  const publishedStores = currentSettings?.stores?.filter(
    (item: StoreType) => item.isFeatured
  );
  if (!publishedStores) return null;
  return (
    <div>
      <div className="py-5">
        <StoresCarousel
          title="Featured Stores"
          description="These are the stores we recommend"
          items={publishedStores}
        />
      </div>
    </div>
  );
}

export default HomePageSlices;
