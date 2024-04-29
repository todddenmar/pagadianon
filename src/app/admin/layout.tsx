import AdminSidebar from '@/components/admin/AdminSidebar';
import ContainerLayout from '@/components/layouts/ContainerLayout';
import React from 'react';

function AdminLayout({ children }: any) {
  return (
    <div className="flex flex-col items-center justify-center w-full p-2 md:p-5">
      <ContainerLayout>
        <div className=" p-2 md:p-6 w-full flex">
          <div className="h-full flex flex-col items-center justify-center bg-neutral-900 rounded-lg rounded-r-none p-4">
            <AdminSidebar />
          </div>
          <div className="border rounded-l-none rounded-lg p-2 md:p-6 w-full flex-1">
            {children}
          </div>
        </div>
      </ContainerLayout>
    </div>
  );
}

export default AdminLayout;
