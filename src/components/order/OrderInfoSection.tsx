import { DeliveryServiceType } from '@/typings';
import React, { useContext, useState } from 'react';
import OrderSectionTitle from './OrderSectionTitle';
import { Card } from '../ui/card';
import OrderInfoItem from './OrderInfoItem';
import LoadingComponent from '../admin/LoadingComponent.';
import { useAppStore } from '@/lib/store';
import CustomCopyButton from '../CustomComponents/CustomCopyButton';
import {
  CheckCircleIcon,
  LoaderIcon,
  MessageCircleIcon,
  ReplaceIcon,
} from 'lucide-react';
import { OrderContext } from '../providers/OrderContextProvider';
import { getDeliveryServiceUserType } from '@/helpers/appHelpers';
import { kDeliveryServiceRoleType, kOrderProgress } from '@/constants';
import { Button } from '../ui/button';
import { dbConfirmOrderByDeliveryService } from '@/helpers/firebaseHelpers';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import OrderSelectRider from './OrderSelectRider';

function OrderInfoSection() {
  const currentSettings = useAppStore((state) => state.currentSettings);
  const [isLoading, setIsLoading] = useState(false);
  const [isSelectingRider, setIsSelectingRider] = useState(false);
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

  const onConfirmDeliveryService = async (selectedRider: any) => {
    setIsLoading(true);
    const updatedOrderDeliveryServiceStatus = {
      id: orderData?.deliveryService?.id!,
      isConfirmed: true,
    };
    const res = await dbConfirmOrderByDeliveryService({
      orderID: orderData.id,
      data: updatedOrderDeliveryServiceStatus,
      selectedRider,
      progressStatus: kOrderProgress.CONFIRMED,
    });
    if (res.status === 'error') {
      console.log(res.error);
      return;
    }
    setOrderData({
      ...orderData,
      deliveryRider: selectedRider,
      deliveryService: updatedOrderDeliveryServiceStatus,
      progressStatus: kOrderProgress.CONFIRMED,
    });
    setIsLoading(false);
  };

  const onSelectRider = () => {
    setIsSelectingRider(true);
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
                  <div className="text-green-500 flex items-center gap-2 justify-center">
                    <span>Order Confirmed By {deliveryService.name}</span>
                    <CheckCircleIcon className="h-5" />
                  </div>
                ) : (
                  <div className="animate-pulse text-orange-500">
                    Waiting for confirmation...
                  </div>
                )}
              </div>
            </div>
          )}
          {orderData?.deliveryRider && (
            <OrderInfoItem
              label="Delivery Rider"
              value={
                <div className="flex items-center gap-2">
                  <div>
                    <div>{orderData?.deliveryRider.name}</div>
                    <a
                      className="text-highlight"
                      href={`tel:+63${orderData?.deliveryRider.mobileNumber}`}
                    >
                      +63{orderData?.deliveryRider.mobileNumber}
                    </a>
                  </div>
                  {userType === kDeliveryServiceRoleType.MANAGER && (
                    <button className="flex gap-2 text-highlight">
                      <ReplaceIcon onClick={onSelectRider} className="h-5" />{' '}
                    </button>
                  )}
                </div>
              }
            />
          )}
        </div>
        {!isLoading ? (
          <div>
            {!deliveryIsConfirmed &&
              userType === kDeliveryServiceRoleType.MANAGER && (
                <Button
                  onClick={onSelectRider}
                  className="bg-highlight hover:bg-highlight_hover text-neutral-950 w-full rounded-t-none"
                >
                  Select Rider
                </Button>
              )}
          </div>
        ) : (
          <div className="flex justify-center h-[50px] flex-col items-center">
            <LoaderIcon className="animate-spin" />
          </div>
        )}
        {userType === null && (
          <a
            target="_blank"
            href={`https://m.me/${deliveryService?.messengerUsername}`}
            className="p-3 text-sm cursor-pointer font-semibold transition-all flex items-center space-x-2 justify-center bg-highlight hover:bg-highlight_hover text-neutral-950"
          >
            <span>Send us your Order ID</span>
            <MessageCircleIcon className="h-5" />
          </a>
        )}
      </Card>
      <Dialog open={isSelectingRider} onOpenChange={setIsSelectingRider}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Choose a Rider</DialogTitle>
          </DialogHeader>
          <OrderSelectRider
            deliveryService={deliveryService}
            onSetRider={(val) => {
              onConfirmDeliveryService(val);
              setIsSelectingRider(false);
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default OrderInfoSection;
