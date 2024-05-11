import { CartItemType } from '@/typings';
import React from 'react';
import { ImageIcon, MinusIcon, PlusIcon, TrashIcon, XIcon } from 'lucide-react';
import Image from 'next/image';
import { Input } from '../ui/input';
import CustomPesoIcon from '../CustomComponents/CustomPesoIcon';
import { useAppStore } from '@/lib/store';
import { cn } from '@/lib/utils';
function CartListItem({
  cartItem,
  isAllowingUpdate,
}: {
  cartItem: CartItemType;
  isAllowingUpdate?: boolean;
}) {
  const [currentUserCart, setCurrentUserCart] = useAppStore((state) => [
    state.currentUserCart,
    state.setCurrentUserCart,
  ]);
  const onDecreaseQuantity = (item: CartItemType) => {
    const updatedCart = currentUserCart.map((cartItem) =>
      cartItem.variantID === item.variantID
        ? {
            ...cartItem,
            quantity: parseInt(cartItem.quantity) - 1,
            totalAmount: cartItem.totalAmount - parseInt(cartItem.price) * 1,
          }
        : cartItem
    );
    setCurrentUserCart(updatedCart);
  };

  const onIncreaseQuantity = (item: CartItemType) => {
    const updatedCart = currentUserCart.map((cartItem) =>
      cartItem.variantID === item.variantID
        ? {
            ...cartItem,
            quantity: parseInt(cartItem.quantity) + 1,
            totalAmount: cartItem.totalAmount + parseInt(cartItem.price) * 1,
          }
        : cartItem
    );
    setCurrentUserCart(updatedCart);
  };

  const onRemoveItem = (variantID: string) => {
    const updatedCart = currentUserCart.filter(
      (item) => item.variantID != variantID
    );
    setCurrentUserCart(updatedCart);
  };
  const qty = cartItem.quantity;
  return (
    <div className="flex justify-between items-center  px-2 pl-1 py-1 rounded-2xl bg-neutral-50 dark:bg-neutral-900">
      <div className="relative h-[60px] aspect-square rounded-2xl overflow-hidden">
        {cartItem.imageURL ? (
          <Image
            src={cartItem.imageURL}
            alt={cartItem.name}
            width={60}
            height={60}
            className="h-full w-full object-cover "
          />
        ) : (
          <ImageIcon />
        )}
      </div>
      <div className="p-1 md:p-3 flex-1">
        <div className="font-semibold text-sm md:text-base">
          {cartItem.name}
        </div>
        {isAllowingUpdate && (
          <div className="flex items-center gap-2 mt-2 text-sm">
            <div className="flex items-center gap-2 p-1  rounded-full dark:bg-neutral-900 bg-neutral-100">
              <button
                className=" p-1 bg-neutral-200 dark:bg-neutral-800 rounded-full"
                onClick={() =>
                  qty === 1
                    ? onRemoveItem(cartItem.variantID)
                    : onDecreaseQuantity(cartItem)
                }
              >
                <MinusIcon className="h-[16px]" />
              </button>
              {qty}
              <button
                className=" p-1 bg-neutral-200 dark:bg-neutral-800 rounded-full"
                onClick={() => onIncreaseQuantity(cartItem)}
              >
                <PlusIcon className="h-[16px]" />
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-col items-end">
        <div
          className={cn('flex items-center md:text-xl font-semibold', {
            'px-2': isAllowingUpdate,
          })}
        >
          <CustomPesoIcon />
          <span>{cartItem.price * qty}</span>
        </div>
        <div className="flex items-center dark:text-neutral-500">
          {!isAllowingUpdate && <div>{qty}</div>}
          <XIcon className="h-3" />
          <div className="flex text-sm items-center ">
            <CustomPesoIcon />
            {cartItem.price}
          </div>
          {isAllowingUpdate && (
            <button
              onClick={() => onRemoveItem(cartItem.variantID)}
              className="p-1"
            >
              <TrashIcon className="h-4 text-destructive" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default CartListItem;
