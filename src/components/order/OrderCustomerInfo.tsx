import React, { useContext } from 'react';
import { Card } from '../ui/card';
import OrderSectionTitle from './OrderSectionTitle';
import OrderInfoItem from './OrderInfoItem';
import { OrderContext } from '../providers/OrderContextProvider';
import LoadingComponent from '../admin/LoadingComponent.';
import { NavigationIcon } from 'lucide-react';
import { Button } from '../ui/button';

function OrderCustomerInfo() {
  const { orderData } = useContext(OrderContext);
  if (!orderData) return <LoadingComponent />;
  const customer = orderData.customer;
  const coordinates = customer.coordinates;
  return (
    <div>
      <OrderSectionTitle text="Customer Info" />
      <Card className="mt-2 overflow-hidden">
        <div className="p-3 space-y-3 ">
          <OrderInfoItem
            label="Name"
            value={`${customer.firstName} ${customer.lastName}`}
          />
          <OrderInfoItem
            label="Mobile Number"
            value={`+63${customer.mobileNumber}`}
          />
          <OrderInfoItem label="Address" value={customer.address} />
        </div>
        {coordinates && (
          <Button
            className="bg-highlight hover:bg-highlight_hover text-neutral-950 w-full rounded-t-none"
            asChild
          >
            <a
              target="_blank"
              href={`https://www.google.com/maps/dir/?api=1&travelmode=driving&layer=traffic&destination=${coordinates.latitude},${coordinates.longitude}`}
              className="flex space-x-1 items-center"
            >
              <span>Get Direction</span>
              <NavigationIcon className="h-5" />
            </a>
          </Button>
        )}
      </Card>
    </div>
  );
}

export default OrderCustomerInfo;
