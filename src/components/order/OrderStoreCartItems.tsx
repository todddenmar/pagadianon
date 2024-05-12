import React, { useContext } from 'react';
import OrderStoreCartItem from './OrderStoreCartItem';
import { getStoresByCart } from '@/helpers/appHelpers';
import LoadingComponent from '../admin/LoadingComponent.';
import { useAppStore } from '@/lib/store';
import { OrderContext } from '../providers/OrderContextProvider';

function OrderStoreCartItems() {
  const [currentSettings] = useAppStore((state) => [state.currentSettings]);
  const { orderData } = useContext(OrderContext);
  if (!orderData) return <LoadingComponent />;
  if (!currentSettings) return <LoadingComponent />;

  const storesCarts = getStoresByCart({
    cart: orderData.cart,
    stores: currentSettings.stores,
  });
  const storeCartsWithStatus = storesCarts.map((item) => ({
    ...item,
  }));
  return (
    <div className="gap-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 mt-2">
      {storeCartsWithStatus?.map((item: any, idx: number) => {
        return <OrderStoreCartItem key={`store-cart-${idx}`} item={item} />;
      })}
    </div>
  );
}

export default OrderStoreCartItems;
