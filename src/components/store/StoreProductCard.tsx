import { kStoreProductCategories } from '@/constants';
import { ProductType } from '@/typings';
import Image from 'next/image';
import React, { useState } from 'react';
import CustomPesoIcon from '../CustomComponents/CustomPesoIcon';
import { Drawer, DrawerContent } from '@/components/ui/drawer';
import { Button } from '../ui/button';
import { MinusIcon, PlusIcon } from 'lucide-react';
import { Input } from '../ui/input';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

function StoreProductCard({ data }: { data: ProductType }) {
  const firstImage = data.images ? data.images[0] : null;
  const secondImage = data.images ? data.images[1] : null;

  const categoryIcon = kStoreProductCategories.find(
    (item) => item.value === data.category
  )?.icon;
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  return (
    <div>
      <div
        className="group w-full cursor-pointer"
        onClick={() => setIsOpenDrawer(true)}
      >
        <div className="w-full aspect-square flex flex-col relative items-center justify-center bg-neutral-900 rounded-md overflow-hidden">
          {firstImage ? (
            <Image
              src={firstImage}
              alt={data.name}
              width={200}
              height={200}
              className="object-cover h-full w-full group-hover:scale-105 transition-all"
            />
          ) : (
            categoryIcon
          )}
        </div>
        <div className="mt-2">
          <div>{data.name}</div>
          <p className="text-sm text-neutral-500 line-clamp-1">
            {data.description}
          </p>
          <div className="flex space-x-2 items-end justify-start">
            <div className="text-2xl font-semibold">
              <CustomPesoIcon />
              {data.price}
            </div>
            {data.compareAtPrice && (
              <div className="text-destructive line-through">
                <CustomPesoIcon />
                {data.compareAtPrice}
              </div>
            )}
          </div>
        </div>
      </div>
      <Drawer open={isOpenDrawer} onOpenChange={setIsOpenDrawer}>
        <DrawerContent>
          <div className="md:max-w-lg md:mx-auto p-5 pb-10">
            <div className="my-2 text-center">
              <div className="font-semibold">{data.name}</div>
              <div className="text-neutral-500 text-sm">{data.description}</div>
            </div>
            {secondImage ? (
              <Carousel className="mx-auto max-w-[300px]">
                <CarouselContent>
                  {data.images?.map((item, idx) => {
                    return (
                      <CarouselItem key={`prod-image-${idx}`}>
                        <div className=" aspect-square flex flex-col relative items-center justify-center bg-neutral-900 rounded-md overflow-hidden">
                          <Image
                            src={item}
                            alt={`${data.name} ${idx}`}
                            width={200}
                            height={200}
                            className="object-cover h-full w-full group-hover:scale-105 transition-all"
                          />
                        </div>
                      </CarouselItem>
                    );
                  })}
                </CarouselContent>
                <CarouselPrevious className="ml-8 md:ml-0" />
                <CarouselNext className="mr-8 md:mr-0" />
              </Carousel>
            ) : (
              <div className="mx-auto max-w-[300px] aspect-square flex flex-col relative items-center justify-center bg-neutral-900 rounded-md overflow-hidden">
                {firstImage ? (
                  <Image
                    src={firstImage}
                    alt={data.name}
                    width={200}
                    height={200}
                    className="object-cover h-full w-full group-hover:scale-105 transition-all"
                  />
                ) : (
                  categoryIcon
                )}
              </div>
            )}

            <div className="flex space-x-2 items-end justify-center py-5">
              <div className="text-2xl font-semibold">
                <CustomPesoIcon />
                {data.price}
              </div>
              {data.compareAtPrice && (
                <div className="text-destructive line-through">
                  <CustomPesoIcon />
                  {data.compareAtPrice}
                </div>
              )}
            </div>
            <div className="flex items-center gap-5">
              <ProductQuantitySelector />
              <Button>Add To Cart</Button>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}

export function ProductQuantitySelector() {
  const [quantity, setQuantity] = useState<number>(1);
  return (
    <div className="grid grid-cols-3 gap-2">
      <Button
        disabled={quantity === 1}
        variant={'ghost'}
        onClick={() => {
          if (quantity === 1) {
            return;
          }
          setQuantity((prev) => prev - 1);
        }}
      >
        <MinusIcon />
      </Button>
      <Input
        type="number"
        className="text-center"
        value={quantity}
        onChange={(val) => setQuantity(parseInt(val.target.value))}
      />
      <Button variant={'ghost'} onClick={() => setQuantity((prev) => prev + 1)}>
        <PlusIcon />
      </Button>
    </div>
  );
}
export default StoreProductCard;
