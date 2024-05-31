'use client';
import { Button } from '@/components/ui/button';
import { useAppStore } from '@/lib/store';
import _ from 'lodash';
import React, { useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useShallow } from 'zustand/react/shallow';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { LoaderCircleIcon } from 'lucide-react';
import moment from 'moment';
import { dbUpdateStoreSettings } from '@/helpers/firebaseHelpers';
import { toast } from 'sonner';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { StoreType } from '@/typings';

const userFormSchema = z.object({
  mobileNumber: z
    .string()
    .length(10, { message: 'Mobile number must have 10 digits after +63' })
    .optional(),
  email: z
    .string()
    .min(2, {
      message: 'Email Address must be at least 2 characters.',
    })
    .max(50)
    .email()
    .optional(),
  facebookUsername: z.string().optional(),
  instagramUsername: z.string().optional(),
});
function UpdateStoreContactInfoForm({
  store,
  setClose,
}: {
  store: StoreType;
  setClose: () => void;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [setCurrentSettings, currentSettings] = useAppStore((state) => [
    state.setCurrentSettings,
    state.currentSettings,
  ]);

  // 1. Define your form.
  const form = useForm<z.infer<typeof userFormSchema>>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      mobileNumber: store?.mobileNumber || '',
      email: store?.email || '',
      facebookUsername: store?.facebookUsername || '',
      instagramUsername: store?.instagramUsername || '',
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof userFormSchema>) {
    setIsLoading(true);
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    const updatedStore: StoreType = {
      ...store,
      email: values.email,
      mobileNumber: values.mobileNumber,
      facebookUsername: values.facebookUsername,
      instagramUsername: values.instagramUsername,
    };
    const updatedSettingsStores = currentSettings?.stores.map(
      (item: StoreType) => (item.id === store.id ? updatedStore : item)
    );
    const updatedSettings = {
      ...currentSettings,
      stores: updatedSettingsStores,
      isPublished: false,
    };
    setCurrentSettings(updatedSettings);
    setIsLoading(false);
    setClose();
  }
  return (
    <div className="grid grid-cols-1 gap-5">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
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
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address </FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter email address here"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5">
            <FormField
              control={form.control}
              name="facebookUsername"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Facebook Username</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter facebook username here"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="instagramUsername"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Instagram Username</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter instagram username here"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {isLoading ? (
            <div className="w-full h-[50px] flex flex-col items-center justify-center pt-5">
              <span>
                <LoaderCircleIcon className="animate-spin" />
              </span>
            </div>
          ) : (
            <div className="w-full grid grid-cols-2 gap-5 pt-5">
              <Button
                className="bg-highlight hover:bg-highlight_hover"
                type="submit"
              >
                Update
              </Button>
            </div>
          )}
        </form>
      </Form>
    </div>
  );
}

export default UpdateStoreContactInfoForm;
