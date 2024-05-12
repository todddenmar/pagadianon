import { useAppStore } from '@/lib/store';
import React from 'react';
import CartListItem from '../cart/CartListItem';
import CustomPesoIcon from '../CustomComponents/CustomPesoIcon';
import { getCartTotal } from '@/helpers/appHelpers';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CartItemType } from '@/typings';
function CustomerCheckoutCart({ cart }: { cart: CartItemType[] }) {
  return (
    <div>
      <ScrollArea className="h-[200px] md:h-[550px] w-full rounded-md border p-4">
        <div className="grid grid-cols-1 gap-2">
          {cart?.map((item: CartItemType, idx) => {
            return (
              <CartListItem key={`checkout-cart-item-${idx}`} cartItem={item} />
            );
          })}
        </div>
      </ScrollArea>
      {cart.length > 0 && (
        <div className="flex justify-between items-center mt-2 px-2">
          <div>Total:</div>
          <div className="md:text-xl font-semibold">
            <CustomPesoIcon />
            {getCartTotal({ cart: cart })}
          </div>
        </div>
      )}
    </div>
  );
}

export default CustomerCheckoutCart;
