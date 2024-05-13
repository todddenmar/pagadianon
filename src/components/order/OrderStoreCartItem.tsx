import { CartItemType, DeliveryServiceType } from '@/typings';
import React, { useContext, useState } from 'react';
import CartListItem from '../cart/CartListItem';
import CustomPesoIcon from '../CustomComponents/CustomPesoIcon';
import {
  convertStringCoordinatesToObject,
  getCartTotal,
  getDeliveryServiceUserType,
  pluralizeNumber,
} from '@/helpers/appHelpers';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '../ui/button';
import { OrderContext } from '../providers/OrderContextProvider';
import LoadingComponent from '../admin/LoadingComponent.';
import {
  CheckCircleIcon,
  CheckIcon,
  InfoIcon,
  LoaderCircleIcon,
  NavigationIcon,
} from 'lucide-react';
import { useUser } from '@clerk/nextjs';
import { useAppStore } from '@/lib/store';
import { kDeliveryServiceRoleType } from '@/constants';
import { dbUpdateStoreCartStatus } from '@/helpers/firebaseHelpers';
import { toast } from 'sonner';
import moment from 'moment';
import Link from 'next/link';
import OrderInfoItem from './OrderInfoItem';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

function OrderStoreCartItem({ item }: { item: any }) {
  const [isConfirming, setIsConfirming] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentSettings, currentUserData] = useAppStore((state) => [
    state.currentSettings,
    state.currentUserData,
  ]);
  const { orderData, setOrderData, currentUserEmail } =
    useContext(OrderContext);
  if (!orderData) return <LoadingComponent />;
  if (!currentSettings) return <LoadingComponent />;
  const isStoreManager = currentUserData?.stores?.find(
    (storeID: string) => storeID === item.storeID
  )
    ? 'store manager'
    : null;
  let userType =
    getDeliveryServiceUserType({
      deliveryServices: currentSettings?.delivery_services,
      deliveryServiceID: orderData.deliveryService?.id,
      currentEmail: currentUserEmail,
    }) || isStoreManager;

  const isConfirmed = orderData.storesInvolved?.find(
    (storeStatusItem) => storeStatusItem?.storeID === item.storeID
  )?.isConfirmed;

  const deliveryIsConfirmed = orderData?.deliveryService?.isConfirmed;
  const coordinates = convertStringCoordinatesToObject(
    item.contactInfo.coordinates
  );

  const onConfirm = async () => {
    setIsLoading(true);
    const updatedStoresInvolved = orderData.storesInvolved?.map(
      (storeItem: any) =>
        storeItem.storeID === item.storeID
          ? { ...storeItem, isConfirmed: true }
          : storeItem
    );
    const res = await dbUpdateStoreCartStatus({
      orderID: orderData.id,
      storesInvolved: updatedStoresInvolved,
    });
    if (res.status === 'error') {
      console.log(res.error);
      return;
    }
    setOrderData({ ...orderData, storesInvolved: updatedStoresInvolved });
    toast.success(`Confirmed cart items for ${item.name}`, {
      description: moment(new Date()).format('LLL'),
    });
    setIsConfirming(false);
    setIsLoading(false);
  };
  return (
    <div className="border rounded-lg flex flex-col justify-between overflow-hidden">
      <div className="p-3 flex flex-col justify-between h-full">
        <div className="space-y-3 flex-1">
          <div className="flex justify-between gap-2">
            <div className="flex items-center gap-2">
              <div className="text-base font-semibold">{item.name}</div>
              <Dialog>
                <DialogTrigger>
                  <InfoIcon className="h-5 text-highlight" />
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{item.name}</DialogTitle>
                    <DialogDescription>
                      These are the contact info of the store
                    </DialogDescription>
                  </DialogHeader>
                  <OrderInfoItem
                    label="Mobile Number"
                    value={
                      <a
                        className="text-highlight"
                        href={`tel:+63${item.contactInfo.mobileNumber}`}
                      >
                        +63{item.contactInfo.mobileNumber}
                      </a>
                    }
                  />
                  <OrderInfoItem
                    label="Address"
                    value={item.contactInfo.address}
                  />
                  <div className="mt-5">
                    {coordinates && (
                      <Button
                        className="bg-highlight hover:bg-highlight_hover text-neutral-950 w-full "
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
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            <div className="text-neutral-400 text-sm">
              {pluralizeNumber({
                plural: 'Items',
                singular: 'Item',
                number: item.cart.length,
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-2">
            {item.cart?.map((cartItem: CartItemType, cartIdx: number) => {
              return (
                <CartListItem
                  key={`checkout-cart-item-${cartIdx}`}
                  cartItem={cartItem}
                />
              );
            })}
          </div>
        </div>
        <div className="flex justify-between items-center pt-3 mt-3 border-t">
          <div>Total:</div>
          <div className="md:text-xl font-semibold">
            <CustomPesoIcon />
            {getCartTotal({ cart: item.cart })}
          </div>
        </div>
      </div>

      {isConfirmed ? (
        <div className="p-3 text-sm text-green-500 font-semibold text-center w-full bg-neutral-900 flex justify-center space-x-2">
          <span>Confirmed</span> <CheckCircleIcon className="h-5" />
        </div>
      ) : deliveryIsConfirmed && userType === 'store manager' ? (
        <Button
          onClick={() => setIsConfirming(true)}
          className="text-neutral-950 bg-highlight hover:bg-highlight_hover rounded-t-none"
        >
          Confirm Cart
        </Button>
      ) : (
        <div className="p-3 text-sm animate-pulse text-orange-400 font-semibold text-center w-full bg-neutral-900 flex justify-center space-x-2">
          <span>Waiting for store confirmation...</span>{' '}
          <LoaderCircleIcon className="h-5 animate-spin" />
        </div>
      )}

      <Dialog open={isConfirming} onOpenChange={setIsConfirming}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure you want to confirm cart?</DialogTitle>
            <DialogDescription>
              This means {item.storeName} has approved the orders and will start
              preparing the products.
            </DialogDescription>
          </DialogHeader>
          {isLoading ? (
            <div className="w-full h-[50px] flex flex-col items-center justify-center pt-5">
              <span>
                <LoaderCircleIcon className="animate-spin" />
              </span>
            </div>
          ) : (
            <div className="w-full grid grid-cols-2 gap-5 pt-5">
              <Button
                onClick={(e) => {
                  setIsConfirming(false);
                }}
                variant={'secondary'}
              >
                Cancel
              </Button>
              <Button
                className="bg-highlight hover:bg-highlight_hover transition-all"
                onClick={onConfirm}
              >
                Confirm
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default OrderStoreCartItem;
