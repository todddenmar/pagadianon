import { CustomerType } from '@/typings';
import React from 'react';
import { Card } from '../ui/card';
import OrderSectionTitle from './OrderSectionTitle';
import OrderInfoItem from './OrderInfoItem';

function OrderCustomerInfo({ customer }: { customer: CustomerType }) {
  return (
    <div>
      <OrderSectionTitle text="Customer Info" />
      <Card className="space-y-3 mt-2 p-3">
        <OrderInfoItem
          label="Name"
          value={`${customer.firstName} ${customer.lastName}`}
        />
        <OrderInfoItem
          label="Mobile Number"
          value={`+63${customer.mobileNumber}`}
        />
        <OrderInfoItem label="Address" value={customer.address} />
      </Card>
    </div>
  );
}

export default OrderCustomerInfo;
