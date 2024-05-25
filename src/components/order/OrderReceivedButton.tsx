'use client';
import { dbConfirmOrderReceived } from '@/helpers/firebaseHelpers';
import { OrderType } from '@/typings';
import moment from 'moment';
import React, { useContext, useState } from 'react';
import { toast } from 'sonner';
import { Button } from '../ui/button';
import { useUser } from '@clerk/nextjs';
import { LoaderIcon } from 'lucide-react';
import { OrderContext } from '../providers/OrderContextProvider';
import { Skeleton } from '../ui/skeleton';
import { kOrderProgress } from '@/constants';

function OrderReceivedButton() {
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const userEmail = user?.primaryEmailAddress?.emailAddress;
  const { orderData, setOrderData, currentUserEmail } =
    useContext(OrderContext);

  if (!orderData) return <Skeleton className="h-[40px] w-[100px] rounded-md" />;

  const onConfirmReceived = async () => {
    setIsLoading(true);
    let confirmByText = null;
    if (userEmail === orderData.customerEmail) {
      confirmByText = 'Order received confirmed by customer';
    }
    if (userEmail === orderData.deliveryRider?.email) {
      confirmByText = 'Order received confirmed by rider';
    }
    if (!confirmByText) {
      return;
    }
    const res = await dbConfirmOrderReceived({
      orderID: orderData.id,
      orderReceivedNote: confirmByText,
    });

    if (res.status === 'error') {
      console.log(res.error);
    }
    setOrderData({
      ...orderData,
      orderReceivedNote: confirmByText,
      status: kOrderProgress.RECEIVED,
    });
    toast.success('Confirmed order received.', {
      description: moment(new Date()).format('LLL'),
    });

    setIsLoading(false);
  };
  return userEmail === orderData.customerEmail ||
    userEmail === orderData.deliveryRider?.email ? (
    isLoading ? (
      <div className="h-[40px] flex flex-col items-center justify-center w-[100px]">
        <LoaderIcon className="animate-spin" />
      </div>
    ) : orderData.status === kOrderProgress.RECEIVED ? (
      <div className="capitalize text-green-500 text-sm">
        {orderData.orderReceivedNote}
      </div>
    ) : (
      <Button
        onClick={onConfirmReceived}
        className="bg-highlight hover:bg-highlight_hover text-neutral-950"
      >
        Confirm Order Received
      </Button>
    )
  ) : null;
}

export default OrderReceivedButton;
