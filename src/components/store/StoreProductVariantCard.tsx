import { kStoreProductCategories } from '@/constants';
import { ProductType, VariantType } from '@/typings';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
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
import { useAppStore } from '@/lib/store';
import LoadingComponent from '../admin/LoadingComponent.';
import { Badge } from '../ui/badge';
import moment from 'moment';
import { toast } from 'sonner';
import { SignInButton, SignedOut } from '@clerk/nextjs';
import { setLocalStorageItem } from '@/helpers/localStorageHelpers';

function StoreProductVariantCard({ variant }: { variant: VariantType }) {
  const [
    currentStoreData,
    currentStoreProducts,
    currentUserCart,
    currentUserData,
    setCurrentUserCart,
    setIsSheetCartOpen,
    setIsDrawerCartOpen,
  ] = useAppStore((state) => [
    state.currentStoreData,
    state.currentStoreProducts,
    state.currentUserCart,
    state.currentUserData,
    state.setCurrentUserCart,
    state.setIsSheetCartOpen,
    state.setIsDrawerCartOpen,
  ]);
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [quantity, setQuantity] = useState<number>(1);
  useEffect(() => {
    setQuantity(1);
  }, [isOpenDrawer]);
  if (!currentStoreProducts) return <LoadingComponent />;
  const productData = currentStoreProducts?.find(
    (item: ProductType) => item.id === variant.productID
  );
  if (!productData) return <LoadingComponent />;

  const firstImage = variant.images ? variant.images[0] : null;
  const secondImage = variant.images ? variant.images[1] : null;
  const categoryIcon = kStoreProductCategories.find(
    (item) => item.value === productData.category
  )?.icon;

  const onAddToCart = ({ isMobile }: { isMobile: boolean }) => {
   
    const newData = {
      variantID: variant.id,
      imageURL: firstImage,
      name: productData.name,
      variantName: variant.name,
      price: parseInt(variant.price),
      totalAmount: parseInt(variant.price) * quantity,
      quantity: quantity,
      storeID: currentStoreData.id,
    };

    if (currentUserCart.find((item) => item.variantID === variant.id)) {
      const increaseCartItem = currentUserCart.map((cartItem) =>
        cartItem.variantID === newData.variantID
          ? {
              ...cartItem,
              quantity: parseInt(cartItem.quantity) + quantity,
              totalAmount:
                cartItem.totalAmount + parseInt(variant.price) * quantity,
            }
          : cartItem
      );
      setCurrentUserCart(increaseCartItem);
      setLocalStorageItem('cart', increaseCartItem);
      setIsOpenDrawer(false);
      toast.success('Added quantity to cart successfully', {
        description: moment(new Date()).format('LLL'),
        position: 'top-left',
        action: {
          label: 'Open Cart',
          onClick: () =>
            isMobile ? setIsDrawerCartOpen(true) : setIsSheetCartOpen(true),
        },
      });
      return;
    }
    const updatedCart = [...currentUserCart, newData];
    setCurrentUserCart(updatedCart);
    setLocalStorageItem('cart', updatedCart);
    setIsOpenDrawer(false);
    toast.success('Added to cart successfully', {
      description: moment(new Date()).format('LLL'),
      position: 'top-left',
      action: {
        label: 'Open Cart',
        onClick: () =>
          isMobile ? setIsDrawerCartOpen(true) : setIsSheetCartOpen(true),
      },
    });
  };

  return (
    <div>
      <div
        className="group w-full cursor-pointer"
        onClick={() => setIsOpenDrawer(true)}
      >
        <div className="w-full aspect-square flex flex-col relative items-center justify-center bg-neutral-100 dark:bg-neutral-900 rounded-md overflow-hidden p-3">
          <div className="absolute bottom-2 right-2 z-10">
            {variant.name.toLowerCase() != 'default' && (
              <Badge>{variant.name}</Badge>
            )}
          </div>
          {firstImage ? (
            <Image
              src={firstImage}
              alt={variant.name}
              width={200}
              height={200}
              className="object-cover h-full w-full group-hover:scale-105 rounded-md transition-all"
            />
          ) : (
            categoryIcon
          )}
        </div>
        <div className="mt-2">
          <div>{productData.name}</div>
          <p className="text-sm text-neutral-500 line-clamp-1">
            {variant.description}
          </p>
          <div className="flex space-x-2 items-end justify-start">
            <div className="text-xl font-semibold">
              <CustomPesoIcon />
              {variant.price}
            </div>
            {variant.compareAtPrice && (
              <div className="text-destructive line-through">
                <CustomPesoIcon />
                {variant.compareAtPrice}
              </div>
            )}
          </div>
        </div>
      </div>
      <Drawer open={isOpenDrawer} onOpenChange={setIsOpenDrawer}>
        <DrawerContent>
          <div className="md:max-w-lg md:mx-auto p-5 pb-10">
            <div className="my-2 text-center">
              <div className="font-semibold">{productData.name}</div>
              <div className="text-neutral-500 text-sm">
                {variant.description}
              </div>
            </div>
            {secondImage ? (
              <Carousel className="mx-auto max-w-[300px]">
                <CarouselContent>
                  {variant.images?.map((item, idx) => {
                    return (
                      <CarouselItem key={`prod-image-${idx}`}>
                        <div className=" aspect-square flex flex-col relative items-center justify-center bg-neutral-900 rounded-md overflow-hidden">
                          <Image
                            src={item}
                            alt={`${variant.name} ${idx}`}
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
                    alt={variant.name}
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
                {variant.price}
              </div>
              {variant.compareAtPrice && (
                <div className="text-destructive line-through">
                  <CustomPesoIcon />
                  {variant.compareAtPrice}
                </div>
              )}
            </div>
            {currentUserData ? (
              <div className="flex items-center gap-5">
                <ProductQuantitySelector
                  value={quantity}
                  onChange={(val) => setQuantity(val)}
                />

                <Button
                  className="hidden md:block bg-highlight hover:bg-highlight_hover text-neutral-950 transition-colors"
                  onClick={() => onAddToCart({ isMobile: false })}
                >
                  Add To Cart
                </Button>
                <Button
                  className="block md:hidden bg-highlight hover:bg-highlight_hover text-neutral-950 transition-colors"
                  onClick={() => onAddToCart({ isMobile: true })}
                >
                  Add To Cart
                </Button>
              </div>
            ) : (
              <SignedOut>
                <div
                  onClick={() => {
                    setIsSheetCartOpen(false);
                    setIsDrawerCartOpen(false);
                  }}
                  className="rounded-full w-fit border px-3 hover:bg-neutral-50 hover:dark:bg-neutral-800 py-1 text-sm"
                >
                  <SignInButton>
                    Sign in before you can add to cart
                  </SignInButton>
                </div>
              </SignedOut>
            )}
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}

export function ProductQuantitySelector({
  value,
  onChange,
}: {
  value: number;
  onChange: (val: number) => void;
}) {
  return (
    <div className="grid grid-cols-3 gap-2">
      <Button
        disabled={value === 1}
        variant={'ghost'}
        onClick={() => {
          if (value === 1) {
            return;
          }
          const newNumber = value - 1;
          onChange(newNumber);
        }}
      >
        <MinusIcon />
      </Button>
      <Input
        type="number"
        className="text-center"
        value={value}
        onChange={(val) => onChange(parseInt(val.target.value))}
      />
      <Button
        variant={'ghost'}
        onClick={() => {
          const newNumber = value + 1;
          onChange(newNumber);
        }}
      >
        <PlusIcon />
      </Button>
    </div>
  );
}
export default StoreProductVariantCard;
