import CustomPesoIcon from '@/components/CustomComponents/CustomPesoIcon';
import CartListItem from '@/components/cart/CartListItem';
import {
  getCartTotal,
  getOrderLinkByDate,
  pluralizeNumber,
} from '@/helpers/appHelpers';
import { CartItemType } from '@/typings';
import moment from 'moment';
import React from 'react';

function StoreOrderCard({ order }: { order: any }) {
  const year = moment(new Date(order.createdAt)).format('YYYY');
  const month = moment(new Date(order.createdAt)).format('MM');
  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="grid grid-cols-1 p-3">
        <div className="flex justify-between items-center gap-5">
          <div className="text-sm">{order.createdAt}</div>
          <div className="text-neutral-400 text-sm">
            {pluralizeNumber({
              plural: 'Items',
              singular: 'Item',
              number: order.cart.length,
            })}
          </div>
        </div>
        <div className="grid grid-cols-1 gap-2 mt-3">
          {order.cart?.map((cartItem: CartItemType, cartIdx: number) => {
            return (
              <CartListItem
                key={`cart-card-item-${cartIdx}`}
                cartItem={cartItem}
              />
            );
          })}
        </div>
        <div className="flex justify-between items-center pt-3 mt-3 border-t">
          <div>Total:</div>
          <div className="md:text-xl font-semibold">
            <CustomPesoIcon />
            {getCartTotal({ cart: order.cart })}
          </div>
        </div>
      </div>
      <a
        target="_blank"
        href={getOrderLinkByDate({ orderID: order.orderID, year, month })}
        className="p-3 text-sm cursor-pointer font-semibold transition-all flex items-center space-x-2 justify-center bg-highlight hover:bg-highlight_hover text-neutral-950"
      >
        View Order
      </a>
    </div>
  );
}

export default StoreOrderCard;
