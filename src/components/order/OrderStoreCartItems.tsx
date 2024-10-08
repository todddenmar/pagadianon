import React, { useContext } from 'react';
import OrderStoreCartItem from './OrderStoreCartItem';
import { getStoresByCart } from '@/helpers/appHelpers';
import LoadingComponent from '../admin/LoadingComponent.';
import { useAppStore } from '@/lib/store';
import { OrderContext } from '../providers/OrderContextProvider';
import { StoreType } from '@/typings';
import { Skeleton } from '../ui/skeleton';

function OrderStoreCartItems() {
  const [currentSettings] = useAppStore((state) => [state.currentSettings]);
  const { orderData } = useContext(OrderContext);
  if (!orderData) return <OrderStoreCartItemsSkeleton />;
  if (!currentSettings) return <OrderStoreCartItemsSkeleton />;

  const storeCartsWithStatus = orderData.storesInvolved?.map((item) => ({
    ...item,
    ...currentSettings.stores.find(
      (storeItem: StoreType) => storeItem.id === item?.storeID
    ),
    cart: orderData.cart.filter(
      (cartItem) => cartItem.storeID === item?.storeID
    ),
  }));
  return (
    <div className="gap-3 grid grid-cols-1  lg:grid-cols-1 xl:grid-cols-2 mt-2">
      {storeCartsWithStatus?.map((item: any, idx: number) => {
        return <OrderStoreCartItem key={`store-cart-${idx}`} item={item} />;
      })}
    </div>
  );
}

function OrderStoreCartItemsSkeleton() {
  return (
    <div className="gap-3 grid grid-cols-1  lg:grid-cols-1 xl:grid-cols-2 mt-2">
      <Skeleton className="h-[261px] w-full rounded-md" />
      <Skeleton className="h-[261px] w-full rounded-md" />
      <Skeleton className="h-[261px] w-full rounded-md" />
      <Skeleton className="h-[261px] w-full rounded-md" />
    </div>
  );
}

export default OrderStoreCartItems;
