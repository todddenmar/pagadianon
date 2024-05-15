'use client';
import { kDeliveryServiceRoleType, kOrderProgress } from '@/constants';
import { DeliveryServiceType } from '@/typings';
import React, { useContext, useState } from 'react';
import { Button } from '../ui/button';
import { OrderContext } from '../providers/OrderContextProvider';
import { dbConfirmOrderByDeliveryService } from '@/helpers/firebaseHelpers';
import LoadingComponent from '../admin/LoadingComponent.';
import { useAppStore } from '@/lib/store';
import { CheckIcon, LoaderCircleIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import CustomButton from '../CustomComponents/CustomButton';
import moment from 'moment';

function ManageOrderDelivery({ setClose }: { setClose: () => void }) {
  const currentSettings = useAppStore((state) => state.currentSettings);
  const { orderData, setOrderData, currentUserEmail } =
    useContext(OrderContext);
  const [isLoading, setIsLoading] = useState(false);

  const formSchema = z.object({
    riderID: z.string(),
    deliveryFee: z
      .string()
      .refine((val) => parseInt(val) > 0, { message: 'Price must be above 0' }),
  });
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      riderID: undefined,
      deliveryFee: '',
    },
  });
  if (!orderData) return <LoadingComponent />;
  if (!currentSettings) return <LoadingComponent />;

  const deliveryService = currentSettings.delivery_services?.find(
    (item: DeliveryServiceType) => item.id === orderData.deliveryServiceID
  );
  const riders = deliveryService?.users?.filter(
    (item: any) => item.roleType === kDeliveryServiceRoleType.RIDER
  );

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    if (!orderData) {
      return;
    }
    const selectedRider = riders.find(
      (item: any) => item.id === values.riderID
    );
    const updatedOrderDeliveryServiceStatus = {
      id: orderData?.deliveryServiceID!,
      isConfirmed: true,
      rider: selectedRider,
      fee: values.deliveryFee,
      confirmedDateTime: moment(new Date()).format('LLL'),
    };

    const res = await dbConfirmOrderByDeliveryService({
      orderID: orderData?.id,
      data: updatedOrderDeliveryServiceStatus,
      progressStatus: kOrderProgress.CONFIRMED,
    });
    if (res.status === 'error') {
      console.log(res.error);
      return;
    }
    setOrderData({
      ...orderData,
      deliveryServiceInfo: updatedOrderDeliveryServiceStatus,
      progressStatus: kOrderProgress.CONFIRMED,
    });
    setIsLoading(false);
    setClose();
  }
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          <FormField
            control={form.control}
            name="riderID"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Delivery Rider</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a rider" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {riders?.map((item: any, idx: string) => {
                      return (
                        <SelectItem
                          value={item.id}
                          key={`delivery-user-${idx}`}
                        >
                          {item.name}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="deliveryFee"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Delivery Fee</FormLabel>
                <FormControl>
                  <Input
                    type={'number'}
                    placeholder="Enter delivery fee here"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="pt-5">
            {isLoading ? (
              <div className="w-full h-[50px] flex flex-col items-center justify-center mt-3">
                <span>
                  <LoaderCircleIcon className="animate-spin" />
                </span>
              </div>
            ) : (
              <div className="w-full grid grid-cols-2 gap-5">
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    setClose();
                  }}
                  variant={'secondary'}
                >
                  Cancel
                </Button>
                <CustomButton className="w-full" type="submit">
                  Confirm Delivery
                </CustomButton>
              </div>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
}

export default ManageOrderDelivery;
