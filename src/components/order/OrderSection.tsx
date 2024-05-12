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
  return (
    <div>
      <Card className="p-5 mt-2 ">
        <div className="grid grid-cols-1 lg:flex gap-5 md:gap-10">
          <div className="space-y-3 lg:max-w-lg">
            <OrderCustomerInfo />
            <OrderInfoSection />
          </div>
          <div className="flex-1 ">
            <OrderSectionTitle text="Cart Items by Store" />
            <OrderStoreCartItems />
          </div>
        </div>
        <Separator className="my-3" />
        <div>
          {orderData.cart?.length > 0 && (
            <div className="flex justify-between items-center mt-2 px-2">
              <div className="text-base">Total:</div>
              <div className="text-2xl md:text-4xl font-semibold">
                <CustomPesoIcon />
                {getCartTotal({ cart: orderData.cart })}
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}

export default OrderSection;
