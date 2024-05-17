import { Metadata } from 'next';
import React from 'react';
import StoreDashboardSection from '@/components/store/dashboard/StoreDashboardSection';
import StoreManagerDataProvider from '@/components/providers/StoreManagerDataProvider';
import {
  dbGetStoreData,
  dbGetStoreOrdersByID,
  dbGetStoreProducts,
  dbGetUserData,
} from '@/helpers/firebaseHelpers';
import moment from 'moment';
import { auth, currentUser } from '@clerk/nextjs/server';
import NoDataSection from '@/components/error/NoDataSection';
import { UserType } from '@/typings';
export const metadata: Metadata = {
  title: 'Store Dashboard | Pagadianon',
  description: 'Dashboard for a Pagadianon store',
};
async function StoreDashboardPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const { userId } = auth();
  if (!userId) return <NoDataSection title="Please Login First" />;
  let dbUserData: UserType | null = null;
  const user = await currentUser();
  let userResultData = null;
  if (user && user.emailAddresses && user.primaryEmailAddressId) {
    const userEmail = user.primaryEmailAddress?.emailAddress;
    if (userEmail) {
      userResultData = await dbGetUserData(userEmail);
      if (userResultData.status === 'success') {
        dbUserData = userResultData.data;
      } else {
        console.log(userResultData.error);
      }
    }
  }

  const res = await dbGetStoreData(slug);
  if (res.status === 'error') {
    console.log(res.error);
  }
  const storeData = res.data;
  const isStoreManager = dbUserData?.stores?.includes(storeData.id);
  if (!isStoreManager)
    return (
      <NoDataSection
        title="No store manager access"
        href={`/store/${slug}`}
        linkText="Go back to store page"
      />
    );
  const res2 = await dbGetStoreProducts(storeData?.id);
  if (res2.status === 'error') {
    console.log(res2.error);
  }
  const storeProducts: any[] = res2.data || [];

  const date = new Date();
  const year = moment(date).format('YYYY');
  const month = moment(date).format('MM');
  const res3 = await dbGetStoreOrdersByID({
    id: storeData.id,
    year: year,
    month: month,
  });
  if (res3.status === 'errors') {
    console.log(res3.error);
    return;
  }
  const storeOrders: any = res3.data;
  console.log('get all data by server rendering');
  return (
    <div>
      <StoreManagerDataProvider
        data={storeData}
        products={storeProducts}
        orders={storeOrders}
      />
      <StoreDashboardSection />
    </div>
  );
}

export default StoreDashboardPage;
