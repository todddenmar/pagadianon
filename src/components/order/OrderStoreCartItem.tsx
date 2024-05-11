import { CartItemType } from '@/typings';
import React from 'react';
import CartListItem from '../cart/CartListItem';
import CustomPesoIcon from '../CustomComponents/CustomPesoIcon';
import { getCartTotal } from '@/helpers/appHelpers';

function OrderStoreCartItem({ item }: { item: any }) {
  return (
    <div className="space-y-3 border rounded-lg p-3 flex flex-col justify-between">
      <div className="space-y-3">
        <div className="text-base font-semibold">{item.storeName}</div>
        <div className="grid grid-cols-1 gap-2">
          {item.cart?.map((cartItem: CartItemType, cartIdx: number) => {
            return (
              <CartListItem
                key={`checkout-cart-item-${cartIdx}`}
                cartItem={cartItem}
              />
            );
          })}
        </div>
      </div>
      <div className="flex justify-between items-center pt-3 border-t">
        <div>Total:</div>
        <div className="md:text-xl font-semibold">
          <CustomPesoIcon />
          {getCartTotal({ cart: item.cart })}
        </div>
      </div>
    </div>
  );
}

export default OrderStoreCartItem;
