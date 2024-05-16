import CustomImageSelectionItem from '@/components/CustomComponents/CustomImageSelectionItem';
import LoadingComponent from '@/components/admin/LoadingComponent.';
import { Button } from '@/components/ui/button';
import { db } from '@/firebase';
import {
  dbDeleteStorageImage,
  dbGetStoreImages,
} from '@/helpers/firebaseHelpers';
import { useAppStore } from '@/lib/store';
import { ScrollArea } from '@radix-ui/react-scroll-area';
import { collection, onSnapshot } from 'firebase/firestore';
import { LoaderIcon } from 'lucide-react';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useShallow } from 'zustand/react/shallow';

function StoreImageRemover({ setClose }: { setClose: () => void }) {
  const [isLoading, setIsLoading] = useState(false);
  const [currentStoreData, setCurrentStoreData] = useAppStore(
    useShallow((state) => [state.currentStoreData, state.setCurrentStoreData])
  );
  const [storeImages, setStoreImages] = useState<any[]>([]);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  useEffect(() => {
    getStoreImages();
  }, [currentStoreData]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, 'stores', String(currentStoreData?.id), 'images'),
      (snap) => {
        const images = snap.docs.map((item) => item.data());
        setStoreImages(images);
      }
    );

    return () => unsubscribe();
  }, []);
  if (!currentStoreData) return <LoadingComponent />;
  const getStoreImages = async () => {
    const res = await dbGetStoreImages({ storeID: currentStoreData.id });
    if (res.status === 'error') {
      console.log(res.error);
      return;
    }
    setStoreImages(res.data || []);
  };
  const onDeleteSelectedImages = async () => {
    setIsLoading(true);
    selectedImages?.forEach(async (item) => {
      const res = await dbDeleteStorageImage({
        storeID: currentStoreData.id,
        imageID: item,
      });
      if (res.status === 'error') {
        console.log(res.error);
        return;
      }
    });
    toast.success('Deleted images successfully', {
      description: moment(new Date()).format('LLL'),
    });
    setClose();
  };
  return (
    <div>
      <ScrollArea className="h-[300px] w-full rounded-md border p-4 overflow-auto ">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4  gap-2 w-fit">
          {storeImages
            ?.sort(
              (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            )
            ?.map((item: any, idx: number) => {
              const isSelected = selectedImages?.includes(item.imageID);
              return (
                <CustomImageSelectionItem
                  key={`store-image-${idx}`}
                  url={item.downloadURL}
                  isSelected={isSelected}
                  onClick={() =>
                    isSelected
                      ? setSelectedImages((prev) =>
                          prev.filter((url) => url != item.imageID)
                        )
                      : setSelectedImages((prev) =>
                          prev ? [...prev, item.imageID] : [item.imageID]
                        )
                  }
                />
              );
            })}
        </div>
      </ScrollArea>
      <div className="pt-5">
        {isLoading ? (
          <div className="h-[50px] w-full flex flex-col items-center">
            <LoaderIcon className="animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-5">
            <Button onClick={setClose} variant="secondary">
              Cancel
            </Button>
            <Button onClick={onDeleteSelectedImages}>Archive Selected</Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default StoreImageRemover;
