import React from 'react';
import { client, urlFor } from '../../../../../sanity/sanity-utils';
import StoreSettingsSection from '@/components/store/StoreSettingsSection';
import Image from 'next/image';

type Props = {
  params: { slug: string };
};
async function getStoreSanityData(slug: string) {
  const query = `*[_type == "store"]{...,"slug":${slug}}`;
  const data = await client.fetch(query);
  return data;
}
async function StoreSettingsPage({ params }: Props) {
  const data = await getStoreSanityData(params.slug);
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
