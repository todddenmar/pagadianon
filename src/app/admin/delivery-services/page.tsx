import DeliveryServicesTable from '@/components/admin/tables/DeliveryServicesTable';
import React from 'react';

function AdminDeliveryServicesPage() {
  return (
    <div className="mt-2 md:mt-5 flex flex-col">
      <DeliveryServicesTable />
    </div>
  );
}

export default AdminDeliveryServicesPage;
