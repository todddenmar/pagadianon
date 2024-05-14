import CustomPageHeader from '@/components/CustomPageHeader';
import ContainerLayout from '@/components/layouts/ContainerLayout';
import OrderProgress from '@/components/order/OrderProgress';
import OrderSection from '@/components/order/OrderSection';
import OrderContextProvider from '@/components/providers/OrderContextProvider';
import { dbGetOrderData } from '@/helpers/firebaseHelpers';
import { OrderType } from '@/typings';
import { Metadata } from 'next';
import React from 'react';

type Props = {
  params: { orderID: string };
  searchParams: { year: string; month: string };
};

async function fetchOrderData({
  params,
  searchParams,
}: Props): Promise<OrderType | null> {
  const res = await dbGetOrderData({
    orderID: params.orderID,
    year: searchParams.year,
    month: searchParams.month,
  });
  let dbOrderData: any = null;
  if (res.status === 'success') {
    dbOrderData = res.data;
    return dbOrderData;
  } else {
    console.error(res.error);
    return null;
  }
}

export async function generateMetadata({
  params,
  searchParams,
}: Props): Promise<Metadata> {
  // read route params
  const orderData = await fetchOrderData({
    params,
    searchParams,
  });

  return {
    title: `${orderData?.customer.firstName}'s Order | Pagadianon`,
    description: 'Customer order page',
  };
}
async function OrderPage({ params, searchParams }: Props) {
  const orderData = await fetchOrderData({
    params,
    searchParams,
  });
  // Get the userId from auth() -- if null, the user is not signed in
  if (!orderData)
    return (
      <div className="flex flex-col items-center justify-center h-[600px] text-lg">
        Order data not found or expired
      </div>
    );
  return (
    <OrderContextProvider data={orderData}>
      <div className="my-5">
        <ContainerLayout>
          <div className="grid grid-cols-1 md:grid-cols-2 items-start gap-5">
            <CustomPageHeader
              title={'Order Page'}
              description="Customer order page"
            />
          </div>

          {orderData ? (
            <div className="mt-5">
              <OrderSection />
            </div>
          ) : (
            <div>Order Not Found</div>
          )}
        </ContainerLayout>
      </div>
    </OrderContextProvider>
  );
}

export default OrderPage;
