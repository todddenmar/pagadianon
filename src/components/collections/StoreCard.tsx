import { cn } from '@/lib/utils';
import { StoreType } from '@/typings';
import { ImageIcon } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import { Badge } from '../ui/badge';
import Link from 'next/link';

function StoreCard({ store }: { store: StoreType }) {
  const tags = store.tags?.split(',');
  return (
    <div className="border rounded-xl overflow-hidden group bg-neutral-100 dark:bg-neutral-900 flex">
      <div className="p-3 w-full flex-1">
        <div className="flex gap-3 relative">
          <div className="flex flex-col items-center justify-center relative h-[100px] sm:h-[150px] md:h-[120px] lg:h-[150px] xl:h-[150px] 2xl:h-[150px] aspect-square ">
            {store.logoURL ? (
              <Image
                src={store.logoURL}
                alt={store.name}
                width={200}
                height={200}
                className="object-contain rounded-xl group-hover:scale-105 transition-all"
              />
            ) : (
              <ImageIcon />
            )}
          </div>
          <div className="flex flex-col flex-1 w-full border-l px-3">
            <div
              className={cn(
                'text-xs sm:text-lg md:text-sm lg:text-lg xl:text-base 2xl:text-lg font-semibold '
              )}
            >
              {store.name}
            </div>
            <div className="text-xs sm:text-sm dark:text-neutral-400 line-clamp-2 md:line-clamp-2 lg:line-clamp-3">
              {store.description}
            </div>
            <div className="inline-flex gap-2 mt-5 bottom-0 absolute">
              {tags.map((tag, idx) => (
                <Badge key={`${store.slug}-tag-${idx}`} className="capitalize">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Link href={`/store/${store.slug}`}>
        <div className="flex w-[40px] h-full border-l transition-all  flex-col justify-center items-center hover:bg-highlight_hover bg-highlight text-neutral-900 font-bold ">
          <span className="[writing-mode:vertical-lr] rotate-180 text-center flex text-sm">
            View Store
          </span>
        </div>
      </Link>
    </div>
  );
}

export default StoreCard;
