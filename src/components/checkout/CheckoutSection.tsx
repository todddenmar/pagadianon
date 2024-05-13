'use client';
import React from 'react';
import CheckoutCustomerDetailsForm from './CheckoutCustomerDetailsForm';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

function CheckoutSection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Checkout</CardTitle>
        <CardDescription>Please fill up the required fields.</CardDescription>
      </CardHeader>
      <CardContent>
        <CheckoutCustomerDetailsForm />
      </CardContent>
    </Card>
  );
}

export default CheckoutSection;
