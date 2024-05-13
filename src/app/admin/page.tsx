import DashboardCards from '@/components/admin/dashboard/DashboardCards';
import DashboardChart from '@/components/admin/dashboard/DashboardChart';
import DashboardRecentList from '@/components/admin/dashboard/DashboardRecentList';
import NoDataSection from '@/components/error/NoDataSection';
import { auth } from '@clerk/nextjs/server';
import React from 'react';

function AdminPage() {
  const { userId, orgId, has } = auth();
  if (!userId) {
    return <NoDataSection title="Not logged in" />;
  }
  if (!orgId && !has({ permission: 'org:admin:access' })) {
    return <NoDataSection title="No Organization found" />;
  }

  return (
    <div>
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
