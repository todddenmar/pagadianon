import { DeliveryServiceType, OrderType } from '@/typings';
import React from 'react';
import OrderSectionTitle from './OrderSectionTitle';
import { Card } from '../ui/card';
import OrderInfoItem from './OrderInfoItem';
import LoadingComponent from '../admin/LoadingComponent.';
import { useAppStore } from '@/lib/store';

function OrderInfoSection({ orderData }: { orderData: OrderType }) {
  const currentSettings = useAppStore((state) => state.currentSettings);
  if (!currentSettings) return <LoadingComponent />;
  const deliveryService = currentSettings.delivery_services.find(
    (item: DeliveryServiceType) => item.id === orderData.deliveryService?.id
  );

  return (
    <div>
      <OrderSectionTitle text="Order Info" />
      <Card className="mt-2 p-3">
        <div className="space-y-3">
          <OrderInfoItem
            label="Payment Method"
            value={orderData.paymentMethod}
          />
          <OrderInfoItem
            label="Fulfillment Method"
            value={orderData.fulfillmentMethod}
          />
          {deliveryService && (
            <div>
              <OrderInfoItem
                label="Delivery Service Company"
                value={deliveryService.name}
              />
              {orderData.deliveryService?.isConfirmed ? (
                <div>Delivery service confirmed</div>
              ) : (
                <div>Waiting for confirmation</div>
              )}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}

export default OrderInfoSection;
