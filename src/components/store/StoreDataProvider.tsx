'use client';
import { useAppStore } from '@/lib/store';
import { ProductType, StoreType } from '@/typings';
import { useEffect } from 'react';

function StoreDataProvider({
  data,
  products,
}: {
  data: StoreType;
  products: ProductType[];
}) {
  const [setCurrentStoreData, setCurrentStoreProducts] = useAppStore(
    (state) => [state.setCurrentStoreData, state.setCurrentStoreProducts]
  );
  useEffect(() => {
    setCurrentStoreData(data);
    setCurrentStoreProducts(products);
  }, [data, products]);
  return null;
}

export default StoreDataProvider;
