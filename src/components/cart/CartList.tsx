import { useAppStore } from '@/lib/store';
import React from 'react';

import CartListItem from './CartListItem';

function CartList() {
  const [currentUserCart] = useAppStore((state) => [state.currentUserCart]);

  return (
    <div className=" grid grid-cols-1 gap-2">
      {currentUserCart.map((cartItem, idx) => {
        return (
          <CartListItem
            key={`cart-item-${idx}`}
            cartItem={cartItem}
            isAllowingUpdate={true}
          />
        );
      })}
    </div>
  );
}

export default CartList;
