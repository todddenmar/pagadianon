import { DeliveryServiceType, OrderType } from '@/typings';
import React from 'react';
import OrderSectionTitle from './OrderSectionTitle';
import { Card } from '../ui/card';
import OrderInfoItem from './OrderInfoItem';
import LoadingComponent from '../admin/LoadingComponent.';
import { useAppStore } from '@/lib/store';
import CustomCopyButton from '../CustomComponents/CustomCopyButton';
import { MessageCircleIcon } from 'lucide-react';

function OrderInfoSection({ orderData }: { orderData: OrderType }) {
  const currentSettings = useAppStore((state) => state.currentSettings);
  if (!currentSettings) return <LoadingComponent />;
  const deliveryService = currentSettings.delivery_services.find(
    (item: DeliveryServiceType) => item.id === orderData.deliveryService?.id
  );

  return (
    <div>
      <OrderSectionTitle text="Order Info" />
      <Card className="mt-2 overflow-hidden">
        <div className="space-y-3 p-3">
          <OrderInfoItem
            label={`Order ID`}
            value={
              <div className="text-sm flex space-x-2 items-center">
                <span>{orderData.id}</span>
                <div className="flex space-x-2 rounded-md text-highlight hover:text-highlight_hover w-fit ">
                  <CustomCopyButton label="Copy Order ID" text={orderData.id} />
                </div>
              </div>
            }
          />

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
              <div className="text-center py-5 text-sm">
                {orderData.deliveryService?.isConfirmed ? (
                  <div className="text-green-500">
                    Delivery service confirmed
                  </div>
                ) : (
                  <div className="animate-pulse text-orange-500">
                    Waiting for confirmation...
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        <a
          target="_blank"
          href={deliveryService?.facebookMessengerURL}
          className="p-3 cursor-pointer font-semibold transition-all flex items-center space-x-2 justify-center bg-highlight hover:bg-highlight_hover text-neutral-950"
        >
          <span>Send us your Order ID</span>
          <MessageCircleIcon />
        </a>
      </Card>
    </div>
  );
}

export default OrderInfoSection;
