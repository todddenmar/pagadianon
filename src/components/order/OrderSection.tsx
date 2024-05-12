'use client';
import { CartItemType, OrderType, StoreType } from '@/typings';
import React from 'react';
import { Card } from '../ui/card';
import CustomCopyButton from '../CustomComponents/CustomCopyButton';
import OrderCustomerInfo from './OrderCustomerInfo';
import { useAppStore } from '@/lib/store';
import LoadingComponent from '../admin/LoadingComponent.';
import CustomPesoIcon from '../CustomComponents/CustomPesoIcon';
import { getCartTotal, getStoresByCart } from '@/helpers/appHelpers';
import { Separator } from '../ui/separator';
import OrderSectionTitle from './OrderSectionTitle';
import OrderStoreCartItem from './OrderStoreCartItem';
import OrderInfoSection from './OrderInfoSection';

function OrderSection({ orderData }: { orderData: OrderType }) {
  const [currentSettings] = useAppStore((state) => [state.currentSettings]);
  if (!currentSettings) return <LoadingComponent />;
  const storesCarts = getStoresByCart({
    cart: orderData.cart,
    stores: currentSettings.stores,
  });
  return (
    <div>
      <Card className="p-5 mt-2 ">
        <div className="grid grid-cols-1 lg:flex gap-5 md:gap-10">
          <div className="space-y-3 lg:max-w-lg">
            <OrderCustomerInfo customer={orderData.customer} />
            <OrderInfoSection orderData={orderData} />
          </div>
          <div className="flex-1 ">
            <OrderSectionTitle text="Cart Items" />
            <div className="gap-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 mt-2">
              {storesCarts?.map((item: any, idx: number) => {
                return (
                  <OrderStoreCartItem key={`store-cart-${idx}`} item={item} />
                );
              })}
            </div>
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
