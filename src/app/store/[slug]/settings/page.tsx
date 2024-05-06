import React from 'react';
import StoreSettingsSection from '@/components/store/StoreSettingsSection';
import { createClient } from '@sanity/client';
type Props = {
  params: { slug: string };
};
import imageUrlBuilder from '@sanity/image-url';
import { getStoreSanityData } from '@/lib/queries/sanity';
export const client = createClient({
  projectId: 'at1yhror',
  dataset: 'production',
  apiVersion: '2022-03-25',
  useCdn: true,
});

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}

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
      <StoreSettingsSection sanityImages={images} data={data} />
    </div>
  );
}

export default StoreSettingsPage;
