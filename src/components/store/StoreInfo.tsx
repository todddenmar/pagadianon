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
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

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
              {currentStoreData?.galleryImages ? (
                <Carousel>
                  <CarouselContent>
                    {currentStoreData?.galleryImages?.map(
                      (item: string, idx: number) => {
                        return (
                          <CarouselItem key={`prod-image-${idx}`}>
                            <div className=" aspect-square flex flex-col relative items-center justify-center bg-neutral-900 rounded-md overflow-hidden">
                              <Image
                                src={item}
                                alt={`image-gallery-${idx}`}
                                width={400}
                                height={400}
                                className="object-cover h-full w-full group-hover:scale-105 transition-all"
                              />
                            </div>
                          </CarouselItem>
                        );
                      }
                    )}
                  </CarouselContent>
                  <CarouselPrevious className="ml-8 md:ml-0" />
                  <CarouselNext className="mr-8 md:mr-0" />
                </Carousel>
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
