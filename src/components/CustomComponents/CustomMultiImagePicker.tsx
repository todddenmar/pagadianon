import { useAppStore } from '@/lib/store';
import { cn } from '@/lib/utils';
import { ImageIcon } from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react';
import CustomImageSelectionItem from './CustomImageSelectionItem';

function CustomMultiImagePicker({
  images,
  value,
  onChange,
}: {
  images: any[];
  value: string[] | null | undefined;
  onChange: (val: string[]) => void;
}) {
  return (
    <div>
      {!images ? (
        <div className="h-[100px] w-full flex flex-col items-center justify-center">
          No Images
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-2">
          {images?.map((item, idx) => {
            const isSelected = value?.includes(item);
            const currentValues = value || [];
            return (
              <CustomImageSelectionItem
                key={`store-image-${idx}`}
                url={item}
                isSelected={isSelected || false}
                onClick={() => {
                  if (isSelected) {
                    onChange(currentValues.filter((val) => val != item));
                  } else {
                    onChange([...currentValues, item]);
                  }
                }}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

export default CustomMultiImagePicker;
