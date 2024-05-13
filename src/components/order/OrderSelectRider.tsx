import { kDeliveryServiceRoleType } from '@/constants';
import { DeliveryServiceType } from '@/typings';
import React from 'react';
import { Button } from '../ui/button';

function OrderSelectRider({
  deliveryService,
  onSetRider,
}: {
  deliveryService: DeliveryServiceType;
  onSetRider: (val: any) => void;
}) {
  const riders = deliveryService?.users?.filter(
    (item) => item.roleType === kDeliveryServiceRoleType.RIDER
  );
  return (
    <div>
      {riders?.map((item, idx) => {
        return (
          <div
            key={`delivery-user-${idx}`}
            className="text-sm flex justify-between gap-5 items-center"
          >
            <div>
              <div>{item.name}</div>
              <div>
                {item.mobileNumber && (
                  <a
                    className="text-highlight"
                    href={`tel:+63${item.mobileNumber}`}
                  >
                    +63{item.mobileNumber}
                  </a>
                )}
              </div>
            </div>
            <Button onClick={() => onSetRider(item)}>Select Rider</Button>
          </div>
        );
      })}
    </div>
  );
}

export default OrderSelectRider;
