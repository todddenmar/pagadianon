import StoreOrdersSection from '@/components/store/store-orders/StoreOrdersSection';
import { dbGetStoreOrdersByID } from '@/helpers/firebaseHelpers';
import { Metadata } from 'next';
import React from 'react';
export const metadata: Metadata = {
  title: 'Store Orders | Pagadianon',
  description: 'Orders for a Pagadianon store',
};
async function StoreOrdersPage({ params }: { params: { slug: string } }) {
  console.log({ params });

  return (
    <div className="relative">
      <StoreOrdersSection slug={params.slug} />
    </div>
  );
}

export default StoreOrdersPage;
