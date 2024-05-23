import React from 'react';
import ContainerLayout from '../layouts/ContainerLayout';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { StoreType } from '@/typings';
import StoreCard from '../collections/StoreCard';

function StoresCarousel({
  items,
  title,
  description,
}: {
  items: StoreType[];
  title?: string;
  description?: string;
}) {
  return (
    <div className="relative">
      <ContainerLayout>
        <div className="pb-5">
          <h3 className="text-lg md:text-2xl font-bold">{title}</h3>
          <p className="text-sm text-neutral-600 dark:text-neutral-500">
            {description}
          </p>
        </div>
        <Carousel>
          <CarouselContent>
            {items?.map((item, idx) => {
              return (
                <CarouselItem
                  key={`store-carousel-item-${idx}`}
                  className="md:basis-1/2 xl:basis-1/3 cursor-grab"
                >
                  <StoreCard store={item} />
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <div className="absolute -top-[70px] right-0 h-[50px] w-[70px] 2xl:hidden">
            <CarouselPrevious className="absolute left-0 bg-highlight text-neutral-950" />
            <CarouselNext className="absolute right-0 bg-highlight text-neutral-950" />
          </div>
          <div className="hidden 2xl:block">
            <CarouselPrevious className="bg-highlight text-neutral-950" />
            <CarouselNext className="bg-highlight text-neutral-950" />
          </div>
        </Carousel>
      </ContainerLayout>
    </div>
  );
}

export default StoresCarousel;
