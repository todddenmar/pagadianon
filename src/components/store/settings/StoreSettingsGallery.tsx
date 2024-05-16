import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { Button } from '@/components/ui/button';
import StoreImagesUploader from './StoreSettingsImageUploader';
import { useAppStore } from '@/lib/store';
import { useShallow } from 'zustand/react/shallow';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { Skeleton } from '@/components/ui/skeleton';

function StoreSettingsGallery() {
  const [isUploading, setIsUploading] = useState(false);
  const [currentStoreData, setCurrentStoreData] = useAppStore(
    useShallow((state) => [state.currentStoreData, state.setCurrentStoreData])
  );
  return (
    <div>
      <Card>
        <CardHeader>
          <div className="grid grid-cols-1 gap-5 md:flex justify-between items-start">
            <div className="grid grid-cols-1 gap-1">
              <CardTitle>Gallery</CardTitle>
              <CardDescription>
                These images will be shown on store information tab
              </CardDescription>
            </div>
            <Button onClick={() => setIsUploading(true)}>Upload Images</Button>
          </div>
        </CardHeader>
        <CardContent>
          {currentStoreData?.galleryImages ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {currentStoreData?.galleryImages?.map(
                (item: string, idx: number) => {
                  return (
                    <div
                      className={cn(
                        'w-full rounded-md overflow-hidden aspect-square relative'
                      )}
                      key={`key-gallery-image-${idx}`}
                    >
                      <Image
                        src={item}
                        alt={`gallery-image-${idx}`}
                        width={400}
                        height={400}
                        className="object-cover"
                      />
                    </div>
                  );
                }
              )}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              <Skeleton className="w-full aspect-square rounded-md" />
              <Skeleton className="w-full aspect-square rounded-md" />
              <Skeleton className="w-full aspect-square rounded-md" />
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={isUploading} onOpenChange={setIsUploading}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Image Uploader</DialogTitle>
            <DialogDescription>
              Upload all images that this store
            </DialogDescription>
          </DialogHeader>
          <div>
            <StoreImagesUploader setClose={() => setIsUploading(false)} />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default StoreSettingsGallery;
