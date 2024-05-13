'use client';
import { OrderType } from '@/typings';
import { useAuth, useUser } from '@clerk/nextjs';
import { createContext, useEffect, useState } from 'react';
import NoDataSection from '../error/NoDataSection';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '@/firebase';
import moment from 'moment';

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
  const [currentUserEmail, setCurrentUserEmail] = useState<string | null>(null);
  useEffect(() => {
    if (user?.primaryEmailAddress?.emailAddress)
      setCurrentUserEmail(user?.primaryEmailAddress?.emailAddress!);
  }, [user]);
  const date = new Date();
  const year = moment(date).format('YYYY');
  const month = moment(date).format('MM');
  useEffect(() => {
    const unsub = onSnapshot(
      doc(db, 'orders', String(year), String(month), String(orderData.id)),
      (doc) => {
        setOrderData(doc.data());
      }
    );
    return () => unsub();
  }, []);

  if (!isLoaded || !isSignedIn) {
    return <NoDataSection title="You are not signed in" />;
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
