import { AdminStoreContext } from '@/components/providers/AdminStoreContextProvider';
import { Button } from '@/components/ui/button';
import {
  dbGetRootSettingsImages,
  dbUpdateSettings,
} from '@/helpers/firebaseHelpers';
import { urlFor } from '@/lib/client';
import { useAppStore } from '@/lib/store';
import { cn } from '@/lib/utils';
import { StoreType } from '@/typings';
import { LoaderCircleIcon } from 'lucide-react';
import Image from 'next/image';
import React, { useContext, useEffect, useState } from 'react';
import UploadAdminImageFiles from './UploadAdminImageFiles';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '@/firebase';
import { Skeleton } from '@/components/ui/skeleton';
import CustomImageSelectionItem from '@/components/CustomComponents/CustomImageSelectionItem';

function UpdateStoreLogoForm({
  store,
  setClose,
}: {
  store: StoreType;
  setClose: () => void;
}) {
  const [currentSettings, currentStores, setCurrentSettings] = useAppStore(
    (state) => [
      state.currentSettings,
      state.currentStores,
      state.setCurrentSettings,
    ]
  );
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState<any>([]);
  console.log({ images });

  useEffect(() => {
    getRootSettingsImages();
  }, [currentSettings]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, 'root', 'settings', 'images'),
      (snap) => {
        const images = snap.docs.map((item) => item.data());
        setImages(images);
      }
    );

    return () => unsubscribe();
  }, []);

  const getRootSettingsImages = async () => {
    const res = await dbGetRootSettingsImages();
    if (res.status === 'error') {
      console.log(res.error);
      return;
    }
    setImages(res.data || []);
  };

  const settingStore = currentSettings?.stores.find(
    (item: StoreType) => item.id === store.id
  );
  const [imageSelected, setImageSelected] = useState<string | null>(
    settingStore.logoURL || null
  );

  const onUpdateLogo = async () => {
    setIsLoading(true);
    const updatedStore = { ...settingStore, logoURL: imageSelected };
    const updatedSettingsStores = currentSettings.stores?.map(
      (item: StoreType) => (item.id === store.id ? updatedStore : item)
    );
    const updatedSettings = {
      ...currentSettings,
      stores: updatedSettingsStores,
      isPublished: true,
    };
    const resUpdate = await dbUpdateSettings(updatedSettings);
    if (resUpdate.status === 'success') {
      setCurrentSettings(updatedSettings);
    } else {
      console.log(resUpdate.error);
      return;
    }
    setIsLoading(false);
    setClose();
  };

  return (
    <div>
      <UploadAdminImageFiles />
      <div className="grid grid-cols-4 gap-2 mt-5">
        {images?.map((item: any, idx: number) => {
          return (
            <CustomImageSelectionItem
              key={`store-image-${idx}`}
              url={item.downloadURL}
              isSelected={imageSelected === item.downloadURL}
              onClick={() => setImageSelected(item.downloadURL)}
            />
          );
        })}
      </div>
      {isLoading ? (
        <div className="w-full h-[50px] flex flex-col items-center justify-center pt-5">
          <span>
            <LoaderCircleIcon className="animate-spin" />
          </span>
        </div>
      ) : (
        <div className="w-full grid grid-cols-2 gap-5 pt-5">
          <Button
            onClick={(e) => {
              setClose();
            }}
            variant={'secondary'}
          >
            Cancel
          </Button>
          <Button onClick={onUpdateLogo}>Submit</Button>
        </div>
      )}
    </div>
  );
}

export default UpdateStoreLogoForm;
