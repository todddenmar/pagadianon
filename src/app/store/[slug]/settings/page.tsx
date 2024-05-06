import React from 'react';
import StoreSettingsSection from '@/components/store/StoreSettingsSection';
type Props = {
  params: { slug: string };
};
import { getStoreSanityData } from '@/lib/queries/sanity';
import { client, urlFor } from '@/lib/client';

async function StoreSettingsPage({ params }: Props) {
  const data = await getStoreSanityData({ slug: params.slug, client: client });
  let images: string[] = [];
  data.forEach((item: any) => {
    return item.images.forEach((image: any) => {
      const src = urlFor(image).url();
      images.push(src);
    });
  });
  return (
    <div className="relative">
      <StoreSettingsSection sanityImages={images} />
    </div>
  );
}

export default StoreSettingsPage;
