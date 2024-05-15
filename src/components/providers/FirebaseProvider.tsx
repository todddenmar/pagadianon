'use client';
import {
  getLocalStorageCart,
  setLocalStorageItem,
} from '@/helpers/localStorageHelpers';
import { useAppStore } from '@/lib/store';
import { UserType } from '@/typings';
import { useEffect } from 'react';

function FirebaseProvider({
  dbSettings,
  dbUserData,
}: {
  dbSettings: any;
  dbUserData: UserType | null;
}) {
  const [
    isDataFetched,
    setIsDataFetched,
    setCurrentSettings,
    setCurrentUserData,
    setCurrentUserCart,
  ] = useAppStore((state) => [
    state.isDataFetched,
    state.setIsDataFetched,
    state.setCurrentSettings,
    state.setCurrentUserData,
    state.setCurrentUserCart,
  ]);
  const localCart = getLocalStorageCart();
  useEffect(() => {
    if (isDataFetched === false) {
      setCurrentUserCart(localCart);
      setCurrentSettings(dbSettings);
      setCurrentUserData(dbUserData);
      setIsDataFetched(true);
    }
  }, []);
  return null;
}

export default FirebaseProvider;
