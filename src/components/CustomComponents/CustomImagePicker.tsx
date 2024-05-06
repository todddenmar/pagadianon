import { ImageIcon } from 'lucide-react';
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useAppStore } from '@/lib/store';
import Image from 'next/image';

function CustomImagePicker({
  title,
  value,
  description,
  setImageURL,
}: {
  title: string;
  value: null | string;
  description?: string;
  setImageURL: (url: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStoreSanityImages] = useAppStore((state) => [
    state.currentStoreSanityImages,
  ]);
  return (
    <div className="py-3">
      <div
        onClick={() => setIsOpen(true)}
        className="w-full cursor-pointer aspect-square flex flex-col items-center justify-center mx-auto border rounded-md"
      >
        {value ? (
          <Image
            src={value}
            alt={`image-selected`}
            width={200}
            height={200}
            className="object-cover object-center h-full w-full"
          />
        ) : (
          <ImageIcon />
        )}
      </div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          {!currentStoreSanityImages ? (
            <div className="grid grid-cols-4 gap-2">
              <div className="h-[150px] aspect-square flex flex-col items-center justify-center animate-pulse">
                <ImageIcon />
              </div>
              <div className="h-[150px] aspect-square flex flex-col items-center justify-center animate-pulse">
                <ImageIcon />
              </div>
              <div className="h-[150px] aspect-square flex flex-col items-center justify-center animate-pulse">
                <ImageIcon />
              </div>
              <div className="h-[150px] aspect-square flex flex-col items-center justify-center animate-pulse">
                <ImageIcon />
              </div>
              <div className="h-[150px] aspect-square flex flex-col items-center justify-center animate-pulse">
                <ImageIcon />
              </div>
              <div className="h-[150px] aspect-square flex flex-col items-center justify-center animate-pulse">
                <ImageIcon />
              </div>
              <div className="h-[150px] aspect-square flex flex-col items-center justify-center animate-pulse">
                <ImageIcon />
              </div>
              <div className="h-[150px] aspect-square flex flex-col items-center justify-center animate-pulse">
                <ImageIcon />
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-2">
              {currentStoreSanityImages?.map((item, idx) => {
                return (
                  <Image
                    src={item}
                    key={`sanity-image-${idx}`}
                    alt={`image-${idx}`}
                    width={150}
                    height={150}
                    onClick={() => {
                      setImageURL(item);
                      setIsOpen(false);
                    }}
                  />
                );
              })}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CustomImagePicker;
