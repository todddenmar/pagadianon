import { useAppStore } from '@/lib/store';
import { cn } from '@/lib/utils';
import { ImageIcon } from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react';

function CustomMultiImagePicker({
  images,
  value,
  onChange,
}: {
  images: string[];
  value: string[] | null | undefined;
  onChange: (val: string[]) => void;
}) {
  return (
    <div>
      {!images ? (
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
          {images?.map((item, idx) => {
            const isSelected = value?.includes(item);
            const currentValues = value || [];
            return (
              <Image
                src={item}
                key={`sanity-image-${idx}`}
                alt={`image-${idx}`}
                width={150}
                height={150}
                onClick={() => {
                  if (isSelected) {
                    onChange(currentValues.filter((val) => val != item));
                  } else {
                    onChange([...currentValues, item]);
                  }
                }}
                className={cn(
                  'rounded-md overflow-hidden cursor-pointer hover:md:border-white border',
                  {
                    'border-white': isSelected,
                  }
                )}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

export default CustomMultiImagePicker;
