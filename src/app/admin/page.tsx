import DashboardCards from '@/components/admin/dashboard/DashboardCards';
import DashboardChart from '@/components/admin/dashboard/DashboardChart';
import DashboardRecentList from '@/components/admin/dashboard/DashboardRecentList';
import { auth } from '@clerk/nextjs/server';
import Link from 'next/link';
import React from 'react';

function AdminPage() {
  const { userId, orgId, has } = auth();
  if (!userId) {
    return (
      <div className="flex justify-center flex-col items-center h-[400px] gap-5">
        <div>No Access</div>
        <Link href="/" className="px-4 py-2 rounded-md bg-red-500">
          Go Back
        </Link>
      </div>
    );
  }
  if (!orgId && !has({ permission: 'org:admin:access' })) {
    return (
      <div className="flex justify-center flex-col items-center h-[400px] gap-5">
        <div>No Access</div>
        <Link href="/" className="px-4 py-2 rounded-md bg-red-500">
          Go Back
        </Link>
      </div>
    );
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
