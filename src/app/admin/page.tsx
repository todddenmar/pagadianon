import AdminTitle from '@/components/admin/AdminTitle';
import DashboardCards from '@/components/admin/dashboard/DashboardCards';
import DashboardChart from '@/components/admin/dashboard/DashboardChart';
import DashboardRecentList from '@/components/admin/dashboard/DashboardRecentList';
import React from 'react';

function AdminPage() {
  return (
    <div>
      <AdminTitle text={'Dashboard'} />
      <section className="mt-2 md:mt-5 flex flex-col">
        <DashboardCards />
        <div className="mt-2 md:mt-5">
          <div className="grid grid-cols-1 lg:flex gap-2 md:gap-5">
            <DashboardChart />
            <DashboardRecentList />
          </div>
        </div>
      </section>
    </div>
  );
}

export default AdminPage;
