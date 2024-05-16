import StoresTable from '@/components/admin/tables/StoreTables';
import AdminStoreContextProvider from '@/components/providers/AdminStoreContextProvider';

async function AdminStoresPage() {
  const data: any[] = [];

  return (
    <AdminStoreContextProvider data={data}>
      <section className="mt-2 md:mt-5 flex flex-col">
        <StoresTable />
      </section>
    </AdminStoreContextProvider>
  );
}

export default AdminStoresPage;
