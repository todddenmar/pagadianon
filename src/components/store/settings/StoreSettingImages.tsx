import CustomDropzone from '@/components/CustomComponents/CustomDropzone';
import CustomImageSelectionItem from '@/components/CustomComponents/CustomImageSelectionItem';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import { db } from '@/firebase';
import { dbGetStoreImages } from '@/helpers/firebaseHelpers';
import { useAppStore } from '@/lib/store';
import { cn } from '@/lib/utils';
import { collection, onSnapshot } from 'firebase/firestore';
import { PlusIcon } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import StoreImageRemover from './StoreImageRemover';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

function StoreSettingImages() {
  const [currentStoreData] = useAppStore((state) => [state.currentStoreData]);

  const [storeImages, setStoreImages] = useState<any[]>([]);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    getStoreImages();
  }, []);
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

  const getStoreImages = async () => {
    const res = await dbGetStoreImages({ storeID: currentStoreData.id });
    if (res.status === 'error') {
      console.log(res.error);
      return;
    }
    setStoreImages(res.data || []);
  };
  console.log({ storeImages });
  return (
    <div>
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between gap-2">
            <div className="grid grid-cols-1 gap-2">
              <CardTitle>Store Images</CardTitle>
              <CardDescription>
                A list images for the store to use
              </CardDescription>
            </div>
            <Button onClick={() => setIsDeleting(true)}>Archive Images</Button>
          </div>
        </CardHeader>
        <CardContent>
          <CustomDropzone storeID={currentStoreData?.id} />

          <ScrollArea className="h-[500px] w-full rounded-md border p-4 overflow-auto mt-3">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-2 ">
              {storeImages
                ?.sort(
                  (a, b) =>
                    new Date(b.createdAt).getTime() -
                    new Date(a.createdAt).getTime()
                )
                ?.map((item: any, idx: number) => {
                  return item.downloadURL ? (
                    <div
                      key={`store-image-item-${idx}`}
                      className={cn(
                        'w-full  rounded-md overflow-hidden aspect-square relative'
                      )}
                    >
                      <Image
                        src={item.downloadURL}
                        alt={`store-image-item`}
                        width={100}
                        height={100}
                        className="object-cover h-full w-full"
                      />
                    </div>
                  ) : (
                    <Skeleton className="w-full h-full rounded-md" />
                  );
                })}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
      <Dialog open={isDeleting} onOpenChange={setIsDeleting}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Archive Images</DialogTitle>
            <DialogDescription>
              These images will not show up on the list
            </DialogDescription>
          </DialogHeader>
          <div>
            <StoreImageRemover setClose={() => setIsDeleting(false)} />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default StoreSettingImages;
