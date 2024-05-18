import DashboardSection from '@/components/admin/dashboard/DashboardSection';
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
      <DashboardSection />
    </div>
  );
}

export default AdminPage;
