'use client';
import React from 'react';
import StoresCarousel from './sections/StoresCarousel';
import { useAppStore } from '@/lib/store';
import LoadingComponent from './admin/LoadingComponent.';
import { StoreType } from '@/typings';

function HomePageSlices() {
  const [currentSettings] = useAppStore((state) => [state.currentSettings]);
  if (!currentSettings) return <LoadingComponent />;

  const publishedStores = currentSettings?.stores.filter(
    (item: StoreType) => item.isPublished
  );
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
