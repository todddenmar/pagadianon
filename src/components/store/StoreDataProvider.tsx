'use client';
import { useAppStore } from '@/lib/store';
import { StoreType } from '@/typings';
import { useEffect } from 'react';

function StoreDataProvider({ data }: { data: StoreType }) {
  const setCurrentStoreData = useAppStore((state) => state.setCurrentStoreData);
  useEffect(() => {
    setCurrentStoreData(data);
  }, []);
  return null;
}

export default StoreDataProvider;
