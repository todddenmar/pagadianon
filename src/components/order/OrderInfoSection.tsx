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
import { getCartTotal, getDeliveryServiceUserType } from '@/helpers/appHelpers';
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
import ManageOrderDelivery from './ManageOrderDelivery';
import CustomPesoIcon from '../CustomComponents/CustomPesoIcon';

function OrderInfoSection() {
  const currentSettings = useAppStore((state) => state.currentSettings);
  const [isManagingDelivery, setIsManagingDelivery] = useState(false);
  const { orderData, currentUserEmail } = useContext(OrderContext);
  if (!orderData) return <LoadingComponent />;
  if (!currentSettings) return <LoadingComponent />;
  const deliveryService = currentSettings.delivery_services.find(
    (item: DeliveryServiceType) => item.id === orderData.deliveryServiceID
  );
  let userType = getDeliveryServiceUserType({
    deliveryServices: currentSettings?.delivery_services,
    deliveryServiceID: orderData.deliveryServiceID,
    currentEmail: currentUserEmail,
  });
  const deliveryIsConfirmed = orderData?.deliveryServiceInfo?.isConfirmed;

  const onManageDelivery = () => {
    setIsManagingDelivery(true);
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
                {orderData.deliveryServiceInfo?.isConfirmed ? (
                  <div className="text-green-500 flex items-center gap-2 justify-center">
                    <span>
                      Order Confirmed at{' '}
                      {orderData.deliveryServiceInfo.confirmedDateTime}
                    </span>
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
          {orderData?.deliveryServiceInfo?.rider && (
            <OrderInfoItem
              label="Delivery Rider"
              value={
                <div className="flex items-center gap-2">
                  <div>
                    <div>{orderData?.deliveryServiceInfo?.rider.name}</div>
                    <a
                      className="text-highlight"
                      href={`tel:+63${orderData?.deliveryServiceInfo?.rider.mobileNumber}`}
                    >
                      +63{orderData?.deliveryServiceInfo?.rider.mobileNumber}
                    </a>
                  </div>
                  {userType === kDeliveryServiceRoleType.MANAGER && (
                    <button className="flex gap-2 text-highlight">
                      <ReplaceIcon onClick={onManageDelivery} className="h-5" />{' '}
                    </button>
                  )}
                </div>
              }
            />
          )}
          {orderData?.deliveryServiceInfo?.fee && (
            <OrderInfoItem
              label="Delivery Fee"
              value={
                <div className="flex items-center font-semibold  text-white">
                  <CustomPesoIcon />
                  <span>{orderData?.deliveryServiceInfo?.fee}</span>
                </div>
              }
            />
          )}
          <OrderInfoItem
            label="Subtotal"
            value={
              <div className="flex items-center font-semibold  text-white">
                <CustomPesoIcon />
                <span>{getCartTotal({ cart: orderData.cart })}</span>
              </div>
            }
          />
        </div>
        <div>
          {!deliveryIsConfirmed &&
            userType === kDeliveryServiceRoleType.MANAGER && (
              <Button
                onClick={onManageDelivery}
                className="bg-highlight hover:bg-highlight_hover text-neutral-950 w-full rounded-t-none"
              >
                Manage Rider and Delivery Fee
              </Button>
            )}
        </div>
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
      <Dialog open={isManagingDelivery} onOpenChange={setIsManagingDelivery}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Manage Delivery</DialogTitle>
          </DialogHeader>
          <ManageOrderDelivery setClose={() => setIsManagingDelivery(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default OrderInfoSection;
