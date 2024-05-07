import CollectionsSection from '@/components/collections/CollectionsSection';
import { dbGetRootSettings } from '@/helpers/firebaseHelpers';
import { CollectionType } from '@/typings';
import { Metadata, ResolvingMetadata } from 'next';
import React from 'react';
type Props = {
  params: { slug: string };
};

async function fetchAppSettings(): Promise<any | null> {
  const res = await dbGetRootSettings();
  let dbSettings: any = null;
  if (res.status === 'success') {
    dbSettings = res.data;
    return dbSettings;
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
  const appSettings = await fetchAppSettings();
  const collectionData = appSettings.collections?.find(
    (item: CollectionType) => item.slug === params.slug
  );
  return {
    title: `${collectionData?.name} | Pagadianon`,
    description: collectionData?.description,
  };
}
function CollectionPage() {
  return (
    <div>
      <CollectionsSection />
    </div>
  );
}

export default CollectionPage;
