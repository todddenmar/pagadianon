import CollectionsTable from '@/components/admin/tables/Collectionstable';
import React from 'react';

function AdminCollectionsPage() {
  return (
    <div className="mt-2 md:mt-5 flex flex-col">
      <CollectionsTable />
    </div>
  );
}

export default AdminCollectionsPage;
