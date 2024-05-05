import StoresTable from '@/components/admin/tables/StoreTables';
import React from 'react';

function AdminStoresPage() {
  return (
    <section className="mt-2 md:mt-5 flex flex-col">
      <StoresTable />
    </section>
  );
}

export default AdminStoresPage;
