import React, { useEffect, useRef, useState } from 'react';
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
import {
  dbAddOrderOnStore,
  dbCreateOrder,
  dbGetOrderDataByID,
} from '@/helpers/firebaseHelpers';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { LoaderCircleIcon, NavigationIcon } from 'lucide-react';
import { DeliveryServiceType, OrderType } from '@/typings';
import {
  convertStringCoordinatesToObject,
  getDirectionByCoordinates,
  getStoreIDsByCart,
  getStoresByCart,
} from '@/helpers/appHelpers';
import CustomerCheckoutCart from './CustomerCheckoutCart';
import { ScrollArea } from '../ui/scroll-area';
import Image from 'next/image';

function CheckoutCustomerDetailsForm() {
  const router = useRouter();
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
  const [coordinates, setCoordinates] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const getCoordinates = () => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setCoordinates({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    });
  };
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setCoordinates({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
      form.setValue(
        'coordinates',
        `${position.coords.latitude}, ${position.coords.longitude}`
      );
    });
  }, []);
  const paymentMethods =
    fulfillmentMethod === kFulfillmentMethod.PICK_UP
      ? [kPaymentMethod.COD]
      : kPaymentMethods;
  const fulfillmentMethods =
    currentSettings?.delivery_services?.length > 0
      ? kFulfillmentMethods
      : [kFulfillmentMethod.PICK_UP];
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
    coordinates: z
      .string()
      .min(2, {
        message: 'Coordinates must be at least 2 characters.',
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
      coordinates: '',
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
    const objCoordinates = convertStringCoordinatesToObject(values.coordinates);
    const storesInvolved = getStoreIDsByCart({
      cart: currentUserCart,
      stores: currentSettings.stores,
    });

    const storesInvolvedContactInfo = await Promise.all(
      storesInvolved.map(async (item) => {
        const res = await dbGetOrderDataByID({ id: item.storeID });
        if (res.status === 'error') {
          console.log(res.error);
          return;
        }
        const storeData = res.data!;
        return {
          storeID: storeData.id,
          storeSlug: storeData.slug,
          contactInfo: {
            address: storeData.settings.address,
            coordinates: storeData.settings.coordinates,
            mobileNumber: storeData.settings.mobileNumber,
          },
          isConfirmed: false,
        };
      })
    );

    const newData = {
      id: id,
      customer: {
        firstName,
        lastName,
        mobileNumber,
        address,
        coordinates: objCoordinates,
      },
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
      status: kOrderProgress.PENDING,
      storesInvolved: storesInvolvedContactInfo,
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
    const year = moment(dateTime).format('YYYY');
    const month = moment(dateTime).format('MM');
    router.push(`/order/${id}?year=${year}&month=${month}`);
    setCurrentUserCart([]);
    setIsDrawerCartOpen(false);
    setIsSheetCartOpen(false);
    setIsLoading(false);
  }
  return (
    <div className="flex flex-col">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid-cols-1 grid md:grid-cols-2 xl:grid-cols-3 items-start gap-5 md:gap-10">
            <CustomerCheckoutCart cart={currentUserCart} />
            <div className="space-y-3">
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

              <div className="grid grid-cols-1 md:flex md:items-end gap-3">
                {fulfillmentMethod === kFulfillmentMethod.DELIVERY && (
                  <div className="flex-1">
                    <FormField
                      control={form.control}
                      name="coordinates"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Coordinates (Latitude, Longitude)
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter coordinates here"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )}
                {fulfillmentMethod === kFulfillmentMethod.DELIVERY &&
                  getDirectionByCoordinates(form.getValues('coordinates')) && (
                    <a
                      target="_blank"
                      href={getDirectionByCoordinates(
                        form.getValues('coordinates')
                      )}
                      className="p-3 h-[40px] rounded-md text-sm cursor-pointer font-semibold transition-all flex items-center space-x-2 justify-center bg-highlight hover:bg-highlight_hover text-neutral-950"
                    >
                      <NavigationIcon className="h-5" />
                    </a>
                  )}
              </div>
              <div className="pt-5">
                {isLoading ? (
                  <div className="w-full h-[50px] flex flex-col items-center justify-center">
                    <span>
                      <LoaderCircleIcon className="animate-spin" />
                    </span>
                  </div>
                ) : (
                  <Button
                    type="submit"
                    className="bg-highlight hover:bg-highlight_hover transition-colors text-neutral-950 w-full"
                  >
                    Place Order
                  </Button>
                )}
              </div>
            </div>
            <div className="hidden xl:flex flex-col items-center justify-center px-5 ">
              <Image
                src={'/images/pagadianon-light.svg'}
                height={400}
                width={400}
                alt="image banner"
                className="hidden h-[200px] md:h-[250px] lg:h-[400px] dark:block"
                priority={true}
              />
              <Image
                src={'/images/pagadianon-logo.svg'}
                height={400}
                width={400}
                alt="image banner"
                className=" block h-[200px] md:h-[250px] lg:h-[400px] dark:hidden"
                priority={true}
              />
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default CheckoutCustomerDetailsForm;
