'use client';
import React from 'react';
import ContainerLayout from '../layouts/ContainerLayout';
import {
  ImageIcon,
  MailIcon,
  SmartphoneIcon,
} from 'lucide-react';
import { useAppStore } from '@/lib/store';
import CustomEmailLink from '../CustomComponents/CustomEmailLink';
import CustomMobileLink from '../CustomComponents/CustomMobileLink';
import Image from 'next/image';
import { StoreType } from '@/typings';
import { Skeleton } from '../ui/skeleton';
import { Button } from '../ui/button';
import Link from 'next/link';

function StoreBanner({
  title,
  description,
  isManager,
}: {
  title: string;
  description: string | null | undefined;
  isManager?: boolean;
}) {
  const [currentStoreData, currentSettings] = useAppStore((state) => [
    state.currentStoreData,
    state.currentSettings,
  ]);
  if (!currentStoreData || !currentSettings)
    return <Skeleton className="rounded-lg h-auto md:h-[300px] w-full" />;

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
            {isManager ? (
              <Button asChild>
                <Link href={`/store/${currentStoreData.slug}`}>Go to Page</Link>
              </Button>
            ) : (
              <div className="grid grid-cols-1 sm:inline-flex justify-between gap-4 text-sm ">
                <div className="flex justify-center gap-4">
                  {currentStoreData?.settings?.email && (
                    <CustomEmailLink email={currentStoreData?.settings?.email}>
                      <MailIcon className="h-[16px]" /> Email Us
                    </CustomEmailLink>
                  )}
                  {currentStoreData?.settings?.mobileNumber && (
                    <CustomMobileLink
                      mobileNumber={currentStoreData?.settings?.mobileNumber}
                    >
                      <SmartphoneIcon className="h-[16px]" />
                      Call Us
                    </CustomMobileLink>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </ContainerLayout>
    </div>
  );
}

export default StoreBanner;
