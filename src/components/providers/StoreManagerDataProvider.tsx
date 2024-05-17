'use client';
import { dbGetStoreOrdersByID } from '@/helpers/firebaseHelpers';
import { useAppStore } from '@/lib/store';
import { OrderType, ProductType, StoreType } from '@/typings';
import moment from 'moment';
import { useEffect } from 'react';

function StoreManagerDataProvider({
  data,
  products,
  orders,
}: {
  data: StoreType;
  products: ProductType[];
  orders: OrderType[];
}) {
  const [setCurrentStoreData, setCurrentStoreProducts, setCurrentStoreOrders] =
    useAppStore((state) => [
      state.setCurrentStoreData,
      state.setCurrentStoreProducts,
      state.setCurrentStoreOrders,
    ]);
  useEffect(() => {
    setCurrentStoreData(data);
    setCurrentStoreProducts(products);
    setCurrentStoreOrders(orders);
  }, [data]);

  return null;
}

export default StoreManagerDataProvider;
