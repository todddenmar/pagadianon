import React, { useState } from 'react';
import { z } from 'zod';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import {
  kFulfillmentMethod,
  kFulfillmentMethods,
  kOrderProgress,
  kPaymentMethod,
  kPaymentMethods,
} from '@/constants';
import moment from 'moment';
import { useAppStore } from '@/lib/store';
import { v4 as uuidv4 } from 'uuid';
import { dbAddOrderOnStore, dbCreateOrder } from '@/helpers/firebaseHelpers';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { LoaderCircleIcon } from 'lucide-react';
import { DeliveryServiceType, OrderType } from '@/typings';
import { getStoresByCart } from '@/helpers/appHelpers';

function CheckoutCustomerDetailsForm({ setClose }: { setClose: () => void }) {
  const [
    currentUserCart,
    currentSettings,
    setCurrentUserCart,
    setIsDrawerCartOpen,
    setIsSheetCartOpen,
  ] = useAppStore((state) => [
    state.currentUserCart,
    state.currentSettings,
    state.setCurrentUserCart,
    state.setIsDrawerCartOpen,
    state.setIsSheetCartOpen,
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDeliveryServiceID, setSelectedDeliveryServiceID] = useState(
    currentSettings?.delivery_services[0].id || null
  );
  const [fulfillmentMethod, setFulfillmentMethod] = useState(
    kFulfillmentMethod.PICK_UP
  );
  const [paymentMethod, setPaymentMethod] = useState(kPaymentMethod.COD);

  const paymentMethods =
    fulfillmentMethod === kFulfillmentMethod.PICK_UP
      ? [kPaymentMethod.COD]
      : kPaymentMethods;
  const fulfillmentMethods =
    currentSettings?.delivery_services?.length > 0
      ? kFulfillmentMethods
      : [kFulfillmentMethod.PICK_UP];
  const router = useRouter();
  const formSchema = z.object({
    firstName: z.string().min(2, {
      message: 'First name must be at least 2 characters.',
    }),
    lastName: z.string().min(2, {
      message: 'Last name must be at least 2 characters.',
    }),
    mobileNumber: z
      .string()
      .length(10, { message: 'Mobile number must have 10 digits after +63' }),
    email: z
      .string()
      .min(2, {
        message: 'Email Address must be at least 2 characters.',
      })
      .max(50)
      .email()
      .optional(),
    address: z
      .string()
      .min(2, {
        message: 'Address must be at least 2 characters.',
      })
      .max(100),
  });
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      mobileNumber: '',
      address: '',
    },
  });

  const updateStoresOrder = async ({
    orderID,
    customer,
  }: {
    orderID: string;
    customer: any;
  }) => {
    const storesInvolved = getStoresByCart({
      cart: currentUserCart,
      stores: currentSettings.stores,
    });
    storesInvolved.forEach(async (item: any) => {
      const res = await dbAddOrderOnStore({
        data: item,
        customer,
        orderID: orderID,
      });
      if (res.status === 'error') {
        console.log(res.error);
        return;
      }
      console.log('Added order on store');
    });
  };

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    const dateTime = moment(new Date()).format('LLL');
    const id = uuidv4();
    const { firstName, lastName, mobileNumber, address } = values;
    const newData = {
      id: id,
      customer: { firstName, lastName, mobileNumber, address },
      paymentMethod: paymentMethod,
      fulfillmentMethod: fulfillmentMethod,
      deliveryService:
        fulfillmentMethod === kFulfillmentMethod.DELIVERY
          ? {
              id: selectedDeliveryServiceID,
              isConfirmed: false,
            }
          : null,
      cart: currentUserCart,
      createdAt: dateTime,
      status: {
        progress: kOrderProgress.PENDING,
      },
    };
    const res = await dbCreateOrder({ data: newData });

    if (res.status === 'error') {
      console.log(res.error);
      return;
    }
    await updateStoresOrder({ orderID: id, customer: newData.customer });
    toast.success('Order created successfully', {
      description: moment(new Date()).format('LLL'),
    });
    router.push(`/order/${id}`);
    setCurrentUserCart([]);
    setIsDrawerCartOpen(false);
    setIsSheetCartOpen(false);
    setIsLoading(false);
    setClose();
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter first name here" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter last name here" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="mobileNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>(+63) Mobile Number </FormLabel>
              <FormControl>
                <Input
                  maxLength={10}
                  type="number"
                  placeholder="Enter mobile number here"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address </FormLabel>
              <FormControl>
                <Input placeholder="Enter address here" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormItem>
          <FormLabel>Fulfillment Method</FormLabel>
          <FormControl>
            <Select
              onValueChange={setFulfillmentMethod}
              value={fulfillmentMethod}
            >
              <SelectTrigger className="w-full capitalize">
                <SelectValue placeholder="Choose" />
              </SelectTrigger>
              <SelectContent>
                {fulfillmentMethods.map((item: string, idx) => {
                  return (
                    <SelectItem
                      className="capitalize"
                      key={`select-fulfillment-item-${idx}`}
                      value={item}
                    >
                      {item}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>

        {fulfillmentMethod === kFulfillmentMethod.DELIVERY && (
          <FormItem>
            <FormLabel>Payment Method</FormLabel>
            <FormControl>
              <Select
                onValueChange={setPaymentMethod}
                value={paymentMethod}
                defaultValue={paymentMethod}
              >
                <SelectTrigger className="w-full capitalize">
                  <SelectValue placeholder="Choose" />
                </SelectTrigger>
                <SelectContent>
                  {paymentMethods.map((item: string, idx) => {
                    return (
                      <SelectItem
                        className="capitalize"
                        key={`select-payment-mode-item-${idx}`}
                        value={item}
                      >
                        {item}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}

        {fulfillmentMethod === kFulfillmentMethod.DELIVERY && (
          <FormItem>
            <FormLabel>Delivery Service Company</FormLabel>
            <FormControl>
              <Select
                onValueChange={setSelectedDeliveryServiceID}
                value={selectedDeliveryServiceID}
                defaultValue={selectedDeliveryServiceID}
              >
                <SelectTrigger className="w-full capitalize">
                  <SelectValue placeholder="Choose" />
                </SelectTrigger>
                <SelectContent>
                  {currentSettings?.delivery_services.map(
                    (item: DeliveryServiceType, idx: number) => {
                      return (
                        <SelectItem
                          className="capitalize"
                          key={`select-payment-mode-item-${idx}`}
                          value={item.id}
                        >
                          {item.name}
                        </SelectItem>
                      );
                    }
                  )}
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
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
                e.preventDefault();
                setClose();
              }}
              variant={'destructive'}
            >
              Cancel
            </Button>
            <Button type="submit" className="w-full">
              Place Order
            </Button>
          </div>
        )}
      </form>
    </Form>
  );
}

export default CheckoutCustomerDetailsForm;
