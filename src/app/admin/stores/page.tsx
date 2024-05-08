import StoresTable from '@/components/admin/tables/StoreTables';
import { client, urlFor } from '@/lib/client';
import { getSanityRootData } from '@/lib/queries/sanity';
import React from 'react';

async function AdminStoresPage() {
  const data = await getSanityRootData({ slug: 'logos', client: client });
  console.log({ data });
  let images: string[] = [];
  data.forEach((item: any) => {
    return item.images.forEach((image: any) => {
      const src = urlFor(image).url();
      images.push(src);
    });
  });
  console.log(images);
  return (
    <section className="mt-2 md:mt-5 flex flex-col">
      <StoresTable />
    </section>
  );
}

export default AdminStoresPage;
