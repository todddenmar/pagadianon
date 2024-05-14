'use client';
import { CartItemType, DeliveryServiceType } from '@/typings';
import React, { useContext, useState } from 'react';
import CartListItem from '../cart/CartListItem';
import CustomPesoIcon from '../CustomComponents/CustomPesoIcon';
import {
  convertStringCoordinatesToObject,
  getCartTotal,
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
  InfoIcon,
  LoaderCircleIcon,
  NavigationIcon,
} from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { dbUpdateStoreCartStatus } from '@/helpers/firebaseHelpers';
import { toast } from 'sonner';
import moment from 'moment';
import OrderInfoItem from './OrderInfoItem';
import { kDeliveryServiceRoleType, kFulfillmentMethod } from '@/constants';
import { Separator } from '../ui/separator';

function OrderStoreCartItem({ item }: { item: any }) {
  const [isConfirming, setIsConfirming] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isPickingUp, setIsPickingUp] = useState(false);
  const [isSetReadyForPickUp, setIsSetReadyForPickUp] = useState(false);
  const [currentSettings, currentUserData] = useAppStore((state) => [
    state.currentSettings,
    state.currentUserData,
  ]);
  const { orderData, setOrderData, currentUserEmail } =
    useContext(OrderContext);
  if (!orderData) return <LoadingComponent />;
  if (!currentSettings) return <LoadingComponent />;

  const currentDeliveryService = currentSettings?.delivery_services.find(
    (delItem: DeliveryServiceType) =>
      delItem.id === orderData.deliveryService?.id
  );
  const isForDelivery =
    orderData.fulfillmentMethod === kFulfillmentMethod.DELIVERY;

  let isDeliveryServiceManager: boolean = checkIfDSManager();
  let isStoreManager: boolean = checkIfStoreManager();
  let isRider: boolean = checkIfRider();
  let isCustomer: boolean = false;

  console.log({
    isDeliveryServiceManager,
    isStoreManager,
    isRider,
    isCustomer,
    currentDeliveryService,
    currentUserEmail,
  });

  const isStoreConfirmed = orderData.storesInvolved?.find(
    (storeStatusItem) => storeStatusItem?.storeID === item.storeID
  )?.isConfirmed;

  const isPickedUp = orderData.storesInvolved?.find(
    (storeStatusItem) => storeStatusItem?.storeID === item.storeID
  )?.isPickedUp;

  const isReadyForPickUp = orderData.storesInvolved?.find(
    (storeStatusItem) => storeStatusItem?.storeID === item.storeID
  )?.isReadyForPickUp;

  const isDeliveryConfirmed = orderData?.deliveryService?.isConfirmed;
  const coordinates = convertStringCoordinatesToObject(
    item.contactInfo.coordinates
  );

  function checkIfDSManager() {
    const userFound = currentDeliveryService?.users?.find(
      (dsUsers: any) => dsUsers.email === currentUserEmail
    );
    if (userFound?.roleType === kDeliveryServiceRoleType.MANAGER) {
      return true;
    } else {
      return false;
    }
  }

  function checkIfStoreManager() {
    return currentUserData?.stores?.find(
      (storeID: string) => storeID === item.storeID
    )
      ? true
      : false;
  }

  function checkIfRider() {
    const userFound = currentDeliveryService?.users?.find(
      (dsUsers: any) => dsUsers.email === currentUserEmail
    );
    if (userFound?.roleType === kDeliveryServiceRoleType.RIDER) {
      return true;
    } else {
      return false;
    }
  }

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

  const onPickUp = async () => {
    setIsLoading(true);
    const updatedStoresInvolved = orderData.storesInvolved?.map(
      (storeItem: any) =>
        storeItem.storeID === item.storeID
          ? { ...storeItem, isPickedUp: true }
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
    toast.success(`Picked Up cart items for ${item.name}`, {
      description: moment(new Date()).format('LLL'),
    });
    setIsPickingUp(false);
    setIsLoading(false);
  };

  const onReadyForPickUp = async () => {
    setIsLoading(true);
    const updatedStoresInvolved = orderData.storesInvolved?.map(
      (storeItem: any) =>
        storeItem.storeID === item.storeID
          ? { ...storeItem, isReadyForPickUp: true }
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
    toast.success(`Picked Up cart items for ${item.name}`, {
      description: moment(new Date()).format('LLL'),
    });
    setIsSetReadyForPickUp(false);
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
      {isForDelivery ? (
        <div className=" text-sm font-semibold text-center w-full bg-neutral-900 grid grid-cols-2 h-[40px]">
          {isStoreConfirmed ? (
            <StoreConfirmed />
          ) : isStoreManager ? (
            <Button
              onClick={() => setIsConfirming(true)}
              className="text-neutral-950 bg-highlight hover:bg-highlight_hover rounded-none w-full"
            >
              Confirm Cart
            </Button>
          ) : (
            <WaitingForStoreConfirmation />
          )}

          {isPickedUp ? (
            <RiderPickedUp />
          ) : isRider ? (
            <Button
              disabled={!isStoreConfirmed}
              onClick={() => setIsPickingUp(true)}
              className="text-neutral-950 bg-highlight hover:bg-highlight_hover rounded-none w-full text-sm"
            >
              Pick Up
            </Button>
          ) : (
            <WaitingForRider />
          )}
        </div>
      ) : (
        <div className=" text-sm font-semibold text-center w-full bg-neutral-900 h-[40px] flex flex-col items-center justify-center">
          {isStoreConfirmed ? (
            isStoreManager ? (
              isReadyForPickUp ? (
                isPickedUp ? (
                  <CustomerPickedUp />
                ) : (
                  <Button
                    disabled={!isStoreConfirmed}
                    onClick={() => setIsPickingUp(true)}
                    className="text-neutral-950 bg-highlight hover:bg-highlight_hover rounded-none w-full text-sm"
                  >
                    Set Customer Picked Up
                  </Button>
                )
              ) : (
                <Button
                  disabled={!isStoreConfirmed}
                  onClick={() => setIsSetReadyForPickUp(true)}
                  className="text-neutral-950 bg-highlight hover:bg-highlight_hover rounded-none w-full text-sm"
                >
                  Set Ready For Pick Up
                </Button>
              )
            ) : isReadyForPickUp ? (
              isPickedUp ? (
                <CustomerPickedUp />
              ) : (
                <ReadyForPickUp />
              )
            ) : (
              <StoreConfirmed />
            )
          ) : isStoreManager ? (
            <Button
              onClick={() => setIsConfirming(true)}
              className="text-neutral-950 bg-highlight hover:bg-highlight_hover rounded-none w-full"
            >
              Confirm Cart
            </Button>
          ) : (
            <WaitingForStoreConfirmation />
          )}
        </div>
      )}

      {/* {orderData.fulfillmentMethod === kFulfillmentMethod.DELIVERY ? (
        <div className="w-full">
          {isConfirmed ? (
            <div className="p-3 text-sm font-semibold text-center w-full bg-neutral-900 grid grid-cols-2 ">
              <StoreConfirmed />
              {isPickedUp ? <RiderPickedUp /> : <WaitingForRider />}
            </div>
          ) : isAllowingStoreConfirmation ? (
            <Button
              onClick={() => setIsConfirming(true)}
              className="text-neutral-950 bg-highlight hover:bg-highlight_hover rounded-t-none w-full"
            >
              Confirm Cart
            </Button>
          ) : (
            <WaitingForStoreConfirmation />
          )}
        </div>
      ) : (
        <div className="w-full">
          {isConfirmed ? (
            <div className="p-3 text-sm text-green-500 font-semibold text-center w-full bg-neutral-900 flex justify-around space-x-2">
              <div className="flex items-center gap-2">
                <span>Confirmed</span> <CheckCircleIcon className="h-5" />
              </div>
              <div className="flex items-center gap-2">
                <span>Confirmed</span> <CheckCircleIcon className="h-5" />
              </div>
            </div>
          ) : isStoreManager ? (
            <Button
              onClick={() => setIsConfirming(true)}
              className="text-neutral-950 bg-highlight hover:bg-highlight_hover rounded-t-none w-full"
            >
              Confirm Cart
            </Button>
          ) : (
            <div className="p-3 text-sm animate-pulse text-orange-400 font-semibold text-center w-full bg-neutral-900 flex justify-center space-x-2">
              <span>Waiting for store confirmation...</span>{' '}
              <LoaderCircleIcon className="h-5 animate-spin" />
            </div>
          )}
        </div>
      )} */}

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
                onClick={() => {
                  setIsConfirming(false);
                }}
                variant={'secondary'}
              >
                Cancel
              </Button>
              <Button
                className="bg-highlight hover:bg-highlight_hover transition-all "
                onClick={onConfirm}
              >
                Confirm
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
      <Dialog open={isPickingUp} onOpenChange={setIsPickingUp}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogDescription>
              This means the items are picked up.
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
                onClick={() => {
                  setIsPickingUp(false);
                }}
                variant={'secondary'}
              >
                Cancel
              </Button>
              <Button
                className="bg-highlight hover:bg-highlight_hover transition-all "
                onClick={onPickUp}
              >
                Yes
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={isSetReadyForPickUp} onOpenChange={setIsSetReadyForPickUp}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogDescription>
              Setting items ready for pick up
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
                onClick={() => {
                  setIsSetReadyForPickUp(false);
                }}
                variant={'secondary'}
              >
                Cancel
              </Button>
              <Button
                className="bg-highlight hover:bg-highlight_hover transition-all "
                onClick={onReadyForPickUp}
              >
                Yes
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function StoreConfirmed() {
  return (
    <div className="flex justify-center text-green-500 items-center gap-1">
      <span>Store Confirmed</span> <CheckCircleIcon className="h-[16px]" />
    </div>
  );
}

function RiderPickedUp() {
  return (
    <div className="flex justify-center text-green-500 items-center  gap-1">
      <span>Picked Up</span> <CheckCircleIcon className="h-[16px]" />
    </div>
  );
}

function CustomerPickedUp() {
  return (
    <div className="flex justify-center text-green-500 items-center  gap-1">
      <span>Claimed</span> <CheckCircleIcon className="h-[16px]" />
    </div>
  );
}

function ReadyForPickUp() {
  return (
    <div className="flex justify-center text-orange-400 items-center  gap-1">
      <span>Ready For Pick Up</span> <CheckCircleIcon className="h-[16px]" />
    </div>
  );
}

function WaitingForStoreConfirmation() {
  return (
    <div className="p-2  flex-col items-center  animate-pulse text-orange-400 font-semibold text-center w-full bg-neutral-900 flex justify-center space-x-2">
      <span>Waiting for store...</span>
    </div>
  );
}
function WaitingForRider() {
  return (
    <div className="p-2  flex-col items-center  animate-pulse text-orange-400 font-semibold text-center w-full bg-neutral-900 flex justify-center space-x-2">
      <span>Waiting for rider...</span>
    </div>
  );
}
export default OrderStoreCartItem;
