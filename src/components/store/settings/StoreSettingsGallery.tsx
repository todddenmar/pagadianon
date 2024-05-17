import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { Button } from '@/components/ui/button';
import StoreImagesUploader from './StoreImagesUploader';
import { useAppStore } from '@/lib/store';
import { useShallow } from 'zustand/react/shallow';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { Skeleton } from '@/components/ui/skeleton';
import StoreImageRemover from './StoreImageRemover';

function StoreSettingsGallery() {
  const [currentStoreData] = useAppStore(
    useShallow((state) => [state.currentStoreData])
  );
  const [isUploading, setIsUploading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  return (
    <div>
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between gap-2">
            <div className="grid grid-cols-1 gap-2">
              <CardTitle>Gallery</CardTitle>
              <CardDescription>
                These images will be shown on store information tab
              </CardDescription>
            </div>
            <div className="grid grid-cols-1 md:flex gap-2 items-center">
              <Button onClick={() => setIsUploading(true)}>
                Upload Images
              </Button>
              <Button onClick={() => setIsDeleting(true)}>
                Archive Images
              </Button>
            </div>
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

export default StoreSettingsGallery;
