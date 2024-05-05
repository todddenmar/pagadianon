import { dbGetStoreData } from '@/helpers/firebaseHelpers';
import { StoreType } from '@/typings';
import React from 'react';

import type { Metadata, ResolvingMetadata } from 'next';
import Head from 'next/head';
import StoreBanner from '@/components/store/StoreBanner';
import ContainerLayout from '@/components/layouts/ContainerLayout';
import LoadingComponent from '@/components/admin/LoadingComponent.';
import StoreSection from '@/components/store/StoreSection';
import StoreDataProvider from '@/components/store/StoreDataProvider';

type Props = {
  params: { slug: string };
};

export async function fetchStoreData({
  params,
}: Props): Promise<StoreType | null> {
  const res = await dbGetStoreData(params.slug);
  let dbStoreData: StoreType | null = null;
  if (res.status === 'success') {
    dbStoreData = res.data;
    return dbStoreData;
  } else {
    console.error(res.error);
    return null;
  }
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const storeData = await fetchStoreData({ params });

  return {
    title: `${storeData?.name} | Pagadianon`,
    description: storeData?.description,
  };
}

export default async function StoreTemplatePage({ params }: Props) {
  const storeData = await fetchStoreData({ params });
  // Generate metadata using dbStoreData
  if (!storeData) {
    return <LoadingComponent />;
  }
  return (
    <div>
      <StoreDataProvider data={storeData} />
      <StoreBanner title={storeData.name} description={storeData.description} />
      <StoreSection />
    </div>
  );
}
