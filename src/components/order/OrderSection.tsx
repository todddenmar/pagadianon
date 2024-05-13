'use client';
import React, { useContext } from 'react';
import { Card } from '../ui/card';
import OrderCustomerInfo from './OrderCustomerInfo';
import LoadingComponent from '../admin/LoadingComponent.';
import CustomPesoIcon from '../CustomComponents/CustomPesoIcon';
import { getCartTotal } from '@/helpers/appHelpers';
import { Separator } from '../ui/separator';
import OrderSectionTitle from './OrderSectionTitle';
import OrderInfoSection from './OrderInfoSection';
import OrderStoreCartItems from './OrderStoreCartItems';
import { OrderContext } from '../providers/OrderContextProvider';

function OrderSection() {
  const { orderData } = useContext(OrderContext);
  if (!orderData) return <LoadingComponent />;
  const totalAmount =
    getCartTotal({ cart: orderData.cart }) +
    parseInt(orderData?.deliveryService?.fee || '0');
  return (
    <div>
      <Card className=" mt-2 overflow-hidden">
        <div className="grid grid-cols-1 lg:flex gap-5 md:gap-10 p-5">
          <div className="space-y-3 lg:max-w-lg">
            <OrderCustomerInfo />
            <OrderInfoSection />
          </div>
          <div className="flex-1 ">
            <OrderSectionTitle text="Cart Items by Store" />
            <OrderStoreCartItems />
          </div>
        </div>
        <div className="p-5 bg-neutral-900">
          {orderData.cart?.length > 0 && (
            <div className="flex justify-between items-center mt-2 px-2">
              <div className="text-base">Total:</div>
              <div className="text-2xl md:text-4xl font-semibold">
                <CustomPesoIcon />
                {totalAmount}
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}

export default OrderSection;
