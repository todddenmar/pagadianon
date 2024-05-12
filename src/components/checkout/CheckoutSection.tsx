import React from 'react';
import CheckoutCustomerDetailsForm from './CheckoutCustomerDetailsForm';

function CheckoutSection({ setClose }: { setClose: () => void }) {
  return (
    <div className="">
      <CheckoutCustomerDetailsForm setClose={setClose} />
    </div>
  );
}

export default CheckoutSection;
