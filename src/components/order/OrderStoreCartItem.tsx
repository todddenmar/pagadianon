import { CartItemType, DeliveryServiceType } from '@/typings';
import React, { useContext, useState } from 'react';
import CartListItem from '../cart/CartListItem';
import CustomPesoIcon from '../CustomComponents/CustomPesoIcon';
import { getCartTotal, pluralizeNumber } from '@/helpers/appHelpers';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '../ui/button';
import { OrderContext } from '../providers/OrderContextProvider';
import LoadingComponent from '../admin/LoadingComponent.';
import { CheckCircleIcon, CheckIcon, LoaderCircleIcon } from 'lucide-react';
import { useUser } from '@clerk/nextjs';
import { useAppStore } from '@/lib/store';
import { kDeliveryServiceRoleType } from '@/constants';
import { dbUpdateStoreCartStatus } from '@/helpers/firebaseHelpers';
import { toast } from 'sonner';
import moment from 'moment';

function OrderStoreCartItem({ item }: { item: any }) {
  const [isConfirming, setIsConfirming] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentSettings] = useAppStore((state) => [state.currentSettings]);
  const { orderData, setOrderData, currentUserEmail } =
    useContext(OrderContext);
  console.log({ orderData, item });
  let userType = 'viewer';
  if (!orderData) return <LoadingComponent />;
  if (!currentSettings) return <LoadingComponent />;
  const deliveryUsers = currentSettings?.delivery_services?.find(
    (deliveryItem: DeliveryServiceType) =>
      deliveryItem.id === orderData.deliveryService?.id
  )?.users;
  userType =
    deliveryUsers?.find(
      (deliveryItem: any) => deliveryItem.email === currentUserEmail
    )?.roleType || 'viewer';

  const isConfirmed = orderData.storesInvolved.find(
    (storeStatusItem) => storeStatusItem.storeID === item.storeID
  )?.isConfirmed;

  const onConfirm = async () => {
    setIsLoading(true);
    const updatedStoresInvolved = orderData.storesInvolved.map(
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
    toast.success(`Confirmed cart items for ${item.storeName}`, {
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
            <div className="text-base font-semibold">{item.storeName}</div>
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
      ) : userType === kDeliveryServiceRoleType.MANAGER ? (
        <button
          onClick={() => setIsConfirming(true)}
          className="p-3 text-sm text-neutral-950 font-semibold text-center w-full bg-highlight hover:bg-highlight_hover"
        >
          Confirm Cart
        </button>
      ) : (
        <div className="p-3 text-sm animate-pulse text-orange-400 font-semibold text-center w-full bg-neutral-900 flex justify-center space-x-2">
          <span>Waiting for confirmation...</span>{' '}
          <LoaderCircleIcon className="h-5 animate-spin" />
        </div>
      )}

      <Dialog open={isConfirming} onOpenChange={setIsConfirming}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm order for {item.storeName}?</DialogTitle>
            <DialogDescription>
              This will confirm the cart items for this store.
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
                className="bg-highlight hover:bg-highlight_hover"
                onClick={onConfirm}
              >
                Submit
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default OrderStoreCartItem;
