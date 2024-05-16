import React from 'react';
import { Skeleton } from '../ui/skeleton';
import { cn } from '@/lib/utils';
import { CheckIcon } from 'lucide-react';
import Image from 'next/image';

function CustomImageSelectionItem({
  url,
  isSelected,
  onClick,
}: {
  url: string;
  isSelected: boolean;
  onClick: () => void;
}) {
  return url ? (
    <div
      onClick={onClick}
      className={cn(
        'w-full hover:border-white transition-all hover:border-2 cursor-pointer rounded-md overflow-hidden opacity-35 aspect-square relative',
        {
          'opacity-100': isSelected,
        }
      )}
    >
      {isSelected && (
        <div className="absolute bottom-0 right-0 rounded-full h-[20px] flex flex-col items-center justify-center w-[20px] bg-green-500 p-1">
          <CheckIcon className="h-[16px]" />
        </div>
      )}

      <Image
        src={url}
        alt={`store-image-item`}
        width={100}
        height={100}
        className="object-cover h-full w-full"
      />
    </div>
  ) : (
    <Skeleton className="w-full h-full rounded-md" />
  );
}

export default CustomImageSelectionItem;
