'use client';
import { OrderType } from '@/typings';
import { useAuth, useUser } from '@clerk/nextjs';
import { createContext, useState } from 'react';

type OrderContextType = {
  orderData: OrderType | null;
  setOrderData: any;
  currentUserEmail: any;
  setCurrentUserEmail: any;
};
export const OrderContext = createContext<OrderContextType>({
  orderData: null,
  setOrderData: null,
  currentUserEmail: null,
  setCurrentUserEmail: null,
});

function OrderContextProvider({
  data,
  children,
}: {
  data: any;
  children: any;
}) {
  const { isLoaded, isSignedIn, user } = useUser();
  const [orderData, setOrderData] = useState(data);
  const [currentUserEmail, setCurrentUserEmail] = useState(
    user?.primaryEmailAddress?.emailAddress
  );
  if (!isLoaded || !isSignedIn) {
    return null;
  }

  return (
    <OrderContext.Provider
      value={{ orderData, setOrderData, currentUserEmail, setCurrentUserEmail }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export default OrderContextProvider;
