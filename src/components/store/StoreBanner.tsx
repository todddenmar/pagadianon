'use client';
import React from 'react';
import ContainerLayout from '../layouts/ContainerLayout';
import {
  ImageIcon,
  MailIcon,
  MapIcon,
  MapPinIcon,
  SmartphoneIcon,
} from 'lucide-react';
import { useAppStore } from '@/lib/store';
import CustomEmailLink from '../CustomComponents/CustomEmailLink';
import CustomMobileLink from '../CustomComponents/CustomMobileLink';
import Image from 'next/image';
import { StoreType } from '@/typings';
import LoadingComponent from '../admin/LoadingComponent.';

function StoreBanner({
  title,
  description,
}: {
  title: string;
  description: string | null | undefined;
}) {
  const [currentStoreData, currentSettings] = useAppStore((state) => [
    state.currentStoreData,
    state.currentSettings,
  ]);
  if (!currentStoreData) return <LoadingComponent />;
  const address = currentStoreData?.settings?.address || 'Pagadian City';
  const coordinates = currentStoreData?.settings?.coordinates;
  const facebookUsername = currentStoreData?.settings?.facebookUsername;
  const instagramUsername = currentStoreData?.settings?.instagramUsername;
  const latitude = coordinates?.split(',')[0].replaceAll(' ', '');
  const longitude = coordinates?.split(',')[1].replaceAll(' ', '');
  const logoURL = currentSettings.stores.find(
    (item: StoreType) => item.id === currentStoreData.id
  ).logoURL;
  return (
    <div className="bg-neutral-100 dark:bg-neutral-900">
      <ContainerLayout>
        <div className="h-auto md:h-[300px] py-5 flex flex-col justify-center text-center md:text-start">
          <div className="flex flex-col items-center md:flex-row gap-5">
            <div className="flex flex-col items-center justify-center relative h-[100px] border rounded-md overflow-hidden aspect-square">
              {logoURL ? (
                <Image
                  src={logoURL}
                  alt={title}
                  width={100}
                  height={100}
                  className="object-cover h-full w-full group-hover:scale-105 transition-all"
                />
              ) : (
                <ImageIcon />
              )}
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold">{title}</h1>
              <p className="mt-2 md:mt-3 md:text-lg">{description}</p>
            </div>
          </div>
          <div className="py-2 md:py-5">
            <div className="grid grid-cols-1 sm:inline-flex justify-between gap-4 text-sm ">
              <div className="flex justify-center gap-4">
                {currentStoreData?.settings?.email && (
                  <CustomEmailLink email={currentStoreData?.settings?.email}>
                    <MailIcon className="h-5" /> Email Us
                  </CustomEmailLink>
                )}
                {currentStoreData?.settings?.mobileNumber && (
                  <CustomMobileLink
                    mobileNumber={currentStoreData?.settings?.mobileNumber}
                  >
                    <SmartphoneIcon className="h-5" />
                    Call Us
                  </CustomMobileLink>
                )}
              </div>
              {coordinates && (
                <a
                  target="_blank"
                  href={`https://www.google.com/maps/dir/?api=1&travelmode=driving&layer=traffic&destination=${latitude},${longitude}`}
                  className="flex justify-center gap-2 items-center hover:dark:text-neutral-300 w-full sm:w-fit pl-2 pr-3 py-2 rounded-md font-bold capitalize"
                >
                  <div className="flex gap-2 items-center">
                    <MapIcon className="h-5" />
                    <span className="flex-1"> Get Direction</span>
                  </div>
                </a>
              )}
            </div>
            <div className="flex justify-center gap-5 text-sm mt-2 md:mt-5 w-full md:w-fit">
              {facebookUsername && (
                <a
                  target="_blank"
                  href={`https://www.facebook.com/${facebookUsername}`}
                  className="flex gap-2 items-center hover:text-red-500 cursor-pointer"
                >
                  <Image
                    src={'/icons/facebook-icon.svg'}
                    alt="facebook icon"
                    width={50}
                    height={50}
                    className="object-contain"
                  />
                  <span className="hidden sm:block">{facebookUsername}</span>
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
                    width={50}
                    height={50}
                    className="object-contain"
                  />
                  <span className="hidden sm:block">{instagramUsername}</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </ContainerLayout>
    </div>
  );
}

export default StoreBanner;
