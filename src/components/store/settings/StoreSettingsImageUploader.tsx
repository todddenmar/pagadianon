import CustomDropzone from '@/components/CustomComponents/CustomDropzone';
import LoadingComponent from '@/components/admin/LoadingComponent.';
import { Button } from '@/components/ui/button';
import { db, storage } from '@/firebase';
import {
  dbGetStoreImages,
  dbUpdateStoreGalleryImages,
} from '@/helpers/firebaseHelpers';
import { useAppStore } from '@/lib/store';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@radix-ui/react-scroll-area';
import { getDownloadURL, listAll, ref } from 'firebase/storage';
import { CheckIcon, LoaderIcon } from 'lucide-react';
import moment from 'moment';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useShallow } from 'zustand/react/shallow';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { Skeleton } from '@/components/ui/skeleton';
import CustomImageSelectionItem from '@/components/CustomComponents/CustomImageSelectionItem';

function StoreImagesUploader({ setClose }: { setClose: () => void }) {
  const [isLoading, setIsLoading] = useState(false);
  const [currentStoreData, setCurrentStoreData] = useAppStore(
    useShallow((state) => [state.currentStoreData, state.setCurrentStoreData])
  );
  const [storeImages, setStoreImages] = useState<any[]>([]);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  useEffect(() => {
    getStoreImages();
    setSelectedImages(currentStoreData?.galleryImages);
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

  const onUpdateGalleryImages = async () => {
    setIsLoading(true);
    const res = await dbUpdateStoreGalleryImages({
      storeID: currentStoreData.id,
      images: selectedImages,
    });
    if (res.status === 'error') {
      console.log(res.error);
      return;
    }
    setCurrentStoreData({ ...currentStoreData, galleryImages: selectedImages });
    toast.success('Gallery images updated successfully', {
      description: moment(new Date()).format('LLL'),
    });
    setClose();
  };

  return (
    <div className="grid grid-cols-1 gap-5 p-2">
      <div>
        <CustomDropzone storeID={currentStoreData?.id} />
      </div>
      <ScrollArea className="h-[300px] w-full rounded-md border p-4 overflow-auto ">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4  gap-2 w-fit">
          {storeImages
            ?.sort(
              (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            )
            ?.map((item: any, idx: number) => {
              const isSelected = selectedImages?.includes(item.downloadURL);
              return (
                <CustomImageSelectionItem
                  key={`store-image-${idx}`}
                  url={item.downloadURL}
                  isSelected={isSelected}
                  onClick={() =>
                    isSelected
                      ? setSelectedImages((prev) =>
                          prev.filter((url) => url != item.downloadURL)
                        )
                      : setSelectedImages((prev) =>
                          prev
                            ? [...prev, item.downloadURL]
                            : [item.downloadURL]
                        )
                  }
                />
              );
            })}
        </div>
      </ScrollArea>
      {isLoading ? (
        <div className="h-[50px] w-full flex flex-col items-center">
          <LoaderIcon className="animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-5">
          <Button onClick={setClose} variant="secondary">
            Cancel
          </Button>
          <Button onClick={onUpdateGalleryImages}>Update Gallery</Button>
        </div>
      )}
    </div>
  );
}

export default StoreImagesUploader;
