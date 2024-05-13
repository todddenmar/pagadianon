import { DeliveryServiceType } from '@/typings';
import React, { useContext, useState } from 'react';
import OrderSectionTitle from './OrderSectionTitle';
import { Card } from '../ui/card';
import OrderInfoItem from './OrderInfoItem';
import LoadingComponent from '../admin/LoadingComponent.';
import { useAppStore } from '@/lib/store';
import CustomCopyButton from '../CustomComponents/CustomCopyButton';
import { LoaderIcon, MessageCircleIcon } from 'lucide-react';
import { OrderContext } from '../providers/OrderContextProvider';
import { getDeliveryServiceUserType } from '@/helpers/appHelpers';
import { kDeliveryServiceRoleType } from '@/constants';
import { Button } from '../ui/button';
import {
  dbConfirmOrderByDeliveryService,
  dbUpdateDeliveryService,
} from '@/helpers/firebaseHelpers';

function OrderInfoSection() {
  const currentSettings = useAppStore((state) => state.currentSettings);
  const [isLoading, setIsLoading] = useState(false);
  const { orderData, setOrderData, currentUserEmail } =
    useContext(OrderContext);
  if (!orderData) return <LoadingComponent />;
  if (!currentSettings) return <LoadingComponent />;
  const deliveryService = currentSettings.delivery_services.find(
    (item: DeliveryServiceType) => item.id === orderData.deliveryService?.id
  );
  let userType = getDeliveryServiceUserType({
    deliveryServices: currentSettings?.delivery_services,
    deliveryServiceID: orderData.deliveryService?.id,
    currentEmail: currentUserEmail,
  });
  const deliveryIsConfirmed = orderData?.deliveryService?.isConfirmed;

  const onConfirmDeliveryService = async () => {
    setIsLoading(true);
    const updatedOrderDeliveryServiceStatus = {
      id: orderData?.deliveryService?.id!,
      isConfirmed: true,
    };
    const res = await dbConfirmOrderByDeliveryService({
      orderID: orderData.id,
      data: updatedOrderDeliveryServiceStatus,
    });
    if (res.status === 'error') {
      console.log(res.error);
      return;
    }
    setOrderData({
      ...orderData,
      deliveryService: updatedOrderDeliveryServiceStatus,
    });
    setIsLoading(false);
  };

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
                value={
                  deliveryService?.facebookUsername ? (
                    <a
                      target="_blank"
                      className="text-highlight"
                      href={`https://m.facebook.com/${deliveryService?.facebookUsername}`}
                    >
                      {deliveryService.name}
                    </a>
                  ) : (
                    deliveryService.name
                  )
                }
              />
              <div className="text-center py-5 text-sm">
                {orderData.deliveryService?.isConfirmed ? (
                  <div className="text-green-500">
                    Order Confirmed By {deliveryService.name}
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
        {!isLoading ? (
          <div>
            {!deliveryIsConfirmed &&
            userType === kDeliveryServiceRoleType.MANAGER ? (
              <Button
                onClick={onConfirmDeliveryService}
                className="bg-highlight hover:bg-highlight_hover text-neutral-950 w-full rounded-t-none"
              >
                Confirm Delivery Service
              </Button>
            ) : (
              <a
                target="_blank"
                href={`https://m.me/${deliveryService?.messengerUsername}`}
                className="p-3 text-sm cursor-pointer font-semibold transition-all flex items-center space-x-2 justify-center bg-highlight hover:bg-highlight_hover text-neutral-950"
              >
                <span>Send us your Order ID</span>
                <MessageCircleIcon className="h-5" />
              </a>
            )}
          </div>
        ) : (
          <div className="flex justify-center h-[50px] flex-col items-center">
            <LoaderIcon className="animate-spin" />
          </div>
        )}
      </Card>
    </div>
  );
}

export default OrderInfoSection;
