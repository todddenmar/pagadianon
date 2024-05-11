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
    <div>
      <ContainerLayout>
        <div className="pb-5">
          <h3 className="text-lg md:text-2xl font-bold">{title}</h3>
          <p className="text-sm text-neutral-400">{description}</p>
        </div>
        <Carousel>
          <CarouselContent>
            {items?.map((item, idx) => {
              return (
                <CarouselItem
                  key={`store-carousel-item-${idx}`}
                  className="md:basis-1/2 xl:basis-1/3"
                >
                  <StoreCard store={item} />
                </CarouselItem>
              );
            })}
          </CarouselContent>
        </Carousel>
      </ContainerLayout>
    </div>
  );
}

export default StoresCarousel;
