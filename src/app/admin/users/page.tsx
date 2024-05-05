import UsersTable from '@/components/admin/tables/UsersTable';
import React from 'react';

function AdminUsersPage() {
  return (
    <section className="mt-2 md:mt-5 flex flex-col">
      <UsersTable />
    </section>
  );
}

export default AdminUsersPage;
