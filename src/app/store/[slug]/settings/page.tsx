import React from 'react';
import StoreSettingsSection from '@/components/store/StoreSettingsSection';
type Props = {
  params: { slug: string };
};
import { getStoreSanityData } from '@/lib/queries/sanity';
import { client, urlFor } from '@/lib/client';
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Store Settings | Pagadianon',
  description: 'Settings for a Pagadianon store',
};

async function StoreSettingsPage({ params }: Props) {
  let images: string[] = [];
  try {
    const data = await getStoreSanityData({
      slug: params.slug,
      client: client,
    });
    data.forEach((item: any) => {
      return item.images.forEach((image: any) => {
        const src = urlFor(image).url();
        images.push(src);
      });
    });
  } catch (error) {
    console.log({ error });
  }
  return (
    <div className="relative">
      <StoreSettingsSection sanityImages={images} />
    </div>
  );
}

export default StoreSettingsPage;
