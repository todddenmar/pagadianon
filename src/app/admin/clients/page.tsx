import AdminTitle from '@/components/admin/AdminTitle';
import ClientTables from '@/components/admin/tables/ClientTables';
import React from 'react';

function AdminClientsPage() {
  return (
    <div>
      <AdminTitle text={'Clients'} />
      <section className="mt-2 md:mt-5 flex flex-col">
        <ClientTables />
      </section>
    </div>
  );
}

export default AdminClientsPage;
