import StoresTable from '@/components/admin/tables/StoreTables';
import AdminStoreContextProvider from '@/components/providers/AdminStoreContextProvider';
import { client } from '@/lib/client';
import { getStoresSanityData } from '@/lib/queries/sanity';

async function AdminStoresPage() {
  const data = await getStoresSanityData({ client: client });

  return (
    <AdminStoreContextProvider data={data}>
      <section className="mt-2 md:mt-5 flex flex-col">
        <StoresTable />
      </section>
    </AdminStoreContextProvider>
  );
}

export default AdminStoresPage;
