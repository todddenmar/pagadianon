'use client';
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import StoreBusinessHoursSection from './StoreBusinessHoursSection';
import { useAppStore } from '@/lib/store';
import Image from 'next/image';
import CustomMapLocation from '../CustomComponents/CustomMapLocation';
import { MailIcon, MapPinIcon, SmartphoneIcon } from 'lucide-react';
import CustomEmailLink from '../CustomComponents/CustomEmailLink';
import CustomMobileLink from '../CustomComponents/CustomMobileLink';

function StoreInfo() {
  const [tabValue, setTabValue] = useState('info');
  const [currentStoreData] = useAppStore((state) => [state.currentStoreData]);
  const address = currentStoreData?.settings?.address || 'Pagadian City';
  const coordinates = currentStoreData?.settings?.coordinates;
  const facebookUsername = currentStoreData?.settings?.facebookUsername;
  const instagramUsername = currentStoreData?.settings?.instagramUsername;
  const latitude = coordinates?.split(',')[0].replaceAll(' ', '');
  const longitude = coordinates?.split(',')[1].replaceAll(' ', '');
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
            {currentStoreData?.settings?.storefrontURL && (
              <div className="w-full relative rounded-md overflow-hidden">
                <Image
                  src={currentStoreData?.settings?.storefrontURL}
                  alt={`image-selected`}
                  width={600}
                  height={600}
                  className="object-contain object-center h-full w-full"
                />
              </div>
            )}
            <div className="grid grid-cols-1">
              <StoreBusinessHoursSection />
              <div className="flex-col md:flex-row flex gap-2 justify-between md:items-center py-2">
                <div className="flex flex-col gap-2 text-sm">
                  {currentStoreData?.settings?.email && (
                    <div className="flex space-x-2 items-center hover:text-red-500">
                      <MailIcon className="h-5" />
                      <CustomEmailLink
                        email={currentStoreData?.settings?.email}
                      />
                    </div>
                  )}
                  {currentStoreData?.settings?.mobileNumber && (
                    <div className="flex space-x-2 items-center hover:text-red-500">
                      <SmartphoneIcon className="h-5" />
                      <CustomMobileLink
                        mobileNumber={currentStoreData?.settings?.mobileNumber}
                      />
                    </div>
                  )}
                  {coordinates && (
                    <a
                      target="_blank"
                      href={`https://www.google.com/maps/dir/?api=1&travelmode=driving&layer=traffic&destination=${latitude},${longitude}`}
                      className="flex space-x-2 items-center hover:text-red-500 cursor-pointer"
                    >
                      <MapPinIcon className="h-5" />
                      <span className="flex-1"> {address}</span>
                    </a>
                  )}
                </div>
                <div className="flex flex-col gap-2 text-sm">
                  {facebookUsername && (
                    <a
                      target="_blank"
                      href={`https://www.facebook.com/${facebookUsername}`}
                      className="flex gap-2 items-center hover:text-red-500 cursor-pointer"
                    >
                      <Image
                        src={'/icons/facebook-icon.svg'}
                        alt="facebook icon"
                        width={24}
                        height={24}
                        className="object-contain"
                      />
                      {facebookUsername}
                    </a>
                  )}
                  {instagramUsername && (
                    <a
                      target="_blank"
                      href={`https://www.instagram.com/${instagramUsername}`}
                      className="flex gap-2 items-center hover:text-red-500 cursor-pointer"
                    >
                      <Image
                        src={'/icons/instagram-icon.svg'}
                        alt="instagram icon"
                        width={24}
                        height={24}
                        className="object-contain"
                      />
                      {instagramUsername}
                    </a>
                  )}
                </div>
              </div>
            </div>
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
