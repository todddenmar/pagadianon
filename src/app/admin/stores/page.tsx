import StoresTable from '@/components/admin/tables/StoreTables';
import AdminStoreContextProvider from '@/components/providers/AdminStoreContextProvider';
import { client, urlFor } from '@/lib/client';
import { getSanityAdminData } from '@/lib/queries/sanity';

async function AdminStoresPage() {
  const data = await getSanityAdminData({ slug: 'logos', client: client });
  let images: string[] | null = [];
  data.forEach((item: any) => {
    return item.images.forEach((image: any) => {
      const src = urlFor(image).url();
      images.push(src);
    });
  });
  return (
    <AdminStoreContextProvider images={images}>
      <section className="mt-2 md:mt-5 flex flex-col">
        <StoresTable />
      </section>
    </AdminStoreContextProvider>
  );
}

export default AdminStoresPage;
