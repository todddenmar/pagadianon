import { useAppStore } from '@/lib/store';
import { ImageIcon, MinusIcon, PlusIcon, TrashIcon, XIcon } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import { Input } from '../ui/input';
import { CartItemType } from '@/typings';
import CustomPesoIcon from '../CustomComponents/CustomPesoIcon';

function CartList() {
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
  return (
    <div className=" grid grid-cols-1 gap-2">
      {currentUserCart.map((cartItem, idx) => {
        const qty = cartItem.quantity;
        return (
          <div
            key={`cart-item-${idx}`}
            className="flex justify-between items-center  px-2 py-1 rounded-2xl bg-neutral-50 dark:bg-neutral-900"
          >
            <div className="relative h-[60px] aspect-square">
              {cartItem.imageURL ? (
                <Image
                  src={cartItem.imageURL}
                  alt={cartItem.name}
                  width={60}
                  height={60}
                  className="h-full w-full object-cover"
                />
              ) : (
                <ImageIcon />
              )}
            </div>
            <div className="p-3 flex-1">
              <div className="font-semibold">{cartItem.name}</div>
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
            </div>
            <div className="flex flex-col items-end">
              <div className="flex items-center text-xl font-bold px-2">
                <CustomPesoIcon />
                <span>{cartItem.price * qty}</span>
              </div>
              <div className="flex items-center dark:text-neutral-500">
                <XIcon className="h-3" />
                <div className="flex items-center ">
                  <CustomPesoIcon />
                  {cartItem.price}
                </div>
                <button
                  onClick={() => onRemoveItem(cartItem.variantID)}
                  className="p-1"
                >
                  <TrashIcon className="h-4 text-destructive" />
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default CartList;
