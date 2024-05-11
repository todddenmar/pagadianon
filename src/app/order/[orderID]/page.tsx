import CustomPageHeader from '@/components/CustomPageHeader';
import LoadingComponent from '@/components/admin/LoadingComponent.';
import ContainerLayout from '@/components/layouts/ContainerLayout';
import OrderProgress from '@/components/order/OrderProgress';
import OrderSection from '@/components/order/OrderSection';
import { dbGetOrderData } from '@/helpers/firebaseHelpers';
import { OrderType } from '@/typings';
import { Metadata } from 'next';
import React from 'react';

type Props = {
  params: { orderID: string };
};

async function fetchOrderData({ params }: Props): Promise<OrderType | null> {
  const res = await dbGetOrderData(params.orderID);
  let dbOrderData: any = null;
  if (res.status === 'success') {
    dbOrderData = res.data;
    return dbOrderData;
  } else {
    console.error(res.error);
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // read route params
  const orderData = await fetchOrderData({ params });

  return {
    title: `${orderData?.customer.firstName}'s Order | Pagadianon`,
    description: 'Customer order page',
  };
}
async function OrderPage({ params }: Props) {
  const orderData = await fetchOrderData({ params });
  if (!orderData) return <LoadingComponent />;
  return (
    <div>
      <ContainerLayout>
        <div className="grid grid-cols-1 md:grid-cols-2 items-start gap-5">
          <CustomPageHeader
            title={'Order Page'}
            description="Customer order page"
          />
          <OrderProgress orderData={orderData} />
        </div>

        {orderData ? (
          <div className="mt-5">
            <OrderSection orderData={orderData} />
          </div>
        ) : (
          <div>Order Not Found</div>
        )}
      </ContainerLayout>
    </div>
  );
}

export default OrderPage;
