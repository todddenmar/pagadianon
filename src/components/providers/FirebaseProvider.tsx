'use client';
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
  ] = useAppStore((state) => [
    state.isDataFetched,
    state.setIsDataFetched,
    state.setCurrentSettings,
    state.setCurrentUserData,
  ]);

  useEffect(() => {
    if (isDataFetched === false) {
      setCurrentSettings(dbSettings);
      setCurrentUserData(dbUserData);
      setIsDataFetched(true);
    }
  }, [isDataFetched, dbSettings, dbUserData]);
  return null;
}

export default FirebaseProvider;
