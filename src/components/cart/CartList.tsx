import { useAppStore } from '@/lib/store';
import { ImageIcon, MinusIcon, PlusIcon, XIcon } from 'lucide-react';
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
  return (
    <div className=" grid grid-cols-1 gap-2">
      {currentUserCart.map((cartItem, idx) => {
        const qty = cartItem.quantity;
        return (
          <div
            key={`cart-item-${idx}`}
            className="flex justify-between items-center  px-2 py-1 rounded-md bg-neutral-50 dark:bg-neutral-950"
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
                <div className="flex items-center gap-2 p-1  rounded-md dark:bg-neutral-900 bg-neutral-100">
                  <button
                    className=" dark:bg-neutral-950 rounded-md"
                    onClick={() =>
                      qty === 1 ? null : onDecreaseQuantity(cartItem)
                    }
                  >
                    <MinusIcon className="h-5" />
                  </button>
                  {qty}
                  <button
                    className=" dark:bg-neutral-950 rounded-md"
                    onClick={() => onIncreaseQuantity(cartItem)}
                  >
                    <PlusIcon className="h-5" />
                  </button>
                </div>
                <div className="flex items-center gap-1 dark:text-neutral-500">
                  <XIcon className="h-3" />
                  <div className="flex items-center ">
                    <CustomPesoIcon />
                    {cartItem.price}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center text-xl font-bold">
              <CustomPesoIcon />
              <span>{cartItem.price * qty}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default CartList;
