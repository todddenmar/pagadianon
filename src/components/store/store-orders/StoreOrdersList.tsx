import { OrderType } from '@/typings';
import React from 'react';
import StoreOrderCard from './StoreOrderCard';

function StoreOrdersList({ orders }: { orders: OrderType[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {orders.map((orderItem, idx) => {
        return (
          <StoreOrderCard key={`order-cart-item-${idx}`} order={orderItem} />
        );
      })}
    </div>
  );
}

export default StoreOrdersList;
