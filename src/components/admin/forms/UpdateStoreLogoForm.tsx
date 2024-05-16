import { AdminStoreContext } from '@/components/providers/AdminStoreContextProvider';
import { Button } from '@/components/ui/button';
import { dbUpdateSettings } from '@/helpers/firebaseHelpers';
import { urlFor } from '@/lib/client';
import { useAppStore } from '@/lib/store';
import { cn } from '@/lib/utils';
import { StoreType } from '@/typings';
import { LoaderCircleIcon } from 'lucide-react';
import Image from 'next/image';
import React, { useContext, useState } from 'react';

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

  const settingStore = currentSettings?.stores.find(
    (item: StoreType) => item.id === store.id
  );
  const [imageSelected, setImageSelected] = useState<string | null>(
    settingStore.logoURL || null
  );

  const storeImages = currentStores.find((item) => item.id === store.id).images;
  console.log({ currentStores });

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
      <div className="grid grid-cols-4 gap-2">
        {storeImages?.map((item: string, idx: number) => {
          return (
            <Image
              src={item}
              key={`sanity-image-${idx}`}
              alt={`image-${idx}`}
              width={150}
              height={150}
              className={cn('rounded-md border', {
                'border-white': imageSelected === item,
              })}
              onClick={() => {
                setImageSelected(item);
              }}
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
