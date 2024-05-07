'use client';
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import StoreBusinessHoursSection from './StoreBusinessHoursSection';
import { useAppStore } from '@/lib/store';
import Image from 'next/image';
import CustomMapLocation from '../CustomComponents/CustomMapLocation';
import CustomEmailLink from '../CustomComponents/CustomEmailLink';
import CustomMobileLink from '../CustomComponents/CustomMobileLink';
import { ImageIcon } from 'lucide-react';

function StoreInfo() {
  const [tabValue, setTabValue] = useState('info');
  const [currentStoreData] = useAppStore((state) => [state.currentStoreData]);
  const address = currentStoreData?.settings?.address || 'Pagadian City';

  return (
    <div>
      <Tabs
        defaultChecked={true}
        value={tabValue}
        defaultValue="info"
        className="w-full"
        onValueChange={(val) => setTabValue(val)}
      >
        <TabsList>
          <TabsTrigger value="info">Information</TabsTrigger>
          <TabsTrigger value="location">Map Location</TabsTrigger>
        </TabsList>
        <TabsContent value="info">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:items-start">
            <div className="w-full relative rounded-md overflow-hidden bg-neutral-200 dark:bg-neutral-900 aspect-square flex flex-col items-center justify-center">
              {currentStoreData?.settings?.storefrontURL ? (
                <Image
                  src={currentStoreData?.settings?.storefrontURL}
                  alt={`image-selected`}
                  width={600}
                  height={600}
                  className="object-contain object-center h-full w-full"
                />
              ) : (
                <ImageIcon />
              )}
            </div>
            <StoreBusinessHoursSection />
          </div>
        </TabsContent>
        <TabsContent value="location">
          <CustomMapLocation address={address.replaceAll(' ', '+')} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default StoreInfo;
