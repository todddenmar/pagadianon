import React, { useEffect } from 'react';
import CheckoutCustomerDetailsForm from './CheckoutCustomerDetailsForm';
import CustomerCheckoutCart from './CustomerCheckoutCart';
import { ScrollArea } from '../ui/scroll-area';
import { useAppStore } from '@/lib/store';

function CheckoutSection({ setClose }: { setClose: () => void }) {
  const [currentUserCart] = useAppStore((state) => [state.currentUserCart]);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      console.log('Latitude is :', position.coords.latitude);
      console.log('Longitude is :', position.coords.longitude);
    });
  });
  return (
    <div>
      <ScrollArea className="h-[500px] w-full rounded-md border p-4 md:hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10">
          <CustomerCheckoutCart cart={currentUserCart} />
          <CheckoutCustomerDetailsForm setClose={setClose} />
        </div>
      </ScrollArea>
      <div className="hidden md:grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10">
        <CustomerCheckoutCart cart={currentUserCart} />
        <CheckoutCustomerDetailsForm setClose={setClose} />
      </div>
    </div>
  );
}

export default CheckoutSection;
