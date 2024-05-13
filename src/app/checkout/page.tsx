import CheckoutSection from '@/components/checkout/CheckoutSection';
import ContainerLayout from '@/components/layouts/ContainerLayout';
import React from 'react';

function CheckoutPage() {
  return (
    <div>
      <ContainerLayout>
        <CheckoutSection />
      </ContainerLayout>
    </div>
  );
}

export default CheckoutPage;
