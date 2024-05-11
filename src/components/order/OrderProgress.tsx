import React from 'react';
import { Progress } from '@/components/ui/progress';
import {
  kFulfillmentMethod,
  kOrderDeliveryProgressTypes,
  kOrderPickUpProgressTpyes,
} from '@/constants';
import { cn } from '@/lib/utils';
import { OrderType } from '@/typings';
function OrderProgress({ orderData }: { orderData: OrderType }) {
  const progressText =
    orderData.status.progress === undefined
      ? 'pending'
      : orderData.status.progress;
  const fulfillmentMethod = orderData.fulfillmentMethod;
  const value =
    fulfillmentMethod === kFulfillmentMethod.PICK_UP
      ? 100 / kOrderPickUpProgressTpyes.length
      : 100 / kOrderDeliveryProgressTypes.length;
  const deliveryProgressValue =
    fulfillmentMethod === kFulfillmentMethod.PICK_UP
      ? (kOrderPickUpProgressTpyes.findIndex((item) => item === progressText) +
          1) *
        value
      : (kOrderDeliveryProgressTypes.findIndex(
          (item) => item === progressText
        ) +
          1) *
        value;

  const deliveryProgressTypes =
    fulfillmentMethod === kFulfillmentMethod.PICK_UP
      ? kOrderPickUpProgressTpyes
      : kOrderDeliveryProgressTypes;
  return (
    <div>
      <span className="">Order Progress</span>
      <div className="mt-2 ">
        <Progress
          value={
            deliveryProgressValue === 100
              ? deliveryProgressValue
              : deliveryProgressValue - value / 2
          }
        />
        <div
          className={cn(
            'grid text-xs md:text-sm text-center text-neutral-700 mt-2',
            {
              'grid-cols-3': fulfillmentMethod === kFulfillmentMethod.PICK_UP,
              'grid-cols-5': fulfillmentMethod === kFulfillmentMethod.DELIVERY,
            }
          )}
        >
          {deliveryProgressTypes?.map((item, idx) => {
            return (
              <span
                key={`progress-item-${idx}`}
                className={cn('capitalize', {
                  'text-white': progressText === item,
                })}
              >
                {item}
              </span>
            );
          })}

          <div></div>
        </div>
      </div>
    </div>
  );
}

export default OrderProgress;
